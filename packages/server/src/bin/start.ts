import {
	syncDailyTimeblockFromNotion,
	syncTasksFromNotion,
} from '@leonzalion-blog/content-scripts';
import { execa } from 'execa';
import process from 'node:process';
import schedule from 'node-schedule';
import tmp from 'tmp-promise';

import { syncTogglData } from '~/utils/toggl.js';

if (process.env.NODE_ENV === 'production') {
	const localRepoDir = await tmp.dir();
	// Make a local copy of the repo in a temp folder if it doesn't exist
	await execa('git', [
		'clone',
		'https://github.com/leonzalion/blog',
		localRepoDir.path,
	]);
}

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
