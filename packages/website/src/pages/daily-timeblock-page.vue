<script setup lang="ts">
import 'github-markdown-css/github-markdown.css';

import jquery from 'jquery';
import type { Component } from 'vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { DailyTimeblock } from '~/types/daily-timeblock.js';
import {
	getDailyTimeblocksMap,
	importDailyTimeblock,
} from '~/utils/daily-timeblock.js';

const route = useRoute();
const router = useRouter();
const dateString = route.params.dateString?.toString();

let DailyTimeblockComponent: Component;
let dailyTimeblock: DailyTimeblock;
if (dateString === undefined) {
	await router.replace('/404');
} else {
	DailyTimeblockComponent = await importDailyTimeblock(dateString);
	dailyTimeblock = getDailyTimeblocksMap()[dateString]!;
}

const timeblocksContainerElement = $ref<HTMLDivElement>();

onMounted(() => {
	const timeblocksHeader = jquery("#daily-timeblock h2:contains('Timeblocks')");
	for (const timeblock of timeblocksHeader.nextAll()) {
		timeblocksContainerElement.append(timeblock);
	}
});
</script>

<template>
	<div class="column items-center mt-4">
		<div class="max-w-5xl p-8">
			<DailyTimeblockComponent id="daily-timeblock" />
		</div>
		<div class="row">
			<div ref="timeblocksContainerElement"></div>
			<div>{{ dailyTimeblock.togglData }}</div>
		</div>
	</div>
</template>
