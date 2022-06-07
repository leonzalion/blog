import { getTodayDateString } from '@leonzalion-blog/date-utils';

import {
	getTogglDailyResult,
	getTogglDailyResultFromGitHub,
} from '~/utils/toggl-daily-results/get.js';
import { updateGithubTogglDailyResult } from '~/utils/toggl-daily-results/update.js';

export async function syncTogglDailyResults({
	contentDir,
}: {
	contentDir: string;
}) {
	const todayDateString = getTodayDateString();
	const currentTogglDailyResult = await getTogglDailyResult();
	const githubTogglDailyResult = await getTogglDailyResultFromGitHub({
		dateString: todayDateString,
	});

	if (
		JSON.stringify(githubTogglDailyResult) ===
		JSON.stringify(currentTogglDailyResult)
	) {
		console.info(
			`Toggl daily result on GitHub is up to date. No changes were made.`
		);
	} else {
		console.info(
			`Task list on Notion is different than the task list on GitHub; updating the task list on GitHub...`
		);
		await updateGithubTogglDailyResult({
			contentDir,
			togglDailyResult: currentTogglDailyResult,
		});
	}
}
