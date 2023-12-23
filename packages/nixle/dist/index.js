import { createConsola as M } from "consola";
import { colorize as _, colors as Q } from "consola/utils";
import y from "dayjs";
import G from "callsite-record";
import { joinURL as p } from "ufo";
import V from "mitt";
import Y from "dotenv";
var i = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(i || {});
const j = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => !e.includes(r))), v = (E) => E !== Object(E), h = (...E) => {
  const e = p("", ...E), r = e.startsWith("/") ? e : `/${e}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, b = (E) => {
  try {
    const e = JSON.parse(E);
    return typeof e == "number" || typeof e == "boolean" || e === void 0 || e === null ? e : E;
  } catch {
    return E;
  }
}, u = (E) => Object.fromEntries(
  Object.entries(E).map(([e, r]) => [
    e,
    Array.isArray(r) ? r.map(b) : b(r)
  ])
), o = V(), B = {
  syntax: {
    string: (...E) => _("green", E.join("")),
    punctuator: (...E) => _("gray", E.join("")),
    keyword: (...E) => _("cyan", E.join("")),
    number: (...E) => _("magenta", E.join("")),
    regex: (...E) => _("magenta", E.join("")),
    comment: (...E) => _("gray", _("bold", E.join(""))),
    invalid: (...E) => _("inverse", E.join(""))
  },
  codeFrame: (E) => E.slice(1),
  codeLine(E, e, r, n) {
    let c = (e ? " > " : "   ") + _("dim", E) + " ";
    e && (c = _("bgRed", c));
    let N = c + _("dim", "| ") + r;
    return n || (N += `
`), N;
  },
  stackLine(E, e, r) {
    let n = `   ${_("dim", "at")} ` + E + " (" + _("blueBright", _("underline", e)) + ")";
    return r || (n += `
`), n;
  },
  stack(E) {
    return `

` + E;
  }
};
class F extends Error {
  constructor({
    statusCode: e,
    message: r,
    details: n
  }) {
    super(), this.time = y().format(), this.statusCode = i.BAD_REQUEST, this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = e, this.message = r, this.details = n;
  }
}
const H = (E) => G({
  forError: E,
  isCallsiteFrame: (r) => f(E) ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
})?.renderSync({
  renderer: B,
  stackFilter: (r) => f(E) ? !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist") : !0
});
function A(E, e) {
  const r = typeof E == "string" ? E : E.message;
  throw new F({
    message: r,
    statusCode: typeof E == "string" ? e || i.BAD_REQUEST : E.statusCode || i.BAD_REQUEST,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const f = (E) => E instanceof F, P = (E, e) => {
  let r = "";
  if (f(E) || E instanceof Error ? r = E.message : v(E) ? r = E : r = `${E.constructor.name} ${JSON.stringify(E)}`, E && (!E.statusCode || E.statusCode >= i.INTERNAL_SERVER_ERROR))
    if (E instanceof Error) {
      const n = H(E);
      e.fatal(_("red", r), ...n ? [`
`, n] : []);
    } else
      e.fatal(_("red", r));
  else
    e.error(_("red", r));
  o.emit("error", E);
}, U = (E, e) => {
  const r = y().format(), n = v(E), s = n && E || E.message || "Internal Server Error", c = n && r || E.time || r, N = n && {} || E.details || {}, T = {
    statusCode: e,
    message: s,
    time: c,
    details: N
  };
  return T.details = {
    ...T.details,
    ...j(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
      "message",
      "name",
      "stack",
      "statusCode",
      "time",
      "details"
    ])
  }, T;
}, X = (E) => {
  __NIXLE.loggerInstance = M(E);
}, I = (E, ...e) => {
  if (!__NIXLE.loggerInstance)
    return;
  const r = `${_("bgBlue", " Nixle ")}`, n = __NIXLE.loggerInstance[E];
  n || A({
    message: `Logger method "${E}" not found`,
    statusCode: i.INTERNAL_SERVER_ERROR
  }), n(`${r}`, ...e);
}, D = {
  info: (...E) => I("info", ...E),
  success: (...E) => I("success", ...E),
  warn: (...E) => I("warn", ...E),
  error: (...E) => I("error", ...E),
  fatal: (...E) => I("fatal", ...E),
  debug: (...E) => I("debug", ...E),
  trace: (...E) => I("trace", ...E),
  silent: (...E) => I("silent", ...E),
  log: (...E) => I("log", ...E),
  fail: (...E) => I("fail", ...E),
  verbose: (...E) => I("verbose", ...E)
}, g = (E, e = "bgWhite") => Object.fromEntries(
  Object.entries(D).map(([r, n]) => [
    r,
    (...s) => n(_(e, ` ${E} `), ...s)
  ])
), L = (E, e, r) => typeof r == "function" ? {
  path: e,
  method: E,
  options: {
    handler: r
  }
} : {
  path: e,
  method: E,
  options: r
}, x = (E, e) => L("GET", E, e), w = (E, e) => L("POST", E, e), d = (E, e) => L("PATCH", E, e), $ = (E, e) => L("PUT", E, e), W = (E, e) => L("DELETE", E, e), q = (E, e) => L("OPTIONS", E, e), k = {
  get: x,
  post: w,
  patch: d,
  put: $,
  delete: W,
  options: q
}, K = (E) => {
  __NIXLE.routerContext = {
    ...__NIXLE.routerContext,
    ...E
  };
};
function cE(E, e) {
  const r = typeof e == "object";
  (!e || r && !e.routes) && A({
    message: "Routes are required",
    statusCode: i.INTERNAL_SERVER_ERROR
  });
  const n = typeof e == "function" ? {} : e?.services || {}, s = r ? e.routes : e, c = r ? e.guards || [] : [];
  return {
    path: E,
    routes: () => s(
      {
        route: k,
        log: g(E, "bgGreen"),
        env: __NIXLE.env || {},
        ...__NIXLE.routerContext
      },
      Object.entries(n).reduce(
        (T, [a, m]) => ({
          ...T,
          [a]: m(a)
        }),
        {}
      )
    ),
    services: n,
    guards: c
  };
}
const J = (E) => {
  __NIXLE.serviceContext = {
    ...__NIXLE.serviceContext,
    ...E
  };
};
function RE(E) {
  return (e) => {
    const r = typeof E == "function" ? E : E.methods, n = typeof E == "function" ? {} : E.services || {};
    return r(
      {
        log: g(e, "bgCyan"),
        env: __NIXLE.env || {},
        ...__NIXLE.serviceContext
      },
      Object.entries(n).reduce(
        (s, [c, N]) => ({
          ...s,
          [c]: N(c)
        }),
        {}
      )
    );
  };
}
const Z = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: r, plugin: n }) => {
    const s = g(r, "bgMagenta");
    n({ provider: E, log: s, extendRouterContext: K, extendServiceContext: J }), D.success(`🚀 ${_("bgBlue", ` ${r.trim()} `)} plugin successfully loaded`);
  });
}, z = (E) => {
  Y.config(E), __NIXLE.env || (__NIXLE.env = {}), Object.keys(process.env).forEach((e) => {
    __NIXLE.env[e] = process.env[e];
  });
}, S = (E, e) => {
  const r = h(E.globalPrefix || "", e.path || ""), n = g(r, "bgGreen"), s = e.routes();
  try {
    s.length === 0 && A({
      message: "At least one router is required",
      statusCode: i.INTERNAL_SERVER_ERROR
    }), s.some(({ path: c, method: N, options: T }) => !c || !N || !T.handler) && A({
      message: "Path, method and handler are required for each route",
      statusCode: i.INTERNAL_SERVER_ERROR
    });
  } catch (c) {
    P(c, n), process.exit(1);
  }
  s.forEach(({ path: c, method: N, options: T }) => {
    const a = h(r, c), m = g(`${Q.bold(N)} ${a}`, "bgGreen");
    E.provider.createRoute({
      method: N.toLowerCase(),
      path: a,
      async handler(O) {
        o.emit("request", O);
        const l = {
          ...O,
          query: u(O.query),
          params: u(O.params)
        };
        try {
          await T?.middleware?.(l);
        } catch (R) {
          const t = R?.statusCode || i.INTERNAL_SERVER_ERROR;
          return O.setStatusCode(t), U(R, t);
        }
        try {
          e.guards.length && await Promise.all(
            e.guards.map((R) => R({ ...l, env: __NIXLE.env || {} }))
          ), T?.guards?.length && await Promise.all(
            T.guards.map((R) => R({ ...l, env: __NIXLE.env || {} }))
          ), await Promise.all([
            T?.queryValidation?.(l.query),
            T?.paramsValidation?.(l.params),
            T?.bodyValidation?.(l.body)
          ]);
        } catch (R) {
          const t = R?.statusCode || i.BAD_REQUEST;
          return O.setStatusCode(t), U(R, t);
        }
        try {
          const R = await T.handler(l);
          return o.emit("response", R), T?.statusCode && O.setStatusCode(T.statusCode), R;
        } catch (R) {
          const t = R?.statusCode || i.INTERNAL_SERVER_ERROR;
          return P(R, m), O.setStatusCode(t), U(R, t);
        }
      }
    }), m.success("🚏 Successfully registered");
  });
};
function iE(E) {
  E.logger !== !1 && X(E.logger || {});
  try {
    E.provider || A({
      message: "Provider is required",
      statusCode: i.INTERNAL_SERVER_ERROR
    }), E.routers.length === 0 && A({
      message: "At least one router is required",
      statusCode: i.INTERNAL_SERVER_ERROR
    });
  } catch (r) {
    P(r, D), process.exit(1);
  }
  E.plugins && Z(E.provider, E), z(E.env), E.routers.forEach((r) => {
    S(E, r);
  }), E.provider.globalMiddleware(({ setHeader: r }) => {
    r("X-Powered-By", "Nixle");
  });
  const e = {
    app: E.provider.app,
    events: {
      on: o.on,
      emit: o.emit
    }
  };
  return D.success(`🔥 ${_("underline", "Application successfully started")}`), e;
}
function sE(E, e) {
  return async (r) => {
    try {
      await e(r);
    } catch (n) {
      A({
        message: n?.message || `Oops, ${E} guard was failed`,
        statusCode: n?.statusCode || i.BAD_REQUEST,
        details: n?.details
      });
    }
  };
}
function NE(E) {
  return E;
}
const IE = (E, e) => ({
  name: E,
  plugin: e
});
globalThis.__NIXLE = globalThis.__NIXLE || {};
export {
  i as StatusCode,
  iE as createApp,
  A as createError,
  sE as createGuard,
  IE as createPlugin,
  NE as createProvider,
  cE as createRouter,
  RE as createService,
  K as extendRouterContext,
  f as isNixleError
};
