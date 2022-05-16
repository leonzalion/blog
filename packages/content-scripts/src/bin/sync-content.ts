import {
	generateContentMetadata,
	syncDailyTimeblockFromNotion,
	syncTasksFromNotion,
} from '~/index.js';
import { compileArticlesIntoJson } from '~/utils/articles/compile.js';

console.info('Syncing tasks from Notion...');
await syncTasksFromNotion();

try {
	console.info('Syncing daily timeblock from Notion...');
	await syncDailyTimeblockFromNotion();
} catch (error: unknown) {
	// The daily timeblock might not exist; ignore
	console.error(error);
}

console.info('Compiling articles into JSON...');
await compileArticlesIntoJson();

console.info('Generating content metadata...');
await generateContentMetadata();

console.info('Content successfully synced!');
