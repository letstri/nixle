import type { RequestHandlerParams } from './provider/RequestHandler';
type Events = {
    request: RequestHandlerParams;
    response: any;
    error: any;
};
export declare const emitter: import("mitt").Emitter<Events>;
export {};
