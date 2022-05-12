import * as fs from 'node:fs';
import * as path from 'node:path';

import { monorepoDir } from './paths.js';

export async function compileDailyTimeblocksForNetlifyCMS() {
	const dailyTimeblocksNetlifyCMSDir = path.join(
		monorepoDir,
		'packages/website/public/netlify-cms-assets/daily-timeblocks'
	);
	const dailyTimeblocksDir = path.join(
		monorepoDir,
		'packages/daily-timeblocks'
	);

	const dailyTimeblockDirNames = await fs.promises.readdir(dailyTimeblocksDir);
	await Promise.all(
		dailyTimeblockDirNames.map(async (dailyTimeblockDirName) => {
			const dailyTimeblockDir = path.join(
				dailyTimeblocksDir,
				dailyTimeblockDirName
			);

			if (!fs.statSync(dailyTimeblockDir).isDirectory()) {
				return;
			}

			const dailyTimeblockDirFileNames = await fs.promises.readdir(
				dailyTimeblockDir
			);

			const dailyTimeblock: Record<string, string> = {};
			dailyTimeblock.date = dailyTimeblockDirName;
			await Promise.all(
				dailyTimeblockDirFileNames.map(async (dailyTimeblockDirFileName) => {
					const dailyTimeblockDirFilePath = path.join(
						dailyTimeblockDir,
						dailyTimeblockDirFileName
					);

					const dailyTimeblockFile = await fs.promises.readFile(
						dailyTimeblockDirFilePath,
						'utf8'
					);

					const fieldName = path.basename(dailyTimeblockDirFileName, '.md');
					dailyTimeblock[fieldName] = dailyTimeblockFile;
				})
			);

			const compiledDailyTimeblockPath = path.join(
				dailyTimeblocksNetlifyCMSDir,
				`${dailyTimeblockDirName}.json`
			);
			await fs.promises.writeFile(
				compiledDailyTimeblockPath,
				JSON.stringify(dailyTimeblock)
			);
		})
	);
}
