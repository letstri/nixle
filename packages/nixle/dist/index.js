import { createConsola as d } from "consola";
import { colorize as n, colors as Y } from "consola/utils";
import u from "dayjs";
import j from "callsite-record";
import { joinURL as B } from "ufo";
import H from "mitt";
import v from "dotenv";
var T = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(T || {});
const x = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => !e.includes(r))), Q = (E) => E !== Object(E), b = (...E) => {
  const e = B("", ...E), r = e.startsWith("/") ? e : `/${e}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, M = (E) => {
  try {
    const e = JSON.parse(E);
    return typeof e == "number" || typeof e == "boolean" || e === void 0 || e === null ? e : E;
  } catch {
    return E;
  }
}, F = (E) => Object.fromEntries(
  Object.entries(E).map(([e, r]) => [
    e,
    Array.isArray(r) ? r.map(M) : M(r)
  ])
), D = H(), w = {
  syntax: {
    string: (...E) => n("green", E.join("")),
    punctuator: (...E) => n("gray", E.join("")),
    keyword: (...E) => n("cyan", E.join("")),
    number: (...E) => n("magenta", E.join("")),
    regex: (...E) => n("magenta", E.join("")),
    comment: (...E) => n("gray", n("bold", E.join(""))),
    invalid: (...E) => n("inverse", E.join(""))
  },
  codeFrame: (E) => E.slice(1),
  codeLine(E, e, r, R) {
    let _ = (e ? " > " : "   ") + n("dim", E) + " ";
    e && (_ = n("bgRed", _));
    let O = _ + n("dim", "| ") + r;
    return R || (O += `
`), O;
  },
  stackLine(E, e, r) {
    let R = `   ${n("dim", "at")} ` + E + " (" + n("blueBright", n("underline", e)) + ")";
    return r || (R += `
`), R;
  },
  stack(E) {
    return `

` + E;
  }
};
class p extends Error {
  constructor({ statusCode: e, message: r, details: R, code: i }) {
    super(), this.time = u().format(), this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = e || T.BAD_REQUEST, this.message = r, this.details = R, this.code = i;
  }
}
const $ = (E) => j({
  forError: E,
  isCallsiteFrame: (r) => f(E) && E.statusCode < T.INTERNAL_SERVER_ERROR ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
})?.renderSync({
  renderer: w,
  stackFilter: (r) => f(E) && E.statusCode < T.INTERNAL_SERVER_ERROR ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
});
function t(E, e) {
  const r = typeof E == "string" ? E : E.message;
  throw new p({
    message: r,
    statusCode: typeof E == "string" ? e || T.BAD_REQUEST : E.statusCode || T.BAD_REQUEST,
    code: typeof E == "string" ? void 0 : E.code,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const f = (E) => E instanceof p, P = (E, e) => {
  let r = "";
  if (f(E) || E instanceof Error ? r = E.message : Q(E) ? r = E : r = `${E.constructor.name} ${JSON.stringify(E)}`, E && (!E.statusCode || E.statusCode >= T.INTERNAL_SERVER_ERROR))
    if (E instanceof Error) {
      const R = $(E);
      e.fatal(n("red", r), ...R ? [`
`, R] : []);
    } else
      e.fatal(n("red", r));
  else
    e.error(n("red", r));
  D.emit("error", E);
}, g = (E, e) => {
  const r = u().format(), R = Q(E), i = R && E || E.message || "Internal Server Error", _ = R && r || E.time || r, O = R && {} || E.details || {}, s = R && void 0 || E.code, o = {
    statusCode: e,
    message: i,
    time: _,
    details: O,
    code: s
  };
  return o.details = {
    ...o.details,
    ...x(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
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
  const r = `${n("bgBlue", " Nixle ")}`, R = h[E];
  R || t({
    message: `Logger method "${E}" not found`,
    statusCode: T.INTERNAL_SERVER_ERROR
  }), R(`${r}`, ...e);
}, L = {
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
}, m = (E, e = "bgWhite") => Object.fromEntries(
  Object.entries(L).map(([r, R]) => [
    r,
    (...i) => R(n(e, ` ${E} `), ...i)
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
}, k = (E, e) => a("GET", E, e), q = (E, e) => a("POST", E, e), X = (E, e) => a("PATCH", E, e), K = (E, e) => a("PUT", E, e), J = (E, e) => a("DELETE", E, e), Z = (E, e) => a("OPTIONS", E, e), z = {
  get: k,
  post: q,
  patch: X,
  put: K,
  delete: J,
  options: Z
}, U = {}, S = (E) => {
  v.config(E), Object.keys(process.env).forEach((e) => {
    U[e] = process.env[e];
  });
}, G = {}, C = (E) => {
  Object.assign(G, E);
};
function NE(E, e) {
  const r = typeof e == "object";
  (!e || r && !e.routes) && t({
    message: "Routes are required",
    statusCode: T.INTERNAL_SERVER_ERROR
  });
  const R = r ? e.routes : e, i = r ? e.guards || [] : [];
  return {
    path: E,
    routes: () => R({
      route: z,
      log: m(E, "bgGreen"),
      env: U,
      ...G
    }),
    guards: i
  };
}
let V = {};
const EE = (E) => {
  Object.assign(V, E);
};
function OE(E, e) {
  return () => e({
    log: m(E, "bgCyan"),
    env: U,
    ...V
  });
}
const eE = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: r, plugin: R }) => {
    const i = m(r, "bgMagenta");
    R({ provider: E, log: i, extendRouterContext: C, extendServiceContext: EE }), L.success(`🚀 ${n("bgBlue", ` ${r.trim()} `)} plugin successfully loaded`);
  });
}, rE = (E, e) => {
  const r = b(E.globalPrefix || "", e.path || ""), R = m(r, "bgGreen"), i = e.routes();
  try {
    i.length === 0 && t({
      message: "At least one router is required",
      statusCode: T.INTERNAL_SERVER_ERROR
    }), i.some(({ path: _, method: O, options: s }) => !_ || !O || !s.handler) && t({
      message: "Path, method and handler are required for each route",
      statusCode: T.INTERNAL_SERVER_ERROR
    });
  } catch (_) {
    P(_, R), process.exit(1);
  }
  i.forEach(({ path: _, method: O, options: s }) => {
    const o = b(r, _), y = m(`${Y.bold(O)} ${o}`, "bgGreen");
    E.provider.createRoute({
      method: O.toLowerCase(),
      path: o,
      async handler(I) {
        D.emit("request", I);
        const l = {
          ...I,
          query: F(I.query),
          params: F(I.params)
        };
        try {
          await s?.middleware?.(l);
        } catch (c) {
          const A = c?.statusCode || T.INTERNAL_SERVER_ERROR;
          return I.setStatusCode(A), g(c, A);
        }
        try {
          e.guards.length && await Promise.all(e.guards.map((c) => c({ ...l, env: U }))), s?.guards?.length && await Promise.all(s.guards.map((c) => c({ ...l, env: U }))), await Promise.all([
            s?.queryValidation?.(l.query),
            s?.paramsValidation?.(l.params),
            s?.bodyValidation?.(l.body)
          ]);
        } catch (c) {
          const A = c?.statusCode || T.BAD_REQUEST;
          return I.setStatusCode(A), g(c, A);
        }
        try {
          const c = await s.handler(l);
          return D.emit("response", c), s?.statusCode && I.setStatusCode(s.statusCode), c;
        } catch (c) {
          const A = c?.statusCode || T.INTERNAL_SERVER_ERROR;
          return P(c, y), I.setStatusCode(A), g(c, A);
        }
      }
    }), y.success("🚏 Successfully registered");
  });
};
function IE(E) {
  E.logger !== !1 && W(E.logger || {});
  try {
    E.provider || t({
      message: "Provider is required",
      statusCode: T.INTERNAL_SERVER_ERROR
    }), E.routers.length === 0 && t({
      message: "At least one router is required",
      statusCode: T.INTERNAL_SERVER_ERROR
    });
  } catch (r) {
    P(r, L), process.exit(1);
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
  return L.success(`🔥 ${n("underline", "Application successfully started")}`), e;
}
function AE(E, e) {
  return async (r) => {
    try {
      await e(r);
    } catch (R) {
      t({
        message: R?.message || `Oops, ${E} guard was failed`,
        statusCode: R?.statusCode || T.BAD_REQUEST,
        details: R?.details
      });
    }
  };
}
function lE(E) {
  return E;
}
const tE = (E, e) => ({
  name: E,
  plugin: e
});
export {
  T as StatusCode,
  IE as createApp,
  t as createError,
  AE as createGuard,
  tE as createPlugin,
  lE as createProvider,
  NE as createRouter,
  OE as createService,
  C as extendRouterContext,
  f as isNixleError
};
