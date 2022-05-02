import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: async () => import('~/layouts/blog-layout.vue'),
			children: [
				{
					path: '/',
					component: async () => import('~/pages/home-page.vue')
				},
				{
					path: '/articles',
					component: async () => import('~/pages/article-list-page.vue'),
				},
				{
					path: '/article/:article',
					component: async () => import('~/pages/article-page.vue'),
				},
				{
					path: '/daily-timeblock',
					component: async () => import('~/pages/daily-timeblock.vue'),
				},
				{
					path: '/:catchAll(.*)',
					component: async () => import('~/pages/404-page.vue'),
				},
			],
		},
	],
});
