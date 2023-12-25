import { createConsola as p } from "consola";
import { colorize as R, colors as j } from "consola/utils";
import M from "dayjs";
import d from "callsite-record";
import { joinURL as Y } from "ufo";
import B from "mitt";
import H from "dotenv";
var c = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(c || {});
const x = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => !e.includes(r))), Q = (E) => E !== Object(E), y = (...E) => {
  const e = Y("", ...E), r = e.startsWith("/") ? e : `/${e}`;
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
), m = B(), w = {
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
    let i = (e ? " > " : "   ") + R("dim", E) + " ";
    e && (i = R("bgRed", i));
    let N = i + R("dim", "| ") + r;
    return n || (N += `
`), N;
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
class G extends Error {
  constructor({ statusCode: e, message: r, details: n, code: T }) {
    super(), this.time = M().format(), this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = e || c.BAD_REQUEST, this.message = r, this.details = n, this.code = T;
  }
}
const $ = (E) => d({
  forError: E,
  isCallsiteFrame: (r) => P(E) && E.statusCode < c.INTERNAL_SERVER_ERROR ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
})?.renderSync({
  renderer: w,
  stackFilter: (r) => P(E) && E.statusCode < c.INTERNAL_SERVER_ERROR ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
});
function a(E, e) {
  const r = typeof E == "string" ? E : E.message;
  throw new G({
    message: r,
    statusCode: typeof E == "string" ? e || c.BAD_REQUEST : E.statusCode || c.BAD_REQUEST,
    code: typeof E == "string" ? void 0 : E.code,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const P = (E) => E instanceof G, h = (E, e) => {
  let r = "";
  if (P(E) || E instanceof Error ? r = E.message : Q(E) ? r = E : r = `${E.constructor.name} ${JSON.stringify(E)}`, E && (!E.statusCode || E.statusCode >= c.INTERNAL_SERVER_ERROR))
    if (E instanceof Error) {
      const n = $(E);
      e.fatal(R("red", r), ...n ? [`
`, n] : []);
    } else
      e.fatal(R("red", r));
  else
    e.error(R("red", r));
  m.emit("error", E);
}, g = (E, e) => {
  const r = M().format(), n = Q(E), T = n && E || E.message || "Internal Server Error", i = n && r || E.time || r, N = n && {} || E.details || {}, _ = n && void 0 || E.code, I = {
    statusCode: e,
    message: T,
    time: i,
    details: N,
    code: _
  };
  return I.details = {
    ...I.details,
    ...x(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
      "message",
      "name",
      "stack",
      "statusCode",
      "time",
      "details",
      "code"
    ])
  }, I;
};
let b;
const W = (E) => {
  b = p(E);
}, O = (E, ...e) => {
  if (!b)
    return;
  const r = `${R("bgBlue", " Nixle ")}`, n = b[E];
  n || a({
    message: `Logger method "${E}" not found`,
    statusCode: c.INTERNAL_SERVER_ERROR
  }), n(`${r}`, ...e);
}, L = {
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
  Object.entries(L).map(([r, n]) => [
    r,
    (...T) => n(R(e, ` ${E} `), ...T)
  ])
), o = (E, e, r) => typeof r == "function" ? {
  path: e,
  method: E,
  options: {
    handler: r
  }
} : {
  path: e,
  method: E,
  options: r
}, q = (E, e) => o("GET", E, e), k = (E, e) => o("POST", E, e), X = (E, e) => o("PATCH", E, e), K = (E, e) => o("PUT", E, e), J = (E, e) => o("DELETE", E, e), Z = (E, e) => o("OPTIONS", E, e), z = {
  get: q,
  post: k,
  patch: X,
  put: K,
  delete: J,
  options: Z
}, U = {}, S = (E) => {
  H.config(E), Object.keys(process.env).forEach((e) => {
    U[e] = process.env[e];
  });
}, V = {}, C = (E) => {
  Object.assign(V, E);
};
function NE(E, e) {
  const r = typeof e == "object";
  (!e || r && !e.routes) && a({
    message: "Routes are required",
    statusCode: c.INTERNAL_SERVER_ERROR
  });
  const n = typeof e == "function" ? {} : e?.services || {}, T = r ? e.routes : e, i = r ? e.guards || [] : [];
  return {
    path: E,
    routes: () => T(
      {
        route: z,
        log: D(E, "bgGreen"),
        env: U,
        ...V
      },
      Object.entries(n).reduce(
        (_, [I, f]) => ({
          ..._,
          [I]: f(I)
        }),
        {}
      )
    ),
    services: n,
    guards: i
  };
}
let v = {};
const EE = (E) => {
  Object.assign(v, E);
};
function OE(E) {
  return (e) => {
    const r = typeof E == "function" ? E : E.methods, n = typeof E == "function" ? {} : E.services || {};
    return r(
      {
        log: D(e, "bgCyan"),
        env: U,
        ...v
      },
      Object.entries(n).reduce(
        (T, [i, N]) => ({
          ...T,
          [i]: N(i)
        }),
        {}
      )
    );
  };
}
const eE = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: r, plugin: n }) => {
    const T = D(r, "bgMagenta");
    n({ provider: E, log: T, extendRouterContext: C, extendServiceContext: EE }), L.success(`🚀 ${R("bgBlue", ` ${r.trim()} `)} plugin successfully loaded`);
  });
}, rE = (E, e) => {
  const r = y(E.globalPrefix || "", e.path || ""), n = D(r, "bgGreen"), T = e.routes();
  try {
    T.length === 0 && a({
      message: "At least one router is required",
      statusCode: c.INTERNAL_SERVER_ERROR
    }), T.some(({ path: i, method: N, options: _ }) => !i || !N || !_.handler) && a({
      message: "Path, method and handler are required for each route",
      statusCode: c.INTERNAL_SERVER_ERROR
    });
  } catch (i) {
    h(i, n), process.exit(1);
  }
  T.forEach(({ path: i, method: N, options: _ }) => {
    const I = y(r, i), f = D(`${j.bold(N)} ${I}`, "bgGreen");
    E.provider.createRoute({
      method: N.toLowerCase(),
      path: I,
      async handler(A) {
        m.emit("request", A);
        const l = {
          ...A,
          query: F(A.query),
          params: F(A.params)
        };
        try {
          await _?.middleware?.(l);
        } catch (s) {
          const t = s?.statusCode || c.INTERNAL_SERVER_ERROR;
          return A.setStatusCode(t), g(s, t);
        }
        try {
          e.guards.length && await Promise.all(e.guards.map((s) => s({ ...l, env: U }))), _?.guards?.length && await Promise.all(_.guards.map((s) => s({ ...l, env: U }))), await Promise.all([
            _?.queryValidation?.(l.query),
            _?.paramsValidation?.(l.params),
            _?.bodyValidation?.(l.body)
          ]);
        } catch (s) {
          const t = s?.statusCode || c.BAD_REQUEST;
          return A.setStatusCode(t), g(s, t);
        }
        try {
          const s = await _.handler(l);
          return m.emit("response", s), _?.statusCode && A.setStatusCode(_.statusCode), s;
        } catch (s) {
          const t = s?.statusCode || c.INTERNAL_SERVER_ERROR;
          return h(s, f), A.setStatusCode(t), g(s, t);
        }
      }
    }), f.success("🚏 Successfully registered");
  });
};
function IE(E) {
  E.logger !== !1 && W(E.logger || {});
  try {
    E.provider || a({
      message: "Provider is required",
      statusCode: c.INTERNAL_SERVER_ERROR
    }), E.routers.length === 0 && a({
      message: "At least one router is required",
      statusCode: c.INTERNAL_SERVER_ERROR
    });
  } catch (r) {
    h(r, L), process.exit(1);
  }
  E.plugins && eE(E.provider, E), S(E.env), E.routers.forEach((r) => {
    rE(E, r);
  }), E.provider.globalMiddleware(({ setHeader: r }) => {
    r("X-Powered-By", "Nixle");
  });
  const e = {
    app: E.provider.app,
    events: {
      on: m.on,
      emit: m.emit
    }
  };
  return L.success(`🔥 ${R("underline", "Application successfully started")}`), e;
}
function AE(E, e) {
  return async (r) => {
    try {
      await e(r);
    } catch (n) {
      a({
        message: n?.message || `Oops, ${E} guard was failed`,
        statusCode: n?.statusCode || c.BAD_REQUEST,
        details: n?.details
      });
    }
  };
}
function tE(E) {
  return E;
}
const lE = (E, e) => ({
  name: E,
  plugin: e
});
export {
  c as StatusCode,
  IE as createApp,
  a as createError,
  AE as createGuard,
  lE as createPlugin,
  tE as createProvider,
  NE as createRouter,
  OE as createService,
  C as extendRouterContext,
  P as isNixleError
};
