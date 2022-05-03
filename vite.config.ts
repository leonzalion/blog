import vue from '@vitejs/plugin-vue';
import { join } from 'desm';
import matter from 'gray-matter';
import markdownItTaskCheckbox from 'markdown-it-task-checkbox';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import jsImports from 'vite-plugin-js-imports';
import Markdown from 'vite-plugin-md';
import WindiCSS from 'vite-plugin-windicss';

function articlesData(): Plugin {
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

function dailyTimeblocksData(): Plugin {
	const dailyTimeblocksDir = join(import.meta.url, 'data/daily-timeblocks');
	const dailyTimeblockFiles = fs.readdirSync(dailyTimeblocksDir);

	const dailyTimeblockDateStrings = dailyTimeblockFiles
		.map((dailyTimeblockFile) => path.basename(dailyTimeblockFile, '.md'))
		.sort((dateString1, dateString2) => {
			const date1 = new Date(dateString1);
			const date2 = new Date(dateString2);

			if (date1 < date2) {
				return -1;
			} else if (date1 > date2) {
				return 1;
			} else {
				return 0;
			}
		});

	return {
		name: 'daily-timeblocks-data',
		resolveId(id) {
			if (id === '~data/daily-timeblocks') {
				return id;
			}
		},
		load(id) {
			if (id === '~data/daily-timeblocks') {
				return `export default ${JSON.stringify(dailyTimeblockDateStrings)}`;
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
			markdownItSetup(md) {
				md.use(markdownItTaskCheckbox);
			},
		}),
		WindiCSS(),
		jsImports(),
		articlesData(),
		dailyTimeblocksData(),
	],
});
