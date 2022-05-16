import type { DailyTimeblock } from '@leonzalion-blog/content';
import got from 'got';

import { retrieveGithubFiles } from '~/utils/github/files.js';
import { getNotionClient, getNotionToMarkdown } from '~/utils/notion.js';

export async function getDailyTimeblockFromNotion({
	dateString,
}: {
	dateString: string;
}): Promise<DailyTimeblock> {
	const notion = getNotionClient();
	const notionToMarkdown = getNotionToMarkdown();
	const databaseId = '0d683d5ae2194fbe9a76424b61c85d62';

	const dailyTimeblocksQueryData = await notion.databases.query({
		database_id: databaseId,
		filter: {
			property: 'Date',
			date: {
				equals: dateString,
			},
		},
	});

	if (dailyTimeblocksQueryData.results.length > 1) {
		throw new Error(
			`Expected only one timeblock for the date string \`${dateString}\``
		);
	}

	const dailyTimeblockPage = dailyTimeblocksQueryData.results[0];

	if (dailyTimeblockPage === undefined) {
		throw new Error(`Notion Timeblock with date ${dateString} not found.`);
	}

	const mdBlocks = await notionToMarkdown.pageToMarkdown(dailyTimeblockPage.id);
	const content = notionToMarkdown.toMarkdownString(mdBlocks);

	return {
		content,
		dateString,
	};
}

export async function getDailyTimeblockFromGithub({
	dateString,
}: {
	dateString: string;
}): Promise<DailyTimeblock | undefined> {
	try {
		const dailyTimeblockResponse = await retrieveGithubFiles(
			`packages/content/daily-timeblocks/json/${dateString}.json`
		);

		if (Array.isArray(dailyTimeblockResponse)) {
			throw new TypeError('Expected a path to a file, not a folder');
		}

		if (dailyTimeblockResponse.download_url === null) {
			throw new Error('`download_url` was not present on `todayTasksResponse`');
		}

		const todayTasks = await got(
			dailyTimeblockResponse.download_url
		).json<DailyTimeblock>();

		return todayTasks;
	} catch (error: unknown) {
		const err = error as { status: number };
		if (err.status === 404) {
			return undefined;
		} else {
			throw error;
		}
	}
}
