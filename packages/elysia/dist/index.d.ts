import type { Elysia, Context } from 'elysia';
type ElysiaRequest = Context['request'];
type ElysiaResponse = Context['set'];
declare global {
    namespace Nixle {
        interface Provider extends Elysia {
        }
        interface Request extends ElysiaRequest {
        }
        interface Response extends ElysiaResponse {
        }
    }
}
export declare const elysiaProvider: (app: Nixle.Provider) => import("nixle").Provider;
export {};
