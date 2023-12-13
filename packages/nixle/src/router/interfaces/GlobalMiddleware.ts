import type { HTTPMethod } from '~/index';

export interface GlobalMiddlewareHandlerContext {
  /**
   * URL of the request
   */
  url: string;
  /**
   * HTTP method of the request
   */
  method: HTTPMethod;
  /**
   * Headers
   *
   * @readonly
   */
  headers: Readonly<Record<string, string>>;
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
}

export interface GlobalMiddlewareHandler {
  (context: GlobalMiddlewareHandlerContext): any;
}
