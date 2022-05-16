import { getTodayDateString } from '@leonzalion-blog/date-utils';
import deepEqual from 'fast-deep-equal';

import {
	getTaskListFromNotion,
	getTaskListSnapshotFromGithub,
} from '~/utils/task-list-snapshots/get.js';
import { updateGithubTaskListSnapshot } from '~/utils/task-list-snapshots/update.js';

export async function syncTasksFromNotion() {
	const todayDateString = getTodayDateString();
	const currentTasksOnNotion = await getTaskListFromNotion();
	const githubTaskListSnapshot = await getTaskListSnapshotFromGithub({
		dateString: todayDateString,
	});

	if (!deepEqual(githubTaskListSnapshot?.tasks, currentTasksOnNotion)) {
		await updateGithubTaskListSnapshot({
			dateString: todayDateString,
			tasks: currentTasksOnNotion,
		});
	}
}
