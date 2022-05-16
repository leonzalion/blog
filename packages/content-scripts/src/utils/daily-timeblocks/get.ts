import type {
	DailyTimeblockEntryData,
	DailyTimeblocksData,
} from '@leonzalion-blog/content';
import { dayjs } from '@leonzalion-blog/date-utils';
import got from 'got';
import type { ValueOf } from 'type-fest';

import { retrieveGithubFiles } from '~/utils/github/files.js';
import { getNotionClient } from '~/utils/notion.js';

export async function getDailyTimeblockFromNotion({
	dateString,
}: {
	dateString: string;
}): Promise<DailyTimeblockEntryData> {
	const notion = getNotionClient();
	const databaseId = '0d683d5ae2194fbe9a76424b61c85d62';

	const dailyTimeblocksQueryData = await notion.databases.query({
		database_id: databaseId,
	});

	const notionDailyTimeblocks: DailyTimeblocksData = {};
	for (const dailyTimeblockResult of dailyTimeblocksQueryData.results) {
		if (!('properties' in dailyTimeblockResult)) {
			continue;
		}

		type Properties<
			T extends ValueOf<typeof dailyTimeblockResult.properties>['type']
		> = ValueOf<typeof dailyTimeblockResult.properties> & { type: T };

		interface NotionDailyTimeblockProperties {
			'Full Date String': Properties<'title'>;
			Date: Properties<'date'>;
		}

		const properties =
			dailyTimeblockResult.properties as unknown as NotionDailyTimeblockProperties;

		const dateString = dayjs(
			properties['Full Date String'].title[0]?.plain_text
		).format('YYYY-MM-DD');

		notionDailyTimeblocks[dateString] = {
			content: properties['Full Date String'].title
				.map((part) => part.plain_text)
				.join(''),
			dateString,
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
