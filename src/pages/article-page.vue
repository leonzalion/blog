<script setup lang="ts">
import 'github-markdown-css/github-markdown.css';

import dateFormat from 'dateformat';
import dayjs from 'dayjs';
import type { Component } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { Article } from '~/types/article.js';
import { getArticlesMap, importArticle } from '~/utils/article.js';

const route = useRoute();
const articleSlug = route.params.slug?.toString();

let ArticleMarkdownComponent: Component;
let articleNotFound = $ref(false);
let article: Article = undefined!;

if (articleSlug === undefined) {
	const router = useRouter();
	await router.push('/404');
} else {
	try {
		ArticleMarkdownComponent = await importArticle(articleSlug);
		article = getArticlesMap()[articleSlug]!;
	} catch {
		articleNotFound = true;
	}
}
</script>

<template>
	<div v-if="articleNotFound">Article not found.</div>
	<div v-else class="column items-center article-content">
		<div class="max-w-5xl p-8">
			<div class="mb-4">
				<h1 class="font-bold text-4xl">{{ article.title }}</h1>
				<div class="text-gray-500 text-[0.9rem] italic">
					{{ dateFormat(dayjs(article.dateCreated).toDate(), 'longDate') }}
				</div>
			</div>
			<ArticleMarkdownComponent />
		</div>
	</div>
</template>

<style lang="postcss">
.article-content a {
	@apply text-orange-500 underline hover:text-orange-600;
}

.article-content [title] {
	@apply relative cursor-help;
	background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='4' height='10'><circle stroke='black' fill='black' r='0.2' cx='3' cy='8' /></svg>");
	background-repeat: repeat-x;
	background-position: -1px bottom;
}
</style>
