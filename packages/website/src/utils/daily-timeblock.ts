import type { Component } from 'vue';

// eslint-disable-next-line import/extensions
import dailyTimeblocksMap from '~data/daily-timeblocks';

export async function importDailyTimeblock(timeblockDateString: string) {
	const { default: mdComponent } = (await import(
		`../../../data/daily-timeblocks/${timeblockDateString}.md`
	)) as { default: Component };

	return mdComponent;
}

export function getDailyTimeblocksMap() {
	return dailyTimeblocksMap;
}
