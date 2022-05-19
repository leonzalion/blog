import { getProjectDir } from 'lion-utils';
import * as path from 'node:path';

import {
	syncDailyTimeblockFromNotion,
	syncTasksFromNotion,
	writeContentMetadata,
} from '~/index.js';
import { compileArticlesIntoJson } from '~/utils/articles/compile.js';

const contentDir = path.join(
	getProjectDir(import.meta.url, { monorepoRoot: true }),
	'packages/content'
);

console.info('Syncing tasks from Notion...');
await syncTasksFromNotion({ contentDir });

try {
	console.info('Syncing daily timeblock from Notion...');
	await syncDailyTimeblockFromNotion({ contentDir });
} catch (error: unknown) {
	// The daily timeblock might not exist; ignore
	console.error(error);
}

console.info('Compiling articles into JSON...');
await compileArticlesIntoJson({ contentDir });

console.info('Generating content metadata...');
await writeContentMetadata({ contentDir });

console.info('Content successfully synced!');
