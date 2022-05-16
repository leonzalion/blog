import type {
	ArticleEntryData,
	ArticlesMetadata,
} from '@leonzalion-blog/content';
import ky from 'ky';

export async function fetchArticle({
	articleSlug,
}: {
	articleSlug: string;
}): Promise<ArticleEntryData> {
	let articleData: ArticleEntryData;

	if (import.meta.env.DEV) {
		articleData = (await import(
			`../../public/content/articles/json/${articleSlug}.json`
		)) as ArticleEntryData;
	} else {
		const url = `/content/articles/json/${articleSlug}.json`;

		articleData = await ky.get(url).json<ArticleEntryData>();
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
