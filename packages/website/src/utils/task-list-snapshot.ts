import type {
	TaskListSnapshot,
	TaskListSnapshotsMetadata,
} from '@leonzalion-blog/content';
import { dayjs } from '@leonzalion-blog/date-utils';
import { sort } from 'fast-sort';
import ky from 'ky';

export async function fetchTaskListSnapshot({
	dateString,
}: {
	dateString: string;
}): Promise<TaskListSnapshot> {
	return ky
		.get(`/content/task-list-snapshots/json/${dateString}.json`)
		.json<TaskListSnapshot>();
}

export async function fetchTaskListSnapshotsMetadata(): Promise<TaskListSnapshotsMetadata> {
	return ky
		.get('/content/metadata/task-list-snapshots.json')
		.json<TaskListSnapshotsMetadata>();
}

export function getTaskListSnapshotMarkdown(
	taskListSnapshot: TaskListSnapshot
) {
	if (taskListSnapshot === undefined) {
		return '';
	}

	const sortedTasks = sort(taskListSnapshot.tasks).by({
		asc: (task) =>
			task.deadline === undefined
				? Number.POSITIVE_INFINITY
				: new Date(task.deadline),
	});
	let markdown = '';
	for (const task of sortedTasks) {
		// Skip completed tasks which were due before today
		if (
			task.deadline !== undefined &&
			dayjs(task.deadline).isBefore(taskListSnapshot.dateString) &&
			task.completed
		) {
			continue;
		}

		if (task.completed) {
			markdown += '- [x] ';
		} else {
			markdown += '- [ ] ';
		}

		markdown += task.description;

		if (task.deadline === undefined) {
			if (task.deadlineNotes !== '') {
				markdown += ` (**Deadline:** _${task.deadlineNotes}_)`;
			}
		} else {
			if (task.deadlineNotes === '') {
				markdown += ` (**Deadline:** ${task.deadline})`;
			} else {
				markdown += ` (**Deadline:** ${task.deadline}, ${task.deadlineNotes})`;
			}
		}

		markdown += '\n';
	}

	return markdown;
}
