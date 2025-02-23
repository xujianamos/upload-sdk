export declare function getFileExtension(filename: string): string;
export declare function generateUniqueKey(originalFilename: string): string;
export declare function getMimeType(filename: string): string;
/**
 * 读取文件
 * @param file
 * @returns
 */
export declare function readFile(file: File): Promise<ArrayBuffer>;
/**
 * 获取文件的md5
 * @param file
 * @returns
 */
export declare function getMd5(file: File): Promise<string | null>;
/**
 * 获取文件哈希值
 * @param file
 * @returns
 */
export declare function calculateFileHash(file: File): Promise<string>;
