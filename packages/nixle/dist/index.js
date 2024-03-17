import { createConsola as x } from "consola";
import { colorize as I, colors as $ } from "consola/utils";
import Q from "dayjs";
import { joinURL as W } from "ufo";
import { createHooks as q } from "hookable";
import k from "dotenv";
var c = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(c || {});
const X = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => e.includes(r))), K = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => !e.includes(r))), h = (E) => E !== Object(E), u = (...E) => {
  const e = W("", ...E), r = e.startsWith("/") ? e : `/${e}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, G = (E) => {
  try {
    const e = JSON.parse(E);
    return typeof e == "number" || typeof e == "boolean" || e === void 0 || e === null ? e : E;
  } catch {
    return E;
  }
}, F = (E) => Object.fromEntries(
  Object.entries(E).map(([e, r]) => [
    e,
    Array.isArray(r) ? r.map(G) : G(r)
  ])
), D = q();
class V extends Error {
  constructor({ statusCode: e, message: r, details: R, code: n }) {
    super(), this.time = Q().format(), this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = e || c.BAD_REQUEST, this.message = r, this.details = R, this.code = n;
  }
}
const J = (E) => {
  const e = (r) => {
    let R = r;
    const n = r.match(/\((.*?)\)/g)?.[0].slice(1, -1);
    return n && (R = R.replace(n, I("underline", n))), I("dim", I("redBright", R));
  };
  return `
${E.split(`
`).slice(1).map(e).join(`
`)}`;
};
function N(E, e) {
  const r = typeof E == "string" ? E : E.message;
  return new V({
    message: r,
    statusCode: typeof E == "string" ? e || c.BAD_REQUEST : E.statusCode || c.BAD_REQUEST,
    code: typeof E == "string" ? void 0 : E.code,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const z = (E) => E instanceof V, m = async (E, e) => {
  let r = "";
  z(E) || E instanceof Error ? r = E.message : h(E) ? r = E : r = `${E.constructor.name} ${JSON.stringify(E)}`;
  const R = JSON.stringify(E?.details, null, 2), n = !!R && Object.keys(R).length && R !== "{}" && R, _ = [I("red", r), n && I("red", n)];
  if (E && (!E.statusCode || E.statusCode >= c.INTERNAL_SERVER_ERROR)) {
    if (E instanceof Error) {
      const { stack: a } = E;
      a && (_.push(`
`), _.push(J(a)));
    }
    e.fatal(..._.filter(Boolean));
  } else
    e.error(..._.filter(Boolean));
  await D.callHook("error", E);
}, U = (E, e) => {
  const r = Q().format(), R = h(E), n = {
    statusCode: e,
    message: R && E || E.message || "Internal Server Error",
    time: R && r || E.time || r,
    details: R && {} || E.details || {},
    code: R && void 0 || E.code
  }, _ = JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E)));
  return n.details = {
    ...n.details,
    ...K(h(_) ? {} : _, [
      "message",
      "name",
      "stack",
      "statusCode",
      "time",
      "details",
      "code"
    ])
  }, n;
};
let w;
const Z = (E) => {
  w = x(E);
}, t = (E, ...e) => {
  if (!w)
    return;
  const r = `${I("bgBlue", " Nixle ")}`, R = w[E];
  if (!R)
    throw N({
      message: `Logger method "${E}" not found`,
      statusCode: c.INTERNAL_SERVER_ERROR
    });
  R(`${r}`, ...e);
}, b = {
  info: (...E) => t("info", ...E),
  success: (...E) => t("success", ...E),
  warn: (...E) => t("warn", ...E),
  error: (...E) => t("error", ...E),
  fatal: (...E) => t("fatal", ...E),
  debug: (...E) => t("debug", ...E),
  trace: (...E) => t("trace", ...E),
  silent: (...E) => t("silent", ...E),
  log: (...E) => t("log", ...E),
  fail: (...E) => t("fail", ...E),
  verbose: (...E) => t("verbose", ...E)
}, A = (E, e = "bgWhite") => Object.fromEntries(
  Object.entries(b).map(([r, R]) => [
    r,
    (...n) => R(I(e, ` ${E} `), ...n)
  ])
);
function y(E) {
  if (!E.startsWith("/"))
    throw N("Path must start with /", c.INTERNAL_SERVER_ERROR);
  if (E.length > 1 && E.endsWith("/"))
    throw N("Path must not end with /", c.INTERNAL_SERVER_ERROR);
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
}, g = {}, C = (E) => {
  k.config(E), Object.keys(process.env).forEach((e) => {
    g[e] = process.env[e];
  });
}, p = {};
function EE(E) {
  Object.assign(p, E);
}
function NE(E, e) {
  y(E);
  const r = typeof e == "object";
  if (!e || r && !e.routes)
    throw N("Routes are required", c.INTERNAL_SERVER_ERROR);
  const R = r ? e.routes : e, n = r ? e.middlewares || [] : [], _ = r ? e.guards || [] : [];
  return {
    path: E,
    routes: () => R({
      route: S,
      log: A(E, "bgGreen"),
      env: g,
      ...p
    }),
    middlewares: n,
    guards: _,
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
        env: g,
        ...H
      });
    } catch (r) {
      throw N({
        message: `Oops, service "${E.toLowerCase()}" was failed`,
        statusCode: c.INTERNAL_SERVER_ERROR,
        details: r
      });
    }
  };
}
const rE = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: r, plugin: R }) => {
    const n = A(r, "bgMagenta");
    R({ provider: E, log: n, extendRouterContext: EE, extendServiceContext: eE });
  });
}, RE = (E, e) => {
  const r = u(E.globalPrefix || "", e.path || ""), R = A(r, "bgGreen"), n = e.routes();
  try {
    if (n.length === 0)
      throw N("At least one router is required", c.INTERNAL_SERVER_ERROR);
    if (n.some(({ path: _, method: a, options: f }) => !_ || !a || !f.handler))
      throw N(
        "Path, method and handler are required for each route",
        c.INTERNAL_SERVER_ERROR
      );
  } catch (_) {
    m(_, R), process.exit(1);
  }
  n.forEach(function({ path: a, method: f, options: O }) {
    const d = u(r, a), M = A(`${$.bold(f)} ${d}`, "bgGreen");
    E.provider.createRoute({
      method: f.toLowerCase(),
      path: d,
      async handler(l) {
        const L = {}, B = (i) => i ? L[i] || null : L, Y = (i, T) => {
          typeof i == "string" ? L[i] = T : Object.assign(L, i);
        }, s = {
          ...l,
          query: F(l.query),
          params: F(l.params),
          headers: Object.fromEntries(
            Object.entries(l.headers).filter(([, i]) => typeof i == "string").map(([i, T]) => [i.toLowerCase(), T])
          ),
          env: g,
          getData: B,
          setData: Y
        };
        await D.callHook("request", l);
        try {
          E?.middlewares?.length && await Promise.all(
            E.middlewares.map(function(T) {
              return T(s);
            })
          ), e?.middlewares?.length && await Promise.all(
            e.middlewares.map(function(T) {
              return T(s);
            })
          ), O?.middlewares?.length && await Promise.all(
            O.middlewares.map(function(T) {
              return T(s);
            })
          );
        } catch (i) {
          await m(i, M);
          const T = i?.statusCode || c.INTERNAL_SERVER_ERROR;
          return l.setStatusCode(T), U(i, T);
        }
        try {
          e.guards.length && await Promise.all(
            e.guards.map(function(P) {
              return P(s);
            })
          ), O?.guards?.length && await Promise.all(
            O.guards.map(function(P) {
              return P(s);
            })
          );
          const [i, T, j] = await Promise.all([
            O?.queryValidation?.(s.query),
            O?.paramsValidation?.(s.params),
            O?.bodyValidation?.(s.body)
          ]);
          s.query = i || s.query, s.params = T || s.params, s.body = j || s.body;
        } catch (i) {
          const T = i?.statusCode || c.BAD_REQUEST;
          return l.setStatusCode(T), U(i, T);
        }
        try {
          const i = await O.handler(s);
          return await D.callHook("response", i), O?.statusCode && l.setStatusCode(O.statusCode), i;
        } catch (i) {
          await m(i, M);
          const T = i?.statusCode || c.INTERNAL_SERVER_ERROR;
          return l.setStatusCode(T), U(i, T);
        }
      }
    });
  });
};
function iE(E, e) {
  return async (r) => {
    try {
      await e({ ...r, log: A(E.toLowerCase(), "bgYellowBright") });
    } catch (R) {
      throw N({
        message: R?.message || `Oops, middleware "${E.toLowerCase()}" was failed`,
        statusCode: R?.statusCode || c.INTERNAL_SERVER_ERROR,
        details: R?.details
      });
    }
  };
}
function lE(E) {
  E.globalPrefix && y(E.globalPrefix), E.logger !== !1 && Z(E.logger || {});
  try {
    if (!E.provider)
      throw N("Provider is required", c.INTERNAL_SERVER_ERROR);
    if (E.routers.length === 0)
      throw N("At least one router is required", c.INTERNAL_SERVER_ERROR);
  } catch (r) {
    m(r, b), process.exit(1);
  }
  E.plugins && rE(E.provider, E), E.middlewares = [
    iE("nixle-global-middleware", ({ setHeader: r }) => {
      r("X-Powered-By", "Nixle");
    }),
    ...E.middlewares || []
  ], C(E.env), E.routers.forEach((r) => {
    RE(E, r);
  });
  const e = {
    app: E.provider.app,
    hooks: X(D, ["afterEach", "beforeEach", "callHook", "hook", "hookOnce"]),
    $inferRouters: {}
  };
  return b.success("🔥 Application successfully started"), e;
}
function aE(E, e) {
  return async (r) => {
    try {
      await e({ ...r, log: A(E.toLowerCase(), "bgGreenBright") });
    } catch (R) {
      throw N({
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
  lE as createApp,
  N as createError,
  aE as createGuard,
  iE as createMiddleware,
  AE as createPlugin,
  IE as createProvider,
  NE as createRouter,
  OE as createService,
  EE as extendRouterContext,
  eE as extendServiceContext,
  z as isNixleError
};
