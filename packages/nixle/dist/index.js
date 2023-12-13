import { createConsola as H } from "consola";
import { colorize as s, colors as p } from "consola/utils";
import y from "dayjs";
import Y from "mitt";
import v from "dotenv";
var L = /* @__PURE__ */ ((E) => (E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", E))(L || {});
const V = (E, T) => Object.fromEntries(Object.entries(E).filter(([R]) => !T.includes(R))), b = (E) => E !== Object(E), l = Y(), m = Symbol("NixleError");
function D(E) {
  throw {
    message: typeof E == "string" ? E : E.message,
    statusCode: typeof E == "string" ? L.INTERNAL_SERVER_ERROR : E.statusCode || L.INTERNAL_SERVER_ERROR,
    time: y().format(),
    details: typeof E == "string" ? {} : E.details,
    __nixle: m
  };
}
const B = (E) => E?.__nixle === m, P = (E, T) => {
  let R = "";
  B(E) || E instanceof Error ? R = E.message : b(E) ? R = E : R = `${E.constructor.name} ${JSON.stringify(E)}`, T(s("red", R), { type: "error" }), l.emit("error", E);
}, o = (E, T = L.INTERNAL_SERVER_ERROR) => {
  const R = y().format(), _ = b(E), O = _ && T || E.statusCode || T, N = _ && E || E.message || "Internal Server Error", r = _ && R || E.time || R, c = _ && {} || E.details || {}, A = {
    statusCode: O,
    message: N,
    time: r,
    details: c,
    __nixle: m
  };
  return E instanceof Error && (A.details = V(JSON.parse(JSON.stringify(E, Object.getOwnPropertyNames(E))), [
    "message",
    "name",
    "stack"
  ])), A;
};
let f;
const x = (E) => {
  f = H(E);
}, g = (E, T) => {
  if (!f)
    return;
  const R = T?.type || "log", _ = `${s("bgBlue", " Nixle ")}`, O = f[R || "log"];
  O || D(`Logger method "${R}" not found`), O(`${_}`, ...Array.isArray(E) ? E : [E]);
}, i = (E, T = "bgWhite") => (R, _) => g(
  [s(T, ` ${E} `), ...Array.isArray(R) ? R : [R]],
  _
), I = (E) => {
  const T = E.startsWith("/") ? E : `/${E}`;
  return T.endsWith("/") ? T.slice(0, -1) : T;
}, W = (E, T, R) => {
  const _ = i(T, "bgGreen");
  try {
    R.length === 0 && D("At least one router is required"), R.some(
      ({ path: O, method: N, route: r }) => !O || !N || !(typeof r == "function" ? r : r.handler)
    ) && D("Path and handler are required for each route");
  } catch (O) {
    P(O, _), process.exit(1);
  }
  R.forEach(({ path: O, method: N, route: r }) => {
    const c = T + I(O), A = typeof r == "function" ? void 0 : r.statusCode, U = typeof r == "function" ? void 0 : r, Q = typeof r == "function" ? r : r.handler, h = i(`${p.bold(N)} ${c}`, "bgGreen");
    E.provider.createRoute({
      method: N.toLowerCase(),
      path: c,
      middleware: (e) => {
        l.emit("request", e), U?.middleware?.(e);
      },
      handler: async (e) => {
        try {
          await Promise.all([
            U?.queryValidation?.(e.query),
            U?.paramsValidation?.(e.params),
            U?.bodyValidation?.(e.body)
          ]);
        } catch (n) {
          throw P(n, h), e.setStatusCode(400), o(n, 400);
        }
        A && e.setStatusCode(A);
        try {
          const n = await Q(e);
          return l.emit("response", n), n;
        } catch (n) {
          throw P(n, h), o(n);
        }
      }
    });
  }), _(`🚏 ${R.length} route${R.length === 1 ? "" : "s"} successfully built`, {
    type: "success"
  });
}, $ = (E) => {
  E.modules.forEach((T) => {
    T.routers.forEach(([R, _]) => {
      const O = E.globalPrefix ? I(E.globalPrefix) : "";
      W(E, O + I(R), _);
    });
  });
}, M = {}, w = (E) => {
  v.config(E), Object.keys(process.env).forEach((T) => {
    M[T] = process.env[T];
  });
}, F = {}, j = (E) => {
  Object.assign(F, E);
}, EE = (E, T) => [E, T({ log: i(E, "bgGreen"), env: M, ...F })], G = {}, q = (E) => {
  Object.assign(G, E);
}, TE = (E, T) => T({ log: i(E), env: M, ...G }), X = (E, T) => {
  T.plugins && T.plugins.forEach(async ({ name: R, plugin: _ }) => {
    const O = i(R, "bgMagenta");
    await _({ nixleApp: E, log: O, extendRouterOptions: j, extendServiceOptions: q }), g(`🚀 ${R.trim()} plugin successfully loaded`, { type: "success" });
  });
}, RE = (E) => {
  E.logger !== !1 && x(E.logger || {});
  try {
    E.provider || D("Provider is required"), E.modules.length === 0 && D("At least one module is required");
  } catch (R) {
    P(R, g), process.exit(1);
  }
  w(E.env), $(E), E.provider.globalMiddleware(({ setHeader: R, method: _, url: O }) => {
    R("X-Powered-By", "Nixle");
    const N = I(O.startsWith("http") ? new URL(O).pathname : O.split("&")[0]), r = E.globalPrefix ? I(E.globalPrefix) + N : N;
    i(
      `${p.bold(_)} ${E.globalPrefix && r.startsWith(I(E.globalPrefix)) ? r : N}`,
      "bgGreen"
    )("📫 Request received", {
      type: "info"
    });
  });
  const T = {
    app: E.provider.app,
    events: {
      on: l.on,
      emit: l.emit
    }
  };
  return E.plugins && X(T, E), g("🚀 Application successfully started", { type: "success" }), T;
}, OE = (E) => E, K = (E, T) => ({ path: E, route: T, method: "GET" }), J = (E, T) => ({ path: E, route: T, method: "POST" }), a = (E, T) => ({ path: E, route: T, method: "PATCH" }), Z = (E, T) => ({ path: E, route: T, method: "PUT" }), k = (E, T) => ({ path: E, route: T, method: "DELETE" }), z = (E, T) => ({ path: E, route: T, method: "OPTIONS" }), _E = {
  get: K,
  post: J,
  patch: a,
  put: Z,
  delete: k,
  options: z
}, rE = (E) => E, NE = (E, T) => ({
  name: E,
  plugin: T
});
export {
  L as StatusCode,
  RE as createApp,
  D as createError,
  OE as createModule,
  NE as createPlugin,
  rE as createProvider,
  EE as createRouter,
  TE as createService,
  j as extendRouterOptions,
  B as isNixleError,
  _E as route,
  F as routerOptions
};
