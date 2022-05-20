import { getTodayDateString } from '@leonzalion-blog/date-utils';

import {
	getDailyTimeblockFromGithub,
	getDailyTimeblockFromNotion,
} from '~/utils/daily-timeblocks/get.js';
import { updateGithubDailyTimeblock } from '~/utils/daily-timeblocks/update.js';

export async function syncDailyTimeblockFromNotion({
	contentDir,
}: {
	contentDir: string;
}) {
	const todayDateString = getTodayDateString();
	console.info('Retrieving daily timeblock from Notion...');
	const notionDailyTimeblock = await getDailyTimeblockFromNotion({
		dateString: todayDateString,
	});
	console.info('Retrieving daily timeblock from GitHub...');
	const githubDailyTimeblock = await getDailyTimeblockFromGithub({
		dateString: todayDateString,
	});

	if (
		githubDailyTimeblock === undefined ||
		JSON.stringify(notionDailyTimeblock) !==
			JSON.stringify(githubDailyTimeblock)
	) {
		console.info(
			'Daily timeblock on Notion was different than daily timeblock on GitHub; updating the daily timeblock on GitHub...'
		);
		await updateGithubDailyTimeblock({
			contentDir,
			dailyTimeblock: notionDailyTimeblock,
		});
	} else {
		console.info(
			'Daily timeblock on GitHub is up to date with daily timeblock on Notion. No changes were made.'
		);
	}
}
