<script setup lang="ts">
import ArticleListItem from '~/components/article-list-item.vue';
import { getArticlesMap } from '~/utils/article.js';

const articlesMap = getArticlesMap();

const articles = Object.values(articlesMap);
</script>

<template>
	<h1 class="font-bold text-4xl my-4">Articles</h1>
	<ArticleListItem
		v-for="article of articles"
		:key="article.title"
		:article="article"
	/>
</template>
