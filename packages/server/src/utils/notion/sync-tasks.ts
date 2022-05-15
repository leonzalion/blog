import deepEqual from 'fast-deep-equal';

import { getTasksFromNotion } from '@leonzalion-blog/content-scripts';
import { getCurrentTasksOnGithub } from '~/utils/notion/current-tasks.js';
import { updateNotionTasksOnGithub } from '~/utils/notion/update-github.js';

export async function syncTasksFromNotion() {
	const currentTasksOnNotion = await getTasksFromNotion();
	const currentTasksOnGithub = await getCurrentTasksOnGithub();

	if (!deepEqual(currentTasksOnGithub, currentTasksOnNotion)) {
		await updateNotionTasksOnGithub({ notionTasks: currentTasksOnNotion });
	}
}
