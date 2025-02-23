const { createServer } = require('http');
const { createServer: createHttpsServer } = require('https');
const handler = require('serve-handler');
const livereload = require('rollup-plugin-livereload');
const { basePlugins, createBaseConfig } = require('./rollup.base.cjs');

// 自定义开发服务器
const createDevServer = () => ({
  name: 'dev-server',
  buildStart() {
    const server = createServer((request, response) => {
      return handler(request, response, {
        public: 'dist'
      });
    });

    server.listen(3000, () => {
      console.log('开发服务器运行在: http://localhost:3000');
    });
  }
});

const createDevConfig = (input, output, format, name) => {
  const baseConfig = createBaseConfig(input, output, format, name);
  return {
    ...baseConfig,
    plugins: [
      ...basePlugins,
      createDevServer(),
      livereload('dist')
    ],
    watch: {
      include: 'src/**',
      clearScreen: false
    }
  };
};

module.exports = [
  createDevConfig(
    'src/platforms/aliyun/web/index.ts',
    'dist/aliyun-web.js',
    'umd',
    'AliyunWebUploader'
  ),
  createDevConfig(
    'src/platforms/qiniu/web/index.ts',
    'dist/qiniu-web.js',
    'umd',
    'QiniuWebUploader'
  )
];