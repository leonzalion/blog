import { getProjectDir } from 'lion-system';

import * as path from 'path';

export const monorepoDir = getProjectDir(import.meta.url, {
	monorepoRoot: true,
});
export const dailyTimeblocksDir = path.join(
	monorepoDir,
	'packages/website/src/assets/data/daily-timeblocks'
);
