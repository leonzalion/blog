import 'virtual:windi.css';

import VueIcon from 'simple-vue-icon';
import { ViteSSG } from 'vite-ssg';

import { routes } from '~/router.js';
import 'nprogress/'

import App from './app.vue';

export const createApp = ViteSSG(App, { routes }, ({ app }) => {
	app.component('VueIcon', VueIcon);
});
