import { createConsola as F } from "consola";
import { colorize as _, colors as v } from "consola/utils";
import b from "dayjs";
import Q from "callsite-record";
import { joinURL as u } from "ufo";
import G from "mitt";
import V from "dotenv";
var R = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(R || {});
const Y = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => !e.includes(r))), p = (E) => E !== Object(E), P = (...E) => {
  const e = u("", ...E), r = e.startsWith("/") ? e : `/${e}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, h = (E) => {
  try {
    const e = JSON.parse(E);
    return typeof e == "number" || typeof e == "boolean" || e === void 0 || e === null ? e : E;
  } catch {
    return E;
  }
}, M = (E) => Object.fromEntries(
  Object.entries(E).map(([e, r]) => [
    e,
    Array.isArray(r) ? r.map(h) : h(r)
  ])
), L = G(), B = {
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
    let O = c + _("dim", "| ") + r;
    return n || (O += `
`), O;
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
class y extends Error {
  constructor({
    statusCode: e,
    message: r,
    details: n
  }) {
    super(), this.time = b().format(), this.statusCode = R.BAD_REQUEST, this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = e, this.message = r, this.details = n;
  }
}
const H = (E) => Q({
  forError: E,
  isCallsiteFrame: (r) => !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist")
})?.renderSync({
  renderer: B,
  stackFilter: (r) => !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist")
});
function t(E, e) {
  const r = typeof E == "string" ? E : E.message;
  throw new y({
    message: r,
    statusCode: typeof E == "string" ? e || R.BAD_REQUEST : E.statusCode || R.BAD_REQUEST,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const j = (E) => E instanceof y, f = (E, e) => {
  let r = "";
  if (j(E) || E instanceof Error ? r = E.message : p(E) ? r = E : r = `${E.constructor.name} ${JSON.stringify(E)}`, E && (!E.statusCode || E.statusCode >= R.INTERNAL_SERVER_ERROR))
    if (E instanceof Error) {
      const n = H(E);
      e.fatal(_("red", r), ...n ? [`
`, n] : []);
    } else
      e.fatal(_("red", r));
  else
    e.error(_("red", r));
  L.emit("error", E);
}, U = (E, e) => {
  const r = b().format(), n = p(E), i = n && E || E.message || "Internal Server Error", c = n && r || E.time || r, O = n && {} || E.details || {}, s = {
    statusCode: e,
    message: i,
    time: c,
    details: O
  };
  return s.details = {
    ...s.details,
    ...Y(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
      "message",
      "name",
      "stack",
      "statusCode",
      "time",
      "details"
    ])
  }, s;
}, d = (E) => {
  __NIXLE.loggerInstance = F(E);
}, N = (E, ...e) => {
  if (!__NIXLE.loggerInstance)
    return;
  const r = `${_("bgBlue", " Nixle ")}`, n = __NIXLE.loggerInstance[E];
  n || t({
    message: `Logger method "${E}" not found`,
    statusCode: R.INTERNAL_SERVER_ERROR
  }), n(`${r}`, ...e);
}, D = {
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
  Object.entries(D).map(([r, n]) => [
    r,
    (...i) => n(_(e, ` ${E} `), ...i)
  ])
), X = (E, e) => {
  const r = P(E.globalPrefix || "", e.path || ""), n = m(r, "bgGreen"), i = e.routes();
  try {
    i.length === 0 && t({
      message: "At least one router is required",
      statusCode: R.INTERNAL_SERVER_ERROR
    }), i.some(({ path: c, method: O, options: s }) => !c || !O || !s.handler) && t({
      message: "Path, method and handler are required for each route",
      statusCode: R.INTERNAL_SERVER_ERROR
    });
  } catch (c) {
    f(c, n), process.exit(1);
  }
  i.forEach(({ path: c, method: O, options: s }) => {
    const a = P(r, c), g = m(`${v.bold(O)} ${a}`, "bgGreen");
    E.provider.createRoute({
      method: O.toLowerCase(),
      path: a,
      async handler(I) {
        L.emit("request", I);
        const A = {
          ...I,
          query: M(I.query),
          params: M(I.params)
        };
        try {
          await s?.middleware?.(A);
        } catch (T) {
          const l = T?.statusCode || R.INTERNAL_SERVER_ERROR;
          return I.setStatusCode(l), U(T, l);
        }
        try {
          e.guards.length && await Promise.all(e.guards.map((T) => T(A))), s?.guards?.length && await Promise.all(s.guards.map((T) => T(A))), await Promise.all([
            s?.queryValidation?.(A.query),
            s?.paramsValidation?.(A.params),
            s?.bodyValidation?.(A.body)
          ]);
        } catch (T) {
          const l = T?.statusCode || R.BAD_REQUEST;
          return I.setStatusCode(l), U(T, l);
        }
        try {
          const T = await s.handler(A);
          return L.emit("response", T), s?.statusCode && I.setStatusCode(s.statusCode), T;
        } catch (T) {
          const l = T?.statusCode || R.INTERNAL_SERVER_ERROR;
          return f(T, g), I.setStatusCode(l), U(T, l);
        }
      }
    }), g.success("🚏 Successfully registered");
  });
}, w = (E) => {
  E.modules.forEach((e) => {
    e.options.routers.forEach((r) => {
      X(E, r);
    });
  });
}, o = (E, e, r) => typeof r == "function" ? {
  path: e,
  method: E,
  options: {
    handler: r
  }
} : {
  path: e,
  method: E,
  options: r
}, x = (E, e) => o("GET", E, e), $ = (E, e) => o("POST", E, e), W = (E, e) => o("PATCH", E, e), q = (E, e) => o("PUT", E, e), k = (E, e) => o("DELETE", E, e), K = (E, e) => o("OPTIONS", E, e), J = {
  get: x,
  post: $,
  patch: W,
  put: q,
  delete: k,
  options: K
}, Z = (E) => {
  __NIXLE.routerOptions = {
    ...__NIXLE.routerOptions,
    ...E
  };
};
function RE(E, e) {
  const r = typeof e == "object";
  (!e || r && !e.routes) && t({
    message: "Routes are required",
    statusCode: R.INTERNAL_SERVER_ERROR
  });
  const n = typeof e == "function" ? {} : e?.services || {}, i = r ? e.routes : e, c = r ? e.guards || [] : [];
  return {
    path: E,
    routes: () => i(
      {
        route: J,
        log: m(E, "bgGreen"),
        env: __NIXLE.env || {},
        ...__NIXLE.routerOptions
      },
      Object.entries(n).reduce(
        (s, [a, g]) => ({
          ...s,
          [a]: g(a)
        }),
        {}
      )
    ),
    services: n,
    guards: c
  };
}
const z = (E) => {
  __NIXLE.serviceOptions = {
    ...__NIXLE.serviceOptions,
    ...E
  };
}, cE = (E) => (e) => E({
  log: m(e, "bgCyan"),
  env: __NIXLE.env || {},
  ...__NIXLE.serviceOptions
}), S = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: r, plugin: n }) => {
    const i = m(r, "bgMagenta");
    n({ provider: E, log: i, extendRouterOptions: Z, extendServiceOptions: z }), D.success(`🚀 ${_("bgBlue", ` ${r.trim()} `)} plugin successfully loaded`);
  });
}, C = (E) => {
  V.config(E), __NIXLE.env || (__NIXLE.env = {}), Object.keys(process.env).forEach((e) => {
    __NIXLE.env[e] = process.env[e];
  });
}, iE = (E) => {
  E.logger !== !1 && d(E.logger || {});
  try {
    E.provider || t({
      message: "Provider is required",
      statusCode: R.INTERNAL_SERVER_ERROR
    }), E.modules.length === 0 && t({
      message: "At least one module is required",
      statusCode: R.INTERNAL_SERVER_ERROR
    });
  } catch (r) {
    f(r, D), process.exit(1);
  }
  E.plugins && S(E.provider, E), C(E.env), w(E), E.provider.globalMiddleware(({ setHeader: r }) => {
    r("X-Powered-By", "Nixle");
  });
  const e = {
    app: E.provider.app,
    events: {
      on: L.on,
      emit: L.emit
    }
  };
  return D.success(`🔥 ${_("underline", "Application successfully started")}`), e;
}, NE = (E) => ({ options: E }), OE = (E, e) => async (r) => {
  try {
    await e(r);
  } catch (n) {
    t({
      message: n?.message || `Oops, ${E} guard was failed`,
      statusCode: n?.statusCode || R.BAD_REQUEST,
      details: n?.details
    });
  }
}, IE = (E) => E, lE = (E, e) => ({
  name: E,
  plugin: e
});
globalThis.__NIXLE = globalThis.__NIXLE || {};
export {
  R as StatusCode,
  iE as createApp,
  t as createError,
  OE as createGuard,
  NE as createModule,
  lE as createPlugin,
  IE as createProvider,
  RE as createRouter,
  cE as createService,
  Z as extendRouterOptions,
  j as isNixleError
};
