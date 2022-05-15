<script setup lang="ts">
import dateFormat from 'dateformat';
import dayjs from 'dayjs';
import { sort } from 'fast-sort';

import { getDailyTimeblockDateStrings } from '~/utils/daily-timeblock.js';

const dailyTimeblockDateStrings = sort(await getDailyTimeblockDateStrings()).by(
	{
		desc: (dateString) => new Date(dateString).getTime(),
	}
);
</script>

<template>
	<div class="column">
		<h1 class="font-bold text-4xl my-4">Daily Timeblocks</h1>
		<router-link
			v-for="dailyTimeblockDateString of dailyTimeblockDateStrings"
			:key="dailyTimeblockDateString"
			:to="`/daily-timeblock/${dailyTimeblockDateString}`"
			class="row group"
		>
			<div
				class="w-[4px] group-hover:(w-[5px] bg-gray-400) bg-gray-300 mr-2 self-stretch transition-all"
			></div>
			<div>
				{{ dateFormat(dayjs(dailyTimeblockDateString).toDate(), 'fullDate') }}
			</div>
		</router-link>
	</div>
</template>
