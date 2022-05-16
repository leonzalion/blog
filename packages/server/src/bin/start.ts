import '~/utils/init.js';

import { syncTasksFromNotion } from '@leonzalion-blog/content-scripts';
import schedule from 'node-schedule';

// Runs once every 5 minutes
schedule.scheduleJob('0/5 * * * *', async () => {
	console.info('Syncing Notion tasks...');
	await syncTasksFromNotion();
});

// Runs once every minute
schedule.scheduleJob('0/1 * * * *', async () => {
	console.info('Syncing Toggl data...');
	await syncTogglData();
});
