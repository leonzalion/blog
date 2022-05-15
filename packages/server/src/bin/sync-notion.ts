import '~/utils/init.js';

import { syncNotionTasks } from '~/utils/notion/sync-tasks.js';

console.info('Syncing Notion tasks...');

await syncNotionTasks();
