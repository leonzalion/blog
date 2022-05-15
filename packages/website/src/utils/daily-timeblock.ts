import type { DailyTimeblocksMetadata } from '@leonzalion-blog/content';
import ky from 'ky';

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
	const url = `/content/daily-timeblocks/${dateString}.json`;

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

export async function getDailyTimeblocksMetadata() {
	const dailyTimeblockMetadata = await ky
		.get('/content/metadata/daily-timeblock.json')
		.json<DailyTimeblocksMetadata>();

	return dailyTimeblockMetadata;
}
