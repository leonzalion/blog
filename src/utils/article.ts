import type { Component } from 'vue';

// eslint-disable-next-line import/extensions
import articlesMap from '~data/articles';

export async function importArticle(articleSlug: string) {
	const { default: mdComponent } = (await import(
		`../../data/article/${articleSlug}.md`
	)) as { default: Component };

	return mdComponent;
}

export function getArticlesMap() {
	return articlesMap;
}
