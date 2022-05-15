/**
	Creates a `dist/` folder with the directory structure to be deployed directly to Netlify.

	Creates the following folder structure:
	```
	packages/
		- website/
			- dist/
				- <the bundled HTML/CSS/JS assets that are sent to browsers>
		- articles/
			- generated/
				- <a list of generated JSON files representing the blog articles>
		- tasks/
			- generated/
				- <a list of generated JSON files representing my tasks>
		- daily-timeblocks/
			- generated/
				- <a list of generated JSON files representing my daily timeblocks>
	```
*/

import { execaCommand } from 'execa';
import { chProjectDir } from 'lion-system';
import * as fs from 'node:fs';
import * as path from 'node:path';

chProjectDir(import.meta.url, { monorepoRoot: true });

// Create a temporary global `dist/` folder where the final folder structure will go
fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist', { recursive: true });

async function buildWebsite() {
	await fs.promises.mkdir('dist/packages/website', { recursive: true });
	await execaCommand('pnpm build:website', { stdio: 'inherit' });
	await fs.promises.rename(
		'packages/website/dist',
		'dist/packages/website/dist'
	);
}

async function createNetlifyCMSPackages() {
	const netlifyCMSPackages = [
		'packages/articles/generated',
		'packages/daily-timeblocks/generated',
		'packages/tasks/generated',
	];

	await Promise.all(
		netlifyCMSPackages.map(async (netlifyCMSPackage) => {
			const distPackageDir = path.join('dist', netlifyCMSPackage);
			await fs.promises.mkdir(distPackageDir, { recursive: true });
			await fs.promises.cp(netlifyCMSPackage, distPackageDir, {
				recursive: true,
			});
		})
	);
}

await Promise.all([buildWebsite(), createNetlifyCMSPackages()]);
