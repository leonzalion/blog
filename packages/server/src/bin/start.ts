import {
	syncDailyTimeblockFromNotion,
	syncTasksFromNotion,
} from '@leonzalion-blog/content-scripts';
import { execa } from 'execa';
import { getProjectDir } from 'lion-utils';
import path from 'node:path';
import process from 'node:process';
import schedule from 'node-schedule';
import tmp from 'tmp-promise';

import { syncTogglData } from '~/utils/toggl.js';

let contentDir: string;
let localRepoDir!: string;
if (process.env.NODE_ENV === 'production') {
	const { path: tmpPath } = await tmp.dir();
	localRepoDir = tmpPath;
	contentDir = path.join(tmpPath, 'content');
} else {
	contentDir = path.join(
		getProjectDir(import.meta.url, { monorepoRoot: true }),
		'packages/content'
	);
}

if (process.env.NODE_ENV === 'production') {
	// Make a local copy of the repo in a temp folder if it doesn't exist
	// The point of cloning the blog is to get access to the up-to-date `content/` directory
	await execa('git', [
		'clone',
		'https://github.com/leonzalion/blog',
		localRepoDir,
	]);
}

console.info('Synchronizing daily timeblocks from Notion...')
await syncDailyTimeblockFromNotion({
	contentDir,
});
await syncTogglData();

// Runs once every 5 minutes
schedule.scheduleJob('0/5 * * * *', async () => {
	try {
		console.info('Syncing Notion tasks...');
		await syncTasksFromNotion({ contentDir });
	} catch (error: unknown) {
		console.error(`Error syncing Notion tasks: ${JSON.stringify(error)}`);
	}

	try {
		console.info('Syncing Notion daily timeblocks...');
		await syncDailyTimeblockFromNotion({ contentDir });
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
