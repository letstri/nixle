import type { Elysia } from 'elysia';
import { type Provider } from 'nixle';
export declare const elysiaProvider: (app: Elysia<"", {
    request: {};
    store: {};
}, {
    type: {};
    error: {};
}, {}, {}, false>) => Provider<Elysia<"", {
    request: {};
    store: {};
}, {
    type: {};
    error: {};
}, {}, {}, false>>;
