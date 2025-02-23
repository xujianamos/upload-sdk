const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const filesize = require("rollup-plugin-filesize");
const colors = require('picocolors');
const alias = require('@rollup/plugin-alias');
const path = require('path');


 const basePlugins = [
  alias({
    entries: [
      { find: '@', replacement: path.resolve(__dirname, '../../src') },
      { find: '@shared', replacement: path.resolve(__dirname, '../../src/shared') },
      { find: '@web', replacement: path.resolve(__dirname, '../../src/web') },
      { find: '@node', replacement: path.resolve(__dirname, '../../src/node') },
      { find: '@platforms', replacement: path.resolve(__dirname, '../../src/platforms') }
    ]
  }),
  resolve(),
  commonjs({
    transformMixedEsModules: true,
  }),
  typescript({
    tsconfig: './tsconfig.json',
    declaration: true,
    declarationDir: 'dist/types',
    sourceMap: true,
  }),
  filesize({
    showMinifiedSize: true,
    showGzippedSize: true,
    reporter: (options, bundle, { fileName, bundleSize }) => {
      return `${colors.cyan(fileName)}: ${colors.yellow(bundleSize)}`;
    },
  })
];

 const createBaseConfig = (input, output, format, name) => ({
  input,
  output: {
    file: output,
    format,
    name,
    exports: 'named',
    sourcemap: true,
  },
  external: ['ali-oss', 'qiniu', 'qiniu-js']
});

module.exports = {
  basePlugins,
  createBaseConfig
};