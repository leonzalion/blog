import { dayjs, getTodayDateString } from '@leonzalion-blog/date-utils';

import {
	getTaskListFromNotion,
	getTaskListSnapshotFromGithub,
} from '~/utils/task-list-snapshots/get.js';
import { updateGithubTaskListSnapshot } from '~/utils/task-list-snapshots/update.js';

let lastChanged: ReturnType<typeof dayjs> | undefined;
export async function syncTogglDailyResults({
	contentDir,
	force = false,
}: {
	contentDir: string;
	force?: boolean;
}) {
	const todayDateString = getTodayDateString();
	const currentTasksOnNotion = await getTaskListFromNotion();
	const githubTaskListSnapshot = await getTaskListSnapshotFromGithub({
		dateString: todayDateString,
	});

	if (
		JSON.stringify(githubTaskListSnapshot?.tasks) ===
		JSON.stringify(currentTasksOnNotion)
	) {
		console.info(
			`Task list on GitHub is up to date with the task list on Notion. No changes were made.`
		);
	} else {
		if (
			!force &&
			(lastChanged === undefined || dayjs().diff(lastChanged, 'minute') < 2)
		) {
			console.info(
				`Task list snapshot on Notion was different than the task list snapshot on GitHub. It was last changed on ${
					lastChanged?.toISOString() ?? '<unknown>'
				}. Marking it as changed.`
			);
			lastChanged = dayjs();
		} else {
			console.info(
				`Task list on Notion is different than the task list on GitHub; updating the task list on GitHub...`
			);
			await updateGithubTaskListSnapshot({
				contentDir,
				taskListSnapshot: {
					dateString: todayDateString,
					tasks: currentTasksOnNotion,
				},
			});
		}
	}
}
