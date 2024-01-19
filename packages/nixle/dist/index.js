import { createConsola as d } from "consola";
import { colorize as T, colors as B } from "consola/utils";
import Q from "dayjs";
import x from "callsite-record";
import { joinURL as W } from "ufo";
import $ from "mitt";
import q from "dotenv";
var n = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(n || {});
const k = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => !e.includes(r))), G = (E) => E !== Object(E), F = (...E) => {
  const e = W("", ...E), r = e.startsWith("/") ? e : `/${e}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, V = (E) => {
  try {
    const e = JSON.parse(E);
    return typeof e == "number" || typeof e == "boolean" || e === void 0 || e === null ? e : E;
  } catch {
    return E;
  }
}, w = (E) => Object.fromEntries(
  Object.entries(E).map(([e, r]) => [
    e,
    Array.isArray(r) ? r.map(V) : V(r)
  ])
), f = $(), X = {
  syntax: {
    string: (...E) => T("green", E.join("")),
    punctuator: (...E) => T("gray", E.join("")),
    keyword: (...E) => T("cyan", E.join("")),
    number: (...E) => T("magenta", E.join("")),
    regex: (...E) => T("magenta", E.join("")),
    comment: (...E) => T("gray", T("bold", E.join(""))),
    invalid: (...E) => T("inverse", E.join(""))
  },
  codeFrame: (E) => E.slice(1),
  codeLine(E, e, r, R) {
    let t = (e ? " > " : "   ") + T("dim", E) + " ";
    e && (t = T("bgRed", t));
    let A = t + T("dim", "| ") + r;
    return R || (A += `
`), A;
  },
  stackLine(E, e, r) {
    let R = `   ${T("dim", "at")} ` + E + " (" + T("blueBright", T("underline", e)) + ")";
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
    super(), this.time = Q().format(), this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = e || n.BAD_REQUEST, this.message = r, this.details = R, this.code = i;
  }
}
const K = (E) => x({
  forError: E,
  isCallsiteFrame: (r) => b(E) && E.statusCode < n.INTERNAL_SERVER_ERROR ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
})?.renderSync({
  renderer: X,
  stackFilter: (r) => b(E) && E.statusCode < n.INTERNAL_SERVER_ERROR ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
});
function N(E, e) {
  const r = typeof E == "string" ? E : E.message;
  return new p({
    message: r,
    statusCode: typeof E == "string" ? e || n.BAD_REQUEST : E.statusCode || n.BAD_REQUEST,
    code: typeof E == "string" ? void 0 : E.code,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const b = (E) => E instanceof p, y = (E, e) => {
  let r = "";
  if (b(E) || E instanceof Error ? r = E.message : G(E) ? r = E : r = `${E.constructor.name} ${JSON.stringify(E)}`, E && (!E.statusCode || E.statusCode >= n.INTERNAL_SERVER_ERROR))
    if (E instanceof Error) {
      const R = K(E);
      e.fatal(T("red", r), ...R ? [`
`, R] : []);
    } else
      e.fatal(T("red", r));
  else
    e.error(T("red", r));
  f.emit("error", E);
}, h = (E, e) => {
  const r = Q().format(), R = G(E), i = R && E || E.message || "Internal Server Error", t = R && r || E.time || r, A = R && {} || E.details || {}, c = R && void 0 || E.code, o = {
    statusCode: e,
    message: i,
    time: t,
    details: A,
    code: c
  };
  return o.details = {
    ...o.details,
    ...k(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
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
let u;
const J = (E) => {
  u = d(E);
}, O = (E, ...e) => {
  if (!u)
    return;
  const r = `${T("bgBlue", " Nixle ")}`, R = u[E];
  if (!R)
    throw N({
      message: `Logger method "${E}" not found`,
      statusCode: n.INTERNAL_SERVER_ERROR
    });
  R(`${r}`, ...e);
}, M = {
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
}, m = (E, e = "bgWhite") => Object.fromEntries(
  Object.entries(M).map(([r, R]) => [
    r,
    (...i) => R(T(e, ` ${E} `), ...i)
  ])
);
function a(E) {
  function e(r, R) {
    if (!r.startsWith("/"))
      throw N("Path must start with /", n.INTERNAL_SERVER_ERROR);
    if (r.endsWith("/"))
      throw N("Path must not end with /", n.INTERNAL_SERVER_ERROR);
    return {
      path: r,
      method: E,
      options: typeof R == "function" ? { handler: R } : R,
      $infer: {}
    };
  }
  return e;
}
const Z = {
  get: a("GET"),
  post: a("POST"),
  patch: a("PATCH"),
  put: a("PUT"),
  delete: a("DELETE"),
  options: a("OPTIONS")
}, L = {}, z = (E) => {
  q.config(E), Object.keys(process.env).forEach((e) => {
    L[e] = process.env[e];
  });
}, Y = {}, S = (E) => {
  Object.assign(Y, E);
};
function NE(E, e) {
  if (!E.startsWith("/"))
    throw N("Path must start with /", n.INTERNAL_SERVER_ERROR);
  if (E.endsWith("/"))
    throw N("Path must not end with /", n.INTERNAL_SERVER_ERROR);
  const r = typeof e == "object";
  if (!e || r && !e.routes)
    throw N("Routes are required", n.INTERNAL_SERVER_ERROR);
  const R = r ? e.routes : e, i = r ? e.guards || [] : [];
  return {
    path: E,
    routes: () => R({
      route: Z,
      log: m(E, "bgGreen"),
      env: L,
      ...Y
    }),
    guards: i,
    $inferRoutes: {}
  };
}
let j = {};
const C = (E) => {
  Object.assign(j, E);
};
function tE(E, e) {
  function r() {
    return e({
      log: m(E, "bgCyan"),
      env: L,
      ...j
    });
  }
  return r;
}
const EE = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: r, plugin: R }) => {
    const i = m(r, "bgMagenta");
    R({ provider: E, log: i, extendRouterContext: S, extendServiceContext: C });
  });
}, rE = (E, e) => {
  const r = F(E.globalPrefix || "", e.path || ""), R = m(r, "bgGreen"), i = e.routes();
  try {
    if (i.length === 0)
      throw N("At least one router is required", n.INTERNAL_SERVER_ERROR);
    if (i.some(({ path: t, method: A, options: c }) => !t || !A || !c.handler))
      throw N(
        "Path, method and handler are required for each route",
        n.INTERNAL_SERVER_ERROR
      );
  } catch (t) {
    y(t, R), process.exit(1);
  }
  i.forEach(({ path: t, method: A, options: c }) => {
    const o = F(r, t), v = m(`${B.bold(A)} ${o}`, "bgGreen");
    E.provider.createRoute({
      method: A.toLowerCase(),
      path: o,
      async handler(l) {
        f.emit("request", l);
        const s = {
          ...l,
          query: w(l.query),
          params: w(l.params)
        };
        try {
          await c?.middleware?.(s);
        } catch (_) {
          const I = _?.statusCode || n.INTERNAL_SERVER_ERROR;
          return l.setStatusCode(I), h(_, I);
        }
        let D = s.query, P = s.params, U = s.body;
        try {
          e.guards.length && await Promise.all(e.guards.map((g) => g({ ...s, env: L }))), c?.guards?.length && await Promise.all(c.guards.map((g) => g({ ...s, env: L })));
          const [_, I, H] = await Promise.all([
            c?.queryValidation?.(s.query),
            c?.paramsValidation?.(s.params),
            c?.bodyValidation?.(s.body)
          ]);
          D = _ || D, P = I || P, U = H || U;
        } catch (_) {
          const I = _?.statusCode || n.BAD_REQUEST;
          return l.setStatusCode(I), h(_, I);
        }
        try {
          const _ = await c.handler({
            ...s,
            query: D,
            params: P,
            body: U
          });
          return f.emit("response", _), c?.statusCode && l.setStatusCode(c.statusCode), _;
        } catch (_) {
          const I = _?.statusCode || n.INTERNAL_SERVER_ERROR;
          return y(_, v), l.setStatusCode(I), h(_, I);
        }
      }
    });
  });
};
function OE(E) {
  if (E.globalPrefix) {
    if (!E.globalPrefix.startsWith("/"))
      throw N("Path must start with /", n.INTERNAL_SERVER_ERROR);
    if (E.globalPrefix.endsWith("/"))
      throw N("Path must not end with /", n.INTERNAL_SERVER_ERROR);
  }
  E.logger !== !1 && J(E.logger || {});
  try {
    if (!E.provider)
      throw N("Provider is required", n.INTERNAL_SERVER_ERROR);
    if (E.routers.length === 0)
      throw N("At least one router is required", n.INTERNAL_SERVER_ERROR);
  } catch (r) {
    y(r, M), process.exit(1);
  }
  E.plugins && EE(E.provider, E), z(E.env), E.routers.forEach((r) => {
    rE(E, r);
  }), E.provider.globalMiddleware(({ setHeader: r }) => {
    r("X-Powered-By", "Nixle");
  });
  const e = {
    app: E.provider.app,
    events: {
      on: f.on,
      emit: f.emit
    },
    $inferRouters: {}
  };
  return M.success("🔥 Application successfully started"), e;
}
function sE(E, e) {
  return async (r) => {
    try {
      await e(r);
    } catch (R) {
      throw N({
        message: R?.message || `Oops, ${E} guard was failed`,
        statusCode: R?.statusCode || n.BAD_REQUEST,
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
  n as StatusCode,
  OE as createApp,
  N as createError,
  sE as createGuard,
  AE as createPlugin,
  IE as createProvider,
  NE as createRouter,
  tE as createService,
  S as extendRouterContext,
  b as isNixleError
};
