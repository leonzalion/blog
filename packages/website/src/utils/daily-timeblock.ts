import { outdent } from 'outdent';
import type { Component } from 'vue';
import { DailyTimeblock } from '~/types/daily-timeblock.js';

// eslint-disable-next-line import/extensions
import dailyTimeblocksMap from '~data/daily-timeblocks';

export async function importDailyTimeblock(timeblockDateString: string) {
	const { default: mdComponent } = (await import(
		`../assets/data/daily-timeblocks/${timeblockDateString}/*.md`
	)) as { default: Component };

	return mdComponent;
}

export function getDailyTimeblocksMap() {
	return dailyTimeblocksMap;
}

export function dailyTimeblockToDailyTimeblockString(
	dailyTimeblock: DailyTimeblock
) {
	return outdent`
		${dailyTimeblock.dailyPlans}
		${dailyTimeblock.timeblocks}
		${dailyTimeblock.weeklyPlans}
		${dailyTimeblock.quarterlyPlans}
		${dailyTimeblock.thoughts}
	`;
}
