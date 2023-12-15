import { colorize as m, colors as H } from "consola/utils";
import { createConsola as b } from "consola";
import y from "dayjs";
import Y from "mitt";
import V from "dotenv";
var e = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(e || {});
const v = (E, T) => Object.fromEntries(Object.entries(E).filter(([R]) => !T.includes(R))), h = (E) => E !== Object(E), c = Y(), s = Symbol("NixleError");
function i(E) {
  throw {
    message: typeof E == "string" ? E : E.message,
    statusCode: typeof E == "string" ? e.INTERNAL_SERVER_ERROR : E.statusCode || e.INTERNAL_SERVER_ERROR,
    time: y().format(),
    details: typeof E == "string" ? {} : E.details,
    __nixle: s
  };
}
const B = (E) => E?.__nixle === s, P = (E, T) => {
  let R = "";
  B(E) || E instanceof Error ? R = E.message : h(E) ? R = E : R = `${E.constructor.name} ${JSON.stringify(E)}`, T(m("red", R), { type: "error" }), c.emit("error", E);
}, o = (E, T = e.INTERNAL_SERVER_ERROR) => {
  const R = y().format(), O = h(E), _ = O && T || E.statusCode || T, n = O && E || E.message || "Internal Server Error", r = O && R || E.time || R, D = O && {} || E.details || {}, A = {
    statusCode: _,
    message: n,
    time: r,
    details: D,
    __nixle: s
  };
  return E instanceof Error && (A.details = v(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
    "message",
    "name",
    "stack"
  ])), A;
};
let f;
const W = (E) => {
  f = b(E);
}, L = (E, T) => {
  if (!f)
    return;
  const R = T?.type || "log", O = `${m("bgBlue", " Nixle ")}`, _ = f[R || "log"];
  _ || i(`Logger method "${R}" not found`), _(`${O}`, ...Array.isArray(E) ? E : [E]);
}, l = (E, T = "bgWhite") => (R, O) => L(
  [m(T, ` ${E} `), ...Array.isArray(R) ? R : [R]],
  O
), g = (E) => {
  const T = E.startsWith("/") ? E : `/${E}`;
  return T.endsWith("/") ? T.slice(0, -1) : T;
}, x = (E, T, R) => {
  const O = l(T, "bgGreen");
  try {
    R.length === 0 && i("At least one router is required"), R.some(
      ({ path: _, method: n, route: r }) => !_ || !n || !(typeof r == "function" ? r : r.handler)
    ) && i("Path and handler are required for each route");
  } catch (_) {
    P(_, O), process.exit(1);
  }
  R.forEach(({ path: _, method: n, route: r }) => {
    const D = T + g(_), A = typeof r == "function" ? void 0 : r.statusCode, U = typeof r == "function" ? void 0 : r, Q = typeof r == "function" ? r : r.handler, p = l(`${H.bold(n)} ${D}`, "bgGreen");
    E.provider.createRoute({
      method: n.toLowerCase(),
      path: D,
      middleware: (N) => {
        c.emit("request", N), U?.middleware?.(N);
      },
      handler: async (N) => {
        try {
          await Promise.all([
            U?.queryValidation?.(N.query),
            U?.paramsValidation?.(N.params),
            U?.bodyValidation?.(N.body)
          ]);
        } catch (I) {
          return P(I, p), N.setStatusCode(I?.statusCode || e.BAD_REQUEST), o(I, e.BAD_REQUEST);
        }
        A && N.setStatusCode(A);
        try {
          const I = await Q(N);
          return c.emit("response", I), I;
        } catch (I) {
          return P(I, p), o(I);
        }
      }
    });
  }), O(`🚏 ${R.length} route${R.length === 1 ? "" : "s"} successfully built`, {
    type: "success"
  });
}, $ = (E) => {
  E.modules.forEach((T) => {
    T.routers.forEach(({ path: R, routes: O }) => {
      const _ = E.globalPrefix ? g(E.globalPrefix) : "";
      x(E, _ + R, O);
    });
  });
}, M = {}, w = (E) => {
  V.config(E), Object.keys(process.env).forEach((T) => {
    M[T] = process.env[T];
  });
}, F = {}, j = (E) => {
  Object.assign(F, E);
}, EE = (E, T) => ({
  path: g(E),
  routes: T({ log: l(g(E), "bgGreen"), env: M, ...F })
}), G = {}, q = (E) => {
  Object.assign(G, E);
}, TE = (E, T) => T({ log: l(E), env: M, ...G }), X = (E, T) => {
  T.plugins && T.plugins.forEach(async ({ name: R, plugin: O }) => {
    const _ = l(R, "bgMagenta");
    await O({ nixleApp: E, log: _, extendRouterOptions: j, extendServiceOptions: q }), L(`🚀 ${R.trim()} plugin successfully loaded`, { type: "success" });
  });
}, RE = (E) => {
  E.logger !== !1 && W(E.logger || {});
  try {
    E.provider || i("Provider is required"), E.modules.length === 0 && i("At least one module is required");
  } catch (R) {
    P(R, L), process.exit(1);
  }
  w(E.env), $(E), E.provider.globalMiddleware(({ setHeader: R }) => {
    R("X-Powered-By", "Nixle");
  });
  const T = {
    app: E.provider.app,
    events: {
      on: c.on,
      emit: c.emit
    }
  };
  return E.plugins && X(T, E), L("🚀 Application successfully started", { type: "success" }), T;
}, OE = (E) => E, K = (E, T) => ({ path: E, route: T, method: "GET" }), J = (E, T) => ({ path: E, route: T, method: "POST" }), Z = (E, T) => ({ path: E, route: T, method: "PATCH" }), k = (E, T) => ({ path: E, route: T, method: "PUT" }), z = (E, T) => ({ path: E, route: T, method: "DELETE" }), a = (E, T) => ({ path: E, route: T, method: "OPTIONS" }), _E = {
  get: K,
  post: J,
  patch: Z,
  put: k,
  delete: z,
  options: a
}, rE = (E) => E, NE = (E, T) => ({
  name: E,
  plugin: T
});
export {
  e as StatusCode,
  RE as createApp,
  i as createError,
  OE as createModule,
  NE as createPlugin,
  rE as createProvider,
  EE as createRouter,
  TE as createService,
  j as extendRouterOptions,
  B as isNixleError,
  _E as route,
  F as routerOptions
};
