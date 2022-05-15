import { dayjs } from './dayjs.js';

export function getTodayDateString() {
	return dayjs().tz().format('YYYY-MM-DD');
}
