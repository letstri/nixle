import { createConsola as G } from "consola";
import { colorize as s, colors as Y } from "consola/utils";
import b from "dayjs";
import { joinURL as p } from "ufo";
import V from "mitt";
import H from "dotenv";
var c = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(c || {});
const X = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => !e.includes(r))), F = (E) => E !== Object(E), v = (...E) => {
  const e = p("", ...E), r = e.startsWith("/") ? e : `/${e}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, M = (E) => {
  try {
    const e = JSON.parse(E);
    return typeof e == "number" || typeof e == "boolean" || e === void 0 || e === null ? e : E;
  } catch {
    return E;
  }
}, o = (E) => Object.fromEntries(
  Object.entries(E).map(([e, r]) => [
    e,
    Array.isArray(r) ? r.map(M) : M(r)
  ])
), D = V();
class Q extends Error {
  constructor({
    statusCode: e,
    message: r,
    details: _
  }) {
    super(), this.time = b().format(), this.statusCode = c.INTERNAL_SERVER_ERROR, this.message = "Internal Server Error", this.name = "NixleError", this.statusCode = e, this.message = r, this.details = _;
  }
}
function l(E) {
  const e = typeof E == "string" ? E : E.message;
  throw new Q({
    message: e,
    statusCode: typeof E == "string" ? c.INTERNAL_SERVER_ERROR : E.statusCode || c.INTERNAL_SERVER_ERROR,
    details: typeof E == "string" ? {} : E.details
  });
}
const h = (E) => E instanceof Q, P = (E, e) => {
  let r = "";
  h(E) || E instanceof Error ? r = E.message : F(E) ? r = E : r = `${E.constructor.name} ${JSON.stringify(E)}`, E?.statusCode === c.INTERNAL_SERVER_ERROR ? e.fatal(s("red", r)) : e.error(s("red", r)), D.emit("error", E);
}, y = (E, e = c.INTERNAL_SERVER_ERROR) => {
  const r = b().format(), _ = F(E), T = _ && e || E.statusCode || e, I = _ && E || E.message || "Internal Server Error", N = _ && r || E.time || r, A = _ && {} || E.details || {}, O = {
    statusCode: T,
    message: I,
    time: N,
    details: A
  };
  return E instanceof Error && (O.details = X(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
    "message",
    "name",
    "stack"
  ])), O;
}, B = (E) => {
  __NIXLE.loggerInstance = G(E);
}, n = (E, ...e) => {
  if (!__NIXLE.loggerInstance)
    return;
  const r = `${s("bgBlue", " Nixle ")}`, _ = __NIXLE.loggerInstance[E];
  _ || l(`Logger method "${E}" not found`), _(`${r}`, ...e);
}, f = {
  info: (...E) => n("info", ...E),
  success: (...E) => n("success", ...E),
  warn: (...E) => n("warn", ...E),
  error: (...E) => n("error", ...E),
  fatal: (...E) => n("fatal", ...E),
  debug: (...E) => n("debug", ...E),
  trace: (...E) => n("trace", ...E),
  silent: (...E) => n("silent", ...E),
  log: (...E) => n("log", ...E),
  fail: (...E) => n("fail", ...E),
  verbose: (...E) => n("verbose", ...E)
}, U = (E, e = "bgWhite") => Object.fromEntries(
  Object.entries(f).map(([r, _]) => [
    r,
    (...T) => _(s(e, ` ${E} `), ...T)
  ])
), a = ({ provider: E }, e, r) => {
  const _ = U(e || "/", "bgGreen");
  try {
    r.length === 0 && l("At least one router is required"), r.some(({ path: T, method: I, handler: N }) => !T || !I || !N) && l("Path, method and handler are required for each route");
  } catch (T) {
    P(T, _), process.exit(1);
  }
  r.forEach(({ path: T, method: I, options: N, handler: A }) => {
    const O = v(e, T), m = U(`${Y.bold(I)} ${O}`, "bgGreen");
    E.createRoute({
      method: I.toLowerCase(),
      path: O,
      middleware(i) {
        D.emit("request", i), N?.middleware?.(i);
      },
      async handler(i) {
        const g = {
          ...i,
          query: o(i.query),
          params: o(i.params)
        };
        try {
          await Promise.all([
            N?.queryValidation?.(g.query),
            N?.paramsValidation?.(g.params),
            N?.bodyValidation?.(g.body)
          ]);
        } catch (R) {
          return P(R, m), i.setStatusCode(R?.statusCode || c.BAD_REQUEST), y(R, c.BAD_REQUEST);
        }
        try {
          const R = await A(g);
          return D.emit("response", R), N?.statusCode && i.setStatusCode(N.statusCode), R;
        } catch (R) {
          return P(R, m), i.setStatusCode(
            R?.statusCode || h(R) ? c.BAD_REQUEST : c.INTERNAL_SERVER_ERROR
          ), y(R);
        }
      }
    }), m.success("🚏 Successfully registered");
  });
}, j = (E) => {
  E.modules.forEach((e) => {
    e.options.routers.forEach(({ path: r, routes: _ }) => {
      a(E, v(E.globalPrefix || "", r || ""), _());
    });
  });
}, L = (E, e, r) => typeof r == "function" ? {
  path: e,
  method: E,
  handler: r
} : {
  path: e,
  method: E,
  options: r,
  handler: r.handler
}, t = (E, e) => L("GET", E, e), W = (E, e) => L("POST", E, e), w = (E, e) => L("PATCH", E, e), $ = (E, e) => L("PUT", E, e), q = (E, e) => L("DELETE", E, e), x = (E, e) => L("OPTIONS", E, e), K = {
  get: t,
  post: W,
  patch: w,
  put: $,
  delete: q,
  options: x
}, J = (E) => {
  __NIXLE.routerOptions = {
    ...__NIXLE.routerOptions,
    ...E
  };
};
function rE(E, e) {
  typeof E == "string" && !e && l("Missing options");
  const r = typeof E == "string" ? E : "", _ = typeof E == "string" ? typeof e == "function" ? {} : e?.services || {} : typeof E == "function" ? {} : E.services || {}, T = typeof E == "string" ? typeof e == "function" ? e : e.routes : typeof E == "function" ? E : E.routes, I = () => T(
    {
      route: K,
      log: r ? U(r, "bgGreen") : f,
      env: __NIXLE.env || {},
      ...__NIXLE.routerOptions
    },
    Object.entries(_).reduce(
      (N, [A, O]) => ({
        ...N,
        [A]: O(A)
      }),
      {}
    )
  );
  return typeof E == "function" ? {
    routes: I
  } : typeof E == "string" ? {
    path: r,
    routes: I,
    services: _
  } : {
    routes: I,
    services: _
  };
}
const Z = (E) => {
  __NIXLE.serviceOptions = {
    ...__NIXLE.serviceOptions,
    ...E
  };
}, _E = (E) => (e) => E({ log: U(e, "bgCyan"), env: __NIXLE.env || {}, ...__NIXLE.serviceOptions }), z = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: r, plugin: _ }) => {
    const T = U(r, "bgMagenta");
    _({ provider: E, log: T, extendRouterOptions: J, extendServiceOptions: Z }), f.success(`🚀 ${s("bgBlue", ` ${r.trim()} `)} plugin successfully loaded`);
  });
}, k = (E) => {
  H.config(E), __NIXLE.env || (__NIXLE.env = {}), Object.keys(process.env).forEach((e) => {
    __NIXLE.env[e] = process.env[e];
  });
}, TE = (E) => {
  E.logger !== !1 && B(E.logger || {});
  try {
    E.provider || l("Provider is required"), E.modules.length === 0 && l("At least one module is required");
  } catch (r) {
    P(r, f), process.exit(1);
  }
  E.plugins && z(E.provider, E), k(E.env), j(E), E.provider.globalMiddleware(({ setHeader: r }) => {
    r("X-Powered-By", "Nixle");
  });
  const e = {
    app: E.provider.app,
    events: {
      on: D.on,
      emit: D.emit
    }
  };
  return f.success(`🔥 ${s("underline", "Application successfully started")}`), e;
}, NE = (E) => ({ options: E }), RE = (E) => E, nE = (E, e) => ({
  name: E,
  plugin: e
});
globalThis.__NIXLE = globalThis.__NIXLE || {};
export {
  c as StatusCode,
  TE as createApp,
  l as createError,
  NE as createModule,
  nE as createPlugin,
  RE as createProvider,
  rE as createRouter,
  _E as createService,
  J as extendRouterOptions,
  h as isNixleError
};
