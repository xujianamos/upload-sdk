import { QiniuWebUploader } from '../../platforms/qiniu/web';
import { QiniuNodeUploader } from '../../platforms/qiniu/node';
export declare class centralKitchenWebUploader extends QiniuWebUploader {
    protected readonly originalDir = "blurrr/web";
    preprocess(file: File): Promise<File>;
    upload(file: File): Promise<import("../../shared/types/uploader").UploadResult>;
}
export declare class centralKitchenMacUploader extends QiniuNodeUploader {
    protected readonly originalDir = "blurrr/ios";
    preprocess(file: Buffer): Promise<Buffer<ArrayBufferLike>>;
    upload(file: Buffer): Promise<import("../../shared/types/uploader").UploadResult>;
}
