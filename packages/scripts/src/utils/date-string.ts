import dayjs from 'dayjs';

export function getYesterdayDateString() {
	const yesterday = dayjs().subtract(1, 'day');
	const year = String(yesterday.year()).padStart(2, '0');
	const month = String(yesterday.month() + 1).padStart(2, '0');
	const date = String(yesterday.date()).padStart(2, '0');

	return `${year}-${month}-${date}`;
}

export function getTodayDateString() {
	const today = dayjs();
	const year = String(today.year());
	const month = String(today.month() + 1).padStart(2, '0');
	const date = String(today.date()).padStart(2, '0');

	return `${year}-${month}-${date}`;
}

export function getTomorrowDateString() {
	const yesterday = dayjs().add(1, 'day');
	const year = String(yesterday.year()).padStart(2, '0');
	const month = String(yesterday.month() + 1).padStart(2, '0');
	const date = String(yesterday.date()).padStart(2, '0');

	return `${year}-${month}-${date}`;
}
