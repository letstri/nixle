import { createConsola as k } from "consola";
import { colorize as i, colors as W } from "consola/utils";
import G from "dayjs";
import $ from "callsite-record";
import { joinURL as q } from "ufo";
import { createHooks as J } from "hookable";
import K from "dotenv";
var c = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(c || {});
const X = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => e.includes(r))), Z = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => !e.includes(r))), Q = (E) => E !== Object(E), M = (...E) => {
  const e = q("", ...E), r = e.startsWith("/") ? e : `/${e}`;
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
), D = J(), z = {
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
    let a = N + i("dim", "| ") + r.slice(0, 300);
    return n || (a += `
`), a;
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
const S = (E) => $({
  forError: E,
  isCallsiteFrame: (r) => h(E) && E.statusCode < c.INTERNAL_SERVER_ERROR ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
})?.renderSync({
  renderer: z,
  stackFilter: (r) => h(E) && E.statusCode < c.INTERNAL_SERVER_ERROR ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
});
function O(E, e) {
  const r = typeof E == "string" ? E : E.message;
  return new V({
    message: r,
    statusCode: typeof E == "string" ? e || c.BAD_REQUEST : E.statusCode || c.BAD_REQUEST,
    code: typeof E == "string" ? void 0 : E.code,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const h = (E) => E instanceof V, m = async (E, e) => {
  let r = "";
  if (h(E) || E instanceof Error ? r = E.message : Q(E) ? r = E : r = `${E.constructor.name} ${JSON.stringify(E)}`, E && (!E.statusCode || E.statusCode >= c.INTERNAL_SERVER_ERROR))
    if (E instanceof Error) {
      const n = S(E), s = [
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
  await D.callHook("error", E);
}, P = (E, e) => {
  const r = G().format(), n = Q(E), s = n && E || E.message || "Internal Server Error", N = n && r || E.time || r, a = n && {} || E.details || {}, I = n && void 0 || E.code, t = {
    statusCode: e,
    message: s,
    time: N,
    details: a,
    code: I
  };
  return t.details = {
    ...t.details,
    ...Z(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
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
const C = (E) => {
  u = k(E);
}, l = (E, ...e) => {
  if (!u)
    return;
  const r = `${i("bgBlue", " Nixle ")}`, n = u[E];
  if (!n)
    throw O({
      message: `Logger method "${E}" not found`,
      statusCode: c.INTERNAL_SERVER_ERROR
    });
  n(`${r}`, ...e);
}, d = {
  info: (...E) => l("info", ...E),
  success: (...E) => l("success", ...E),
  warn: (...E) => l("warn", ...E),
  error: (...E) => l("error", ...E),
  fatal: (...E) => l("fatal", ...E),
  debug: (...E) => l("debug", ...E),
  trace: (...E) => l("trace", ...E),
  silent: (...E) => l("silent", ...E),
  log: (...E) => l("log", ...E),
  fail: (...E) => l("fail", ...E),
  verbose: (...E) => l("verbose", ...E)
}, f = (E, e = "bgWhite") => Object.fromEntries(
  Object.entries(d).map(([r, n]) => [
    r,
    (...s) => n(i(e, ` ${E} `), ...s)
  ])
);
function b(E) {
  if (!E.startsWith("/"))
    throw O("Path must start with /", c.INTERNAL_SERVER_ERROR);
  if (E.length > 1 && E.endsWith("/"))
    throw O("Path must not end with /", c.INTERNAL_SERVER_ERROR);
}
function A(E) {
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
const EE = {
  get: A("GET"),
  post: A("POST"),
  patch: A("PATCH"),
  put: A("PUT"),
  delete: A("DELETE"),
  options: A("OPTIONS")
}, g = {}, eE = (E) => {
  K.config(E), Object.keys(process.env).forEach((e) => {
    g[e] = process.env[e];
  });
}, j = {};
function rE(E) {
  Object.assign(j, E);
}
function OE(E, e) {
  b(E);
  const r = typeof e == "object";
  if (!e || r && !e.routes)
    throw O("Routes are required", c.INTERNAL_SERVER_ERROR);
  const n = r ? e.routes : e, s = r ? e.middlewares || [] : [], N = r ? e.guards || [] : [];
  return {
    path: E,
    routes: () => n({
      route: EE,
      log: f(E, "bgGreen"),
      env: g,
      ...j
    }),
    middlewares: s,
    guards: N,
    $inferRoutes: {}
  };
}
let H = {};
const nE = (E) => {
  Object.assign(H, E);
};
function aE(E, e) {
  return () => {
    try {
      return e({
        log: f(E.toLowerCase(), "bgCyan"),
        env: g,
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
const RE = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: r, plugin: n }) => {
    const s = f(r, "bgMagenta");
    n({ provider: E, log: s, extendRouterContext: rE, extendServiceContext: nE });
  });
}, iE = (E, e) => {
  const r = M(E.globalPrefix || "", e.path || ""), n = f(r, "bgGreen"), s = e.routes();
  try {
    if (s.length === 0)
      throw O("At least one router is required", c.INTERNAL_SERVER_ERROR);
    if (s.some(({ path: N, method: a, options: I }) => !N || !a || !I.handler))
      throw O(
        "Path, method and handler are required for each route",
        c.INTERNAL_SERVER_ERROR
      );
  } catch (N) {
    m(N, n), process.exit(1);
  }
  s.forEach(function({ path: a, method: I, options: t }) {
    const y = M(r, a), w = f(`${W.bold(I)} ${y}`, "bgGreen");
    E.provider.createRoute({
      method: I.toLowerCase(),
      path: y,
      async handler(o) {
        const L = {}, v = (R) => R ? L[R] || null : L, B = (R, T) => {
          typeof R == "string" ? L[R] = T : Object.assign(L, R);
        }, _ = {
          ...o,
          query: p(o.query),
          params: p(o.params),
          headers: Object.fromEntries(
            Object.entries(o.headers).filter(([, R]) => typeof R == "string").map(([R, T]) => [R.toLowerCase(), T])
          ),
          env: g,
          getData: v,
          setData: B
        };
        await D.callHook("request", o);
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
          await m(R, w);
          const T = R?.statusCode || c.INTERNAL_SERVER_ERROR;
          return o.setStatusCode(T), P(R, T);
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
          const [R, T, Y] = await Promise.all([
            t?.queryValidation?.(_.query),
            t?.paramsValidation?.(_.params),
            t?.bodyValidation?.(_.body)
          ]);
          _.query = R || _.query, _.params = T || _.params, _.body = Y || _.body;
        } catch (R) {
          const T = R?.statusCode || c.BAD_REQUEST;
          return o.setStatusCode(T), P(R, T);
        }
        try {
          const R = await t.handler(_);
          return await D.callHook("response", R), t?.statusCode && o.setStatusCode(t.statusCode), R;
        } catch (R) {
          await m(R, w);
          const T = R?.statusCode || c.INTERNAL_SERVER_ERROR;
          return o.setStatusCode(T), P(R, T);
        }
      }
    });
  });
};
function oE(E) {
  E.globalPrefix && b(E.globalPrefix), E.logger !== !1 && C(E.logger || {});
  try {
    if (!E.provider)
      throw O("Provider is required", c.INTERNAL_SERVER_ERROR);
    if (E.routers.length === 0)
      throw O("At least one router is required", c.INTERNAL_SERVER_ERROR);
  } catch (r) {
    m(r, d), process.exit(1);
  }
  E.plugins && RE(E.provider, E), eE(E.env), E.routers.forEach((r) => {
    iE(E, r);
  });
  const e = {
    app: E.provider.app,
    hooks: X(D, ["afterEach", "beforeEach", "callHook", "hook", "hookOnce"]),
    $inferRouters: {}
  };
  return d.success("🔥 Application successfully started"), e;
}
function IE(E, e) {
  return async (r) => {
    try {
      await e({ ...r, log: f(E.toLowerCase(), "bgGreenBright") });
    } catch (n) {
      throw O({
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
const fE = (E, e) => ({
  name: E,
  plugin: e
});
export {
  c as StatusCode,
  oE as createApp,
  O as createError,
  IE as createGuard,
  fE as createPlugin,
  AE as createProvider,
  OE as createRouter,
  aE as createService,
  rE as extendRouterContext,
  h as isNixleError
};
