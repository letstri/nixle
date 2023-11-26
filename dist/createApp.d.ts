import { type Module } from './createModule';
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type MethodHandler = (path: string, handler: (params: {
    req: any;
    res: any;
}) => Promise<any> | any) => Promise<any> | any;
export type ApiMethods = Record<Lowercase<HTTPMethod>, MethodHandler>;
export declare const createApp: <Server>(provider: {
    methods: ApiMethods;
    server: Server;
}, { modules, }: {
    modules: Module[];
}) => Server;
