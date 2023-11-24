import { type HTTPMethod } from './server';
export interface Route {
    method: Lowercase<HTTPMethod>;
    path: string;
    handler: (params: {
        req: any;
        res: any;
    }) => any;
}
export declare const routers: Map<string, () => Route[]>;
export declare const createRouter: (path: string, routes: () => Route[]) => [string, () => Route[]];
