import { createConsola as C } from "consola";
import * as b from "node:tty";
import E from "dayjs";
import M from "mitt";
const {
  env: o = {},
  argv: O = [],
  platform: N = ""
} = typeof process > "u" ? {} : process, R = "NO_COLOR" in o || O.includes("--no-color"), T = "FORCE_COLOR" in o || O.includes("--color"), j = N === "win32", w = o.TERM === "dumb", k = b && b.isatty && b.isatty(1) && o.TERM && !w, A = "CI" in o && ("GITHUB_ACTIONS" in o || "GITLAB_CI" in o || "CIRCLECI" in o), S = !R && (T || j && !w || k || A);
function x(e, r, s, i, n = r.slice(0, Math.max(0, e)) + i, a = r.slice(Math.max(0, e + s.length)), m = a.indexOf(s)) {
  return n + (m < 0 ? a : x(m, a, s, i));
}
function P(e, r, s, i, n) {
  return e < 0 ? s + r + i : s + x(e, r, i, n) + i;
}
function $(e, r, s = e, i = e.length + 1) {
  return (n) => n || !(n === "" || n === void 0) ? P(
    ("" + n).indexOf(r, i),
    n,
    e,
    r,
    s
  ) : "";
}
function t(e, r, s) {
  return $(`\x1B[${e}m`, `\x1B[${r}m`, s);
}
const y = {
  reset: t(0, 0),
  bold: t(1, 22, "\x1B[22m\x1B[1m"),
  dim: t(2, 22, "\x1B[22m\x1B[2m"),
  italic: t(3, 23),
  underline: t(4, 24),
  inverse: t(7, 27),
  hidden: t(8, 28),
  strikethrough: t(9, 29),
  black: t(30, 39),
  red: t(31, 39),
  green: t(32, 39),
  yellow: t(33, 39),
  blue: t(34, 39),
  magenta: t(35, 39),
  cyan: t(36, 39),
  white: t(37, 39),
  gray: t(90, 39),
  bgBlack: t(40, 49),
  bgRed: t(41, 49),
  bgGreen: t(42, 49),
  bgYellow: t(43, 49),
  bgBlue: t(44, 49),
  bgMagenta: t(45, 49),
  bgCyan: t(46, 49),
  bgWhite: t(47, 49),
  blackBright: t(90, 39),
  redBright: t(91, 39),
  greenBright: t(92, 39),
  yellowBright: t(93, 39),
  blueBright: t(94, 39),
  magentaBright: t(95, 39),
  cyanBright: t(96, 39),
  whiteBright: t(97, 39),
  bgBlackBright: t(100, 49),
  bgRedBright: t(101, 49),
  bgGreenBright: t(102, 49),
  bgYellowBright: t(103, 49),
  bgBlueBright: t(104, 49),
  bgMagentaBright: t(105, 49),
  bgCyanBright: t(106, 49),
  bgWhiteBright: t(107, 49)
};
function L(e = S) {
  return e ? y : Object.fromEntries(Object.keys(y).map((r) => [r, String]));
}
const p = L();
function D(e, r = "reset") {
  return p[e] || p[r];
}
function _(e, r) {
  return D(e)(r);
}
const I = "YYYY-MM-DD HH:mm:ss", q = (e, r) => Object.fromEntries(Object.entries(e).filter(([s]) => !r.includes(s))), Y = (e) => e !== Object(e), g = M();
class u extends Error {
  constructor({ message: r, statusCode: s, ...i }) {
    super(r), this.time = E().format(I), this.statusCode = 400, this.isInternal = !1, this.name = "NixleError", this.statusCode = s || 400, Object.assign(this, i), Error.captureStackTrace(this, this.constructor);
  }
}
function h(e) {
  throw typeof e == "string" ? new u({ message: e, isInternal: !0 }) : new u({ ...e, isInternal: !0 });
}
function K(e) {
  throw typeof e == "string" ? new u({ message: e, isInternal: !1 }) : new u({ ...e, isInternal: !1 });
}
const F = (e) => e instanceof u, l = (e) => {
  g.emit("error", e), F(e) ? c(e.isInternal && e.stack || e.message, { type: "error" }) : e instanceof Error ? c(e.stack || e.message, { type: "error" }) : Y(e) ? c(e, { type: "error" }) : c(`${e.constructor.name} ${JSON.stringify(e)}`, { type: "error" });
  const r = ["name", "stack", "message", "statusCode", "time", "isInternal"], s = {
    statusCode: e.statusCode || 500,
    message: e.message || "Internal Server Error",
    time: e.time || E().format(I)
  };
  return e instanceof Error && Object.assign(
    s,
    q(JSON.parse(JSON.stringify(e, Object.getOwnPropertyNames(e))), r)
  ), s;
};
let v = C();
const W = (e) => {
  v = C(e);
}, c = (e, r) => {
  const s = r?.type || "log", i = `${_("bgBlue", " Nixle ")}`, n = v?.[s || "log"];
  n || h(`Logger method "${s}" not found`), n(`${i} ${e}`);
}, B = (e) => {
  const r = e.startsWith("/") ? e : `/${e}`;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}, G = (e, r, s) => {
  const i = s({ log: c });
  if (i.length === 0)
    try {
      h("At least one router is required");
    } catch (n) {
      l(n), process.exit(1);
    }
  if (i.some((n) => !n.path || !n.handler))
    try {
      h("Path and handler are required for each route");
    } catch (n) {
      l(n), process.exit(1);
    }
  i.forEach((n) => {
    const a = n.method ? n.method.toLowerCase() : "get", m = B(r) + B(n.path);
    e.provider.request(a, m, async (d) => {
      g.emit("request", d), d.setHeader("x-powered-by", "Nixle"), n.statusCode && d.setStatusCode(n.statusCode);
      try {
        const f = await n.handler(d);
        return g.emit("response", f), f;
      } catch (f) {
        throw l(f);
      }
    });
  });
}, H = (e) => {
  e.modules.forEach((r) => {
    r.routers.forEach(([s, i]) => {
      G(e, s, i);
    });
  });
}, Q = (e) => {
  if (!e.provider)
    try {
      h("Provider is required");
    } catch (r) {
      l(r), process.exit(1);
    }
  if (e.logger !== void 0 && W(e.logger), e.modules.length === 0)
    try {
      h("At least one module is required");
    } catch (r) {
      l(r), process.exit(1);
    }
  return H(e), c("🫡 Application successfully started", { type: "success" }), {
    app: e.provider.app,
    events: {
      on: g.on,
      emit: g.emit
    }
  };
}, V = (e, r) => [e, r], X = (e) => e, Z = (e) => e({ log: c }), ee = (e) => e, te = (e, r) => (s) => [e, r({ app: s, log: c })];
export {
  Q as createApp,
  K as createError,
  X as createModule,
  te as createPlugin,
  ee as createProvider,
  V as createRouter,
  Z as createService
};
