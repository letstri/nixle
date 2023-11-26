const R = ({
  routers: e
}) => ({
  routers: e
}), A = (e, t) => [e, t], I = (e, {
  modules: t
}) => (t.forEach((s) => {
  s.routers.forEach(([o, n]) => {
    n().forEach((r) => {
      const a = r.method ? r.method.toLowerCase() : "get";
      e.methods[a](`/${o}` + r.path, r.handler);
    });
  });
}), e.server);
function h(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
var g = Object.defineProperty, _ = (e, t, s) => t in e ? g(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s, d = (e, t, s) => (_(e, typeof t != "symbol" ? t + "" : t, s), s);
class i extends Error {
  constructor(t, s = {}) {
    super(t, s), d(this, "statusCode", 500), d(this, "fatal", !1), d(this, "unhandled", !1), d(this, "statusMessage"), d(this, "data"), d(this, "cause"), s.cause && !this.cause && (this.cause = s.cause);
  }
  toJSON() {
    const t = {
      message: this.message,
      statusCode: u(this.statusCode, 500)
    };
    return this.statusMessage && (t.statusMessage = l(this.statusMessage)), this.data !== void 0 && (t.data = this.data), t;
  }
}
d(i, "__h3_error__", !0);
function m(e) {
  if (typeof e == "string")
    return new i(e);
  if (M(e))
    return e;
  const t = new i(e.message ?? e.statusMessage ?? "", {
    cause: e.cause || e
  });
  if (h(e, "stack"))
    try {
      Object.defineProperty(t, "stack", {
        get() {
          return e.stack;
        }
      });
    } catch {
      try {
        t.stack = e.stack;
      } catch {
      }
    }
  if (e.data && (t.data = e.data), e.statusCode ? t.statusCode = u(e.statusCode, t.statusCode) : e.status && (t.statusCode = u(e.status, t.statusCode)), e.statusMessage ? t.statusMessage = e.statusMessage : e.statusText && (t.statusMessage = e.statusText), t.statusMessage) {
    const s = t.statusMessage;
    l(t.statusMessage) !== s && console.warn(
      "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
    );
  }
  return e.fatal !== void 0 && (t.fatal = e.fatal), e.unhandled !== void 0 && (t.unhandled = e.unhandled), t;
}
function M(e) {
  return e?.constructor?.__h3_error__ === !0;
}
const y = /[^\u0009\u0020-\u007E]/g;
function l(e = "") {
  return e.replace(y, "");
}
function u(e, t = 200) {
  return !e || (typeof e == "string" && (e = Number.parseInt(e, 10)), e < 100 || e > 999) ? t : e;
}
function w(e) {
  if (typeof e == "function")
    return Object.assign(e, { __is_handler__: !0 });
  const t = {
    onRequest: f(e.onRequest),
    onBeforeResponse: f(e.onBeforeResponse)
  };
  return Object.assign((o) => b(o, e.handler, t), { __is_handler__: !0 });
}
function f(e) {
  return e ? Array.isArray(e) ? e : [e] : void 0;
}
async function b(e, t, s) {
  if (s.onRequest) {
    for (const r of s.onRequest)
      if (await r(e), e.handled)
        return;
  }
  const n = { body: await t(e) };
  if (s.onBeforeResponse)
    for (const r of s.onBeforeResponse)
      await r(e, n);
  return n.body;
}
const v = w;
function p(e) {
  return h(e, "__is_handler__");
}
function E(e) {
  if (p(e))
    return e;
  if (typeof e != "function")
    throw new TypeError(
      "Invalid handler. It should be a function:",
      e
    );
  return v((t) => P(
    e,
    t.node.req,
    t.node.res
  ));
}
function P(e, t, s) {
  const o = e.length > 2;
  return new Promise((n, r) => {
    const a = (c) => (o && (s.off("close", a), s.off("error", a)), c ? r(m(c)) : n(void 0));
    try {
      const c = e(t, s, a);
      o && c === void 0 ? (s.once("close", a), s.once("error", a)) : n(c);
    } catch (c) {
      a(c);
    }
  });
}
const q = (e) => {
  const t = (o) => (n, r) => e.router[o](
    n,
    E(
      (a, c) => r({ req: a, res: c })
    )
  );
  return {
    methods: {
      get: t("get"),
      post: t("post"),
      patch: t("patch"),
      put: t("put"),
      delete: t("delete")
    },
    server: e
  };
}, x = (e) => {
  const t = (o) => (n, r) => e[o](n, async (a, c) => {
    c.send(await r({ req: a, res: c }));
  });
  return {
    methods: {
      get: t("get"),
      post: t("post"),
      patch: t("patch"),
      put: t("put"),
      delete: t("delete")
    },
    server: e
  };
}, z = (e) => {
  const t = (o) => (n, r) => e[o](n, async (a, c) => {
    c.send(await r({ req: a, res: c }));
  });
  return {
    methods: {
      get: t("get"),
      post: t("post"),
      patch: t("patch"),
      put: t("put"),
      delete: t("delete")
    },
    server: e
  };
}, H = (e) => {
  const t = (o) => (n, r) => e[o](n, ({ request: a }) => r({ req: a, res: null }));
  return {
    methods: {
      get: t("get"),
      post: t("post"),
      patch: t("patch"),
      put: t("put"),
      delete: t("delete")
    },
    server: e
  };
};
export {
  I as createApp,
  R as createModule,
  A as createRouter,
  H as elysiaProvider,
  x as expressProvider,
  z as fastifyProvider,
  q as nitroProvider
};
