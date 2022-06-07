import vue from '@vitejs/plugin-vue';
import { join } from 'desm';
import jsImports from 'rollup-plugin-js-imports';
import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
	resolve: {
		alias: {
			'~': join(import.meta.url, './src'),
		},
	},
	plugins: [
		vue({ reactivityTransform: true, include: [/\.vue$/, /\.md$/] }),
		WindiCSS(),
		jsImports(),
	],
});
