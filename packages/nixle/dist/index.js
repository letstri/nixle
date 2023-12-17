import { createConsola as Q } from "consola";
import { colorize as f, colors as h } from "consola/utils";
import M from "dayjs";
import b from "mitt";
import p from "dotenv";
var A = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(A || {});
const Y = (E, T) => Object.fromEntries(Object.entries(E).filter(([_]) => !T.includes(_))), y = (E) => E !== Object(E), i = b(), F = Symbol("NixleError");
function l(E) {
  throw {
    message: typeof E == "string" ? E : E.message,
    statusCode: typeof E == "string" ? A.INTERNAL_SERVER_ERROR : E.statusCode || A.INTERNAL_SERVER_ERROR,
    time: M().format(),
    details: typeof E == "string" ? {} : E.details,
    __symbol: F
  };
}
const v = (E) => E?.__symbol === F, L = (E, T) => {
  let _ = "";
  v(E) || E instanceof Error ? _ = E.message : y(E) ? _ = E : _ = `${E.constructor.name} ${JSON.stringify(E)}`, T(f("red", _), { type: "error" }), i.emit("error", E);
}, s = (E, T = A.INTERNAL_SERVER_ERROR) => {
  const _ = M().format(), R = y(E), O = R && T || E.statusCode || T, e = R && E || E.message || "Internal Server Error", N = R && _ || E.time || _, g = R && {} || E.details || {}, c = {
    statusCode: O,
    message: e,
    time: N,
    details: g
  };
  return E instanceof Error && (c.details = Y(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
    "message",
    "name",
    "stack"
  ])), c;
}, H = (E) => {
  __NIXLE.loggerInstance = Q(E);
}, U = (E, T) => {
  if (!__NIXLE.loggerInstance)
    return;
  const _ = T?.type || "log", R = `${f("bgBlue", " Nixle ")}`, O = __NIXLE.loggerInstance[_ || "log"];
  O || l(`Logger method "${_}" not found`), O(`${R}`, ...Array.isArray(E) ? E : [E]);
}, D = (E, T = "bgWhite") => (_, R) => U(
  [f(T, ` ${E} `), ...Array.isArray(_) ? _ : [_]],
  R
), P = (E) => {
  const T = E.startsWith("/") ? E : `/${E}`;
  return T.endsWith("/") ? T.slice(0, -1) : T;
}, V = ({ provider: E }, T, _) => {
  const R = D(T, "bgGreen");
  try {
    _.length === 0 && l("At least one router is required"), _.some(({ path: O, method: e, handler: N }) => !O || !e || !N) && l("Path, method and handler are required for each route");
  } catch (O) {
    L(O, R), process.exit(1);
  }
  _.forEach(({ path: O, method: e, options: N, handler: g }) => {
    const c = T + P(O), m = D(`${h.bold(e)} ${c}`, "bgGreen");
    E.createRoute({
      method: e.toLowerCase(),
      path: c,
      middleware(r) {
        i.emit("request", r), N?.middleware?.(r);
      },
      async handler(r) {
        try {
          await Promise.all([
            N?.queryValidation?.(r.query),
            N?.paramsValidation?.(r.params),
            N?.bodyValidation?.(r.body)
          ]);
        } catch (I) {
          return L(I, m), r.setStatusCode(I?.statusCode || A.BAD_REQUEST), s(I, A.BAD_REQUEST);
        }
        try {
          const I = await g(r);
          return i.emit("response", I), N?.statusCode && r.setStatusCode(N.statusCode), I;
        } catch (I) {
          return L(I, m), s(I);
        }
      }
    });
  }), R(`🚏 ${_.length} route${_.length === 1 ? "" : "s"} successfully built`, {
    type: "success"
  });
}, B = (E) => {
  E.modules.forEach((T) => {
    T.routers.forEach(({ path: _, routes: R }) => {
      const O = E.globalPrefix ? P(E.globalPrefix) : "";
      V(E, O + _, R);
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
}, X = (E, T) => n("GET", E, T), o = (E, T) => n("POST", E, T), W = (E, T) => n("PATCH", E, T), $ = (E, T) => n("PUT", E, T), w = (E, T) => n("DELETE", E, T), x = (E, T) => n("OPTIONS", E, T), j = {
  get: X,
  post: o,
  patch: W,
  put: $,
  delete: w,
  options: x
}, q = (E) => {
  __NIXLE.routerOptions = {
    ...__NIXLE.routerOptions,
    ...E
  };
}, C = (E, T) => ({
  path: P(E),
  routes: T({
    route: j,
    log: D(P(E), "bgGreen"),
    env: __NIXLE.env || {},
    ...__NIXLE.routerOptions
  })
}), G = {}, K = (E) => {
  Object.assign(G, E);
}, u = (E, T) => T({ log: D(E), env: __NIXLE.env || {}, ...G }), J = (E, T) => {
  T.plugins && T.plugins.forEach(async ({ name: _, plugin: R }) => {
    const O = D(_, "bgMagenta");
    await R({ nixleApp: E, log: O, extendRouterOptions: q, extendServiceOptions: K }), U(`🚀 ${_.trim()} plugin successfully loaded`, { type: "success" });
  });
}, Z = (E) => {
  p.config(E), __NIXLE.env || (__NIXLE.env = {}), Object.keys(process.env).forEach((T) => {
    __NIXLE.env[T] = process.env[T];
  });
}, d = (E) => {
  E.logger !== !1 && H(E.logger || {});
  try {
    E.provider || l("Provider is required"), E.modules.length === 0 && l("At least one module is required");
  } catch (_) {
    L(_, U), process.exit(1);
  }
  Z(E.env), B(E), E.provider.globalMiddleware(({ setHeader: _ }) => {
    _("X-Powered-By", "Nixle");
  });
  const T = {
    app: E.provider.app,
    events: {
      on: i.on,
      emit: i.emit
    }
  };
  return E.plugins && J(T, E), U("🚀 Application successfully started", { type: "success" }), T;
}, EE = (E) => E, TE = (E) => E, _E = (E, T) => ({
  name: E,
  plugin: T
});
globalThis.__NIXLE = {};
export {
  A as StatusCode,
  d as createApp,
  l as createError,
  EE as createModule,
  _E as createPlugin,
  TE as createProvider,
  C as createRouter,
  u as createService,
  q as extendRouterOptions,
  v as isNixleError
};
