import { getTodayDateString } from '@leonzalion-blog/date-utils';
import { getProjectDir } from 'lion-utils';
import * as path from 'node:path';

import {
	syncDailyTimeblockFromNotion,
	syncTasksFromNotion,
	writeContentMetadata,
} from '~/index.js';
import { syncArticlesFromNotion } from '~/utils/articles/sync.js';

const contentDir = path.join(
	getProjectDir(import.meta.url, { monorepoRoot: true }),
	'packages/content'
);

console.info('Syncing tasks from Notion...');
await syncTasksFromNotion({ contentDir, force: true });

try {
	console.info('Syncing daily timeblock from Notion...');
	await syncDailyTimeblockFromNotion({
		force: true,
		contentDir,
		dateString: getTodayDateString(),
	});
} catch (error: unknown) {
	// The daily timeblock might not exist; ignore
	console.error(error);
}

console.info('Syncing articles from Notion...');
await syncArticlesFromNotion({ contentDir, force: true });

console.info('Generating content metadata...');
await writeContentMetadata({ contentDir });

console.info('Content successfully synced!');
