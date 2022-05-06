import dayjs from 'dayjs';
import { getProjectDir } from 'lion-system';
import * as fs from 'node:fs';
import * as path from 'node:path';

const monorepoDir = getProjectDir({ monorepoRoot: true });
const dailyTimeblocksDir = path.join(monorepoDir, 'data/daily-timeblocks');

function getTodayDateString() {
	const today = dayjs();
	const date = String(today.date()).padStart(2, '0');
	const month = String(today.month()).padStart(2, '0');
	const year = String(today.year());

	return `${year}-${month}-${date}`;
}

function getYesterdayDateString() {
	const yesterday = dayjs();
	const date = String(yesterday.date()).padStart(2, '0');
	const month = String(yesterday.month()).padStart(2, '0');
	const year = String(yesterday.year()).padStart(2, '0');

	return `${year}-${month}-${date}`;
}

const todayTimeblockDir = path.join(
	dailyTimeblocksDir,
	`${getTodayDateString()}`
);
const yesterdayTimeblockDir = path.join(
	dailyTimeblocksDir,
	`${getYesterdayDateString()}`
);

if (fs.existsSync(todayTimeblockDir)) {
	console.info("Today's timebolck directory already exists!");
	process.exit(1);
}

fs.cpSync(yesterdayTimeblockDir, todayTimeblockDir, { recursive: true });
