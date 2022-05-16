import type { Task, TaskListSnapshot } from '@leonzalion-blog/content';
import got from 'got';
import type { ValueOf } from 'type-fest';

import { retrieveGithubFiles } from '~/utils/github/files.js';
import { getNotionClient } from '~/utils/notion.js';

export async function getTaskListFromNotion() {
	const notion = getNotionClient();
	const databaseId = '6ebb1d947ba74c72a9c7f0fd6921db57';

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

	const notionTasks: Task[] = [];
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

export async function getTaskListSnapshotFromGithub({
	dateString,
}: {
	dateString: string;
}): Promise<TaskListSnapshot | undefined> {
	try {
		const taskListSnapshotResponse = await retrieveGithubFiles(
			`packages/content/task-list-snapshots/json/${dateString}.json`
		);

		if (Array.isArray(taskListSnapshotResponse)) {
			throw new TypeError('Expected a path to a file, not a folder');
		}

		if (taskListSnapshotResponse.download_url === null) {
			throw new Error('`download_url` was not present on `todayTasksResponse`');
		}

		const taskListSnapshot = await got(
			taskListSnapshotResponse.download_url
		).json<TaskListSnapshot>();

		return taskListSnapshot;
	} catch (error: unknown) {
		const err = error as { status: number };
		if (err.status === 404) {
			return undefined;
		} else {
			throw error;
		}
	}
}
