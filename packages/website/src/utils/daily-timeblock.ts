import type {
	DailyTimeblockEntryData,
	DailyTimeblocksMetadata,
} from '@leonzalion-blog/content';
import ky from 'ky';

export async function fetchDailyTimeblock({
	dateString,
}: {
	dateString: string;
}): Promise<DailyTimeblockEntryData> {
	let dailyTimeblockData: DailyTimeblockEntryData;

	if (import.meta.env.DEV) {
		dailyTimeblockData = (await import(
			`../../public/content/daily-timeblocks/json/${dateString}.json`
		)) as DailyTimeblockEntryData;
	} else {
		const url = `/content/daily-timeblocks/json/${dateString}.json`;

		dailyTimeblockData = await ky.get(url).json<DailyTimeblockEntryData>();
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
