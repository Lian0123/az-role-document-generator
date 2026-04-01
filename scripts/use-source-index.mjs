import { cpSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

cpSync(join(projectRoot, 'index.template.html'), join(projectRoot, 'index.html'));
