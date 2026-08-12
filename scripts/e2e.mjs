import { spawnSync } from 'node:child_process';

// Cloudflare's build image can download Chromium, but it does not ship the
// OS libraries Chromium needs (libatk-1.0.so.0). `playwright install-deps`
// requires root/apt, which the image does not allow.
function onCloudflareBuild() {
  return (
    process.env.WORKERS_CI === '1' ||
    process.env.CF_PAGES === '1' ||
    process.env.HOME === '/opt/buildhome'
  );
}

if (onCloudflareBuild()) {
  console.log(
    'Skipping Playwright: Cloudflare build image is missing Chromium system libraries (libatk-1.0.so.0).'
  );
  process.exit(0);
}

const install = spawnSync('npx', ['playwright', 'install', 'chromium'], {
  stdio: 'inherit',
});
if (install.status) process.exit(install.status ?? 1);

const test = spawnSync('npx', ['playwright', 'test'], { stdio: 'inherit' });
process.exit(test.status ?? 1);
