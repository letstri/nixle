import { createProvider as m } from "nixle";
function w(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function S(e) {
  if (e.__esModule)
    return e;
  var n = e.default;
  if (typeof n == "function") {
    var o = function r() {
      return this instanceof r ? Reflect.construct(n, arguments, this.constructor) : n.apply(this, arguments);
    };
    o.prototype = n.prototype;
  } else
    o = {};
  return Object.defineProperty(o, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var t = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(o, r, t.get ? t : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), o;
}
var c = { exports: {} }, l = {};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
l.parse = E;
l.serialize = x;
var b = decodeURIComponent, O = encodeURIComponent, C = /; */, p = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function E(e, n) {
  if (typeof e != "string")
    throw new TypeError("argument str must be a string");
  for (var o = {}, r = n || {}, t = e.split(C), s = r.decode || b, i = 0; i < t.length; i++) {
    var a = t[i], u = a.indexOf("=");
    if (!(u < 0)) {
      var v = a.substr(0, u).trim(), f = a.substr(++u, a.length).trim();
      f[0] == '"' && (f = f.slice(1, -1)), o[v] == null && (o[v] = T(f, s));
    }
  }
  return o;
}
function x(e, n, o) {
  var r = o || {}, t = r.encode || O;
  if (typeof t != "function")
    throw new TypeError("option encode is invalid");
  if (!p.test(e))
    throw new TypeError("argument name is invalid");
  var s = t(n);
  if (s && !p.test(s))
    throw new TypeError("argument val is invalid");
  var i = e + "=" + s;
  if (r.maxAge != null) {
    var a = r.maxAge - 0;
    if (isNaN(a) || !isFinite(a))
      throw new TypeError("option maxAge is invalid");
    i += "; Max-Age=" + Math.floor(a);
  }
  if (r.domain) {
    if (!p.test(r.domain))
      throw new TypeError("option domain is invalid");
    i += "; Domain=" + r.domain;
  }
  if (r.path) {
    if (!p.test(r.path))
      throw new TypeError("option path is invalid");
    i += "; Path=" + r.path;
  }
  if (r.expires) {
    if (typeof r.expires.toUTCString != "function")
      throw new TypeError("option expires is invalid");
    i += "; Expires=" + r.expires.toUTCString();
  }
  if (r.httpOnly && (i += "; HttpOnly"), r.secure && (i += "; Secure"), r.sameSite) {
    var u = typeof r.sameSite == "string" ? r.sameSite.toLowerCase() : r.sameSite;
    switch (u) {
      case !0:
        i += "; SameSite=Strict";
        break;
      case "lax":
        i += "; SameSite=Lax";
        break;
      case "strict":
        i += "; SameSite=Strict";
        break;
      case "none":
        i += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return i;
}
function T(e, n) {
  try {
    return n(e);
  } catch {
    return e;
  }
}
var g = {};
const P = {}, _ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: P
}, Symbol.toStringTag, { value: "Module" })), j = /* @__PURE__ */ S(_);
(function(e) {
  var n = j;
  e.sign = function(r, t) {
    if (typeof r != "string")
      throw new TypeError("Cookie value must be provided as a string.");
    if (typeof t != "string")
      throw new TypeError("Secret string must be provided.");
    return r + "." + n.createHmac("sha256", t).update(r).digest("base64").replace(/\=+$/, "");
  }, e.unsign = function(r, t) {
    if (typeof r != "string")
      throw new TypeError("Signed cookie string must be provided.");
    if (typeof t != "string")
      throw new TypeError("Secret string must be provided.");
    var s = r.slice(0, r.lastIndexOf(".")), i = e.sign(s, t);
    return o(i) == o(r) ? s : !1;
  };
  function o(r) {
    return n.createHash("sha1").update(r).digest("hex");
  }
})(g);
/*!
 * cookie-parser
 * Copyright(c) 2014 TJ Holowaychuk
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var N = l, $ = g;
c.exports = A;
c.exports.JSONCookie = y;
c.exports.JSONCookies = d;
c.exports.signedCookie = h;
c.exports.signedCookies = k;
function A(e, n) {
  var o = !e || Array.isArray(e) ? e || [] : [e];
  return function(t, s, i) {
    if (t.cookies)
      return i();
    var a = t.headers.cookie;
    if (t.secret = o[0], t.cookies = /* @__PURE__ */ Object.create(null), t.signedCookies = /* @__PURE__ */ Object.create(null), !a)
      return i();
    t.cookies = N.parse(a, n), o.length !== 0 && (t.signedCookies = k(t.cookies, o), t.signedCookies = d(t.signedCookies)), t.cookies = d(t.cookies), i();
  };
}
function y(e) {
  if (!(typeof e != "string" || e.substr(0, 2) !== "j:"))
    try {
      return JSON.parse(e.slice(2));
    } catch {
      return;
    }
}
function d(e) {
  for (var n = Object.keys(e), o, r, t = 0; t < n.length; t++)
    o = n[t], r = y(e[o]), r && (e[o] = r);
  return e;
}
function h(e, n) {
  if (typeof e == "string") {
    if (e.substr(0, 2) !== "s:")
      return e;
    for (var o = !n || Array.isArray(n) ? n || [] : [n], r = 0; r < o.length; r++) {
      var t = $.unsign(e.slice(2), o[r]);
      if (t !== !1)
        return t;
    }
    return !1;
  }
}
function k(e, n) {
  for (var o = Object.keys(e), r, t, s = /* @__PURE__ */ Object.create(null), i, a = 0; a < o.length; a++)
    t = o[a], i = e[t], r = h(i, n), i !== r && (s[t] = r, delete e[t]);
  return s;
}
var M = c.exports;
const H = /* @__PURE__ */ w(M), R = m((e) => (e.use(H()), {
  server: e,
  request: (n, o, r) => e[n](o, async (t, s) => {
    s.send(
      await r({
        request: t,
        response: s,
        params: t.params || {},
        query: t.query || {},
        setStatusCode: (i) => s.status(i),
        setHeader: (i, a) => s.setHeader(i, a),
        setCookie: (i, a, u = {}) => s.cookie(i, a, u)
      })
    );
  })
}));
export {
  R as expressProvider
};
