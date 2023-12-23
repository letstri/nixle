import { type log } from '../logger';
export declare const extendServiceContext: (options: Record<string, unknown>) => void;
interface ServiceContext extends Nixle.ServiceContext {
    log: typeof log;
    env: Nixle.Env;
}
interface ServiceMethodsHandler<M extends unknown, S extends Record<string, Service> = Record<string, Service>> {
    (context: ServiceContext, services: {
        [K in keyof S]: ReturnType<S[K]>;
    }): M;
}
interface ServiceOptions<M extends unknown, S extends Record<string, Service>> {
    services?: S;
    methods: ServiceMethodsHandler<M, S>;
}
export interface Service<M extends unknown = unknown> {
    (context: string): M;
}
export declare function createService<M extends unknown = unknown, S extends Record<string, Service> = Record<string, Service>>(options: ServiceOptions<M, S>): Service<M>;
export declare function createService<M extends unknown = unknown>(methods: ServiceMethodsHandler<M>): Service<M>;
export {};
