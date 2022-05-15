import '~/utils/init.js';

import schedule from 'node-schedule';

import { syncNotionTasks } from '~/utils/notion/sync-tasks.js';
import { syncTogglData } from '~/utils/toggl/sync.js';

// Runs once every 5 minutes
schedule.scheduleJob('0/5 * * * *', async () => {
	console.info('Syncing Notion tasks...');
	await syncNotionTasks();
});

// Runs once every minute
schedule.scheduleJob('0/1 * * * *', async () => {
	console.info('Syncing Toggl data...');
	await syncTogglData();
});
