import { join } from 'desm';
import matter from 'gray-matter';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Plugin } from 'vite';

export function articlesLoader(): Plugin {
	const articleFilesDir = join(import.meta.url, 'data/articles');
	const articleFiles = fs.readdirSync(articleFilesDir);

	const articleMatters = Object.fromEntries(
		articleFiles.map((articleFile) => {
			const articleSlug = path.basename(articleFile, '.md');

			return [
				articleSlug,
				{
					...matter(
						fs.readFileSync(path.join(articleFilesDir, articleFile), 'utf8')
					).data,
					slug: articleSlug,
				},
			];
		})
	);

	return {
		name: 'articles-data',
		resolveId(id) {
			if (id === '~data/articles') {
				return id;
			}
		},
		load(id) {
			if (id === '~data/articles') {
				return `export default ${JSON.stringify(articleMatters)}`;
			}
		},
	};
}
