import deepEqual from 'fast-deep-equal';

import {
	getCurrentTasksOnGithub,
	getCurrentTasksOnNotion,
} from '~/utils/notion/current-tasks.js';
import { updateNotionTasksOnGithub } from '~/utils/notion/update-github.js';

export async function syncNotionTasks() {
	const currentTasksOnNotion = await getCurrentTasksOnNotion();
	const currentTasksOnGithub = await getCurrentTasksOnGithub();

	if (!deepEqual(currentTasksOnGithub, currentTasksOnNotion)) {
		await updateNotionTasksOnGithub({ notionTasks: currentTasksOnNotion });
	}
}
