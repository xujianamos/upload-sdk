export interface UploaderOptions {
    /***## 上传域名 */
    domain: string;
    /**## 获取上传token url */
    tokenUrl: string;
}
export interface UploadResult {
    url: string;
    key: string;
    hash?: string;
    size: number;
    ext: string;
    etag: string;
    uri?: string;
    width?: number;
    height?: number;
}
export interface ProgressInfo {
    progress: number;
    speed?: number;
}
export type ProgressCallback = (progress: ProgressInfo) => void;
