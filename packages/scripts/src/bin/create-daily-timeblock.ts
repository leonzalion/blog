import dayjs from 'dayjs';
import { getProjectDir } from 'lion-system';
import * as fs from 'node:fs';
import * as path from 'node:path';

const monorepoDir = getProjectDir(import.meta.url, { monorepoRoot: true });
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
	console.info("Today's timeblock directory already exists!");
	process.exit(1);
}

fs.cpSync(yesterdayTimeblockDir, todayTimeblockDir, { recursive: true });

const dailyTimeblockFileNames = fs.readdirSync(todayTimeblockDir);

for (const dailyTimeblockFileName of dailyTimeblockFileNames) {
	const dailyTimeblockFilePath = path.join(
		todayTimeblockDir,
		dailyTimeblockFileName
	);

	const fileMarkdown = fs.readFileSync(dailyTimeblockFilePath, 'utf8');
	const fileMarkdownLines = fileMarkdown.split('\n');
	fileMarkdownLines[0] = `# ${dayjs(getTodayDateString()).format(
		'dddd, MMMM D, YYYY'
	)}`;

	if (dailyTimeblockFileName === 'thoughts.md') {
		const thoughtsIndex = fileMarkdownLines.findIndex(
			(line) => line === '## Thoughts'
		);
		if (thoughtsIndex === -1) {
			console.error(
				`\`Thoughts\` header not found in \`thoughts.md\` file in \`${getYesterdayDateString()}\``
			);
		}
	}

	if (dailyTimeblockFileName === 'timeblocks.md') {
		const timeblocksIndex = fileMarkdownLines.findIndex(
			(line) => line === '## Timeblocks'
		);

		if (timeblocksIndex === -1) {
			console.error(
				`\`Timeblocks\` header not found in \`timeblocks.md\` file in \`${getYesterdayDateString()}\``
			);
		}

		const routinesIndex = fileMarkdownLines.findIndex(
			(line) => line === '## Routines'
		);

		if (routinesIndex === -1) {
			console.error(
				`\`Routines\` header not found in \`timeblocks.md\` file in \`${getYesterdayDateString()}\``
			);
		}

		fileMarkdownLines.splice(timeblocksIndex + 1, routinesIndex - 1);
	}

	fs.writeFileSync(dailyTimeblockFilePath, fileMarkdownLines.join('\n'));
}
