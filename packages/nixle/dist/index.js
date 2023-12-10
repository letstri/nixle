import { colorize as L, colors as Q } from "consola/utils";
import { createConsola as Y } from "consola";
import M from "dayjs";
import b from "mitt";
var D = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(D || {});
const h = "YYYY-MM-DD HH:mm:ss", w = (E, T) => Object.fromEntries(Object.entries(E).filter(([e]) => !T.includes(e))), p = (E) => E !== Object(E), n = b();
class i extends Error {
  constructor({
    message: T,
    statusCode: e,
    isInternal: O = !1,
    ...r
  }) {
    super(T), this.time = M().format(h), this.statusCode = D.BAD_REQUEST, this.isInternal = !1, this.details = {}, this.name = "NixleError", this.statusCode = e || D.BAD_REQUEST, Object.assign(this, r);
  }
}
function A(E) {
  throw typeof E == "string" ? new i({ message: E, isInternal: !0 }) : new i({ ...E, isInternal: !0 });
}
function d(E) {
  throw typeof E == "string" ? new i({ message: E }) : new i(E);
}
const V = (E) => E instanceof i, l = (E, T) => {
  let e = "";
  V(E) ? e = E.isInternal && E.stack || E.message : E instanceof Error ? e = E.stack || E.message : p(E) ? e = E : e = `${E.constructor.name} ${JSON.stringify(E)}`, T(L("red", e), { type: "error" }), n.emit("error", E);
}, g = (E, T = D.INTERNAL_SERVER_ERROR) => {
  const e = ["name", "stack", "message", "statusCode", "time", "isInternal"], O = M().format(h), r = p(E) ? {
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
let y;
const B = (E) => {
  y = Y(E);
}, U = (E, T) => {
  const e = T?.type || "log", O = `${L("bgBlue", " Nixle ")}`, r = y?.[e || "log"];
  r || A(`Logger method "${e}" not found`), r(`${O}`, ...Array.isArray(E) ? E : [E]);
}, I = (E, T = "bgWhite") => (e, O) => U(
  [L(T, ` ${E} `), ...Array.isArray(e) ? e : [e]],
  O
), P = (E) => {
  const T = E.startsWith("/") ? E : `/${E}`;
  return T.endsWith("/") ? T.slice(0, -1) : T;
}, v = (E, T, e) => {
  const O = I(T, "bgGreen");
  try {
    e.length === 0 && A("At least one router is required"), e.some(
      ({ path: r, method: s, route: R }) => !r || !s || !(typeof R == "function" ? R : R.handler)
    ) && A("Path and handler are required for each route");
  } catch (r) {
    l(r, O), process.exit(1);
  }
  e.forEach(({ path: r, method: s, route: R }) => {
    const G = T + P(r), m = typeof R == "function" ? void 0 : R.statusCode, c = typeof R == "function" ? void 0 : R, H = typeof R == "function" ? R : R.handler;
    E.provider.createRoute({
      method: s.toLowerCase(),
      path: G,
      middleware: c?.middleware,
      handler: async (N) => {
        n.emit("request", N), N.setHeader("x-powered-by", "Nixle");
        const f = I(N.url, "bgGreen");
        try {
          await Promise.all([
            c?.queryValidation?.(N.query),
            c?.paramsValidation?.(N.params),
            c?.bodyValidation?.(N.body)
          ]);
        } catch (_) {
          throw l(
            _ instanceof Error ? new i({ message: `${_.name}: ${_.message}` }) : _,
            f
          ), g(_, 400);
        }
        m && N.setStatusCode(m);
        try {
          const _ = await H(N);
          return n.emit("response", _), _;
        } catch (_) {
          throw l(_, f), g(_);
        }
      }
    });
  }), O(`🚏 ${e.length} route${e.length === 1 ? "" : "s"} successfully built`, {
    type: "success"
  });
}, W = (E) => {
  E.modules.forEach((T) => {
    T.routers.forEach(([e, O]) => {
      const r = E.globalPrefix ? P(E.globalPrefix) : "";
      v(E, r + P(e), O);
    });
  });
}, F = {}, $ = (E) => {
  Object.assign(F, E);
}, C = (E, T) => [E, T({ log: I(E, "bgGreen"), ...F })], o = {}, a = (E) => {
  Object.assign(o, E);
}, u = (E, T) => T({ log: I(E), ...o }), x = (E, T) => {
  T.plugins && T.plugins.forEach(({ name: e, plugin: O }) => {
    const r = I(e, "bgMagenta");
    O({ nixleApp: E, log: r, extendRouterOptions: $, extendServiceOptions: a }), U(`🚀 ${e.trim()} plugin successfully loaded`, { type: "success" });
  });
}, EE = (E) => {
  B(E.logger || {});
  try {
    E.provider || A("Provider is required"), E.modules.length === 0 && A("At least one module is required");
  } catch (e) {
    l(e, U), process.exit(1);
  }
  W(E), E.provider.createMiddleware(({ url: e, method: O }) => {
    I(e.split("?")[0], "bgGreen")(`📫 ${Q.bold(O)} Request received`, {
      type: "info"
    }), n.emit("request");
  });
  const T = {
    app: E.provider.app,
    events: {
      on: n.on,
      emit: n.emit
    },
    createRoute: E.provider.createRoute,
    createMiddleware: E.provider.createMiddleware
  };
  return E.plugins && x(T, E), U("🚀 Application successfully started", { type: "success" }), T;
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
  D as StatusCode,
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
  F as routerOptions
};
