import type { Elysia, Context } from 'elysia';
type ElysiaRequest = Context['request'];
type ElysiaResponse = Context['set'];
export interface Request extends ElysiaRequest {
}
export interface Response extends ElysiaResponse {
}
export declare const elysiaProvider: (app: Elysia<"", {
    request: {};
    store: {};
}, {
    type: {};
    error: {};
}, {}, {}, false>) => import("nixle").Provider<Elysia<"", {
    request: {};
    store: {};
}, {
    type: {};
    error: {};
}, {}, {}, false>>;
export {};
