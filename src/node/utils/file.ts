import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export async function calculateFileHash(file: Buffer): Promise<string> {
  return crypto.createHash('md5').update(file).digest('hex');
}

export async function readFile(filePath: string): Promise<Buffer> {
  return fs.promises.readFile(filePath);
}

export function getFileExtension(filePath: string): string {
  const match = filePath.match(/\.([a-zA-Z0-9]+)$/);
  return match ? `.${match[1]}` : '.png';
}