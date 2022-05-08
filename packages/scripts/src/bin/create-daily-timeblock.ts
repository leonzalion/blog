import dayjs from 'dayjs';
import { getProjectDir } from 'lion-system';
import * as fs from 'node:fs';
import * as path from 'node:path';

const monorepoDir = getProjectDir(import.meta.url, { monorepoRoot: true });
const dailyTimeblocksDir = path.join(
	monorepoDir,
	'packages/website/src/assets/data/daily-timeblocks'
);

function getYesterdayDateString() {
	const yesterday = dayjs().subtract(1, 'day');
	const year = String(yesterday.year()).padStart(2, '0');
	const month = String(yesterday.month() + 1).padStart(2, '0');
	const date = String(yesterday.date()).padStart(2, '0');

	return `${year}-${month}-${date}`;
}

function getTodayDateString() {
	const today = dayjs();
	const year = String(today.year());
	const month = String(today.month() + 1).padStart(2, '0');
	const date = String(today.date()).padStart(2, '0');

	return `${year}-${month}-${date}`;
}

function getTomorrowDateString() {
	const yesterday = dayjs().add(1, 'day');
	const year = String(yesterday.year()).padStart(2, '0');
	const month = String(yesterday.month() + 1).padStart(2, '0');
	const date = String(yesterday.date()).padStart(2, '0');

	return `${year}-${month}-${date}`;
}

let dateStringToCopy: string;
let dateStringToCreate: string;

const todayTimeblockDir = path.join(dailyTimeblocksDir, getTodayDateString());

// If today's timeblock exists, assume the user wants to create tomorrow's timeblock
if (fs.existsSync(todayTimeblockDir)) {
	const tomorrowTimeblockDir = path.join(
		dailyTimeblocksDir,
		getTomorrowDateString()
	);
	if (fs.existsSync(tomorrowTimeblockDir)) {
		throw new Error("Tomorrow's timeblock already exists.");
	}

	dateStringToCopy = getTodayDateString();
	dateStringToCreate = getTomorrowDateString();
}
// otherwise, assume the user wants to create today's timeblock
else {
	dateStringToCopy = getYesterdayDateString();
	dateStringToCreate = getTodayDateString();
}

const timeblockDirToCopy = path.join(dailyTimeblocksDir, dateStringToCopy);
const timeblockDirToCreate = path.join(dailyTimeblocksDir, dateStringToCreate);

fs.cpSync(timeblockDirToCopy, timeblockDirToCreate, { recursive: true });

const dailyTimeblockFileNames = fs.readdirSync(timeblockDirToCreate);

for (const dailyTimeblockFileName of dailyTimeblockFileNames) {
	const dailyTimeblockFilePath = path.join(
		timeblockDirToCreate,
		dailyTimeblockFileName
	);

	const fileMarkdown = fs.readFileSync(dailyTimeblockFilePath, 'utf8');
	let fileMarkdownLines = fileMarkdown.split('\n');
	fileMarkdownLines[0] = `# ${dayjs(dateStringToCreate).format(
		'dddd, MMMM D, YYYY'
	)}`;

	if (dailyTimeblockFileName === 'thoughts.md') {
		const thoughtsIndex = fileMarkdownLines.findIndex(
			(line) => line === '## Thoughts'
		);
		if (thoughtsIndex === -1) {
			console.error(
				`\`Thoughts\` header not found in \`thoughts.md\` file in \`${timeblockDirToCopy}\``
			);
		}

		fileMarkdownLines = [
			...fileMarkdownLines.slice(0, thoughtsIndex),
			'',
			'(No thoughts.)',
		];
	}

	if (dailyTimeblockFileName === 'timeblocks.md') {
		const timeblocksIndex = fileMarkdownLines.findIndex(
			(line) => line === '## Timeblocks'
		);

		if (timeblocksIndex === -1) {
			console.error(
				`\`Timeblocks\` header not found in \`timeblocks.md\` file in \`${timeblockDirToCopy}\``
			);
		}

		const routinesIndex = fileMarkdownLines.findIndex(
			(line) => line === '## Routines'
		);

		if (routinesIndex === -1) {
			console.error(
				`\`Routines\` header not found in \`timeblocks.md\` file in \`${timeblockDirToCopy}\``
			);
		}

		fileMarkdownLines.splice(
			timeblocksIndex + 1,
			routinesIndex - timeblocksIndex
		);
	}

	fs.writeFileSync(dailyTimeblockFilePath, fileMarkdownLines.join('\n'));
}
