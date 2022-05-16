import '~/utils/init.js';

import {
	syncDailyTimeblockFromNotion,
	syncTasksFromNotion,
} from '@leonzalion-blog/content-scripts';

console.info('Syncing Notion tasks...');

await syncTasksFromNotion();
await syncDailyTimeblockFromNotion();
