import { createConsola as k } from "consola";
import { colorize as s, colors as W } from "consola/utils";
import Q from "dayjs";
import $ from "callsite-record";
import { joinURL as q } from "ufo";
import { createHooks as K } from "hookable";
import X from "dotenv";
var t = /* @__PURE__ */ ((e) => (e[e.CONTINUE = 100] = "CONTINUE", e[e.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", e[e.PROCESSING = 102] = "PROCESSING", e[e.EARLY_HINTS = 103] = "EARLY_HINTS", e[e.OK = 200] = "OK", e[e.CREATED = 201] = "CREATED", e[e.ACCEPTED = 202] = "ACCEPTED", e[e.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", e[e.NO_CONTENT = 204] = "NO_CONTENT", e[e.RESET_CONTENT = 205] = "RESET_CONTENT", e[e.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", e[e.MULTI_STATUS = 207] = "MULTI_STATUS", e[e.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", e[e.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", e[e.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", e[e.SEE_OTHER = 303] = "SEE_OTHER", e[e.NOT_MODIFIED = 304] = "NOT_MODIFIED", e[e.USE_PROXY = 305] = "USE_PROXY", e[e.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", e[e.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", e[e.BAD_REQUEST = 400] = "BAD_REQUEST", e[e.UNAUTHORIZED = 401] = "UNAUTHORIZED", e[e.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", e[e.FORBIDDEN = 403] = "FORBIDDEN", e[e.NOT_FOUND = 404] = "NOT_FOUND", e[e.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", e[e.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", e[e.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", e[e.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", e[e.CONFLICT = 409] = "CONFLICT", e[e.GONE = 410] = "GONE", e[e.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", e[e.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", e[e.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", e[e.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", e[e.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", e[e.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", e[e.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", e[e.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", e[e.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", e[e.METHOD_FAILURE = 420] = "METHOD_FAILURE", e[e.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", e[e.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", e[e.LOCKED = 423] = "LOCKED", e[e.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", e[e.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", e[e.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", e[e.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", e[e.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", e[e.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", e[e.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", e[e.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", e[e.BAD_GATEWAY = 502] = "BAD_GATEWAY", e[e.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", e[e.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", e[e.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", e[e.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", e[e.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", e))(t || {});
const J = (e, E) => Object.fromEntries(Object.entries(e).filter(([r]) => E.includes(r))), Z = (e, E) => Object.fromEntries(Object.entries(e).filter(([r]) => !E.includes(r))), h = (e) => e !== Object(e), p = (...e) => {
  const E = q("", ...e), r = E.startsWith("/") ? E : `/${E}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, F = (e) => {
  try {
    const E = JSON.parse(e);
    return typeof E == "number" || typeof E == "boolean" || E === void 0 || E === null ? E : e;
  } catch {
    return e;
  }
}, G = (e) => Object.fromEntries(
  Object.entries(e).map(([E, r]) => [
    E,
    Array.isArray(r) ? r.map(F) : F(r)
  ])
), D = K(), z = {
  syntax: {
    string: (...e) => s("green", e.join("")),
    punctuator: (...e) => s("gray", e.join("")),
    keyword: (...e) => s("cyan", e.join("")),
    number: (...e) => s("magenta", e.join("")),
    regex: (...e) => s("magenta", e.join("")),
    comment: (...e) => s("gray", s("bold", e.join(""))),
    invalid: (...e) => s("inverse", e.join(""))
  },
  codeFrame: (e) => e.slice(1),
  codeLine(e, E, r, n) {
    let c = (E ? " > " : "   ") + s("dim", e) + " ";
    E && (c = s("bgRed", c));
    let O = c + s("dim", "| ") + r.slice(0, 300);
    return n || (O += `
`), O;
  },
  stackLine(e, E, r) {
    let n = `   ${s("dim", "at")} ` + e + " (" + s("blueBright", s("underline", E)) + ")";
    return r || (n += `
`), n;
  },
  stack(e) {
    return `

` + e;
  }
};
class j extends Error {
  constructor({ statusCode: E, message: r, details: n, code: R }) {
    super(), this.time = Q().format(), this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = E || t.BAD_REQUEST, this.message = r, this.details = n, this.code = R;
  }
}
const S = (e) => $({
  forError: e,
  isCallsiteFrame: (r) => u(e) ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
})?.renderSync({
  renderer: z,
  stackFilter: (r) => u(e) ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
});
function a(e, E) {
  const r = typeof e == "string" ? e : e.message;
  return new j({
    message: r,
    statusCode: typeof e == "string" ? E || t.BAD_REQUEST : e.statusCode || t.BAD_REQUEST,
    code: typeof e == "string" ? void 0 : e.code,
    details: typeof e == "string" ? {} : e.details || {}
  });
}
const u = (e) => e instanceof j, m = async (e, E) => {
  let r = "";
  u(e) || e instanceof Error ? r = e.message : h(e) ? r = e : r = `${e.constructor.name} ${JSON.stringify(e)}`;
  const n = JSON.stringify(e?.details, null, 2), R = !!n && Object.keys(n).length && n !== "{}" && n, c = [s("red", r), R && s("red", R)];
  if (e && (!e.statusCode || e.statusCode >= t.INTERNAL_SERVER_ERROR)) {
    if (e instanceof Error) {
      const O = S(e);
      O && (c.push(`
`), c.push(O));
    }
    E.fatal(...c.filter(Boolean));
  } else
    E.error(...c.filter(Boolean));
  await D.callHook("error", e);
}, P = (e, E) => {
  const r = Q().format(), n = h(e), R = {
    statusCode: E,
    message: n && e || e.message || "Internal Server Error",
    time: n && r || e.time || r,
    details: n && {} || e.details || {},
    code: n && void 0 || e.code
  }, c = JSON.parse(JSON.stringify(e, Object.getOwnPropertyNames(e)));
  return R.details = {
    ...R.details,
    ...Z(h(c) ? {} : c, [
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
let b;
const C = (e) => {
  b = k(e);
}, N = (e, ...E) => {
  if (!b)
    return;
  const r = `${s("bgBlue", " Nixle ")}`, n = b[e];
  if (!n)
    throw a({
      message: `Logger method "${e}" not found`,
      statusCode: t.INTERNAL_SERVER_ERROR
    });
  n(`${r}`, ...E);
}, y = {
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
  Object.entries(y).map(([r, n]) => [
    r,
    (...R) => n(s(E, ` ${e} `), ...R)
  ])
);
function w(e) {
  if (!e.startsWith("/"))
    throw a("Path must start with /", t.INTERNAL_SERVER_ERROR);
  if (e.length > 1 && e.endsWith("/"))
    throw a("Path must not end with /", t.INTERNAL_SERVER_ERROR);
}
function I(e) {
  function E(r, n) {
    return w(r), {
      path: r,
      method: e,
      options: typeof n == "function" ? { handler: n } : n,
      $infer: {}
    };
  }
  return E;
}
const ee = {
  get: I("GET"),
  post: I("POST"),
  patch: I("PATCH"),
  put: I("PUT"),
  delete: I("DELETE"),
  options: I("OPTIONS")
}, g = {}, Ee = (e) => {
  X.config(e), Object.keys(process.env).forEach((E) => {
    g[E] = process.env[E];
  });
}, V = {};
function re(e) {
  Object.assign(V, e);
}
function le(e, E) {
  w(e);
  const r = typeof E == "object";
  if (!E || r && !E.routes)
    throw a("Routes are required", t.INTERNAL_SERVER_ERROR);
  const n = r ? E.routes : E, R = r ? E.middlewares || [] : [], c = r ? E.guards || [] : [];
  return {
    path: e,
    routes: () => n({
      route: ee,
      log: A(e, "bgGreen"),
      env: g,
      ...V
    }),
    middlewares: R,
    guards: c,
    $inferRoutes: {}
  };
}
let H = {};
const ne = (e) => {
  Object.assign(H, e);
};
function ae(e, E) {
  return () => {
    try {
      return E({
        log: A(e.toLowerCase(), "bgCyan"),
        env: g,
        ...H
      });
    } catch (r) {
      throw a({
        message: `Oops, service "${e.toLowerCase()}" was failed`,
        statusCode: t.INTERNAL_SERVER_ERROR,
        details: r
      });
    }
  };
}
const ie = (e, E) => {
  E.plugins && E.plugins.forEach(({ name: r, plugin: n }) => {
    const R = A(r, "bgMagenta");
    n({ provider: e, log: R, extendRouterContext: re, extendServiceContext: ne });
  });
}, Re = (e, E) => {
  const r = p(e.globalPrefix || "", E.path || ""), n = A(r, "bgGreen"), R = E.routes();
  try {
    if (R.length === 0)
      throw a("At least one router is required", t.INTERNAL_SERVER_ERROR);
    if (R.some(({ path: c, method: O, options: f }) => !c || !O || !f.handler))
      throw a(
        "Path, method and handler are required for each route",
        t.INTERNAL_SERVER_ERROR
      );
  } catch (c) {
    m(c, n), process.exit(1);
  }
  R.forEach(function({ path: O, method: f, options: l }) {
    const d = p(r, O), M = A(`${W.bold(f)} ${d}`, "bgGreen");
    e.provider.createRoute({
      method: f.toLowerCase(),
      path: d,
      async handler(o) {
        const L = {}, v = (i) => i ? L[i] || null : L, B = (i, T) => {
          typeof i == "string" ? L[i] = T : Object.assign(L, i);
        }, _ = {
          ...o,
          query: G(o.query),
          params: G(o.params),
          headers: Object.fromEntries(
            Object.entries(o.headers).filter(([, i]) => typeof i == "string").map(([i, T]) => [i.toLowerCase(), T])
          ),
          env: g,
          getData: v,
          setData: B
        };
        await D.callHook("request", o);
        try {
          E?.middlewares && await Promise.all(
            E.middlewares.map(function(T) {
              return T(_);
            })
          ), l?.middlewares && await Promise.all(
            l.middlewares.map(function(T) {
              return T(_);
            })
          );
        } catch (i) {
          await m(i, M);
          const T = i?.statusCode || t.INTERNAL_SERVER_ERROR;
          return o.setStatusCode(T), P(i, T);
        }
        try {
          E.guards.length && await Promise.all(
            E.guards.map(function(U) {
              return U(_);
            })
          ), l?.guards?.length && await Promise.all(
            l.guards.map(function(U) {
              return U(_);
            })
          );
          const [i, T, Y] = await Promise.all([
            l?.queryValidation?.(_.query),
            l?.paramsValidation?.(_.params),
            l?.bodyValidation?.(_.body)
          ]);
          _.query = i || _.query, _.params = T || _.params, _.body = Y || _.body;
        } catch (i) {
          const T = i?.statusCode || t.BAD_REQUEST;
          return o.setStatusCode(T), P(i, T);
        }
        try {
          const i = await l.handler(_);
          return await D.callHook("response", i), l?.statusCode && o.setStatusCode(l.statusCode), i;
        } catch (i) {
          await m(i, M);
          const T = i?.statusCode || t.INTERNAL_SERVER_ERROR;
          return o.setStatusCode(T), P(i, T);
        }
      }
    });
  });
};
function oe(e) {
  e.globalPrefix && w(e.globalPrefix), e.logger !== !1 && C(e.logger || {});
  try {
    if (!e.provider)
      throw a("Provider is required", t.INTERNAL_SERVER_ERROR);
    if (e.routers.length === 0)
      throw a("At least one router is required", t.INTERNAL_SERVER_ERROR);
  } catch (r) {
    m(r, y), process.exit(1);
  }
  e.plugins && ie(e.provider, e), Ee(e.env), e.routers.forEach((r) => {
    Re(e, r);
  });
  const E = {
    app: e.provider.app,
    hooks: J(D, ["afterEach", "beforeEach", "callHook", "hook", "hookOnce"]),
    $inferRouters: {}
  };
  return y.success("🔥 Application successfully started"), E;
}
function Ie(e, E) {
  return async (r) => {
    try {
      await E({ ...r, log: A(e.toLowerCase(), "bgGreenBright") });
    } catch (n) {
      throw a({
        message: n?.message || `Oops, guard "${e.toLowerCase()}" was failed`,
        statusCode: n?.statusCode || t.BAD_REQUEST,
        details: n?.details
      });
    }
  };
}
function Ae(e) {
  return e;
}
const fe = (e, E) => ({
  name: e,
  plugin: E
});
export {
  t as StatusCode,
  oe as createApp,
  a as createError,
  Ie as createGuard,
  fe as createPlugin,
  Ae as createProvider,
  le as createRouter,
  ae as createService,
  re as extendRouterContext,
  u as isNixleError
};
