import vue from '@vitejs/plugin-vue';
import { join } from 'desm';
import markdownItAnchor from 'markdown-it-anchor';
// @ts-expect-error: No typings
import markdownItTaskCheckbox from 'markdown-it-task-checkbox';
import jsImports from 'rollup-plugin-js-imports';
import { defineConfig } from 'vite';
import Markdown from 'vite-plugin-md';
import WindiCSS from 'vite-plugin-windicss';

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
	],
});
