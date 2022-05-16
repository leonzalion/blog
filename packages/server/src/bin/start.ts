import {
	syncDailyTimeblockFromNotion,
	syncTasksFromNotion,
} from '@leonzalion-blog/content-scripts';
import schedule from 'node-schedule';

import { syncTogglData } from '~/utils/toggl.js';

// Runs once every 5 minutes
schedule.scheduleJob('0/5 * * * *', async () => {
	console.info('Syncing Notion tasks...');
	await syncTasksFromNotion();

	console.info('Syncing Notion daily timeblocks...');
	await syncDailyTimeblockFromNotion();
});

// Runs once every minute
schedule.scheduleJob('0/1 * * * *', async () => {
	console.info('Syncing Toggl data...');
	await syncTogglData();
});
