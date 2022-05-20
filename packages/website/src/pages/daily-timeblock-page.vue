<script setup lang="ts">
import 'github-markdown-css/github-markdown.css';

import type {
	DailyTimeblock,
	TaskListSnapshot,
} from '@leonzalion-blog/content';
import { dayjs } from '@leonzalion-blog/date-utils';
import { sort } from 'fast-sort';
import { useRoute, useRouter } from 'vue-router';

import {
	fetchDailyTimeblock,
	getDailyTimeblocksMetadata,
} from '~/utils/daily-timeblock.js';
import { getMarkdownInstance } from '~/utils/markdown.js';
import { fetchTaskListSnapshot } from '~/utils/task-list-snapshot.js';

const route = useRoute();
const router = useRouter();
const dateString = route.params.dateString?.toString();

let dailyTimeblock = $ref<DailyTimeblock | undefined>();
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
	}
})();

const taskListSnapshotMarkdown = $computed(() => {
	if (taskListSnapshot === undefined) {
		return '';
	}

	const sortedTasks = sort(taskListSnapshot.tasks).by({
		asc: (task) =>
			task.deadline === undefined
				? Number.POSITIVE_INFINITY
				: new Date(task.deadline),
	});
	let markdown = '';
	for (const task of sortedTasks) {
		// Skip completed tasks which were due before today
		if (
			task.deadline !== undefined &&
			dayjs(task.deadline).isBefore(dateString) &&
			task.completed
		) {
			continue;
		}

		if (task.completed) {
			markdown += '- [x] ';
		} else {
			markdown += '- [ ] ';
		}

		markdown += task.description;

		if (task.deadline === undefined) {
			if (task.deadlineNotes !== undefined) {
				markdown += ` (**Deadline:** _${task.deadlineNotes}_)`;
			}
		} else {
			if (task.deadlineNotes === '') {
				markdown += ` (**Deadline:** ${task.deadline})`;
			} else {
				markdown += ` (**Deadline:** ${task.deadline}, ${task.deadlineNotes})`;
			}
		}

		markdown += '\n';
	}

	return markdown;
});

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

			<template v-if="taskListSnapshot !== undefined">
				<h2>Task List Snapshot</h2>
				<div v-html="md.render(taskListSnapshotMarkdown)"></div>
			</template>
		</div>
	</div>
</template>
