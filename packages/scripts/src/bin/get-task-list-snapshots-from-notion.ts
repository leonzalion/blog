import { getTodayDateString } from '@leonzalion-blog/date-utils';
import { getProjectDir } from 'lion-system';
import * as fs from 'node:fs';
import * as path from 'node:path';

import { getNotionTasks } from '~/utils/notion.js';

const monorepoDir = getProjectDir(import.meta.url, { monorepoRoot: true });

const notionTasks = await getNotionTasks();

const generatedTasksDir = path.join(
	monorepoDir,
	'packages/content/task-list-snapshots/json'
);

const todayDateString = getTodayDateString();

const todayTasksDir = path.join(generatedTasksDir, todayDateString);
fs.writeFileSync(todayTasksDir, JSON.stringify(notionTasks));
