import type {
	ArticleEntryData,
	ArticlesMetadata,
	DailyTimeblocksMetadata,
	TaskListSnapshotData,
	TaskListSnapshotsMetadata,
} from '@leonzalion-blog/content';
import * as fs from 'node:fs';
import * as path from 'node:path';

import { contentPackageDir } from '~/utils/paths.js';

const metadataDir = path.join(contentPackageDir, 'metadata');

async function generateArticlesMetadata(): Promise<void> {
	const articlesDir = path.join(contentPackageDir, 'articles/json');

	const articleMetadata = {} as ArticlesMetadata;

	const articleFolderNames = await fs.promises.readdir(articlesDir);
	for (const articleFolderName of articleFolderNames) {
		if (articleFolderName === '.gitkeep') {
			continue;
		}

		const articleSlug = articleFolderName;

		const { title, dateCreated, slug } = JSON.parse(
			fs.readFileSync(path.join(articlesDir, articleSlug), 'utf8')
		) as ArticleEntryData;

		articleMetadata[articleSlug] = { title, dateCreated, slug };
	}

	await fs.promises.writeFile(
		path.join(metadataDir, 'articles.json'),
		JSON.stringify(articleMetadata)
	);
}

async function generateTaskListSnapshotsMetadata(): Promise<void> {
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
		) as TaskListSnapshotData;

		taskListSnapshotsMetadata[dateString] = {
			dateString,
		};
	}

	await fs.promises.writeFile(
		path.join(metadataDir, 'task-list-snapshots.json'),
		JSON.stringify(taskListSnapshotsMetadata)
	);
}

async function generateDailyTimeblocksMetadata(): Promise<void> {
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

	await fs.promises.writeFile(
		path.join(metadataDir, 'daily-timeblocks.json'),
		JSON.stringify(dailyTimeblocksMetadata)
	);
}

export async function generateContentMetadata() {
	await Promise.all([
		generateArticlesMetadata(),
		generateTaskListSnapshotsMetadata(),
		generateDailyTimeblocksMetadata(),
	]);
}
