import { join } from 'desm';
import matter from 'gray-matter';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Plugin } from 'vite';
import { DailyTimeblock } from '../src/types/daily-timeblock.js';
import camelcase from 'camelcase';

export function dailyTimeblocksLoader(): Plugin {
	const dailyTimeblocks: Record<string, DailyTimeblock> = {};
	const dailyTimeblocksDir = join(
		import.meta.url,
		'../src/assets/data/daily-timeblocks'
	);
	const dailyTimeblockDirNames = fs.readdirSync(dailyTimeblocksDir);

	for (const dailyTimeblockDirName of dailyTimeblockDirNames) {
		const dailyTimeblockDir = path.join(
			dailyTimeblocksDir,
			dailyTimeblockDirName
		);

		const dailyTimeblockFileNames = fs.readdirSync(dailyTimeblockDir);

		const dailyTimeblock: Record<string, string> = {};
		for (const dailyTimeblockFileName of dailyTimeblockFileNames) {
			const dailyTimeblockFilePath = path.join(
				dailyTimeblockDir,
				dailyTimeblockFileName
			);

			const content = fs.readFileSync(dailyTimeblockFilePath, 'utf8');
			const contentName = camelcase(
				path.basename(dailyTimeblockFileName, '.md')
			);

			dailyTimeblock[contentName] = content;
		}
	}

	return {
		name: 'daily-timeblocks-loader',
		resolveId(id) {
			if (id === '~data/daily-timeblocks') {
				return id;
			}
		},
		load(id) {
			if (id === '~data/daily-timeblocks') {
				return `export default ${JSON.stringify(dailyTimeblocks)}`;
			}
		},
	};
}
