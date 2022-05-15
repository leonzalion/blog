import { Client } from '@notionhq/client';
import process from 'node:process';
import type { ValueOf } from 'type-fest';

interface Task {
	description: string;
	completed: boolean;
	deadline?: string;
	deadlineNotes: string;
}

export async function getNotionTasks() {
	const notion = new Client({ auth: process.env.NOTION_KEY });
	const databaseId = process.env.NOTION_DATABASE_ID;

	if (databaseId === undefined) {
		throw new Error('NOTION_DATABASE_ID was not found in environment.');
	}

	const notionTasks = await notion.databases.query({
		database_id: databaseId,
		// Do not query internal tasks
		filter: {
			property: 'Internal',
			checkbox: {
				equals: false,
			},
		},
	});

	const tasks: Task[] = [];
	for (const taskResult of notionTasks.results) {
		if (!('properties' in taskResult)) {
			continue;
		}

		type Properties<T extends ValueOf<typeof taskResult.properties>['type']> =
			ValueOf<typeof taskResult.properties> & { type: T };

		interface NotionTaskProperties {
			Internal: Properties<'checkbox'>;
			Done: Properties<'checkbox'>;
			Description: Properties<'title'>;
			Deadline: Properties<'date'>;
			'Deadline Notes': Properties<'rich_text'>;
		}

		const properties = taskResult.properties as unknown as NotionTaskProperties;

		tasks.push({
			completed: properties.Done.checkbox,
			description: properties.Description.title
				.map((part) => part.plain_text)
				.join(''),
			deadline: properties.Deadline.date?.start,
			deadlineNotes: properties['Deadline Notes'].rich_text
				.map((part) => part.plain_text)
				.join(''),
		});
	}

	return tasks;
}
