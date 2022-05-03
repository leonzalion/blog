import { join } from 'desm';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Plugin } from 'vite';

export function dailyTimeblocksLoader(): Plugin {
	const dailyTimeblocksDir = join(import.meta.url, 'data/daily-timeblocks');
	const dailyTimeblockFiles = fs.readdirSync(dailyTimeblocksDir);

	const dailyTimeblockDateStrings = dailyTimeblockFiles
		.map((dailyTimeblockFile) => path.basename(dailyTimeblockFile, '.md'))
		.sort((dateString1, dateString2) => {
			const date1 = new Date(dateString1);
			const date2 = new Date(dateString2);

			if (date1 < date2) {
				return -1;
			} else if (date1 > date2) {
				return 1;
			} else {
				return 0;
			}
		});

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
