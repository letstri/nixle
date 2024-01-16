import type { Express, Request as ExpressRequest, Response as ExpressResponse } from 'express';
export interface Request extends ExpressRequest {
}
export interface Response extends ExpressResponse {
}
export declare const expressProvider: (app: Express) => import("nixle").Provider<Express>;
