import { execaCommandSync as exec } from 'execa';
import { chProjectDir } from 'lionconfig';

chProjectDir(import.meta.url, { monorepoRoot: true });
exec('lion-git-hooks', { stdio: 'inherit' });
