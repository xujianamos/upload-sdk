import { UploaderOptions, UploadResult } from '../common/types/uploader';

export abstract class BaseUploader {
  protected options: UploaderOptions;

  constructor(options: UploaderOptions) {
    this.options = options;
  }

  abstract upload(file: File | string): Promise<UploadResult>;
}