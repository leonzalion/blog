import { getProjectDir } from 'lion-utils';

export const monorepoDir = getProjectDir(import.meta.url, {
	monorepoRoot: true,
});
