import { execaCommandSync as exec } from 'execa';
import { chProjectDir, copyPackageFiles } from 'lionconfig';

chProjectDir(import.meta.url);
exec('tsc-alias');
await copyPackageFiles({ commonjs: false });