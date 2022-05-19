import { getProjectDir } from 'lion-utils';
import * as path from 'node:path';

export const monorepoDir = getProjectDir(import.meta.url, {
	monorepoRoot: true,
});
export const contentPackageDir = path.join(monorepoDir, 'packages/content');
