import { execaCommandSync as exec } from 'execa';
import { chProjectDir } from 'lion-system';

chProjectDir(import.meta.url, { monorepoRoot: true });
exec('lion-git-hooks', { stdio: 'inherit' });
exec('pnpm --filter=@leonzalion-blog/date-utils build', { stdio: 'inherit' });
