import { type log } from '../logger';
export declare const extendServiceContext: (options: Record<string, unknown>) => void;
interface ServiceContext extends Nixle.ServiceContext {
    log: typeof log;
    env: Nixle.Env;
}
interface ServiceMethodsHandler<M extends unknown> {
    (context: ServiceContext): M;
}
export interface Service<M extends Record<string, (...args: any) => any> = Record<string, (...args: any) => any>> {
    $inferMethods: M;
    $inferReturns: {
        [K in keyof M]: Awaited<ReturnType<M[K]>>;
    };
    (): M;
}
export declare function createService<M extends Record<string, (...args: any) => any> = Record<string, (...args: any) => any>>(name: string, methods: ServiceMethodsHandler<M>): Service<M>;
export {};
