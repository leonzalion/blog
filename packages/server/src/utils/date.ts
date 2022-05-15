import dayjs from 'dayjs';

export function getTodayDateString() {
	return dayjs().tz().format('YYYY-MM-DD');
}
