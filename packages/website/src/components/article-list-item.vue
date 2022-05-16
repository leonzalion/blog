<script setup lang="ts">
import type { ArticleListing } from '@leonzalion-blog/content';
import { dayjs } from '@leonzalion-blog/date-utils';
import dateFormat from 'dateformat';

const { articleListing } = defineProps<{
	articleListing: ArticleListing;
}>();
</script>

<template>
	<router-link
		:key="articleListing.title"
		:to="`/article/${articleListing.slug}`"
		class="group"
	>
		<div class="row items-center">
			<div
				class="w-[4px] group-hover:(w-[5px] bg-gray-400) bg-gray-300 mr-2 self-stretch transition-all"
			></div>
			<div class="column">
				<span class="text-lg">{{ articleListing.title }}</span>
				<span class="italic text-xs text-gray-500">
					{{
						dateFormat(dayjs(articleListing.dateCreated).toDate(), 'longDate')
					}}
				</span>
			</div>
		</div>
	</router-link>
</template>
