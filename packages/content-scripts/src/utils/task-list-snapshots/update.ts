import type { TaskListSnapshot } from '@leonzalion-blog/content';

import { updateGithubFile } from '~/utils/github/update.js';

export async function updateGithubTaskListSnapshot(
	taskListSnapshot: TaskListSnapshot
): Promise<void> {
	const content = JSON.stringify(taskListSnapshot);
	const message = `Synchronized task list snapshot for ${taskListSnapshot.dateString}`;
	await updateGithubFile({
		filePath: `packages/content/task-list-snapshots/json/${taskListSnapshot.dateString}.json`,
		branch: 'dev',
		content,
		message,
	});
	await updateGithubFile({
		filePath: `content/task-list-snapshots/json/${taskListSnapshot.dateString}.json`,
		branch: 'netlify',
		content,
		message,
	});
}
