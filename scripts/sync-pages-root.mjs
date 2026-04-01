import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const distDir = join(projectRoot, 'dist');
const rootAssetsDir = join(projectRoot, 'assets');
const distAssetsDir = join(distDir, 'assets');

const copyFileIfExists = (source, target) => {
  if (!existsSync(source)) {
    return;
  }

  cpSync(source, target, { recursive: false });
};

if (!existsSync(distDir)) {
  throw new Error('dist directory does not exist. Run vite build before syncing Pages root files.');
}

if (existsSync(rootAssetsDir)) {
  rmSync(rootAssetsDir, { recursive: true, force: true });
}

rmSync(join(projectRoot, 'deployed.html'), { force: true });

mkdirSync(rootAssetsDir, { recursive: true });
cpSync(distAssetsDir, rootAssetsDir, { recursive: true });

copyFileIfExists(join(distDir, 'index.html'), join(projectRoot, 'index.html'));

[
  'manifest.webmanifest',
  'registerSW.js',
  'sw.js',
  'apple-touch-icon.svg',
  'mask-icon.svg',
  'pwa-icon.svg',
  'offline.html',
  'robots.txt',
  'sitemap.xml'
].forEach((fileName) => {
  copyFileIfExists(join(distDir, fileName), join(projectRoot, fileName));
});

const distTopLevelFiles = readdirSync(distDir).filter((item) => item.startsWith('workbox-') && item.endsWith('.js'));

distTopLevelFiles.forEach((fileName) => {
  copyFileIfExists(join(distDir, fileName), join(projectRoot, fileName));
});
