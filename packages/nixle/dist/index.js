import { createConsola as w } from "consola";
import { colorize as g } from "consola/utils";
import h from "dayjs";
import b from "mitt";
const p = "YYYY-MM-DD HH:mm:ss", O = (e, t) => Object.fromEntries(Object.entries(e).filter(([s]) => !t.includes(s))), C = (e) => e !== Object(e), i = b();
class a extends Error {
  constructor({ message: t, statusCode: s, ...o }) {
    super(t), this.time = h().format(p), this.statusCode = 400, this.isInternal = !1, this.name = "NixleError", this.statusCode = s || 400, Object.assign(this, o), Error.captureStackTrace(this, this.constructor);
  }
}
function l(e) {
  throw typeof e == "string" ? new a({ message: e, isInternal: !0 }) : new a({ ...e, isInternal: !0 });
}
function M(e) {
  throw typeof e == "string" ? new a({ message: e, isInternal: !1 }) : new a({ ...e, isInternal: !1 });
}
const I = (e) => e instanceof a, c = (e) => {
  I(e) ? n(e.isInternal && e.stack || e.message, { type: "error" }) : e instanceof Error ? n(e.stack || e.message, { type: "error" }) : C(e) ? n(e, { type: "error" }) : n(`${e.constructor.name} ${JSON.stringify(e)}`, { type: "error" }), i.emit("error", e);
  const t = ["name", "stack", "message", "statusCode", "time", "isInternal"], s = {
    statusCode: e.statusCode || 500,
    message: e.message || "Internal Server Error",
    time: e.time || h().format(p)
  };
  return e instanceof Error && Object.assign(
    s,
    O(JSON.parse(JSON.stringify(e, Object.getOwnPropertyNames(e))), t)
  ), s;
};
let y;
const $ = (e) => {
  y = w(e);
}, n = (e, t) => {
  const s = t?.type || "log", o = `${g("bgBlue", " Nixle ")}`, r = y?.[s || "log"];
  r || l(`Logger method "${s}" not found`), r(`${o} ${e}`);
}, m = (e, t = "bgWhite") => (s, o) => n(`[${g(t, e)}] ${s}`, o), f = (e) => {
  const t = e.startsWith("/") ? e : `/${e}`;
  return t.endsWith("/") ? t.slice(0, -1) : t;
}, v = (e, t, s) => {
  const o = s({ log: m(t) });
  if (o.length === 0)
    try {
      l("At least one router is required");
    } catch (r) {
      c(r), process.exit(1);
    }
  if (o.some((r) => !r.path || !r.handler))
    try {
      l("Path and handler are required for each route");
    } catch (r) {
      c(r), process.exit(1);
    }
  o.forEach((r) => {
    const E = r.method ? r.method.toLowerCase() : "get", x = f(t) + f(r.path);
    e.provider.request(E, x, async (u) => {
      i.emit("request", u), u.setHeader("x-powered-by", "Nixle"), r.statusCode && u.setStatusCode(r.statusCode);
      try {
        const d = await r.handler(u);
        return i.emit("response", d), d;
      } catch (d) {
        throw c(d);
      }
    });
  });
}, N = (e) => {
  e.modules.forEach((t) => {
    t.routers.forEach(([s, o]) => {
      v(e, s, o);
    });
  });
}, P = (e, t) => {
  t.plugins?.forEach(([s, o]) => {
    const r = m(s);
    o({ nixleApp: e, log: r }), r(`🚀 ${s} plugin loaded`, { type: "success" });
  });
}, L = (e) => {
  if ($(e.logger || {}), !e.provider)
    try {
      l("Provider is required");
    } catch (s) {
      c(s), process.exit(1);
    }
  if (e.modules.length === 0)
    try {
      l("At least one module is required");
    } catch (s) {
      c(s), process.exit(1);
    }
  N(e), n("🫡 Application successfully started", { type: "success" });
  const t = {
    app: e.provider.app,
    events: {
      on: i.on,
      emit: i.emit
    },
    createRoute: e.provider.request
  };
  return e.plugins && P(t, e), t;
}, k = (e, t) => [e, t], D = (e) => e, R = (e) => e({ log: m(e.name) }), T = (e) => e, Y = (e, t) => [e, t];
export {
  L as createApp,
  M as createError,
  D as createModule,
  Y as createPlugin,
  T as createProvider,
  k as createRouter,
  R as createService
};
