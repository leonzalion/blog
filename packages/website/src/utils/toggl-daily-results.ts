import type {
	TogglDailyResult,
	TogglDailyResultsMetadata,
} from '@leonzalion-blog/content';
import ky from 'ky';

export async function fetchTogglDailyResults({
	dateString,
}: {
	dateString: string;
}): Promise<TogglDailyResult> {
	const url = `/content/toggl-daily-results/json/${dateString}.json`;

	return ky.get(url).json<TogglDailyResult>();
}

export async function fetchTogglDailyResultsMetadata(): Promise<TogglDailyResultsMetadata> {
	return ky
		.get('/content/metadata/toggl-daily-results.json')
		.json<TogglDailyResultsMetadata>();
}
