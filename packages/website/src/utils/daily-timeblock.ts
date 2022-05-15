import type {
	DailyTimeblockData,
	DailyTimeblocksMetadata,
} from '@leonzalion-blog/content';
import ky from 'ky';

export async function fetchDailyTimeblock({
	dateString,
}: {
	dateString: string;
}): Promise<DailyTimeblockData> {
	let dailyTimeblockData: DailyTimeblockData;

	if (import.meta.env.DEV) {
		dailyTimeblockData = await import(
			`../../public/content/daily-timeblocks/json/${dateString}.json`
		);
	} else {
		const url = `/content/daily-timeblocks/json/${dateString}.json`;

		dailyTimeblockData = await ky.get(url).json<DailyTimeblockData>();

		const removeHeader = (part: keyof DailyTimeblockData) => {
			dailyTimeblockData[part] = dailyTimeblockData[part]
				.split('\n')
				.slice(1)
				.join('\n');
		};

		for (const part of Object.keys(dailyTimeblockData) as Array<
			keyof DailyTimeblockData
		>) {
			if (part !== 'dailyPlans' && part !== 'dateString') {
				removeHeader(part);
			}
		}
	}

	return dailyTimeblockData;
}

export async function getDailyTimeblocksMetadata(): Promise<DailyTimeblocksMetadata> {
	let dailyTimeblockMetadata: DailyTimeblocksMetadata;

	if (import.meta.env.DEV) {
		dailyTimeblockMetadata = (await import(
			'../../public/content/metadata/daily-timeblocks.json'
		)) as DailyTimeblocksMetadata;
	} else {
		dailyTimeblockMetadata = await ky
			.get('/content/metadata/daily-timeblock.json')
			.json<DailyTimeblocksMetadata>();
	}

	return dailyTimeblockMetadata;
}
