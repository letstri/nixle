import { createConsola as p } from "consola";
import { colorize as f, colors as G } from "consola/utils";
import M from "dayjs";
import Q from "mitt";
import h from "dotenv";
var A = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(A || {});
const b = (E, T) => Object.fromEntries(Object.entries(E).filter(([_]) => !T.includes(_))), y = (E) => E !== Object(E), i = Q(), F = Symbol("NixleError");
function l(E) {
  throw {
    message: typeof E == "string" ? E : E.message,
    statusCode: typeof E == "string" ? A.INTERNAL_SERVER_ERROR : E.statusCode || A.INTERNAL_SERVER_ERROR,
    time: M().format(),
    details: typeof E == "string" ? {} : E.details,
    __symbol: F
  };
}
const v = (E) => E?.__symbol === F, D = (E, T) => {
  let _ = "";
  v(E) || E instanceof Error ? _ = E.message : y(E) ? _ = E : _ = `${E.constructor.name} ${JSON.stringify(E)}`, T(f("red", _), { type: "error" }), i.emit("error", E);
}, s = (E, T = A.INTERNAL_SERVER_ERROR) => {
  const _ = M().format(), R = y(E), N = R && T || E.statusCode || T, e = R && E || E.message || "Internal Server Error", O = R && _ || E.time || _, g = R && {} || E.details || {}, c = {
    statusCode: N,
    message: e,
    time: O,
    details: g
  };
  return E instanceof Error && (c.details = b(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
    "message",
    "name",
    "stack"
  ])), c;
}, Y = (E) => {
  __NIXLE.loggerInstance = p(E);
}, U = (E, T) => {
  if (!__NIXLE.loggerInstance)
    return;
  const _ = T?.type || "log", R = `${f("bgBlue", " Nixle ")}`, N = __NIXLE.loggerInstance[_ || "log"];
  N || l(`Logger method "${_}" not found`), N(`${R}`, ...Array.isArray(E) ? E : [E]);
}, L = (E, T = "bgWhite") => (_, R) => U(
  [f(T, ` ${E} `), ...Array.isArray(_) ? _ : [_]],
  R
), P = (E) => {
  const T = E.startsWith("/") ? E : `/${E}`;
  return T.endsWith("/") ? T.slice(0, -1) : T;
}, H = ({ provider: E }, T, _) => {
  const R = L(T, "bgGreen");
  try {
    _.length === 0 && l("At least one router is required"), _.some(({ path: N, method: e, handler: O }) => !N || !e || !O) && l("Path, method and handler are required for each route");
  } catch (N) {
    D(N, R), process.exit(1);
  }
  _.forEach(({ path: N, method: e, options: O, handler: g }) => {
    const c = T + P(N), m = L(`${G.bold(e)} ${c}`, "bgGreen");
    E.createRoute({
      method: e.toLowerCase(),
      path: c,
      middleware(r) {
        i.emit("request", r), O?.middleware?.(r);
      },
      async handler(r) {
        try {
          await Promise.all([
            O?.queryValidation?.(r.query),
            O?.paramsValidation?.(r.params),
            O?.bodyValidation?.(r.body)
          ]);
        } catch (I) {
          return D(I, m), r.setStatusCode(I?.statusCode || A.BAD_REQUEST), s(I, A.BAD_REQUEST);
        }
        try {
          const I = await g(r);
          return i.emit("response", I), O?.statusCode && r.setStatusCode(O.statusCode), I;
        } catch (I) {
          return D(I, m), s(I);
        }
      }
    });
  }), R(`🚏 ${_.length} route${_.length === 1 ? "" : "s"} successfully built`, {
    type: "success"
  });
}, V = (E) => {
  E.modules.forEach((T) => {
    T.routers.forEach(({ path: _, routes: R }) => {
      const N = E.globalPrefix ? P(E.globalPrefix) : "";
      H(E, N + _, R);
    });
  });
}, n = (E, T, _) => typeof _ == "function" ? {
  path: T,
  method: E,
  handler: _
} : {
  path: T,
  method: E,
  options: _,
  handler: _.handler
}, X = (E, T) => n("GET", E, T), B = (E, T) => n("POST", E, T), o = (E, T) => n("PATCH", E, T), W = (E, T) => n("PUT", E, T), $ = (E, T) => n("DELETE", E, T), w = (E, T) => n("OPTIONS", E, T), x = {
  get: X,
  post: B,
  patch: o,
  put: W,
  delete: $,
  options: w
}, j = (E) => {
  __NIXLE.routerOptions = {
    ...__NIXLE.routerOptions,
    ...E
  };
}, t = (E, T) => ({
  path: P(E),
  routes: T({
    route: x,
    log: L(P(E), "bgGreen"),
    env: __NIXLE.env || {},
    ...__NIXLE.routerOptions
  })
}), q = (E) => {
  __NIXLE.serviceOptions = {
    ...__NIXLE.serviceOptions,
    ...E
  };
}, C = (E, T) => T({ log: L(E), env: __NIXLE.env || {}, ...__NIXLE.serviceOptions }), K = (E, T) => {
  T.plugins && T.plugins.forEach(({ name: _, plugin: R }) => {
    const N = L(_, "bgMagenta");
    R({ provider: E, log: N, extendRouterOptions: j, extendServiceOptions: q }), U(`🚀 ${_.trim()} plugin successfully loaded`, { type: "success" });
  });
}, J = (E) => {
  h.config(E), __NIXLE.env || (__NIXLE.env = {}), Object.keys(process.env).forEach((T) => {
    __NIXLE.env[T] = process.env[T];
  });
}, u = (E) => {
  E.logger !== !1 && Y(E.logger || {});
  try {
    E.provider || l("Provider is required"), E.modules.length === 0 && l("At least one module is required");
  } catch (_) {
    D(_, U), process.exit(1);
  }
  E.plugins && K(E.provider, E), J(E.env), V(E), E.provider.globalMiddleware(({ setHeader: _ }) => {
    _("X-Powered-By", "Nixle");
  });
  const T = {
    app: E.provider.app,
    events: {
      on: i.on,
      emit: i.emit
    }
  };
  return U("🚀 Application successfully started", { type: "success" }), T;
}, d = (E) => E, EE = (E) => E, TE = (E, T) => ({
  name: E,
  plugin: T
});
globalThis.__NIXLE = {};
export {
  A as StatusCode,
  u as createApp,
  l as createError,
  d as createModule,
  TE as createPlugin,
  EE as createProvider,
  t as createRouter,
  C as createService,
  j as extendRouterOptions,
  v as isNixleError
};
