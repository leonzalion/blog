import {
	getNotionClient,
	syncDailyTimeblockFromNotion,
	syncTasksFromNotion,
} from '@leonzalion-blog/content-scripts';
import {
	getTodayDateString,
	getTomorrowDateString,
} from '@leonzalion-blog/date-utils';
import { execa } from 'execa';
import { getProjectDir } from 'lion-utils';
import path from 'node:path';
import process from 'node:process';
import schedule from 'node-schedule';
import tmp from 'tmp-promise';

import { checkIsTwitchStreamActive } from '~/utils/stream.js';
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
	console.info('Cloning the repo in a temp folder...');
	// Make a local copy of the repo in a temp folder.
	// The point of cloning the blog is to get (read-only) access to the up-to-date `content/` directory
	await execa(
		'git',
		['clone', 'https://github.com/leonzalion/blog', localRepoDir],
		{ stdio: 'inherit' }
	);
	await execa('git', ['checkout', 'netlify'], {
		stdio: 'inherit',
		cwd: localRepoDir,
	});
}

console.info('Synchronizing daily timeblocks from Notion...');
try {
	await syncDailyTimeblockFromNotion({
		dateString: getTodayDateString(),
		contentDir,
	});
} catch (error: unknown) {
	console.error(error);
}

try {
	await syncDailyTimeblockFromNotion({
		dateString: getTomorrowDateString(),
		contentDir,
	});
} catch (error: unknown) {
	console.error(error);
}

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
		console.info('Syncing Notion daily timeblock...');
		await syncDailyTimeblockFromNotion({
			contentDir,
			dateString: getTodayDateString(),
		});
	} catch (error: unknown) {
		console.error(
			`Error syncing Notion daily timeblock ${getTodayDateString()}: ${JSON.stringify(
				error
			)}`
		);
	}

	try {
		console.info('Syncing Notion daily timeblock...');
		await syncDailyTimeblockFromNotion({
			contentDir,
			dateString: getTomorrowDateString(),
		});
	} catch (error: unknown) {
		console.error(
			`Error syncing Notion daily timeblock ${getTomorrowDateString()}: ${JSON.stringify(
				error
			)}`
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

// At 7:15AM every day, check whether my stream is active
schedule.scheduleJob('15 7 * * *', async () => {
	const isStreamActive = await checkIsTwitchStreamActive();

	const successMessage = 'Success! Stream live at https://twitch.tv/leonzalion';
	const failureMessage = `Failed...Amazon gift card code: ${process.env.GIFT_CARD_CODE}`;

	const notion = getNotionClient();
	const precommitmentsDatabaseId = '82f4522715d04bf592f5c051d7f5daac';
	// If the stream isn't active by 7:15AM, add the gift card code to today's precommitments
	await notion.pages.create({
		parent: {
			database_id: precommitmentsDatabaseId,
			type: 'database_id',
		},
		properties: {
			title: '7:15AM Stream Precommitment',
		},
		content: [
			{
				type: 'paragraph',
				paragraph: {
					rich_text: [
						{
							text: {
								content: isStreamActive ? successMessage : failureMessage,
							},
						},
					],
				},
			},
		],
	});
});
