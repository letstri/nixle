import { type Provider } from '../createApp';
import { type Routes } from './createRouter';
export declare const buildRoutes: <Server>(provider: Provider<Server>, routerPath: string, routes: Routes) => void;
