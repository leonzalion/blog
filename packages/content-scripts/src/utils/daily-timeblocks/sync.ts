import {
	getDailyTimeblockFromGithub,
	getDailyTimeblockFromNotion,
} from '~/utils/daily-timeblocks/get.js';
import { updateGithubDailyTimeblock } from '~/utils/daily-timeblocks/update.js';

export async function syncDailyTimeblockFromNotion({
	contentDir,
	dateString,
}: {
	contentDir: string;
	dateString: string;
}) {
	console.info('Retrieving daily timeblock from Notion...');
	const notionDailyTimeblock = await getDailyTimeblockFromNotion({
		dateString,
	});
	console.info('Retrieving daily timeblock from GitHub...');
	const githubDailyTimeblock = await getDailyTimeblockFromGithub({
		dateString,
	});

	if (
		githubDailyTimeblock === undefined ||
		JSON.stringify(notionDailyTimeblock) !==
			JSON.stringify(githubDailyTimeblock)
	) {
		console.info(
			`Daily timeblock ${dateString} on Notion was different than daily timeblock on GitHub; updating the daily timeblock on GitHub...`
		);
		await updateGithubDailyTimeblock({
			contentDir,
			dailyTimeblock: notionDailyTimeblock,
		});
	} else {
		console.info(
			`Daily timeblock ${dateString} on GitHub is up to date with daily timeblock on Notion. No changes were made.`
		);
	}
}
