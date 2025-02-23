# Upload SDK

一个集成了阿里云 OSS 和七牛云对象存储的上传 SDK，支持 Web 端和 Node.js 端。

## 功能特点

- 支持阿里云 OSS 和七牛云对象存储
- 支持 Web 端和 Node.js 端
- 支持按需引入，减小打包体积
- 使用 TypeScript 编写，提供完整类型定义
- 提供开发调试模式
- 支持上传进度监控
- 完善的错误处理机制

## 安装方式

### 完整安装
```bash
npm install upload-sdk
# 或
yarn add upload-sdk
```

### 按需安装

#### 七牛云模块
```bash
# Web 端
npm install @upload-sdk/qiniu-web

# Node.js 端
npm install @upload-sdk/qiniu-node
```

#### 阿里云模块
```bash
# Web 端
npm install @upload-sdk/aliyun-web

# Node.js 端
npm install @upload-sdk/aliyun-node
```

### 包体积对比

| 包名 | 大小 | Gzip 大小 |
|------|------|-----------|
| upload-sdk (完整包) | ~200KB | ~45KB |
| @upload-sdk/qiniu-web | ~50KB | ~12KB |
| @upload-sdk/qiniu-node | ~45KB | ~11KB |
| @upload-sdk/aliyun-web | ~40KB | ~10KB |
| @upload-sdk/aliyun-node | ~35KB | ~9KB |

## 使用方法

### 配置选项

```typescript
interface UploaderOptions {
  bucket: string;      // 存储空间名称
  accessKey: string;   // 访问密钥 ID
  secretKey: string;   // 访问密钥密码
  domain: string;      // 访问域名
  region?: string;     // 地域（阿里云必填）
}
```

### 完整包使用
```javascript
import UploadSDK from 'upload-sdk';

// 创建上传实例
const uploader = new UploadSDK.QiniuUploader({
  bucket: 'your-bucket',
  accessKey: 'your-access-key',
  secretKey: 'your-secret-key',
  domain: 'your-domain'
});

// 上传文件
const result = await uploader.upload(file, {
  onProgress: (progress) => {
    console.log('上传进度：', progress);
  }
});
```

### 按需引入使用

```javascript
// 七牛云 Web 端
import { QiniuWebUploader } from '@upload-sdk/qiniu-web';

// 七牛云 Node.js 端
import { QiniuNodeUploader } from '@upload-sdk/qiniu-node';

// 阿里云 Web 端
import { AliyunWebUploader } from '@upload-sdk/aliyun-web';

// 阿里云 Node.js 端
import { AliyunNodeUploader } from '@upload-sdk/aliyun-node';

// 创建实例并使用
const uploader = new QiniuWebUploader({
  bucket: 'your-bucket',
  accessKey: 'your-access-key',
  secretKey: 'your-secret-key',
  domain: 'your-domain'
});
```

## API 文档

### 通用方法

#### upload(file, options)
上传文件并返回结果。

- 参数：
  - `file: File | Buffer` - 要上传的文件
  - `options: Object` - 上传选项
    - `onProgress?: (progress: number) => void` - 进度回调
    - `key?: string` - 自定义文件名
    - `mimeType?: string` - 文件类型

- 返回值：
```typescript
interface UploadResult {
  url: string;      // 文件访问地址
  key: string;      // 文件唯一标识
  hash?: string;    // 文件哈希值
  size?: number;    // 文件大小
}
```

## 开发调试

### 本地开发
```bash
# 克隆项目
git clone <repository-url>
cd upload-sdk

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 开发模式特性

- 热重载
- 源码映射
- 控制台输出保留
- 实时构建
- 示例页面
- 网络请求监控

### 示例页面

访问 http://localhost:3000 查看在线示例，包含：
- 文件上传演示
- 进度显示
- 错误处理
- 上传配置
## 产品特定功能

### 支持的产品

SDK 支持多个产品线的特定需求：

- productName（产品名称）
  - Web 端：`productName-web`
  - Mac 端：`productName-mac`
 

### 使用方法

```javascript
import UploadSDK from 'upload-sdk';

// 创建产品特定的上传实例
const productNameUploader = new UploadSDK.products['productName-web']({
  bucket: 'your-bucket',
  accessKey: 'your-access-key',
  secretKey: 'your-secret-key',
  domain: 'your-domain'
});

// 上传文件
const result = await productNameUploader.upload(file, {
  onProgress: (progress) => {
    console.log('上传进度：', progress);
  }
});
```
### 产品特定配置
每个产品都可以配置自己的特定参数：

```typescript
interface ProductOptions extends UploaderOptions {
  // 产品特定配置
  productId?: string;    // 产品标识
  version?: string;      // 产品版本
  channel?: string;      // 渠道信息
}
 ```

### 扩展功能
各产品线在基础上传功能之外，还支持以下扩展：

1. 自定义存储目录
   
   - 每个产品都有独立的存储路径
   - 支持按平台区分存储位置
2. 文件预处理
   
   - 支持上传前的文件处理
   - 可以添加产品特定的水印或标记
3. 自定义参数
   
   - 支持传入产品特定的参数
   - 可以设置特定的处理流程
4. 错误处理
   
   - 针对产品特定的错误进行处理
   - 提供详细的错误信息
### 示例代码
```javascript
// productName Web 端特定功能
const productNameUploader = new UploadSDK.products['productName-web']({
  bucket: 'your-bucket',
  accessKey: 'your-access-key',
  secretKey: 'your-secret-key',
  domain: 'your-domain',
  productId: 'productName',
  version: '1.0.0'
});

// 使用产品特定的上传选项
const result = await productNameUploader.upload(file, {
  watermark: true,           // 添加水印
  quality: 'high',           // 图片质量
  effect: 'productName',           // 特效类型
  onProgress: (progress) => {
    console.log('上传进度：', progress);
  }
});
 ```
## 注意事项

- Web 端仅支持 File 对象
- Node.js 端支持 Buffer 和文件路径
- 确保正确配置跨域设置
- 建议使用 HTTPS
- 注意文件大小限制


## 目录结构
```
src/
├── core/
│   └── base-uploader.ts
├── node/
│   ├── utils/
│   │   ├── file.ts      # Node 专用文件处理
│   │   ├── http.ts      # Node 专用 HTTP 请求
│   │   └── crypto.ts    # Node 专用加密方法
├── web/
│   ├── utils/
│   │   ├── file.ts      # Web 专用文件处理
│   │   ├── http.ts      # Web 专用 fetch/axios
│   │   └── crypto.ts    # Web 专用加密方法
├── shared/
│   ├── types/           # 共享类型定义
│   ├── constants/       # 共享常量
│   └── utils/          # 共享工具方法
└── platforms/          # 平台相关实现
    ├── aliyun/
    │   ├── node/
    │   └── web/
    └── qiniu/
        ├── node/
        └── web/

```



## 许可证

ISC
```

主要优化：
1. 重新组织了文档结构，更符合阅读习惯
2. 增加了更详细的功能说明
3. 完善了 API 文档
4. 简化了使用示例
5. 整合了配置选项
6. 突出了按需安装的优势
7. 优化了开发调试部分的说明