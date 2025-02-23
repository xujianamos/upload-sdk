import { UploaderOptions, UploadResult } from '../shared/types/uploader';
export declare abstract class BaseUploader {
    protected options: UploaderOptions;
    constructor(options: UploaderOptions);
    abstract upload(file: File | Buffer): Promise<UploadResult>;
}
