import { createConsola as d } from "consola";
import { colorize as R, colors as Y } from "consola/utils";
import F from "dayjs";
import j from "callsite-record";
import { joinURL as v } from "ufo";
import B from "mitt";
import H from "dotenv";
var T = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(T || {});
const w = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => !e.includes(r))), Q = (E) => E !== Object(E), b = (...E) => {
  const e = v("", ...E), r = e.startsWith("/") ? e : `/${e}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, y = (E) => {
  try {
    const e = JSON.parse(E);
    return typeof e == "number" || typeof e == "boolean" || e === void 0 || e === null ? e : E;
  } catch {
    return E;
  }
}, M = (E) => Object.fromEntries(
  Object.entries(E).map(([e, r]) => [
    e,
    Array.isArray(r) ? r.map(y) : y(r)
  ])
), D = B(), x = {
  syntax: {
    string: (...E) => R("green", E.join("")),
    punctuator: (...E) => R("gray", E.join("")),
    keyword: (...E) => R("cyan", E.join("")),
    number: (...E) => R("magenta", E.join("")),
    regex: (...E) => R("magenta", E.join("")),
    comment: (...E) => R("gray", R("bold", E.join(""))),
    invalid: (...E) => R("inverse", E.join(""))
  },
  codeFrame: (E) => E.slice(1),
  codeLine(E, e, r, n) {
    let s = (e ? " > " : "   ") + R("dim", E) + " ";
    e && (s = R("bgRed", s));
    let O = s + R("dim", "| ") + r;
    return n || (O += `
`), O;
  },
  stackLine(E, e, r) {
    let n = `   ${R("dim", "at")} ` + E + " (" + R("blueBright", R("underline", e)) + ")";
    return r || (n += `
`), n;
  },
  stack(E) {
    return `

` + E;
  }
};
class p extends Error {
  constructor({ statusCode: e, message: r, details: n, code: c }) {
    super(), this.time = F().format(), this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = e || T.BAD_REQUEST, this.message = r, this.details = n, this.code = c;
  }
}
const $ = (E) => j({
  forError: E,
  isCallsiteFrame: (r) => g(E) && E.statusCode < T.INTERNAL_SERVER_ERROR ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
})?.renderSync({
  renderer: x,
  stackFilter: (r) => g(E) && E.statusCode < T.INTERNAL_SERVER_ERROR ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
});
function l(E, e) {
  const r = typeof E == "string" ? E : E.message;
  return new p({
    message: r,
    statusCode: typeof E == "string" ? e || T.BAD_REQUEST : E.statusCode || T.BAD_REQUEST,
    code: typeof E == "string" ? void 0 : E.code,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const g = (E) => E instanceof p, P = (E, e) => {
  let r = "";
  if (g(E) || E instanceof Error ? r = E.message : Q(E) ? r = E : r = `${E.constructor.name} ${JSON.stringify(E)}`, E && (!E.statusCode || E.statusCode >= T.INTERNAL_SERVER_ERROR))
    if (E instanceof Error) {
      const n = $(E);
      e.fatal(R("red", r), ...n ? [`
`, n] : []);
    } else
      e.fatal(R("red", r));
  else
    e.error(R("red", r));
  D.emit("error", E);
}, L = (E, e) => {
  const r = F().format(), n = Q(E), c = n && E || E.message || "Internal Server Error", s = n && r || E.time || r, O = n && {} || E.details || {}, _ = n && void 0 || E.code, o = {
    statusCode: e,
    message: c,
    time: s,
    details: O,
    code: _
  };
  return o.details = {
    ...o.details,
    ...w(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
      "message",
      "name",
      "stack",
      "statusCode",
      "time",
      "details",
      "code"
    ])
  }, o;
};
let h;
const W = (E) => {
  h = d(E);
}, N = (E, ...e) => {
  if (!h)
    return;
  const r = `${R("bgBlue", " Nixle ")}`, n = h[E];
  if (!n)
    throw l({
      message: `Logger method "${E}" not found`,
      statusCode: T.INTERNAL_SERVER_ERROR
    });
  n(`${r}`, ...e);
}, U = {
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
}, f = (E, e = "bgWhite") => Object.fromEntries(
  Object.entries(U).map(([r, n]) => [
    r,
    (...c) => n(R(e, ` ${E} `), ...c)
  ])
), a = (E, e, r) => typeof r == "function" ? {
  path: e,
  method: E,
  options: {
    handler: r
  }
} : {
  path: e,
  method: E,
  options: r
};
function k(E, e) {
  return a("GET", E, e);
}
function q(E, e) {
  return a("POST", E, e);
}
function X(E, e) {
  return a("PATCH", E, e);
}
function K(E, e) {
  return a("PUT", E, e);
}
function J(E, e) {
  return a("DELETE", E, e);
}
function Z(E, e) {
  return a("OPTIONS", E, e);
}
const z = {
  get: k,
  post: q,
  patch: X,
  put: K,
  delete: J,
  options: Z
}, m = {}, S = (E) => {
  H.config(E), Object.keys(process.env).forEach((e) => {
    m[e] = process.env[e];
  });
}, G = {}, C = (E) => {
  Object.assign(G, E);
};
function NE(E, e) {
  const r = typeof e == "object";
  if (!e || r && !e.routes)
    throw l({
      message: "Routes are required",
      statusCode: T.INTERNAL_SERVER_ERROR
    });
  const n = r ? e.routes : e, c = r ? e.guards || [] : [];
  return {
    path: E,
    routes: () => n({
      route: z,
      log: f(E, "bgGreen"),
      env: m,
      ...G
    }),
    guards: c
  };
}
let V = {};
const EE = (E) => {
  Object.assign(V, E);
};
function OE(E, e) {
  function r() {
    return e({
      log: f(E, "bgCyan"),
      env: m,
      ...V
    });
  }
  return r.$inferMethods = {}, r.$inferReturns = {}, r;
}
const eE = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: r, plugin: n }) => {
    const c = f(r, "bgMagenta");
    n({ provider: E, log: c, extendRouterContext: C, extendServiceContext: EE }), U.success(`🚀 ${R("bgBlue", ` ${r.trim()} `)} plugin successfully loaded`);
  });
}, rE = (E, e) => {
  const r = b(E.globalPrefix || "", e.path || ""), n = f(r, "bgGreen"), c = e.routes();
  try {
    if (c.length === 0)
      throw l({
        message: "At least one router is required",
        statusCode: T.INTERNAL_SERVER_ERROR
      });
    if (c.some(({ path: s, method: O, options: _ }) => !s || !O || !_.handler))
      throw l({
        message: "Path, method and handler are required for each route",
        statusCode: T.INTERNAL_SERVER_ERROR
      });
  } catch (s) {
    P(s, n), process.exit(1);
  }
  c.forEach(({ path: s, method: O, options: _ }) => {
    const o = b(r, s), u = f(`${Y.bold(O)} ${o}`, "bgGreen");
    E.provider.createRoute({
      method: O.toLowerCase(),
      path: o,
      async handler(t) {
        D.emit("request", t);
        const A = {
          ...t,
          query: M(t.query),
          params: M(t.params)
        };
        try {
          await _?.middleware?.(A);
        } catch (i) {
          const I = i?.statusCode || T.INTERNAL_SERVER_ERROR;
          return t.setStatusCode(I), L(i, I);
        }
        try {
          e.guards.length && await Promise.all(e.guards.map((i) => i({ ...A, env: m }))), _?.guards?.length && await Promise.all(_.guards.map((i) => i({ ...A, env: m }))), await Promise.all([
            _?.queryValidation?.(A.query),
            _?.paramsValidation?.(A.params),
            _?.bodyValidation?.(A.body)
          ]);
        } catch (i) {
          const I = i?.statusCode || T.BAD_REQUEST;
          return t.setStatusCode(I), L(i, I);
        }
        try {
          const i = await _.handler(A);
          return D.emit("response", i), _?.statusCode && t.setStatusCode(_.statusCode), i;
        } catch (i) {
          const I = i?.statusCode || T.INTERNAL_SERVER_ERROR;
          return P(i, u), t.setStatusCode(I), L(i, I);
        }
      }
    }), u.info("🚏 Route registered");
  });
};
function tE(E) {
  E.logger !== !1 && W(E.logger || {});
  try {
    if (!E.provider)
      throw l({
        message: "Provider is required",
        statusCode: T.INTERNAL_SERVER_ERROR
      });
    if (E.routers.length === 0)
      throw l({
        message: "At least one router is required",
        statusCode: T.INTERNAL_SERVER_ERROR
      });
  } catch (r) {
    P(r, U), process.exit(1);
  }
  E.plugins && eE(E.provider, E), S(E.env), E.routers.forEach((r) => {
    rE(E, r);
  }), E.provider.globalMiddleware(({ setHeader: r }) => {
    r("X-Powered-By", "Nixle");
  });
  const e = {
    app: E.provider.app,
    events: {
      on: D.on,
      emit: D.emit
    }
  };
  return U.success(`🔥 ${R("underline", "Application successfully started")}`), e;
}
function IE(E, e) {
  return async (r) => {
    try {
      await e(r);
    } catch (n) {
      throw l({
        message: n?.message || `Oops, ${E} guard was failed`,
        statusCode: n?.statusCode || T.BAD_REQUEST,
        details: n?.details
      });
    }
  };
}
function AE(E) {
  return E;
}
const lE = (E, e) => ({
  name: E,
  plugin: e
});
export {
  T as StatusCode,
  tE as createApp,
  l as createError,
  IE as createGuard,
  lE as createPlugin,
  AE as createProvider,
  NE as createRouter,
  OE as createService,
  C as extendRouterContext,
  g as isNixleError
};
