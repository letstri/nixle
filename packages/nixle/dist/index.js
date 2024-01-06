import { createConsola as K } from "consola";
import { colorize as s, colors as J } from "consola/utils";
import H from "dayjs";
import S from "callsite-record";
import C from "mitt";
import ee from "dotenv";
import { joinURL as re } from "ufo";
var o = /* @__PURE__ */ ((e) => (e[e.CONTINUE = 100] = "CONTINUE", e[e.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", e[e.PROCESSING = 102] = "PROCESSING", e[e.EARLY_HINTS = 103] = "EARLY_HINTS", e[e.OK = 200] = "OK", e[e.CREATED = 201] = "CREATED", e[e.ACCEPTED = 202] = "ACCEPTED", e[e.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", e[e.NO_CONTENT = 204] = "NO_CONTENT", e[e.RESET_CONTENT = 205] = "RESET_CONTENT", e[e.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", e[e.MULTI_STATUS = 207] = "MULTI_STATUS", e[e.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", e[e.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", e[e.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", e[e.SEE_OTHER = 303] = "SEE_OTHER", e[e.NOT_MODIFIED = 304] = "NOT_MODIFIED", e[e.USE_PROXY = 305] = "USE_PROXY", e[e.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", e[e.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", e[e.BAD_REQUEST = 400] = "BAD_REQUEST", e[e.UNAUTHORIZED = 401] = "UNAUTHORIZED", e[e.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", e[e.FORBIDDEN = 403] = "FORBIDDEN", e[e.NOT_FOUND = 404] = "NOT_FOUND", e[e.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", e[e.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", e[e.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", e[e.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", e[e.CONFLICT = 409] = "CONFLICT", e[e.GONE = 410] = "GONE", e[e.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", e[e.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", e[e.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", e[e.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", e[e.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", e[e.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", e[e.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", e[e.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", e[e.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", e[e.METHOD_FAILURE = 420] = "METHOD_FAILURE", e[e.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", e[e.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", e[e.LOCKED = 423] = "LOCKED", e[e.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", e[e.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", e[e.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", e[e.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", e[e.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", e[e.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", e[e.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", e[e.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", e[e.BAD_GATEWAY = 502] = "BAD_GATEWAY", e[e.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", e[e.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", e[e.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", e[e.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", e[e.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED", e))(o || {}), Ee = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ne(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var W = { exports: {} };
(function(e, r) {
  (function(E, i) {
    e.exports = i();
  })(Ee, function() {
    var E = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, i = {};
    return function(O, N, c) {
      var R, u = function(n, t, _) {
        _ === void 0 && (_ = {});
        var T = new Date(n), f = function(g, l) {
          l === void 0 && (l = {});
          var D = l.timeZoneName || "short", L = g + "|" + D, m = i[L];
          return m || (m = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: g, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: D }), i[L] = m), m;
        }(t, _);
        return f.formatToParts(T);
      }, P = function(n, t) {
        for (var _ = u(n, t), T = [], f = 0; f < _.length; f += 1) {
          var g = _[f], l = g.type, D = g.value, L = E[l];
          L >= 0 && (T[L] = parseInt(D, 10));
        }
        var m = T[3], F = m === 24 ? 0 : m, h = T[0] + "-" + T[1] + "-" + T[2] + " " + F + ":" + T[4] + ":" + T[5] + ":000", y = +n;
        return (c.utc(h).valueOf() - (y -= y % 1e3)) / 6e4;
      }, a = N.prototype;
      a.tz = function(n, t) {
        n === void 0 && (n = R);
        var _ = this.utcOffset(), T = this.toDate(), f = T.toLocaleString("en-US", { timeZone: n }), g = Math.round((T - new Date(f)) / 1e3 / 60), l = c(f, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(T.getTimezoneOffset() / 15) - g, !0);
        if (t) {
          var D = l.utcOffset();
          l = l.add(_ - D, "minute");
        }
        return l.$x.$timezone = n, l;
      }, a.offsetName = function(n) {
        var t = this.$x.$timezone || c.tz.guess(), _ = u(this.valueOf(), t, { timeZoneName: n }).find(function(T) {
          return T.type.toLowerCase() === "timezonename";
        });
        return _ && _.value;
      };
      var A = a.startOf;
      a.startOf = function(n, t) {
        if (!this.$x || !this.$x.$timezone)
          return A.call(this, n, t);
        var _ = c(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
        return A.call(_, n, t).tz(this.$x.$timezone, !0);
      }, c.tz = function(n, t, _) {
        var T = _ && t, f = _ || t || R, g = P(+c(), f);
        if (typeof n != "string")
          return c(n).tz(f);
        var l = function(F, h, y) {
          var Q = F - 60 * h * 1e3, d = P(Q, y);
          if (h === d)
            return [Q, h];
          var $ = P(Q -= 60 * (d - h) * 1e3, y);
          return d === $ ? [Q, d] : [F - 60 * Math.min(d, $) * 1e3, Math.max(d, $)];
        }(c.utc(n, T).valueOf(), g, f), D = l[0], L = l[1], m = c(D).utcOffset(L);
        return m.$x.$timezone = f, m;
      }, c.tz.guess = function() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      }, c.tz.setDefault = function(n) {
        R = n;
      };
    };
  });
})(W);
var ie = W.exports;
const te = /* @__PURE__ */ ne(ie), ce = (e, r) => Object.fromEntries(Object.entries(e).filter(([E]) => !r.includes(E))), k = (e) => e !== Object(e), w = (...e) => {
  const r = re("", ...e), E = r.startsWith("/") ? r : `/${r}`;
  return E.endsWith("/") ? E.slice(0, -1) : E;
}, B = (e) => {
  try {
    const r = JSON.parse(e);
    return typeof r == "number" || typeof r == "boolean" || r === void 0 || r === null ? r : e;
  } catch {
    return e;
  }
}, z = (e) => Object.fromEntries(
  Object.entries(e).map(([r, E]) => [
    r,
    Array.isArray(E) ? E.map(B) : B(E)
  ])
), p = C();
H.extend(te);
const se = {
  syntax: {
    string: (...e) => s("green", e.join("")),
    punctuator: (...e) => s("gray", e.join("")),
    keyword: (...e) => s("cyan", e.join("")),
    number: (...e) => s("magenta", e.join("")),
    regex: (...e) => s("magenta", e.join("")),
    comment: (...e) => s("gray", s("bold", e.join(""))),
    invalid: (...e) => s("inverse", e.join(""))
  },
  codeFrame: (e) => e.slice(1),
  codeLine(e, r, E, i) {
    let N = (r ? " > " : "   ") + s("dim", e) + " ";
    r && (N = s("bgRed", N));
    let c = N + s("dim", "| ") + E;
    return i || (c += `
`), c;
  },
  stackLine(e, r, E) {
    let i = `   ${s("dim", "at")} ` + e + " (" + s("blueBright", s("underline", r)) + ")";
    return E || (i += `
`), i;
  },
  stack(e) {
    return `

` + e;
  }
};
class q extends Error {
  constructor({ statusCode: r, message: E, details: i, code: O }) {
    super(), this.time = H().tz().format(), this.message = "Internal Server Error", Error.captureStackTrace(this, this.constructor), this.name = "NixleError", this.statusCode = r || o.BAD_REQUEST, this.message = E, this.details = i, this.code = O;
  }
}
const Re = (e) => S({
  forError: e,
  isCallsiteFrame: (E) => Y(e) && e.statusCode < o.INTERNAL_SERVER_ERROR ? !!E.source && !E.source.includes("node_modules") && !E.source.includes("node:") && !E.source.includes("nixle/dist") : !0
})?.renderSync({
  renderer: se,
  stackFilter: (E) => Y(e) && e.statusCode < o.INTERNAL_SERVER_ERROR ? !!E.source && !E.source.includes("node_modules") && !E.source.includes("node:") && !E.source.includes("nixle/dist") : !0
});
function U(e, r) {
  const E = typeof e == "string" ? e : e.message;
  throw new q({
    message: E,
    statusCode: typeof e == "string" ? r || o.BAD_REQUEST : e.statusCode || o.BAD_REQUEST,
    code: typeof e == "string" ? void 0 : e.code,
    details: typeof e == "string" ? {} : e.details || {}
  });
}
const Y = (e) => e instanceof q, j = (e, r) => {
  let E = "";
  if (Y(e) || e instanceof Error ? E = e.message : k(e) ? E = e : E = `${e.constructor.name} ${JSON.stringify(e)}`, e && (!e.statusCode || e.statusCode >= o.INTERNAL_SERVER_ERROR))
    if (e instanceof Error) {
      const i = Re(e);
      r.fatal(s("red", E), ...i ? [`
`, i] : []);
    } else
      r.fatal(s("red", E));
  else
    r.error(s("red", E));
  p.emit("error", e);
}, V = (e, r) => {
  const E = H().format(), i = k(e), O = i && e || e.message || "Internal Server Error", N = i && E || e.time || E, c = i && {} || e.details || {}, R = i && void 0 || e.code, u = {
    statusCode: r,
    message: O,
    time: N,
    details: c,
    code: R
  };
  return u.details = {
    ...u.details,
    ...ce(JSON.parse(JSON.stringify(e, Object.getOwnPropertyNames(e))), [
      "message",
      "name",
      "stack",
      "statusCode",
      "time",
      "details",
      "code"
    ])
  }, u;
};
let x;
const Te = (e) => {
  x = K(e);
}, I = (e, ...r) => {
  if (!x)
    return;
  const E = `${s("bgBlue", " Nixle ")}`, i = x[e];
  i || U({
    message: `Logger method "${e}" not found`,
    statusCode: o.INTERNAL_SERVER_ERROR
  }), i(`${E}`, ...r);
}, G = {
  info: (...e) => I("info", ...e),
  success: (...e) => I("success", ...e),
  warn: (...e) => I("warn", ...e),
  error: (...e) => I("error", ...e),
  fatal: (...e) => I("fatal", ...e),
  debug: (...e) => I("debug", ...e),
  trace: (...e) => I("trace", ...e),
  silent: (...e) => I("silent", ...e),
  log: (...e) => I("log", ...e),
  fail: (...e) => I("fail", ...e),
  verbose: (...e) => I("verbose", ...e)
}, M = (e, r = "bgWhite") => Object.fromEntries(
  Object.entries(G).map(([E, i]) => [
    E,
    (...O) => i(s(r, ` ${e} `), ...O)
  ])
), v = (e, r, E) => typeof E == "function" ? {
  path: r,
  method: e,
  options: {
    handler: E
  }
} : {
  path: r,
  method: e,
  options: E
};
function oe(e, r) {
  return v("GET", e, r);
}
function _e(e, r) {
  return v("POST", e, r);
}
function Oe(e, r) {
  return v("PATCH", e, r);
}
function Ne(e, r) {
  return v("PUT", e, r);
}
function le(e, r) {
  return v("DELETE", e, r);
}
function ae(e, r) {
  return v("OPTIONS", e, r);
}
const fe = {
  get: oe,
  post: _e,
  patch: Oe,
  put: Ne,
  delete: le,
  options: ae
}, b = {}, Ie = (e) => {
  ee.config(e), Object.keys(process.env).forEach((r) => {
    b[r] = process.env[r];
  });
}, Z = {}, Ae = (e) => {
  Object.assign(Z, e);
};
function ye(e, r) {
  const E = typeof r == "object";
  (!r || E && !r.routes) && U({
    message: "Routes are required",
    statusCode: o.INTERNAL_SERVER_ERROR
  });
  const i = E ? r.routes : r, O = E ? r.guards || [] : [];
  return {
    path: e,
    routes: () => i({
      route: fe,
      log: M(e, "bgGreen"),
      env: b,
      ...Z
    }),
    guards: O
  };
}
let X = {};
const me = (e) => {
  Object.assign(X, e);
};
function pe(e, r) {
  function E() {
    return r({
      log: M(e, "bgCyan"),
      env: b,
      ...X
    });
  }
  return E.$inferMethods = {}, E.$inferReturns = {}, E;
}
const ue = (e, r) => {
  r.plugins && r.plugins.forEach(({ name: E, plugin: i }) => {
    const O = M(E, "bgMagenta");
    i({ provider: e, log: O, extendRouterContext: Ae, extendServiceContext: me }), G.success(`🚀 ${s("bgBlue", ` ${E.trim()} `)} plugin successfully loaded`);
  });
}, ge = (e, r) => {
  const E = w(e.globalPrefix || "", r.path || ""), i = M(E, "bgGreen"), O = r.routes();
  try {
    O.length === 0 && U({
      message: "At least one router is required",
      statusCode: o.INTERNAL_SERVER_ERROR
    }), O.some(({ path: N, method: c, options: R }) => !N || !c || !R.handler) && U({
      message: "Path, method and handler are required for each route",
      statusCode: o.INTERNAL_SERVER_ERROR
    });
  } catch (N) {
    j(N, i), process.exit(1);
  }
  O.forEach(({ path: N, method: c, options: R }) => {
    const u = w(E, N), P = M(`${J.bold(c)} ${u}`, "bgGreen");
    e.provider.createRoute({
      method: c.toLowerCase(),
      path: u,
      async handler(a) {
        p.emit("request", a);
        const A = {
          ...a,
          query: z(a.query),
          params: z(a.params)
        };
        try {
          await R?.middleware?.(A);
        } catch (n) {
          const t = n?.statusCode || o.INTERNAL_SERVER_ERROR;
          return a.setStatusCode(t), V(n, t);
        }
        try {
          r.guards.length && await Promise.all(r.guards.map((n) => n({ ...A, env: b }))), R?.guards?.length && await Promise.all(R.guards.map((n) => n({ ...A, env: b }))), await Promise.all([
            R?.queryValidation?.(A.query),
            R?.paramsValidation?.(A.params),
            R?.bodyValidation?.(A.body)
          ]);
        } catch (n) {
          const t = n?.statusCode || o.BAD_REQUEST;
          return a.setStatusCode(t), V(n, t);
        }
        try {
          const n = await R.handler(A);
          return p.emit("response", n), R?.statusCode && a.setStatusCode(R.statusCode), n;
        } catch (n) {
          const t = n?.statusCode || o.INTERNAL_SERVER_ERROR;
          return j(n, P), a.setStatusCode(t), V(n, t);
        }
      }
    }), P.success("🚏 Successfully registered");
  });
};
function Me(e) {
  e.logger !== !1 && Te(e.logger || {});
  try {
    e.provider || U({
      message: "Provider is required",
      statusCode: o.INTERNAL_SERVER_ERROR
    }), e.routers.length === 0 && U({
      message: "At least one router is required",
      statusCode: o.INTERNAL_SERVER_ERROR
    });
  } catch (E) {
    j(E, G), process.exit(1);
  }
  e.plugins && ue(e.provider, e), Ie(e.env), e.routers.forEach((E) => {
    ge(e, E);
  }), e.provider.globalMiddleware(({ setHeader: E }) => {
    E("X-Powered-By", "Nixle");
  });
  const r = {
    app: e.provider.app,
    events: {
      on: p.on,
      emit: p.emit
    }
  };
  return G.success(`🔥 ${s("underline", "Application successfully started")}`), r;
}
function be(e, r) {
  return async (E) => {
    try {
      await r(E);
    } catch (i) {
      U({
        message: i?.message || `Oops, ${e} guard was failed`,
        statusCode: i?.statusCode || o.BAD_REQUEST,
        details: i?.details
      });
    }
  };
}
function Fe(e) {
  return e;
}
const Qe = (e, r) => ({
  name: e,
  plugin: r
});
export {
  o as StatusCode,
  Me as createApp,
  U as createError,
  be as createGuard,
  Qe as createPlugin,
  Fe as createProvider,
  ye as createRouter,
  pe as createService,
  Ae as extendRouterContext,
  Y as isNixleError
};
