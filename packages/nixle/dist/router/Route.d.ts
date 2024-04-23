import type { StatusCode } from '../index';
import type { Guard } from '../createGuard';
import type { Middleware } from '../createMiddleware';
import type { ProviderRouteHandlerContext } from '../provider/RouteHandler';
export interface RouteHandlerContext<P extends Record<string, any> = Record<string, any>, Q extends Record<string, any> = Record<string, any>, B extends Record<string, any> = Record<string, any>> extends ProviderRouteHandlerContext<P, Q, B> {
    /**
     * Custom data that you can pass to the context.
     *
     * `setData` with one param will merge the data with the existing one.
     * `setData` with two params will set the value for the key.
     *
     * `getData` with no params will return all data.
     * `getData` with one param will return the value for the key.
     *
     * @example
     * const userIdMiddleware = createMiddleware('user-id', ({ setData, getHeader }) => {
     *   const token = getHeader('token');
     *
     *   setData('userId', parseToken(token).userId); // Some logic to parse token
     *
     *   if (!data.userId) {
     *     throw createError('User ID is required', StatusCodes.UNAUTHORIZED);
     *   }
     * });
     *
     * const profileServices = createService('profile', ({ log }) => {
     *   const getVideos = async (id) => {
     *     log.info(`Getting videos for user ${id}`);
     *     return [];
     *   };
     *
     *   return { getVideos };
     * });
     *
     * const profileRouter = createRouter('/profile', {
     *   middlewares: [userIdMiddleware],
     *   routes: ({ route }) => [
     *     route.get('/profile/videos', ({ getData }) => profileServices().getVideos(getData('userId'))),
     *   ],
     * });
     */
    setData<D extends Record<string, any>>(data: D): void;
    setData<K extends string, V>(key: K, value: V): void;
    getData<T extends Record<string, any>>(): T;
    getData<T extends Record<string, any>, K extends keyof T = keyof T>(key: K): T[K];
    /**
     * Environment variables.
     */
    env: Nixle.Env & {
        get<K extends keyof Nixle.Env>(key: K): Nixle.Env[K] | undefined;
        getOrThrow<K extends keyof Nixle.Env>(key: K): Nixle.Env[K];
    };
}
export interface RouteHandler<P extends {}, Q extends {}, B extends {}, R extends unknown> {
    (context: RouteHandlerContext<P, Q, B>): R;
}
export interface RouteOptions<P extends {}, Q extends {}, B extends {}, R extends unknown> {
    /**
     * Status code
     * @default 200
     */
    statusCode?: StatusCode;
    /**
     * Path params validation.
     * In the method you can validate incoming params.
     *
     * @param params Incoming params
     *
     * @example
     * paramsValidation(params) {
     *   // We have a path '/users/:id'
     *   if (!params.id || typeof params.id !== 'string') {
     *     throw createError('ID is required');
     *   }
     *
     *   return { id: params.id };
     * }
     */
    paramsValidation?(params: any): P;
    /**
     * Body validation.
     * In the method you can validate body.
     *
     * @param body Incoming body
     *
     * @example
     * bodyValidation(body) {
     *   if (!body.name || typeof body.name !== 'string') {
     *     throw createError('Name is required');
     *   }
     *
     *   return { name: body.name };
     * }
     */
    bodyValidation?(body: any): B;
    /**
     * Query handler.
     * In the method you can validate query.
     *
     * @param query Incoming query
     *
     * @example
     * queryValidation(query) {
     *   if (!query.name || typeof query.name !== 'string') {
     *     throw createError('Name is required');
     *   }
     *
     *   return { name: query.name };
     * }
     */
    queryValidation?(query: any): Q;
    /**
     * Middleware handler.
     * In the method you can do anything you want and it will be called before the main handler.
     * If you return something the main handler will not be called.
     *
     * @param context All available context methods and properties
     *
     * @example
     * middlewares: [
     *   createMiddleware('log', { log }) {
     *     log('Hello world!');
     *   }),
     * ]
     */
    middlewares?: Middleware[];
    /**
     * Main request handler.
     * In the method you can do anything you want but we recommend to call a service created with `createService`.
     * Returned value will be sent to the client.
     *
     * @param context All available context methods and properties
     *
     * @example
     * handler(context) {
     *   return { message: 'Hello world!' };
     * }
     */
    handler: RouteHandler<P, Q, B, R>;
    /**
     * Guards.
     *
     * @example
     * guards: [
     *   createGuard(async ({ getCookie }) => {
     *     if (!getCookie('token')) {
     *       throw createError('Token is required', StatusCodes.UNAUTHORIZED);
     *     }
     *   }),
     * ]
     */
    guards?: Guard[];
}
