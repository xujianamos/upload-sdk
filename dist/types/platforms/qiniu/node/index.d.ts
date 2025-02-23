import { UploaderOptions, UploadResult, ProgressCallback } from '@shared/types/uploader';
export declare class QiniuNodeUploader {
    constructor(options: UploaderOptions);
    /**
     * 文件上传（表单方式）
     * @param filePath 文件路径
     * @param key 文件名
     * @param onProgress 上传进度回调
     */
    upload(filePath: string, params: {
        key: string;
        token: string;
        url: string;
    }, onProgress?: ProgressCallback): Promise<UploadResult>;
    /**
     * 字节数组上传（表单方式）
     * @param bytes 字节数组
     * @param key 文件名
     * @param onProgress 上传进度回调
     */
    formUploadBytes(bytes: Buffer, params: {
        key: string;
        token: string;
        url: string;
    }, onProgress?: ProgressCallback): Promise<UploadResult>;
    /**
     * 数据流上传（表单方式）
     * @param stream 可读流
     * @param key 文件名
     * @param onProgress 上传进度回调
     */
    formUploadStream(stream: NodeJS.ReadableStream, params: {
        key: string;
        token: string;
        url: string;
    }, onProgress?: ProgressCallback): Promise<UploadResult>;
    /**
     * 文件分片上传（断点续传）
     * @param filePath 本地文件路径
     * @param key 文件名
     * @param onProgress 上传进度回调
     */
    resumeUpload(filePath: string, params: {
        key: string;
        token: string;
        url: string;
    }, onProgress?: ProgressCallback): Promise<UploadResult>;
    /**
     * 数据流分片上传（断点续传）
     * @param stream 可读流
     * @param key 文件名
     * @param onProgress 上传进度回调
     */
    resumeUploadStream(stream: NodeJS.ReadableStream, params: {
        key: string;
        token: string;
        url: string;
    }, onProgress?: ProgressCallback): Promise<UploadResult>;
}
