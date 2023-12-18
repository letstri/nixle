import { createConsola as F } from "consola";
import { colorize as l, colors as G } from "consola/utils";
import M from "dayjs";
import { joinURL as Q } from "ufo";
import Y from "mitt";
import H from "dotenv";
var O = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(O || {});
const o = (E, _) => Object.fromEntries(Object.entries(E).filter(([T]) => !_.includes(T))), b = (E) => E !== Object(E), v = (...E) => {
  const _ = Q("", ...E), T = _.startsWith("/") ? _ : `/${_}`;
  return T.endsWith("/") ? T.slice(0, -1) : T;
}, U = Y(), y = Symbol("NixleError");
function L(E) {
  throw {
    message: typeof E == "string" ? E : E.message,
    statusCode: typeof E == "string" ? O.INTERNAL_SERVER_ERROR : E.statusCode || O.INTERNAL_SERVER_ERROR,
    time: M().format(),
    details: typeof E == "string" ? {} : E.details,
    __symbol: y
  };
}
const V = (E) => E?.__symbol === y, P = (E, _) => {
  let T = "";
  V(E) || E instanceof Error ? T = E.message : b(E) ? T = E : T = `${E.constructor.name} ${JSON.stringify(E)}`, E?.statusCode === O.INTERNAL_SERVER_ERROR ? _.fatal(l("red", T)) : _.error(l("red", T)), U.emit("error", E);
}, m = (E, _ = O.INTERNAL_SERVER_ERROR) => {
  const T = M().format(), e = b(E), r = e && _ || E.statusCode || _, I = e && E || E.message || "Internal Server Error", N = e && T || E.time || T, A = e && {} || E.details || {}, i = {
    statusCode: r,
    message: I,
    time: N,
    details: A
  };
  return E instanceof Error && (i.details = o(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
    "message",
    "name",
    "stack"
  ])), i;
}, X = (E) => {
  __NIXLE.loggerInstance = F(E);
}, R = (E, ..._) => {
  if (!__NIXLE.loggerInstance)
    return;
  const T = `${l("bgBlue", " Nixle ")}`, e = __NIXLE.loggerInstance[E];
  e || L(`Logger method "${E}" not found`), e(`${T}`, ..._);
}, f = {
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
}, g = (E, _ = "bgWhite") => Object.fromEntries(
  Object.entries(f).map(([T, e]) => [
    T,
    (...r) => e(l(_, ` ${E} `), ...r)
  ])
), h = ({ provider: E }, _, T) => {
  const e = g(_ || "/", "bgGreen");
  try {
    T.length === 0 && L("At least one router is required"), T.some(({ path: r, method: I, handler: N }) => !r || !I || !N) && L("Path, method and handler are required for each route");
  } catch (r) {
    P(r, e), process.exit(1);
  }
  T.forEach(({ path: r, method: I, options: N, handler: A }) => {
    const i = v(_, r), s = g(`${G.bold(I)} ${i}`, "bgGreen");
    E.createRoute({
      method: I.toLowerCase(),
      path: i,
      middleware(n) {
        U.emit("request", n), N?.middleware?.(n);
      },
      async handler(n) {
        try {
          await Promise.all([
            N?.queryValidation?.(n.query),
            N?.paramsValidation?.(n.params),
            N?.bodyValidation?.(n.body)
          ]);
        } catch (c) {
          return P(c, s), n.setStatusCode(c?.statusCode || O.BAD_REQUEST), m(c, O.BAD_REQUEST);
        }
        try {
          const c = await A(n);
          return U.emit("response", c), N?.statusCode && n.setStatusCode(N.statusCode), c;
        } catch (c) {
          return P(c, s), m(c);
        }
      }
    }), s.success("🚏 Successfully registered");
  });
}, B = (E) => {
  E.modules.forEach((_) => {
    _.options.routers.forEach(({ path: T, routes: e }) => {
      h(E, v(E.globalPrefix || "", T || ""), e());
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
}, p = (E, _) => D("GET", E, _), W = (E, _) => D("POST", E, _), j = (E, _) => D("PATCH", E, _), $ = (E, _) => D("PUT", E, _), w = (E, _) => D("DELETE", E, _), q = (E, _) => D("OPTIONS", E, _), x = {
  get: p,
  post: W,
  patch: j,
  put: $,
  delete: w,
  options: q
}, K = (E) => {
  __NIXLE.routerOptions = {
    ...__NIXLE.routerOptions,
    ...E
  };
};
function d(E, _) {
  typeof E == "string" && !_ && L("Missing options");
  const T = typeof E == "string" ? E : "", e = typeof E == "string" ? typeof _ == "function" ? {} : _?.services || {} : typeof E == "function" ? {} : E.services || {}, r = typeof E == "string" ? typeof _ == "function" ? _ : _.routes : typeof E == "function" ? E : E.routes, I = () => r(
    {
      route: x,
      log: T ? g(T, "bgGreen") : f,
      env: __NIXLE.env || {},
      ...__NIXLE.routerOptions
    },
    Object.entries(e).reduce(
      (N, [A, i]) => ({
        ...N,
        [A]: i(A)
      }),
      {}
    )
  );
  return typeof E == "function" ? {
    routes: I
  } : typeof E == "string" ? {
    path: T,
    routes: I,
    services: e
  } : {
    routes: I,
    services: e
  };
}
const J = (E) => {
  __NIXLE.serviceOptions = {
    ...__NIXLE.serviceOptions,
    ...E
  };
}, EE = (E) => (_) => E({ log: g(_, "bgCyan"), env: __NIXLE.env || {}, ...__NIXLE.serviceOptions }), Z = (E, _) => {
  _.plugins && _.plugins.forEach(({ name: T, plugin: e }) => {
    const r = g(T, "bgMagenta");
    e({ provider: E, log: r, extendRouterOptions: K, extendServiceOptions: J }), f.success(`🚀 ${l("bgBlue", ` ${T.trim()} `)} plugin successfully loaded`);
  });
}, z = (E) => {
  H.config(E), __NIXLE.env || (__NIXLE.env = {}), Object.keys(process.env).forEach((_) => {
    __NIXLE.env[_] = process.env[_];
  });
}, _E = (E) => {
  E.logger !== !1 && X(E.logger || {});
  try {
    E.provider || L("Provider is required"), E.modules.length === 0 && L("At least one module is required");
  } catch (T) {
    P(T, f), process.exit(1);
  }
  E.plugins && Z(E.provider, E), z(E.env), B(E), E.provider.globalMiddleware(({ setHeader: T }) => {
    T("X-Powered-By", "Nixle");
  });
  const _ = {
    app: E.provider.app,
    events: {
      on: U.on,
      emit: U.emit
    }
  };
  return f.success(`🔥 ${l("underline", "Application successfully started")}`), _;
}, TE = (E) => ({ options: E }), eE = (E) => E, rE = (E, _) => ({
  name: E,
  plugin: _
});
globalThis.__NIXLE = globalThis.__NIXLE || {};
export {
  O as StatusCode,
  _E as createApp,
  L as createError,
  TE as createModule,
  rE as createPlugin,
  eE as createProvider,
  d as createRouter,
  EE as createService,
  K as extendRouterOptions,
  V as isNixleError
};
