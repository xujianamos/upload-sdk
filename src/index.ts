import { QiniuWebUploader } from "./platforms/qiniu/web";
import { QiniuNodeUploader } from "./platforms/qiniu/node";
import { AliyunWebUploader } from "./platforms/aliyun/web";
import { AliyunNodeUploader } from "./platforms/aliyun/node";

// 导入产品特定的上传器
import { commonWebUploader,commonMacUploader } from "./products/common";
// 基础上传器
export {
  QiniuWebUploader,
  QiniuNodeUploader,
  AliyunWebUploader,
  AliyunNodeUploader,
};
// 产品特定上传器
export const products = {
  "common-web": commonWebUploader,
  "common-mac": commonMacUploader,
  
};

export default {
  QiniuWebUploader,
  QiniuNodeUploader,
  AliyunWebUploader,
  AliyunNodeUploader,
  products
};
