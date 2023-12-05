import type { Hono, Context } from 'hono';
type HonoRequest = Context['req'];
type HonoResponse = Context['res'];
declare global {
    namespace Nixle {
        interface Provider extends Hono {
        }
        interface Request extends HonoRequest {
        }
        interface Response extends HonoResponse {
        }
    }
}
export declare const honoProvider: (app: Nixle.Provider) => import("nixle").Provider;
export {};
