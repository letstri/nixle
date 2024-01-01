import { type log } from '../logger';
export declare const extendServiceContext: (options: Record<string, unknown>) => void;
interface ServiceContext extends Nixle.ServiceContext {
    log: typeof log;
    env: Nixle.Env;
}
interface ServiceMethodsHandler<M extends unknown> {
    (context: ServiceContext): M;
}
export interface Service<M extends unknown = unknown> {
    (): M;
}
export declare function createService<M extends unknown = unknown>(name: string, methods: ServiceMethodsHandler<M>): Service<M>;
export {};
