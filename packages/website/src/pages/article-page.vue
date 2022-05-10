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
	await router.replace('/404');
} else {
	try {
		ArticleMarkdownComponent = await importArticle(articleSlug);
		article = getArticlesMap()[articleSlug]!;
		if (article === undefined) {
			articleNotFound = true;
		}
	} catch {
		articleNotFound = true;
	}
}
</script>

<template>
	<div v-if="articleNotFound">Article not found.</div>
	<div v-else class="column items-center">
		<div class="prose">
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
