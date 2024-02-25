import { createConsola as k } from "consola";
import { colorize as t, colors as $ } from "consola/utils";
import Q from "dayjs";
import W from "callsite-record";
import { joinURL as q } from "ufo";
import { createHooks as X } from "hookable";
import K from "dotenv";
var s = /* @__PURE__ */ ((e) => (e[e.CONTINUE = 100] = "CONTINUE", e[e.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", e[e.PROCESSING = 102] = "PROCESSING", e[e.EARLY_HINTS = 103] = "EARLY_HINTS", e[e.OK = 200] = "OK", e[e.CREATED = 201] = "CREATED", e[e.ACCEPTED = 202] = "ACCEPTED", e[e.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", e[e.NO_CONTENT = 204] = "NO_CONTENT", e[e.RESET_CONTENT = 205] = "RESET_CONTENT", e[e.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", e[e.MULTI_STATUS = 207] = "MULTI_STATUS", e[e.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", e[e.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", e[e.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", e[e.SEE_OTHER = 303] = "SEE_OTHER", e[e.NOT_MODIFIED = 304] = "NOT_MODIFIED", e[e.USE_PROXY = 305] = "USE_PROXY", e[e.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", e[e.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", e[e.BAD_REQUEST = 400] = "BAD_REQUEST", e[e.UNAUTHORIZED = 401] = "UNAUTHORIZED", e[e.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", e[e.FORBIDDEN = 403] = "FORBIDDEN", e[e.NOT_FOUND = 404] = "NOT_FOUND", e[e.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", e[e.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", e[e.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", e[e.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", e[e.CONFLICT = 409] = "CONFLICT", e[e.GONE = 410] = "GONE", e[e.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", e[e.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", e[e.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", e[e.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", e[e.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", e[e.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", e[e.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", e[e.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", e[e.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", e[e.METHOD_FAILURE = 420] = "METHOD_FAILURE", e[e.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", e[e.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", e[e.LOCKED = 423] = "LOCKED", e[e.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", e[e.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", e[e.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", e[e.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", e[e.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", e[e.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", e[e.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", e[e.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", e[e.BAD_GATEWAY = 502] = "BAD_GATEWAY", e[e.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", e[e.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", e[e.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", e[e.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", e[e.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", e))(s || {});
const J = (e, r) => Object.fromEntries(Object.entries(e).filter(([E]) => r.includes(E))), Z = (e, r) => Object.fromEntries(Object.entries(e).filter(([E]) => !r.includes(E))), h = (e) => e !== Object(e), p = (...e) => {
  const r = q("", ...e), E = r.startsWith("/") ? r : `/${r}`;
  return E.endsWith("/") ? E.slice(0, -1) : E;
}, F = (e) => {
  try {
    const r = JSON.parse(e);
    return typeof r == "number" || typeof r == "boolean" || r === void 0 || r === null ? r : e;
  } catch {
    return e;
  }
}, G = (e) => Object.fromEntries(
  Object.entries(e).map(([r, E]) => [
    r,
    Array.isArray(E) ? E.map(F) : F(E)
  ])
), L = X(), z = {
  syntax: {
    string: (...e) => t("green", e.join("")),
    punctuator: (...e) => t("gray", e.join("")),
    keyword: (...e) => t("cyan", e.join("")),
    number: (...e) => t("magenta", e.join("")),
    regex: (...e) => t("magenta", e.join("")),
    comment: (...e) => t("gray", t("bold", e.join(""))),
    invalid: (...e) => t("inverse", e.join(""))
  },
  codeFrame: (e) => e.slice(1),
  codeLine(e, r, E, n) {
    let T = (r ? " > " : "   ") + t("dim", e) + " ";
    r && (T = t("bgRed", T));
    let O = T + t("dim", "| ") + E.slice(0, 300);
    return n || (O += `
`), O;
  },
  stackLine(e, r, E) {
    let n = `   ${t("dim", "at")} ` + e + " (" + t("blueBright", t("underline", r)) + ")";
    return E || (n += `
`), n;
  },
  stack(e) {
    return `

` + e;
  }
};
class V extends Error {
  constructor({ statusCode: r, message: E, details: n, code: R }) {
    super(), this.time = Q().format(), this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = r || s.BAD_REQUEST, this.message = E, this.details = n, this.code = R;
  }
}
const S = (e) => W({
  forError: e,
  isCallsiteFrame: (E) => d(e) ? !!E.source && !E.source.includes("node_modules") && !E.source.includes("node:") && !E.source.includes("nixle/dist") : !0
})?.renderSync({
  renderer: z,
  stackFilter: (E) => d(e) ? !!E.source && !E.source.includes("node_modules") && !E.source.includes("node:") && !E.source.includes("nixle/dist") : !0
});
function N(e, r) {
  const E = typeof e == "string" ? e : e.message;
  return new V({
    message: E,
    statusCode: typeof e == "string" ? r || s.BAD_REQUEST : e.statusCode || s.BAD_REQUEST,
    code: typeof e == "string" ? void 0 : e.code,
    details: typeof e == "string" ? {} : e.details || {}
  });
}
const d = (e) => e instanceof V, g = async (e, r) => {
  let E = "";
  d(e) || e instanceof Error ? E = e.message : h(e) ? E = e : E = `${e.constructor.name} ${JSON.stringify(e)}`;
  const n = JSON.stringify(e?.details, null, 2), R = !!n && Object.keys(n).length && n !== "{}" && n, T = [t("red", E), R && t("red", R)];
  if (e && (!e.statusCode || e.statusCode >= s.INTERNAL_SERVER_ERROR)) {
    if (e instanceof Error) {
      const O = S(e);
      O && (T.push(`
`), T.push(O));
    }
    r.fatal(...T.filter(Boolean));
  } else
    r.error(...T.filter(Boolean));
  await L.callHook("error", e);
}, U = (e, r) => {
  const E = Q().format(), n = h(e), R = {
    statusCode: r,
    message: n && e || e.message || "Internal Server Error",
    time: n && E || e.time || E,
    details: n && {} || e.details || {},
    code: n && void 0 || e.code
  }, T = JSON.parse(JSON.stringify(e, Object.getOwnPropertyNames(e)));
  return R.details = {
    ...R.details,
    ...Z(h(T) ? {} : T, [
      "message",
      "name",
      "stack",
      "statusCode",
      "time",
      "details",
      "code"
    ])
  }, R;
};
let u;
const C = (e) => {
  u = k(e);
}, a = (e, ...r) => {
  if (!u)
    return;
  const E = `${t("bgBlue", " Nixle ")}`, n = u[e];
  if (!n)
    throw N({
      message: `Logger method "${e}" not found`,
      statusCode: s.INTERNAL_SERVER_ERROR
    });
  n(`${E}`, ...r);
}, w = {
  info: (...e) => a("info", ...e),
  success: (...e) => a("success", ...e),
  warn: (...e) => a("warn", ...e),
  error: (...e) => a("error", ...e),
  fatal: (...e) => a("fatal", ...e),
  debug: (...e) => a("debug", ...e),
  trace: (...e) => a("trace", ...e),
  silent: (...e) => a("silent", ...e),
  log: (...e) => a("log", ...e),
  fail: (...e) => a("fail", ...e),
  verbose: (...e) => a("verbose", ...e)
}, I = (e, r = "bgWhite") => Object.fromEntries(
  Object.entries(w).map(([E, n]) => [
    E,
    (...R) => n(t(r, ` ${e} `), ...R)
  ])
);
function b(e) {
  if (!e.startsWith("/"))
    throw N("Path must start with /", s.INTERNAL_SERVER_ERROR);
  if (e.length > 1 && e.endsWith("/"))
    throw N("Path must not end with /", s.INTERNAL_SERVER_ERROR);
}
function A(e) {
  function r(E, n) {
    return b(E), {
      path: E,
      method: e,
      options: typeof n == "function" ? { handler: n } : n,
      $infer: {}
    };
  }
  return r;
}
const ee = {
  get: A("GET"),
  post: A("POST"),
  patch: A("PATCH"),
  put: A("PUT"),
  delete: A("DELETE"),
  options: A("OPTIONS")
}, D = {}, re = (e) => {
  K.config(e), Object.keys(process.env).forEach((r) => {
    D[r] = process.env[r];
  });
}, j = {};
function Ee(e) {
  Object.assign(j, e);
}
function Oe(e, r) {
  b(e);
  const E = typeof r == "object";
  if (!r || E && !r.routes)
    throw N("Routes are required", s.INTERNAL_SERVER_ERROR);
  const n = E ? r.routes : r, R = E ? r.middlewares || [] : [], T = E ? r.guards || [] : [];
  return {
    path: e,
    routes: () => n({
      route: ee,
      log: I(e, "bgGreen"),
      env: D,
      ...j
    }),
    middlewares: R,
    guards: T,
    $inferRoutes: {}
  };
}
let H = {};
const ne = (e) => {
  Object.assign(H, e);
};
function oe(e, r) {
  return () => {
    try {
      return r({
        log: I(e.toLowerCase(), "bgCyan"),
        env: D,
        ...H
      });
    } catch (E) {
      throw N({
        message: `Oops, service "${e.toLowerCase()}" was failed`,
        statusCode: s.INTERNAL_SERVER_ERROR,
        details: E
      });
    }
  };
}
const ie = (e, r) => {
  r.plugins && r.plugins.forEach(({ name: E, plugin: n }) => {
    const R = I(E, "bgMagenta");
    n({ provider: e, log: R, extendRouterContext: Ee, extendServiceContext: ne });
  });
}, Re = (e, r) => {
  const E = p(e.globalPrefix || "", r.path || ""), n = I(E, "bgGreen"), R = r.routes();
  try {
    if (R.length === 0)
      throw N("At least one router is required", s.INTERNAL_SERVER_ERROR);
    if (R.some(({ path: T, method: O, options: f }) => !T || !O || !f.handler))
      throw N(
        "Path, method and handler are required for each route",
        s.INTERNAL_SERVER_ERROR
      );
  } catch (T) {
    g(T, n), process.exit(1);
  }
  R.forEach(function({ path: O, method: f, options: _ }) {
    const y = p(E, O), M = I(`${$.bold(f)} ${y}`, "bgGreen");
    e.provider.createRoute({
      method: f.toLowerCase(),
      path: y,
      async handler(o) {
        const m = {}, B = (i) => i ? m[i] || null : m, Y = (i, c) => {
          typeof i == "string" ? m[i] = c : Object.assign(m, i);
        }, l = {
          ...o,
          query: G(o.query),
          params: G(o.params),
          headers: Object.fromEntries(
            Object.entries(o.headers).filter(([, i]) => typeof i == "string").map(([i, c]) => [i.toLowerCase(), c])
          ),
          env: D,
          getData: B,
          setData: Y
        };
        await L.callHook("request", o);
        try {
          _?.middlewares?.length && await Promise.all(
            _.middlewares.map(function(c) {
              return c(l);
            })
          ), r?.middlewares?.length && await Promise.all(
            r.middlewares.map(function(c) {
              return c(l);
            })
          ), _?.middlewares?.length && await Promise.all(
            _.middlewares.map(function(c) {
              return c(l);
            })
          );
        } catch (i) {
          await g(i, M);
          const c = i?.statusCode || s.INTERNAL_SERVER_ERROR;
          return o.setStatusCode(c), U(i, c);
        }
        try {
          r.guards.length && await Promise.all(
            r.guards.map(function(P) {
              return P(l);
            })
          ), _?.guards?.length && await Promise.all(
            _.guards.map(function(P) {
              return P(l);
            })
          );
          const [i, c, v] = await Promise.all([
            _?.queryValidation?.(l.query),
            _?.paramsValidation?.(l.params),
            _?.bodyValidation?.(l.body)
          ]);
          l.query = i || l.query, l.params = c || l.params, l.body = v || l.body;
        } catch (i) {
          const c = i?.statusCode || s.BAD_REQUEST;
          return o.setStatusCode(c), U(i, c);
        }
        try {
          const i = await _.handler(l);
          return await L.callHook("response", i), _?.statusCode && o.setStatusCode(_.statusCode), i;
        } catch (i) {
          await g(i, M);
          const c = i?.statusCode || s.INTERNAL_SERVER_ERROR;
          return o.setStatusCode(c), U(i, c);
        }
      }
    });
  });
};
function ce(e, r) {
  return async (E) => {
    try {
      await r({ ...E, log: I(e.toLowerCase(), "bgYellowBright") });
    } catch (n) {
      throw N({
        message: n?.message || `Oops, middleware "${e.toLowerCase()}" was failed`,
        statusCode: n?.statusCode || s.INTERNAL_SERVER_ERROR,
        details: n?.details
      });
    }
  };
}
function Ie(e) {
  e.globalPrefix && b(e.globalPrefix), e.logger !== !1 && C(e.logger || {});
  try {
    if (!e.provider)
      throw N("Provider is required", s.INTERNAL_SERVER_ERROR);
    if (e.routers.length === 0)
      throw N("At least one router is required", s.INTERNAL_SERVER_ERROR);
  } catch (E) {
    g(E, w), process.exit(1);
  }
  e.plugins && ie(e.provider, e), e.middlewares = [
    ce("nixle-global-middleware", ({ setHeader: E }) => {
      E("X-Powered-By", "Nixle");
    }),
    ...e.middlewares || []
  ], re(e.env), e.routers.forEach((E) => {
    Re(e, E);
  });
  const r = {
    app: e.provider.app,
    hooks: J(L, ["afterEach", "beforeEach", "callHook", "hook", "hookOnce"]),
    $inferRouters: {}
  };
  return w.success("🔥 Application successfully started"), r;
}
function Ae(e, r) {
  return async (E) => {
    try {
      await r({ ...E, log: I(e.toLowerCase(), "bgGreenBright") });
    } catch (n) {
      throw N({
        message: n?.message || `Oops, guard "${e.toLowerCase()}" was failed`,
        statusCode: n?.statusCode || s.BAD_REQUEST,
        details: n?.details
      });
    }
  };
}
function fe(e) {
  return e;
}
const me = (e, r) => ({
  name: e,
  plugin: r
});
export {
  s as StatusCode,
  Ie as createApp,
  N as createError,
  Ae as createGuard,
  ce as createMiddleware,
  me as createPlugin,
  fe as createProvider,
  Oe as createRouter,
  oe as createService,
  Ee as extendRouterContext,
  ne as extendServiceContext,
  d as isNixleError
};
