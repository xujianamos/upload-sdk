import https from 'https';
import http from 'http';
import { URL } from 'url';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  timeout?: number;
}

interface HttpResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

/**
 * HTTP 客户端使用示例：
 * 
 * 1. 基础使用
 * ```typescript
 * const httpClient = new HttpClient();
 * 
 * // 使用完整 URL
 * const users = await httpClient.get('https://api.example.com/users');
 * const user = await httpClient.get('https://api.example.com/users/1');
 * 
 * // POST 请求示例
 * const newUser = await httpClient.post('https://api.example.com/users', {
 *   name: 'test',
 *   email: 'test@example.com'
 * });
 * ```
 * 
 * 2. 使用 baseUrl
 * ```typescript
 * const httpClient = new HttpClient('https://api.example.com', {
 *   headers: {
 *     'Authorization': 'Bearer your-token'
 *   }
 * });
 * 
 * // 使用相对路径
 * const users = await httpClient.get('/users');
 * const user = await httpClient.get('/users/1');
 * ```
 * 
 * 3. HTTP/HTTPS 自动识别
 * ```typescript
 * const httpClient = new HttpClient();
 * 
 * // 自动识别协议
 * const httpsData = await httpClient.get('https://api.example.com/users');
 * const httpData = await httpClient.get('http://api.example.com/users');
 * ```
 * 
 * 4. 自定义请求选项
 * ```typescript
 * const httpClient = new HttpClient('https://api.example.com');
 * 
 * const response = await httpClient.get('/users', {
 *   timeout: 5000,
 *   headers: {
 *     'X-Custom-Header': 'value'
 *   }
 * });
 * ```
 * 
 * 5. 类型支持
 * ```typescript
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 * 
 * const user = await httpClient.get<User>('/users/1');
 * console.log(user.name); // 类型安全
 * ```
 */

/**
 * HTTP 客户端类
 * @class HttpClient
 * 
 * @description
 * 基于 Node.js https 模块封装的 HTTP 客户端，支持 Promise 接口和泛型类型。
 * 
 * @example
 * ```typescript
 * const client = new HttpClient('https://api.example.com');
 * const data = await client.get('/users');
 * ```
 */

/**
 * 请求配置选项接口
 * @interface RequestOptions
 * 
 * @property {string} [method] - 请求方法：'GET' | 'POST' | 'PUT' | 'DELETE'
 * @property {Record<string, string>} [headers] - 请求头
 * @property {number} [timeout] - 超时时间（毫秒）
 */

/**
 * HTTP 响应接口
 * @interface HttpResponse<T>
 * 
 * @property {T} data - 响应数据
 * @property {number} status - HTTP 状态码
 * @property {Record<string, string>} headers - 响应头
 */

/**
 * API 方法说明
 * 
 * get<T>(url: string, options?: RequestOptions): Promise<T>
 * 发送 GET 请求
 * @param url 请求地址
 * @param options 请求配置
 * @returns Promise<T> 响应数据
 * 
 * post<T>(url: string, data?: any, options?: RequestOptions): Promise<T>
 * 发送 POST 请求
 * @param url 请求地址
 * @param data 请求数据
 * @param options 请求配置
 * @returns Promise<T> 响应数据
 * 
 * put<T>(url: string, data?: any, options?: RequestOptions): Promise<T>
 * 发送 PUT 请求
 * @param url 请求地址
 * @param data 请求数据
 * @param options 请求配置
 * @returns Promise<T> 响应数据
 * 
 * delete<T>(url: string, options?: RequestOptions): Promise<T>
 * 发送 DELETE 请求
 * @param url 请求地址
 * @param options 请求配置
 * @returns Promise<T> 响应数据
 */

export class HttpClient {
  private baseUrl: string;
  private defaultOptions: RequestOptions;

  constructor(baseUrl: string = '', defaultOptions: RequestOptions = {}) {
    this.baseUrl = baseUrl;
    this.defaultOptions = {
      method: 'GET',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...defaultOptions
    };
  }

  private request<T>(url: string, options: RequestOptions = {}, data?: any): Promise<HttpResponse<T>> {
    // 判断是否为完整 URL
    const fullUrl = url.startsWith('http') ? new URL(url) : new URL(url, this.baseUrl);
    
    return new Promise((resolve, reject) => {
      const requestOptions = {
        ...this.defaultOptions,
        ...options,
        hostname: fullUrl.hostname,
        path: fullUrl.pathname + fullUrl.search,
        port: fullUrl.port || 443,
        protocol: fullUrl.protocol
      };
    
      // 根据协议选择请求模块
      const httpModule = requestOptions.protocol === 'https:' ? https : require('http');
    
      const req = httpModule.request(requestOptions, (res:http.IncomingMessage) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          try {
            const parsedData = responseData ? JSON.parse(responseData) : null;
            resolve({
              data: parsedData,
              status: res.statusCode || 500,
              headers: res.headers as Record<string, string>
            });
          } catch (error) {
            reject(new Error('解析响应数据失败'));
          }
        });
      });

      req.on('error', (error:any) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('请求超时'));
      });

      if (data) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    const response = await this.request<T>(url, { ...options, method: 'GET' });
    return response.data;
  }

  async post<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    const response = await this.request<T>(url, { ...options, method: 'POST' }, data);
    return response.data;
  }

  async put<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    const response = await this.request<T>(url, { ...options, method: 'PUT' }, data);
    return response.data;
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    const response = await this.request<T>(url, { ...options, method: 'DELETE' });
    return response.data;
  }
}