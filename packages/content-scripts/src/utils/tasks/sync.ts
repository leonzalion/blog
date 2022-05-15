import deepEqual from 'fast-deep-equal';

import { getTasksFromGithub, getTasksFromNotion } from './get.js';
import { updateNotionTasksOnGithub } from './update.js';

export async function syncTasksFromNotion() {
	const currentTasksOnNotion = await getTasksFromNotion();
	const currentTasksOnGithub = await getTasksFromGithub();

	if (!deepEqual(currentTasksOnGithub, currentTasksOnNotion)) {
		await updateNotionTasksOnGithub({ notionTasks: currentTasksOnNotion });
	}
}
