import { createConsola as w } from "consola";
import { colorize as n, colors as d } from "consola/utils";
import G from "dayjs";
import x from "callsite-record";
import { joinURL as $ } from "ufo";
import q from "mitt";
import W from "dotenv";
var T = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(T || {});
const k = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => !e.includes(r))), V = (E) => E !== Object(E), p = (...E) => {
  const e = $("", ...E), r = e.startsWith("/") ? e : `/${e}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, u = (E) => {
  try {
    const e = JSON.parse(E);
    return typeof e == "number" || typeof e == "boolean" || e === void 0 || e === null ? e : E;
  } catch {
    return E;
  }
}, Q = (E) => Object.fromEntries(
  Object.entries(E).map(([e, r]) => [
    e,
    Array.isArray(r) ? r.map(u) : u(r)
  ])
), D = q(), X = {
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
    let N = (e ? " > " : "   ") + n("dim", E) + " ";
    e && (N = n("bgRed", N));
    let A = N + n("dim", "| ") + r;
    return R || (A += `
`), A;
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
class Y extends Error {
  constructor({ statusCode: e, message: r, details: R, code: c }) {
    super(), this.time = G().format(), this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = e || T.BAD_REQUEST, this.message = r, this.details = R, this.code = c;
  }
}
const K = (E) => x({
  forError: E,
  isCallsiteFrame: (r) => y(E) && E.statusCode < T.INTERNAL_SERVER_ERROR ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
})?.renderSync({
  renderer: X,
  stackFilter: (r) => y(E) && E.statusCode < T.INTERNAL_SERVER_ERROR ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
});
function l(E, e) {
  const r = typeof E == "string" ? E : E.message;
  return new Y({
    message: r,
    statusCode: typeof E == "string" ? e || T.BAD_REQUEST : E.statusCode || T.BAD_REQUEST,
    code: typeof E == "string" ? void 0 : E.code,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const y = (E) => E instanceof Y, b = (E, e) => {
  let r = "";
  if (y(E) || E instanceof Error ? r = E.message : V(E) ? r = E : r = `${E.constructor.name} ${JSON.stringify(E)}`, E && (!E.statusCode || E.statusCode >= T.INTERNAL_SERVER_ERROR))
    if (E instanceof Error) {
      const R = K(E);
      e.fatal(n("red", r), ...R ? [`
`, R] : []);
    } else
      e.fatal(n("red", r));
  else
    e.error(n("red", r));
  D.emit("error", E);
}, h = (E, e) => {
  const r = G().format(), R = V(E), c = R && E || E.message || "Internal Server Error", N = R && r || E.time || r, A = R && {} || E.details || {}, _ = R && void 0 || E.code, o = {
    statusCode: e,
    message: c,
    time: N,
    details: A,
    code: _
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
let M;
const J = (E) => {
  M = w(E);
}, O = (E, ...e) => {
  if (!M)
    return;
  const r = `${n("bgBlue", " Nixle ")}`, R = M[E];
  if (!R)
    throw l({
      message: `Logger method "${E}" not found`,
      statusCode: T.INTERNAL_SERVER_ERROR
    });
  R(`${r}`, ...e);
}, F = {
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
  Object.entries(F).map(([r, R]) => [
    r,
    (...c) => R(n(e, ` ${E} `), ...c)
  ])
);
function a(E) {
  function e(r, R) {
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
}, U = {}, z = (E) => {
  W.config(E), Object.keys(process.env).forEach((e) => {
    U[e] = process.env[e];
  });
}, j = {}, S = (E) => {
  Object.assign(j, E);
};
function NE(E, e) {
  const r = typeof e == "object";
  if (!e || r && !e.routes)
    throw l("Routes are required", T.INTERNAL_SERVER_ERROR);
  const R = r ? e.routes : e, c = r ? e.guards || [] : [];
  return {
    path: E,
    routes: () => R({
      route: Z,
      log: m(E, "bgGreen"),
      env: U,
      ...j
    }),
    guards: c,
    $inferRoutes: {}
  };
}
let v = {};
const C = (E) => {
  Object.assign(v, E);
};
function OE(E, e) {
  function r() {
    return e({
      log: m(E, "bgCyan"),
      env: U,
      ...v
    });
  }
  return r;
}
const EE = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: r, plugin: R }) => {
    const c = m(r, "bgMagenta");
    R({ provider: E, log: c, extendRouterContext: S, extendServiceContext: C });
  });
}, eE = (E, e) => {
  const r = p(E.globalPrefix || "", e.path || ""), R = m(r, "bgGreen"), c = e.routes();
  try {
    if (c.length === 0)
      throw l({
        message: "At least one router is required",
        statusCode: T.INTERNAL_SERVER_ERROR
      });
    if (c.some(({ path: N, method: A, options: _ }) => !N || !A || !_.handler))
      throw l({
        message: "Path, method and handler are required for each route",
        statusCode: T.INTERNAL_SERVER_ERROR
      });
  } catch (N) {
    b(N, R), process.exit(1);
  }
  c.forEach(({ path: N, method: A, options: _ }) => {
    const o = p(r, N), H = m(`${d.bold(A)} ${o}`, "bgGreen");
    E.provider.createRoute({
      method: A.toLowerCase(),
      path: o,
      async handler(t) {
        D.emit("request", t);
        const s = {
          ...t,
          query: Q(t.query),
          params: Q(t.params)
        };
        try {
          await _?.middleware?.(s);
        } catch (i) {
          const I = i?.statusCode || T.INTERNAL_SERVER_ERROR;
          return t.setStatusCode(I), h(i, I);
        }
        let L = s.query, f = s.params, P = s.body;
        try {
          e.guards.length && await Promise.all(e.guards.map((g) => g({ ...s, env: U }))), _?.guards?.length && await Promise.all(_.guards.map((g) => g({ ...s, env: U })));
          const [i, I, B] = await Promise.all([
            _?.queryValidation?.(s.query),
            _?.paramsValidation?.(s.params),
            _?.bodyValidation?.(s.body)
          ]);
          L = i || L, f = I || f, P = B || P;
        } catch (i) {
          const I = i?.statusCode || T.BAD_REQUEST;
          return t.setStatusCode(I), h(i, I);
        }
        try {
          const i = await _.handler({
            ...s,
            query: L,
            params: f,
            body: P
          });
          return D.emit("response", i), _?.statusCode && t.setStatusCode(_.statusCode), i;
        } catch (i) {
          const I = i?.statusCode || T.INTERNAL_SERVER_ERROR;
          return b(i, H), t.setStatusCode(I), h(i, I);
        }
      }
    });
  });
};
function sE(E) {
  E.logger !== !1 && J(E.logger || {});
  try {
    if (!E.provider)
      throw l("Provider is required", T.INTERNAL_SERVER_ERROR);
    if (E.routers.length === 0)
      throw l("At least one router is required", T.INTERNAL_SERVER_ERROR);
  } catch (r) {
    b(r, F), process.exit(1);
  }
  E.plugins && EE(E.provider, E), z(E.env), E.routers.forEach((r) => {
    eE(E, r);
  }), E.provider.globalMiddleware(({ setHeader: r }) => {
    r("X-Powered-By", "Nixle");
  });
  const e = {
    app: E.provider.app,
    events: {
      on: D.on,
      emit: D.emit
    },
    $inferRouters: {}
  };
  return F.success("🔥 Application successfully started"), e;
}
function IE(E, e) {
  return async (r) => {
    try {
      await e(r);
    } catch (R) {
      throw l({
        message: R?.message || `Oops, ${E} guard was failed`,
        statusCode: R?.statusCode || T.BAD_REQUEST,
        details: R?.details
      });
    }
  };
}
function AE(E) {
  return E;
}
const tE = (E, e) => ({
  name: E,
  plugin: e
});
export {
  T as StatusCode,
  sE as createApp,
  l as createError,
  IE as createGuard,
  tE as createPlugin,
  AE as createProvider,
  NE as createRouter,
  OE as createService,
  S as extendRouterContext,
  y as isNixleError
};
