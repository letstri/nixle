import { createRouter } from '../router/createRouter';
import { createService } from '../createService';
export interface Module {
    routers: ReturnType<typeof createRouter>[];
    services?: ReturnType<typeof createService>[];
}
export declare const createModule: (module: Module) => Module;
