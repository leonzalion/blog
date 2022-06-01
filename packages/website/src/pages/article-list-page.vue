<script setup lang="ts">
import { sort } from 'fast-sort';

import ArticleListItem from '~/components/article-list-item.vue';
import { getArticlesMetadata } from '~/utils/article.js';

const articlesMetadata = await getArticlesMetadata();

const articleListings = sort(
	Object.values(Object.values(articlesMetadata))
).desc((articleListing) => articleListing.datePublished);
</script>

<template>
	<h1 class="font-bold text-4xl my-4">Articles</h1>
	<ArticleListItem
		v-for="articleListing of articleListings"
		:key="articleListing.title"
		:article-listing="articleListing"
	/>
</template>
