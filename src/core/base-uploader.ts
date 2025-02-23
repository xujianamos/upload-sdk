import { UploaderOptions, UploadResult } from '../shared/types/uploader';

export abstract class BaseUploader {
  protected options: UploaderOptions;

  constructor(options: UploaderOptions) {
    this.options = options;
  }

  abstract upload(file: File | Buffer): Promise<UploadResult>;
}