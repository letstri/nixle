import L from "node:crypto";
import { createProvider as U } from "nixle";
function D(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var f = { exports: {} }, k = { exports: {} }, S = { exports: {} };
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
  let i = 0, n = 0, s = 0;
  for (; n !== e.length; ) {
    if (n = e.indexOf(";", i), n = n === -1 ? e.length : n, s = e.indexOf("=", i), s === -1 || s > n) {
      i = n + 1;
      continue;
    }
    const a = e.substring(i, s++).trim();
    if (r[a] === void 0) {
      const p = e.charCodeAt(s) === 34 ? e.substring(s + 1, n - 1).trim() : e.substring(s, n).trim();
      r[a] = o !== $ || p.indexOf("%") !== -1 ? V(p, o) : p;
    }
    i = n + 1;
  }
  return r;
}
function Z(e, t, r) {
  const o = r || {}, i = o.encode || Q;
  if (typeof i != "function")
    throw new TypeError("option encode is invalid");
  if (!m.test(e))
    throw new TypeError("argument name is invalid");
  const n = i(t);
  if (n && !m.test(n))
    throw new TypeError("argument val is invalid");
  let s = e + "=" + n;
  if (o.maxAge != null) {
    const a = o.maxAge - 0;
    if (isNaN(a) || !isFinite(a))
      throw new TypeError("option maxAge is invalid");
    s += "; Max-Age=" + Math.floor(a);
  }
  if (o.domain) {
    if (!m.test(o.domain))
      throw new TypeError("option domain is invalid");
    s += "; Domain=" + o.domain;
  }
  if (o.path) {
    if (!m.test(o.path))
      throw new TypeError("option path is invalid");
    s += "; Path=" + o.path;
  }
  if (o.expires) {
    if (typeof o.expires.toUTCString != "function")
      throw new TypeError("option expires is invalid");
    s += "; Expires=" + o.expires.toUTCString();
  }
  if (o.httpOnly && (s += "; HttpOnly"), o.secure && (s += "; Secure"), o.partitioned && (s += "; Partitioned"), o.sameSite)
    switch (typeof o.sameSite == "string" ? o.sameSite.toLowerCase() : o.sameSite) {
      case !0:
        s += "; SameSite=Strict";
        break;
      case "lax":
        s += "; SameSite=Lax";
        break;
      case "strict":
        s += "; SameSite=Strict";
        break;
      case "none":
        s += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  return s;
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
  for (let n = 0; n < t.length; ++n) {
    const s = t[n], a = Buffer.from(g.createHmac(r, s).update(o).digest("base64").replace(O, ""));
    if (a.length === i.length && g.timingSafeEqual(a, i))
      return {
        valid: !0,
        renew: s !== t[0],
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
  return t === "preParsing" ? function(o, i, n, s) {
    w(e, o, i), s();
  } : function(o, i, n) {
    w(e, o, i), n();
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
  const s = !o || typeof o.sign == "function" && typeof o.unsign == "function" ? o : new T(o, t.algorithm || "sha256");
  e.decorate("serializeCookie", h.serialize), e.decorate("parseCookie", a), o !== void 0 && (e.decorate("signCookie", p), e.decorate("unsignCookie", y), e.decorateRequest("signCookie", p), e.decorateRequest("unsignCookie", y), e.decorateReply("signCookie", p), e.decorateReply("unsignCookie", y)), e.decorateRequest("cookies", null), e.decorateReply(c, null), e.decorateReply(R, !1), e.decorateReply("cookie", P), e.decorateReply("setCookie", P), e.decorateReply("clearCookie", I), i && (e.addHook(i, ce(e, i)), e.addHook("onSend", ue)), r();
  function a(u) {
    return h.parse(u, t.parseOptions);
  }
  function p(u) {
    return s.sign(u);
  }
  function y(u) {
    return s.unsign(u);
  }
  function P(u, x, C) {
    const B = Object.assign({}, t.parseOptions, C);
    return j(this, u, x, B);
  }
  function I(u, x) {
    const C = Object.assign({}, t.parseOptions, x);
    return ae(this, u, C);
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
f.exports = H;
f.exports.default = H;
f.exports.fastifyCookie = H;
f.exports.signerFactory = T;
f.exports.Signer = T;
f.exports.sign = ne;
f.exports.unsign = se;
var de = f.exports;
const ge = /* @__PURE__ */ D(de), ke = U((e) => (e.register(ge), {
  server: e,
  request: (t, r, o) => e[t](r, async (i, n) => {
    n.send(
      await o({
        req: i,
        res: n,
        setStatusCode: n.status,
        setHeader: n.header,
        setCookie: n.setCookie
      })
    );
  })
}));
export {
  ke as fastifyProvider
};