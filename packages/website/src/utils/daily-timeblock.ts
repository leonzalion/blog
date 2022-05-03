import type { Component } from 'vue';

// eslint-disable-next-line import/extensions
import dailyTimeblockDateStrings from '~data/daily-timeblocks';

export async function importDailyTimeblock(timeblockDateString: string) {
	const { default: mdComponent } = (await import(
		`../../data/daily-timeblocks/${timeblockDateString}.md`
	)) as { default: Component };

	return mdComponent;
}

export function getDailyTimeblockDateStrings() {
	return dailyTimeblockDateStrings;
}
