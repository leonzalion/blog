/**
	Creates a `dist/` folder with the directory structure to be deployed directly to Netlify.

	Creates the following folder structure:
	```
	- index.html
	- assets/
		- <the bundled HTML/CSS/JS assets that are sent to browsers>
	- content/
		- articles/
			- json/
				- <a list of generated JSON files representing the blog articles>
		- task-list-snapshots/
			- json/
				- <a list of generated JSON files representing my task list snapshots>
		- daily-timeblocks/
			- json/
				- <a list of generated JSON files representing my daily timeblocks>
		- uploads/
			- json/
				- <various media uploads (e.g. images) associated with content>
	```
*/

import { writeContentMetadata } from '@leonzalion-blog/content-scripts';
import { execaCommand } from 'execa';
import { getProjectDir } from 'lion-utils';
import * as fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const monorepoDir = getProjectDir(import.meta.url, { monorepoRoot: true });
process.chdir(monorepoDir);

fs.rmSync('dist', { recursive: true, force: true });

async function buildWebsite() {
	await execaCommand('pnpm build:website', { stdio: 'inherit' });
	await fs.promises.rename('packages/website/dist', 'dist');
}

await buildWebsite();
await writeContentMetadata({
	contentDir: path.join(monorepoDir, 'packages/content'),
});
