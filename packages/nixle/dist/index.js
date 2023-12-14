import { colorize as f, colors as h } from "consola/utils";
import { createConsola as H } from "consola";
import y from "dayjs";
import Y from "mitt";
import v from "dotenv";
var P = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(P || {});
const V = (E, T) => Object.fromEntries(Object.entries(E).filter(([R]) => !T.includes(R))), F = (E) => E !== Object(E), c = Y(), m = Symbol("NixleError");
function A(E) {
  throw {
    message: typeof E == "string" ? E : E.message,
    statusCode: typeof E == "string" ? P.INTERNAL_SERVER_ERROR : E.statusCode || P.INTERNAL_SERVER_ERROR,
    time: y().format(),
    details: typeof E == "string" ? {} : E.details,
    __nixle: m
  };
}
const B = (E) => E?.__nixle === m, L = (E, T) => {
  let R = "";
  B(E) || E instanceof Error ? R = E.message : F(E) ? R = E : R = `${E.constructor.name} ${JSON.stringify(E)}`, T(f("red", R), { type: "error" }), c.emit("error", E);
}, o = (E, T = P.INTERNAL_SERVER_ERROR) => {
  const R = y().format(), _ = F(E), O = _ && T || E.statusCode || T, n = _ && E || E.message || "Internal Server Error", r = _ && R || E.time || R, D = _ && {} || E.details || {}, i = {
    statusCode: O,
    message: n,
    time: r,
    details: D,
    __nixle: m
  };
  return E instanceof Error && (i.details = V(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
    "message",
    "name",
    "stack"
  ])), i;
};
let s;
const W = (E) => {
  s = H(E);
}, g = (E, T) => {
  if (!s)
    return;
  const R = T?.type || "log", _ = `${f("bgBlue", " Nixle ")}`, O = s[R || "log"];
  O || A(`Logger method "${R}" not found`), O(`${_}`, ...Array.isArray(E) ? E : [E]);
}, I = (E, T = "bgWhite") => (R, _) => g(
  [f(T, ` ${E} `), ...Array.isArray(R) ? R : [R]],
  _
), l = (E) => {
  const T = E.startsWith("/") ? E : `/${E}`;
  return T.endsWith("/") ? T.slice(0, -1) : T;
}, $ = (E, T, R) => {
  const _ = I(T, "bgGreen");
  try {
    R.length === 0 && A("At least one router is required"), R.some(
      ({ path: O, method: n, route: r }) => !O || !n || !(typeof r == "function" ? r : r.handler)
    ) && A("Path and handler are required for each route");
  } catch (O) {
    L(O, _), process.exit(1);
  }
  R.forEach(({ path: O, method: n, route: r }) => {
    const D = T + l(O), i = typeof r == "function" ? void 0 : r.statusCode, U = typeof r == "function" ? void 0 : r, Q = typeof r == "function" ? r : r.handler, p = I(`${h.bold(n)} ${D}`, "bgGreen");
    E.provider.createRoute({
      method: n.toLowerCase(),
      path: D,
      middleware: (N) => {
        c.emit("request", N), U?.middleware?.(N);
      },
      handler: async (N) => {
        try {
          await Promise.all([
            U?.queryValidation?.(N.query),
            U?.paramsValidation?.(N.params),
            U?.bodyValidation?.(N.body)
          ]);
        } catch (e) {
          return L(e, p), N.setStatusCode(400), o(e, 400);
        }
        i && N.setStatusCode(i);
        try {
          const e = await Q(N);
          return c.emit("response", e), e;
        } catch (e) {
          return L(e, p), o(e);
        }
      }
    });
  }), _(`🚏 ${R.length} route${R.length === 1 ? "" : "s"} successfully built`, {
    type: "success"
  });
}, x = (E) => {
  E.modules.forEach((T) => {
    T.routers.forEach(({ path: R, routes: _ }) => {
      const O = E.globalPrefix ? l(E.globalPrefix) : "";
      $(E, O + R, _);
    });
  });
}, M = {}, w = (E) => {
  v.config(E), Object.keys(process.env).forEach((T) => {
    M[T] = process.env[T];
  });
}, G = {}, j = (E) => {
  Object.assign(G, E);
}, EE = (E, T) => ({
  path: l(E),
  routes: T({ log: I(l(E), "bgGreen"), env: M, ...G })
}), b = {}, q = (E) => {
  Object.assign(b, E);
}, TE = (E, T) => T({ log: I(E), env: M, ...b }), X = (E, T) => {
  T.plugins && T.plugins.forEach(async ({ name: R, plugin: _ }) => {
    const O = I(R, "bgMagenta");
    await _({ nixleApp: E, log: O, extendRouterOptions: j, extendServiceOptions: q }), g(`🚀 ${R.trim()} plugin successfully loaded`, { type: "success" });
  });
}, RE = (E) => {
  E.logger !== !1 && W(E.logger || {});
  try {
    E.provider || A("Provider is required"), E.modules.length === 0 && A("At least one module is required");
  } catch (R) {
    L(R, g), process.exit(1);
  }
  w(E.env), x(E), E.provider.globalMiddleware(({ setHeader: R, method: _, url: O }) => {
    R("X-Powered-By", "Nixle");
    const n = l(O.startsWith("http") ? new URL(O).pathname : O.split("&")[0]);
    I(`${h.bold(_)} ${n}`, "bgGreen")("📫 Request received", {
      type: "info"
    });
  });
  const T = {
    app: E.provider.app,
    events: {
      on: c.on,
      emit: c.emit
    }
  };
  return E.plugins && X(T, E), g("🚀 Application successfully started", { type: "success" }), T;
}, OE = (E) => E, K = (E, T) => ({ path: E, route: T, method: "GET" }), J = (E, T) => ({ path: E, route: T, method: "POST" }), Z = (E, T) => ({ path: E, route: T, method: "PATCH" }), k = (E, T) => ({ path: E, route: T, method: "PUT" }), z = (E, T) => ({ path: E, route: T, method: "DELETE" }), a = (E, T) => ({ path: E, route: T, method: "OPTIONS" }), _E = {
  get: K,
  post: J,
  patch: Z,
  put: k,
  delete: z,
  options: a
}, rE = (E) => E, NE = (E, T) => ({
  name: E,
  plugin: T
});
export {
  P as StatusCode,
  RE as createApp,
  A as createError,
  OE as createModule,
  NE as createPlugin,
  rE as createProvider,
  EE as createRouter,
  TE as createService,
  j as extendRouterOptions,
  B as isNixleError,
  _E as route,
  G as routerOptions
};
