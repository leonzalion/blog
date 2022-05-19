import { getTodayDateString } from '@leonzalion-blog/date-utils';

import {
	getTaskListFromNotion,
	getTaskListSnapshotFromGithub,
} from '~/utils/task-list-snapshots/get.js';
import { updateGithubTaskListSnapshot } from '~/utils/task-list-snapshots/update.js';

export async function syncTasksFromNotion({
	contentDir,
}: {
	contentDir: string;
}) {
	const todayDateString = getTodayDateString();
	const currentTasksOnNotion = await getTaskListFromNotion();
	const githubTaskListSnapshot = await getTaskListSnapshotFromGithub({
		dateString: todayDateString,
	});

	if (
		JSON.stringify(githubTaskListSnapshot?.tasks) !==
		JSON.stringify(currentTasksOnNotion)
	) {
		await updateGithubTaskListSnapshot({
			contentDir,
			taskListSnapshot: {
				dateString: todayDateString,
				tasks: currentTasksOnNotion,
			},
		});
	}
}
