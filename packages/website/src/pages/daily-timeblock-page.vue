<script setup lang="ts">
import 'github-markdown-css/github-markdown.css';

import type { DailyTimeblockEntryData } from '@leonzalion-blog/content';
import { useRoute, useRouter } from 'vue-router';

import {
	fetchDailyTimeblock,
	getDailyTimeblocksMetadata,
} from '~/utils/daily-timeblock.js';
import { getMarkdownInstance } from '~/utils/markdown.js';

const route = useRoute();
const router = useRouter();
const dateString = route.params.dateString?.toString();
const dailyTimeblocksMetadata = await getDailyTimeblocksMetadata();

async function getDailyTimeblockMarkdownFiles(): Promise<DailyTimeblockEntryData> {
	if (
		dateString === undefined ||
		!dailyTimeblocksMetadata.dateStrings.includes(dateString)
	) {
		await router.replace('/404');
		return {} as DailyTimeblockEntryData;
	} else {
		const dailyTimeblockParts = await fetchDailyTimeblock({
			dateString,
		});

		return dailyTimeblockParts;
	}
}

const dailyTimeblockMarkdownFiles =
	(await getDailyTimeblockMarkdownFiles()) ?? {};

const md = getMarkdownInstance();
</script>

<template>
	<div
		v-if="Object.keys(dailyTimeblockMarkdownFiles).length > 0"
		class="column items-center"
	>
		<div class="max-w-5xl w-full px-8 pb-4 overflow-x-scroll markdown-body">
			<div v-html="md.render(dailyTimeblockMarkdownFiles['daily-plans'])"></div>
			<div v-html="md.render(dailyTimeblockMarkdownFiles['timeblocks'])"></div>
			<div
				v-html="md.render(dailyTimeblockMarkdownFiles['weekly-plans'])"
			></div>
			<div
				v-html="md.render(dailyTimeblockMarkdownFiles['quarterly-plans'])"
			></div>
			<div v-html="md.render(dailyTimeblockMarkdownFiles['thoughts'])"></div>
		</div>
	</div>
</template>
