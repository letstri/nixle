import type { Router } from '../router/createRouter';
export interface ModuleOptions {
    routers: Router[];
}
export interface Module {
    options: ModuleOptions;
}
export declare const createModule: (options: ModuleOptions) => Module;
