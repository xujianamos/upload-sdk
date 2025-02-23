import { UploadResult, ProgressCallback, UploaderOptions } from '@/common/types/uploader';

export class AliyunNodeUploader {
  private options: UploaderOptions;
  constructor(options: UploaderOptions) {
    this.options = options;
  }
  async upload(
    file: File,
    params: {
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
    },
    onProgress?: ProgressCallback
  ): Promise<UploadResult> {
    try {
      const formData = new FormData();
      formData.append('name', file.name);
      formData.append('policy', params.policy);
      formData.append('OSSAccessKeyId', params.ossAccessKeyId);
      formData.append('success_action_status', '200');
      formData.append('signature', params.signature);
      formData.append('key', params.key);
      formData.append('file', file);
      // 使用 fetch API 上传文件
      const response = await fetch(params.url, { method: 'POST', body: formData });
      if (!response.ok) {
        throw new Error(`上传失败: ${response.status} ${response.statusText}`);
      }
      const headers = response.headers;
      // 处理 etag，去除首尾的引号
      const etag = headers.get('etag')?.replace(/^"|"$/g, '') || '';
      // 宽高需要前端进行计算
      return {
        uri: params.uri,
        url: `${params.url}/${params.key}`,
        key: params.key,
        ext: file.name.split('.').pop() || '',
        size: file.size,
        width: params.width || 0,
        height: params.height || 0,
        hash: params.hash || '',
        etag,
      };
    } catch (error) {
      throw error;
    }
  }
}