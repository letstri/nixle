import { createConsola as v } from "consola";
import { colorize as O, colors as Q } from "consola/utils";
import b from "dayjs";
import { joinURL as G } from "ufo";
import V from "mitt";
import p from "dotenv";
var R = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(R || {});
const Y = (E, e) => Object.fromEntries(Object.entries(E).filter(([_]) => !e.includes(_))), F = (E) => E !== Object(E), a = (...E) => {
  const e = G("", ...E), _ = e.startsWith("/") ? e : `/${e}`;
  return _.endsWith("/") ? _.slice(0, -1) : _;
}, M = (E) => {
  try {
    const e = JSON.parse(E);
    return typeof e == "number" || typeof e == "boolean" || e === void 0 || e === null ? e : E;
  } catch {
    return E;
  }
}, t = (E) => Object.fromEntries(
  Object.entries(E).map(([e, _]) => [
    e,
    Array.isArray(_) ? _.map(M) : M(_)
  ])
), D = V();
class h extends Error {
  constructor({
    statusCode: e,
    message: _,
    details: T
  }) {
    super(), this.time = b().format(), this.statusCode = R.BAD_REQUEST, this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = e, this.message = _, this.details = T;
  }
}
function s(E, e) {
  const _ = typeof E == "string" ? E : E.message;
  throw new h({
    message: _,
    statusCode: typeof E == "string" ? e || R.BAD_REQUEST : E.statusCode || R.BAD_REQUEST,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const H = (E) => E instanceof h, P = (E, e) => {
  let _ = "";
  H(E) || E instanceof Error ? _ = E.message : F(E) ? _ = E : _ = `${E.constructor.name} ${JSON.stringify(E)}`, E && (!E.statusCode || E.statusCode === R.INTERNAL_SERVER_ERROR) ? e.fatal(O("red", _), E.stack) : e.error(O("red", _)), D.emit("error", E);
}, y = (E, e) => {
  const _ = b().format(), T = F(E), r = T && E || E.message || "Internal Server Error", c = T && _ || E.time || _, N = T && {} || E.details || {}, A = {
    statusCode: e,
    message: r,
    time: c,
    details: N
  };
  return A.details = {
    ...A.details,
    ...Y(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
      "message",
      "name",
      "stack",
      "statusCode",
      "time",
      "details"
    ])
  }, A;
}, B = (E) => {
  __NIXLE.loggerInstance = v(E);
}, n = (E, ...e) => {
  if (!__NIXLE.loggerInstance)
    return;
  const _ = `${O("bgBlue", " Nixle ")}`, T = __NIXLE.loggerInstance[E];
  T || s({
    message: `Logger method "${E}" not found`,
    statusCode: R.INTERNAL_SERVER_ERROR
  }), T(`${_}`, ...e);
}, U = {
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
}, f = (E, e = "bgWhite") => Object.fromEntries(
  Object.entries(U).map(([_, T]) => [
    _,
    (...r) => T(O(e, ` ${E} `), ...r)
  ])
), X = ({ provider: E }, e, _) => {
  const T = f(e || "/", "bgGreen");
  try {
    _.length === 0 && s({
      message: "At least one router is required",
      statusCode: R.INTERNAL_SERVER_ERROR
    }), _.some(({ path: r, method: c, handler: N }) => !r || !c || !N) && s({
      message: "Path, method and handler are required for each route",
      statusCode: R.INTERNAL_SERVER_ERROR
    });
  } catch (r) {
    P(r, T), process.exit(1);
  }
  _.forEach(({ path: r, method: c, options: N, handler: A }) => {
    const g = a(e, r), o = f(`${Q.bold(c)} ${g}`, "bgGreen");
    E.createRoute({
      method: c.toLowerCase(),
      path: g,
      middleware(i) {
        D.emit("request", i), N?.middleware?.(i);
      },
      async handler(i) {
        const m = {
          ...i,
          query: t(i.query),
          params: t(i.params)
        };
        try {
          await Promise.all([
            N?.queryValidation?.(m.query),
            N?.paramsValidation?.(m.params),
            N?.bodyValidation?.(m.body)
          ]);
        } catch (I) {
          const L = I?.statusCode || R.BAD_REQUEST;
          return P(I, o), i.setStatusCode(L), y(I, L);
        }
        try {
          const I = await A(m);
          return D.emit("response", I), N?.statusCode && i.setStatusCode(N.statusCode), I;
        } catch (I) {
          const L = I?.statusCode || R.INTERNAL_SERVER_ERROR;
          return P(I, o), i.setStatusCode(L), y(I, L);
        }
      }
    }), o.success("🚏 Successfully registered");
  });
}, j = (E) => {
  E.modules.forEach((e) => {
    e.options.routers.forEach(({ path: _, routes: T }) => {
      X(E, a(E.globalPrefix || "", _ || ""), T());
    });
  });
}, l = (E, e, _) => typeof _ == "function" ? {
  path: e,
  method: E,
  handler: _
} : {
  path: e,
  method: E,
  options: _,
  handler: _.handler
}, W = (E, e) => l("GET", E, e), w = (E, e) => l("POST", E, e), $ = (E, e) => l("PATCH", E, e), q = (E, e) => l("PUT", E, e), x = (E, e) => l("DELETE", E, e), K = (E, e) => l("OPTIONS", E, e), J = {
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
  typeof E == "string" && !e && s({
    message: "Missing options",
    statusCode: R.INTERNAL_SERVER_ERROR
  });
  const _ = typeof E == "string" ? E : "", T = typeof E == "string" ? typeof e == "function" ? {} : e?.services || {} : typeof E == "function" ? {} : E.services || {}, r = typeof E == "string" ? typeof e == "function" ? e : e.routes : typeof E == "function" ? E : E.routes, c = () => r(
    {
      route: J,
      log: _ ? f(_, "bgGreen") : U,
      env: __NIXLE.env || {},
      ...__NIXLE.routerOptions
    },
    Object.entries(T).reduce(
      (N, [A, g]) => ({
        ...N,
        [A]: g(A)
      }),
      {}
    )
  );
  return typeof E == "function" ? {
    routes: c
  } : typeof E == "string" ? {
    path: _,
    routes: c,
    services: T
  } : {
    routes: c,
    services: T
  };
}
const Z = (E) => {
  __NIXLE.serviceOptions = {
    ...__NIXLE.serviceOptions,
    ...E
  };
}, rE = (E) => (e) => E({ log: f(e, "bgCyan"), env: __NIXLE.env || {}, ...__NIXLE.serviceOptions }), z = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: _, plugin: T }) => {
    const r = f(_, "bgMagenta");
    T({ provider: E, log: r, extendRouterOptions: k, extendServiceOptions: Z }), U.success(`🚀 ${O("bgBlue", ` ${_.trim()} `)} plugin successfully loaded`);
  });
}, S = (E) => {
  p.config(E), __NIXLE.env || (__NIXLE.env = {}), Object.keys(process.env).forEach((e) => {
    __NIXLE.env[e] = process.env[e];
  });
}, RE = (E) => {
  E.logger !== !1 && B(E.logger || {});
  try {
    E.provider || s({
      message: "Provider is required",
      statusCode: R.INTERNAL_SERVER_ERROR
    }), E.modules.length === 0 && s({
      message: "At least one module is required",
      statusCode: R.INTERNAL_SERVER_ERROR
    });
  } catch (_) {
    P(_, U), process.exit(1);
  }
  E.plugins && z(E.provider, E), S(E.env), j(E), E.provider.globalMiddleware(({ setHeader: _ }) => {
    _("X-Powered-By", "Nixle");
  });
  const e = {
    app: E.provider.app,
    events: {
      on: D.on,
      emit: D.emit
    }
  };
  return U.success(`🔥 ${O("underline", "Application successfully started")}`), e;
}, NE = (E) => ({ options: E }), nE = (E) => E, cE = (E, e) => ({
  name: E,
  plugin: e
});
globalThis.__NIXLE = globalThis.__NIXLE || {};
export {
  R as StatusCode,
  RE as createApp,
  s as createError,
  NE as createModule,
  cE as createPlugin,
  nE as createProvider,
  TE as createRouter,
  rE as createService,
  k as extendRouterOptions,
  H as isNixleError
};
