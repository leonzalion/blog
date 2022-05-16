import { getTodayDateString } from '@leonzalion-blog/date-utils';
import deepEqual from 'fast-deep-equal';

import {
	getDailyTimeblockFromGithub,
	getDailyTimeblockFromNotion,
} from '~/utils/daily-timeblocks/get.js';
import { updateGithubDailyTimeblock } from '~/utils/daily-timeblocks/update.js';

export async function syncDailyTimeblockFromNotion() {
	const todayDateString = getTodayDateString();
	const notionDailyTimeblock = await getDailyTimeblockFromNotion({
		dateString: todayDateString,
	});
	const githubDailyTimeblock = await getDailyTimeblockFromGithub({
		dateString: todayDateString,
	});

	if (!deepEqual(notionDailyTimeblock, githubDailyTimeblock)) {
		await updateGithubDailyTimeblock(notionDailyTimeblock);
	}
}
