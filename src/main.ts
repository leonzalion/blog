import 'virtual:windi.css';

import VueIcon from 'simple-vue-icon';
import { createApp } from 'vue';

import { router } from '~/router.js';

import App from './app.vue';

const app = createApp(App);
app.use(router);
app.component('VueIcon', VueIcon);
app.mount('#app');
