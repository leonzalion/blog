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
	const url = `/content/task-list-snapshots/json/${dateString}.json`;

	return ky.get(url).json<TogglDailyResult>();
}

export async function fetchTogglDailyResultsMetadata(): Promise<TogglDailyResultsMetadata> {
	return ky
		.get('/content/metadata/toggl-daily-results.json')
		.json<TogglDailyResultsMetadata>();
}
