import { type createRouter } from '../router/createRouter';
export interface Module {
    routers: ReturnType<typeof createRouter>[];
}
export declare const createModule: (module: Module) => Module;
