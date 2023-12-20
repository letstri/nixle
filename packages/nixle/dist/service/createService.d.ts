import { type log } from '../logger';
export declare const extendServiceOptions: (options: Record<string, unknown>) => void;
interface ServiceOptions {
    log: typeof log;
    env: Nixle.Env;
}
export interface Service<M extends unknown = unknown> {
    (context: string): M;
}
export declare const createService: <M extends unknown = unknown>(service: (options: ServiceOptions & Nixle.ServiceOptions) => M) => Service<M>;
export {};
