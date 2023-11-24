import { type Elysia } from 'elysia';
import type { ApiMethods } from '../server';
export declare const elysiaProvider: (app: Elysia) => {
    methods: ApiMethods;
    server: Elysia<"", {
        request: {};
        store: {};
    }, {
        type: {};
        error: {};
    }, {}, {}, false>;
};
