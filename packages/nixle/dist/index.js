import { createConsola as H } from "consola";
import { colorize as R, colors as w } from "consola/utils";
import V from "dayjs";
import x from "callsite-record";
import { joinURL as $ } from "ufo";
import q from "mitt";
import W from "dotenv";
var T = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(T || {});
const k = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => !e.includes(r))), Y = (E) => E !== Object(E), p = (...E) => {
  const e = $("", ...E), r = e.startsWith("/") ? e : `/${e}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, Q = (E) => {
  try {
    const e = JSON.parse(E);
    return typeof e == "number" || typeof e == "boolean" || e === void 0 || e === null ? e : E;
  } catch {
    return E;
  }
}, G = (E) => Object.fromEntries(
  Object.entries(E).map(([e, r]) => [
    e,
    Array.isArray(r) ? r.map(Q) : Q(r)
  ])
), f = q(), X = {
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
    let N = (e ? " > " : "   ") + R("dim", E) + " ";
    e && (N = R("bgRed", N));
    let I = N + R("dim", "| ") + r;
    return n || (I += `
`), I;
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
class d extends Error {
  constructor({ statusCode: e, message: r, details: n, code: i }) {
    super(), this.time = V().format(), this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = e || T.BAD_REQUEST, this.message = r, this.details = n, this.code = i;
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
  return new d({
    message: r,
    statusCode: typeof E == "string" ? e || T.BAD_REQUEST : E.statusCode || T.BAD_REQUEST,
    code: typeof E == "string" ? void 0 : E.code,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const y = (E) => E instanceof d, b = (E, e) => {
  let r = "";
  if (y(E) || E instanceof Error ? r = E.message : Y(E) ? r = E : r = `${E.constructor.name} ${JSON.stringify(E)}`, E && (!E.statusCode || E.statusCode >= T.INTERNAL_SERVER_ERROR))
    if (E instanceof Error) {
      const n = K(E);
      e.fatal(R("red", r), ...n ? [`
`, n] : []);
    } else
      e.fatal(R("red", r));
  else
    e.error(R("red", r));
  f.emit("error", E);
}, u = (E, e) => {
  const r = V().format(), n = Y(E), i = n && E || E.message || "Internal Server Error", N = n && r || E.time || r, I = n && {} || E.details || {}, _ = n && void 0 || E.code, o = {
    statusCode: e,
    message: i,
    time: N,
    details: I,
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
  M = H(E);
}, s = (E, ...e) => {
  if (!M)
    return;
  const r = `${R("bgBlue", " Nixle ")}`, n = M[E];
  if (!n)
    throw l({
      message: `Logger method "${E}" not found`,
      statusCode: T.INTERNAL_SERVER_ERROR
    });
  n(`${r}`, ...e);
}, U = {
  info: (...E) => s("info", ...E),
  success: (...E) => s("success", ...E),
  warn: (...E) => s("warn", ...E),
  error: (...E) => s("error", ...E),
  fatal: (...E) => s("fatal", ...E),
  debug: (...E) => s("debug", ...E),
  trace: (...E) => s("trace", ...E),
  silent: (...E) => s("silent", ...E),
  log: (...E) => s("log", ...E),
  fail: (...E) => s("fail", ...E),
  verbose: (...E) => s("verbose", ...E)
}, D = (E, e = "bgWhite") => Object.fromEntries(
  Object.entries(U).map(([r, n]) => [
    r,
    (...i) => n(R(e, ` ${E} `), ...i)
  ])
), a = (E, e, r) => {
  const n = {};
  return typeof r == "function" ? {
    path: e,
    method: E,
    options: {
      handler: r
    },
    $infer: n
  } : {
    path: e,
    method: E,
    options: r,
    $infer: n
  };
};
function Z(E, e) {
  return a("GET", E, e);
}
function z(E, e) {
  return a("POST", E, e);
}
function S(E, e) {
  return a("PATCH", E, e);
}
function C(E, e) {
  return a("PUT", E, e);
}
function EE(E, e) {
  return a("DELETE", E, e);
}
function eE(E, e) {
  return a("OPTIONS", E, e);
}
const rE = {
  get: Z,
  post: z,
  patch: S,
  put: C,
  delete: EE,
  options: eE
}, m = {}, nE = (E) => {
  W.config(E), Object.keys(process.env).forEach((e) => {
    m[e] = process.env[e];
  });
}, j = {}, RE = (E) => {
  Object.assign(j, E);
};
function lE(E, e) {
  const r = typeof e == "object";
  if (!e || r && !e.routes)
    throw l("Routes are required", T.INTERNAL_SERVER_ERROR);
  const n = r ? e.routes : e, i = r ? e.guards || [] : [];
  return {
    path: E,
    routes: () => n({
      route: rE,
      log: D(E, "bgGreen"),
      env: m,
      ...j
    }),
    guards: i,
    $inferRoutes: {}
  };
}
let v = {};
const TE = (E) => {
  Object.assign(v, E);
};
function oE(E, e) {
  function r() {
    return e({
      log: D(E, "bgCyan"),
      env: m,
      ...v
    });
  }
  return r;
}
const iE = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: r, plugin: n }) => {
    const i = D(r, "bgMagenta");
    n({ provider: E, log: i, extendRouterContext: RE, extendServiceContext: TE }), U.success(`🚀 ${R("bgBlue", ` ${r.trim()} `)} plugin successfully loaded`);
  });
}, cE = (E, e) => {
  const r = p(E.globalPrefix || "", e.path || ""), n = D(r, "bgGreen"), i = e.routes();
  try {
    if (i.length === 0)
      throw l({
        message: "At least one router is required",
        statusCode: T.INTERNAL_SERVER_ERROR
      });
    if (i.some(({ path: N, method: I, options: _ }) => !N || !I || !_.handler))
      throw l({
        message: "Path, method and handler are required for each route",
        statusCode: T.INTERNAL_SERVER_ERROR
      });
  } catch (N) {
    b(N, n), process.exit(1);
  }
  i.forEach(({ path: N, method: I, options: _ }) => {
    const o = p(r, N), F = D(`${w.bold(I)} ${o}`, "bgGreen");
    E.provider.createRoute({
      method: I.toLowerCase(),
      path: o,
      async handler(A) {
        f.emit("request", A);
        const O = {
          ...A,
          query: G(A.query),
          params: G(A.params)
        };
        try {
          await _?.middleware?.(O);
        } catch (c) {
          const t = c?.statusCode || T.INTERNAL_SERVER_ERROR;
          return A.setStatusCode(t), u(c, t);
        }
        let L = O.query, g = O.params, P = O.body;
        try {
          e.guards.length && await Promise.all(e.guards.map((h) => h({ ...O, env: m }))), _?.guards?.length && await Promise.all(_.guards.map((h) => h({ ...O, env: m })));
          const [c, t, B] = await Promise.all([
            _?.queryValidation?.(O.query),
            _?.paramsValidation?.(O.params),
            _?.bodyValidation?.(O.body)
          ]);
          L = c || L, g = t || g, P = B || P;
        } catch (c) {
          const t = c?.statusCode || T.BAD_REQUEST;
          return A.setStatusCode(t), u(c, t);
        }
        try {
          const c = await _.handler({
            ...O,
            query: L,
            params: g,
            body: P
          });
          return f.emit("response", c), _?.statusCode && A.setStatusCode(_.statusCode), c;
        } catch (c) {
          const t = c?.statusCode || T.INTERNAL_SERVER_ERROR;
          return b(c, F), A.setStatusCode(t), u(c, t);
        }
      }
    }), F.info("🚏 Route registered");
  });
};
function aE(E) {
  E.logger !== !1 && J(E.logger || {});
  try {
    if (!E.provider)
      throw l("Provider is required", T.INTERNAL_SERVER_ERROR);
    if (E.routers.length === 0)
      throw l("At least one router is required", T.INTERNAL_SERVER_ERROR);
  } catch (r) {
    b(r, U), process.exit(1);
  }
  E.plugins && iE(E.provider, E), nE(E.env), E.routers.forEach((r) => {
    cE(E, r);
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
  return U.success(`🔥 ${R("underline", "Application successfully started")}`), e;
}
function fE(E, e) {
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
function DE(E) {
  return E;
}
const mE = (E, e) => ({
  name: E,
  plugin: e
});
export {
  T as StatusCode,
  aE as createApp,
  l as createError,
  fE as createGuard,
  mE as createPlugin,
  DE as createProvider,
  lE as createRouter,
  oE as createService,
  RE as extendRouterContext,
  y as isNixleError
};
