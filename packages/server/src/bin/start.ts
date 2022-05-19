import {
	syncDailyTimeblockFromNotion,
	syncTasksFromNotion,
} from '@leonzalion-blog/content-scripts';
import schedule from 'node-schedule';

import { syncTogglData } from '~/utils/toggl.js';

await syncDailyTimeblockFromNotion();
await syncTogglData();

// Runs once every 5 minutes
schedule.scheduleJob('0/5 * * * *', async () => {
	try {
		console.info('Syncing Notion tasks...');
		await syncTasksFromNotion();
	} catch (error: unknown) {
		console.error(`Error syncing Notion tasks: ${JSON.stringify(error)}`);
	}

	try {
		console.info('Syncing Notion daily timeblocks...');
		await syncDailyTimeblockFromNotion();
	} catch (error: unknown) {
		console.error(
			`Error syncing Notion daily timeblocks: ${JSON.stringify(error)}`
		);
	}
});

// Runs once every minute
schedule.scheduleJob('0/1 * * * *', async () => {
	try {
		console.info('Syncing Toggl data...');
		await syncTogglData();
	} catch (error: unknown) {
		console.error(`Error syncing Toggl data: ${JSON.stringify(error)}`);
	}
});
