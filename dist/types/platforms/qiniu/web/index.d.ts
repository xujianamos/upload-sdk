import { UploaderOptions, UploadResult, ProgressCallback } from '../../../shared/types/uploader';
import { Extra, Config } from 'qiniu-js/esm/upload/base';
export interface TImageInfo {
    uri: string;
    url: string;
    ext: string;
    size: number;
    width: number;
    height: number;
    hash: string | null;
    etag: string | null;
}
export type uploadType = {
    key: string;
    token: string;
    config: Config;
    putExtra: Extra;
    timeout?: number;
};
export interface BatchUploadResult {
    success: UploadResult[];
    failed: {
        file: File;
        error: Error;
    }[];
}
export type UploadType = 'normal' | 'form' | 'stream' | 'slice' | 'resume';
export declare class QiniuWebUploader {
    private options;
    constructor(options: UploaderOptions);
    /**
     * 基础上传方法
     * @param file
     * @param params
     * @param onProgress
     * @returns
     */
    upload(file: File, params: uploadType, onProgress?: ProgressCallback): Promise<UploadResult>;
    /**
      * 批量上传文件
      * @param files 文件列表
      * @param params 上传参数
      * @param onProgress 进度回调，返回总体进度
      * @returns 上传结果，包含成功和失败的文件信息
      */
    uploadFiles(files: File[], params: Omit<uploadType, 'key'> & {
        generateKey?: (file: File) => string;
        concurrency?: number;
    }, onProgress?: (progress: {
        total: number;
        current: number;
    }) => void): Promise<BatchUploadResult>;
}
