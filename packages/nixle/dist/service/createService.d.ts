import { type log } from '../logger';
import { env } from '../env';
type ServiceMethods = Record<string, (name: string, ...args: any) => any>;
export declare const extendServiceOptions: (options: Record<string, unknown>) => void;
export declare const createService: <Methods extends ServiceMethods>(name: string, service: (options: {
    log: typeof log;
    env: Nixle.Env;
} & Nixle.ServiceOptions) => Methods) => Methods;
export {};
