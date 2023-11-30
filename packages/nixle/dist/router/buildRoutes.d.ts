import type { Provider } from '../createProvider';
import type { Routes } from './createRouter';
export declare const logAndFormatError: (error: any) => {
    statusCode: any;
    message: any;
    time: any;
};
export declare const buildRoutes: <Server>(provider: Provider<Server>, routerPath: string, routes: Routes) => void;
