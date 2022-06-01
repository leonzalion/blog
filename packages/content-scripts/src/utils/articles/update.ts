import type { Article } from '@leonzalion-blog/content';
import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';

import { updateGithubFile } from '~/utils/github/update.js';
import { generateArticlesMetadata } from '~/utils/metadata.js';

export async function updateGithubArticle({
	contentDir,
	article,
}: {
	contentDir: string;
	article: Article;
}): Promise<void> {
	const articleJson = JSON.stringify(article);
	const message = `Synchronized article ${article.slug}`;

	if (process.env.NODE_ENV === 'production') {
		await fs.promises.writeFile(
			path.join(contentDir, `articles/json/${article.slug}.json`),
			articleJson
		);
	}

	await updateGithubFile({
		branch: 'dev',
		content: articleJson,
		filePath: `packages/content/articles/json/${article.slug}.json`,
		message,
	});
	await updateGithubFile({
		branch: 'netlify',
		content: articleJson,
		filePath: `content/articles/json/${article.slug}.json`,
		message,
	});

	// Generate metadata
	const articlesMetadata = await generateArticlesMetadata({
		contentDir,
	});
	const articlesMetadataJson = JSON.stringify(articlesMetadata);
	if (process.env.NODE_ENV === 'production') {
		await fs.promises.writeFile(
			path.join(contentDir, `metadata/articles.json`),
			articlesMetadataJson
		);
	}

	await updateGithubFile({
		filePath: `packages/content/metadata/articles.json`,
		branch: 'dev',
		content: articlesMetadataJson,
		message: 'Synchronized article metadata',
	});
	await updateGithubFile({
		filePath: `content/metadata/articles.json`,
		branch: 'netlify',
		content: articlesMetadataJson,
		message: 'Synchronized article metadata',
	});
}
