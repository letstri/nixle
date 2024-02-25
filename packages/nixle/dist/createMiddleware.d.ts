import { type RouteHandlerContext } from '.';
import { type log } from './logger';
export interface MiddlewareFunction {
    (context: RouteHandlerContext & {
        log: typeof log;
    }): Promise<void> | void;
}
export interface Middleware {
    (context: RouteHandlerContext): Promise<void> | void;
}
export declare function createMiddleware<N extends string>(name: Lowercase<N>, middleware: MiddlewareFunction): Middleware;
