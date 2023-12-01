import type { HandlerParams } from '../createProvider';
type Events = {
    request: HandlerParams;
    response: any;
    error: any;
};
export declare const emitter: import("mitt").Emitter<Events>;
export {};
