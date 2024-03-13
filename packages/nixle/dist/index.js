import { createConsola as x } from "consola";
import { colorize as I, colors as $ } from "consola/utils";
import F from "dayjs";
import { joinURL as W } from "ufo";
import { createHooks as k } from "hookable";
import q from "dotenv";
var c = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(c || {});
const X = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => e.includes(r))), K = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => !e.includes(r))), h = (E) => E !== Object(E), u = (...E) => {
  const e = W("", ...E), r = e.startsWith("/") ? e : `/${e}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, p = (E) => {
  try {
    const e = JSON.parse(E);
    return typeof e == "number" || typeof e == "boolean" || e === void 0 || e === null ? e : E;
  } catch {
    return E;
  }
}, G = (E) => Object.fromEntries(
  Object.entries(E).map(([e, r]) => [
    e,
    Array.isArray(r) ? r.map(p) : p(r)
  ])
), m = k();
class Q extends Error {
  constructor({ statusCode: e, message: r, details: R, code: i }) {
    super(), this.time = F().format(), this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = e || c.BAD_REQUEST, this.message = r, this.details = R, this.code = i;
  }
}
const J = (E) => {
  const e = (r) => {
    let R = r;
    const i = r.match(/\((.*?)\)/g)?.[0].slice(1, -1);
    return i && (R = R.replace(i, I("underline", i))), I("dim", I("redBright", R));
  };
  return `
${E.split(`
`).slice(1).map(e).join(`
`)}`;
};
function O(E, e) {
  const r = typeof E == "string" ? E : E.message;
  return new Q({
    message: r,
    statusCode: typeof E == "string" ? e || c.BAD_REQUEST : E.statusCode || c.BAD_REQUEST,
    code: typeof E == "string" ? void 0 : E.code,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const z = (E) => E instanceof Q, L = async (E, e) => {
  let r = "";
  z(E) || E instanceof Error ? r = E.message : h(E) ? r = E : r = `${E.constructor.name} ${JSON.stringify(E)}`;
  const R = JSON.stringify(E?.details, null, 2), i = !!R && Object.keys(R).length && R !== "{}" && R, s = [I("red", r), i && I("red", i)];
  if (E && (!E.statusCode || E.statusCode >= c.INTERNAL_SERVER_ERROR)) {
    if (E instanceof Error) {
      const { stack: l } = E;
      l && (s.push(`
`), s.push(J(l)));
    }
    e.fatal(...s.filter(Boolean));
  } else
    e.error(...s.filter(Boolean));
  await m.callHook("error", E);
}, U = (E, e) => {
  const r = F().format(), R = h(E), i = {
    statusCode: e,
    message: R && E || E.message || "Internal Server Error",
    time: R && r || E.time || r,
    details: R && {} || E.details || {},
    code: R && void 0 || E.code
  }, s = JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E)));
  return i.details = {
    ...i.details,
    ...K(h(s) ? {} : s, [
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
let w;
const Z = (E) => {
  w = x(E);
}, N = (E, ...e) => {
  if (!w)
    return;
  const r = `${I("bgBlue", " Nixle ")}`, R = w[E];
  if (!R)
    throw O({
      message: `Logger method "${E}" not found`,
      statusCode: c.INTERNAL_SERVER_ERROR
    });
  R(`${r}`, ...e);
}, b = {
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
}, A = (E, e = "bgWhite") => Object.fromEntries(
  Object.entries(b).map(([r, R]) => [
    r,
    (...i) => R(I(e, ` ${E} `), ...i)
  ])
);
function y(E) {
  if (!E.startsWith("/"))
    throw O("Path must start with /", c.INTERNAL_SERVER_ERROR);
  if (E.length > 1 && E.endsWith("/"))
    throw O("Path must not end with /", c.INTERNAL_SERVER_ERROR);
}
function o(E) {
  function e(r, R) {
    return y(r), {
      path: r,
      method: E,
      options: typeof R == "function" ? { handler: R } : R,
      $infer: {}
    };
  }
  return e;
}
const S = {
  get: o("GET"),
  post: o("POST"),
  patch: o("PATCH"),
  put: o("PUT"),
  delete: o("DELETE"),
  options: o("OPTIONS")
}, D = {}, C = (E) => {
  q.config(E), Object.keys(process.env).forEach((e) => {
    D[e] = process.env[e];
  });
}, V = {};
function EE(E) {
  Object.assign(V, E);
}
function NE(E, e) {
  y(E);
  const r = typeof e == "object";
  if (!e || r && !e.routes)
    throw O("Routes are required", c.INTERNAL_SERVER_ERROR);
  const R = r ? e.routes : e, i = r ? e.middlewares || [] : [], s = r ? e.guards || [] : [];
  return {
    path: E,
    routes: () => R({
      route: S,
      log: A(E, "bgGreen"),
      env: D,
      ...V
    }),
    middlewares: i,
    guards: s,
    $inferRoutes: {}
  };
}
let H = {};
const eE = (E) => {
  Object.assign(H, E);
};
function OE(E, e) {
  return () => {
    try {
      return e({
        log: A(E.toLowerCase(), "bgCyan"),
        env: D,
        ...H
      });
    } catch (r) {
      throw O({
        message: `Oops, service "${E.toLowerCase()}" was failed`,
        statusCode: c.INTERNAL_SERVER_ERROR,
        details: r
      });
    }
  };
}
const rE = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: r, plugin: R }) => {
    const i = A(r, "bgMagenta");
    R({ provider: E, log: i, extendRouterContext: EE, extendServiceContext: eE });
  });
}, RE = (E, e) => {
  const r = u(E.globalPrefix || "", e.path || ""), R = A(r, "bgGreen"), i = e.routes();
  try {
    if (i.length === 0)
      throw O("At least one router is required", c.INTERNAL_SERVER_ERROR);
    if (i.some(({ path: s, method: l, options: f }) => !s || !l || !f.handler))
      throw O(
        "Path, method and handler are required for each route",
        c.INTERNAL_SERVER_ERROR
      );
  } catch (s) {
    L(s, R), process.exit(1);
  }
  i.forEach(function({ path: l, method: f, options: t }) {
    const d = u(r, l), M = A(`${$.bold(f)} ${d}`, "bgGreen");
    E.provider.createRoute({
      method: f.toLowerCase(),
      path: d,
      async handler(a) {
        const g = {}, B = (n) => n ? g[n] || null : g, Y = (n, T) => {
          g[n] = T;
        }, _ = {
          ...a,
          query: G(a.query),
          params: G(a.params),
          headers: Object.fromEntries(
            Object.entries(a.headers).filter(([, n]) => typeof n == "string").map(([n, T]) => [n.toLowerCase(), T])
          ),
          env: D,
          getData: B,
          setData: Y
        };
        await m.callHook("request", a);
        try {
          t?.middlewares?.length && await Promise.all(
            t.middlewares.map(function(T) {
              return T(_);
            })
          ), e?.middlewares?.length && await Promise.all(
            e.middlewares.map(function(T) {
              return T(_);
            })
          ), t?.middlewares?.length && await Promise.all(
            t.middlewares.map(function(T) {
              return T(_);
            })
          );
        } catch (n) {
          await L(n, M);
          const T = n?.statusCode || c.INTERNAL_SERVER_ERROR;
          return a.setStatusCode(T), U(n, T);
        }
        try {
          e.guards.length && await Promise.all(
            e.guards.map(function(P) {
              return P(_);
            })
          ), t?.guards?.length && await Promise.all(
            t.guards.map(function(P) {
              return P(_);
            })
          );
          const [n, T, j] = await Promise.all([
            t?.queryValidation?.(_.query),
            t?.paramsValidation?.(_.params),
            t?.bodyValidation?.(_.body)
          ]);
          _.query = n || _.query, _.params = T || _.params, _.body = j || _.body;
        } catch (n) {
          const T = n?.statusCode || c.BAD_REQUEST;
          return a.setStatusCode(T), U(n, T);
        }
        try {
          const n = await t.handler(_);
          return await m.callHook("response", n), t?.statusCode && a.setStatusCode(t.statusCode), n;
        } catch (n) {
          await L(n, M);
          const T = n?.statusCode || c.INTERNAL_SERVER_ERROR;
          return a.setStatusCode(T), U(n, T);
        }
      }
    });
  });
};
function nE(E, e) {
  return async (r) => {
    try {
      await e({ ...r, log: A(E.toLowerCase(), "bgYellowBright") });
    } catch (R) {
      throw O({
        message: R?.message || `Oops, middleware "${E.toLowerCase()}" was failed`,
        statusCode: R?.statusCode || c.INTERNAL_SERVER_ERROR,
        details: R?.details
      });
    }
  };
}
function aE(E) {
  E.globalPrefix && y(E.globalPrefix), E.logger !== !1 && Z(E.logger || {});
  try {
    if (!E.provider)
      throw O("Provider is required", c.INTERNAL_SERVER_ERROR);
    if (E.routers.length === 0)
      throw O("At least one router is required", c.INTERNAL_SERVER_ERROR);
  } catch (r) {
    L(r, b), process.exit(1);
  }
  E.plugins && rE(E.provider, E), E.middlewares = [
    nE("nixle-global-middleware", ({ setHeader: r }) => {
      r("X-Powered-By", "Nixle");
    }),
    ...E.middlewares || []
  ], C(E.env), E.routers.forEach((r) => {
    RE(E, r);
  });
  const e = {
    app: E.provider.app,
    hooks: X(m, ["afterEach", "beforeEach", "callHook", "hook", "hookOnce"]),
    $inferRouters: {}
  };
  return b.success("🔥 Application successfully started"), e;
}
function lE(E, e) {
  return async (r) => {
    try {
      await e({ ...r, log: A(E.toLowerCase(), "bgGreenBright") });
    } catch (R) {
      throw O({
        message: R?.message || `Oops, guard "${E.toLowerCase()}" was failed`,
        statusCode: R?.statusCode || c.BAD_REQUEST,
        details: R?.details
      });
    }
  };
}
function IE(E) {
  return E;
}
const AE = (E, e) => ({
  name: E,
  plugin: e
});
export {
  c as StatusCode,
  aE as createApp,
  O as createError,
  lE as createGuard,
  nE as createMiddleware,
  AE as createPlugin,
  IE as createProvider,
  NE as createRouter,
  OE as createService,
  EE as extendRouterContext,
  eE as extendServiceContext,
  z as isNixleError
};
