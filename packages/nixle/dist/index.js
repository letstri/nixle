import { createConsola as v } from "consola";
import { colorize as A, colors as Q } from "consola/utils";
import y from "dayjs";
import G, { renderers as p } from "callsite-record";
import { joinURL as V } from "ufo";
import Y from "mitt";
import H from "dotenv";
var R = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(R || {});
const B = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => !e.includes(r))), b = (E) => E !== Object(E), F = (...E) => {
  const e = V("", ...E), r = e.startsWith("/") ? e : `/${e}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, t = (E) => {
  try {
    const e = JSON.parse(E);
    return typeof e == "number" || typeof e == "boolean" || e === void 0 || e === null ? e : E;
  } catch {
    return E;
  }
}, a = (E) => Object.fromEntries(
  Object.entries(E).map(([e, r]) => [
    e,
    Array.isArray(r) ? r.map(t) : t(r)
  ])
), f = Y();
class h extends Error {
  constructor({
    statusCode: e,
    message: r,
    details: _
  }) {
    super(), this.time = y().format(), this.statusCode = R.BAD_REQUEST, this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = e, this.message = r, this.details = _;
  }
}
const X = (E) => G({
  forError: E,
  isCallsiteFrame: (r) => !!r.fileName && !r.fileName.includes("node_modules") && !r.fileName.includes("node:") && !r.fileName.includes("nixle/dist")
})?.renderSync({
  renderer: p.noColor
});
function O(E, e) {
  const r = typeof E == "string" ? E : E.message;
  throw new h({
    message: r,
    statusCode: typeof E == "string" ? e || R.BAD_REQUEST : E.statusCode || R.BAD_REQUEST,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const j = (E) => E instanceof h, P = (E, e) => {
  let r = "";
  if (j(E) || E instanceof Error ? r = E.message : b(E) ? r = E : r = `${E.constructor.name} ${JSON.stringify(E)}`, E && (!E.statusCode || E.statusCode >= R.INTERNAL_SERVER_ERROR))
    if (E instanceof Error) {
      const _ = X(E);
      e.fatal(A("red", r), ..._ ? [`
`, _] : []);
    } else
      e.fatal(A("red", r));
  else
    e.error(A("red", r));
  f.emit("error", E);
}, M = (E, e) => {
  const r = y().format(), _ = b(E), T = _ && E || E.message || "Internal Server Error", c = _ && r || E.time || r, n = _ && {} || E.details || {}, s = {
    statusCode: e,
    message: T,
    time: c,
    details: n
  };
  return s.details = {
    ...s.details,
    ...B(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
      "message",
      "name",
      "stack",
      "statusCode",
      "time",
      "details"
    ])
  }, s;
}, W = (E) => {
  __NIXLE.loggerInstance = v(E);
}, N = (E, ...e) => {
  if (!__NIXLE.loggerInstance)
    return;
  const r = `${A("bgBlue", " Nixle ")}`, _ = __NIXLE.loggerInstance[E];
  _ || O({
    message: `Logger method "${E}" not found`,
    statusCode: R.INTERNAL_SERVER_ERROR
  }), _(`${r}`, ...e);
}, D = {
  info: (...E) => N("info", ...E),
  success: (...E) => N("success", ...E),
  warn: (...E) => N("warn", ...E),
  error: (...E) => N("error", ...E),
  fatal: (...E) => N("fatal", ...E),
  debug: (...E) => N("debug", ...E),
  trace: (...E) => N("trace", ...E),
  silent: (...E) => N("silent", ...E),
  log: (...E) => N("log", ...E),
  fail: (...E) => N("fail", ...E),
  verbose: (...E) => N("verbose", ...E)
}, U = (E, e = "bgWhite") => Object.fromEntries(
  Object.entries(D).map(([r, _]) => [
    r,
    (...T) => _(A(e, ` ${E} `), ...T)
  ])
), w = ({ provider: E }, e, r) => {
  const _ = U(e || "/", "bgGreen");
  try {
    r.length === 0 && O({
      message: "At least one router is required",
      statusCode: R.INTERNAL_SERVER_ERROR
    }), r.some(({ path: T, method: c, handler: n }) => !T || !c || !n) && O({
      message: "Path, method and handler are required for each route",
      statusCode: R.INTERNAL_SERVER_ERROR
    });
  } catch (T) {
    P(T, _), process.exit(1);
  }
  r.forEach(({ path: T, method: c, options: n, handler: s }) => {
    const m = F(e, T), o = U(`${Q.bold(c)} ${m}`, "bgGreen");
    E.createRoute({
      method: c.toLowerCase(),
      path: m,
      middleware(I) {
        f.emit("request", I), n?.middleware?.(I);
      },
      async handler(I) {
        const g = {
          ...I,
          query: a(I.query),
          params: a(I.params)
        };
        try {
          await Promise.all([
            n?.queryValidation?.(g.query),
            n?.paramsValidation?.(g.params),
            n?.bodyValidation?.(g.body)
          ]);
        } catch (i) {
          const L = i?.statusCode || R.BAD_REQUEST;
          return P(i, o), I.setStatusCode(L), M(i, L);
        }
        try {
          const i = await s(g);
          return f.emit("response", i), n?.statusCode && I.setStatusCode(n.statusCode), i;
        } catch (i) {
          const L = i?.statusCode || R.INTERNAL_SERVER_ERROR;
          return P(i, o), I.setStatusCode(L), M(i, L);
        }
      }
    }), o.success("🚏 Successfully registered");
  });
}, $ = (E) => {
  E.modules.forEach((e) => {
    e.options.routers.forEach(({ path: r, routes: _ }) => {
      w(E, F(E.globalPrefix || "", r || ""), _());
    });
  });
}, l = (E, e, r) => typeof r == "function" ? {
  path: e,
  method: E,
  handler: r
} : {
  path: e,
  method: E,
  options: r,
  handler: r.handler
}, x = (E, e) => l("GET", E, e), q = (E, e) => l("POST", E, e), K = (E, e) => l("PATCH", E, e), k = (E, e) => l("PUT", E, e), J = (E, e) => l("DELETE", E, e), Z = (E, e) => l("OPTIONS", E, e), z = {
  get: x,
  post: q,
  patch: K,
  put: k,
  delete: J,
  options: Z
}, S = (E) => {
  __NIXLE.routerOptions = {
    ...__NIXLE.routerOptions,
    ...E
  };
};
function NE(E, e) {
  typeof E == "string" && !e && O({
    message: "Missing options",
    statusCode: R.INTERNAL_SERVER_ERROR
  });
  const r = typeof E == "string" ? E : "", _ = typeof E == "string" ? typeof e == "function" ? {} : e?.services || {} : typeof E == "function" ? {} : E.services || {}, T = typeof E == "string" ? typeof e == "function" ? e : e.routes : typeof E == "function" ? E : E.routes, c = () => T(
    {
      route: z,
      log: r ? U(r, "bgGreen") : D,
      env: __NIXLE.env || {},
      ...__NIXLE.routerOptions
    },
    Object.entries(_).reduce(
      (n, [s, m]) => ({
        ...n,
        [s]: m(s)
      }),
      {}
    )
  );
  return typeof E == "function" ? {
    routes: c
  } : typeof E == "string" ? {
    path: r,
    routes: c,
    services: _
  } : {
    routes: c,
    services: _
  };
}
const d = (E) => {
  __NIXLE.serviceOptions = {
    ...__NIXLE.serviceOptions,
    ...E
  };
}, cE = (E) => (e) => E({ log: U(e, "bgCyan"), env: __NIXLE.env || {}, ...__NIXLE.serviceOptions }), u = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: r, plugin: _ }) => {
    const T = U(r, "bgMagenta");
    _({ provider: E, log: T, extendRouterOptions: S, extendServiceOptions: d }), D.success(`🚀 ${A("bgBlue", ` ${r.trim()} `)} plugin successfully loaded`);
  });
}, C = (E) => {
  H.config(E), __NIXLE.env || (__NIXLE.env = {}), Object.keys(process.env).forEach((e) => {
    __NIXLE.env[e] = process.env[e];
  });
}, iE = (E) => {
  E.logger !== !1 && W(E.logger || {});
  try {
    E.provider || O({
      message: "Provider is required",
      statusCode: R.INTERNAL_SERVER_ERROR
    }), E.modules.length === 0 && O({
      message: "At least one module is required",
      statusCode: R.INTERNAL_SERVER_ERROR
    });
  } catch (r) {
    P(r, D), process.exit(1);
  }
  E.plugins && u(E.provider, E), C(E.env), $(E), E.provider.globalMiddleware(({ setHeader: r }) => {
    r("X-Powered-By", "Nixle");
  });
  const e = {
    app: E.provider.app,
    events: {
      on: f.on,
      emit: f.emit
    }
  };
  return D.success(`🔥 ${A("underline", "Application successfully started")}`), e;
}, IE = (E) => ({ options: E }), sE = (E) => E, AE = (E, e) => ({
  name: E,
  plugin: e
});
globalThis.__NIXLE = globalThis.__NIXLE || {};
export {
  R as StatusCode,
  iE as createApp,
  O as createError,
  IE as createModule,
  AE as createPlugin,
  sE as createProvider,
  NE as createRouter,
  cE as createService,
  S as extendRouterOptions,
  j as isNixleError
};
