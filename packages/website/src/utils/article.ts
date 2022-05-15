import type { ArticleData, ArticlesMetadata } from '@leonzalion-blog/content';
import ky from 'ky';

export async function fetchArticle({ articleSlug }: { articleSlug: string }) {
	const url = `https://blog.leonzalion.com/content/article/${articleSlug}.json`;

	const articleData = await ky.get(url).json<ArticleData>();

	return articleData;
}

export async function getArticlesMetadata() {
	const articlesMap = await ky
		.get('https://blog.leonzalion.com/content/metadata/articles.json')
		.json<ArticlesMetadata>();

	return articlesMap;
}
