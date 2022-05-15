import type { NotionTask } from '@leonzalion-blog/content';
import { got } from 'got';

import { getTodayDateString } from '~/utils/date.js';
import { retrieveGithubFiles } from '~/utils/github/files.js';

export async function getCurrentTasksOnGithub(): Promise<NotionTask[]> {
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
