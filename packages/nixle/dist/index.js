import { createConsola as W } from "consola";
import { colorize as i, colors as $ } from "consola/utils";
import G from "dayjs";
import q from "callsite-record";
import { joinURL as k } from "ufo";
import J from "node:events";
import K from "dotenv";
var c = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(c || {});
const X = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => !e.includes(r))), Q = (E) => E !== Object(E), M = (...E) => {
  const e = k("", ...E), r = e.startsWith("/") ? e : `/${e}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, F = (E) => {
  try {
    const e = JSON.parse(E);
    return typeof e == "number" || typeof e == "boolean" || e === void 0 || e === null ? e : E;
  } catch {
    return E;
  }
}, p = (E) => Object.fromEntries(
  Object.entries(E).map(([e, r]) => [
    e,
    Array.isArray(r) ? r.map(F) : F(r)
  ])
), m = new J(), Z = {
  syntax: {
    string: (...E) => i("green", E.join("")),
    punctuator: (...E) => i("gray", E.join("")),
    keyword: (...E) => i("cyan", E.join("")),
    number: (...E) => i("magenta", E.join("")),
    regex: (...E) => i("magenta", E.join("")),
    comment: (...E) => i("gray", i("bold", E.join(""))),
    invalid: (...E) => i("inverse", E.join(""))
  },
  codeFrame: (E) => E.slice(1),
  codeLine(E, e, r, n) {
    let N = (e ? " > " : "   ") + i("dim", E) + " ";
    e && (N = i("bgRed", N));
    let I = N + i("dim", "| ") + r.slice(0, 300);
    return n || (I += `
`), I;
  },
  stackLine(E, e, r) {
    let n = `   ${i("dim", "at")} ` + E + " (" + i("blueBright", i("underline", e)) + ")";
    return r || (n += `
`), n;
  },
  stack(E) {
    return `

` + E;
  }
};
class V extends Error {
  constructor({ statusCode: e, message: r, details: n, code: s }) {
    super(), this.time = G().format(), this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = e || c.BAD_REQUEST, this.message = r, this.details = n, this.code = s;
  }
}
const z = (E) => q({
  forError: E,
  isCallsiteFrame: (r) => h(E) && E.statusCode < c.INTERNAL_SERVER_ERROR ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
})?.renderSync({
  renderer: Z,
  stackFilter: (r) => h(E) && E.statusCode < c.INTERNAL_SERVER_ERROR ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
});
function l(E, e) {
  const r = typeof E == "string" ? E : E.message;
  return new V({
    message: r,
    statusCode: typeof E == "string" ? e || c.BAD_REQUEST : E.statusCode || c.BAD_REQUEST,
    code: typeof E == "string" ? void 0 : E.code,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const h = (E) => E instanceof V, D = (E, e) => {
  let r = "";
  if (h(E) || E instanceof Error ? r = E.message : Q(E) ? r = E : r = `${E.constructor.name} ${JSON.stringify(E)}`, E && (!E.statusCode || E.statusCode >= c.INTERNAL_SERVER_ERROR))
    if (E instanceof Error) {
      const n = z(E), s = [
        i("red", r),
        E?.details && i("red", JSON.stringify(E?.details, null, 2)),
        ...n ? [`
`, n] : []
      ].filter(Boolean);
      e.fatal(...s);
    } else {
      const n = [
        i("red", r),
        E?.details && i("red", JSON.stringify(E?.details, null, 2))
      ].filter(Boolean);
      e.fatal(...n);
    }
  else
    e.error(i("red", r), i("red", JSON.stringify(E?.details, null, 2)));
  m.emit("error", E);
}, P = (E, e) => {
  const r = G().format(), n = Q(E), s = n && E || E.message || "Internal Server Error", N = n && r || E.time || r, I = n && {} || E.details || {}, A = n && void 0 || E.code, t = {
    statusCode: e,
    message: s,
    time: N,
    details: I,
    code: A
  };
  return t.details = {
    ...t.details,
    ...X(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
      "message",
      "name",
      "stack",
      "statusCode",
      "time",
      "details",
      "code"
    ])
  }, t;
};
let u;
const S = (E) => {
  u = W(E);
}, O = (E, ...e) => {
  if (!u)
    return;
  const r = `${i("bgBlue", " Nixle ")}`, n = u[E];
  if (!n)
    throw l({
      message: `Logger method "${E}" not found`,
      statusCode: c.INTERNAL_SERVER_ERROR
    });
  n(`${r}`, ...e);
}, d = {
  info: (...E) => O("info", ...E),
  success: (...E) => O("success", ...E),
  warn: (...E) => O("warn", ...E),
  error: (...E) => O("error", ...E),
  fatal: (...E) => O("fatal", ...E),
  debug: (...E) => O("debug", ...E),
  trace: (...E) => O("trace", ...E),
  silent: (...E) => O("silent", ...E),
  log: (...E) => O("log", ...E),
  fail: (...E) => O("fail", ...E),
  verbose: (...E) => O("verbose", ...E)
}, f = (E, e = "bgWhite") => Object.fromEntries(
  Object.entries(d).map(([r, n]) => [
    r,
    (...s) => n(i(e, ` ${E} `), ...s)
  ])
);
function b(E) {
  if (!E.startsWith("/"))
    throw l("Path must start with /", c.INTERNAL_SERVER_ERROR);
  if (E.length > 1 && E.endsWith("/"))
    throw l("Path must not end with /", c.INTERNAL_SERVER_ERROR);
}
function o(E) {
  function e(r, n) {
    return b(r), {
      path: r,
      method: E,
      options: typeof n == "function" ? { handler: n } : n,
      $infer: {}
    };
  }
  return e;
}
const C = {
  get: o("GET"),
  post: o("POST"),
  patch: o("PATCH"),
  put: o("PUT"),
  delete: o("DELETE"),
  options: o("OPTIONS")
}, g = {}, EE = (E) => {
  K.config(E), Object.keys(process.env).forEach((e) => {
    g[e] = process.env[e];
  });
}, j = {};
function eE(E) {
  Object.assign(j, E);
}
function OE(E, e) {
  b(E);
  const r = typeof e == "object";
  if (!e || r && !e.routes)
    throw l("Routes are required", c.INTERNAL_SERVER_ERROR);
  const n = r ? e.routes : e, s = r ? e.middlewares || [] : [], N = r ? e.guards || [] : [];
  return {
    path: E,
    routes: () => n({
      route: C,
      log: f(E, "bgGreen"),
      env: g,
      ...j
    }),
    middlewares: s,
    guards: N,
    $inferRoutes: {}
  };
}
let v = {};
const rE = (E) => {
  Object.assign(v, E);
};
function lE(E, e) {
  return () => {
    try {
      return e({
        log: f(E.toLowerCase(), "bgCyan"),
        env: g,
        ...v
      });
    } catch (r) {
      throw l({
        message: `Oops, service "${E.toLowerCase()}" was failed`,
        statusCode: c.INTERNAL_SERVER_ERROR,
        details: r
      });
    }
  };
}
const nE = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: r, plugin: n }) => {
    const s = f(r, "bgMagenta");
    n({ provider: E, log: s, extendRouterContext: eE, extendServiceContext: rE });
  });
}, RE = (E, e) => {
  const r = M(E.globalPrefix || "", e.path || ""), n = f(r, "bgGreen"), s = e.routes();
  try {
    if (s.length === 0)
      throw l("At least one router is required", c.INTERNAL_SERVER_ERROR);
    if (s.some(({ path: N, method: I, options: A }) => !N || !I || !A.handler))
      throw l(
        "Path, method and handler are required for each route",
        c.INTERNAL_SERVER_ERROR
      );
  } catch (N) {
    D(N, n), process.exit(1);
  }
  s.forEach(function({ path: I, method: A, options: t }) {
    const y = M(r, I), w = f(`${$.bold(A)} ${y}`, "bgGreen");
    E.provider.createRoute({
      method: A.toLowerCase(),
      path: y,
      async handler(a) {
        const L = {}, B = (R) => R ? L[R] || null : L, Y = (R, T) => {
          typeof R == "string" ? L[R] = T : Object.assign(L, R);
        }, _ = {
          ...a,
          query: p(a.query),
          params: p(a.params),
          headers: Object.fromEntries(
            Object.entries(a.headers).filter(([, R]) => typeof R == "string").map(([R, T]) => [R.toLowerCase(), T])
          ),
          env: g,
          getData: B,
          setData: Y
        };
        m.emit("request", a);
        try {
          e?.middlewares && await Promise.all(
            e.middlewares.map(function(T) {
              return T(_);
            })
          ), t?.middlewares && await Promise.all(
            t.middlewares.map(function(T) {
              return T(_);
            })
          );
        } catch (R) {
          D(R, w);
          const T = R?.statusCode || c.INTERNAL_SERVER_ERROR;
          return a.setStatusCode(T), P(R, T);
        }
        try {
          e.guards.length && await Promise.all(
            e.guards.map(function(U) {
              return U(_);
            })
          ), t?.guards?.length && await Promise.all(
            t.guards.map(function(U) {
              return U(_);
            })
          );
          const [R, T, H] = await Promise.all([
            t?.queryValidation?.(_.query),
            t?.paramsValidation?.(_.params),
            t?.bodyValidation?.(_.body)
          ]);
          _.query = R || _.query, _.params = T || _.params, _.body = H || _.body;
        } catch (R) {
          const T = R?.statusCode || c.BAD_REQUEST;
          return a.setStatusCode(T), P(R, T);
        }
        try {
          const R = await t.handler(_);
          return m.emit("response", R), t?.statusCode && a.setStatusCode(t.statusCode), R;
        } catch (R) {
          D(R, w);
          const T = R?.statusCode || c.INTERNAL_SERVER_ERROR;
          return a.setStatusCode(T), P(R, T);
        }
      }
    });
  });
};
function IE(E) {
  E.globalPrefix && b(E.globalPrefix), E.logger !== !1 && S(E.logger || {});
  try {
    if (!E.provider)
      throw l("Provider is required", c.INTERNAL_SERVER_ERROR);
    if (E.routers.length === 0)
      throw l("At least one router is required", c.INTERNAL_SERVER_ERROR);
  } catch (r) {
    D(r, d), process.exit(1);
  }
  E.plugins && nE(E.provider, E), EE(E.env), E.routers.forEach((r) => {
    RE(E, r);
  });
  const e = {
    app: E.provider.app,
    events: {
      on: m.on,
      emit: m.emit
    },
    $inferRouters: {}
  };
  return d.success("🔥 Application successfully started"), e;
}
function aE(E, e) {
  return async (r) => {
    try {
      await e({ ...r, log: f(E.toLowerCase(), "bgGreenBright") });
    } catch (n) {
      throw l({
        message: n?.message || `Oops, guard "${E.toLowerCase()}" was failed`,
        statusCode: n?.statusCode || c.BAD_REQUEST,
        details: n?.details
      });
    }
  };
}
function AE(E) {
  return E;
}
const oE = (E, e) => ({
  name: E,
  plugin: e
});
export {
  c as StatusCode,
  IE as createApp,
  l as createError,
  aE as createGuard,
  oE as createPlugin,
  AE as createProvider,
  OE as createRouter,
  lE as createService,
  eE as extendRouterContext,
  h as isNixleError
};
