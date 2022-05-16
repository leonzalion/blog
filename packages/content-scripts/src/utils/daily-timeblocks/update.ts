import type { DailyTimeblock } from '@leonzalion-blog/content';

import { updateGithubFile } from '~/utils/github/update.js';

export async function updateGithubDailyTimeblock(
	dailyTimeblock: DailyTimeblock
): Promise<void> {
	const content = JSON.stringify(dailyTimeblock);
	const message = `Synchronized daily timeblock ${dailyTimeblock.dateString}`;
	await updateGithubFile({
		branch: 'dev',
		content,
		filePath: `packages/content/daily-timeblocks/json/${dailyTimeblock.dateString}.json`,
		message,
	});
	await updateGithubFile({
		branch: 'netlify',
		content,
		filePath: `content/daily-timeblocks/json/${dailyTimeblock.dateString}.json`,
		message,
	});
}
