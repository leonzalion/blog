import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: async () => import('~/layouts/blog-layout.vue'),
		children: [
			{
				path: '/',
				component: async () => import('~/pages/home-page.vue'),
			},
			{
				path: '/articles',
				component: async () => import('~/pages/article-list-page.vue'),
			},
			{
				path: '/article/:slug',
				component: async () => import('~/pages/article-page.vue'),
			},
			{
				path: '/daily-timeblocks',
				component: async () => import('~/pages/daily-timeblock-list-page.vue'),
			},
			{
				path: '/daily-timeblock/:dateString',
				component: async () => import('~/pages/daily-timeblock-page.vue'),
			},
			{
				path: '/:catchAll(.*)',
				component: async () => import('~/pages/404-page.vue'),
			},
		],
	},
];
