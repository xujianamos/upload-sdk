interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    timeout?: number;
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
export declare class HttpClient {
    private baseUrl;
    private defaultOptions;
    constructor(baseUrl?: string, defaultOptions?: RequestOptions);
    private request;
    get<T>(url: string, options?: RequestOptions): Promise<T>;
    post<T>(url: string, data?: any, options?: RequestOptions): Promise<T>;
    put<T>(url: string, data?: any, options?: RequestOptions): Promise<T>;
    delete<T>(url: string, options?: RequestOptions): Promise<T>;
}
export {};
