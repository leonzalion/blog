import vue from '@vitejs/plugin-vue';
import { join } from 'desm';
import matter from 'gray-matter';
import markdownItEmoji from 'markdown-it-emoji';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import jsImports from 'vite-plugin-js-imports';
import Markdown from 'vite-plugin-md';
import WindiCSS from 'vite-plugin-windicss';

function articleData(): Plugin {
	const articleFileDir = join(import.meta.url, 'data/article');
	const articleFiles = fs.readdirSync(articleFileDir);

	const articleMatters = Object.fromEntries(
		articleFiles.map((articleFile) => {
			const articleSlug = path.basename(articleFile, '.md');

			return [
				articleSlug,
				{
					...matter(
						fs.readFileSync(path.join(articleFileDir, articleFile), 'utf8')
					).data,
					slug: articleSlug,
				},
			];
		})
	);

	return {
		enforce: 'pre',
		name: 'article-data',
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

export default defineConfig({
	resolve: {
		alias: {
			'~': join(import.meta.url, './src'),
		},
	},
	plugins: [
		vue({ reactivityTransform: true, include: [/\.vue$/, /\.md$/] }),
		Markdown({
			markdownItOptions: {
				linkify: true,
			},
		}),
		WindiCSS(),
		jsImports(),
		articleData(),
	],
});
