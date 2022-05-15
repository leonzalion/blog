import '~/utils/init.js';

import { syncTasksFromNotion } from '~/utils/notion/sync-tasks.js';

console.info('Syncing Notion tasks...');

await syncTasksFromNotion();
