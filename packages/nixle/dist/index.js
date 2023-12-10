import { colorize as P, colors as H } from "consola/utils";
import { createConsola as Y } from "consola";
import g from "dayjs";
import Q from "mitt";
var b = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(b || {});
const M = "YYYY-MM-DD HH:mm:ss", w = (E, T) => Object.fromEntries(Object.entries(E).filter(([e]) => !T.includes(e))), h = (E) => E !== Object(E), N = Q();
class i extends Error {
  constructor({
    message: T,
    statusCode: e,
    isInternal: O = !1,
    ...r
  }) {
    super(T), this.time = g().format(M), this.statusCode = 400, this.isInternal = !1, this.details = {}, this.name = "NixleError", this.statusCode = e || 400, Object.assign(this, r);
  }
}
function c(E) {
  throw typeof E == "string" ? new i({ message: E, isInternal: !0 }) : new i({ ...E, isInternal: !0 });
}
function d(E) {
  throw typeof E == "string" ? new i({ message: E }) : new i(E);
}
const V = (E) => E instanceof i, l = (E, T) => {
  let e = "";
  V(E) ? e = E.isInternal && E.stack || E.message : E instanceof Error ? e = E.stack || E.message : h(E) ? e = E : e = `${E.constructor.name} ${JSON.stringify(E)}`, T(P("red", e), { type: "error" }), N.emit("error", E);
}, f = (E, T = 500) => {
  const e = ["name", "stack", "message", "statusCode", "time", "isInternal"], O = g().format(M), r = h(E) ? {
    statusCode: T,
    message: String(E),
    time: O,
    details: E
  } : {
    statusCode: E.statusCode || T,
    message: E.message || "Internal Server Error",
    time: E.time || O,
    details: E
  };
  return E instanceof Error && (r.details = w(
    JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))),
    e
  )), r;
};
let p;
const v = (E) => {
  p = Y(E);
}, D = (E, T) => {
  const e = T?.type || "log", O = `${P("bgBlue", " Nixle ")}`, r = p?.[e || "log"];
  r || c(`Logger method "${e}" not found`), r(`${O}`, ...Array.isArray(E) ? E : [E]);
}, I = (E, T = "bgWhite") => (e, O) => D(
  [P(T, ` ${E} `), ...Array.isArray(e) ? e : [e]],
  O
), s = (E) => {
  const T = E.startsWith("/") ? E : `/${E}`;
  return T.endsWith("/") ? T.slice(0, -1) : T;
}, B = (E, T, e) => {
  const O = I(T, "bgGreen");
  try {
    e.length === 0 && c("At least one router is required"), e.some(
      ({ path: r, method: U, route: R }) => !r || !U || !(typeof R == "function" ? R : R.handler)
    ) && c("Path and handler are required for each route");
  } catch (r) {
    l(r, O), process.exit(1);
  }
  e.forEach(({ path: r, method: U, route: R }) => {
    const o = T + s(r), L = typeof R == "function" ? void 0 : R.statusCode, A = typeof R == "function" ? void 0 : R, G = typeof R == "function" ? R : R.handler;
    E.provider.createRoute({
      method: U.toLowerCase(),
      path: o,
      middleware: A?.middleware,
      handler: async (n) => {
        N.emit("request", n), n.setHeader("x-powered-by", "Nixle");
        const m = I(n.url, "bgGreen");
        try {
          await Promise.all([
            A?.queryValidation?.(n.query),
            A?.paramsValidation?.(n.params),
            A?.bodyValidation?.(n.body)
          ]);
        } catch (_) {
          throw l(
            _ instanceof Error ? new i({ message: `${_.name}: ${_.message}` }) : _,
            m
          ), f(_, 400);
        }
        L && n.setStatusCode(L);
        try {
          const _ = await G(n);
          return N.emit("response", _), _;
        } catch (_) {
          throw l(_, m), f(_);
        }
      }
    });
  }), O(`🚏 ${e.length} route${e.length === 1 ? "" : "s"} successfully built`, {
    type: "success"
  });
}, W = (E) => {
  E.modules.forEach((T) => {
    T.routers.forEach(([e, O]) => {
      const r = E.globalPrefix ? s(E.globalPrefix) : "";
      B(E, r + s(e), O);
    });
  });
}, y = {}, $ = (E) => {
  Object.assign(y, E);
}, C = (E, T) => [E, T({ log: I(E, "bgGreen"), ...y })], F = {}, a = (E) => {
  Object.assign(F, E);
}, u = (E, T) => T({ log: I(E), ...F }), x = (E, T) => {
  T.plugins && T.plugins.forEach(({ name: e, plugin: O }) => {
    const r = I(e, "bgMagenta");
    O({ nixleApp: E, log: r, extendRouterOptions: $, extendServiceOptions: a }), D(`🚀 ${e.trim()} plugin successfully loaded`, { type: "success" });
  });
}, EE = (E) => {
  v(E.logger || {});
  try {
    E.provider || c("Provider is required"), E.modules.length === 0 && c("At least one module is required");
  } catch (e) {
    l(e, D), process.exit(1);
  }
  W(E), E.provider.createMiddleware(({ url: e, method: O }) => {
    I(e.split("?")[0], "bgGreen")(`📫 ${H.bold(O)} Request received`, {
      type: "info"
    }), N.emit("request");
  });
  const T = {
    app: E.provider.app,
    events: {
      on: N.on,
      emit: N.emit
    },
    createRoute: E.provider.createRoute,
    createMiddleware: E.provider.createMiddleware
  };
  return E.plugins && x(T, E), D("🚀 Application successfully started", { type: "success" }), T;
}, TE = (E) => E, j = (E, T) => ({ path: E, route: T, method: "GET" }), q = (E, T) => ({ path: E, route: T, method: "POST" }), K = (E, T) => ({ path: E, route: T, method: "PATCH" }), X = (E, T) => ({ path: E, route: T, method: "PUT" }), t = (E, T) => ({ path: E, route: T, method: "DELETE" }), k = (E, T) => ({ path: E, route: T, method: "OPTIONS" }), eE = {
  get: j,
  post: q,
  patch: K,
  put: X,
  delete: t,
  options: k
}, rE = (E) => E, OE = (E, T) => ({
  name: E,
  plugin: T
});
export {
  b as StatusCode,
  EE as createApp,
  d as createError,
  TE as createModule,
  OE as createPlugin,
  rE as createProvider,
  C as createRouter,
  u as createService,
  $ as extendRouterOptions,
  V as isNixleError,
  eE as route,
  y as routerOptions
};
