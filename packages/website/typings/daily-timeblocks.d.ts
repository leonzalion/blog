declare module '~data/daily-timeblocks' {
	import type { DailyTimeblock } from '~/types/daily-timeblock.js';

	const dailyTimeblockDateStrings: Record<string, DailyTimeblock>;
	export default dailyTimeblockDateStrings;
}
