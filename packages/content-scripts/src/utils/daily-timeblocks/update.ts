import type { DailyTimeblock } from '@leonzalion-blog/content';
import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';

import { updateGithubFile } from '~/utils/github/update.js';
import { generateDailyTimeblocksMetadata } from '~/utils/metadata.js';

export async function updateGithubDailyTimeblock({
	contentDir,
	dailyTimeblock,
}: {
	contentDir: string;
	dailyTimeblock: DailyTimeblock;
}): Promise<void> {
	const dailyTimeblockJson = JSON.stringify(dailyTimeblock);
	const message = `Synchronized daily timeblock ${dailyTimeblock.dateString}`;

	if (process.env.NODE_ENV === 'production') {
		await fs.promises.writeFile(
			path.join(
				contentDir,
				`daily-timeblocks/json/${dailyTimeblock.dateString}.json`
			),
			dailyTimeblockJson
		);
	}

	await updateGithubFile({
		branch: 'dev',
		content: dailyTimeblockJson,
		filePath: `packages/content/daily-timeblocks/json/${dailyTimeblock.dateString}.json`,
		message,
	});
	await updateGithubFile({
		branch: 'netlify',
		content: dailyTimeblockJson,
		filePath: `content/daily-timeblocks/json/${dailyTimeblock.dateString}.json`,
		message,
	});

	// Generate metadata
	const dailyTimeblocksMetadata = await generateDailyTimeblocksMetadata({
		contentDir,
	});
	const dailyTimeblocksMetadataJson = JSON.stringify(dailyTimeblocksMetadata);
	if (process.env.NODE_ENV === 'production') {
		await fs.promises.writeFile(
			path.join(contentDir, `metadata/daily-timeblocks.json`),
			dailyTimeblocksMetadataJson
		);
	}

	await updateGithubFile({
		filePath: `packages/content/metadata/daily-timeblocks.json`,
		branch: 'dev',
		content: dailyTimeblocksMetadataJson,
		message: 'Synchronized daily timeblock metadata',
	});
	await updateGithubFile({
		filePath: `content/metadata/daily-timeblocks.json`,
		branch: 'netlify',
		content: dailyTimeblocksMetadataJson,
		message: 'Synchronized daily timeblock metadata',
	});
}
