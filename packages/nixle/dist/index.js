import { colorize as m, colors as p } from "consola/utils";
import { createConsola as Y } from "consola";
import G from "dayjs";
import H from "mitt";
import V from "dotenv";
var e = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(e || {});
const B = (E, T) => Object.fromEntries(Object.entries(E).filter(([R]) => !T.includes(R))), Q = (E) => E !== Object(E), i = H(), M = Symbol("NixleError");
function l(E) {
  throw {
    message: typeof E == "string" ? E : E.message,
    statusCode: typeof E == "string" ? e.INTERNAL_SERVER_ERROR : E.statusCode || e.INTERNAL_SERVER_ERROR,
    time: G().format(),
    details: typeof E == "string" ? {} : E.details,
    __nixle: M
  };
}
const v = (E) => E?.__nixle === M, U = (E, T) => {
  let R = "";
  v(E) || E instanceof Error ? R = E.message : Q(E) ? R = E : R = `${E.constructor.name} ${JSON.stringify(E)}`, T(m("red", R), { type: "error" }), i.emit("error", E);
}, F = (E, T = e.INTERNAL_SERVER_ERROR) => {
  const R = G().format(), _ = Q(E), O = _ && T || E.statusCode || T, A = _ && E || E.message || "Internal Server Error", r = _ && R || E.time || R, g = _ && {} || E.details || {}, n = {
    statusCode: O,
    message: A,
    time: r,
    details: g,
    __nixle: M
  };
  return E instanceof Error && (n.details = B(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
    "message",
    "name",
    "stack"
  ])), n;
};
let f;
const W = (E) => {
  f = Y(E);
}, P = (E, T) => {
  if (!f)
    return;
  const R = T?.type || "log", _ = `${m("bgBlue", " Nixle ")}`, O = f[R || "log"];
  O || l(`Logger method "${R}" not found`), O(`${_}`, ...Array.isArray(E) ? E : [E]);
}, D = (E, T = "bgWhite") => (R, _) => P(
  [m(T, ` ${E} `), ...Array.isArray(R) ? R : [R]],
  _
), L = (E) => {
  const T = E.startsWith("/") ? E : `/${E}`;
  return T.endsWith("/") ? T.slice(0, -1) : T;
}, x = ({ provider: E }, T, R) => {
  const _ = D(T, "bgGreen");
  try {
    R.length === 0 && l("At least one router is required"), R.some(({ path: O, method: A, handler: r }) => !O || !A || !r) && l("Path, method and handler are required for each route");
  } catch (O) {
    U(O, _), process.exit(1);
  }
  R.forEach(({ path: O, method: A, options: r, handler: g }) => {
    const n = T + L(O), y = D(`${p.bold(A)} ${n}`, "bgGreen");
    E.createRoute({
      method: A.toLowerCase(),
      path: n,
      middleware(N) {
        i.emit("request", N), r?.middleware?.(N);
      },
      async handler(N) {
        try {
          await Promise.all([
            r?.queryValidation?.(N.query),
            r?.paramsValidation?.(N.params),
            r?.bodyValidation?.(N.body)
          ]);
        } catch (I) {
          return U(I, y), N.setStatusCode(I?.statusCode || e.BAD_REQUEST), F(I, e.BAD_REQUEST);
        }
        try {
          const I = await g(N);
          return i.emit("response", I), r?.statusCode && N.setStatusCode(r.statusCode), I;
        } catch (I) {
          return U(I, y), F(I);
        }
      }
    });
  }), _(`🚏 ${R.length} route${R.length === 1 ? "" : "s"} successfully built`, {
    type: "success"
  });
}, $ = (E) => {
  E.modules.forEach((T) => {
    T.routers.forEach(({ path: R, routes: _ }) => {
      const O = E.globalPrefix ? L(E.globalPrefix) : "";
      x(E, O + R, _);
    });
  });
}, s = {}, w = (E) => {
  V.config(E), Object.keys(process.env).forEach((T) => {
    s[T] = process.env[T];
  });
}, h = {}, j = (E) => {
  Object.assign(h, E);
}, d = (E, T) => ({
  path: L(E),
  routes: T({ log: D(L(E), "bgGreen"), env: s, ...h })
}), b = {}, o = (E) => {
  Object.assign(b, E);
}, EE = (E, T) => T({ log: D(E), env: s, ...b }), q = (E, T) => {
  T.plugins && T.plugins.forEach(async ({ name: R, plugin: _ }) => {
    const O = D(R, "bgMagenta");
    await _({ nixleApp: E, log: O, extendRouterOptions: j, extendServiceOptions: o }), P(`🚀 ${R.trim()} plugin successfully loaded`, { type: "success" });
  });
}, TE = (E) => {
  E.logger !== !1 && W(E.logger || {});
  try {
    E.provider || l("Provider is required"), E.modules.length === 0 && l("At least one module is required");
  } catch (R) {
    U(R, P), process.exit(1);
  }
  w(E.env), $(E), E.provider.globalMiddleware(({ setHeader: R }) => {
    R("X-Powered-By", "Nixle");
  });
  const T = {
    app: E.provider.app,
    events: {
      on: i.on,
      emit: i.emit
    }
  };
  return E.plugins && q(T, E), P("🚀 Application successfully started", { type: "success" }), T;
}, RE = (E) => E, c = (E) => (T, R) => typeof R == "function" ? {
  path: T,
  method: E,
  handler: R
} : {
  path: T,
  method: E,
  options: R,
  handler: R.handler
}, X = (E, T) => c("GET")(E, T), K = (E, T) => c("POST")(E, T), J = (E, T) => c("PATCH")(E, T), Z = (E, T) => c("PUT")(E, T), k = (E, T) => c("DELETE")(E, T), z = (E, T) => c("OPTIONS")(E, T), _E = {
  get: X,
  post: K,
  patch: J,
  put: Z,
  delete: k,
  options: z
}, OE = (E) => E, rE = (E, T) => ({
  name: E,
  plugin: T
});
export {
  e as StatusCode,
  TE as createApp,
  l as createError,
  RE as createModule,
  rE as createPlugin,
  OE as createProvider,
  d as createRouter,
  EE as createService,
  j as extendRouterOptions,
  v as isNixleError,
  _E as route,
  h as routerOptions
};
