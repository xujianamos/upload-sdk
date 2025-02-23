import * as qiniu from 'qiniu-js';
import { UploaderOptions, UploadResult, ProgressCallback } from '../../../common/types/uploader';
import { TokenError, UploadError } from '../../../common/utils/errors';
import { calculateFileHash } from '../../../web/utils/file';
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
}
export interface BatchUploadResult {
  success: UploadResult[];
  failed: {
    file: File;
    error: Error;
  }[];
}

// export enum UploadType {
//   NORMAL = 'normal',      // 普通上传
//   FORM = 'form',         // 表单上传
//   STREAM = 'stream',     // 流式上传
//   SLICE = 'slice',       // 分片上传
//   RESUME = 'resume'      // 断点续传
// }
export type UploadType = 'normal' | 'form' | 'stream' | 'slice' | 'resume';

export class QiniuWebUploader {
  private options: UploaderOptions;
  constructor(options: UploaderOptions) {
    this.options = options;
  }

  /**
   * 基础上传方法
   * @param file 
   * @param params 
   * @param onProgress 
   * @returns 
   */
  public async upload(
    file: File,
    params: uploadType,
    onProgress?: ProgressCallback
  ): Promise<UploadResult> {
    try {
      const hash = await calculateFileHash(file);
      const config = {
        useCdnDomain: true,
        ...params.config
      };

      const observable = qiniu.upload(file, params.key, params.token, params.putExtra, config);

      return new Promise((resolve, reject) => {
        const subscription = observable.subscribe({
          next: (res: any) => {
            if (onProgress) {
              onProgress({
                progress: res.total.percent,
                speed: res.total.speed
              });
            }
          },
          error: (err) => {
            reject(new UploadError(err.message || '上传失败', 'UPLOAD_FAILED'));
          },
          complete: (res) => {
            resolve({
              url: `${this.options.domain}/${params.key}`,
              key: params.key,
              hash: hash,
              size: file.size,
              ext: file.type,
              etag: res.hash
            });
          }
        });

        // 添加超时控制
        if (params.timeout) {
          setTimeout(() => {
            subscription.unsubscribe();
            reject(new UploadError('上传超时', 'UPLOAD_TIMEOUT'));
          }, params.timeout);
        }
      });
    } catch (error: any) {
      throw new UploadError(error.message || '上传失败', 'UPLOAD_FAILED');
    }
  }

  /**
    * 批量上传文件
    * @param files 文件列表
    * @param params 上传参数
    * @param onProgress 进度回调，返回总体进度
    * @returns 上传结果，包含成功和失败的文件信息
    */
  public async uploadFiles(
    files: File[],
    params: Omit<uploadType, 'key'> & {
      generateKey?: (file: File) => string;  // 自定义文件名生成函数
      concurrency?: number;  // 并发上传数量
    },
    onProgress?: (progress: { total: number; current: number }) => void
  ): Promise<BatchUploadResult> {
    const result: BatchUploadResult = {
      success: [],
      failed: []
    };

    const totalFiles = files.length;
    let completedFiles = 0;

    // 默认并发数为3
    const concurrency = params.concurrency || 3;

    // 分批处理文件
    for (let i = 0; i < files.length; i += concurrency) {
      const batch = files.slice(i, i + concurrency);
      const uploadPromises = batch.map(async (file) => {
        try {
          // 生成文件key
          const hash = await calculateFileHash(file);
          const ext = file.name.split('.').pop() || '';
          const key = params.generateKey ?
            params.generateKey(file) :
            `${hash}.${ext}`;

          // 上传单个文件
          const uploadResult = await this.upload(file, {
            ...params,
            key
          });

          result.success.push(uploadResult);
          completedFiles++;

          // 更新总进度
          onProgress?.({
            total: totalFiles,
            current: completedFiles
          });

        } catch (error: any) {
          result.failed.push({
            file,
            error: new UploadError(error.message || '上传失败', 'UPLOAD_FAILED')
          });
          completedFiles++;

          // 更新总进度
          onProgress?.({
            total: totalFiles,
            current: completedFiles
          });
        }
      });

      // 等待当前批次完成
      await Promise.all(uploadPromises);
    }

    return result;
  }

}