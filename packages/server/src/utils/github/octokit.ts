import process from 'node:process';
import { Octokit } from 'octokit';
import onetime from 'onetime';

export const getOctokit: () => InstanceType<typeof Octokit> = onetime(
	() =>
		new Octokit({
			auth: process.env.GITHUB_TOKEN,
		})
);
