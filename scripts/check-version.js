const semver = require('semver');
const { engines } = require('../package.json');
const version = engines.node;

// 打印版本信息
console.log('\x1b[36m%s\x1b[0m', `当前 Node.js 版本: ${process.version}`);
console.log('\x1b[36m%s\x1b[0m', `要求 Node.js 版本: ${version}`);

if (!semver.satisfies(process.version, version)) {
  console.error(
    '\x1b[31m%s\x1b[0m',
    `需要 Node.js 版本 ${version}，但当前版本为 ${process.version}。\n请升级您的 Node.js 版本！`
  );
  process.exit(1);
} else {
  console.log('\x1b[32m%s\x1b[0m', '✓ Node.js 版本检查通过');
}