import type {
	DailyTimeblockEntryData,
	DailyTimeblocksData,
} from '@leonzalion-blog/content';
import { dayjs } from '@leonzalion-blog/date-utils';
import got from 'got';
import type { ValueOf } from 'type-fest';

import { retrieveGithubFiles } from '~/utils/github/files.js';
import { getNotionClient, getNotionToMarkdown } from '~/utils/notion.js';

export async function getDailyTimeblockFromNotion({
	dateString,
}: {
	dateString: string;
}): Promise<DailyTimeblockEntryData> {
	const notion = getNotionClient();
	const notionToMarkdown = getNotionToMarkdown();
	const databaseId = '0d683d5ae2194fbe9a76424b61c85d62';

	const dailyTimeblocksQueryData = await notion.databases.query({
		database_id: databaseId,
	});

	const notionDailyTimeblocks: DailyTimeblocksData = {};
	for (const dailyTimeblockPage of dailyTimeblocksQueryData.results) {
		if (!('properties' in dailyTimeblockPage)) {
			continue;
		}

		type Properties<
			T extends ValueOf<typeof dailyTimeblockPage.properties>['type']
		> = ValueOf<typeof dailyTimeblockPage.properties> & { type: T };

		interface NotionDailyTimeblockProperties {
			'Full Date String': Properties<'title'>;
			Date: Properties<'date'>;
		}

		const properties =
			dailyTimeblockPage.properties as unknown as NotionDailyTimeblockProperties;

		// eslint-disable-next-line no-await-in-loop
		const mdBlocks = await notionToMarkdown.pageToMarkdown(
			dailyTimeblockPage.id
		);
		const content = notionToMarkdown.toMarkdownString(mdBlocks);

		const dateString = dayjs(properties.Date.date?.start).format('YYYY-MM-DD');

		notionDailyTimeblocks[dateString] = {
			dateString,
			content,
		};
	}

	if (notionDailyTimeblocks[dateString] === undefined) {
		throw new Error(`Notion Timeblock with date ${dateString} not found.`);
	}

	return notionDailyTimeblocks[dateString]!;
}

export async function getDailyTimeblockFromGithub({
	dateString,
}: {
	dateString: string;
}): Promise<DailyTimeblocksData | undefined> {
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
		).json<DailyTimeblocksData>();
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
