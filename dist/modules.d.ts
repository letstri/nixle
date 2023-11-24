import { createRouter } from './routers';
export interface Module {
    routers: ReturnType<typeof createRouter>[];
}
export declare const createModule: ({ routers, }: {
    routers: ReturnType<typeof createRouter>[];
}) => Module;
