import { execaCommandSync as exec } from 'execa';
import { chProjectDir, copyPackageFiles, updateJsonFile } from 'lionconfig';

chProjectDir(import.meta.url);
exec('tsc-alias');
await copyPackageFiles({ commonjs: false });
updateJsonFile('dist/package.json', [
	[
		'dependencies.@leonzalion-blog/content-scripts',
		'link:../content-scripts/dist',
	],
	['dependencies.@leonzalion-blog/date-utils', 'link:../date-utils/dist'],
]);
