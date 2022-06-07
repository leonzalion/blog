<script setup lang="ts">
import 'github-markdown-css/github-markdown.css';

import type {
	DailyTimeblock,
	TaskListSnapshot,
	TogglDailyResult,
} from '@leonzalion-blog/content';
import { dayjs } from '@leonzalion-blog/date-utils';
import { useRoute, useRouter } from 'vue-router';

import {
	fetchDailyTimeblock,
	getDailyTimeblocksMetadata,
} from '~/utils/daily-timeblock.js';
import { getMarkdownInstance } from '~/utils/markdown.js';
import {
	fetchTaskListSnapshot,
	getTaskListSnapshotMarkdown,
} from '~/utils/task-list-snapshot.js';
import { fetchTogglDailyResults } from '~/utils/toggl-daily-results.js';

const route = useRoute();
const router = useRouter();
const dateString = route.params.dateString?.toString();

let dailyTimeblock = $ref<DailyTimeblock | undefined>();
let togglDailyResult = $ref<TogglDailyResult | undefined>();
let taskListSnapshot = $ref<TaskListSnapshot | undefined>();

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
		taskListSnapshot = await fetchTaskListSnapshot({
			dateString,
		});
		togglDailyResult = await fetchTogglDailyResults({
			dateString,
		});
	}
})();

const taskListSnapshotMarkdown = $computed(() =>
	taskListSnapshot === undefined
		? ''
		: getTaskListSnapshotMarkdown(taskListSnapshot)
);

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

			<h2>Toggl Data</h2>
			<template
				v-if="
					togglDailyResult !== undefined &&
					togglDailyResult.timeEntries.length > 0
				"
			>
				<div
					v-for="(timeEntry, entryIndex) of togglDailyResult?.timeEntries"
					:key="entryIndex"
				>
					<div>{{ timeEntry.description }}</div>
				</div>
			</template>
			<div v-else>
				<em>No entries.</em>
			</div>

			<div v-html="md.render(dailyTimeblock.content)"></div>

			<template v-if="taskListSnapshot !== undefined">
				<h2>Task List Snapshot</h2>
				<div v-html="md.render(taskListSnapshotMarkdown)"></div>
			</template>
		</div>
	</div>
</template>
