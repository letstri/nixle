import { createConsola as Y } from "consola";
import { colorize as s, colors as p } from "consola/utils";
import F from "dayjs";
import { joinURL as B } from "ufo";
import H from "mitt";
import V from "dotenv";
var I = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(I || {});
const X = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => !e.includes(r))), Q = (E) => E !== Object(E), v = (...E) => {
  const e = B("", ...E), r = e.startsWith("/") ? e : `/${e}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, o = (E) => {
  try {
    const e = JSON.parse(E);
    return typeof e == "number" || typeof e == "boolean" || e === void 0 || e === null ? e : E;
  } catch {
    return E;
  }
}, y = (E) => Object.fromEntries(
  Object.entries(E).map(([e, r]) => [
    e,
    Array.isArray(r) ? r.map(o) : o(r)
  ])
), D = H();
class h extends Error {
  constructor({
    statusCode: e,
    message: r,
    details: T
  }) {
    super(), this.time = F().format(), this.statusCode = I.INTERNAL_SERVER_ERROR, this.message = "Internal Server Error", this.name = "NixleError", this.statusCode = e, this.message = r, this.details = T;
  }
}
function l(E) {
  const e = typeof E == "string" ? E : E.message;
  throw new h({
    message: e,
    statusCode: typeof E == "string" ? I.BAD_REQUEST : E.statusCode || I.BAD_REQUEST,
    details: typeof E == "string" ? {} : E.details
  });
}
const G = (E) => E instanceof h, P = (E, e) => {
  let r = "";
  G(E) || E instanceof Error ? r = E.message : Q(E) ? r = E : r = `${E.constructor.name} ${JSON.stringify(E)}`, E?.statusCode === I.INTERNAL_SERVER_ERROR ? e.fatal(s("red", r)) : e.error(s("red", r)), D.emit("error", E);
}, b = (E, e = I.INTERNAL_SERVER_ERROR) => {
  const r = F().format(), T = Q(E), _ = T && e || E.statusCode || e, c = T && E || E.message || "Internal Server Error", N = T && r || E.time || r, A = T && {} || E.details || {}, O = {
    statusCode: _,
    message: c,
    time: N,
    details: A
  };
  return E instanceof Error && (O.details = X(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
    "message",
    "name",
    "stack"
  ])), O;
}, a = (E) => {
  __NIXLE.loggerInstance = Y(E);
}, R = (E, ...e) => {
  if (!__NIXLE.loggerInstance)
    return;
  const r = `${s("bgBlue", " Nixle ")}`, T = __NIXLE.loggerInstance[E];
  T || l(`Logger method "${E}" not found`), T(`${r}`, ...e);
}, U = {
  info: (...E) => R("info", ...E),
  success: (...E) => R("success", ...E),
  warn: (...E) => R("warn", ...E),
  error: (...E) => R("error", ...E),
  fatal: (...E) => R("fatal", ...E),
  debug: (...E) => R("debug", ...E),
  trace: (...E) => R("trace", ...E),
  silent: (...E) => R("silent", ...E),
  log: (...E) => R("log", ...E),
  fail: (...E) => R("fail", ...E),
  verbose: (...E) => R("verbose", ...E)
}, f = (E, e = "bgWhite") => Object.fromEntries(
  Object.entries(U).map(([r, T]) => [
    r,
    (..._) => T(s(e, ` ${E} `), ..._)
  ])
), t = ({ provider: E }, e, r) => {
  const T = f(e || "/", "bgGreen");
  try {
    r.length === 0 && l("At least one router is required"), r.some(({ path: _, method: c, handler: N }) => !_ || !c || !N) && l("Path, method and handler are required for each route");
  } catch (_) {
    P(_, T), process.exit(1);
  }
  r.forEach(({ path: _, method: c, options: N, handler: A }) => {
    const O = v(e, _), m = f(`${p.bold(c)} ${O}`, "bgGreen");
    E.createRoute({
      method: c.toLowerCase(),
      path: O,
      middleware(i) {
        D.emit("request", i), N?.middleware?.(i);
      },
      async handler(i) {
        const g = {
          ...i,
          query: y(i.query),
          params: y(i.params)
        };
        try {
          await Promise.all([
            N?.queryValidation?.(g.query),
            N?.paramsValidation?.(g.params),
            N?.bodyValidation?.(g.body)
          ]);
        } catch (n) {
          return P(n, m), i.setStatusCode(n?.statusCode || I.BAD_REQUEST), b(n, I.BAD_REQUEST);
        }
        try {
          const n = await A(g);
          return D.emit("response", n), N?.statusCode && i.setStatusCode(N.statusCode), n;
        } catch (n) {
          const M = n?.statusCode || G(n) ? I.BAD_REQUEST : I.INTERNAL_SERVER_ERROR;
          return P(n, m), i.setStatusCode(M), b(n, M);
        }
      }
    }), m.success("🚏 Successfully registered");
  });
}, j = (E) => {
  E.modules.forEach((e) => {
    e.options.routers.forEach(({ path: r, routes: T }) => {
      t(E, v(E.globalPrefix || "", r || ""), T());
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
}, W = (E, e) => L("GET", E, e), w = (E, e) => L("POST", E, e), $ = (E, e) => L("PATCH", E, e), q = (E, e) => L("PUT", E, e), x = (E, e) => L("DELETE", E, e), K = (E, e) => L("OPTIONS", E, e), J = {
  get: W,
  post: w,
  patch: $,
  put: q,
  delete: x,
  options: K
}, Z = (E) => {
  __NIXLE.routerOptions = {
    ...__NIXLE.routerOptions,
    ...E
  };
};
function TE(E, e) {
  typeof E == "string" && !e && l("Missing options");
  const r = typeof E == "string" ? E : "", T = typeof E == "string" ? typeof e == "function" ? {} : e?.services || {} : typeof E == "function" ? {} : E.services || {}, _ = typeof E == "string" ? typeof e == "function" ? e : e.routes : typeof E == "function" ? E : E.routes, c = () => _(
    {
      route: J,
      log: r ? f(r, "bgGreen") : U,
      env: __NIXLE.env || {},
      ...__NIXLE.routerOptions
    },
    Object.entries(T).reduce(
      (N, [A, O]) => ({
        ...N,
        [A]: O(A)
      }),
      {}
    )
  );
  return typeof E == "function" ? {
    routes: c
  } : typeof E == "string" ? {
    path: r,
    routes: c,
    services: T
  } : {
    routes: c,
    services: T
  };
}
const z = (E) => {
  __NIXLE.serviceOptions = {
    ...__NIXLE.serviceOptions,
    ...E
  };
}, _E = (E) => (e) => E({ log: f(e, "bgCyan"), env: __NIXLE.env || {}, ...__NIXLE.serviceOptions }), k = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: r, plugin: T }) => {
    const _ = f(r, "bgMagenta");
    T({ provider: E, log: _, extendRouterOptions: Z, extendServiceOptions: z }), U.success(`🚀 ${s("bgBlue", ` ${r.trim()} `)} plugin successfully loaded`);
  });
}, S = (E) => {
  V.config(E), __NIXLE.env || (__NIXLE.env = {}), Object.keys(process.env).forEach((e) => {
    __NIXLE.env[e] = process.env[e];
  });
}, NE = (E) => {
  E.logger !== !1 && a(E.logger || {});
  try {
    E.provider || l("Provider is required"), E.modules.length === 0 && l("At least one module is required");
  } catch (r) {
    P(r, U), process.exit(1);
  }
  E.plugins && k(E.provider, E), S(E.env), j(E), E.provider.globalMiddleware(({ setHeader: r }) => {
    r("X-Powered-By", "Nixle");
  });
  const e = {
    app: E.provider.app,
    events: {
      on: D.on,
      emit: D.emit
    }
  };
  return U.success(`🔥 ${s("underline", "Application successfully started")}`), e;
}, nE = (E) => ({ options: E }), RE = (E) => E, cE = (E, e) => ({
  name: E,
  plugin: e
});
globalThis.__NIXLE = globalThis.__NIXLE || {};
export {
  I as StatusCode,
  NE as createApp,
  l as createError,
  nE as createModule,
  cE as createPlugin,
  RE as createProvider,
  TE as createRouter,
  _E as createService,
  Z as extendRouterOptions,
  G as isNixleError
};
