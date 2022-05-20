import type {
	TaskListSnapshot,
	TaskListSnapshotsMetadata,
} from '@leonzalion-blog/content';
import ky from 'ky';

export async function fetchTaskListSnapshot({
	dateString,
}: {
	dateString: string;
}): Promise<TaskListSnapshot> {
	let taskListSnapshot: TaskListSnapshot;

	if (import.meta.env.DEV) {
		taskListSnapshot = (await import(
			`../../public/content/task-list-snapshots/json/${dateString}.json`
		)) as TaskListSnapshot;
	} else {
		const url = `/content/task-list-snapshots/json/${dateString}.json`;

		taskListSnapshot = await ky.get(url).json<TaskListSnapshot>();
	}

	return taskListSnapshot;
}

export async function fetchTaskListSnapshotsMetadata(): Promise<TaskListSnapshotsMetadata> {
	let taskListSnapshotsMetadata: TaskListSnapshotsMetadata;

	if (import.meta.env.DEV) {
		({ default: taskListSnapshotsMetadata } = (await import(
			'../../public/content/metadata/task-list-snapshots.json'
		)) as { default: TaskListSnapshotsMetadata });
	} else {
		taskListSnapshotsMetadata = await ky
			.get('/content/metadata/task-list-snapshots.json')
			.json<TaskListSnapshotsMetadata>();
	}

	return taskListSnapshotsMetadata;
}
