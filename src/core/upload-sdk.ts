import { QiniuWebUploader } from "../platforms/qiniu/web";
import { QiniuNodeUploader } from "../platforms/qiniu/node";
import { AliyunWebUploader } from "../platforms/aliyun/web";
import { AliyunNodeUploader } from "../platforms/aliyun/node";
import { UploaderOptions } from "../common/types/uploader";
import { products, ProductType } from "../products/config";

export interface CreateOptions {
  platform: 'qiniu' | 'aliyun';
  product?: ProductType;
  env: 'web' | 'node';
  options: UploaderOptions;
}

export class UploadSDK {
  static createWebUploader(options: UploaderOptions) {
    return new QiniuWebUploader(options);
  }

  static createNodeUploader(options: UploaderOptions) {
    return new QiniuNodeUploader(options);
  }

  static create(config: CreateOptions) {
    const { platform, product, env, options } = config;

    // 如果指定了产品，使用产品特定的上传器
    if (product) {
      const productKey = `${product}-${env}` as keyof typeof products;
      const ProductUploader = products[productKey];
      if (ProductUploader) {
        return new ProductUploader(options);
      }
    }

    // 否则使用平台默认上传器
    if (platform === 'qiniu') {
      return env === 'web' 
        ? new QiniuWebUploader(options)
        : new QiniuNodeUploader(options);
    } else if (platform === 'aliyun') {
      return env === 'web'
        ? new AliyunWebUploader(options)
        : new AliyunNodeUploader(options);
    }

    throw new Error('不支持的平台或环境类型');
  }
}