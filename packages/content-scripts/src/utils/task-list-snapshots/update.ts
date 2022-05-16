import type { TaskListSnapshotData } from '@leonzalion-blog/content';
import { dayjs } from '@leonzalion-blog/date-utils';
import { Buffer } from 'node:buffer';

import type { GitTreeItem } from '~/types/github.js';

import { getOctokit } from '../github/octokit.js';

export async function updateGithubTaskListSnapshot(
	taskListSnapshot: TaskListSnapshotData
): Promise<string> {
	const octokit = getOctokit();

	const owner = 'leonzalion';
	const repo = 'blog';
	const branchToUpdate = 'dev';

	console.info('Retrieving the current branch ref...');
	const getRefResponse = await octokit.rest.git.getRef({
		owner,
		repo,
		ref: `heads/${branchToUpdate}`,
	});
	const baseTree = getRefResponse.data.object.sha;

	console.info('Creating the blob...');
	const notionTaskBlobResponse = await octokit.rest.git.createBlob({
		owner,
		repo,
		content: Buffer.from(JSON.stringify(taskListSnapshot)).toString('base64'),
		encoding: 'base64',
	});

	const treeItems: GitTreeItem[] = [];

	treeItems.push({
		path: `packages/content/task-list-snapshots/json/${taskListSnapshot.dateString}.json`,
		type: 'blob',
		sha: notionTaskBlobResponse.data.sha,
		mode: '100644',
	});

	console.info('Creating the tree...');
	const createTreeResponse = await octokit.rest.git.createTree({
		owner,
		repo,
		tree: treeItems,
		base_tree: baseTree,
	});

	console.info('Creating the commit...');
	const commitResponse = await octokit.rest.git.createCommit({
		message: `[automated] Sync task list snapshot ${
			taskListSnapshot.dateString
		} from Notion on ${dayjs().tz().format('YYYY-MM-DD h:mm A')}`,
		owner,
		repo,
		tree: createTreeResponse.data.sha,
		parents: [baseTree],
	});

	console.info('Updating the ref...');
	await octokit.rest.git.updateRef({
		owner,
		repo,
		force: true,
		ref: `heads/${branchToUpdate}`,
		sha: commitResponse.data.sha,
	});

	return commitResponse.data.sha;
}