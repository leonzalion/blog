<script setup lang="ts">
import 'github-markdown-css/github-markdown.css';

import type {
	DailyTimeblock,
	TaskListSnapshot,
	TogglDailyResult,
} from '@leonzalion-blog/content';
import { dayjs } from '@leonzalion-blog/date-utils';
import type { ChartData, ChartOptions } from 'chart.js';
import {
	BarElement,
	CategoryScale,
	Chart,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import mapObject from 'map-obj';
import prettyMilliseconds from 'pretty-ms';
import { Bar } from 'vue-chartjs';
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

Chart.register(Title, Tooltip, BarElement, CategoryScale, LinearScale);

const togglActivityTypeChartData = $computed((): ChartData<'bar', number[]> => {
	if (togglDailyResult === undefined) {
		return { labels: [], datasets: [] };
	}

	const t = mapObject(togglDailyResult.activityTypeTotals, (key, value) => [
		key,
		// Converting value from milliseconds to minutes
		value / 1000 / 60,
	]);
	const data: ChartData<'bar', number[]> = {
		labels: ['Dialect', 'Precommit', 'Side Projects', 'Leisure'],
		datasets: [
			{
				data: [t.Dialect, t.Precommit, t['Side Project'], t.Leisure],
				backgroundColor: ['lightpurple', 'orange', 'lightblue', 'green'],
			},
		],
	};

	return data;
});

function getActivityTypeColor(activityType: string | undefined) {
	switch (activityType) {
		case 'Dialect':
			return 'purple';
		case 'Precommit':
			return 'orange';
		case 'Side Project':
			return 'lightblue';
		case 'Leisure':
			return 'green';
		default:
			return 'gray';
	}
}

const chartOptions: ChartOptions<'bar'> = {};

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
			<div
				v-if="
					togglDailyResult !== undefined &&
					togglDailyResult.timeEntries.length > 0
				"
				class="border-1 py-2 px-4"
			>
				<div
					v-for="(timeEntry, entryIndex) of togglDailyResult.timeEntries ?? []"
					:key="entryIndex"
					class="grid grid-cols-[max-content,1fr] gap-2 items-center"
				>
					<div class="column items-center">
						<div class="row items-center gap-1">
							<div
								:style="{
									backgroundColor: getActivityTypeColor(timeEntry.activityType),
									width: '7px',
									height: '7px',
								}"
							></div>
							<div class="text-sm">
								{{ timeEntry.activityType ?? 'Unknown' }}
							</div>
						</div>

						<div class="text-gray-600 text-xs">
							{{
								prettyMilliseconds(
									dayjs(timeEntry.at).diff(timeEntry.start, 'milliseconds')
								)
							}}
						</div>
					</div>

					<div class="row items-stretch">
						<div class="bg-gray-300 mx-2 w-[1px]"></div>
						<div class="font-bold">{{ timeEntry.description }}</div>
					</div>
				</div>
			</div>
			<div v-else>
				<em>No entries.</em>
			</div>

			<div class="max-w-lg mx-auto pt-4">
				<Bar
					:chart-options="chartOptions"
					:chart-data="togglActivityTypeChartData"
				/>
			</div>

			<h2
				v-if="!dailyTimeblock.content.trimStart().startsWith('## Timeblocks')"
			>
				Timeblocks
			</h2>
			<div v-html="md.render(dailyTimeblock.content)"></div>

			<template v-if="taskListSnapshot !== undefined">
				<h2>Task List Snapshot</h2>
				<div v-html="md.render(taskListSnapshotMarkdown)"></div>
			</template>
		</div>
	</div>
</template>
