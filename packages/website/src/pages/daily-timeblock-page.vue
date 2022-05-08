<script setup lang="ts">
import 'github-markdown-css/github-markdown.css';

import { useRoute, useRouter } from 'vue-router';

import type { DailyTimeblockParts } from '~/utils/daily-timeblock.js';
import {
	fetchDailyTimeblock,
	getDailyTimeblockDateStrings,
} from '~/utils/daily-timeblock.js';
import { getMarkdownInstance } from '~/utils/markdown.js';

const route = useRoute();
const router = useRouter();
const dateString = route.params.dateString?.toString();
const dailyTimeblockDateStrings = getDailyTimeblockDateStrings();

async function getDailyTimeblockMarkdownFiles(): Promise<DailyTimeblockParts> {
	if (
		dateString === undefined ||
		!dailyTimeblockDateStrings.includes(dateString)
	) {
		await router.replace('/404');
		return {} as DailyTimeblockParts;
	} else {
		const dailyTimeblockMarkdownFiles = await fetchDailyTimeblock({
			dateString,
		});

		return dailyTimeblockMarkdownFiles;
	}
}

const dailyTimeblockMarkdownFiles =
	(await getDailyTimeblockMarkdownFiles()) ?? {};

const md = getMarkdownInstance();
</script>

<template>
	<div
		v-if="Object.keys(dailyTimeblockMarkdownFiles).length > 0"
		class="column items-center mt-4"
	>
		<div class="max-w-5xl w-full p-8 overflow-x-scroll markdown-body">
			<div
				v-html="md.render(dailyTimeblockMarkdownFiles['daily-plans.md'])"
			></div>
			<div
				v-html="md.render(dailyTimeblockMarkdownFiles['timeblocks.md'])"
			></div>
			<div
				v-html="md.render(dailyTimeblockMarkdownFiles['weekly-plans.md'])"
			></div>
			<div
				v-html="md.render(dailyTimeblockMarkdownFiles['quarterly-plans.md'])"
			></div>
			<div v-html="md.render(dailyTimeblockMarkdownFiles['thoughts.md'])"></div>
		</div>
	</div>
</template>
