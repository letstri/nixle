import { createConsola as B } from "consola";
import * as m from "node:tty";
import C from "dayjs";
const {
  env: o = {},
  argv: p = [],
  platform: M = ""
} = typeof process > "u" ? {} : process, N = "NO_COLOR" in o || p.includes("--no-color"), R = "FORCE_COLOR" in o || p.includes("--color"), T = M === "win32", E = o.TERM === "dumb", j = m && m.isatty && m.isatty(1) && o.TERM && !E, k = "CI" in o && ("GITHUB_ACTIONS" in o || "GITLAB_CI" in o || "CIRCLECI" in o), A = !N && (R || T && !E || j || k);
function O(e, s, n, i, r = s.slice(0, Math.max(0, e)) + i, a = s.slice(Math.max(0, e + n.length)), h = a.indexOf(n)) {
  return r + (h < 0 ? a : O(h, a, n, i));
}
function S(e, s, n, i, r) {
  return e < 0 ? n + s + i : n + O(e, s, i, r) + i;
}
function v(e, s, n = e, i = e.length + 1) {
  return (r) => r || !(r === "" || r === void 0) ? S(
    ("" + r).indexOf(s, i),
    r,
    e,
    s,
    n
  ) : "";
}
function t(e, s, n) {
  return v(`\x1B[${e}m`, `\x1B[${s}m`, n);
}
const f = {
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
function $(e = A) {
  return e ? f : Object.fromEntries(Object.keys(f).map((s) => [s, String]));
}
const b = $();
function L(e, s = "reset") {
  return b[e] || b[s];
}
function P(e, s) {
  return L(e)(s);
}
const w = "YYYY-MM-DD HH:mm:ss", D = (e, s) => Object.fromEntries(Object.entries(e).filter(([n]) => !s.includes(n))), _ = (e) => e !== Object(e);
class g extends Error {
  constructor({ message: s, statusCode: n, ...i }) {
    super(s), this.time = C().format(w), this.statusCode = 400, this.isInternal = !1, this.name = "NixleError", this.statusCode = n || 400, Object.assign(this, i), Error.captureStackTrace(this, this.constructor);
  }
}
function u(e) {
  throw typeof e == "string" ? new g({ message: e, isInternal: !0 }) : new g({ ...e, isInternal: !0 });
}
function J(e) {
  throw typeof e == "string" ? new g({ message: e }) : new g(e);
}
const Y = (e) => e instanceof g, l = (e) => {
  Y(e) ? c(e.isInternal && e.stack || e.message, { type: "error" }) : e instanceof Error ? c(e.stack || e.message, { type: "error" }) : _(e) ? c(e, { type: "error" }) : c(`${e.constructor.name} ${JSON.stringify(e)}`, { type: "error" });
  const s = ["name", "stack", "message", "statusCode", "time", "isInternal"], n = {
    statusCode: e.statusCode || 500,
    message: e.message || "Internal Server Error",
    time: e.time || C().format(w)
  };
  return e instanceof Error && Object.assign(
    n,
    D(JSON.parse(JSON.stringify(e, Object.getOwnPropertyNames(e))), s)
  ), n;
};
let x = B();
const q = (e) => {
  x = B(e);
}, c = (e, s) => {
  const n = s?.type || "log", i = `${P("bgBlue", " Nixle ")}`, r = x?.[n || "log"];
  r || u(`Logger method "${n}" not found`), r(`${i} ${e}`);
}, y = (e) => {
  const s = e.startsWith("/") ? e : `/${e}`;
  return s.endsWith("/") ? s.slice(0, -1) : s;
}, F = (e, s, n) => {
  const i = n({ log: c });
  if (i.length === 0)
    try {
      u("At least one router is required");
    } catch (r) {
      l(r), process.exit(1);
    }
  if (i.some((r) => !r.path || !r.handler))
    try {
      u("Path and handler are required for each route");
    } catch (r) {
      l(r), process.exit(1);
    }
  i.forEach((r) => {
    const a = r.method ? r.method.toLowerCase() : "get", h = y(s) + y(r.path);
    e.request(a, h, async (d) => {
      d.setHeader("x-powered-by", "Nixle"), r.statusCode && d.setStatusCode(r.statusCode);
      try {
        return await r.handler(d);
      } catch (I) {
        throw l(I);
      }
    });
  });
}, U = (e, s) => [e, s], z = (e) => e({ log: c }), K = (e) => e, W = (e, s) => {
  s.forEach((n) => {
    n.routers.forEach(([i, r]) => {
      F(e, i, r);
    });
  });
}, Q = ({ provider: e, logger: s, ...n }) => {
  if (!e)
    try {
      u("Provider is required");
    } catch (i) {
      l(i), process.exit(1);
    }
  if (s !== void 0 && q(s), n.modules.length === 0)
    try {
      u("At least one module is required");
    } catch (i) {
      l(i), process.exit(1);
    }
  return W(e, n.modules), c("🫡 Application successfully started", { type: "success" }), e.server;
}, V = (e) => e;
export {
  Q as createApp,
  J as createError,
  K as createModule,
  V as createProvider,
  U as createRouter,
  z as createService
};
