import '~/utils/init.js';

import { syncTogglData } from '~/utils/toggl/sync.js';

console.info('Syncing Toggl tasks...');

await syncTogglData();
