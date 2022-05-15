import type { ArticleData, ArticlesMetadata } from '@leonzalion-blog/content';
import ky from 'ky';

export async function fetchArticle({ articleSlug }: { articleSlug: string }) {
	const url = `/content/article/${articleSlug}.json`;

	const articleData = await ky.get(url).json<ArticleData>();

	return articleData;
}

export async function getArticlesMetadata() {
	const articlesMap = await ky
		.get('/content/metadata/articles.json')
		.json<ArticlesMetadata>();

	return articlesMap;
}
