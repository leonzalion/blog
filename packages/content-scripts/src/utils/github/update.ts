import { dayjs } from '@leonzalion-blog/date-utils';
import { Buffer } from 'node:buffer';

import type { GitTreeItem } from '~/types/github.js';
import { debug } from '~/utils/debug.js';
import { getOctokit } from '~/utils/github/octokit.js';

interface UpdateGithubFileProps {
	filePath: string;
	content: string;
	branch: string;
	message: string;
}

export async function updateGithubFile({
	filePath,
	content,
	branch,
	message,
}: UpdateGithubFileProps) {
	const octokit = getOctokit();

	const owner = 'leonzalion';
	const repo = 'blog';
	const contentBase64 = Buffer.from(content).toString('base64');

	debug(() => 'Retrieving the current branch ref...');
	const getRefResponse = await octokit.rest.git.getRef({
		owner,
		repo,
		ref: `heads/${branch}`,
	});
	const baseTree = getRefResponse.data.object.sha;

	debug(() => 'Creating the blob...');
	const blobResponse = await octokit.rest.git.createBlob({
		owner,
		repo,
		content: contentBase64,
		encoding: 'base64',
	});

	const treeItems: GitTreeItem[] = [];

	treeItems.push({
		path: filePath,
		type: 'blob',
		sha: blobResponse.data.sha,
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
		message: `[automated] ${message} on ${dayjs()
			.tz()
			.format('YYYY-MM-DD h:mm A')}`,
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
		ref: `heads/${branch}`,
		sha: commitResponse.data.sha,
	});

	return commitResponse.data.sha;
}
