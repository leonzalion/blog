import type {
	ArticleData,
	ArticleMetadata,
	TasksData,
	TasksMetadata,
} from '@leonzalion-blog/content';
import * as fs from 'node:fs';
import * as path from 'node:path';

import { contentPackageDir } from '~/utils/paths.js';

const metadataDir = path.join(contentPackageDir, 'metadata');

async function generateArticlesMetadata(): Promise<void> {
	const articlesDir = path.join(contentPackageDir, 'articles/json');

	const articleMetadata = {} as ArticleMetadata;

	const articleSlugs = await fs.promises.readdir(articlesDir);
	for (const articleSlug of articleSlugs) {
		const { title, dateCreated, slug } = JSON.parse(
			fs.readFileSync(path.join(articlesDir, articleSlug), 'utf8')
		) as ArticleData;

		articleMetadata[articleSlug] = { title, dateCreated, slug };
	}

	await fs.promises.writeFile(
		path.join(metadataDir, 'articles.json'),
		JSON.stringify(articleMetadata)
	);
}

async function generateTasksMetadata(): Promise<void> {
	const tasksDir = path.join(contentPackageDir, 'tasks/json');
	const tasksMetadata = {} as TasksMetadata;

	const taskFileNames = await fs.promises.readdir(tasksDir);
	for (const tasksFileName of taskFileNames) {
		const taskFilePath = path.join(tasksDir, tasksFileName);

		const { content, dateString } = JSON.parse(
			fs.readFileSync(taskFilePath, 'utf8')
		) as TasksData;

		tasksMetadata[dateString] = { content, dateString };
	}

	await fs.promises.writeFile(
		path.join(metadataDir, 'tasks.json'),
		JSON.stringify(tasksMetadata)
	);
}

async function generateDailyTimeblocksMetadata(): Promise<void> {
	const dailyTimeblocksDir = path.join(
		contentPackageDir,
		'daily-timeblocks/json'
	);

	const dailyTimeblockFileNames = await fs.promises.readdir(dailyTimeblocksDir);
	const dailyTimeblockDateStrings = dailyTimeblockFileNames.map(
		(fileName) => path.parse(fileName).name
	);
	const dailyTimeblocksMetadata = dailyTimeblockDateStrings;

	await fs.promises.writeFile(
		path.join(metadataDir, 'daily-timeblocks.json'),
		JSON.stringify(dailyTimeblocksMetadata)
	);
}

export async function generateContentMetadata() {
	await Promise.all([
		generateArticlesMetadata(),
		generateTasksMetadata(),
		generateDailyTimeblocksMetadata(),
	]);
}
