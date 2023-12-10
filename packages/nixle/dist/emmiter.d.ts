type Events = {
    request: any;
    response: any;
    error: any;
};
export declare const emitter: import("mitt").Emitter<Events>;
export {};
