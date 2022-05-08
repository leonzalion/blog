import ky from 'ky';

// eslint-disable-next-line import/extensions
import dailyTimeblockDateStrings from '~data/daily-timeblocks';

export interface DailyTimeblockParts {
	'daily-plans.md': string;
	'quarterly-plans.md': string;
	'thoughts.md': string;
	'timeblocks.md': string;
	'weekly-plans.md': string;
}

export async function fetchDailyTimeblock({
	dateString,
}: {
	dateString: string;
}) {
	const baseUrl =
		'https://raw.githubusercontent.com/leonzalion/blog/main/packages/daily-timeblocks';
	const dailyTimeblockFileNames = [
		'daily-plans.md',
		'quarterly-plans.md',
		'thoughts.md',
		'timeblocks.md',
		'weekly-plans.md',
	];

	const dailyTimeblockFilesMarkdown = Object.fromEntries(
		await Promise.all(
			dailyTimeblockFileNames.map(async (dailyTimeblockFileName) => {
				const url = `${baseUrl}/${dateString}/${dailyTimeblockFileName}`;
				const response = await ky.get(url);
				let markdown = await response.text();

				if (dailyTimeblockFileName !== 'daily-plans.md') {
					// Trim the date header off of timeblock files
					markdown = markdown.split('\n').slice(1).join('\n');
				}

				return [dailyTimeblockFileName, markdown];
			})
		)
	) as DailyTimeblockParts;

	return dailyTimeblockFilesMarkdown;
}

export function getDailyTimeblockDateStrings() {
	return dailyTimeblockDateStrings;
}
