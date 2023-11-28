import { type Logger } from './logger/logger';
import { type Module } from './modules/createModule';
import { type HTTPMethod } from './utils/HTTPMethod';
import type { Provider } from './createProvider';
export type MethodHandler = (path: string, handler: (params: {
    req: any;
    res: any;
    setStatusCode: (code: number) => void;
    setHeader: (key: string, value: string) => void;
    setCookie: (key: string, value: string) => void;
}) => Promise<any> | any) => void;
export type ApiMethods = Record<Lowercase<HTTPMethod>, MethodHandler>;
export interface AppOptions<Server> {
    provider: Provider<Server>;
    modules: Module[];
    logger?: Logger | null;
}
export declare const createApp: <Server>({ provider, logger: _logger, ...options }: AppOptions<Server>) => Server;
