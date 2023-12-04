import { createConsola as Y } from "consola";
import { colorize as l } from "consola/utils";
import P from "dayjs";
import p from "mitt";
var H = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(H || {});
const s = "YYYY-MM-DD HH:mm:ss", Q = (E, T) => Object.fromEntries(Object.entries(E).filter(([O]) => !T.includes(O))), g = (E) => E !== Object(E), r = p();
class n extends Error {
  constructor({ message: T, statusCode: O, ...R }) {
    super(T), this.time = P().format(s), this.statusCode = 400, this.isInternal = !1, this.name = "NixleError", this.statusCode = O || 400, Object.assign(this, R);
  }
}
function A(E) {
  throw typeof E == "string" ? new n({ message: E, isInternal: !0 }) : new n({ ...E, isInternal: !0 });
}
function X(E) {
  throw typeof E == "string" ? new n({ message: E, isInternal: !1 }) : new n({ ...E, isInternal: !1 });
}
const G = (E) => E instanceof n, U = (E) => {
  let T = "";
  G(E) ? T = E.isInternal && E.stack || E.message : E instanceof Error ? T = E.stack || E.message : g(E) ? T = E : T = `${E.constructor.name} ${JSON.stringify(E)}`, i(l("red", T), { type: "error" }), r.emit("error", E);
}, y = (E) => {
  const T = ["name", "stack", "message", "statusCode", "time", "isInternal"], O = P().format(s), R = g(E) ? {
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
    Q(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), T)
  ), R;
};
let m;
const b = (E) => {
  m = Y(E);
}, i = (E, T) => {
  const O = T?.type || "log", R = `${l("bgBlue", " Nixle ")}`, N = m?.[O || "log"];
  N || A(`Logger method "${O}" not found`), N(`${R} ${E}`);
}, L = (E, T = "bgWhite") => (O, R) => i(`${l(T, `[${E}]`)} ${O}`, R), D = (E) => {
  const T = E.startsWith("/") ? E : `/${E}`;
  return T.endsWith("/") ? T.slice(0, -1) : T;
}, M = {}, B = (E) => {
  Object.assign(M, E);
}, q = (E, T) => [E, T], x = (E, T, O) => {
  const R = D(T), N = L(R, "bgGreen"), I = O({ log: N, ...M });
  try {
    I.length === 0 && A("At least one router is required"), I.some((_) => !_.path || !_.handler) && A("Path and handler are required for each route");
  } catch (_) {
    U(_), process.exit(1);
  }
  I.forEach((_) => {
    const h = _.method ? _.method.toLowerCase() : "get", F = D(R) + D(_.path);
    E.provider.createRoute(h, F, async (c) => {
      r.emit("request", c), c.setHeader("x-powered-by", "Nixle"), _.statusCode && c.setStatusCode(_.statusCode);
      try {
        const e = await _.handler(c);
        return r.emit("response", e), e;
      } catch (e) {
        throw U(e), y(e);
      }
    });
  }), N(`🚏 ${I.length} route${I.length === 1 ? "" : "s"} successfully built`, {
    type: "success"
  });
}, V = (E) => {
  E.modules.forEach((T) => {
    T.routers.forEach(([O, R]) => {
      x(E, O, R);
    });
  });
}, f = {}, v = (E) => {
  Object.assign(f, E);
}, o = (E, T) => T({ log: L(E), ...f }), w = (E, T) => {
  T.plugins && T.plugins.forEach(([O, R]) => {
    const N = L(O, "bgMagenta");
    R({ nixleApp: E, log: N, extendRouterOptions: B, extendServiceOptions: v }), i(`🚀 ${O.trim()} plugin successfully loaded`, { type: "success" });
  });
}, k = (E) => {
  b(E.logger || {});
  try {
    E.provider || A("Provider is required"), E.modules.length === 0 && A("At least one module is required");
  } catch (O) {
    U(O), process.exit(1);
  }
  V(E);
  const T = {
    app: E.provider.app,
    events: {
      on: r.on,
      emit: r.emit
    },
    createRoute: E.provider.createRoute
  };
  return E.plugins && w(T, E), i("🫡  Application successfully started", { type: "success" }), T;
}, J = (E) => E, Z = (E) => E, z = (E, T) => [E, T];
export {
  H as StatusCode,
  k as createApp,
  X as createError,
  J as createModule,
  z as createPlugin,
  Z as createProvider,
  q as createRouter,
  o as createService,
  G as isNixleError
};
