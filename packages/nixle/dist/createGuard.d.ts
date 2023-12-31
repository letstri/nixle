import { type RouteHandlerContext } from '.';
export interface GuardFunction {
    (context: RouteHandlerContext & {
        env: Nixle.Env;
    }): Promise<void> | void;
}
export interface Guard {
    (context: RouteHandlerContext & {
        env: Nixle.Env;
    }): Promise<void>;
}
export declare function createGuard(name: string, guard: GuardFunction): Guard;
