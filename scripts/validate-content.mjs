import fs from 'node:fs';
import path from 'node:path';

const dirs = ['src/content/robots','src/content/blog'];
let failed = false;

for (const dir of dirs) {
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
    const text = fs.readFileSync(path.join(dir,file),'utf8');
    if (!text.startsWith('---')) {
      console.error(`Missing front matter: ${dir}/${file}`);
      failed = true;
    }
    if (!/status:\s*"(draft|review|published)"/.test(text) && !/status:\s*(draft|review|published)/.test(text)) {
      console.error(`Missing valid status: ${dir}/${file}`);
      failed = true;
    }
  }
}
if (failed) process.exit(1);
console.log('Content validation passed');
