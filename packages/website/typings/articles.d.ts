declare module '~data/articles' {
	import type { Article } from '~/types/article.js';

	const articles: Record<string, Article>;
	export default articles;
}
