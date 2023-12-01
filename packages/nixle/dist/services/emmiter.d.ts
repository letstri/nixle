import type { Handler } from '../createProvider';
type Events = {
    request: Parameters<Handler>[0];
    response: any;
    error: any;
};
export declare const emitter: import("mitt").Emitter<Events>;
export {};
