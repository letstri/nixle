import { createConsola as W } from "consola";
import { colorize as I, colors as q } from "consola/utils";
import v from "dayjs";
import { joinURL as k } from "ufo";
import { createHooks as X } from "hookable";
import K from "dotenv";
var T = /* @__PURE__ */ ((e) => (e[e.CONTINUE = 100] = "CONTINUE", e[e.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", e[e.PROCESSING = 102] = "PROCESSING", e[e.EARLY_HINTS = 103] = "EARLY_HINTS", e[e.OK = 200] = "OK", e[e.CREATED = 201] = "CREATED", e[e.ACCEPTED = 202] = "ACCEPTED", e[e.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", e[e.NO_CONTENT = 204] = "NO_CONTENT", e[e.RESET_CONTENT = 205] = "RESET_CONTENT", e[e.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", e[e.MULTI_STATUS = 207] = "MULTI_STATUS", e[e.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", e[e.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", e[e.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", e[e.SEE_OTHER = 303] = "SEE_OTHER", e[e.NOT_MODIFIED = 304] = "NOT_MODIFIED", e[e.USE_PROXY = 305] = "USE_PROXY", e[e.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", e[e.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", e[e.BAD_REQUEST = 400] = "BAD_REQUEST", e[e.UNAUTHORIZED = 401] = "UNAUTHORIZED", e[e.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", e[e.FORBIDDEN = 403] = "FORBIDDEN", e[e.NOT_FOUND = 404] = "NOT_FOUND", e[e.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", e[e.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", e[e.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", e[e.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", e[e.CONFLICT = 409] = "CONFLICT", e[e.GONE = 410] = "GONE", e[e.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", e[e.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", e[e.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", e[e.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", e[e.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", e[e.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", e[e.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", e[e.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", e[e.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", e[e.METHOD_FAILURE = 420] = "METHOD_FAILURE", e[e.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", e[e.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", e[e.LOCKED = 423] = "LOCKED", e[e.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", e[e.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", e[e.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", e[e.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", e[e.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", e[e.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", e[e.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", e[e.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", e[e.BAD_GATEWAY = 502] = "BAD_GATEWAY", e[e.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", e[e.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", e[e.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", e[e.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", e[e.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", e))(T || {});
const J = (e, E) => Object.fromEntries(Object.entries(e).filter(([r]) => E.includes(r))), z = (e, E) => Object.fromEntries(Object.entries(e).filter(([r]) => !E.includes(r))), U = (e) => e !== Object(e), G = (...e) => {
  const E = k("", ...e), r = E.startsWith("/") ? E : `/${E}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, F = (e) => {
  try {
    const E = JSON.parse(e);
    return typeof E == "number" || typeof E == "boolean" || E === void 0 || E === null ? E : e;
  } catch {
    return e;
  }
}, Q = (e) => Object.fromEntries(
  Object.entries(e).map(([E, r]) => [
    E,
    Array.isArray(r) ? r.map(F) : F(r)
  ])
), D = X();
class H extends Error {
  constructor({ statusCode: E, message: r, details: R, code: i }) {
    super(), this.time = v().format(), this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = E || T.BAD_REQUEST, this.message = r, this.details = R, this.code = i;
  }
}
const Z = (e) => {
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
function _(e, E) {
  const r = typeof e == "string" ? e : e.message;
  return new H({
    message: r,
    statusCode: typeof e == "string" ? E || T.BAD_REQUEST : e.statusCode || T.BAD_REQUEST,
    code: typeof e == "string" ? void 0 : e.code,
    details: typeof e == "string" ? {} : e.details || {}
  });
}
const S = (e) => e instanceof H, L = async (e, E) => {
  let r = "";
  S(e) || e instanceof Error ? r = e.message : U(e) ? r = e : r = `${e.constructor.name} ${JSON.stringify(e)}`;
  const R = JSON.stringify(e?.details, null, 2), i = !!R && Object.keys(R).length && R !== "{}" && R, s = [I("red", r), i && I("red", i)];
  if (e && (!e.statusCode || e.statusCode >= T.INTERNAL_SERVER_ERROR)) {
    if (e instanceof Error) {
      const { stack: O } = e;
      O && (s.push(`
`), s.push(Z(O)));
    }
    E.fatal(...s.filter(Boolean));
  } else
    E.error(...s.filter(Boolean));
  await D.callHook("error", e);
}, P = (e, E) => {
  const r = v().format(), R = U(e), i = {
    statusCode: E,
    message: R && e || e.message || "Internal Server Error",
    time: R && r || e.time || r,
    details: R && {} || e.details || {},
    code: R && void 0 || e.code
  }, s = JSON.parse(JSON.stringify(e, Object.getOwnPropertyNames(e)));
  return i.details !== null && typeof i.details == "object" && Object.keys(i.details).length === 0 && (i.details = {
    ...i.details,
    ...z(U(s) ? {} : s, [
      "message",
      "name",
      "stack",
      "statusCode",
      "time",
      "details",
      "code"
    ])
  }), i;
};
let w;
const C = (e) => {
  w = W(e);
}, l = (e, ...E) => {
  if (!w)
    return;
  const r = `${I("bgBlue", " Nixle ")}`, R = w[e];
  if (!R)
    throw _({
      message: `Logger method "${e}" not found`,
      statusCode: T.INTERNAL_SERVER_ERROR
    });
  R(`${r}`, ...E);
}, b = {
  info: (...e) => l("info", ...e),
  success: (...e) => l("success", ...e),
  warn: (...e) => l("warn", ...e),
  error: (...e) => l("error", ...e),
  fatal: (...e) => l("fatal", ...e),
  debug: (...e) => l("debug", ...e),
  trace: (...e) => l("trace", ...e),
  silent: (...e) => l("silent", ...e),
  log: (...e) => l("log", ...e),
  fail: (...e) => l("fail", ...e),
  verbose: (...e) => l("verbose", ...e)
}, A = (e, E = "bgWhite") => Object.fromEntries(
  Object.entries(b).map(([r, R]) => [
    r,
    (...i) => R(I(E, ` ${e} `), ...i)
  ])
);
function u(e) {
  if (!e.startsWith("/"))
    throw _("Path must start with /", T.INTERNAL_SERVER_ERROR);
  if (e.length > 1 && e.endsWith("/"))
    throw _("Path must not end with /", T.INTERNAL_SERVER_ERROR);
}
function o(e) {
  function E(r, R) {
    return u(r), {
      path: r,
      method: e,
      options: typeof R == "function" ? { handler: R } : R,
      $infer: {}
    };
  }
  return E;
}
const ee = {
  get: o("GET"),
  post: o("POST"),
  patch: o("PATCH"),
  put: o("PUT"),
  delete: o("DELETE"),
  options: o("OPTIONS")
}, g = {}, d = () => ({
  ...g,
  get: (e) => g[e],
  getOrThrow(e) {
    const E = g[e];
    if (E === void 0)
      throw _(`Env variable "${e}" is required`, T.INTERNAL_SERVER_ERROR);
    return E;
  }
}), Ee = (e) => {
  K.config(e), Object.keys(process.env).forEach((E) => {
    g[E] = process.env[E];
  });
}, B = {};
function re(e) {
  Object.assign(B, e);
}
function ae(e, E) {
  u(e);
  const r = typeof E == "object";
  if (!E || r && !E.routes)
    throw _("Routes are required", T.INTERNAL_SERVER_ERROR);
  const R = r ? E.routes : E, i = r ? E.middlewares || [] : [], s = r ? E.guards || [] : [];
  return {
    path: e,
    routes: () => R({
      route: ee,
      log: A(e, "bgGreen"),
      env: d(),
      ...B
    }),
    middlewares: i,
    guards: s,
    $inferRoutes: {}
  };
}
let j = {};
const Re = (e) => {
  Object.assign(j, e);
};
function Ne(e, E) {
  return () => {
    try {
      return E({
        log: A(e.toLowerCase(), "bgCyan"),
        env: d(),
        ...j
      });
    } catch (r) {
      throw _({
        message: `Oops, service "${e.toLowerCase()}" was failed`,
        statusCode: T.INTERNAL_SERVER_ERROR,
        details: r
      });
    }
  };
}
const ne = (e, E) => {
  E.plugins && E.plugins.forEach(({ name: r, plugin: R }) => {
    const i = A(r, "bgMagenta");
    R({ provider: e, log: i, extendRouterContext: re, extendServiceContext: Re });
  });
}, V = (e, E) => {
  const r = G(e.globalPrefix || "", E.path || ""), R = A(r, "bgGreen"), i = E.routes();
  try {
    if (i.length === 0)
      throw _("At least one router is required", T.INTERNAL_SERVER_ERROR);
    if (i.some(({ path: s, method: O, options: f }) => !s || !O || !f.handler))
      throw _(
        "Path, method and handler are required for each route",
        T.INTERNAL_SERVER_ERROR
      );
  } catch (s) {
    L(s, R), process.exit(1);
  }
  i.forEach(function({ path: O, method: f, options: a }) {
    const y = G(r, O), M = A(`${q.bold(f)} ${y}`, "bgGreen");
    e.provider.createRoute({
      method: f.toLowerCase(),
      path: y,
      async handler(N) {
        const m = {}, p = (n) => n ? m[n] || null : m, Y = (n, c) => {
          typeof n == "string" ? m[n] = c : Object.assign(m, n);
        }, t = {
          ...N,
          query: Q(N.query),
          params: Q(N.params),
          headers: Object.fromEntries(
            Object.entries(N.headers).filter(([, n]) => typeof n == "string").map(([n, c]) => [n.toLowerCase(), c])
          ),
          env: d(),
          getData: p,
          setData: Y
        };
        await D.callHook("request", N);
        try {
          e?.middlewares?.length && await Promise.all(
            e.middlewares.map(function(c) {
              return c(t);
            })
          ), E?.middlewares?.length && await Promise.all(
            E.middlewares.map(function(c) {
              return c(t);
            })
          ), a?.middlewares?.length && await Promise.all(
            a.middlewares.map(function(c) {
              return c(t);
            })
          );
        } catch (n) {
          await L(n, M);
          const c = n?.statusCode || T.INTERNAL_SERVER_ERROR;
          return N.setStatusCode(c), P(n, c);
        }
        try {
          E.guards.length && await Promise.all(
            E.guards.map(function(h) {
              return h(t);
            })
          ), a?.guards?.length && await Promise.all(
            a.guards.map(function(h) {
              return h(t);
            })
          );
          const [n, c, x] = await Promise.all([
            a?.queryValidation?.(t.query),
            a?.paramsValidation?.(t.params),
            a?.bodyValidation?.(t.body)
          ]);
          t.query = n || t.query, t.params = c || t.params, t.body = x || t.body;
        } catch (n) {
          const c = n?.statusCode || T.BAD_REQUEST;
          return N.setStatusCode(c), P(n, c);
        }
        try {
          const n = await a.handler(t);
          return await D.callHook("response", n), a?.statusCode && N.setStatusCode(a.statusCode), n;
        } catch (n) {
          await L(n, M);
          const c = n?.statusCode || T.INTERNAL_SERVER_ERROR;
          return N.setStatusCode(c), P(n, c);
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
      throw _({
        message: R?.message || `Oops, middleware "${e.toLowerCase()}" was failed`,
        statusCode: R?.statusCode || T.INTERNAL_SERVER_ERROR,
        details: R?.details
      });
    }
  };
}
function Oe(e) {
  e.globalPrefix && u(e.globalPrefix), e.logger !== !1 && C(e.logger || {});
  try {
    if (!e.provider)
      throw _("Provider is required", T.INTERNAL_SERVER_ERROR);
    if (!e.routers && !e.modules || e.routers?.length === 0 && e.modules?.length === 0)
      throw _("At least one router is required", T.INTERNAL_SERVER_ERROR);
  } catch (r) {
    L(r, b), process.exit(1);
  }
  Ee(e.env), e.plugins && ne(e.provider, e), e.middlewares = [
    ie("nixle-global-middleware", ({ setHeader: r }) => {
      r("X-Powered-By", "Nixle");
    }),
    ...e.middlewares || []
  ], e.modules?.forEach((r) => {
    r.routers.forEach((R) => {
      V(e, R);
    });
  }), e.routers?.forEach((r) => {
    V(e, r);
  });
  const E = {
    app: e.provider.app,
    hooks: J(D, ["afterEach", "beforeEach", "callHook", "hook", "hookOnce"]),
    $inferRouters: {}
  };
  return b.success("🔥 Application successfully started"), E;
}
function Ie(e, E) {
  return async (r) => {
    try {
      await E({ ...r, log: A(e.toLowerCase(), "bgGreenBright") });
    } catch (R) {
      throw _({
        message: R?.message || `Oops, guard "${e.toLowerCase()}" was failed`,
        statusCode: R?.statusCode || T.BAD_REQUEST,
        details: R?.details
      });
    }
  };
}
function Ae(e, E) {
  return { name: e, ...E };
}
function oe(e) {
  return e;
}
const fe = (e, E) => ({
  name: e,
  plugin: E
});
export {
  T as StatusCode,
  Oe as createApp,
  _ as createError,
  Ie as createGuard,
  ie as createMiddleware,
  Ae as createModule,
  fe as createPlugin,
  oe as createProvider,
  ae as createRouter,
  Ne as createService,
  re as extendRouterContext,
  Re as extendServiceContext,
  S as isNixleError
};
