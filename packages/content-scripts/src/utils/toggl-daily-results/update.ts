import type { TogglDailyResult } from '@leonzalion-blog/content';
import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';

import { updateGithubFile } from '~/utils/github/update.js';
import { generateTogglDailyResultsMetadata } from '~/utils/metadata.js';

export async function updateGithubTogglDailyResult({
	contentDir,
	togglDailyResult,
}: {
	contentDir: string;
	togglDailyResult: TogglDailyResult;
}): Promise<void> {
	const togglDailyResultJson = JSON.stringify(togglDailyResult);

	const message = `Synchronized task list snapshot for ${togglDailyResult.dateString}`;

	if (process.env.NODE_ENV === 'production') {
		await fs.promises.writeFile(
			path.join(
				contentDir,
				`toggl-daily-results/json/${togglDailyResult.dateString}.json`
			),
			togglDailyResultJson
		);
	}

	await Promise.all(
		['dev', 'netlify'].map(async (branch) =>
			updateGithubFile({
				filePath: `packages/content/toggl-daily-results/json/${togglDailyResult.dateString}.json`,
				branch,
				content: togglDailyResultJson,
				message,
			})
		)
	);

	// Generate metadata
	const togglDailyResultsMetadata = await generateTogglDailyResultsMetadata({
		contentDir,
	});
	const togglDailyResultsMetadataJson = JSON.stringify(
		togglDailyResultsMetadata
	);

	if (process.env.NODE_ENV === 'production') {
		await fs.promises.writeFile(
			path.join(contentDir, `metadata/toggl-daily-results.json`),
			togglDailyResultsMetadataJson
		);
	}

	await Promise.all(
		['dev', 'netlify'].map(async (branch) =>
			updateGithubFile({
				filePath: `packages/content/metadata/toggl-daily-results.json`,
				branch,
				content: togglDailyResultsMetadataJson,
				message: 'Synchronized task list snapshots metadata',
			})
		)
	);
}
