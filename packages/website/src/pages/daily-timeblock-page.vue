<script setup lang="ts">
import 'github-markdown-css/github-markdown.css';

import type { DailyTimeblock } from '@leonzalion-blog/content';
import { dayjs } from '@leonzalion-blog/date-utils';
import { useRoute, useRouter } from 'vue-router';

import {
	fetchDailyTimeblock,
	getDailyTimeblocksMetadata,
} from '~/utils/daily-timeblock.js';
import { getMarkdownInstance } from '~/utils/markdown.js';

const route = useRoute();
const router = useRouter();
const dateString = route.params.dateString?.toString();

let dailyTimeblock = $ref<DailyTimeblock | undefined>();
(async () => {
	const dailyTimeblocksMetadata = await getDailyTimeblocksMetadata();

	if (
		dateString === undefined ||
		!dailyTimeblocksMetadata.dateStrings.includes(dateString)
	) {
		await router.replace('/404');
	} else {
		dailyTimeblock = await fetchDailyTimeblock({
			dateString,
		});
	}
})();

const md = getMarkdownInstance();
</script>

<template>
	<div v-if="dailyTimeblock !== undefined" class="column items-center">
		<div
			class="max-w-5xl w-full px-8 pb-4 overflow-x-scroll markdown-body pt-8"
		>
			<h1>
				{{ dayjs(dailyTimeblock.dateString).format('dddd, MMMM D, YYYY') }}
			</h1>
			<div v-html="md.render(dailyTimeblock.content)"></div>
		</div>
	</div>
</template>
