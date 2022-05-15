import { execa } from 'execa';
import { getProjectDir } from 'lion-system';
import * as path from 'node:path';
import process from 'node:process';

if (process.env.GITHUB_BOT_TOKEN === undefined) {
	throw new Error('`GITHUB_BOT_TOKEN` not found in environment.');
}

const monorepoDir = getProjectDir(import.meta.url, { monorepoRoot: true });
const netlifyDistDir = path.join(monorepoDir, 'dist');
process.chdir(netlifyDistDir);
await execa('git', ['init']);
await execa('git', ['add', '.']);
await execa('git', ['commit', '-m', 'netlify deploy']);
await execa('git', [
	'push',
	'--force',
	`https://${process.env.GITHUB_BOT_TOKEN}@github.com/leonzalion/blog.git`,
	'netlify',
]);
