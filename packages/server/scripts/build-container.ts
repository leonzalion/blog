import { join } from 'desm';
import { execaSync } from 'execa';
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
