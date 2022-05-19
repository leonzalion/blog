import type {
	Article,
	ArticlesMetadata,
	DailyTimeblocksMetadata,
	TaskListSnapshot,
	TaskListSnapshotsMetadata,
} from '@leonzalion-blog/content';
import * as fs from 'node:fs';
import * as path from 'node:path';

import { contentPackageDir } from '~/utils/paths.js';

const metadataDir = path.join(contentPackageDir, 'metadata');

export async function generateArticlesMetadata(): Promise<ArticlesMetadata> {
	const articlesDir = path.join(contentPackageDir, 'articles/json');

	const articleMetadata = {} as ArticlesMetadata;

	const articleJsonFiles = await fs.promises.readdir(articlesDir);
	for (const articleJsonFile of articleJsonFiles) {
		if (articleJsonFile === '.gitkeep') {
			continue;
		}

		const articleSlug = path.parse(articleJsonFile).name;

		const { title, dateCreated, slug } = JSON.parse(
			fs.readFileSync(path.join(articlesDir, articleJsonFile), 'utf8')
		) as Article;

		articleMetadata[articleSlug] = { title, dateCreated, slug };
	}

	return articleMetadata;
}

export async function generateTaskListSnapshotsMetadata(): Promise<TaskListSnapshotsMetadata> {
	const taskListSnapshotsDir = path.join(
		contentPackageDir,
		'task-list-snapshots/json'
	);
	const taskListSnapshotsMetadata = {} as TaskListSnapshotsMetadata;

	const taskListSnapshotNames = await fs.promises.readdir(taskListSnapshotsDir);
	for (const taskListSnapshotName of taskListSnapshotNames) {
		if (taskListSnapshotName === '.gitkeep') {
			continue;
		}

		const taskListSnapshotPath = path.join(
			taskListSnapshotsDir,
			taskListSnapshotName
		);

		const { dateString } = JSON.parse(
			fs.readFileSync(taskListSnapshotPath, 'utf8')
		) as TaskListSnapshot;

		taskListSnapshotsMetadata[dateString] = {
			dateString,
		};
	}

	return taskListSnapshotsMetadata;
}

export async function generateDailyTimeblocksMetadata(): Promise<DailyTimeblocksMetadata> {
	const dailyTimeblocksDir = path.join(
		contentPackageDir,
		'daily-timeblocks/json'
	);

	const dailyTimeblockFileNames = await fs.promises.readdir(dailyTimeblocksDir);
	const dailyTimeblockDateStrings = dailyTimeblockFileNames
		.filter((fileName) => fileName !== '.gitkeep')
		.map((fileName) => path.parse(fileName).name);
	const dailyTimeblocksMetadata: DailyTimeblocksMetadata = {
		dateStrings: dailyTimeblockDateStrings,
	};

	return dailyTimeblocksMetadata;
}

export async function writeContentMetadata() {
	const [articlesMetadata, taskListSnapshotsMetadata, dailyTimeblocksMetadata] =
		await Promise.all([
			generateArticlesMetadata(),
			generateTaskListSnapshotsMetadata(),
			generateDailyTimeblocksMetadata(),
		]);

	await fs.promises.writeFile(
		path.join(metadataDir, 'articles.json'),
		JSON.stringify(articlesMetadata)
	);

	await fs.promises.writeFile(
		path.join(metadataDir, 'daily-timeblocks.json'),
		JSON.stringify(dailyTimeblocksMetadata)
	);

	await fs.promises.writeFile(
		path.join(metadataDir, 'task-list-snapshots.json'),
		JSON.stringify(taskListSnapshotsMetadata)
	);
}
