import * as fs from 'node:fs';
import * as path from 'node:path';

import { monorepoDir } from './paths.js';

export async function compileDailyTimeblocksForNetlifyCMS() {
	const dailyTimeblocksDir = path.join(
		monorepoDir,
		'packages/content/daily-timeblocks/src'
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
			dailyTimeblock.dateString = dailyTimeblockDirName;
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

			const compiledDailyTimeblocksDir = path.join(
				monorepoDir,
				'packages/content/daily-timeblocks/json'
			);
			const compiledDailyTimeblockPath = path.join(
				compiledDailyTimeblocksDir,
				`${dailyTimeblockDirName}.json`
			);
			await fs.promises.writeFile(
				compiledDailyTimeblockPath,
				JSON.stringify(dailyTimeblock)
			);
		})
	);
}
