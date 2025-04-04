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

interface HttpResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

export class HttpClient {
  private baseUrl: string;
  private defaultOptions: RequestOptions;

  constructor(baseUrl: string = '', defaultOptions: RequestOptions = {}) {
    this.baseUrl = baseUrl;
    this.defaultOptions = {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...defaultOptions
    };
  }

  private async request<T>(url: string, options: RequestOptions = {}): Promise<HttpResponse<T>> {
    // 判断是否为完整 URL
    const fullUrl = url.startsWith('http') ? url : new URL(url, this.baseUrl);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || this.defaultOptions.timeout);
  
    try {
      const response = await fetch(typeof fullUrl === 'string' ? fullUrl : fullUrl.toString(), {
        ...this.defaultOptions,
        ...options,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      return {
        data,
        status: response.status,
        headers: response.headers
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('请求超时');
        }
        throw error;
      }
      throw new Error('请求失败');
    }
  }

  async get<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const response = await this.request<T>(url, {
      ...options,
      method: 'GET'
    });
    return response.data;
  }

  async post<T>(url: string, data?: any, options: RequestOptions = {}): Promise<T> {
    const response = await this.request<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response.data;
  }

  async put<T>(url: string, data?: any, options: RequestOptions = {}): Promise<T> {
    const response = await this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return response.data;
  }

  async delete<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const response = await this.request<T>(url, {
      ...options,
      method: 'DELETE'
    });
    return response.data;
  }
}