import type { Express, Request as ExpressRequest, Response as ExpressResponse } from 'express';
declare global {
    namespace Nixle {
        interface Provider extends Express {
        }
        interface Request extends ExpressRequest {
        }
        interface Response extends ExpressResponse {
        }
    }
}
export declare const expressProvider: (app: Nixle.Provider) => import("nixle").Provider;
