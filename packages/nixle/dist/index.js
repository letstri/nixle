import { createConsola as j } from "consola";
import { colorize as c, colors as v } from "consola/utils";
import M from "dayjs";
import Y from "callsite-record";
import { joinURL as B } from "ufo";
import H from "mitt";
import x from "dotenv";
var s = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(s || {});
const w = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => !e.includes(r))), Q = (E) => E !== Object(E), y = (...E) => {
  const e = B("", ...E), r = e.startsWith("/") ? e : `/${e}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, u = (E) => {
  try {
    const e = JSON.parse(E);
    return typeof e == "number" || typeof e == "boolean" || e === void 0 || e === null ? e : E;
  } catch {
    return E;
  }
}, F = (E) => Object.fromEntries(
  Object.entries(E).map(([e, r]) => [
    e,
    Array.isArray(r) ? r.map(u) : u(r)
  ])
), D = H(), d = {
  syntax: {
    string: (...E) => c("green", E.join("")),
    punctuator: (...E) => c("gray", E.join("")),
    keyword: (...E) => c("cyan", E.join("")),
    number: (...E) => c("magenta", E.join("")),
    regex: (...E) => c("magenta", E.join("")),
    comment: (...E) => c("gray", c("bold", E.join(""))),
    invalid: (...E) => c("inverse", E.join(""))
  },
  codeFrame: (E) => E.slice(1),
  codeLine(E, e, r, n) {
    let T = (e ? " > " : "   ") + c("dim", E) + " ";
    e && (T = c("bgRed", T));
    let N = T + c("dim", "| ") + r;
    return n || (N += `
`), N;
  },
  stackLine(E, e, r) {
    let n = `   ${c("dim", "at")} ` + E + " (" + c("blueBright", c("underline", e)) + ")";
    return r || (n += `
`), n;
  },
  stack(E) {
    return `

` + E;
  }
};
class G extends Error {
  constructor({
    statusCode: e,
    message: r,
    details: n
  }) {
    super(), this.time = M().format(), this.statusCode = s.BAD_REQUEST, this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = e, this.message = r, this.details = n;
  }
}
const $ = (E) => Y({
  forError: E,
  isCallsiteFrame: (r) => P(E) ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
})?.renderSync({
  renderer: d,
  stackFilter: (r) => P(E) ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
});
function t(E, e) {
  const r = typeof E == "string" ? E : E.message;
  throw new G({
    message: r,
    statusCode: typeof E == "string" ? e || s.BAD_REQUEST : E.statusCode || s.BAD_REQUEST,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const P = (E) => E instanceof G, h = (E, e) => {
  let r = "";
  if (P(E) || E instanceof Error ? r = E.message : Q(E) ? r = E : r = `${E.constructor.name} ${JSON.stringify(E)}`, E && (!E.statusCode || E.statusCode >= s.INTERNAL_SERVER_ERROR))
    if (E instanceof Error) {
      const n = $(E);
      e.fatal(c("red", r), ...n ? [`
`, n] : []);
    } else
      e.fatal(c("red", r));
  else
    e.error(c("red", r));
  D.emit("error", E);
}, L = (E, e) => {
  const r = M().format(), n = Q(E), _ = n && E || E.message || "Internal Server Error", T = n && r || E.time || r, N = n && {} || E.details || {}, R = {
    statusCode: e,
    message: _,
    time: T,
    details: N
  };
  return R.details = {
    ...R.details,
    ...w(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
      "message",
      "name",
      "stack",
      "statusCode",
      "time",
      "details"
    ])
  }, R;
};
let b;
const W = (E) => {
  b = j(E);
}, O = (E, ...e) => {
  if (!b)
    return;
  const r = `${c("bgBlue", " Nixle ")}`, n = b[E];
  n || t({
    message: `Logger method "${E}" not found`,
    statusCode: s.INTERNAL_SERVER_ERROR
  }), n(`${r}`, ...e);
}, f = {
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
}, o = (E, e = "bgWhite") => Object.fromEntries(
  Object.entries(f).map(([r, n]) => [
    r,
    (..._) => n(c(e, ` ${E} `), ..._)
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
}, q = (E, e) => a("GET", E, e), k = (E, e) => a("POST", E, e), X = (E, e) => a("PATCH", E, e), K = (E, e) => a("PUT", E, e), J = (E, e) => a("DELETE", E, e), Z = (E, e) => a("OPTIONS", E, e), z = {
  get: q,
  post: k,
  patch: X,
  put: K,
  delete: J,
  options: Z
}, U = {}, S = (E) => {
  x.config(E), Object.keys(process.env).forEach((e) => {
    U[e] = process.env[e];
  });
}, p = {}, C = (E) => {
  Object.assign(p, E);
};
function NE(E, e) {
  const r = typeof e == "object";
  (!e || r && !e.routes) && t({
    message: "Routes are required",
    statusCode: s.INTERNAL_SERVER_ERROR
  });
  const n = typeof e == "function" ? {} : e?.services || {}, _ = r ? e.routes : e, T = r ? e.guards || [] : [];
  return {
    path: E,
    routes: () => _(
      {
        route: z,
        log: o(E, "bgGreen"),
        env: U,
        ...p
      },
      Object.entries(n).reduce(
        (R, [m, g]) => ({
          ...R,
          [m]: g(m)
        }),
        {}
      )
    ),
    services: n,
    guards: T
  };
}
let V = {};
const EE = (E) => {
  Object.assign(V, E);
};
function OE(E) {
  return (e) => {
    const r = typeof E == "function" ? E : E.methods, n = typeof E == "function" ? {} : E.services || {};
    return r(
      {
        log: o(e, "bgCyan"),
        env: U,
        ...V
      },
      Object.entries(n).reduce(
        (_, [T, N]) => ({
          ..._,
          [T]: N(T)
        }),
        {}
      )
    );
  };
}
const eE = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: r, plugin: n }) => {
    const _ = o(r, "bgMagenta");
    n({ provider: E, log: _, extendRouterContext: C, extendServiceContext: EE }), f.success(`🚀 ${c("bgBlue", ` ${r.trim()} `)} plugin successfully loaded`);
  });
}, rE = (E, e) => {
  const r = y(E.globalPrefix || "", e.path || ""), n = o(r, "bgGreen"), _ = e.routes();
  try {
    _.length === 0 && t({
      message: "At least one router is required",
      statusCode: s.INTERNAL_SERVER_ERROR
    }), _.some(({ path: T, method: N, options: R }) => !T || !N || !R.handler) && t({
      message: "Path, method and handler are required for each route",
      statusCode: s.INTERNAL_SERVER_ERROR
    });
  } catch (T) {
    h(T, n), process.exit(1);
  }
  _.forEach(({ path: T, method: N, options: R }) => {
    const m = y(r, T), g = o(`${v.bold(N)} ${m}`, "bgGreen");
    E.provider.createRoute({
      method: N.toLowerCase(),
      path: m,
      async handler(I) {
        D.emit("request", I);
        const l = {
          ...I,
          query: F(I.query),
          params: F(I.params)
        };
        try {
          await R?.middleware?.(l);
        } catch (i) {
          const A = i?.statusCode || s.INTERNAL_SERVER_ERROR;
          return I.setStatusCode(A), L(i, A);
        }
        try {
          e.guards.length && await Promise.all(e.guards.map((i) => i({ ...l, env: U }))), R?.guards?.length && await Promise.all(R.guards.map((i) => i({ ...l, env: U }))), await Promise.all([
            R?.queryValidation?.(l.query),
            R?.paramsValidation?.(l.params),
            R?.bodyValidation?.(l.body)
          ]);
        } catch (i) {
          const A = i?.statusCode || s.BAD_REQUEST;
          return I.setStatusCode(A), L(i, A);
        }
        try {
          const i = await R.handler(l);
          return D.emit("response", i), R?.statusCode && I.setStatusCode(R.statusCode), i;
        } catch (i) {
          const A = i?.statusCode || s.INTERNAL_SERVER_ERROR;
          return h(i, g), I.setStatusCode(A), L(i, A);
        }
      }
    }), g.success("🚏 Successfully registered");
  });
};
function IE(E) {
  E.logger !== !1 && W(E.logger || {});
  try {
    E.provider || t({
      message: "Provider is required",
      statusCode: s.INTERNAL_SERVER_ERROR
    }), E.routers.length === 0 && t({
      message: "At least one router is required",
      statusCode: s.INTERNAL_SERVER_ERROR
    });
  } catch (r) {
    h(r, f), process.exit(1);
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
  return f.success(`🔥 ${c("underline", "Application successfully started")}`), e;
}
function AE(E, e) {
  return async (r) => {
    try {
      await e(r);
    } catch (n) {
      t({
        message: n?.message || `Oops, ${E} guard was failed`,
        statusCode: n?.statusCode || s.BAD_REQUEST,
        details: n?.details
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
  s as StatusCode,
  IE as createApp,
  t as createError,
  AE as createGuard,
  tE as createPlugin,
  lE as createProvider,
  NE as createRouter,
  OE as createService,
  C as extendRouterContext,
  P as isNixleError
};
