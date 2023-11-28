import { createProvider as m } from "nixle";
function w(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function S(e) {
  if (e.__esModule)
    return e;
  var i = e.default;
  if (typeof i == "function") {
    var o = function r() {
      return this instanceof r ? Reflect.construct(i, arguments, this.constructor) : i.apply(this, arguments);
    };
    o.prototype = i.prototype;
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
var u = { exports: {} }, l = {};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
l.parse = E;
l.serialize = x;
var b = decodeURIComponent, O = encodeURIComponent, C = /; */, p = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function E(e, i) {
  if (typeof e != "string")
    throw new TypeError("argument str must be a string");
  for (var o = {}, r = i || {}, t = e.split(C), s = r.decode || b, n = 0; n < t.length; n++) {
    var a = t[n], c = a.indexOf("=");
    if (!(c < 0)) {
      var v = a.substr(0, c).trim(), f = a.substr(++c, a.length).trim();
      f[0] == '"' && (f = f.slice(1, -1)), o[v] == null && (o[v] = T(f, s));
    }
  }
  return o;
}
function x(e, i, o) {
  var r = o || {}, t = r.encode || O;
  if (typeof t != "function")
    throw new TypeError("option encode is invalid");
  if (!p.test(e))
    throw new TypeError("argument name is invalid");
  var s = t(i);
  if (s && !p.test(s))
    throw new TypeError("argument val is invalid");
  var n = e + "=" + s;
  if (r.maxAge != null) {
    var a = r.maxAge - 0;
    if (isNaN(a) || !isFinite(a))
      throw new TypeError("option maxAge is invalid");
    n += "; Max-Age=" + Math.floor(a);
  }
  if (r.domain) {
    if (!p.test(r.domain))
      throw new TypeError("option domain is invalid");
    n += "; Domain=" + r.domain;
  }
  if (r.path) {
    if (!p.test(r.path))
      throw new TypeError("option path is invalid");
    n += "; Path=" + r.path;
  }
  if (r.expires) {
    if (typeof r.expires.toUTCString != "function")
      throw new TypeError("option expires is invalid");
    n += "; Expires=" + r.expires.toUTCString();
  }
  if (r.httpOnly && (n += "; HttpOnly"), r.secure && (n += "; Secure"), r.sameSite) {
    var c = typeof r.sameSite == "string" ? r.sameSite.toLowerCase() : r.sameSite;
    switch (c) {
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
  }
  return n;
}
function T(e, i) {
  try {
    return i(e);
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
  var i = j;
  e.sign = function(r, t) {
    if (typeof r != "string")
      throw new TypeError("Cookie value must be provided as a string.");
    if (typeof t != "string")
      throw new TypeError("Secret string must be provided.");
    return r + "." + i.createHmac("sha256", t).update(r).digest("base64").replace(/\=+$/, "");
  }, e.unsign = function(r, t) {
    if (typeof r != "string")
      throw new TypeError("Signed cookie string must be provided.");
    if (typeof t != "string")
      throw new TypeError("Secret string must be provided.");
    var s = r.slice(0, r.lastIndexOf(".")), n = e.sign(s, t);
    return o(n) == o(r) ? s : !1;
  };
  function o(r) {
    return i.createHash("sha1").update(r).digest("hex");
  }
})(g);
/*!
 * cookie-parser
 * Copyright(c) 2014 TJ Holowaychuk
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var N = l, $ = g;
u.exports = A;
u.exports.JSONCookie = y;
u.exports.JSONCookies = d;
u.exports.signedCookie = h;
u.exports.signedCookies = k;
function A(e, i) {
  var o = !e || Array.isArray(e) ? e || [] : [e];
  return function(t, s, n) {
    if (t.cookies)
      return n();
    var a = t.headers.cookie;
    if (t.secret = o[0], t.cookies = /* @__PURE__ */ Object.create(null), t.signedCookies = /* @__PURE__ */ Object.create(null), !a)
      return n();
    t.cookies = N.parse(a, i), o.length !== 0 && (t.signedCookies = k(t.cookies, o), t.signedCookies = d(t.signedCookies)), t.cookies = d(t.cookies), n();
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
  for (var i = Object.keys(e), o, r, t = 0; t < i.length; t++)
    o = i[t], r = y(e[o]), r && (e[o] = r);
  return e;
}
function h(e, i) {
  if (typeof e == "string") {
    if (e.substr(0, 2) !== "s:")
      return e;
    for (var o = !i || Array.isArray(i) ? i || [] : [i], r = 0; r < o.length; r++) {
      var t = $.unsign(e.slice(2), o[r]);
      if (t !== !1)
        return t;
    }
    return !1;
  }
}
function k(e, i) {
  for (var o = Object.keys(e), r, t, s = /* @__PURE__ */ Object.create(null), n, a = 0; a < o.length; a++)
    t = o[a], n = e[t], r = h(n, i), n !== r && (s[t] = r, delete e[t]);
  return s;
}
var M = u.exports;
const H = /* @__PURE__ */ w(M), R = m((e) => (e.use(H()), {
  server: e,
  request: (i, o, r) => e[i](o, async (t, s) => {
    s.send(
      await r({
        request: t,
        response: s,
        setStatusCode: s.status,
        setHeader: s.setHeader,
        setCookie: s.cookie
      })
    );
  })
}));
export {
  R as expressProvider
};
