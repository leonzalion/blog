import { execaSync } from 'execa';
import * as fs from 'node:fs';
import * as path from 'node:path';

import { getTodayDateString } from '~/utils/date-string.js';
import { dailyTimeblocksDir } from '~/utils/paths.js';

const todayTimeblockDir = path.join(dailyTimeblocksDir, getTodayDateString());

if (!fs.existsSync(todayTimeblockDir)) {
	fs.mkdirSync(todayTimeblockDir, { recursive: true });
}

const todayTimeblockTimeblocks = path.join(todayTimeblockDir, 'timeblocks.md');
execaSync('nvim', [todayTimeblockTimeblocks], { stdio: 'inherit' });
