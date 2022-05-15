import { getOctokit } from '~/utils/github/octokit.js';

export async function retrieveGithubFiles(path: string) {
	const octokit = getOctokit();

	// Retrieving the existing announcements from the GitHub repository
	const octokitResponse = await octokit.request(
		'GET /repos/{owner}/{repo}/contents/{path}',
		{
			owner: 'leonzalion',
			repo: 'blog',
			path,
			ref: 'dev',
		}
	);

	const githubFiles = octokitResponse.data;

	return githubFiles;
}
