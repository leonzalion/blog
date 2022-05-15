import { getProjectDir } from 'lion-system';
import * as path from 'node:path';

export const monorepoDir = getProjectDir(import.meta.url, {
	monorepoRoot: true,
});
export const contentPackageDir = path.join(monorepoDir, 'packages/content');
