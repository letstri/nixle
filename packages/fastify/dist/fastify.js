import L from "node:crypto";
import { createProvider as U } from "nixle";
function D(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var p = { exports: {} }, k = { exports: {} }, S = { exports: {} };
const F = /at\s{1}(?:.*\.)?plugin\s{1}.*\n\s*(.*)/, M = /(\w*(\.\w*)*)\..*/;
S.exports = function(t) {
  if (t.name.length > 0)
    return t.name;
  const r = Error.stackTraceLimit;
  Error.stackTraceLimit = 10;
  try {
    throw new Error("anonymous function");
  } catch (o) {
    return Error.stackTraceLimit = r, A(o.stack);
  }
};
function A(e) {
  const t = e.match(F);
  return t ? t[1].split(/[/\\]/).slice(-1)[0].match(M)[1] : "anonymous";
}
S.exports.extractPluginName = A;
var _ = S.exports, K = function(t) {
  return t[0] === "@" && (t = t.slice(1).replace("/", "-")), t.replace(/-(.)/g, function(o, i) {
    return i.toUpperCase();
  });
};
const W = _, Y = K;
let G = 0;
function v(e, t = {}) {
  let r = !1;
  if (typeof e.default < "u" && (e = e.default), typeof e != "function")
    throw new TypeError(
      `fastify-plugin expects a function, instead got a '${typeof e}'`
    );
  if (typeof t == "string" && (t = {
    fastify: t
  }), typeof t != "object" || Array.isArray(t) || t === null)
    throw new TypeError("The options object should be an object");
  if (t.fastify !== void 0 && typeof t.fastify != "string")
    throw new TypeError(`fastify-plugin expects a version string, instead got '${typeof t.fastify}'`);
  t.name || (r = !0, t.name = W(e) + "-auto-" + G++), e[Symbol.for("skip-override")] = t.encapsulate !== !0, e[Symbol.for("fastify.display-name")] = t.name, e[Symbol.for("plugin-meta")] = t, e.default || (e.default = e);
  const o = Y(t.name);
  return !r && !e[o] && (e[o] = e), e;
}
k.exports = v;
k.exports.default = v;
k.exports.fastifyPlugin = v;
var J = k.exports, b = {};
/*!
 * Adapted from https://github.com/jshttp/cookie
 *
 * (The MIT License)
 *
 * Copyright (c) 2012-2014 Roman Shtylman <shtylman@gmail.com>
 * Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
b.parse = X;
b.serialize = Z;
const $ = decodeURIComponent, Q = encodeURIComponent, m = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function X(e, t) {
  if (typeof e != "string")
    throw new TypeError("argument str must be a string");
  const r = {}, o = t && t.decode || $;
  let i = 0, s = 0, n = 0;
  for (; s !== e.length; ) {
    if (s = e.indexOf(";", i), s = s === -1 ? e.length : s, n = e.indexOf("=", i), n === -1 || n > s) {
      i = s + 1;
      continue;
    }
    const a = e.substring(i, n++).trim();
    if (r[a] === void 0) {
      const u = e.charCodeAt(n) === 34 ? e.substring(n + 1, s - 1).trim() : e.substring(n, s).trim();
      r[a] = o !== $ || u.indexOf("%") !== -1 ? V(u, o) : u;
    }
    i = s + 1;
  }
  return r;
}
function Z(e, t, r) {
  const o = r || {}, i = o.encode || Q;
  if (typeof i != "function")
    throw new TypeError("option encode is invalid");
  if (!m.test(e))
    throw new TypeError("argument name is invalid");
  const s = i(t);
  if (s && !m.test(s))
    throw new TypeError("argument val is invalid");
  let n = e + "=" + s;
  if (o.maxAge != null) {
    const a = o.maxAge - 0;
    if (isNaN(a) || !isFinite(a))
      throw new TypeError("option maxAge is invalid");
    n += "; Max-Age=" + Math.floor(a);
  }
  if (o.domain) {
    if (!m.test(o.domain))
      throw new TypeError("option domain is invalid");
    n += "; Domain=" + o.domain;
  }
  if (o.path) {
    if (!m.test(o.path))
      throw new TypeError("option path is invalid");
    n += "; Path=" + o.path;
  }
  if (o.expires) {
    if (typeof o.expires.toUTCString != "function")
      throw new TypeError("option expires is invalid");
    n += "; Expires=" + o.expires.toUTCString();
  }
  if (o.httpOnly && (n += "; HttpOnly"), o.secure && (n += "; Secure"), o.partitioned && (n += "; Partitioned"), o.sameSite)
    switch (typeof o.sameSite == "string" ? o.sameSite.toLowerCase() : o.sameSite) {
      case !0:
        n += "; SameSite=Strict";
        break;
      case "lax":
        n += "; SameSite=Lax";
        break;
      case "strict":
        n += "; SameSite=Strict";
        break;
      case "none":
        n += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  return n;
}
function V(e, t) {
  try {
    return t(e);
  } catch {
    return e;
  }
}
var d = { exports: {} };
const g = L, O = /=/gu;
function l(e, t = "sha256") {
  if (!(this instanceof l))
    return new l(e, t);
  this.secrets = Array.isArray(e) ? e : [e], this.signingKey = this.secrets[0], this.algorithm = t, E(this.secrets), ee(this.algorithm);
}
function E(e) {
  for (let t = 0; t < e.length; ++t) {
    const r = e[t];
    if (typeof r != "string" && Buffer.isBuffer(r) === !1)
      throw new TypeError("Secret key must be a string or Buffer.");
  }
}
function ee(e) {
  try {
    g.createHmac(e, g.randomBytes(16));
  } catch {
    throw new TypeError(`Algorithm ${e} not supported.`);
  }
}
function N(e, t, r) {
  if (typeof e != "string")
    throw new TypeError("Cookie value must be provided as a string.");
  return e + "." + g.createHmac(r, t).update(e).digest("base64").replace(O, "");
}
function q(e, t, r) {
  if (typeof e != "string")
    throw new TypeError("Signed cookie string must be provided.");
  const o = e.slice(0, e.lastIndexOf(".")), i = Buffer.from(e.slice(e.lastIndexOf(".") + 1));
  for (let s = 0; s < t.length; ++s) {
    const n = t[s], a = Buffer.from(g.createHmac(r, n).update(o).digest("base64").replace(O, ""));
    if (a.length === i.length && g.timingSafeEqual(a, i))
      return {
        valid: !0,
        renew: n !== t[0],
        value: o
      };
  }
  return {
    valid: !1,
    renew: !1,
    value: null
  };
}
l.prototype.sign = function(e) {
  return N(e, this.signingKey, this.algorithm);
};
l.prototype.unsign = function(e) {
  return q(e, this.secrets, this.algorithm);
};
function te(e, t, r = "sha256") {
  const o = Array.isArray(t) ? t : [t];
  return E(o), N(e, o[0], r);
}
function oe(e, t, r = "sha256") {
  const o = Array.isArray(t) ? t : [t];
  return E(o), q(e, o, r);
}
d.exports = l;
d.exports.signerFactory = l;
d.exports.Signer = l;
d.exports.sign = te;
d.exports.unsign = oe;
var re = d.exports;
const ie = J, h = b, { Signer: T, sign: ne, unsign: se } = re, c = Symbol("fastify.reply.setCookies"), R = Symbol("fastify.reply.setCookiesHookRan");
function j(e, t, r, o) {
  w(e.server, e.request, e);
  const i = Object.assign({}, o);
  return i.expires && Number.isInteger(i.expires) && (i.expires = new Date(i.expires)), i.signed && (r = e.signCookie(r)), i.secure === "auto" && (le(e.request) ? i.secure = !0 : (i.sameSite = "lax", i.secure = !1)), e[c].set(`${t};${i.domain};${i.path || "/"}`, { name: t, value: r, opts: i }), e[R] && z(e), e;
}
function ae(e, t, r) {
  const o = Object.assign({ path: "/" }, r, {
    expires: /* @__PURE__ */ new Date(1),
    signed: void 0,
    maxAge: void 0
  });
  return j(e, t, "", o);
}
function w(e, t, r) {
  if (r[c])
    return;
  const o = t.raw.headers.cookie;
  t.cookies = o ? e.parseCookie(o) : {}, r[c] = /* @__PURE__ */ new Map();
}
function ce(e, t) {
  return t === "preParsing" ? function(o, i, s, n) {
    w(e, o, i), n();
  } : function(o, i, s) {
    w(e, o, i), s();
  };
}
function z(e) {
  let t = e.getHeader("Set-Cookie");
  const r = t === void 0;
  if (r) {
    if (e[c].size === 1) {
      for (const o of e[c].values())
        e.header("Set-Cookie", h.serialize(o.name, o.value, o.opts));
      e[c].clear();
      return;
    }
    t = [];
  } else
    typeof t == "string" && (t = [t]);
  for (const o of e[c].values())
    t.push(h.serialize(o.name, o.value, o.opts));
  r || e.removeHeader("Set-Cookie"), e.header("Set-Cookie", t), e[c].clear();
}
function ue(e, t, r, o) {
  if (!t[c]) {
    o();
    return;
  }
  t[c].size && z(t), t[R] = !0, o();
}
function fe(e, t, r) {
  const o = t.secret, i = pe(t.hook);
  if (i === void 0)
    return r(new Error("@fastify/cookie: Invalid value provided for the hook-option. You can set the hook-option only to false, 'onRequest' , 'preParsing' , 'preValidation' or 'preHandler'"));
  const n = !o || typeof o.sign == "function" && typeof o.unsign == "function" ? o : new T(o, t.algorithm || "sha256");
  e.decorate("serializeCookie", h.serialize), e.decorate("parseCookie", a), o !== void 0 && (e.decorate("signCookie", u), e.decorate("unsignCookie", y), e.decorateRequest("signCookie", u), e.decorateRequest("unsignCookie", y), e.decorateReply("signCookie", u), e.decorateReply("unsignCookie", y)), e.decorateRequest("cookies", null), e.decorateReply(c, null), e.decorateReply(R, !1), e.decorateReply("cookie", P), e.decorateReply("setCookie", P), e.decorateReply("clearCookie", I), i && (e.addHook(i, ce(e, i)), e.addHook("onSend", ue)), r();
  function a(f) {
    return h.parse(f, t.parseOptions);
  }
  function u(f) {
    return n.sign(f);
  }
  function y(f) {
    return n.unsign(f);
  }
  function P(f, x, C) {
    const B = Object.assign({}, t.parseOptions, C);
    return j(this, f, x, B);
  }
  function I(f, x) {
    const C = Object.assign({}, t.parseOptions, x);
    return ae(this, f, C);
  }
}
function pe(e = "onRequest") {
  return {
    onRequest: "onRequest",
    preParsing: "preParsing",
    preValidation: "preValidation",
    preHandler: "preHandler",
    [!1]: !1
  }[e];
}
function le(e) {
  return e.raw.socket?.encrypted === !0 || e.headers["x-forwarded-proto"] === "https";
}
const H = ie(fe, {
  fastify: "4.x",
  name: "@fastify/cookie"
});
p.exports = H;
p.exports.default = H;
p.exports.fastifyCookie = H;
p.exports.signerFactory = T;
p.exports.Signer = T;
p.exports.sign = ne;
p.exports.unsign = se;
var de = p.exports;
const ge = /* @__PURE__ */ D(de), ke = U((e) => (e.register(ge), {
  server: e,
  request: (t, r, o) => e[t](r, async (i, s) => {
    s.send(
      await o({
        request: i,
        response: s,
        params: i.params || {},
        query: { ...i.query || {} },
        setStatusCode: (n) => s.status(n),
        setHeader: (n, a) => s.header(n, a),
        setCookie: (n, a, u) => s.setCookie(n, a, u)
      })
    );
  })
}));
export {
  ke as fastifyProvider
};
