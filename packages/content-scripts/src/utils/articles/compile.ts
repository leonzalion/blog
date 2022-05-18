import type {
	Article,
	ArticleFileMatter,
	DailyTimeblock,
} from '@leonzalion-blog/content';
import { dayjs } from '@leonzalion-blog/date-utils';
import matter from 'gray-matter';
import { Buffer } from 'node:buffer';
import * as fs from 'node:fs';
import * as path from 'node:path';

import type { GitTreeItem } from '~/types/github.js';
import { debug } from '~/utils/debug.js';
import { contentPackageDir } from '~/utils/paths.js';

import { getOctokit } from '../github/octokit.js';

/**
	Reads from `packages/content/articles/src` and compiles the entries into `packages/content/articles/json`
*/
export async function compileArticlesIntoJson() {
	const articlesSrcDir = path.join(contentPackageDir, 'articles/src');
	const articlesJsonDir = path.join(contentPackageDir, 'articles/json');

	const articleSlugs = await fs.promises.readdir(articlesSrcDir);
	await Promise.all(
		articleSlugs.map(async (articleSlug) => {
			const articleDir = path.join(articlesSrcDir, articleSlug);
			const contentMarkdown = await fs.promises.readFile(
				path.join(articleDir, 'content.md'),
				'utf8'
			);
			const { content, data } = matter(contentMarkdown);
			const { dateCreated, title, published } = data as ArticleFileMatter;

			// Don't compile the article if it isn't marked as ready to be published
			if (!published) {
				return;
			}

			const article: Article = {
				content,
				dateCreated,
				title,
				slug: articleSlug,
			};

			await fs.promises.writeFile(
				path.join(articlesJsonDir, `${articleSlug}.json`),
				JSON.stringify(article)
			);
		})
	);
}

export async function updateGithubDailyTimeblock(
	dailyTimeblock: DailyTimeblock
): Promise<string> {
	const octokit = getOctokit();

	const owner = 'leonzalion';
	const repo = 'blog';
	const branchToUpdate = 'dev';

	debug(() => 'Retrieving the current branch ref...');
	const getRefResponse = await octokit.rest.git.getRef({
		owner,
		repo,
		ref: `heads/${branchToUpdate}`,
	});
	const baseTree = getRefResponse.data.object.sha;

	debug(() => 'Creating the blob...');
	const notionTaskBlobResponse = await octokit.rest.git.createBlob({
		owner,
		repo,
		content: Buffer.from(JSON.stringify(dailyTimeblock)).toString('base64'),
		encoding: 'base64',
	});

	const treeItems: GitTreeItem[] = [];

	treeItems.push({
		path: `packages/content/daily-timeblocks/json/${dailyTimeblock.dateString}.json`,
		type: 'blob',
		sha: notionTaskBlobResponse.data.sha,
		mode: '100644',
	});

	debug(() => 'Creating the tree...');
	const createTreeResponse = await octokit.rest.git.createTree({
		owner,
		repo,
		tree: treeItems,
		base_tree: baseTree,
	});

	debug(() => 'Creating the commit...');
	const commitResponse = await octokit.rest.git.createCommit({
		message: `[automated] Sync daily timeblock ${
			dailyTimeblock.dateString
		} from Notion on ${dayjs().tz().format('YYYY-MM-DD h:mm A')}`,
		owner,
		repo,
		tree: createTreeResponse.data.sha,
		parents: [baseTree],
	});

	debug(() => 'Updating the ref...');
	await octokit.rest.git.updateRef({
		owner,
		repo,
		force: true,
		ref: `heads/${branchToUpdate}`,
		sha: commitResponse.data.sha,
	});

	return commitResponse.data.sha;
}