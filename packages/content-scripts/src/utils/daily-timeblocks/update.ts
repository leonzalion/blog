import type { DailyTimeblock } from '@leonzalion-blog/content';

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
	await updateGithubFile({
		filePath: `packages/content/metadata/daily-timeblocks.json`,
		branch: 'dev',
		content: dailyTimeblocksMetadataJson,
		message,
	});
	await updateGithubFile({
		filePath: `content/metadata/daily-timeblocks.json`,
		branch: 'netlify',
		content: dailyTimeblocksMetadataJson,
		message,
	});
}
