import * as qiniu from 'qiniu';
import { createReadStream } from 'fs';
import { UploaderOptions, UploadResult, ProgressCallback } from '@shared/types/uploader';
import { TokenError, UploadError } from '@shared/utils/errors';
import { getFileExtension } from '@/node/utils/file';

export class QiniuNodeUploader {

  constructor(options: UploaderOptions) {
  }
  /**
   * 文件上传（表单方式）
   * @param filePath 文件路径
   * @param key 文件名
   * @param onProgress 上传进度回调
   */
  public async upload(
    filePath: string,
    params: { key: string, token: string, url: string },
    onProgress?: ProgressCallback
  ): Promise<UploadResult> {
    const config = new qiniu.conf.Config();
    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();

    return new Promise((resolve, reject) => {
      formUploader.putFile(params.token, params.key, filePath, putExtra, (err, body, info) => {
        if (err) {
          return reject(new UploadError(err.message, 'UPLOAD_FAILED'));
        }

        if (info.statusCode === 200) {
          const extension = getFileExtension(params.key);
          resolve({
            uri: `qiniu://${body.bucket}/${params.key}`,
            url: `${params.url}/${params.key}`,
            key: params.key,
            hash: body.hash,
            size: body.size,
            etag: body.etag,
            ext: extension
          });
        } else {
          reject(new UploadError(body.error, 'UPLOAD_FAILED'));
        }
      });
    });
  }

  /**
   * 字节数组上传（表单方式）
   * @param bytes 字节数组
   * @param key 文件名
   * @param onProgress 上传进度回调
   */
  public async formUploadBytes(
    bytes: Buffer,
    params: { key: string, token: string, url: string },
    onProgress?: ProgressCallback
  ): Promise<UploadResult> {
    const config = new qiniu.conf.Config();
    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();

    return new Promise((resolve, reject) => {
      formUploader.put(params.token, params.key, bytes, putExtra, (err, body, info) => {
        if (err) {
          reject(new UploadError(err.message, 'UPLOAD_FAILED'));
          return;
        }

        if (info.statusCode === 200) {
          const extension = getFileExtension(params.key);
          resolve({
            uri: `qiniu://${body.bucket}/${params.key}`,
            url: `${params.url}/${params.key}`,
            key: params.key,
            hash: body.hash,
            size: body.size,
            etag: body.etag,
            ext: extension
          });
        } else {
          reject(new UploadError(body.error, 'UPLOAD_FAILED'));
        }
      });
    });
  }

  /**
   * 数据流上传（表单方式）
   * @param stream 可读流
   * @param key 文件名
   * @param onProgress 上传进度回调
   */
  public async formUploadStream(
    stream: NodeJS.ReadableStream,
    params: { key: string, token: string, url: string },
    onProgress?: ProgressCallback
  ): Promise<UploadResult> {
    const config = new qiniu.conf.Config();
    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();

    return new Promise((resolve, reject) => {
      formUploader.putStream(params.token, params.key, stream, putExtra, (err, body, info) => {
        if (err) {
          reject(new UploadError(err.message, 'UPLOAD_FAILED'));
          return;
        }
        if (info.statusCode === 200) {
          const extension = getFileExtension(params.key);
          resolve({
            uri: `qiniu://${body.bucket}/${params.key}`,
            url: `${params.url}/${params.key}`,
            key: params.key,
            hash: body.hash,
            size: body.size,
            etag: body.etag,
            ext: extension
          });
        } else {
          reject(new UploadError(body.error, 'UPLOAD_FAILED'));
        }
      });
    });
  }

  /**
   * 文件分片上传（断点续传）
   * @param filePath 本地文件路径
   * @param key 文件名
   * @param onProgress 上传进度回调
   */
  public async resumeUpload(
    filePath: string,
    params: { key: string, token: string, url: string },
    onProgress?: ProgressCallback
  ): Promise<UploadResult> {
    const config = new qiniu.conf.Config();
    const resumeUploader = new qiniu.resume_up.ResumeUploader(config);
    const putExtra = new qiniu.resume_up.PutExtra();

    return new Promise((resolve, reject) => {
      resumeUploader.putFile(params.token, params.key, filePath, putExtra, (err, body, info) => {
        if (err) {
          reject(new UploadError(err.message, 'UPLOAD_FAILED'));
          return;
        }

        if (info.statusCode === 200) {
          const extension = getFileExtension(params.key);
          resolve({
            uri: `qiniu://${body.bucket}/${params.key}`,
            url: `${params.url}/${params.key}`,
            key: params.key,
            hash: body.hash,
            size: body.size,
            etag: body.etag,
            ext: extension
          });
        } else {
          reject(new UploadError(body.error, 'UPLOAD_FAILED'));
        }
      });
    });
  }

  /**
   * 数据流分片上传（断点续传）
   * @param stream 可读流
   * @param key 文件名
   * @param onProgress 上传进度回调
   */
  public async resumeUploadStream(
    stream: NodeJS.ReadableStream,
    params: { key: string, token: string, url: string },
    onProgress?: ProgressCallback
  ): Promise<UploadResult> {
    const config = new qiniu.conf.Config();
    const resumeUploader = new qiniu.resume_up.ResumeUploader(config);
    const putExtra = new qiniu.resume_up.PutExtra()
    const readableStreamLen = 2000; // 可读流长度
    return new Promise((resolve, reject) => {
      resumeUploader.putStream(params.token, params.key, stream, readableStreamLen, putExtra, (err: any, body: any, info: any) => {
        if (err) {
          reject(new UploadError(err.message, 'UPLOAD_FAILED'));
          return;
        }

        if (info.statusCode === 200) {
          const extension = getFileExtension(params.key);
          resolve({
            uri: `qiniu://${body.bucket}/${params.key}`,
            url: `${params.url}/${params.key}`,
            key: params.key,
            hash: body.hash,
            size: body.size,
            etag: body.etag,
            ext: extension
          });
        } else {
          reject(new UploadError(body.error, 'UPLOAD_FAILED'));
        }
      });
    });
  }
}