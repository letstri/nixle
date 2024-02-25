import { type RouteHandlerContext } from '.';
import { type log } from './logger';
export interface GuardFunction {
    (context: RouteHandlerContext & {
        log: typeof log;
    }): Promise<void> | void;
}
export interface Guard {
    (context: RouteHandlerContext): Promise<void> | void;
}
export declare function createGuard<N extends string>(name: Lowercase<N>, guard: GuardFunction): Guard;
