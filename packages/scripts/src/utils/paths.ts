import { getProjectDir } from 'lion-system';

export const monorepoDir = getProjectDir(import.meta.url, {
	monorepoRoot: true,
});
