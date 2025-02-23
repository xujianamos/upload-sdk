const fs = require('fs');
const path = require('path');
const glob = require('glob');

const packagePath = path.resolve(__dirname, '../package.json');
const package = require(packagePath);

// 更新版本号
const [major, minor, patch] = package.version.split('.').map(Number);
const newVersion = `${major}.${minor}.${patch + 1}`;

// 更新主包版本
package.version = newVersion;
fs.writeFileSync(packagePath, JSON.stringify(package, null, 2) + '\n');
console.log('\x1b[32m%s\x1b[0m', `主包版本已更新至: ${newVersion}`);

// 更新子包版本
const packagesPath = path.resolve(__dirname, '../packages/*/package.json');
const packageFiles = glob.sync(packagesPath);

packageFiles.forEach(filePath => {
  const subPackage = require(filePath);
  subPackage.version = newVersion;
  fs.writeFileSync(filePath, JSON.stringify(subPackage, null, 2) + '\n');
  console.log('\x1b[36m%s\x1b[0m', `子包 ${subPackage.name} 版本已更新至: ${newVersion}`);
});