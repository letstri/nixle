import type { CookieSerializeOptions } from 'cookie';
import type { HTTPMethod } from '.';
export type Handler = (params: {
    request: any;
    response: any;
    params: Record<string, string>;
    query: Record<string, string | string[]>;
    setStatusCode: (code: number) => void;
    setHeader: (key: string, value: string) => void;
    setCookie: (key: string, value: string, options?: CookieSerializeOptions) => void;
}) => Promise<any> | any;
export interface Provider<Server> {
    request: (method: Lowercase<HTTPMethod>, path: string, handler: Handler) => void;
    server: Server;
}
export declare const createProvider: <Server>(config: (app: Server) => Provider<Server>) => (app: Server) => Provider<Server>;
