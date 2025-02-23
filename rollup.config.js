import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import filesize from "rollup-plugin-filesize";
import colors from 'picocolors';
import alias from '@rollup/plugin-alias';
import path from 'path';
const createConfig = (input, output, format, name, isMinify = false) => ({
  input,
  output: {
    file: isMinify ? output.replace('.js', '.min.js') : output,
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
      declaration: !isMinify && true,
      declarationDir: !isMinify ? 'dist/types' : undefined,
    }),
    isMinify && terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      format: {
        comments: false,
        preserve_annotations: false
      },
      mangle: {
        properties: {
          regex: /^_/
        }
      }
    }),
    filesize({
      showMinifiedSize: true,
      showGzippedSize: true,
      showBrotliSize: true,
      reporter: (options, bundle, { fileName, bundleSize, minSize, gzipSize, brotliSize }) => {
        return `${colors.cyan(fileName)}: 原始大小 ${colors.yellow(bundleSize)} | 压缩后 ${colors.green(minSize)} | Gzip ${colors.magenta(gzipSize)} | Brotli ${colors.blue(brotliSize)}`;
      },
    }),
  ].filter(Boolean),
  external: ['ali-oss', 'qiniu', 'qiniu-js'],
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
    'src/aliyun/aliyun-web/index.ts',
    'dist/aliyun-web.js',
    'umd',
    'AliyunWebUploader',
    true
  ),
  createConfig(
    'src/qiniu/qiniu-web/index.ts',
    'dist/qiniu-web.js',
    'umd',
    'QiniuWebUploader'
  ),
  createConfig(
    'src/qiniu/qiniu-web/index.ts',
    'dist/qiniu-web.js',
    'umd',
    'QiniuWebUploader',
    true
  ),

  // Node 版本
  createConfig(
    'src/aliyun/aliyun-node/index.ts',
    'dist/aliyun-node.js',
    'cjs',
    'AliyunNodeUploader'
  ),
  createConfig(
    'src/aliyun/aliyun-node/index.ts',
    'dist/aliyun-node.js',
    'cjs',
    'AliyunNodeUploader',
    true
  ),
  createConfig(
    'src/qiniu/qiniu-node/index.ts',
    'dist/qiniu-node.js',
    'cjs',
    'QiniuNodeUploader'
  ),
  createConfig(
    'src/qiniu/qiniu-node/index.ts',
    'dist/qiniu-node.js',
    'cjs',
    'QiniuNodeUploader',
    true
  ),
];
