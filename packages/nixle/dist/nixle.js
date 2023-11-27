var it = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Q(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var K = { exports: {} };
(function(o, p) {
  (function(M, $) {
    o.exports = $();
  })(it, function() {
    var M = 1e3, $ = 6e4, w = 36e5, _ = "millisecond", m = "second", C = "minute", H = "hour", D = "day", I = "week", b = "month", Z = "quarter", S = "year", T = "date", z = "Invalid Date", et = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, rt = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, nt = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(s) {
      var r = ["th", "st", "nd", "rd"], t = s % 100;
      return "[" + s + (r[(t - 20) % 10] || r[t] || r[0]) + "]";
    } }, q = function(s, r, t) {
      var n = String(s);
      return !n || n.length >= r ? s : "" + Array(r + 1 - n.length).join(t) + s;
    }, st = { s: q, z: function(s) {
      var r = -s.utcOffset(), t = Math.abs(r), n = Math.floor(t / 60), e = t % 60;
      return (r <= 0 ? "+" : "-") + q(n, 2, "0") + ":" + q(e, 2, "0");
    }, m: function s(r, t) {
      if (r.date() < t.date())
        return -s(t, r);
      var n = 12 * (t.year() - r.year()) + (t.month() - r.month()), e = r.clone().add(n, b), i = t - e < 0, a = r.clone().add(n + (i ? -1 : 1), b);
      return +(-(n + (t - e) / (i ? e - a : a - e)) || 0);
    }, a: function(s) {
      return s < 0 ? Math.ceil(s) || 0 : Math.floor(s);
    }, p: function(s) {
      return { M: b, y: S, w: I, d: D, D: T, h: H, m: C, s: m, ms: _, Q: Z }[s] || String(s || "").toLowerCase().replace(/s$/, "");
    }, u: function(s) {
      return s === void 0;
    } }, L = "en", x = {};
    x[L] = nt;
    var R = "$isDayjsObject", B = function(s) {
      return s instanceof U || !(!s || !s[R]);
    }, N = function s(r, t, n) {
      var e;
      if (!r)
        return L;
      if (typeof r == "string") {
        var i = r.toLowerCase();
        x[i] && (e = i), t && (x[i] = t, e = i);
        var a = r.split("-");
        if (!e && a.length > 1)
          return s(a[0]);
      } else {
        var c = r.name;
        x[c] = r, e = c;
      }
      return !n && e && (L = e), e || !n && L;
    }, d = function(s, r) {
      if (B(s))
        return s.clone();
      var t = typeof r == "object" ? r : {};
      return t.date = s, t.args = arguments, new U(t);
    }, u = st;
    u.l = N, u.i = B, u.w = function(s, r) {
      return d(s, { locale: r.$L, utc: r.$u, x: r.$x, $offset: r.$offset });
    };
    var U = function() {
      function s(t) {
        this.$L = N(t.locale, null, !0), this.parse(t), this.$x = this.$x || t.x || {}, this[R] = !0;
      }
      var r = s.prototype;
      return r.parse = function(t) {
        this.$d = function(n) {
          var e = n.date, i = n.utc;
          if (e === null)
            return /* @__PURE__ */ new Date(NaN);
          if (u.u(e))
            return /* @__PURE__ */ new Date();
          if (e instanceof Date)
            return new Date(e);
          if (typeof e == "string" && !/Z$/i.test(e)) {
            var a = e.match(et);
            if (a) {
              var c = a[2] - 1 || 0, l = (a[7] || "0").substring(0, 3);
              return i ? new Date(Date.UTC(a[1], c, a[3] || 1, a[4] || 0, a[5] || 0, a[6] || 0, l)) : new Date(a[1], c, a[3] || 1, a[4] || 0, a[5] || 0, a[6] || 0, l);
            }
          }
          return new Date(e);
        }(t), this.init();
      }, r.init = function() {
        var t = this.$d;
        this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
      }, r.$utils = function() {
        return u;
      }, r.isValid = function() {
        return this.$d.toString() !== z;
      }, r.isSame = function(t, n) {
        var e = d(t);
        return this.startOf(n) <= e && e <= this.endOf(n);
      }, r.isAfter = function(t, n) {
        return d(t) < this.startOf(n);
      }, r.isBefore = function(t, n) {
        return this.endOf(n) < d(t);
      }, r.$g = function(t, n, e) {
        return u.u(t) ? this[n] : this.set(e, t);
      }, r.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, r.valueOf = function() {
        return this.$d.getTime();
      }, r.startOf = function(t, n) {
        var e = this, i = !!u.u(n) || n, a = u.p(t), c = function(Y, y) {
          var O = u.w(e.$u ? Date.UTC(e.$y, y, Y) : new Date(e.$y, y, Y), e);
          return i ? O : O.endOf(D);
        }, l = function(Y, y) {
          return u.w(e.toDate()[Y].apply(e.toDate("s"), (i ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(y)), e);
        }, h = this.$W, g = this.$M, v = this.$D, W = "set" + (this.$u ? "UTC" : "");
        switch (a) {
          case S:
            return i ? c(1, 0) : c(31, 11);
          case b:
            return i ? c(1, g) : c(0, g + 1);
          case I:
            var k = this.$locale().weekStart || 0, A = (h < k ? h + 7 : h) - k;
            return c(i ? v - A : v + (6 - A), g);
          case D:
          case T:
            return l(W + "Hours", 0);
          case H:
            return l(W + "Minutes", 1);
          case C:
            return l(W + "Seconds", 2);
          case m:
            return l(W + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, r.endOf = function(t) {
        return this.startOf(t, !1);
      }, r.$set = function(t, n) {
        var e, i = u.p(t), a = "set" + (this.$u ? "UTC" : ""), c = (e = {}, e[D] = a + "Date", e[T] = a + "Date", e[b] = a + "Month", e[S] = a + "FullYear", e[H] = a + "Hours", e[C] = a + "Minutes", e[m] = a + "Seconds", e[_] = a + "Milliseconds", e)[i], l = i === D ? this.$D + (n - this.$W) : n;
        if (i === b || i === S) {
          var h = this.clone().set(T, 1);
          h.$d[c](l), h.init(), this.$d = h.set(T, Math.min(this.$D, h.daysInMonth())).$d;
        } else
          c && this.$d[c](l);
        return this.init(), this;
      }, r.set = function(t, n) {
        return this.clone().$set(t, n);
      }, r.get = function(t) {
        return this[u.p(t)]();
      }, r.add = function(t, n) {
        var e, i = this;
        t = Number(t);
        var a = u.p(n), c = function(g) {
          var v = d(i);
          return u.w(v.date(v.date() + Math.round(g * t)), i);
        };
        if (a === b)
          return this.set(b, this.$M + t);
        if (a === S)
          return this.set(S, this.$y + t);
        if (a === D)
          return c(1);
        if (a === I)
          return c(7);
        var l = (e = {}, e[C] = $, e[H] = w, e[m] = M, e)[a] || 1, h = this.$d.getTime() + t * l;
        return u.w(h, this);
      }, r.subtract = function(t, n) {
        return this.add(-1 * t, n);
      }, r.format = function(t) {
        var n = this, e = this.$locale();
        if (!this.isValid())
          return e.invalidDate || z;
        var i = t || "YYYY-MM-DDTHH:mm:ssZ", a = u.z(this), c = this.$H, l = this.$m, h = this.$M, g = e.weekdays, v = e.months, W = e.meridiem, k = function(y, O, E, F) {
          return y && (y[O] || y(n, i)) || E[O].slice(0, F);
        }, A = function(y) {
          return u.s(c % 12 || 12, y, "0");
        }, Y = W || function(y, O, E) {
          var F = y < 12 ? "AM" : "PM";
          return E ? F.toLowerCase() : F;
        };
        return i.replace(rt, function(y, O) {
          return O || function(E) {
            switch (E) {
              case "YY":
                return String(n.$y).slice(-2);
              case "YYYY":
                return u.s(n.$y, 4, "0");
              case "M":
                return h + 1;
              case "MM":
                return u.s(h + 1, 2, "0");
              case "MMM":
                return k(e.monthsShort, h, v, 3);
              case "MMMM":
                return k(v, h);
              case "D":
                return n.$D;
              case "DD":
                return u.s(n.$D, 2, "0");
              case "d":
                return String(n.$W);
              case "dd":
                return k(e.weekdaysMin, n.$W, g, 2);
              case "ddd":
                return k(e.weekdaysShort, n.$W, g, 3);
              case "dddd":
                return g[n.$W];
              case "H":
                return String(c);
              case "HH":
                return u.s(c, 2, "0");
              case "h":
                return A(1);
              case "hh":
                return A(2);
              case "a":
                return Y(c, l, !0);
              case "A":
                return Y(c, l, !1);
              case "m":
                return String(l);
              case "mm":
                return u.s(l, 2, "0");
              case "s":
                return String(n.$s);
              case "ss":
                return u.s(n.$s, 2, "0");
              case "SSS":
                return u.s(n.$ms, 3, "0");
              case "Z":
                return a;
            }
            return null;
          }(y) || a.replace(":", "");
        });
      }, r.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, r.diff = function(t, n, e) {
        var i, a = this, c = u.p(n), l = d(t), h = (l.utcOffset() - this.utcOffset()) * $, g = this - l, v = function() {
          return u.m(a, l);
        };
        switch (c) {
          case S:
            i = v() / 12;
            break;
          case b:
            i = v();
            break;
          case Z:
            i = v() / 3;
            break;
          case I:
            i = (g - h) / 6048e5;
            break;
          case D:
            i = (g - h) / 864e5;
            break;
          case H:
            i = g / w;
            break;
          case C:
            i = g / $;
            break;
          case m:
            i = g / M;
            break;
          default:
            i = g;
        }
        return e ? i : u.a(i);
      }, r.daysInMonth = function() {
        return this.endOf(b).$D;
      }, r.$locale = function() {
        return x[this.$L];
      }, r.locale = function(t, n) {
        if (!t)
          return this.$L;
        var e = this.clone(), i = N(t, n, !0);
        return i && (e.$L = i), e;
      }, r.clone = function() {
        return u.w(this.$d, this);
      }, r.toDate = function() {
        return new Date(this.valueOf());
      }, r.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, r.toISOString = function() {
        return this.$d.toISOString();
      }, r.toString = function() {
        return this.$d.toUTCString();
      }, s;
    }(), V = U.prototype;
    return d.prototype = V, [["$ms", _], ["$s", m], ["$m", C], ["$H", H], ["$W", D], ["$M", b], ["$y", S], ["$D", T]].forEach(function(s) {
      V[s[1]] = function(r) {
        return this.$g(r, s[0], s[1]);
      };
    }), d.extend = function(s, r) {
      return s.$i || (s(r, U, d), s.$i = !0), d;
    }, d.locale = N, d.isDayjs = B, d.unix = function(s) {
      return d(1e3 * s);
    }, d.en = x[L], d.Ls = x, d.p = {}, d;
  });
})(K);
var at = K.exports;
const ot = /* @__PURE__ */ Q(at);
var J = { exports: {} }, f = String, X = function() {
  return { isColorSupported: !1, reset: f, bold: f, dim: f, italic: f, underline: f, inverse: f, hidden: f, strikethrough: f, black: f, red: f, green: f, yellow: f, blue: f, magenta: f, cyan: f, white: f, gray: f, bgBlack: f, bgRed: f, bgGreen: f, bgYellow: f, bgBlue: f, bgMagenta: f, bgCyan: f, bgWhite: f };
};
J.exports = X();
J.exports.createColors = X;
var ut = J.exports;
const j = /* @__PURE__ */ Q(ut);
let tt = {
  log: console.log
};
const ct = (o) => {
  tt = o;
}, P = (o, p) => {
  const M = p?.type || "info", $ = `🫡 ${j.bgBlue(" Nixle ")}`, w = `${ot().format("DD/MM/YYYY, HH:mm")}`, _ = j.dim(`[${M.toUpperCase()}]`), m = {
    info: j.blue,
    success: j.green,
    error: j.red,
    warn: j.yellow
  };
  tt?.log(`${$} ${w} ${_} ${m[M](o)}`);
}, dt = (o, p) => [o, p], ht = (o) => o({ log: P }), $t = (o) => o, G = (o) => {
  const p = o.startsWith("/") ? o : `/${o}`;
  return p.endsWith("/") ? p.slice(0, -1) : p;
}, ft = (o, p, M) => {
  M({ log: P }).forEach(($) => {
    const w = $.method ? $.method.toLowerCase() : "get", _ = G(p) + G($.path);
    o.request(w, _, (m) => (m.setHeader("x-powered-by", "Nixle"), $.statusCode && m.setStatusCode($.statusCode), $.handler({ req: m.req, res: m.res })));
  });
}, lt = (o, p) => {
  p.forEach((M) => {
    M.routers.forEach(([$, w]) => {
      ft(o, $, w);
    });
  });
}, gt = (o, { logger: p, ...M }) => (p && ct(p), P("Starting an application..."), lt(o, M.modules), P("Application successfully started"), o.server), pt = (o) => o;
export {
  gt as createApp,
  $t as createModule,
  pt as createProvider,
  dt as createRouter,
  ht as createService
};
