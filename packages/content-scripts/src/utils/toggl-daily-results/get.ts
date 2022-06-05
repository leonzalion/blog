import type {
	TogglDailyResult,
	TogglTimeEntry,
} from '@leonzalion-blog/content';
import { dayjs, getTodayDateString } from '@leonzalion-blog/date-utils';
import { got } from 'got';
import process from 'node:process';

import { retrieveGithubFiles } from '~/utils/github/files.js';

interface TogglTimeEntryResult {
	id: number;
	guid: string;
	wid: number;
	billable: boolean;
	start: string;
	stop?: string;
	description: string;
	duration: number;
	duronly: boolean;
	tags?: string[];
	at: string;
	uid: number;
}

export async function getTogglDailyResult(): Promise<TogglDailyResult> {
	const togglApiToken = process.env.TOGGL_API_TOKEN;
	const todayDateString = getTodayDateString();

	const fullTimeEntries = await got
		.get('https://api.track.toggl.com/api/v8/time_entries', {
			username: togglApiToken,
			password: 'api_token',
			searchParams: {
				start_date: dayjs(todayDateString).toISOString(),
			},
		})
		.json<TogglTimeEntryResult[]>();

	const activityTypeTotals = {
		Leisure: 0,
		Precommit: 0,
		Dialect: 0,
		'Side Project': 0,
	};

	const timeEntries: TogglTimeEntry[] = [];

	for (const fullTimeEntry of fullTimeEntries) {
		const activityType = fullTimeEntry.tags?.find(
			(tag) => tag in activityTypeTotals
		) as keyof typeof activityTypeTotals | undefined;

		const timeEntry: TogglTimeEntry = {
			activityType,
			at: fullTimeEntry.at,
			description: fullTimeEntry.description,
			duration: fullTimeEntry.duration,
			start: fullTimeEntry.start,
			stop: fullTimeEntry.stop,
		};

		timeEntries.push(timeEntry);

		if (activityType === undefined) {
			continue;
		}

		// A duration less than 0 means that the activity is actively being tracked
		const timeEntryDuration =
			fullTimeEntry.duration >= 0
				? fullTimeEntry.duration
				: dayjs().diff(fullTimeEntry.start, 'seconds');

		activityTypeTotals[activityType] += timeEntryDuration;
	}

	return {
		dateString: todayDateString,
		activityTypeTotals,
		timeEntries,
	};
}

export async function getTogglDailyResultFromGitHub({
	dateString,
}: {
	dateString: string;
}): Promise<TogglDailyResult | undefined> {
	try {
		const togglDailyResultResponse = await retrieveGithubFiles({
			path: `content/toggl-daily-results/json/${dateString}.json`,
			branch: 'netlify',
		});

		if (Array.isArray(togglDailyResultResponse)) {
			throw new TypeError('Expected a path to a file, not a folder');
		}

		if (togglDailyResultResponse.download_url === null) {
			throw new Error('`download_url` was not present on `todayTasksResponse`');
		}

		const togglDailyResult = await got
			.get(togglDailyResultResponse.download_url)
			.json<TogglDailyResult>();

		return togglDailyResult;
	} catch (error: unknown) {
		const err = error as { status: number };
		if (err.status === 404) {
			return undefined;
		} else {
			throw error;
		}
	}
}
