<script setup lang="ts">
import 'github-markdown-css/github-markdown.css';

import { Component, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
	DailyTimeblockComponents,
	getDailyTimeblockDateStrings,
	importDailyTimeblock,
} from '~/utils/daily-timeblock.js';

const route = useRoute();
const router = useRouter();
const dateString = route.params.dateString?.toString();
const dailyTimeblockDateStrings = getDailyTimeblockDateStrings();

async function getDailyTimeblockComponents() {
	if (
		dateString === undefined ||
		!dailyTimeblockDateStrings.includes(dateString)
	) {
		await router.replace('/404');
		return {} as DailyTimeblockComponents;
	} else {
		const dailyTimeblockComponents = await importDailyTimeblock(dateString);

		return dailyTimeblockComponents;
	}
}

const dailyTimeblockComponents = await getDailyTimeblockComponents();

const {
	DailyPlansComponent,
	QuarterlyPlansComponent,
	ThoughtsComponent,
	TimeblocksComponent,
	WeeklyPlansComponent,
} = dailyTimeblockComponents ?? ({} as DailyTimeblockComponents);

const dailyTimeblockContentElement = $ref<HTMLDivElement>();
onMounted(() => {
	const headings =
		dailyTimeblockContentElement.querySelectorAll<HTMLHeadingElement>('h1');
	for (const heading of Array.prototype.slice.call(headings).slice(1)) {
		(heading as HTMLHeadingElement).remove();
	}
});
</script>

<template>
	<div
		class="column items-center mt-4"
		v-if="DailyPlansComponent !== undefined"
	>
		<div
			class="max-w-5xl w-full p-8 overflow-x-scroll"
			ref="dailyTimeblockContentElement"
		>
			<DailyPlansComponent />
			<TimeblocksComponent />
			<WeeklyPlansComponent />
			<QuarterlyPlansComponent />
			<ThoughtsComponent />
		</div>
	</div>
</template>
