import { join } from 'desm';
import * as fs from 'node:fs';
import type { Plugin } from 'vite';

export function dailyTimeblocksLoader(): Plugin {
	const dailyTimeblocksDir = join(
		import.meta.url,
		'../src/assets/data/daily-timeblocks'
	);
	const dateStrings = fs.readdirSync(dailyTimeblocksDir);

	return {
		name: 'daily-timeblocks-loader',
		resolveId(id) {
			if (id === '~data/daily-timeblocks') {
				return id;
			}
		},
		load(id) {
			if (id === '~data/daily-timeblocks') {
				return `export default ${JSON.stringify(dateStrings)}`;
			}
		},
	};
}
