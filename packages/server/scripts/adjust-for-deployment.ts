import { getProjectDir, updateJsonFile } from 'lion-utils';
import * as path from 'node:path';

const monorepoDir = getProjectDir(import.meta.url, { monorepoRoot: true });

updateJsonFile(path.join(monorepoDir, 'packages/server/package.json'), [
	[
		'dependencies.@leonzalion-blog/content-scripts',
		'link:../content-scripts/dist',
	],
	['dependencies.@leonzalion-blog/date-utils', 'link:../date-utils/dist'],
]);

updateJsonFile(
	path.join(monorepoDir, 'packages/content-scripts/package.json'),
	[['dependencies.@leonzalion-blog/date-utils', 'link:../date-utils/dist']]
);
