import vue from '@vitejs/plugin-vue';
import { join } from 'desm';
import markdownItTaskCheckbox from 'markdown-it-task-checkbox';
import { defineConfig } from 'vite';
import jsImports from 'vite-plugin-js-imports';
import Markdown from 'vite-plugin-md';
import WindiCSS from 'vite-plugin-windicss';
import markdownItAnchor from 'markdown-it-anchor';

import { articlesLoader } from './vite-plugins/articles-loader.js';
import { dailyTimeblocksLoader } from './vite-plugins/daily-timeblocks-loader.js';

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
				md.use(markdownItAnchor);
			},
		}),
		WindiCSS(),
		jsImports(),
		articlesLoader(),
		dailyTimeblocksLoader(),
	],
});
