import { type Module } from './modules';
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type ApiHandler = (path: string, handler: (params: {
    req: any;
    res: any;
}) => Promise<any> | any) => Promise<any> | any;
export type ApiMethods = Record<Lowercase<HTTPMethod>, ApiHandler>;
export declare const createApp: <Server>(provider: {
    methods: ApiMethods;
    server: Server;
}, { modules, }: {
    modules: Module[];
}) => Server;
