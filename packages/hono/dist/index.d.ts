import type { Hono, Context } from 'hono';
type HonoRequest = Context['req'];
type HonoResponse = Context['res'];
export interface Request extends HonoRequest {
}
export interface Response extends HonoResponse {
}
export declare const honoProvider: (app: Hono<import("hono").Env, {}, "/">) => import("nixle").Provider<Hono<import("hono").Env, {}, "/">>;
export {};
