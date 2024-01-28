import { createConsola as W } from "consola";
import { colorize as n, colors as $ } from "consola/utils";
import v from "dayjs";
import q from "callsite-record";
import { joinURL as k } from "ufo";
import K from "mitt";
import X from "dotenv";
var T = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(T || {});
const J = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => !e.includes(r))), Y = (E) => E !== Object(E), Q = (...E) => {
  const e = k("", ...E), r = e.startsWith("/") ? e : `/${e}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, V = (E) => {
  try {
    const e = JSON.parse(E);
    return typeof e == "number" || typeof e == "boolean" || e === void 0 || e === null ? e : E;
  } catch {
    return E;
  }
}, p = (E) => Object.fromEntries(
  Object.entries(E).map(([e, r]) => [
    e,
    Array.isArray(r) ? r.map(V) : V(r)
  ])
), f = K(), Z = {
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
    let A = N + n("dim", "| ") + r.slice(0, 300);
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
class j extends Error {
  constructor({ statusCode: e, message: r, details: R, code: i }) {
    super(), this.time = v().format(), this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = e || T.BAD_REQUEST, this.message = r, this.details = R, this.code = i;
  }
}
const z = (E) => q({
  forError: E,
  isCallsiteFrame: (r) => u(E) && E.statusCode < T.INTERNAL_SERVER_ERROR ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
})?.renderSync({
  renderer: Z,
  stackFilter: (r) => u(E) && E.statusCode < T.INTERNAL_SERVER_ERROR ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
});
function I(E, e) {
  const r = typeof E == "string" ? E : E.message;
  return new j({
    message: r,
    statusCode: typeof E == "string" ? e || T.BAD_REQUEST : E.statusCode || T.BAD_REQUEST,
    code: typeof E == "string" ? void 0 : E.code,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const u = (E) => E instanceof j, y = (E, e) => {
  let r = "";
  if (u(E) || E instanceof Error ? r = E.message : Y(E) ? r = E : r = `${E.constructor.name} ${JSON.stringify(E)}`, E && (!E.statusCode || E.statusCode >= T.INTERNAL_SERVER_ERROR))
    if (E instanceof Error) {
      const R = z(E);
      e.fatal(n("red", r), ...R ? [`
`, R] : []);
    } else
      e.fatal(n("red", r));
  else
    e.error(n("red", r), n("red", JSON.stringify(E?.details, null, 2)));
  f.emit("error", E);
}, h = (E, e) => {
  const r = v().format(), R = Y(E), i = R && E || E.message || "Internal Server Error", N = R && r || E.time || r, A = R && {} || E.details || {}, o = R && void 0 || E.code, _ = {
    statusCode: e,
    message: i,
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
}, O = (E, ...e) => {
  if (!b)
    return;
  const r = `${n("bgBlue", " Nixle ")}`, R = b[E];
  if (!R)
    throw I({
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
}, D = (E, e = "bgWhite") => Object.fromEntries(
  Object.entries(F).map(([r, R]) => [
    r,
    (...i) => R(n(e, ` ${E} `), ...i)
  ])
);
function M(E) {
  if (!E.startsWith("/"))
    throw I("Path must start with /", T.INTERNAL_SERVER_ERROR);
  if (E.length > 1 && E.endsWith("/"))
    throw I("Path must not end with /", T.INTERNAL_SERVER_ERROR);
}
function a(E) {
  function e(r, R) {
    return M(r), {
      path: r,
      method: E,
      options: typeof R == "function" ? { handler: R } : R,
      $infer: {}
    };
  }
  return e;
}
const C = {
  get: a("GET"),
  post: a("POST"),
  patch: a("PATCH"),
  put: a("PUT"),
  delete: a("DELETE"),
  options: a("OPTIONS")
}, m = {}, EE = (E) => {
  X.config(E), Object.keys(process.env).forEach((e) => {
    m[e] = process.env[e];
  });
}, w = {};
function eE(E) {
  Object.assign(w, E);
}
function tE(E, e) {
  M(E);
  const r = typeof e == "object";
  if (!e || r && !e.routes)
    throw I("Routes are required", T.INTERNAL_SERVER_ERROR);
  const R = r ? e.routes : e, i = r ? e.guards || [] : [];
  return {
    path: E,
    routes: () => R({
      route: C,
      log: D(E, "bgGreen"),
      env: m,
      ...w
    }),
    guards: i,
    $inferRoutes: {}
  };
}
let H = {};
const rE = (E) => {
  Object.assign(H, E);
};
function IE(E, e) {
  function r() {
    return e({
      log: D(E, "bgCyan"),
      env: m,
      ...H
    });
  }
  return r;
}
const RE = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: r, plugin: R }) => {
    const i = D(r, "bgMagenta");
    R({ provider: E, log: i, extendRouterContext: eE, extendServiceContext: rE });
  });
}, nE = (E, e) => {
  const r = Q(E.globalPrefix || "", e.path || ""), R = D(r, "bgGreen"), i = e.routes();
  try {
    if (i.length === 0)
      throw I("At least one router is required", T.INTERNAL_SERVER_ERROR);
    if (i.some(({ path: N, method: A, options: o }) => !N || !A || !o.handler))
      throw I(
        "Path, method and handler are required for each route",
        T.INTERNAL_SERVER_ERROR
      );
  } catch (N) {
    y(N, R), process.exit(1);
  }
  i.forEach(function({ path: A, method: o, options: _ }) {
    const G = Q(r, A), d = D(`${$.bold(o)} ${G}`, "bgGreen");
    E.provider.createRoute({
      method: o.toLowerCase(),
      path: G,
      async handler(l) {
        f.emit("request", l);
        const s = {
          ...l,
          query: p(l.query),
          params: p(l.params)
        };
        try {
          await _?.middleware?.(s);
        } catch (c) {
          const t = c?.statusCode || T.INTERNAL_SERVER_ERROR;
          return l.setStatusCode(t), h(c, t);
        }
        let L = s.query, U = s.params, P = s.body;
        try {
          e.guards.length && await Promise.all(
            e.guards.map(function(g) {
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
          const t = c?.statusCode || T.BAD_REQUEST;
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
          y(c, d);
          const t = c?.statusCode || T.INTERNAL_SERVER_ERROR;
          return l.setStatusCode(t), h(c, t);
        }
      }
    });
  });
};
function AE(E) {
  E.globalPrefix && M(E.globalPrefix), E.logger !== !1 && S(E.logger || {});
  try {
    if (!E.provider)
      throw I("Provider is required", T.INTERNAL_SERVER_ERROR);
    if (E.routers.length === 0)
      throw I("At least one router is required", T.INTERNAL_SERVER_ERROR);
  } catch (r) {
    y(r, F), process.exit(1);
  }
  E.plugins && RE(E.provider, E), EE(E.env), E.routers.forEach((r) => {
    nE(E, r);
  });
  const e = {
    app: E.provider.app,
    events: {
      on: f.on,
      emit: f.emit
    },
    $inferRouters: {}
  };
  return F.success("🔥 Application successfully started"), e;
}
function lE(E, e) {
  return async (r) => {
    try {
      await e(r);
    } catch (R) {
      throw I({
        message: R?.message || `Oops, ${E} guard was failed`,
        statusCode: R?.statusCode || T.BAD_REQUEST,
        details: R?.details
      });
    }
  };
}
function oE(E) {
  return E;
}
const aE = (E, e) => ({
  name: E,
  plugin: e
});
export {
  T as StatusCode,
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
