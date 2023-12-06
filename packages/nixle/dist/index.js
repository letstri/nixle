import { createConsola as F } from "consola";
import { colorize as U } from "consola/utils";
import L from "dayjs";
import Y from "mitt";
var H = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(H || {});
const P = "YYYY-MM-DD HH:mm:ss", p = (E, T) => Object.fromEntries(Object.entries(E).filter(([O]) => !T.includes(O))), s = (E) => E !== Object(E), e = Y();
class r extends Error {
  constructor({ message: T, statusCode: O, ...R }) {
    super(T), this.time = L().format(P), this.statusCode = 400, this.isInternal = !1, this.name = "NixleError", this.statusCode = O || 400, Object.assign(this, R);
  }
}
function n(E) {
  throw typeof E == "string" ? new r({ message: E, isInternal: !0 }) : new r({ ...E, isInternal: !0 });
}
function K(E) {
  throw typeof E == "string" ? new r({ message: E, isInternal: !1 }) : new r({ ...E, isInternal: !1 });
}
const Q = (E) => E instanceof r, i = (E) => {
  let T = "";
  Q(E) ? T = E.isInternal && E.stack || E.message : E instanceof Error ? T = E.stack || E.message : s(E) ? T = E : T = `${E.constructor.name} ${JSON.stringify(E)}`, c(U("red", T), { type: "error" }), e.emit("error", E);
}, G = (E) => {
  const T = ["name", "stack", "message", "statusCode", "time", "isInternal"], O = L().format(P), R = s(E) ? {
    statusCode: 500,
    message: String(E),
    time: O
  } : {
    statusCode: E.statusCode || 500,
    message: E.message || "Internal Server Error",
    time: E.time || O
  };
  return E instanceof Error && Object.assign(
    R,
    p(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), T)
  ), R;
};
let g;
const y = (E) => {
  g = F(E);
}, c = (E, T) => {
  const O = T?.type || "log", R = `${U("bgBlue", " Nixle ")}`, _ = g?.[O || "log"];
  _ || n(`Logger method "${O}" not found`), _(`${R} ${E}`);
}, l = (E, T = "bgWhite") => (O, R) => c(`${U(T, `[${E}]`)} ${O}`, R), D = (E) => {
  const T = E.startsWith("/") ? E : `/${E}`;
  return T.endsWith("/") ? T.slice(0, -1) : T;
}, f = {}, b = (E) => {
  Object.assign(f, E);
}, X = (E, T) => [E, T], x = (E, T, O) => {
  const R = l(T, "bgGreen"), _ = O({ log: R, ...f });
  try {
    _.length === 0 && n("At least one router is required"), _.some((N) => !N.path || !N.handler) && n("Path and handler are required for each route");
  } catch (N) {
    i(N), process.exit(1);
  }
  _.forEach((N) => {
    const M = N.method ? N.method.toLowerCase() : "get", h = T + D(N.path);
    E.provider.createRoute(M, h, async (A) => {
      e.emit("request", A), A.setHeader("x-powered-by", "Nixle"), N.statusCode && A.setStatusCode(N.statusCode);
      try {
        const I = await N.handler(A);
        return e.emit("response", I), I;
      } catch (I) {
        throw i(I), G(I);
      }
    });
  }), R(`🚏 ${_.length} route${_.length === 1 ? "" : "s"} successfully built`, {
    type: "success"
  });
}, B = (E) => {
  E.modules.forEach((T) => {
    T.routers.forEach(([O, R]) => {
      const _ = E.globalPrefix ? D(E.globalPrefix) : "";
      x(E, _ + D(O), R);
    });
  });
}, m = {}, V = (E) => {
  Object.assign(m, E);
}, q = (E, T) => T({ log: l(E), ...m }), v = (E, T) => {
  T.plugins && T.plugins.forEach(([O, R]) => {
    const _ = l(O, "bgMagenta");
    R({ nixleApp: E, log: _, extendRouterOptions: b, extendServiceOptions: V }), c(`🚀 ${O.trim()} plugin successfully loaded`, { type: "success" });
  });
}, k = (E) => {
  y(E.logger || {});
  try {
    E.provider || n("Provider is required"), E.modules.length === 0 && n("At least one module is required");
  } catch (O) {
    i(O), process.exit(1);
  }
  B(E);
  const T = {
    app: E.provider.app,
    events: {
      on: e.on,
      emit: e.emit
    },
    createRoute: E.provider.createRoute
  };
  return E.plugins && v(T, E), c("🫡  Application successfully started", { type: "success" }), T;
}, J = (E) => E, Z = (E) => E, z = (E, T) => [E, T];
export {
  H as StatusCode,
  k as createApp,
  K as createError,
  J as createModule,
  z as createPlugin,
  Z as createProvider,
  X as createRouter,
  q as createService,
  Q as isNixleError
};
