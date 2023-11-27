import { readdirSync, writeFileSync } from 'node:fs';
import { readJSONSync } from 'fs-extra';
import path from 'node:path';

const nixleVersion = readJSONSync('./package.json').version;
const packages = readdirSync('./packages');

for (const _package of packages) {
  const dir = path.join('./packages', _package);
  const pkgPath = path.join(dir, './package.json');
  const pkg = readJSONSync(pkgPath);

  pkg.version = nixleVersion;

  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}
