import { QiniuWebUploader } from '../../platforms/qiniu/web';
import { QiniuNodeUploader } from '../../platforms/qiniu/node';

export class commonWebUploader extends QiniuWebUploader {
  protected readonly originalDir = 'common/web';
  
  async preprocess(file: File) {
    //  特定的预处理逻辑
    return file;
  }

  async upload(file: File,params:any) {
    const processedFile = await this.preprocess(file);
    return super.upload(processedFile,params);
  }
}

export class commonMacUploader extends QiniuNodeUploader {
  protected readonly originalDir = 'common/mac';
  
  async preprocess(file: Buffer) {
    // MAC 特定的预处理逻辑
    return file;
  }

  
}