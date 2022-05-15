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

import { generateContentMetadata } from '@leonzalion-blog/content-scripts';
import { execaCommand } from 'execa';
import { chProjectDir } from 'lion-system';
import * as fs from 'node:fs';

chProjectDir(import.meta.url, { monorepoRoot: true });

fs.rmSync('dist', { recursive: true, force: true });

async function buildWebsite() {
	await execaCommand('pnpm build:website', { stdio: 'inherit' });
	await fs.promises.rename('packages/website/dist', 'dist');
}

await buildWebsite();
await generateContentMetadata();

// Copy content to folders
await fs.promises.cp('packages/content', 'dist/content', { recursive: true });
