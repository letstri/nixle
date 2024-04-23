import { type RouteHandlerContext } from '.';
import { type log } from './logger';
export declare const extendServiceContext: <T extends unknown>(options: T) => void;
interface ServiceContext extends Nixle.ServiceContext {
    log: typeof log;
    env: RouteHandlerContext['env'];
}
interface ServiceFunction<M extends unknown> {
    (context: ServiceContext): M;
}
export interface Service<M extends Record<string, (...args: any) => any> = Record<string, (...args: any) => any>> {
    (): M;
}
export declare function createService<N extends string, M extends Record<string, (...args: any) => any> = Record<string, (...args: any) => any>>(name: Lowercase<N>, methods: ServiceFunction<M>): Service<M>;
export {};
