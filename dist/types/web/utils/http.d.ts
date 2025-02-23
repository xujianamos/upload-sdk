/**
 * HTTP 客户端使用示例：
 *
 * 1. 基础使用
 * ```typescript
 * const http = new HttpClient();
 *
 * // 完整 URL 请求
 * const users = await http.get('https://api.example.com/users');
 *
 * // POST 请求示例
 * const newUser = await http.post('https://api.example.com/users', {
 *   name: '张三',
 *   age: 25
 * });
 * ```
 *
 * 2. 配置 baseUrl
 * ```typescript
 * const http = new HttpClient('https://api.example.com');
 *
 * // 使用相对路径
 * const users = await http.get('/users');
 * const user = await http.get('/users/1');
 * ```
 *
 * 3. 自定义配置
 * ```typescript
 * const http = new HttpClient('https://api.example.com', {
 *   timeout: 5000,
 *   headers: {
 *     'Authorization': 'Bearer your-token',
 *     'X-Custom-Header': 'custom-value'
 *   }
 * });
 *
 * // 请求时覆盖配置
 * const response = await http.get('/users', {
 *   timeout: 3000,
 *   headers: {
 *     'X-Track-Id': 'tracking-id'
 *   }
 * });
 * ```
 *
 * 4. 类型支持
 * ```typescript
 * interface User {
 *   id: number;
 *   name: string;
 *   age: number;
 * }
 *
 * // 获取带类型的响应
 * const user = await http.get<User>('/users/1');
 * console.log(user.name); // 类型安全
 *
 * // 创建带类型验证的数据
 * const newUser = await http.post<User>('/users', {
 *   name: '张三',
 *   age: 25
 * });
 * ```
 */
interface RequestOptions extends RequestInit {
    timeout?: number;
}
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
