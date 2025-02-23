import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import filesize from "rollup-plugin-filesize";
import colors from 'picocolors';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import alias from '@rollup/plugin-alias';
import path from 'path';
const createConfig = (input, output, format, name) => ({
  input,
  output: {
    file: output,
    format,
    name,
    exports: 'named',
    sourcemap: true,
  },
  plugins: [
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: '@shared', replacement: path.resolve(__dirname, 'src/shared') },
        { find: '@web', replacement: path.resolve(__dirname, 'src/web') },
        { find: '@node', replacement: path.resolve(__dirname, 'src/node') },
        { find: '@platforms', replacement: path.resolve(__dirname, 'src/platforms') }
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
      reporter: (options, bundle, { fileName, bundleSize, minSize, gzipSize }) => {
        return `${colors.cyan(fileName)}: ${colors.yellow(bundleSize)}`;
      },
    }),
    serve({
      open: true,
      contentBase: ['dist', 'public'],
      host: 'localhost',
      port: 3000,
    }),
    livereload('dist'),
  ],
  external: ['ali-oss', 'qiniu', 'qiniu-js'],
  watch: {
    include: 'src/**',
    clearScreen: false
  }
});

export default [
  // Web 版本
  createConfig(
    'src/aliyun/aliyun-web/index.ts',
    'dist/aliyun-web.js',
    'umd',
    'AliyunWebUploader'
  ),
  createConfig(
    'src/qiniu/qiniu-web/index.ts',
    'dist/qiniu-web.js',
    'umd',
    'QiniuWebUploader'
  ),
];