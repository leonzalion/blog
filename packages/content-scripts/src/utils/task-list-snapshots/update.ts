import type { TaskListSnapshot } from '@leonzalion-blog/content';
import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';

import { updateGithubFile } from '~/utils/github/update.js';
import { generateTaskListSnapshotsMetadata } from '~/utils/metadata.js';

export async function updateGithubTaskListSnapshot({
	contentDir,
	taskListSnapshot,
}: {
	contentDir: string;
	taskListSnapshot: TaskListSnapshot;
}): Promise<void> {
	const taskListSnapshotJson = JSON.stringify(taskListSnapshot);

	const message = `Synchronized task list snapshot for ${taskListSnapshot.dateString}`;

	if (process.env.NODE_ENV === 'production') {
		await fs.promises.writeFile(
			path.join(
				contentDir,
				`task-list-snapshots/json/${taskListSnapshot.dateString}.json`
			),
			taskListSnapshotJson
		);
	}

	await updateGithubFile({
		filePath: `packages/content/task-list-snapshots/json/${taskListSnapshot.dateString}.json`,
		branch: 'dev',
		content: taskListSnapshotJson,
		message,
	});
	await updateGithubFile({
		filePath: `content/task-list-snapshots/json/${taskListSnapshot.dateString}.json`,
		branch: 'netlify',
		content: taskListSnapshotJson,
		message,
	});

	// Generate metadata
	const taskListSnapshotsMetadata = await generateTaskListSnapshotsMetadata({
		contentDir,
	});
	const taskListSnapshotsMetadataJson = JSON.stringify(
		taskListSnapshotsMetadata
	);

	if (process.env.NODE_ENV === 'production') {
		await fs.promises.writeFile(
			path.join(contentDir, `metadata/task-list-snapshots.json`),
			taskListSnapshotsMetadataJson
		);
	}

	await updateGithubFile({
		filePath: `packages/content/metadata/task-list-snapshots.json`,
		branch: 'dev',
		content: taskListSnapshotsMetadataJson,
		message: 'Synchronized task list snapshots metadata',
	});
	await updateGithubFile({
		filePath: `content/metadata/task-list-snapshots.json`,
		branch: 'netlify',
		content: taskListSnapshotsMetadataJson,
		message: 'Synchronized task list snapshots metadata',
	});
}
