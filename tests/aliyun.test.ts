import { AliyunWebUploader } from '../src/aliyun/aliyun-web';
import { AliyunNodeUploader } from '../src/aliyun/aliyun-node';

describe('AliyunUploader Tests', () => {
  const options = {
    bucket: 'test-bucket',
    accessKey: 'test-key',
    secretKey: 'test-secret',
    domain: 'test.domain.com',
    region: 'oss-cn-hangzhou'
  };

  test('Web uploader should upload file successfully', async () => {
    const uploader = new AliyunWebUploader(options);
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    
    const result = await uploader.upload(file, 'test.txt');
    expect(result.key).toBe('test.txt');
    expect(result.url).toContain(options.domain);
  });

  test('Node uploader should upload buffer successfully', async () => {
    const uploader = new AliyunNodeUploader(options);
    const buffer = Buffer.from('test');
    
    const result = await uploader.upload(buffer, 'test.txt');
    expect(result.key).toBe('test.txt');
    expect(result.url).toContain(options.domain);
  });
});