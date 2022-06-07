import type { Article, ArticlesMetadata } from '@leonzalion-blog/content';
import ky from 'ky';

export async function fetchArticle({
	articleSlug,
}: {
	articleSlug: string;
}): Promise<Article> {
	return ky.get(`/content/articles/json/${articleSlug}.json`).json<Article>();
}

export async function getArticlesMetadata() {
	return ky.get('/content/metadata/articles.json').json<ArticlesMetadata>();
}
