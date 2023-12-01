import type { ConsolaOptions } from 'consola';
import type { Module } from './modules/createModule';
import type { Provider } from './createProvider';
import type { createPlugin } from './plugins/createPlugin';
export interface AppOptions<Server> {
    provider: Provider<Server>;
    modules: Module[];
    plugins?: ReturnType<typeof createPlugin>[];
    logger?: Partial<ConsolaOptions>;
}
export type NixleApp<Server> = ReturnType<typeof createApp<Server>>;
export declare const createApp: <Server = unknown>(options: AppOptions<Server>) => {
    app: Server;
    events: {
        on: {
            <Key extends keyof {
                request: {
                    request: any;
                    response: any;
                    params: Record<string, string>;
                    query: Record<string, string | string[]>;
                    setStatusCode: (code: number) => void;
                    setHeader: (key: string, value: string) => void;
                    getHeader: (key: string) => string | null;
                    setCookie: (key: string, value: string, options?: import("cookie").CookieSerializeOptions | undefined) => void;
                    getCookie: (key: string) => string | null;
                };
                response: any;
                error: any;
            }>(type: Key, handler: import("mitt").Handler<{
                request: {
                    request: any;
                    response: any;
                    params: Record<string, string>;
                    query: Record<string, string | string[]>;
                    setStatusCode: (code: number) => void;
                    setHeader: (key: string, value: string) => void;
                    getHeader: (key: string) => string | null;
                    setCookie: (key: string, value: string, options?: import("cookie").CookieSerializeOptions | undefined) => void;
                    getCookie: (key: string) => string | null;
                };
                response: any;
                error: any;
            }[Key]>): void;
            (type: "*", handler: import("mitt").WildcardHandler<{
                request: {
                    request: any;
                    response: any;
                    params: Record<string, string>;
                    query: Record<string, string | string[]>;
                    setStatusCode: (code: number) => void;
                    setHeader: (key: string, value: string) => void;
                    getHeader: (key: string) => string | null;
                    setCookie: (key: string, value: string, options?: import("cookie").CookieSerializeOptions | undefined) => void;
                    getCookie: (key: string) => string | null;
                };
                response: any;
                error: any;
            }>): void;
        };
        emit: {
            <Key_1 extends keyof {
                request: {
                    request: any;
                    response: any;
                    params: Record<string, string>;
                    query: Record<string, string | string[]>;
                    setStatusCode: (code: number) => void;
                    setHeader: (key: string, value: string) => void;
                    getHeader: (key: string) => string | null;
                    setCookie: (key: string, value: string, options?: import("cookie").CookieSerializeOptions | undefined) => void;
                    getCookie: (key: string) => string | null;
                };
                response: any;
                error: any;
            }>(type: Key_1, event: {
                request: {
                    request: any;
                    response: any;
                    params: Record<string, string>;
                    query: Record<string, string | string[]>;
                    setStatusCode: (code: number) => void;
                    setHeader: (key: string, value: string) => void;
                    getHeader: (key: string) => string | null;
                    setCookie: (key: string, value: string, options?: import("cookie").CookieSerializeOptions | undefined) => void;
                    getCookie: (key: string) => string | null;
                };
                response: any;
                error: any;
            }[Key_1]): void;
            <Key_2 extends keyof {
                request: {
                    request: any;
                    response: any;
                    params: Record<string, string>;
                    query: Record<string, string | string[]>;
                    setStatusCode: (code: number) => void;
                    setHeader: (key: string, value: string) => void;
                    getHeader: (key: string) => string | null;
                    setCookie: (key: string, value: string, options?: import("cookie").CookieSerializeOptions | undefined) => void;
                    getCookie: (key: string) => string | null;
                };
                response: any;
                error: any;
            }>(type: undefined extends {
                request: {
                    request: any;
                    response: any;
                    params: Record<string, string>;
                    query: Record<string, string | string[]>;
                    setStatusCode: (code: number) => void;
                    setHeader: (key: string, value: string) => void;
                    getHeader: (key: string) => string | null;
                    setCookie: (key: string, value: string, options?: import("cookie").CookieSerializeOptions | undefined) => void;
                    getCookie: (key: string) => string | null;
                };
                response: any;
                error: any;
            }[Key_2] ? Key_2 : never): void;
        };
    };
    createRoute: (method: "get" | "post" | "put" | "delete" | "patch" | "head" | "options", path: string, handler: import("./createProvider").RequestHandler) => void;
};
