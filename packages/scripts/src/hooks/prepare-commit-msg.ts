import { execaSync } from 'execa';
import { getProjectDir } from 'lion-system';
import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';

const monorepoDir = getProjectDir(import.meta.url, { monorepoRoot: true });

if (fs.existsSync(path.join(monorepoDir, '.git/MERGE_MSG'))) {
	process.exit(0);
} else {
	const unstagedFiles = execaSync('git', ['status', '--porcelain'])
		.stdout.split('\n')
		.map((entryLine) => entryLine.split(' ').at(-1)!);
	for (const unstagedFile of unstagedFiles) {
		// If a file other than a daily-timeblock file was updated, don't edit the commit message
		if (!unstagedFile.startsWith('packages/daily-timeblocks')) {
			process.exit(0);
		}
	}

	fs.appendFileSync(process.argv.at(-1)!, ' [skip ci]');
}
