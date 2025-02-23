import { QiniuWebUploader } from '../../platforms/qiniu/web';
import { QiniuNodeUploader } from '../../platforms/qiniu/node';
export declare class commonWebUploader extends QiniuWebUploader {
    protected readonly originalDir = "common/web";
    preprocess(file: File): Promise<File>;
    upload(file: File, params: any): Promise<import("../../shared/types/uploader").UploadResult>;
}
export declare class commonMacUploader extends QiniuNodeUploader {
    protected readonly originalDir = "common/mac";
    preprocess(file: Buffer): Promise<Buffer<ArrayBufferLike>>;
}
