import type { NotionTask } from '@leonzalion-blog/content';
import { getTodayDateString } from '@leonzalion-blog/date-utils';
import got from 'got';
import process from 'node:process';
import type { ValueOf } from 'type-fest';

import { retrieveGithubFiles } from '~/utils/github/files.js';
import { getNotionClient } from '~/utils/notion.js';

export async function getTasksFromNotion() {
	const notion = getNotionClient();
	const databaseId = process.env.NOTION_DATABASE_ID;

	if (databaseId === undefined) {
		throw new Error('NOTION_DATABASE_ID was not found in environment.');
	}

	const tasksQueryData = await notion.databases.query({
		database_id: databaseId,
		// Do not query internal tasks
		filter: {
			property: 'Internal',
			checkbox: {
				equals: false,
			},
		},
	});

	const notionTasks: NotionTask[] = [];
	for (const taskResult of tasksQueryData.results) {
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

		notionTasks.push({
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

	return notionTasks;
}

export async function getTasksFromGithub(): Promise<NotionTask[]> {
	const todayDateString = getTodayDateString();
	try {
		const todayTasksResponse = await retrieveGithubFiles(
			`packages/content/tasks/json/${todayDateString}.json`
		);

		if (Array.isArray(todayTasksResponse)) {
			throw new TypeError('Expected a path to a file, not a folder');
		}

		if (todayTasksResponse.download_url === null) {
			throw new Error('`download_url` was not present on `todayTasksResponse`');
		}

		const todayTasks = await got(todayTasksResponse.download_url).json<
			NotionTask[]
		>();
		return todayTasks;
	} catch (error: unknown) {
		const err = error as { status: number };
		if (err.status === 404) {
			return [];
		} else {
			throw error;
		}
	}
}
