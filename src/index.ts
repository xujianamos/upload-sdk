import { QiniuWebUploader } from "./platforms/qiniu/web";
import { QiniuNodeUploader } from "./platforms/qiniu/node";
import { AliyunWebUploader } from "./platforms/aliyun/web";
import { AliyunNodeUploader } from "./platforms/aliyun/node";
import { UploadSDK } from "./core/upload-sdk";
import { products } from "./products/config";

// 基础上传器
export {
  QiniuWebUploader,
  QiniuNodeUploader,
  AliyunWebUploader,
  AliyunNodeUploader,
};

export { products };

// 导出 UploadSDK
export default UploadSDK;
