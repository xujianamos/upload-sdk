import SparkMD5 from "spark-md5";

export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

export function generateUniqueKey(originalFilename: string): string {
  const ext = getFileExtension(originalFilename);
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}.${ext}`;
}

export function getMimeType(filename: string): string {
  const ext = getFileExtension(filename).toLowerCase();
  const mimeTypes:any = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'pdf': 'application/pdf',
    // 添加更多类型...
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

/**
 * 读取文件
 * @param file 
 * @returns 
 */
export async function readFile(file: File) {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as ArrayBuffer);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsArrayBuffer(file);
  });
}

/**
 * 获取文件的md5
 * @param file 
 * @returns 
 */
export async function getMd5(file: File) {
  try {
      const buffer = await readFile(file);
      const hashHex = await SparkMD5.ArrayBuffer.hash(buffer);
      return hashHex;
    } catch (err) {
      return null;
    }
}

/**
 * 获取文件哈希值
 * @param file 
 * @returns 
 */
export async function calculateFileHash(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      const spark = new SparkMD5.ArrayBuffer();
      spark.append(buffer);
      resolve(spark.end());
    };

    reader.onerror = reject;
  });
}