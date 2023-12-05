import type { CookieOptions } from '..';

export interface RequestHandlerParams {
  /**
   * Request
   */
  request: Nixle.Request;
  /**
   * Response
   */
  response: Nixle.Response;
  /**
   * Path parameters
   *
   * @example
   * '/users/:id'
   *
   * @returns
   * { id: '1' }
   */
  params: Record<string, string>;
  /**
   * Query parameters
   *
   * @returns
   * { name: 'John' }
   *
   * @example
   * '/users?name=John'
   */
  query: Record<string, string | string[]>;
  /**
   * Set status code
   *
   * @param code
   * @default 200
   *
   * @example
   * setStatusCode(404);
   */
  setStatusCode: (code: number) => void;
  /**
   * Set header
   *
   * @param key
   * @param value
   *
   * @example
   * setHeader('Content-Type', 'application/json');
   */
  setHeader: (key: string, value: string) => void;
  /**
   * Get header
   *
   * @param key
   *
   * @example
   * getHeader('Content-Type'); // -> application/json
   */
  getHeader: (key: string) => string | null;
  /**
   * Set cookie
   *
   * @param key
   * @param value
   * @param options
   *
   * @example
   * setCookie('token', '123');
   * setCookie('token', '123', { httpOnly: true });
   */
  setCookie: (key: string, value: string, options?: CookieOptions) => void;
  /**
   * Get cookie
   *
   * @param key
   *
   * @example
   * getCookie('token'); // -> 123
   */
  getCookie: (key: string) => string | null;
}

export interface RequestHandler {
  (params: RequestHandlerParams): any;
}
