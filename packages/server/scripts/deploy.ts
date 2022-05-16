import { join } from 'desm';
import { execaCommandSync, execaSync } from 'execa';
import { getProjectDir } from 'lion-system';

const monorepoDir = getProjectDir(import.meta.url, { monorepoRoot: true });

const serverDockerfilePath = join(import.meta.url, '../dockerfiles/Dockerfile');
execaSync(
	'docker',
	['build', '--tag', 'leonzalion-blog-server', '.', '-f', serverDockerfilePath],
	{
		cwd: monorepoDir,
		stdio: 'inherit',
	}
);

execaCommandSync(
	'flyctl deploy --local-only --dockerfile ./packages/server/dockerfiles/Dockerfile',
	{ stdio: 'inherit', cwd: getProjectDir(import.meta.url) }
);
