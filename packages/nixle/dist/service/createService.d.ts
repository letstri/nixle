import { type log } from '../logger';
export declare const extendServiceContext: (options: Record<string, unknown>) => void;
interface ServiceContext extends Nixle.ServiceContext {
    log: typeof log;
    env: Nixle.Env;
}
interface ServiceMethodsHandler<M extends unknown> {
    (context: ServiceContext): M;
}
export interface Service<N extends string, M extends Record<string, () => any> = Record<string, () => any>> {
    $inferMethods: M;
    $inferReturns: {
        [K in keyof M]: ReturnType<M[K]>;
    };
    name: N;
    (): M;
}
export declare function createService<N extends string, M extends Record<string, () => any> = Record<string, () => any>>(name: N, methods: ServiceMethodsHandler<M>): Service<N, M>;
export {};
