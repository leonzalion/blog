import { dayjs } from '@leonzalion-blog/date-utils';

import {
	getDailyTimeblockFromGithub,
	getDailyTimeblockFromNotion,
} from '~/utils/daily-timeblocks/get.js';
import { updateGithubDailyTimeblock } from '~/utils/daily-timeblocks/update.js';

let lastChanged: ReturnType<typeof dayjs> | undefined;
export async function syncDailyTimeblockFromNotion({
	contentDir,
	dateString,
	force = false,
}: {
	contentDir: string;
	dateString: string;
	force?: boolean;
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
		// If it was unknown when it was last changed or changed less than 2 minutes ago, then update the `lastChanged` variable but don't update it on GitHub.
		if (
			!force &&
			(lastChanged === undefined || dayjs().diff(lastChanged, 'minute') < 2)
		) {
			console.info(
				`Daily timeblock ${dateString} on Notion was different than the daily timeblock on GitHub. It was last changed on ${
					lastChanged?.toISOString() ?? '<unknown>'
				}. Marking it as changed.`
			);
			lastChanged = dayjs();
		}
		// It was changed more than 2 minutes ago, should be safe to update onto GitHub
		else {
			console.info(
				`Daily timeblock ${dateString} on Notion was different than daily timeblock on GitHub; updating the daily timeblock on GitHub...`
			);
			await updateGithubDailyTimeblock({
				contentDir,
				dailyTimeblock: notionDailyTimeblock,
			});
		}
	}
	// No differences between Notion timeblock and GitHub timeblock were found, do nothing.
	else {
		console.info(
			`Daily timeblock ${dateString} on GitHub is up to date with daily timeblock on Notion. No changes were made.`
		);
	}
}
