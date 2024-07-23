import type { Elysia, Context } from 'elysia';
type ElysiaRequest = Context['request'];
type ElysiaResponse = Context['set'];
export interface Request extends ElysiaRequest {
}
export interface Response extends ElysiaResponse {
}
export declare const elysiaProvider: (app: Elysia<"", false, {
    decorator: {};
    store: {};
    derive: {};
    resolve: {};
}, {
    type: {};
    error: {};
}, {
    schema: {};
    macro: {};
    macroFn: {};
}, {}, {
    derive: {};
    resolve: {};
    schema: {};
}, {
    derive: {};
    resolve: {};
    schema: {};
}>) => import("nixle").Provider<Elysia<"", false, {
    decorator: {};
    store: {};
    derive: {};
    resolve: {};
}, {
    type: {};
    error: {};
}, {
    schema: {};
    macro: {};
    macroFn: {};
}, {}, {
    derive: {};
    resolve: {};
    schema: {};
}, {
    derive: {};
    resolve: {};
    schema: {};
}>>;
export {};
