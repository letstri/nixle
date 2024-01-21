import { createConsola as W } from "consola";
import { colorize as n, colors as $ } from "consola/utils";
import p from "dayjs";
import q from "callsite-record";
import { joinURL as k } from "ufo";
import X from "mitt";
import K from "dotenv";
var i = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(i || {});
const J = (E, r) => Object.fromEntries(Object.entries(E).filter(([e]) => !r.includes(e))), v = (E) => E !== Object(E), Q = (...E) => {
  const r = k("", ...E), e = r.startsWith("/") ? r : `/${r}`;
  return e.endsWith("/") ? e.slice(0, -1) : e;
}, V = (E) => {
  try {
    const r = JSON.parse(E);
    return typeof r == "number" || typeof r == "boolean" || r === void 0 || r === null ? r : E;
  } catch {
    return E;
  }
}, d = (E) => Object.fromEntries(
  Object.entries(E).map(([r, e]) => [
    r,
    Array.isArray(e) ? e.map(V) : V(e)
  ])
), f = X(), Z = {
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
  codeLine(E, r, e, R) {
    let N = (r ? " > " : "   ") + n("dim", E) + " ";
    r && (N = n("bgRed", N));
    let A = N + n("dim", "| ") + e.slice(0, 300);
    return R || (A += `
`), A;
  },
  stackLine(E, r, e) {
    let R = `   ${n("dim", "at")} ` + E + " (" + n("blueBright", n("underline", r)) + ")";
    return e || (R += `
`), R;
  },
  stack(E) {
    return `

` + E;
  }
};
class w extends Error {
  constructor({ statusCode: r, message: e, details: R, code: T }) {
    super(), this.time = p().format(), this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = r || i.BAD_REQUEST, this.message = e, this.details = R, this.code = T;
  }
}
const z = (E) => q({
  forError: E,
  isCallsiteFrame: (e) => u(E) && E.statusCode < i.INTERNAL_SERVER_ERROR ? !!e.source && !e.source.includes("node_modules") && !e.source.includes("node:") && !e.source.includes("nixle/dist") : !0
})?.renderSync({
  renderer: Z,
  stackFilter: (e) => u(E) && E.statusCode < i.INTERNAL_SERVER_ERROR ? !!e.source && !e.source.includes("node_modules") && !e.source.includes("node:") && !e.source.includes("nixle/dist") : !0
});
function I(E, r) {
  const e = typeof E == "string" ? E : E.message;
  return new w({
    message: e,
    statusCode: typeof E == "string" ? r || i.BAD_REQUEST : E.statusCode || i.BAD_REQUEST,
    code: typeof E == "string" ? void 0 : E.code,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const u = (E) => E instanceof w, y = (E, r) => {
  let e = "";
  if (u(E) || E instanceof Error ? e = E.message : v(E) ? e = E : e = `${E.constructor.name} ${JSON.stringify(E)}`, E && (!E.statusCode || E.statusCode >= i.INTERNAL_SERVER_ERROR))
    if (E instanceof Error) {
      const R = z(E);
      r.fatal(n("red", e), ...R ? [`
`, R] : []);
    } else
      r.fatal(n("red", e));
  else
    r.error(n("red", e), n("red", JSON.stringify(E?.details, null, 2)));
  f.emit("error", E);
}, h = (E, r) => {
  const e = p().format(), R = v(E), T = R && E || E.message || "Internal Server Error", N = R && e || E.time || e, A = R && {} || E.details || {}, o = R && void 0 || E.code, _ = {
    statusCode: r,
    message: T,
    time: N,
    details: A,
    code: o
  };
  return _.details = {
    ..._.details,
    ...J(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
      "message",
      "name",
      "stack",
      "statusCode",
      "time",
      "details",
      "code"
    ])
  }, _;
};
let b;
const S = (E) => {
  b = W(E);
}, O = (E, ...r) => {
  if (!b)
    return;
  const e = `${n("bgBlue", " Nixle ")}`, R = b[E];
  if (!R)
    throw I({
      message: `Logger method "${E}" not found`,
      statusCode: i.INTERNAL_SERVER_ERROR
    });
  R(`${e}`, ...r);
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
}, D = (E, r = "bgWhite") => Object.fromEntries(
  Object.entries(M).map(([e, R]) => [
    e,
    (...T) => R(n(r, ` ${E} `), ...T)
  ])
);
function F(E) {
  if (!E.startsWith("/"))
    throw I("Path must start with /", i.INTERNAL_SERVER_ERROR);
  if (E.length > 1 && E.endsWith("/"))
    throw I("Path must not end with /", i.INTERNAL_SERVER_ERROR);
}
function a(E) {
  function r(e, R) {
    return F(e), {
      path: e,
      method: E,
      options: typeof R == "function" ? { handler: R } : R,
      $infer: {}
    };
  }
  return r;
}
const C = {
  get: a("GET"),
  post: a("POST"),
  patch: a("PATCH"),
  put: a("PUT"),
  delete: a("DELETE"),
  options: a("OPTIONS")
}, m = {}, EE = (E) => {
  K.config(E), Object.keys(process.env).forEach((r) => {
    m[r] = process.env[r];
  });
}, Y = {};
function eE(E) {
  Object.assign(Y, E);
}
function tE(E, r) {
  F(E);
  const e = typeof r == "object";
  if (!r || e && !r.routes)
    throw I("Routes are required", i.INTERNAL_SERVER_ERROR);
  const R = e ? r.routes : r, T = e ? r.guards || [] : [];
  return {
    path: E,
    routes: () => R({
      route: C,
      log: D(E, "bgGreen"),
      env: m,
      ...Y
    }),
    guards: T,
    $inferRoutes: {}
  };
}
let j = {};
const rE = (E) => {
  Object.assign(j, E);
};
function IE(E, r) {
  function e() {
    return r({
      log: D(E, "bgCyan"),
      env: m,
      ...j
    });
  }
  return e;
}
const RE = (E, r) => {
  r.plugins && r.plugins.forEach(({ name: e, plugin: R }) => {
    const T = D(e, "bgMagenta");
    R({ provider: E, log: T, extendRouterContext: eE, extendServiceContext: rE });
  });
}, nE = (E, r) => {
  const e = Q(E.globalPrefix || "", r.path || ""), R = D(e, "bgGreen"), T = r.routes();
  try {
    if (T.length === 0)
      throw I("At least one router is required", i.INTERNAL_SERVER_ERROR);
    if (T.some(({ path: N, method: A, options: o }) => !N || !A || !o.handler))
      throw I(
        "Path, method and handler are required for each route",
        i.INTERNAL_SERVER_ERROR
      );
  } catch (N) {
    y(N, R), process.exit(1);
  }
  T.forEach(function({ path: A, method: o, options: _ }) {
    const G = Q(e, A), H = D(`${$.bold(o)} ${G}`, "bgGreen");
    E.provider.createRoute({
      method: o.toLowerCase(),
      path: G,
      async handler(l) {
        f.emit("request", l);
        const s = {
          ...l,
          query: d(l.query),
          params: d(l.params)
        };
        try {
          await _?.middleware?.(s);
        } catch (c) {
          const t = c?.statusCode || i.INTERNAL_SERVER_ERROR;
          return l.setStatusCode(t), h(c, t);
        }
        let L = s.query, U = s.params, P = s.body;
        try {
          r.guards.length && await Promise.all(
            r.guards.map(function(g) {
              return g({ ...s, env: m });
            })
          ), _?.guards?.length && await Promise.all(
            _.guards.map(function(g) {
              return g({ ...s, env: m });
            })
          );
          const [c, t, B] = await Promise.all([
            _?.queryValidation?.(s.query),
            _?.paramsValidation?.(s.params),
            _?.bodyValidation?.(s.body)
          ]);
          L = c || L, U = t || U, P = B || P;
        } catch (c) {
          const t = c?.statusCode || i.BAD_REQUEST;
          return l.setStatusCode(t), h(c, t);
        }
        try {
          const c = await _.handler({
            ...s,
            query: L,
            params: U,
            body: P
          });
          return f.emit("response", c), _?.statusCode && l.setStatusCode(_.statusCode), c;
        } catch (c) {
          y(c, H);
          const t = c?.statusCode || i.INTERNAL_SERVER_ERROR;
          return l.setStatusCode(t), h(c, t);
        }
      }
    });
  });
};
function AE(E) {
  E.globalPrefix && F(E.globalPrefix), E.logger !== !1 && S(E.logger || {});
  try {
    if (!E.provider)
      throw I("Provider is required", i.INTERNAL_SERVER_ERROR);
    if (E.routers.length === 0)
      throw I("At least one router is required", i.INTERNAL_SERVER_ERROR);
  } catch (e) {
    y(e, M), process.exit(1);
  }
  E.plugins && RE(E.provider, E), EE(E.env), E.routers.forEach((e) => {
    nE(E, e);
  }), E.provider.globalMiddleware(({ setHeader: e }) => {
    e("X-Powered-By", "Nixle");
  });
  const r = {
    app: E.provider.app,
    events: {
      on: f.on,
      emit: f.emit
    },
    $inferRouters: {}
  };
  return M.success("🔥 Application successfully started"), r;
}
function lE(E, r) {
  return async (e) => {
    try {
      await r(e);
    } catch (R) {
      throw I({
        message: R?.message || `Oops, ${E} guard was failed`,
        statusCode: R?.statusCode || i.BAD_REQUEST,
        details: R?.details
      });
    }
  };
}
function oE(E) {
  return E;
}
const aE = (E, r) => ({
  name: E,
  plugin: r
});
export {
  i as StatusCode,
  AE as createApp,
  I as createError,
  lE as createGuard,
  aE as createPlugin,
  oE as createProvider,
  tE as createRouter,
  IE as createService,
  eE as extendRouterContext,
  u as isNixleError
};
