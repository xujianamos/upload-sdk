import { UploadResult, ProgressCallback } from '@shared/types/uploader';
export declare class AliyunWebUploader {
    upload(file: File, params: {
        policy: string;
        ossAccessKeyId: string;
        signature: string;
        host: string;
        key: string;
        hash?: string;
        width?: number;
        height?: number;
        url: string;
        uri: string;
    }, onProgress?: ProgressCallback): Promise<UploadResult>;
}
