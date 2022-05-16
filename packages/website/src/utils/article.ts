import type {
	Article,
	ArticlesMetadata,
} from '@leonzalion-blog/content';
import ky from 'ky';

export async function fetchArticle({
	articleSlug,
}: {
	articleSlug: string;
}): Promise<Article> {
	let article: Article;

	if (import.meta.env.DEV) {
		article = (await import(
			`../../public/content/articles/json/${articleSlug}.json`
		)) as Article;
	} else {
		const url = `/content/articles/json/${articleSlug}.json`;

		article = await ky.get(url).json<Article>();
	}

	return article;
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
