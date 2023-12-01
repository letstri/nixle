import { createPlugin as g } from "nixle";
const h = (e, r) => {
  switch (typeof e) {
    case "string":
      const o = r.indexOf("://");
      return o === -1 ? !1 : e === r.slice(o + 3);
    case "object":
      return e.test(r);
  }
}, A = (e, r, o) => {
  if (r.origin === !0) {
    e.setHeader("Vary", "*"), e.setHeader("Access-Control-Allow-Origin", e.getHeader("Origin") || "*");
    return;
  }
  if (!o?.length)
    return;
  const d = [];
  if (o.length) {
    const s = e.getHeader("Origin") ?? "";
    for (let n = 0; n < o.length; n++) {
      const l = h(o[n], s);
      if (l === !0) {
        e.setHeader("Vary", origin ? "Origin" : "*"), e.setHeader("Access-Control-Allow-Origin", e.getHeader("Origin") || "*");
        return;
      }
      l && d.push(l);
    }
  }
  e.setHeader("Vary", "Origin"), e.setHeader("Access-Control-Allow-Origin", d.join(", "));
}, u = (e, r) => {
  if (r.methods?.length) {
    if (r.methods === "*") {
      e.setHeader("Access-Control-Allow-Methods", "*");
      return;
    }
    if (!Array.isArray(r.methods)) {
      e.setHeader("Access-Control-Allow-Methods", r.methods);
      return;
    }
    e.setHeader("Access-Control-Allow-Methods", r.methods.join(", "));
  }
}, C = (e = {
  origin: !0,
  methods: "*",
  allowedHeaders: "*",
  exposedHeaders: "*",
  credentials: !1,
  maxAge: 5,
  preflight: !0
}) => g("CORS", ({ nixleApp: r }) => {
  const {
    origin: o = !0,
    methods: d = "*",
    allowedHeaders: s = "*",
    exposedHeaders: n = "*",
    credentials: l = !1,
    maxAge: i = 5,
    preflight: H = !0
  } = e, c = typeof o == "boolean" ? void 0 : Array.isArray(o) ? o : [o];
  H && r.createRoute("options", "/", (t) => (A(t, e, c), u(t, e), n.length && t.setHeader(
    "Access-Control-Allow-Headers",
    typeof s == "string" ? s : s.join(", ")
  ), i && t.setHeader("Access-Control-Max-Age", i.toString()), t.setStatusCode(204), "")), r.createRoute("options", "/*", (t) => (A(t, e, c), u(t, e), n.length && t.setHeader(
    "Access-Control-Allow-Headers",
    typeof s == "string" ? s : s.join(", ")
  ), i && t.setHeader("Access-Control-Max-Age", i.toString()), t.setStatusCode(204), "")), r.events.on("request", (t) => {
    A(t, e, c), u(t, e), s.length && t.setHeader(
      "Access-Control-Allow-Headers",
      typeof s == "string" ? s : s.join(", ")
    ), n.length && t.setHeader(
      "Access-Control-Exposed-Headers",
      typeof n == "string" ? n : n.join(", ")
    ), l && t.setHeader("Access-Control-Allow-Credentials", "true");
  });
});
export {
  C as corsPlugin
};
