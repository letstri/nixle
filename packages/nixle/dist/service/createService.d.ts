import { type log } from '../logger';
export declare const extendServiceOptions: (options: Record<string, unknown>) => void;
export declare const createService: <Methods extends unknown = any>(name: string, service: (options: {
    log: typeof log;
    env: Nixle.Env;
} & Nixle.ServiceOptions) => Methods) => Methods;
