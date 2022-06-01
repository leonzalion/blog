import { dayjs } from '@leonzalion-blog/date-utils';
import type { ValueOf } from 'type-fest';

import { getArticleFromNotion } from '~/utils/articles/get.js';
import { updateGithubArticle } from '~/utils/articles/update.js';
import { debug } from '~/utils/debug.js';
import { getNotionClient } from '~/utils/notion.js';

export async function syncArticlesFromNotion({
	contentDir,
	force = false,
}: {
	contentDir: string;
	force?: boolean;
}) {
	console.info('Retrieving articles from Notion...');

	const notion = getNotionClient();
	const databaseId = '260e9ebf99274268a9eb8d6adc7cab93';
	const articlesQueryData = await notion.databases.query({
		database_id: databaseId,
		filter: {
			property: 'Publish',
			checkbox: {
				equals: true,
			},
		},
	});

	debug((f) => f`Articles query data: ${articlesQueryData}`);

	for (const articleResult of articlesQueryData.results) {
		if (!('properties' in articleResult)) {
			continue;
		}

		type Properties<
			T extends ValueOf<typeof articleResult.properties>['type']
		> = ValueOf<typeof articleResult.properties> & { type: T };

		interface NotionArticleProperties {
			Slug: Properties<'rich_text'>;
			Title: Properties<'title'>;
			'Last Edited': Properties<'last_edited_time'>;
			Publish: Properties<'checkbox'>;
			'Date Published': Properties<'date'>;
		}

		const properties =
			articleResult.properties as unknown as NotionArticleProperties;

		const articleSlug = properties.Slug.rich_text
			.map((part) => part.plain_text)
			.join('');

		const lastChanged = dayjs(properties['Last Edited'].last_edited_time);

		// If it was unknown when it was last changed or changed less than an hour ago, then update the `lastChanged` variable but don't update it on GitHub.
		if (
			!force &&
			(lastChanged === undefined || dayjs().diff(lastChanged, 'hour') < 1)
		) {
			console.info(
				`Article ${articleSlug} on Notion was changed last changed on ${
					lastChanged.toISOString() ?? '<unknown>'
				}, but not at least an hour ago, so no updates were made.`
			);
		}
		// It was changed more than an hour ago, should be safe to update onto GitHub
		else {
			console.info(
				`Article ${articleSlug} was changed more than an hour ago. Updating the article on GitHub...`
			);

			// eslint-disable-next-line no-await-in-loop
			const notionArticle = await getArticleFromNotion({ articleSlug });
			// eslint-disable-next-line no-await-in-loop
			await updateGithubArticle({
				contentDir,
				article: notionArticle,
			});
		}
	}
}
