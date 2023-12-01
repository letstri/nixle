import { type log } from './services/logger';
interface ServiceOptions {
    log: typeof log;
}
type ServiceMethods = Record<string, (name: string, ...args: any) => any>;
export declare const createService: <Methods extends ServiceMethods>(service: (options: ServiceOptions) => Methods) => Methods;
export {};
