import { log as _log } from './logger/logger';
export declare const createService: <Methods extends Record<string, (...args: any) => any>>(service: ({ log }: {
    log: typeof _log;
}) => Methods) => Methods;
