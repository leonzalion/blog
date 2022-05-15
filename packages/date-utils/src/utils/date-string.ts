import { dayjs } from './dayjs.js';

export function getTodayDateString() {
	return dayjs().tz().format('YYYY-MM-DD');
}

export function getYesterdayDateString() {
	return dayjs().tz().subtract(1, 'day').format('YYYY-MM-DD');
}

export function getTomorrowDateString() {
	return dayjs().tz().add(1, 'day').format('YYYY-MM-DD');
}
