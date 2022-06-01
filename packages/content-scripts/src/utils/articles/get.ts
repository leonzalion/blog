import type { Article } from '@leonzalion-blog/content';
import type { ValueOf } from 'type-fest';

import { getNotionClient, getNotionToMarkdown } from '~/utils/notion.js';

export async function getArticleFromNotion({
	articleSlug,
}: {
	articleSlug: string;
}): Promise<Article> {
	const notion = getNotionClient();
	const notionToMarkdown = getNotionToMarkdown();
	const databaseId = '260e9ebf99274268a9eb8d6adc7cab93';

	const articlesQueryData = await notion.databases.query({
		database_id: databaseId,
		filter: {
			property: 'Slug',
			title: {
				equals: articleSlug,
			},
		},
	});

	if (articlesQueryData.results.length > 1) {
		throw new Error(
			`Expected only one article for the slug \`${articleSlug}\``
		);
	}

	const articlePage = articlesQueryData.results[0];

	if (articlePage === undefined || !('properties' in articlePage)) {
		throw new Error(`Article with slug ${articleSlug} not found.`);
	}

	type Properties<T extends ValueOf<typeof articlePage.properties>['type']> =
		ValueOf<typeof articlePage.properties> & { type: T };

	interface NotionArticleProperties {
		Slug: Properties<'rich_text'>;
		Title: Properties<'title'>;
		'Last Edited': Properties<'last_edited_time'>;
		Publish: Properties<'checkbox'>;
		'Date Published': Properties<'date'>;
	}

	const properties =
		articlePage.properties as unknown as NotionArticleProperties;

	if (!properties.Publish.checkbox) {
		throw new Error(
			`Publish checkbox for article ${articleSlug} was not selected.`
		);
	}

	const mdBlocks = await notionToMarkdown.pageToMarkdown(articlePage.id);
	const content = notionToMarkdown.toMarkdownString(mdBlocks);

	return {
		slug: properties.Slug.rich_text.map((part) => part.plain_text).join(''),
		title: properties.Title.title.map((part) => part.plain_text).join(''),
		content,
		datePublished: properties['Date Published'].date!.start,
		lastEditedDate: properties['Last Edited'].last_edited_time,
	};
}
