import g from "dayjs";
import c from "picocolors";
let d = {
  log: console.log
};
const u = (e) => {
  d = e;
}, a = (e, t) => {
  const s = t?.type || "info", o = `🫡 ${c.bgBlue(" Nixle ")}`, r = `${g().format("DD/MM/YYYY, HH:mm")}`, l = c.dim(`${s.charAt(0).toUpperCase()}:`), n = {
    info: c.blue,
    success: c.green,
    error: c.red,
    warn: c.yellow
  };
  d?.log(`${o} ${r} ${l} ${n[s](e)}`);
}, y = (e, t) => [e, t], $ = (e) => e({ log: a }), M = (e) => e, i = (e) => {
  const t = e.startsWith("/") ? e : `/${e}`;
  return t.endsWith("/") ? t.slice(0, -1) : t;
}, p = (e, t, s) => {
  s({ log: a }).forEach((o) => {
    const r = o.method ? o.method.toLowerCase() : "get", l = i(t) + i(o.path);
    e.request(r, l, (n) => (n.setHeader("x-powered-by", "Nixle"), o.statusCode && n.setStatusCode(o.statusCode), o.handler(n)));
  });
}, h = (e, t) => {
  t.forEach((s) => {
    s.routers.forEach(([o, r]) => {
      p(e, o, r);
    });
  });
}, x = ({
  provider: e,
  logger: t,
  ...s
}) => (t !== void 0 && u(t), a("Starting an application..."), h(e, s.modules), a("Application successfully started"), e.server), b = (e) => e;
export {
  x as createApp,
  M as createModule,
  b as createProvider,
  y as createRouter,
  $ as createService
};
