import { type RouteHandlerContext } from '.';
export interface GuardFunction {
    (context: RouteHandlerContext): Promise<void> | void;
}
export interface Guard {
    (context: RouteHandlerContext): Promise<void>;
}
export declare const createGuard: (name: string, guard: GuardFunction) => Guard;
