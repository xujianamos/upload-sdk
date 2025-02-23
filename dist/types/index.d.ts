import { QiniuWebUploader } from "./platforms/qiniu/web";
import { QiniuNodeUploader } from "./platforms/qiniu/node";
import { AliyunWebUploader } from "./platforms/aliyun/web";
import { AliyunNodeUploader } from "./platforms/aliyun/node";
import { commonWebUploader, commonMacUploader } from "./products/common";
export { QiniuWebUploader, QiniuNodeUploader, AliyunWebUploader, AliyunNodeUploader, };
export declare const products: {
    "common-web": typeof commonWebUploader;
    "common-mac": typeof commonMacUploader;
};
declare const _default: {
    QiniuWebUploader: typeof QiniuWebUploader;
    QiniuNodeUploader: typeof QiniuNodeUploader;
    AliyunWebUploader: typeof AliyunWebUploader;
    AliyunNodeUploader: typeof AliyunNodeUploader;
    products: {
        "common-web": typeof commonWebUploader;
        "common-mac": typeof commonMacUploader;
    };
};
export default _default;
