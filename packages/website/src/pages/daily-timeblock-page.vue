<script setup lang="ts">
import 'github-markdown-css/github-markdown.css';

import Markdown from 'markdown-it';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { DailyTimeblockParts } from '~/utils/daily-timeblock.js';
import {
	fetchDailyTimeblock,
	getDailyTimeblockDateStrings,
} from '~/utils/daily-timeblock.js';

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

const dailyTimeblockContentElement = $ref<HTMLDivElement>();

onMounted(() => {
	const headings =
		dailyTimeblockContentElement.querySelectorAll<HTMLHeadingElement>('h1');
	for (const heading of Array.prototype.slice.call(headings).slice(1)) {
		(heading as HTMLHeadingElement).remove();
	}
});

const md = new Markdown();
</script>

<template>
	<div
		v-if="Object.keys(dailyTimeblockContentElement).length > 0"
		class="column items-center mt-4"
	>
		<div
			ref="dailyTimeblockContentElement"
			class="max-w-5xl w-full p-8 overflow-x-scroll"
		>
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
