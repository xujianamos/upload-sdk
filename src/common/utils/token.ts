import * as crypto from 'crypto';

export function generateSignature(stringToSign: string, secretKey: string): string {
  return crypto
    .createHmac('sha1', secretKey)
    .update(Buffer.from(stringToSign, 'utf8'))
    .digest('base64');
}

export function generatePolicy(bucket: string, key: string, expires: number): string {
  const policy = {
    expiration: new Date(Date.now() + expires * 1000).toISOString(),
    conditions: [
      { bucket: bucket },
      ['content-length-range', 0, 1048576000],
      ['starts-with', '$key', key]
    ]
  };

  return Buffer.from(JSON.stringify(policy)).toString('base64');
}