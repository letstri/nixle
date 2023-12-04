import { createConsola as C } from "consola";
import { colorize as h } from "consola/utils";
import y from "dayjs";
import O from "mitt";
const E = "YYYY-MM-DD HH:mm:ss", P = (e, t) => Object.fromEntries(Object.entries(e).filter(([s]) => !t.includes(s))), b = (e) => e !== Object(e), a = O();
class l extends Error {
  constructor({ message: t, statusCode: s, ...r }) {
    super(t), this.time = y().format(E), this.statusCode = 400, this.isInternal = !1, this.name = "NixleError", this.statusCode = s || 400, Object.assign(this, r);
  }
}
function u(e) {
  throw typeof e == "string" ? new l({ message: e, isInternal: !0 }) : new l({ ...e, isInternal: !0 });
}
function D(e) {
  throw typeof e == "string" ? new l({ message: e, isInternal: !1 }) : new l({ ...e, isInternal: !1 });
}
const I = (e) => e instanceof l, f = (e) => {
  let t = "";
  I(e) ? t = e.isInternal && e.stack || e.message : e instanceof Error ? t = e.stack || e.message : b(e) ? t = e : t = `${e.constructor.name} ${JSON.stringify(e)}`, m(h("red", t), { type: "error" }), a.emit("error", e);
}, v = (e) => {
  const t = ["name", "stack", "message", "statusCode", "time", "isInternal"], s = y().format(E), r = b(e) ? {
    statusCode: 500,
    message: String(e),
    time: s
  } : {
    statusCode: e.statusCode || 500,
    message: e.message || "Internal Server Error",
    time: e.time || s
  };
  return e instanceof Error && Object.assign(
    r,
    P(JSON.parse(JSON.stringify(e, Object.getOwnPropertyNames(e))), t)
  ), r;
};
let x;
const N = (e) => {
  x = C(e);
}, m = (e, t) => {
  const s = t?.type || "log", r = `${h("bgBlue", " Nixle ")}`, o = x?.[s || "log"];
  o || u(`Logger method "${s}" not found`), o(`${r} ${e}`);
}, p = (e, t = "bgWhite") => (s, r) => m(`${h(t, `[${e}]`)} ${s}`, r), d = (e) => {
  const t = e.startsWith("/") ? e : `/${e}`;
  return t.endsWith("/") ? t.slice(0, -1) : t;
}, j = (e, t, s) => {
  const r = d(t), o = p(r, "bgGreen"), c = s({ log: o });
  try {
    c.length === 0 && u("At least one router is required"), c.some((n) => !n.path || !n.handler) && u("Path and handler are required for each route");
  } catch (n) {
    f(n), process.exit(1);
  }
  c.forEach((n) => {
    const w = n.method ? n.method.toLowerCase() : "get", $ = d(r) + d(n.path);
    e.provider.createRoute(w, $, async (g) => {
      a.emit("request", g), g.setHeader("x-powered-by", "Nixle"), n.statusCode && g.setStatusCode(n.statusCode);
      try {
        const i = await n.handler(g);
        return a.emit("response", i), i;
      } catch (i) {
        throw f(i), v(i);
      }
    });
  }), o(`🚏 ${c.length} route${c.length === 1 ? "" : "s"} successfully built`, {
    type: "success"
  });
}, A = (e) => {
  e.modules.forEach((t) => {
    t.routers.forEach(([s, r]) => {
      j(e, s, r);
    });
  });
}, M = (e, t) => {
  t.plugins && t.plugins.forEach(([s, r]) => {
    const o = p(s, "bgMagenta");
    r({ nixleApp: e, log: o }), m(`🚀 ${s.trim()} plugin successfully loaded`, { type: "success" });
  });
}, T = (e) => {
  N(e.logger || {});
  try {
    e.provider || u("Provider is required"), e.modules.length === 0 && u("At least one module is required");
  } catch (s) {
    f(s), process.exit(1);
  }
  A(e);
  const t = {
    app: e.provider.app,
    events: {
      on: a.on,
      emit: a.emit
    },
    createRoute: e.provider.createRoute
  };
  return e.plugins && M(t, e), m("🫡  Application successfully started", { type: "success" }), t;
}, Y = (e, t) => [e, t], _ = (e) => e, k = (e) => e({ log: p(e.name) }), H = (e) => e, J = (e, t) => [e, t];
export {
  T as createApp,
  D as createError,
  _ as createModule,
  J as createPlugin,
  H as createProvider,
  Y as createRouter,
  k as createService,
  I as isNixleError
};
