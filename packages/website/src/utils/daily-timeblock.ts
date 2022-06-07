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
	return ky
		.get(`/content/daily-timeblocks/json/${dateString}.json`)
		.json<DailyTimeblock>();
}

export async function getDailyTimeblocksMetadata(): Promise<DailyTimeblocksMetadata> {
	return ky
		.get('/content/metadata/daily-timeblocks.json')
		.json<DailyTimeblocksMetadata>();
}
