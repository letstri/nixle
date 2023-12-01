import { createPlugin as a } from "nixle";
const H = (t, o) => {
  switch (typeof t) {
    case "string":
      const e = o.indexOf("://");
      return e === -1 ? !1 : t === o.slice(e + 3);
    case "object":
      return t.test(o);
  }
}, n = (t, o, e) => {
  if (o.origin === !0) {
    t.setHeader("Vary", "*"), t.setHeader("Access-Control-Allow-Origin", t.getHeader("Origin") || "*");
    return;
  }
  if (!e?.length)
    return;
  const s = [];
  if (e.length) {
    const r = t.getHeader("Origin") ?? "";
    for (let d = 0; d < e.length; d++) {
      const l = H(e[d], r);
      if (l === !0) {
        t.setHeader("Vary", origin ? "Origin" : "*"), t.setHeader("Access-Control-Allow-Origin", t.getHeader("Origin") || "*");
        return;
      }
      l && s.push(l);
    }
  }
  t.setHeader("Vary", "Origin"), t.setHeader("Access-Control-Allow-Origin", s.join(", "));
}, i = (t, o) => {
  if (o.methods?.length) {
    if (o.methods === "*") {
      t.setHeader("Access-Control-Allow-Methods", "*");
      return;
    }
    if (!Array.isArray(o.methods)) {
      t.setHeader("Access-Control-Allow-Methods", o.methods);
      return;
    }
    t.setHeader("Access-Control-Allow-Methods", o.methods.join(", "));
  }
}, g = (t = {
  origin: !0,
  methods: "*",
  allowedHeaders: "*",
  exposedHeaders: "*",
  credentials: !1,
  maxAge: 5,
  preflight: !0
}) => a("CORS", ({ nixleApp: o }) => {
  const e = {
    origin: !0,
    methods: "*",
    allowedHeaders: "*",
    exposedHeaders: "*",
    credentials: !1,
    maxAge: 5,
    preflight: !0,
    ...t
  }, s = typeof e.origin == "boolean" ? void 0 : Array.isArray(e.origin) ? e.origin : [e.origin];
  e.preflight && o.createRoute("options", "/", (r) => (n(r, t, s), i(r, t), e.exposedHeaders.length && r.setHeader(
    "Access-Control-Allow-Headers",
    typeof e.allowedHeaders == "string" ? e.allowedHeaders : e.allowedHeaders.join(", ")
  ), e.maxAge && r.setHeader("Access-Control-Max-Age", e.maxAge.toString()), r.setStatusCode(204), "")), o.createRoute("options", "/*", (r) => (n(r, t, s), i(r, t), e.exposedHeaders.length && r.setHeader(
    "Access-Control-Allow-Headers",
    typeof e.allowedHeaders == "string" ? e.allowedHeaders : e.allowedHeaders.join(", ")
  ), e.maxAge && r.setHeader("Access-Control-Max-Age", e.maxAge.toString()), r.setStatusCode(204), "")), o.events.on("request", (r) => {
    n(r, t, s), i(r, t), e.allowedHeaders.length && r.setHeader(
      "Access-Control-Allow-Headers",
      typeof e.allowedHeaders == "string" ? e.allowedHeaders : e.allowedHeaders.join(", ")
    ), e.exposedHeaders.length && r.setHeader(
      "Access-Control-Exposed-Headers",
      typeof e.exposedHeaders == "string" ? e.exposedHeaders : e.exposedHeaders.join(", ")
    ), e.credentials && r.setHeader("Access-Control-Allow-Credentials", "true");
  });
});
export {
  g as corsPlugin
};
