import { createConsola as h } from "consola";
import { colorize as _, colors as Q } from "consola/utils";
import M from "dayjs";
import p from "callsite-record";
import { joinURL as G } from "ufo";
import V from "mitt";
import Y from "dotenv";
var R = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(R || {});
const B = (E, e) => Object.fromEntries(Object.entries(E).filter(([r]) => !e.includes(r))), b = (E) => E !== Object(E), F = (...E) => {
  const e = G("", ...E), r = e.startsWith("/") ? e : `/${e}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, P = (E) => {
  try {
    const e = JSON.parse(E);
    return typeof e == "number" || typeof e == "boolean" || e === void 0 || e === null ? e : E;
  } catch {
    return E;
  }
}, a = (E) => Object.fromEntries(
  Object.entries(E).map(([e, r]) => [
    e,
    Array.isArray(r) ? r.map(P) : P(r)
  ])
), f = V(), H = {
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
    let i = (e ? " > " : "   ") + E + " ";
    e && (i = _("bgRed", i));
    let T = i + "|" + r;
    return n || (T += `
`), T;
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
class v extends Error {
  constructor({
    statusCode: e,
    message: r,
    details: n
  }) {
    super(), this.time = M().format(), this.statusCode = R.BAD_REQUEST, this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = e, this.message = r, this.details = n;
  }
}
const X = (E) => p({
  forError: E,
  isCallsiteFrame: (r) => !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist")
})?.renderSync({
  renderer: H,
  stackFilter: (r) => !!r.source && !r.source.includes("node_modules") && !r.source.includes("node:") && !r.source.includes("nixle/dist")
});
function A(E, e) {
  const r = typeof E == "string" ? E : E.message;
  throw new v({
    message: r,
    statusCode: typeof E == "string" ? e || R.BAD_REQUEST : E.statusCode || R.BAD_REQUEST,
    details: typeof E == "string" ? {} : E.details || {}
  });
}
const j = (E) => E instanceof v, m = (E, e) => {
  let r = "";
  if (j(E) || E instanceof Error ? r = E.message : b(E) ? r = E : r = `${E.constructor.name} ${JSON.stringify(E)}`, E && (!E.statusCode || E.statusCode >= R.INTERNAL_SERVER_ERROR))
    if (E instanceof Error) {
      const n = X(E);
      e.fatal(_("red", r), ...n ? [`
`, n] : []);
    } else
      e.fatal(_("red", r));
  else
    e.error(_("red", r));
  f.emit("error", E);
}, y = (E, e) => {
  const r = M().format(), n = b(E), c = n && E || E.message || "Internal Server Error", i = n && r || E.time || r, T = n && {} || E.details || {}, l = {
    statusCode: e,
    message: c,
    time: i,
    details: T
  };
  return l.details = {
    ...l.details,
    ...B(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
      "message",
      "name",
      "stack",
      "statusCode",
      "time",
      "details"
    ])
  }, l;
}, x = (E) => {
  __NIXLE.loggerInstance = h(E);
}, N = (E, ...e) => {
  if (!__NIXLE.loggerInstance)
    return;
  const r = `${_("bgBlue", " Nixle ")}`, n = __NIXLE.loggerInstance[E];
  n || A({
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
}, o = (E, e = "bgWhite") => Object.fromEntries(
  Object.entries(D).map(([r, n]) => [
    r,
    (...c) => n(_(e, ` ${E} `), ...c)
  ])
), w = ({ provider: E }, e, r) => {
  const n = o(e || "/", "bgGreen");
  try {
    r.length === 0 && A({
      message: "At least one router is required",
      statusCode: R.INTERNAL_SERVER_ERROR
    }), r.some(({ path: c, method: i, handler: T }) => !c || !i || !T) && A({
      message: "Path, method and handler are required for each route",
      statusCode: R.INTERNAL_SERVER_ERROR
    });
  } catch (c) {
    m(c, n), process.exit(1);
  }
  r.forEach(({ path: c, method: i, options: T, handler: l }) => {
    const U = F(e, c), t = o(`${Q.bold(i)} ${U}`, "bgGreen");
    E.createRoute({
      method: i.toLowerCase(),
      path: U,
      middleware(I) {
        f.emit("request", I), T?.middleware?.(I);
      },
      async handler(I) {
        const g = {
          ...I,
          query: a(I.query),
          params: a(I.params)
        };
        try {
          await Promise.all([
            T?.queryValidation?.(g.query),
            T?.paramsValidation?.(g.params),
            T?.bodyValidation?.(g.body)
          ]);
        } catch (s) {
          const L = s?.statusCode || R.BAD_REQUEST;
          return m(s, t), I.setStatusCode(L), y(s, L);
        }
        try {
          const s = await l(g);
          return f.emit("response", s), T?.statusCode && I.setStatusCode(T.statusCode), s;
        } catch (s) {
          const L = s?.statusCode || R.INTERNAL_SERVER_ERROR;
          return m(s, t), I.setStatusCode(L), y(s, L);
        }
      }
    }), t.success("🚏 Successfully registered");
  });
}, W = (E) => {
  E.modules.forEach((e) => {
    e.options.routers.forEach(({ path: r, routes: n }) => {
      w(E, F(E.globalPrefix || "", r || ""), n());
    });
  });
}, O = (E, e, r) => typeof r == "function" ? {
  path: e,
  method: E,
  handler: r
} : {
  path: e,
  method: E,
  options: r,
  handler: r.handler
}, $ = (E, e) => O("GET", E, e), k = (E, e) => O("POST", E, e), q = (E, e) => O("PATCH", E, e), u = (E, e) => O("PUT", E, e), K = (E, e) => O("DELETE", E, e), J = (E, e) => O("OPTIONS", E, e), d = {
  get: $,
  post: k,
  patch: q,
  put: u,
  delete: K,
  options: J
}, Z = (E) => {
  __NIXLE.routerOptions = {
    ...__NIXLE.routerOptions,
    ...E
  };
};
function iE(E, e) {
  typeof E == "string" && !e && A({
    message: "Missing options",
    statusCode: R.INTERNAL_SERVER_ERROR
  });
  const r = typeof E == "string" ? E : "", n = typeof E == "string" ? typeof e == "function" ? {} : e?.services || {} : typeof E == "function" ? {} : E.services || {}, c = typeof E == "string" ? typeof e == "function" ? e : e.routes : typeof E == "function" ? E : E.routes, i = () => c(
    {
      route: d,
      log: r ? o(r, "bgGreen") : D,
      env: __NIXLE.env || {},
      ...__NIXLE.routerOptions
    },
    Object.entries(n).reduce(
      (T, [l, U]) => ({
        ...T,
        [l]: U(l)
      }),
      {}
    )
  );
  return typeof E == "function" ? {
    routes: i
  } : typeof E == "string" ? {
    path: r,
    routes: i,
    services: n
  } : {
    routes: i,
    services: n
  };
}
const z = (E) => {
  __NIXLE.serviceOptions = {
    ...__NIXLE.serviceOptions,
    ...E
  };
}, RE = (E) => (e) => E({ log: o(e, "bgCyan"), env: __NIXLE.env || {}, ...__NIXLE.serviceOptions }), S = (E, e) => {
  e.plugins && e.plugins.forEach(({ name: r, plugin: n }) => {
    const c = o(r, "bgMagenta");
    n({ provider: E, log: c, extendRouterOptions: Z, extendServiceOptions: z }), D.success(`🚀 ${_("bgBlue", ` ${r.trim()} `)} plugin successfully loaded`);
  });
}, C = (E) => {
  Y.config(E), __NIXLE.env || (__NIXLE.env = {}), Object.keys(process.env).forEach((e) => {
    __NIXLE.env[e] = process.env[e];
  });
}, NE = (E) => {
  E.logger !== !1 && x(E.logger || {});
  try {
    E.provider || A({
      message: "Provider is required",
      statusCode: R.INTERNAL_SERVER_ERROR
    }), E.modules.length === 0 && A({
      message: "At least one module is required",
      statusCode: R.INTERNAL_SERVER_ERROR
    });
  } catch (r) {
    m(r, D), process.exit(1);
  }
  E.plugins && S(E.provider, E), C(E.env), W(E), E.provider.globalMiddleware(({ setHeader: r }) => {
    r("X-Powered-By", "Nixle");
  });
  const e = {
    app: E.provider.app,
    events: {
      on: f.on,
      emit: f.emit
    }
  };
  return D.success(`🔥 ${_("underline", "Application successfully started")}`), e;
}, sE = (E) => ({ options: E }), IE = (E) => E, lE = (E, e) => ({
  name: E,
  plugin: e
});
globalThis.__NIXLE = globalThis.__NIXLE || {};
export {
  R as StatusCode,
  NE as createApp,
  A as createError,
  sE as createModule,
  lE as createPlugin,
  IE as createProvider,
  iE as createRouter,
  RE as createService,
  Z as extendRouterOptions,
  j as isNixleError
};
