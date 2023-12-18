import type { HTTPMethod, RouteHandler, RouteOptions } from '..';
interface Route<P extends unknown = any, Q extends unknown = any, B extends unknown = any> {
    path: string;
    method: HTTPMethod;
    options?: RouteOptions<P, Q, B>;
    handler: RouteHandler<P, Q, B>;
}
declare const route: {
    get: <P extends unknown, Q extends unknown, B extends unknown>(path: string, optionsOrHandler: RouteOptions<P, Q, B> | RouteHandler<P, Q, B>) => Route<P, Q, B>;
    post: <P_1 extends unknown, Q_1 extends unknown, B_1 extends unknown>(path: string, optionsOrHandler: RouteOptions<P_1, Q_1, B_1> | RouteHandler<P_1, Q_1, B_1>) => Route<P_1, Q_1, B_1>;
    patch: <P_2 extends unknown, Q_2 extends unknown, B_2 extends unknown>(path: string, optionsOrHandler: RouteOptions<P_2, Q_2, B_2> | RouteHandler<P_2, Q_2, B_2>) => Route<P_2, Q_2, B_2>;
    put: <P_3 extends unknown, Q_3 extends unknown, B_3 extends unknown>(path: string, optionsOrHandler: RouteOptions<P_3, Q_3, B_3> | RouteHandler<P_3, Q_3, B_3>) => Route<P_3, Q_3, B_3>;
    delete: <P_4 extends unknown, Q_4 extends unknown, B_4 extends unknown>(path: string, optionsOrHandler: RouteOptions<P_4, Q_4, B_4> | RouteHandler<P_4, Q_4, B_4>) => Route<P_4, Q_4, B_4>;
    options: <P_5 extends unknown, Q_5 extends unknown, B_5 extends unknown>(path: string, optionsOrHandler: RouteOptions<P_5, Q_5, B_5> | RouteHandler<P_5, Q_5, B_5>) => Route<P_5, Q_5, B_5>;
};
export { route };
export type { Route };
