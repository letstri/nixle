const R = ({
  routers: e
}) => ({
  routers: e
}), A = (e, t) => [e, t], I = (e, {
  modules: t
}) => (t.forEach((s) => {
  s.routers.forEach(([a, o]) => {
    o().forEach((r) => {
      e.methods[r.method](`/${a}` + r.path, r.handler);
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
var g = Object.defineProperty, _ = (e, t, s) => t in e ? g(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s, i = (e, t, s) => (_(e, typeof t != "symbol" ? t + "" : t, s), s);
class u extends Error {
  constructor(t, s = {}) {
    super(t, s), i(this, "statusCode", 500), i(this, "fatal", !1), i(this, "unhandled", !1), i(this, "statusMessage"), i(this, "data"), i(this, "cause"), s.cause && !this.cause && (this.cause = s.cause);
  }
  toJSON() {
    const t = {
      message: this.message,
      statusCode: d(this.statusCode, 500)
    };
    return this.statusMessage && (t.statusMessage = l(this.statusMessage)), this.data !== void 0 && (t.data = this.data), t;
  }
}
i(u, "__h3_error__", !0);
function m(e) {
  if (typeof e == "string")
    return new u(e);
  if (M(e))
    return e;
  const t = new u(e.message ?? e.statusMessage ?? "", {
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
  if (e.data && (t.data = e.data), e.statusCode ? t.statusCode = d(e.statusCode, t.statusCode) : e.status && (t.statusCode = d(e.status, t.statusCode)), e.statusMessage ? t.statusMessage = e.statusMessage : e.statusText && (t.statusMessage = e.statusText), t.statusMessage) {
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
function d(e, t = 200) {
  return !e || (typeof e == "string" && (e = Number.parseInt(e, 10)), e < 100 || e > 999) ? t : e;
}
function b(e) {
  if (typeof e == "function")
    return Object.assign(e, { __is_handler__: !0 });
  const t = {
    onRequest: f(e.onRequest),
    onBeforeResponse: f(e.onBeforeResponse)
  };
  return Object.assign((a) => w(a, e.handler, t), { __is_handler__: !0 });
}
function f(e) {
  return e ? Array.isArray(e) ? e : [e] : void 0;
}
async function w(e, t, s) {
  if (s.onRequest) {
    for (const r of s.onRequest)
      if (await r(e), e.handled)
        return;
  }
  const o = { body: await t(e) };
  if (s.onBeforeResponse)
    for (const r of s.onBeforeResponse)
      await r(e, o);
  return o.body;
}
const v = b;
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
  const a = e.length > 2;
  return new Promise((o, r) => {
    const c = (n) => (a && (s.off("close", c), s.off("error", c)), n ? r(m(n)) : o(void 0));
    try {
      const n = e(t, s, c);
      a && n === void 0 ? (s.once("close", c), s.once("error", c)) : o(n);
    } catch (n) {
      c(n);
    }
  });
}
const q = (e) => {
  const t = (a) => (o, r) => e.router[a](
    o,
    E(
      (c, n) => r({ req: c, res: n })
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
  const t = (a) => (o, r) => e[a](o, async (c, n) => {
    n.send(await r({ req: c, res: n }));
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
  const t = (a) => (o, r) => e[a](o, async (c, n) => {
    n.send(await r({ req: c, res: n }));
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
  const t = (a) => (o, r) => e[a](o, ({ request: c }) => r({ req: c, res: null }));
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
