import { createConsola as Q } from "consola";
import { colorize as O, colors as G } from "consola/utils";
import b from "dayjs";
import { joinURL as V } from "ufo";
import p from "mitt";
import Y from "dotenv";
var r = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(r || {});
const H = (E, e) => Object.fromEntries(Object.entries(E).filter(([_]) => !e.includes(_))), a = (E) => E !== Object(E), F = (...E) => {
  const e = V("", ...E), _ = e.startsWith("/") ? e : `/${e}`;
  return _.endsWith("/") ? _.slice(0, -1) : _;
}, t = (E) => {
  try {
    const e = JSON.parse(E);
    return typeof e == "number" || typeof e == "boolean" || e === void 0 || e === null ? e : E;
  } catch {
    return E;
  }
}, M = (E) => Object.fromEntries(
  Object.entries(E).map(([e, _]) => [
    e,
    Array.isArray(_) ? _.map(t) : t(_)
  ])
), U = p();
class h extends Error {
  constructor({
    statusCode: e,
    message: _,
    details: T
  }) {
    super(), this.time = b().format(), this.statusCode = r.BAD_REQUEST, this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = e, this.message = _, this.details = T;
  }
}
function l(E) {
  const e = typeof E == "string" ? E : E.message;
  throw new h({
    message: e,
    statusCode: typeof E == "string" ? r.BAD_REQUEST : E.statusCode || r.BAD_REQUEST,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const v = (E) => E instanceof h, P = (E, e) => {
  let _ = "";
  v(E) || E instanceof Error ? _ = E.message : a(E) ? _ = E : _ = `${E.constructor.name} ${JSON.stringify(E)}`, E && (!E.statusCode || E.statusCode === r.INTERNAL_SERVER_ERROR) ? e.fatal(O("red", _), E.stack) : e.error(O("red", _)), U.emit("error", E);
}, y = (E, e = r.INTERNAL_SERVER_ERROR) => {
  const _ = b().format(), T = a(E), R = T && e || E.statusCode || e, I = T && E || E.message || "Internal Server Error", N = T && _ || E.time || _, A = T && {} || E.details || {}, s = {
    statusCode: R,
    message: I,
    time: N,
    details: A
  };
  return s.details = {
    ...s.details,
    ...H(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
      "message",
      "name",
      "stack",
      "statusCode",
      "time",
      "details"
    ])
  }, s;
}, B = (E) => {
  __NIXLE.loggerInstance = Q(E);
}, c = (E, ...e) => {
  if (!__NIXLE.loggerInstance)
    return;
  const _ = `${O("bgBlue", " Nixle ")}`, T = __NIXLE.loggerInstance[E];
  T || l({
    message: `Logger method "${E}" not found`,
    statusCode: r.INTERNAL_SERVER_ERROR
  }), T(`${_}`, ...e);
}, f = {
  info: (...E) => c("info", ...E),
  success: (...E) => c("success", ...E),
  warn: (...E) => c("warn", ...E),
  error: (...E) => c("error", ...E),
  fatal: (...E) => c("fatal", ...E),
  debug: (...E) => c("debug", ...E),
  trace: (...E) => c("trace", ...E),
  silent: (...E) => c("silent", ...E),
  log: (...E) => c("log", ...E),
  fail: (...E) => c("fail", ...E),
  verbose: (...E) => c("verbose", ...E)
}, g = (E, e = "bgWhite") => Object.fromEntries(
  Object.entries(f).map(([_, T]) => [
    _,
    (...R) => T(O(e, ` ${E} `), ...R)
  ])
), X = ({ provider: E }, e, _) => {
  const T = g(e || "/", "bgGreen");
  try {
    _.length === 0 && l({
      message: "At least one router is required",
      statusCode: r.INTERNAL_SERVER_ERROR
    }), _.some(({ path: R, method: I, handler: N }) => !R || !I || !N) && l({
      message: "Path, method and handler are required for each route",
      statusCode: r.INTERNAL_SERVER_ERROR
    });
  } catch (R) {
    P(R, T), process.exit(1);
  }
  _.forEach(({ path: R, method: I, options: N, handler: A }) => {
    const s = F(e, R), o = g(`${G.bold(I)} ${s}`, "bgGreen");
    E.createRoute({
      method: I.toLowerCase(),
      path: s,
      middleware(i) {
        U.emit("request", i), N?.middleware?.(i);
      },
      async handler(i) {
        const m = {
          ...i,
          query: M(i.query),
          params: M(i.params)
        };
        try {
          await Promise.all([
            N?.queryValidation?.(m.query),
            N?.paramsValidation?.(m.params),
            N?.bodyValidation?.(m.body)
          ]);
        } catch (n) {
          const D = n?.statusCode || r.BAD_REQUEST;
          return P(n, o), i.setStatusCode(D), y(n, D);
        }
        try {
          const n = await A(m);
          return U.emit("response", n), N?.statusCode && i.setStatusCode(N.statusCode), n;
        } catch (n) {
          const D = v(n) ? n.statusCode : n?.statusCode || r.INTERNAL_SERVER_ERROR;
          return P(n, o), i.setStatusCode(D), y(n, D);
        }
      }
    }), o.success("🚏 Successfully registered");
  });
}, j = (E) => {
  E.modules.forEach((e) => {
    e.options.routers.forEach(({ path: _, routes: T }) => {
      X(E, F(E.globalPrefix || "", _ || ""), T());
    });
  });
}, L = (E, e, _) => typeof _ == "function" ? {
  path: e,
  method: E,
  handler: _
} : {
  path: e,
  method: E,
  options: _,
  handler: _.handler
}, W = (E, e) => L("GET", E, e), w = (E, e) => L("POST", E, e), $ = (E, e) => L("PATCH", E, e), q = (E, e) => L("PUT", E, e), x = (E, e) => L("DELETE", E, e), K = (E, e) => L("OPTIONS", E, e), J = {
  get: W,
  post: w,
  patch: $,
  put: q,
  delete: x,
  options: K
}, k = (E) => {
  __NIXLE.routerOptions = {
    ...__NIXLE.routerOptions,
    ...E
  };
};
function TE(E, e) {
  typeof E == "string" && !e && l({
    message: "Missing options",
    statusCode: r.INTERNAL_SERVER_ERROR
  });
  const _ = typeof E == "string" ? E : "", T = typeof E == "string" ? typeof e == "function" ? {} : e?.services || {} : typeof E == "function" ? {} : E.services || {}, R = typeof E == "string" ? typeof e == "function" ? e : e.routes : typeof E == "function" ? E : E.routes, I = () => R(
    {
      route: J,
      log: _ ? g(_, "bgGreen") : f,
      env: __NIXLE.env || {},
      ...__NIXLE.routerOptions
    },
    Object.entries(T).reduce(
      (N, [A, s]) => ({
        ...N,
        [A]: s(A)
      }),
      {}
    )
  );
  return typeof E == "function" ? {
    routes: I
  } : typeof E == "string" ? {
    path: _,
    routes: I,
    services: T
  } : {
    routes: I,
    services: T
  };
}
const Z = (E) => {
  __NIXLE.serviceOptions = {
    ...__NIXLE.serviceOptions,
    ...E
  };
}, rE = (E) => (e) => E({ log: g(e, "bgCyan"), env: __NIXLE.env || {}, ...__NIXLE.serviceOptions }), z = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: _, plugin: T }) => {
    const R = g(_, "bgMagenta");
    T({ provider: E, log: R, extendRouterOptions: k, extendServiceOptions: Z }), f.success(`🚀 ${O("bgBlue", ` ${_.trim()} `)} plugin successfully loaded`);
  });
}, S = (E) => {
  Y.config(E), __NIXLE.env || (__NIXLE.env = {}), Object.keys(process.env).forEach((e) => {
    __NIXLE.env[e] = process.env[e];
  });
}, RE = (E) => {
  E.logger !== !1 && B(E.logger || {});
  try {
    E.provider || l({
      message: "Provider is required",
      statusCode: r.INTERNAL_SERVER_ERROR
    }), E.modules.length === 0 && l({
      message: "At least one module is required",
      statusCode: r.INTERNAL_SERVER_ERROR
    });
  } catch (_) {
    P(_, f), process.exit(1);
  }
  E.plugins && z(E.provider, E), S(E.env), j(E), E.provider.globalMiddleware(({ setHeader: _ }) => {
    _("X-Powered-By", "Nixle");
  });
  const e = {
    app: E.provider.app,
    events: {
      on: U.on,
      emit: U.emit
    }
  };
  return f.success(`🔥 ${O("underline", "Application successfully started")}`), e;
}, NE = (E) => ({ options: E }), nE = (E) => E, cE = (E, e) => ({
  name: E,
  plugin: e
});
globalThis.__NIXLE = globalThis.__NIXLE || {};
export {
  r as StatusCode,
  RE as createApp,
  l as createError,
  NE as createModule,
  cE as createPlugin,
  nE as createProvider,
  TE as createRouter,
  rE as createService,
  k as extendRouterOptions,
  v as isNixleError
};
