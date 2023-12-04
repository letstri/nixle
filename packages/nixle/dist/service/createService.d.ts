import { type log } from '../logger';
interface ServiceOptions {
    log: typeof log;
}
type ServiceMethods = Record<string, (name: string, ...args: any) => any>;
export declare const extendServiceOptions: (options: Record<string, unknown>) => void;
export declare const createService: <Methods extends ServiceMethods>(name: string, service: (options: ServiceOptions & Nixle.ServiceOptions) => Methods) => Methods;
export {};
