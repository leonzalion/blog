<script setup lang="ts">
import 'github-markdown-css/github-markdown.css';

import type { Component } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
	dailyTimeblockToDailyTimeblockString,
	getDailyTimeblocksMap,
	importDailyTimeblock,
} from '~/utils/daily-timeblock.js';

const route = useRoute();
const router = useRouter();
const dateString = route.params.dateString?.toString();

let DailyTimeblockComponent: Component;
let dailyTimeblockString: string;
if (dateString === undefined) {
	await router.replace('/404');
} else {
	const dailyTimeblock = getDailyTimeblocksMap()[dateString];
	if (dailyTimeblock === undefined) {
		await router.replace('/404');
	} else {
		DailyTimeblockComponent = await importDailyTimeblock(dateString);
		dailyTimeblockString = dailyTimeblockToDailyTimeblockString(dailyTimeblock);
	}
}

const timeblocksContainerElement = $ref<HTMLDivElement>();
</script>

<template>
	<div class="column items-center mt-4">
		<div class="max-w-5xl w-full p-8 overflow-x-scroll">
			<DailyTimeblockComponent />
		</div>
	</div>
</template>
