import { join } from 'desm';
import matter from 'gray-matter';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Plugin } from 'vite';

export function dailyTimeblocksLoader(): Plugin {
	const dailyTimeblocksDir = join(
		import.meta.url,
		'../src/assets/data/daily-timeblocks'
	);
	const dailyTimeblockFiles = fs.readdirSync(dailyTimeblocksDir);

	const dailyTimeblockDateStrings = Object.fromEntries(
		dailyTimeblockFiles.map((dailyTimeblockFile) => [
			path.basename(dailyTimeblockFile, '.md'),
			{
				...matter(
					fs.readFileSync(
						path.join(dailyTimeblocksDir, dailyTimeblockFile),
						'utf8'
					)
				).data,
			},
		])
	);

	return {
		name: 'daily-timeblocks-loader',
		resolveId(id) {
			if (id === '~data/daily-timeblocks') {
				return id;
			}
		},
		load(id) {
			if (id === '~data/daily-timeblocks') {
				return `export default ${JSON.stringify(dailyTimeblockDateStrings)}`;
			}
		},
	};
}
