import { execaCommandSync } from 'execa';
import { getProjectDir } from 'lion-system';

const monorepoDir = getProjectDir(import.meta.url, { monorepoRoot: true });

execaCommandSync(
	'flyctl deploy --local-only --config ./packages/server/fly.toml --dockerfile ./packages/server/dockerfiles/Dockerfile',
	{ stdio: 'inherit', cwd: monorepoDir }
);
