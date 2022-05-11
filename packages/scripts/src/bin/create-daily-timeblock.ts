import { chmodrSync } from 'chmodrp';
import dayjs from 'dayjs';
import * as fs from 'node:fs';
import * as path from 'node:path';

import {
	getTodayDateString,
	getTomorrowDateString,
	getYesterdayDateString,
} from '~/utils/date-string.js';
import { dailyTimeblocksDir } from '~/utils/paths.js';

let dateStringToCopy: string;
let dateStringToCreate: string;

function freezePastTimeblocks({ beforeDate }: { beforeDate: string }) {
	const dailyTimeblockDirNames = fs.readdirSync(dailyTimeblocksDir);

	for (const dailyTimeblockDirName of dailyTimeblockDirNames) {
		if (dayjs(dailyTimeblockDirName).unix() < dayjs(beforeDate).unix()) {
			const dailyTimeblockDir = path.join(
				dailyTimeblocksDir,
				dailyTimeblockDirName
			);

			// Make folder read-only
			chmodrSync(dailyTimeblockDir, 0o400);
		}
		// Make folder writable
		else {
			chmodrSync(dailyTimeblocksDir, 0o755);
		}
	}
}

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
	freezePastTimeblocks({ beforeDate: getTomorrowDateString() });
}
// otherwise, assume the user wants to create today's timeblock
else {
	dateStringToCopy = getYesterdayDateString();
	dateStringToCreate = getTodayDateString();
	freezePastTimeblocks({ beforeDate: getTodayDateString() });
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
		const thoughtsIndex = fileMarkdownLines.indexOf('## Thoughts');
		if (thoughtsIndex === -1) {
			console.error(
				`\`Thoughts\` header not found in \`thoughts.md\` file in \`${timeblockDirToCopy}\``
			);
		}

		fileMarkdownLines = [
			...fileMarkdownLines.slice(0, thoughtsIndex + 1),
			'',
			'(No thoughts.)',
			'',
		];
	}

	if (dailyTimeblockFileName === 'timeblocks.md') {
		const timeblocksIndex = fileMarkdownLines.indexOf('## Timeblocks');

		if (timeblocksIndex === -1) {
			console.error(
				`\`Timeblocks\` header not found in \`timeblocks.md\` file in \`${timeblockDirToCopy}\``
			);
		}

		const routinesIndex = fileMarkdownLines.indexOf('## Routines');

		if (routinesIndex === -1) {
			console.error(
				`\`Routines\` header not found in \`timeblocks.md\` file in \`${timeblockDirToCopy}\``
			);
		}

		fileMarkdownLines.splice(
			timeblocksIndex + 1,
			routinesIndex - timeblocksIndex - 2
		);
	}

	fs.writeFileSync(dailyTimeblockFilePath, fileMarkdownLines.join('\n'));
}
