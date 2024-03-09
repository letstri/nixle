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
    derive: {};
    resolve: {};
}, {
    type: {};
    error: {};
}, {}, {}, {}, false>) => import("nixle").Provider<Elysia<"", {
    request: {};
    store: {};
    derive: {};
    resolve: {};
}, {
    type: {};
    error: {};
}, {}, {}, {}, false>>;
export {};
