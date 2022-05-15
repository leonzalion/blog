import type { ArticleData, ArticleListing } from '@leonzalion-blog/content';
import ky from 'ky';

export async function fetchArticle({ articleSlug }: { articleSlug: string }) {
	const url = `/content/article/${articleSlug}.json`;

	const articleData = await ky.get(url).json<ArticleData>();

	return articleData;
}

export async function getArticlesMap() {
	const articlesMap = await ky
		.get('/content/metadata/articles.json')
		.json<Record<string, ArticleListing>>();

	return articlesMap;
}
