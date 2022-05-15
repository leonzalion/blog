import ky from 'ky';

// eslint-disable-next-line import/extensions
import dailyTimeblockDateStrings from '~data/daily-timeblocks';

export interface DailyTimeblockParts {
	'daily-plans': string;
	'quarterly-plans': string;
	date: string;
	thoughts: string;
	timeblocks: string;
	'weekly-plans': string;
}

export async function fetchDailyTimeblock({
	dateString,
}: {
	dateString: string;
}) {
	const url = `/daily-timeblocks/${dateString}.json`;

	const response = await ky.get(url);
	const dailyTimeblockParts = (await response.json()) as DailyTimeblockParts;

	const removeHeader = (part: keyof DailyTimeblockParts) => {
		dailyTimeblockParts[part] = dailyTimeblockParts[part]
			.split('\n')
			.slice(1)
			.join('\n');
	};

	for (const part of Object.keys(dailyTimeblockParts) as Array<
		keyof DailyTimeblockParts
	>) {
		if (part !== 'daily-plans' && part !== 'date') {
			removeHeader(part);
		}
	}

	return dailyTimeblockParts;
}

export function getDailyTimeblockDateStrings() {
	return dailyTimeblockDateStrings;
}
