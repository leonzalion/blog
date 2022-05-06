import { outdent } from 'outdent';
import type { Component } from 'vue';
import { DailyTimeblock } from '~/types/daily-timeblock.js';

// eslint-disable-next-line import/extensions
import dailyTimeblockDateStrings from '~data/daily-timeblocks';

export interface DailyTimeblockComponents {
	DailyPlansComponent: Component;
	QuarterlyPlansComponent: Component;
	ThoughtsComponent: Component;
	TimeblocksComponent: Component;
	WeeklyPlansComponent: Component;
}

export async function importDailyTimeblock(
	timeblockDateString: string
): Promise<DailyTimeblockComponents> {
	const { default: DailyPlansComponent } = (await import(
		`../assets/data/daily-timeblocks/${timeblockDateString}/daily-plans.md`
	)) as { default: Component };

	const { default: QuarterlyPlansComponent } = (await import(
		`../assets/data/daily-timeblocks/${timeblockDateString}/quarterly-plans.md`
	)) as { default: Component };

	const { default: ThoughtsComponent } = (await import(
		`../assets/data/daily-timeblocks/${timeblockDateString}/thoughts.md`
	)) as { default: Component };

	const { default: TimeblocksComponent } = (await import(
		`../assets/data/daily-timeblocks/${timeblockDateString}/timeblocks.md`
	)) as { default: Component };

	const { default: WeeklyPlansComponent } = (await import(
		`../assets/data/daily-timeblocks/${timeblockDateString}/weekly-plans.md`
	)) as { default: Component };

	return {
		DailyPlansComponent,
		QuarterlyPlansComponent,
		ThoughtsComponent,
		TimeblocksComponent,
		WeeklyPlansComponent,
	};
}

export function getDailyTimeblockDateStrings() {
	return dailyTimeblockDateStrings;
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
