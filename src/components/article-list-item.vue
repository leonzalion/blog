<script setup lang="ts">
import dateFormat from 'dateformat';

import type { Article } from '~/types/article.js';

const { article } = defineProps<{
	article: Article;
}>();
</script>

<template>
	<router-link
		:key="article.title"
		:to="`/article/${article.slug}`"
		class="group"
	>
		<div class="row items-center">
			<div
				class="w-[4px] group-hover:(w-[5px] bg-gray-400) bg-gray-300 mr-2 self-stretch transition-all"
			></div>
			<div class="column">
				<span class="text-lg">{{ article.title }}</span>
				<span class="italic text-xs text-gray-500">
					{{ dateFormat(article.dateCreated, 'longDate') }}
				</span>
			</div>
		</div>
	</router-link>
</template>
