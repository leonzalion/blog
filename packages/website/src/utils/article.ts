import type { ArticleData, ArticlesMetadata } from '@leonzalion-blog/content';
import ky from 'ky';

export async function fetchArticle({
	articleSlug,
}: {
	articleSlug: string;
}): Promise<ArticleData> {
	let articleData: ArticleData;

	if (import.meta.env.DEV) {
		articleData = (await import(
			`../../public/content/articles/json/${articleSlug}.json`
		)) as ArticleData;
	} else {
		const url = `/content/articles/json/${articleSlug}.json`;

		articleData = await ky.get(url).json<ArticleData>();
	}

	return articleData;
}

export async function getArticlesMetadata() {
	let articlesMetadata: ArticlesMetadata;

	if (import.meta.env.DEV) {
		({ default: articlesMetadata } = (await import(
			'../../public/content/metadata/articles.json'
		)) as { default: ArticlesMetadata });
	} else {
		articlesMetadata = await ky
			.get('/content/metadata/articles.json')
			.json<ArticlesMetadata>();
	}

	return articlesMetadata;
}
