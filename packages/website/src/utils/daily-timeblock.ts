import type {
	DailyTimeblock,
	DailyTimeblocksMetadata,
} from '@leonzalion-blog/content';
import ky from 'ky';

export async function fetchDailyTimeblock({
	dateString,
}: {
	dateString: string;
}): Promise<DailyTimeblock> {
	let dailyTimeblock: DailyTimeblock;

	if (import.meta.env.DEV) {
		dailyTimeblock = (await import(
			`../../public/content/daily-timeblocks/json/${dateString}.json`
		)) as DailyTimeblock;
	} else {
		const url = `/content/daily-timeblocks/json/${dateString}.json`;

		dailyTimeblock = await ky.get(url).json<DailyTimeblock>();
	}

	return dailyTimeblock;
}

export async function getDailyTimeblocksMetadata(): Promise<DailyTimeblocksMetadata> {
	let dailyTimeblockMetadata: DailyTimeblocksMetadata;

	if (import.meta.env.DEV) {
		dailyTimeblockMetadata = (await import(
			'../../public/content/metadata/daily-timeblocks.json'
		)) as DailyTimeblocksMetadata;
	} else {
		dailyTimeblockMetadata = await ky
			.get('/content/metadata/daily-timeblocks.json')
			.json<DailyTimeblocksMetadata>();
	}

	return dailyTimeblockMetadata;
}
