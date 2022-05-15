/**
	Creates a `dist/` folder with the directory structure to be deployed directly to Netlify.

	Creates the following folder structure:
	```
	- index.html
	- assets/
		- <the bundled HTML/CSS/JS assets that are sent to browsers>
	- content/
		- articles/
			- <a list of generated JSON files representing the blog articles>
		- tasks/
			- <a list of generated JSON files representing my tasks>
		- daily-timeblocks/
			- <a list of generated JSON files representing my daily timeblocks>
		- uploads/
			- <various media uploads (e.g. images) associated with content>
	```
*/

import { execaCommand } from 'execa';
import { chProjectDir } from 'lion-system';
import * as fs from 'node:fs';
import * as path from 'node:path';

chProjectDir(import.meta.url, { monorepoRoot: true });

fs.rmSync('dist', { recursive: true, force: true });

async function buildWebsite() {
	await fs.promises.mkdir('dist/packages/website', { recursive: true });
	await execaCommand('pnpm build:website', { stdio: 'inherit' });
	await fs.promises.rename('packages/website/dist', 'dist');
}

await buildWebsite();

async function createNetlifyCMSPackages() {
	const netlifyCMSPackages = ['articles', 'daily-timeblocks', 'tasks'];

	await Promise.all(
		netlifyCMSPackages.map(async (netlifyCMSPackage) => {
			const distPackageDir = path.join('dist/content', netlifyCMSPackage);
			await fs.promises.mkdir(distPackageDir, { recursive: true });
			await fs.promises.cp(
				path.join('packages', netlifyCMSPackage, 'generated'),
				distPackageDir,
				{
					recursive: true,
				}
			);
		})
	);

	await fs.promises.mkdir('dist/content/uploads', { recursive: true });
}

await createNetlifyCMSPackages();
