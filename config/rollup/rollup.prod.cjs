const { terser } = require("rollup-plugin-terser");
const { basePlugins, createBaseConfig } = require('./rollup.base.cjs');

const createProdConfig = (input, output, format, name, isMinify = false) => {
  const baseConfig = createBaseConfig(input, output, format, name);
  return {
    ...baseConfig,
    output: {
      ...baseConfig.output,
      file: isMinify ? output.replace('.js', '.min.js') : output,
    },
    plugins: [
      ...basePlugins,
      isMinify && terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug']
        }
      })
    ].filter(Boolean)
  };
};

module.exports= [
  // Web 版本
  createProdConfig(
    'src/platforms/aliyun/web/index.ts',  // 更新路径
    'dist/aliyun-web.js',
    'umd',
    'AliyunWebUploader'
  ),
  createProdConfig(
    'src/platforms/aliyun/web/index.ts',  // 更新路径
    'dist/aliyun-web.js',
    'umd',
    'AliyunWebUploader',
    true
  ),
  createProdConfig(
    'src/platforms/qiniu/web/index.ts',  // 更新七牛云的路径
    'dist/qiniu-web.js',
    'umd',
    'QiniuWebUploader'
  ),
  createProdConfig(
    'src/platforms/qiniu/web/index.ts',  // 更新七牛云的路径
    'dist/qiniu-web.js',
    'umd',
    'QiniuWebUploader',
    true
  ),
  // Node 版本
  createProdConfig(
    'src/platforms/aliyun/node/index.ts',
    'dist/aliyun-node.js',
    'cjs',
    'AliyunNodeUploader'
  ),
  createProdConfig(
    'src/platforms/aliyun/node/index.ts',
    'dist/aliyun-node.js',
    'cjs',
    'AliyunNodeUploader',
    true
  ),
  createProdConfig(
    'src/platforms/qiniu/node/index.ts',
    'dist/qiniu-node.js',
    'cjs',
    'QiniuNodeUploader'
  ),
  createProdConfig(
    'src/platforms/qiniu/node/index.ts',
    'dist/qiniu-node.js',
    'cjs',
    'QiniuNodeUploader',
    true
  )
];