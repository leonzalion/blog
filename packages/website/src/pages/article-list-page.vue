<script setup lang="ts">
import { sort } from 'fast-sort';

import ArticleListItem from '~/components/article-list-item.vue';
import { getArticlesMap } from '~/utils/article.js';

const articlesMap = await getArticlesMap();

const articles = sort(Object.values(articlesMap.fileNames)).desc(
	(article) => article
);
</script>

<template>
	<h1 class="font-bold text-4xl my-4">Articles</h1>
	<ArticleListItem
		v-for="article of articles"
		:key="article.title"
		:article="article"
	/>
</template>
