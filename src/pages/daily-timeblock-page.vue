<script setup lang="ts">
import 'github-markdown-css/github-markdown.css';

import type { Component } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { importDailyTimeblock } from '~/utils/daily-timeblock.js';

const route = useRoute();
const router = useRouter();
const dateString = route.params.dateString?.toString();

let DailyTimeblock: Component;
if (dateString === undefined) {
	await router.replace('/404');
} else {
	DailyTimeblock = await importDailyTimeblock(dateString);
}
</script>

<template>
	<div class="column items-center mt-4">
		<div class="max-w-5xl p-8">
			<DailyTimeblock />
		</div>
	</div>
</template>
