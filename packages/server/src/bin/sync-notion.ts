import {
	generateContentMetadata,
	syncDailyTimeblockFromNotion,
	syncTasksFromNotion,
} from '@leonzalion-blog/content-scripts';

console.info('Syncing Notion tasks...');

await syncTasksFromNotion();
await syncDailyTimeblockFromNotion();
await generateContentMetadata();
