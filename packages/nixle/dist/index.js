import { createConsola as Q } from "consola";
import { colorize as l, colors as Y } from "consola/utils";
import o from "dayjs";
import { joinURL as p } from "ufo";
import H from "mitt";
import h from "dotenv";
var O = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(O || {});
const V = (E, _) => Object.fromEntries(Object.entries(E).filter(([T]) => !_.includes(T))), F = (E) => E !== Object(E), v = (...E) => {
  const _ = p("", ...E), T = _.startsWith("/") ? _ : `/${_}`;
  return T.endsWith("/") ? T.slice(0, -1) : T;
}, y = (E) => {
  try {
    const _ = JSON.parse(E);
    return typeof _ == "number" || typeof _ == "boolean" || _ === void 0 || _ === null ? _ : E;
  } catch {
    return E;
  }
}, M = (E) => Object.fromEntries(
  Object.entries(E).map(([_, T]) => [
    _,
    Array.isArray(T) ? T.map(y) : y(T)
  ])
), f = H(), G = Symbol("NixleError");
function L(E) {
  throw {
    message: typeof E == "string" ? E : E.message,
    statusCode: typeof E == "string" ? O.INTERNAL_SERVER_ERROR : E.statusCode || O.INTERNAL_SERVER_ERROR,
    time: o().format(),
    details: typeof E == "string" ? {} : E.details,
    __symbol: G
  };
}
const X = (E) => E?.__symbol === G, P = (E, _) => {
  let T = "";
  X(E) || E instanceof Error ? T = E.message : F(E) ? T = E : T = `${E.constructor.name} ${JSON.stringify(E)}`, E?.statusCode === O.INTERNAL_SERVER_ERROR ? _.fatal(l("red", T)) : _.error(l("red", T)), f.emit("error", E);
}, b = (E, _ = O.INTERNAL_SERVER_ERROR) => {
  const T = o().format(), r = F(E), e = r && _ || E.statusCode || _, R = r && E || E.message || "Internal Server Error", N = r && T || E.time || T, A = r && {} || E.details || {}, i = {
    statusCode: e,
    message: R,
    time: N,
    details: A
  };
  return E instanceof Error && (i.details = V(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
    "message",
    "name",
    "stack"
  ])), i;
}, B = (E) => {
  __NIXLE.loggerInstance = Q(E);
}, n = (E, ..._) => {
  if (!__NIXLE.loggerInstance)
    return;
  const T = `${l("bgBlue", " Nixle ")}`, r = __NIXLE.loggerInstance[E];
  r || L(`Logger method "${E}" not found`), r(`${T}`, ..._);
}, s = {
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
}, U = (E, _ = "bgWhite") => Object.fromEntries(
  Object.entries(s).map(([T, r]) => [
    T,
    (...e) => r(l(_, ` ${E} `), ...e)
  ])
), j = ({ provider: E }, _, T) => {
  const r = U(_ || "/", "bgGreen");
  try {
    T.length === 0 && L("At least one router is required"), T.some(({ path: e, method: R, handler: N }) => !e || !R || !N) && L("Path, method and handler are required for each route");
  } catch (e) {
    P(e, r), process.exit(1);
  }
  T.forEach(({ path: e, method: R, options: N, handler: A }) => {
    const i = v(_, e), m = U(`${Y.bold(R)} ${i}`, "bgGreen");
    E.createRoute({
      method: R.toLowerCase(),
      path: i,
      middleware(I) {
        f.emit("request", I), N?.middleware?.(I);
      },
      async handler(I) {
        const g = {
          ...I,
          query: M(I.query),
          params: M(I.params),
          body: M(I.body)
        };
        try {
          await Promise.all([
            N?.queryValidation?.(g.query),
            N?.paramsValidation?.(g.params),
            N?.bodyValidation?.(g.body)
          ]);
        } catch (c) {
          return P(c, m), I.setStatusCode(c?.statusCode || O.BAD_REQUEST), b(c, O.BAD_REQUEST);
        }
        try {
          const c = await A(g);
          return f.emit("response", c), N?.statusCode && I.setStatusCode(N.statusCode), c;
        } catch (c) {
          return P(c, m), b(c);
        }
      }
    }), m.success("🚏 Successfully registered");
  });
}, W = (E) => {
  E.modules.forEach((_) => {
    _.options.routers.forEach(({ path: T, routes: r }) => {
      j(E, v(E.globalPrefix || "", T || ""), r());
    });
  });
}, D = (E, _, T) => typeof T == "function" ? {
  path: _,
  method: E,
  handler: T
} : {
  path: _,
  method: E,
  options: T,
  handler: T.handler
}, $ = (E, _) => D("GET", E, _), w = (E, _) => D("POST", E, _), a = (E, _) => D("PATCH", E, _), q = (E, _) => D("PUT", E, _), x = (E, _) => D("DELETE", E, _), K = (E, _) => D("OPTIONS", E, _), J = {
  get: $,
  post: w,
  patch: a,
  put: q,
  delete: x,
  options: K
}, Z = (E) => {
  __NIXLE.routerOptions = {
    ...__NIXLE.routerOptions,
    ...E
  };
};
function TE(E, _) {
  typeof E == "string" && !_ && L("Missing options");
  const T = typeof E == "string" ? E : "", r = typeof E == "string" ? typeof _ == "function" ? {} : _?.services || {} : typeof E == "function" ? {} : E.services || {}, e = typeof E == "string" ? typeof _ == "function" ? _ : _.routes : typeof E == "function" ? E : E.routes, R = () => e(
    {
      route: J,
      log: T ? U(T, "bgGreen") : s,
      env: __NIXLE.env || {},
      ...__NIXLE.routerOptions
    },
    Object.entries(r).reduce(
      (N, [A, i]) => ({
        ...N,
        [A]: i(A)
      }),
      {}
    )
  );
  return typeof E == "function" ? {
    routes: R
  } : typeof E == "string" ? {
    path: T,
    routes: R,
    services: r
  } : {
    routes: R,
    services: r
  };
}
const z = (E) => {
  __NIXLE.serviceOptions = {
    ...__NIXLE.serviceOptions,
    ...E
  };
}, rE = (E) => (_) => E({ log: U(_, "bgCyan"), env: __NIXLE.env || {}, ...__NIXLE.serviceOptions }), k = (E, _) => {
  _.plugins && _.plugins.forEach(({ name: T, plugin: r }) => {
    const e = U(T, "bgMagenta");
    r({ provider: E, log: e, extendRouterOptions: Z, extendServiceOptions: z }), s.success(`🚀 ${l("bgBlue", ` ${T.trim()} `)} plugin successfully loaded`);
  });
}, t = (E) => {
  h.config(E), __NIXLE.env || (__NIXLE.env = {}), Object.keys(process.env).forEach((_) => {
    __NIXLE.env[_] = process.env[_];
  });
}, eE = (E) => {
  E.logger !== !1 && B(E.logger || {});
  try {
    E.provider || L("Provider is required"), E.modules.length === 0 && L("At least one module is required");
  } catch (T) {
    P(T, s), process.exit(1);
  }
  E.plugins && k(E.provider, E), t(E.env), W(E), E.provider.globalMiddleware(({ setHeader: T }) => {
    T("X-Powered-By", "Nixle");
  });
  const _ = {
    app: E.provider.app,
    events: {
      on: f.on,
      emit: f.emit
    }
  };
  return s.success(`🔥 ${l("underline", "Application successfully started")}`), _;
}, NE = (E) => ({ options: E }), nE = (E) => E, RE = (E, _) => ({
  name: E,
  plugin: _
});
globalThis.__NIXLE = globalThis.__NIXLE || {};
export {
  O as StatusCode,
  eE as createApp,
  L as createError,
  NE as createModule,
  RE as createPlugin,
  nE as createProvider,
  TE as createRouter,
  rE as createService,
  Z as extendRouterOptions,
  X as isNixleError
};
