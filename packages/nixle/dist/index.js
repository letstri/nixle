import { createConsola as $ } from "consola";
import { colorize as I, colors as W } from "consola/utils";
import Q from "dayjs";
import { joinURL as q } from "ufo";
import { createHooks as k } from "hookable";
import X from "dotenv";
var c = /* @__PURE__ */ ((e) => (e[e.CONTINUE = 100] = "CONTINUE", e[e.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", e[e.PROCESSING = 102] = "PROCESSING", e[e.EARLY_HINTS = 103] = "EARLY_HINTS", e[e.OK = 200] = "OK", e[e.CREATED = 201] = "CREATED", e[e.ACCEPTED = 202] = "ACCEPTED", e[e.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", e[e.NO_CONTENT = 204] = "NO_CONTENT", e[e.RESET_CONTENT = 205] = "RESET_CONTENT", e[e.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", e[e.MULTI_STATUS = 207] = "MULTI_STATUS", e[e.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", e[e.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", e[e.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", e[e.SEE_OTHER = 303] = "SEE_OTHER", e[e.NOT_MODIFIED = 304] = "NOT_MODIFIED", e[e.USE_PROXY = 305] = "USE_PROXY", e[e.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", e[e.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", e[e.BAD_REQUEST = 400] = "BAD_REQUEST", e[e.UNAUTHORIZED = 401] = "UNAUTHORIZED", e[e.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", e[e.FORBIDDEN = 403] = "FORBIDDEN", e[e.NOT_FOUND = 404] = "NOT_FOUND", e[e.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", e[e.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", e[e.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", e[e.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", e[e.CONFLICT = 409] = "CONFLICT", e[e.GONE = 410] = "GONE", e[e.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", e[e.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", e[e.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", e[e.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", e[e.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", e[e.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", e[e.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", e[e.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", e[e.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", e[e.METHOD_FAILURE = 420] = "METHOD_FAILURE", e[e.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", e[e.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", e[e.LOCKED = 423] = "LOCKED", e[e.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", e[e.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", e[e.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", e[e.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", e[e.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", e[e.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", e[e.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", e[e.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", e[e.BAD_GATEWAY = 502] = "BAD_GATEWAY", e[e.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", e[e.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", e[e.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", e[e.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", e[e.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", e))(c || {});
const K = (e, E) => Object.fromEntries(Object.entries(e).filter(([r]) => E.includes(r))), J = (e, E) => Object.fromEntries(Object.entries(e).filter(([r]) => !E.includes(r))), U = (e) => e !== Object(e), G = (...e) => {
  const E = q("", ...e), r = E.startsWith("/") ? E : `/${E}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, v = (e) => {
  try {
    const E = JSON.parse(e);
    return typeof E == "number" || typeof E == "boolean" || E === void 0 || E === null ? E : e;
  } catch {
    return e;
  }
}, F = (e) => Object.fromEntries(
  Object.entries(e).map(([E, r]) => [
    E,
    Array.isArray(r) ? r.map(v) : v(r)
  ])
), g = k();
class V extends Error {
  constructor({ statusCode: E, message: r, details: R, code: i }) {
    super(), this.time = Q().format(), this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = E || c.BAD_REQUEST, this.message = r, this.details = R, this.code = i;
  }
}
const z = (e) => {
  const E = (r) => {
    let R = r;
    const i = r.match(/\((.*?)\)/g)?.[0].slice(1, -1);
    return i && (R = R.replace(i, I("underline", i))), I("dim", I("redBright", R));
  };
  return `
${e.split(`
`).slice(1).map(E).join(`
`)}`;
};
function t(e, E) {
  const r = typeof e == "string" ? e : e.message;
  return new V({
    message: r,
    statusCode: typeof e == "string" ? E || c.BAD_REQUEST : e.statusCode || c.BAD_REQUEST,
    code: typeof e == "string" ? void 0 : e.code,
    details: typeof e == "string" ? {} : e.details || {}
  });
}
const Z = (e) => e instanceof V, m = async (e, E) => {
  let r = "";
  Z(e) || e instanceof Error ? r = e.message : U(e) ? r = e : r = `${e.constructor.name} ${JSON.stringify(e)}`;
  const R = JSON.stringify(e?.details, null, 2), i = !!R && Object.keys(R).length && R !== "{}" && R, _ = [I("red", r), i && I("red", i)];
  if (e && (!e.statusCode || e.statusCode >= c.INTERNAL_SERVER_ERROR)) {
    if (e instanceof Error) {
      const { stack: a } = e;
      a && (_.push(`
`), _.push(z(a)));
    }
    E.fatal(..._.filter(Boolean));
  } else
    E.error(..._.filter(Boolean));
  await g.callHook("error", e);
}, P = (e, E) => {
  const r = Q().format(), R = U(e), i = {
    statusCode: E,
    message: R && e || e.message || "Internal Server Error",
    time: R && r || e.time || r,
    details: R && {} || e.details || {},
    code: R && void 0 || e.code
  }, _ = JSON.parse(JSON.stringify(e, Object.getOwnPropertyNames(e)));
  return i.details = {
    ...i.details,
    ...J(U(_) ? {} : _, [
      "message",
      "name",
      "stack",
      "statusCode",
      "time",
      "details",
      "code"
    ])
  }, i;
};
let h;
const S = (e) => {
  h = $(e);
}, N = (e, ...E) => {
  if (!h)
    return;
  const r = `${I("bgBlue", " Nixle ")}`, R = h[e];
  if (!R)
    throw t({
      message: `Logger method "${e}" not found`,
      statusCode: c.INTERNAL_SERVER_ERROR
    });
  R(`${r}`, ...E);
}, w = {
  info: (...e) => N("info", ...e),
  success: (...e) => N("success", ...e),
  warn: (...e) => N("warn", ...e),
  error: (...e) => N("error", ...e),
  fatal: (...e) => N("fatal", ...e),
  debug: (...e) => N("debug", ...e),
  trace: (...e) => N("trace", ...e),
  silent: (...e) => N("silent", ...e),
  log: (...e) => N("log", ...e),
  fail: (...e) => N("fail", ...e),
  verbose: (...e) => N("verbose", ...e)
}, A = (e, E = "bgWhite") => Object.fromEntries(
  Object.entries(w).map(([r, R]) => [
    r,
    (...i) => R(I(E, ` ${e} `), ...i)
  ])
);
function d(e) {
  if (!e.startsWith("/"))
    throw t("Path must start with /", c.INTERNAL_SERVER_ERROR);
  if (e.length > 1 && e.endsWith("/"))
    throw t("Path must not end with /", c.INTERNAL_SERVER_ERROR);
}
function o(e) {
  function E(r, R) {
    return d(r), {
      path: r,
      method: e,
      options: typeof R == "function" ? { handler: R } : R,
      $infer: {}
    };
  }
  return E;
}
const C = {
  get: o("GET"),
  post: o("POST"),
  patch: o("PATCH"),
  put: o("PUT"),
  delete: o("DELETE"),
  options: o("OPTIONS")
}, b = {}, y = () => ({
  get: (e) => b[e],
  getOrThrow(e) {
    const E = b[e];
    if (E === void 0)
      throw t(`Env variable "${e}" is required`, c.INTERNAL_SERVER_ERROR);
    return E;
  }
}), ee = (e) => {
  X.config(e), Object.keys(process.env).forEach((E) => {
    b[E] = process.env[E];
  });
}, p = {};
function Ee(e) {
  Object.assign(p, e);
}
function Oe(e, E) {
  d(e);
  const r = typeof E == "object";
  if (!E || r && !E.routes)
    throw t("Routes are required", c.INTERNAL_SERVER_ERROR);
  const R = r ? E.routes : E, i = r ? E.middlewares || [] : [], _ = r ? E.guards || [] : [];
  return {
    path: e,
    routes: () => R({
      route: C,
      log: A(e, "bgGreen"),
      env: y(),
      ...p
    }),
    middlewares: i,
    guards: _,
    $inferRoutes: {}
  };
}
let H = {};
const re = (e) => {
  Object.assign(H, e);
};
function le(e, E) {
  return () => {
    try {
      return E({
        log: A(e.toLowerCase(), "bgCyan"),
        env: y(),
        ...H
      });
    } catch (r) {
      throw t({
        message: `Oops, service "${e.toLowerCase()}" was failed`,
        statusCode: c.INTERNAL_SERVER_ERROR,
        details: r
      });
    }
  };
}
const Re = (e, E) => {
  E.plugins && E.plugins.forEach(({ name: r, plugin: R }) => {
    const i = A(r, "bgMagenta");
    R({ provider: e, log: i, extendRouterContext: Ee, extendServiceContext: re });
  });
}, ne = (e, E) => {
  const r = G(e.globalPrefix || "", E.path || ""), R = A(r, "bgGreen"), i = E.routes();
  try {
    if (i.length === 0)
      throw t("At least one router is required", c.INTERNAL_SERVER_ERROR);
    if (i.some(({ path: _, method: a, options: f }) => !_ || !a || !f.handler))
      throw t(
        "Path, method and handler are required for each route",
        c.INTERNAL_SERVER_ERROR
      );
  } catch (_) {
    m(_, R), process.exit(1);
  }
  i.forEach(function({ path: a, method: f, options: O }) {
    const u = G(r, a), M = A(`${W.bold(f)} ${u}`, "bgGreen");
    e.provider.createRoute({
      method: f.toLowerCase(),
      path: u,
      async handler(l) {
        const L = {}, B = (n) => n ? L[n] || null : L, Y = (n, T) => {
          typeof n == "string" ? L[n] = T : Object.assign(L, n);
        }, s = {
          ...l,
          query: F(l.query),
          params: F(l.params),
          headers: Object.fromEntries(
            Object.entries(l.headers).filter(([, n]) => typeof n == "string").map(([n, T]) => [n.toLowerCase(), T])
          ),
          env: y(),
          getData: B,
          setData: Y
        };
        await g.callHook("request", l);
        try {
          e?.middlewares?.length && await Promise.all(
            e.middlewares.map(function(T) {
              return T(s);
            })
          ), E?.middlewares?.length && await Promise.all(
            E.middlewares.map(function(T) {
              return T(s);
            })
          ), O?.middlewares?.length && await Promise.all(
            O.middlewares.map(function(T) {
              return T(s);
            })
          );
        } catch (n) {
          await m(n, M);
          const T = n?.statusCode || c.INTERNAL_SERVER_ERROR;
          return l.setStatusCode(T), P(n, T);
        }
        try {
          E.guards.length && await Promise.all(
            E.guards.map(function(D) {
              return D(s);
            })
          ), O?.guards?.length && await Promise.all(
            O.guards.map(function(D) {
              return D(s);
            })
          );
          const [n, T, j] = await Promise.all([
            O?.queryValidation?.(s.query),
            O?.paramsValidation?.(s.params),
            O?.bodyValidation?.(s.body)
          ]);
          s.query = n || s.query, s.params = T || s.params, s.body = j || s.body;
        } catch (n) {
          const T = n?.statusCode || c.BAD_REQUEST;
          return l.setStatusCode(T), P(n, T);
        }
        try {
          const n = await O.handler(s);
          return await g.callHook("response", n), O?.statusCode && l.setStatusCode(O.statusCode), n;
        } catch (n) {
          await m(n, M);
          const T = n?.statusCode || c.INTERNAL_SERVER_ERROR;
          return l.setStatusCode(T), P(n, T);
        }
      }
    });
  });
};
function ie(e, E) {
  return async (r) => {
    try {
      await E({ ...r, log: A(e.toLowerCase(), "bgYellowBright") });
    } catch (R) {
      throw t({
        message: R?.message || `Oops, middleware "${e.toLowerCase()}" was failed`,
        statusCode: R?.statusCode || c.INTERNAL_SERVER_ERROR,
        details: R?.details
      });
    }
  };
}
function ae(e) {
  e.globalPrefix && d(e.globalPrefix), e.logger !== !1 && S(e.logger || {});
  try {
    if (!e.provider)
      throw t("Provider is required", c.INTERNAL_SERVER_ERROR);
    if (e.routers.length === 0)
      throw t("At least one router is required", c.INTERNAL_SERVER_ERROR);
  } catch (r) {
    m(r, w), process.exit(1);
  }
  e.env && ee(e.env), e.plugins && Re(e.provider, e), e.middlewares = [
    ie("nixle-global-middleware", ({ setHeader: r }) => {
      r("X-Powered-By", "Nixle");
    }),
    ...e.middlewares || []
  ], e.routers.forEach((r) => {
    ne(e, r);
  });
  const E = {
    app: e.provider.app,
    hooks: K(g, ["afterEach", "beforeEach", "callHook", "hook", "hookOnce"]),
    $inferRouters: {}
  };
  return w.success("🔥 Application successfully started"), E;
}
function Ie(e, E) {
  return async (r) => {
    try {
      await E({ ...r, log: A(e.toLowerCase(), "bgGreenBright") });
    } catch (R) {
      throw t({
        message: R?.message || `Oops, guard "${e.toLowerCase()}" was failed`,
        statusCode: R?.statusCode || c.BAD_REQUEST,
        details: R?.details
      });
    }
  };
}
function Ae(e) {
  return e;
}
const oe = (e, E) => ({
  name: e,
  plugin: E
});
export {
  c as StatusCode,
  ae as createApp,
  t as createError,
  Ie as createGuard,
  ie as createMiddleware,
  oe as createPlugin,
  Ae as createProvider,
  Oe as createRouter,
  le as createService,
  Ee as extendRouterContext,
  re as extendServiceContext,
  Z as isNixleError
};
