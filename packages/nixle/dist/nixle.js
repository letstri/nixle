var it = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Q(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var K = { exports: {} };
(function(o, p) {
  (function(m, $) {
    o.exports = $();
  })(it, function() {
    var m = 1e3, $ = 6e4, w = 36e5, _ = "millisecond", M = "second", C = "minute", H = "hour", D = "day", I = "week", b = "month", z = "quarter", S = "year", T = "date", R = "Invalid Date", et = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, nt = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, rt = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(s) {
      var n = ["th", "st", "nd", "rd"], t = s % 100;
      return "[" + s + (n[(t - 20) % 10] || n[t] || n[0]) + "]";
    } }, B = function(s, n, t) {
      var r = String(s);
      return !r || r.length >= n ? s : "" + Array(n + 1 - r.length).join(t) + s;
    }, st = { s: B, z: function(s) {
      var n = -s.utcOffset(), t = Math.abs(n), r = Math.floor(t / 60), e = t % 60;
      return (n <= 0 ? "+" : "-") + B(r, 2, "0") + ":" + B(e, 2, "0");
    }, m: function s(n, t) {
      if (n.date() < t.date())
        return -s(t, n);
      var r = 12 * (t.year() - n.year()) + (t.month() - n.month()), e = n.clone().add(r, b), i = t - e < 0, a = n.clone().add(r + (i ? -1 : 1), b);
      return +(-(r + (t - e) / (i ? e - a : a - e)) || 0);
    }, a: function(s) {
      return s < 0 ? Math.ceil(s) || 0 : Math.floor(s);
    }, p: function(s) {
      return { M: b, y: S, w: I, d: D, D: T, h: H, m: C, s: M, ms: _, Q: z }[s] || String(s || "").toLowerCase().replace(/s$/, "");
    }, u: function(s) {
      return s === void 0;
    } }, L = "en", x = {};
    x[L] = rt;
    var V = "$isDayjsObject", J = function(s) {
      return s instanceof U || !(!s || !s[V]);
    }, N = function s(n, t, r) {
      var e;
      if (!n)
        return L;
      if (typeof n == "string") {
        var i = n.toLowerCase();
        x[i] && (e = i), t && (x[i] = t, e = i);
        var a = n.split("-");
        if (!e && a.length > 1)
          return s(a[0]);
      } else {
        var c = n.name;
        x[c] = n, e = c;
      }
      return !r && e && (L = e), e || !r && L;
    }, d = function(s, n) {
      if (J(s))
        return s.clone();
      var t = typeof n == "object" ? n : {};
      return t.date = s, t.args = arguments, new U(t);
    }, u = st;
    u.l = N, u.i = J, u.w = function(s, n) {
      return d(s, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var U = function() {
      function s(t) {
        this.$L = N(t.locale, null, !0), this.parse(t), this.$x = this.$x || t.x || {}, this[V] = !0;
      }
      var n = s.prototype;
      return n.parse = function(t) {
        this.$d = function(r) {
          var e = r.date, i = r.utc;
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
      }, n.init = function() {
        var t = this.$d;
        this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
      }, n.$utils = function() {
        return u;
      }, n.isValid = function() {
        return this.$d.toString() !== R;
      }, n.isSame = function(t, r) {
        var e = d(t);
        return this.startOf(r) <= e && e <= this.endOf(r);
      }, n.isAfter = function(t, r) {
        return d(t) < this.startOf(r);
      }, n.isBefore = function(t, r) {
        return this.endOf(r) < d(t);
      }, n.$g = function(t, r, e) {
        return u.u(t) ? this[r] : this.set(e, t);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(t, r) {
        var e = this, i = !!u.u(r) || r, a = u.p(t), c = function(Y, y) {
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
          case M:
            return l(W + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(t) {
        return this.startOf(t, !1);
      }, n.$set = function(t, r) {
        var e, i = u.p(t), a = "set" + (this.$u ? "UTC" : ""), c = (e = {}, e[D] = a + "Date", e[T] = a + "Date", e[b] = a + "Month", e[S] = a + "FullYear", e[H] = a + "Hours", e[C] = a + "Minutes", e[M] = a + "Seconds", e[_] = a + "Milliseconds", e)[i], l = i === D ? this.$D + (r - this.$W) : r;
        if (i === b || i === S) {
          var h = this.clone().set(T, 1);
          h.$d[c](l), h.init(), this.$d = h.set(T, Math.min(this.$D, h.daysInMonth())).$d;
        } else
          c && this.$d[c](l);
        return this.init(), this;
      }, n.set = function(t, r) {
        return this.clone().$set(t, r);
      }, n.get = function(t) {
        return this[u.p(t)]();
      }, n.add = function(t, r) {
        var e, i = this;
        t = Number(t);
        var a = u.p(r), c = function(g) {
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
        var l = (e = {}, e[C] = $, e[H] = w, e[M] = m, e)[a] || 1, h = this.$d.getTime() + t * l;
        return u.w(h, this);
      }, n.subtract = function(t, r) {
        return this.add(-1 * t, r);
      }, n.format = function(t) {
        var r = this, e = this.$locale();
        if (!this.isValid())
          return e.invalidDate || R;
        var i = t || "YYYY-MM-DDTHH:mm:ssZ", a = u.z(this), c = this.$H, l = this.$m, h = this.$M, g = e.weekdays, v = e.months, W = e.meridiem, k = function(y, O, E, F) {
          return y && (y[O] || y(r, i)) || E[O].slice(0, F);
        }, A = function(y) {
          return u.s(c % 12 || 12, y, "0");
        }, Y = W || function(y, O, E) {
          var F = y < 12 ? "AM" : "PM";
          return E ? F.toLowerCase() : F;
        };
        return i.replace(nt, function(y, O) {
          return O || function(E) {
            switch (E) {
              case "YY":
                return String(r.$y).slice(-2);
              case "YYYY":
                return u.s(r.$y, 4, "0");
              case "M":
                return h + 1;
              case "MM":
                return u.s(h + 1, 2, "0");
              case "MMM":
                return k(e.monthsShort, h, v, 3);
              case "MMMM":
                return k(v, h);
              case "D":
                return r.$D;
              case "DD":
                return u.s(r.$D, 2, "0");
              case "d":
                return String(r.$W);
              case "dd":
                return k(e.weekdaysMin, r.$W, g, 2);
              case "ddd":
                return k(e.weekdaysShort, r.$W, g, 3);
              case "dddd":
                return g[r.$W];
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
                return String(r.$s);
              case "ss":
                return u.s(r.$s, 2, "0");
              case "SSS":
                return u.s(r.$ms, 3, "0");
              case "Z":
                return a;
            }
            return null;
          }(y) || a.replace(":", "");
        });
      }, n.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, n.diff = function(t, r, e) {
        var i, a = this, c = u.p(r), l = d(t), h = (l.utcOffset() - this.utcOffset()) * $, g = this - l, v = function() {
          return u.m(a, l);
        };
        switch (c) {
          case S:
            i = v() / 12;
            break;
          case b:
            i = v();
            break;
          case z:
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
          case M:
            i = g / m;
            break;
          default:
            i = g;
        }
        return e ? i : u.a(i);
      }, n.daysInMonth = function() {
        return this.endOf(b).$D;
      }, n.$locale = function() {
        return x[this.$L];
      }, n.locale = function(t, r) {
        if (!t)
          return this.$L;
        var e = this.clone(), i = N(t, r, !0);
        return i && (e.$L = i), e;
      }, n.clone = function() {
        return u.w(this.$d, this);
      }, n.toDate = function() {
        return new Date(this.valueOf());
      }, n.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, n.toISOString = function() {
        return this.$d.toISOString();
      }, n.toString = function() {
        return this.$d.toUTCString();
      }, s;
    }(), q = U.prototype;
    return d.prototype = q, [["$ms", _], ["$s", M], ["$m", C], ["$H", H], ["$W", D], ["$M", b], ["$y", S], ["$D", T]].forEach(function(s) {
      q[s[1]] = function(n) {
        return this.$g(n, s[0], s[1]);
      };
    }), d.extend = function(s, n) {
      return s.$i || (s(n, U, d), s.$i = !0), d;
    }, d.locale = N, d.isDayjs = J, d.unix = function(s) {
      return d(1e3 * s);
    }, d.en = x[L], d.Ls = x, d.p = {}, d;
  });
})(K);
var at = K.exports;
const ot = /* @__PURE__ */ Q(at);
var Z = { exports: {} }, f = String, X = function() {
  return { isColorSupported: !1, reset: f, bold: f, dim: f, italic: f, underline: f, inverse: f, hidden: f, strikethrough: f, black: f, red: f, green: f, yellow: f, blue: f, magenta: f, cyan: f, white: f, gray: f, bgBlack: f, bgRed: f, bgGreen: f, bgYellow: f, bgBlue: f, bgMagenta: f, bgCyan: f, bgWhite: f };
};
Z.exports = X();
Z.exports.createColors = X;
var ut = Z.exports;
const j = /* @__PURE__ */ Q(ut);
let tt = {
  log: console.log
};
const ct = (o) => {
  tt = o;
}, P = (o, p) => {
  const m = p?.type || "info", $ = `🫡 ${j.bgBlue(" Nixle ")}`, w = `${ot().format("DD/MM/YYYY, HH:mm")}`, _ = j.dim(`[${m.toUpperCase()}]`), M = {
    info: j.blue,
    success: j.green,
    error: j.red,
    warn: j.yellow
  };
  tt?.log(`${$} ${w} ${_} ${M[m](o)}`);
}, dt = (o, p) => [o, p], ht = (o) => o({ log: P }), $t = (o) => o, G = (o) => {
  const p = o.startsWith("/") ? o : `/${o}`;
  return p.endsWith("/") ? p.slice(0, -1) : p;
}, ft = (o, p, m) => {
  m({ log: P }).forEach(($) => {
    const w = $.method ? $.method.toLowerCase() : "get", _ = G(p) + G($.path);
    o.request(w, _, (M) => (M.setHeader("x-powered-by", "Nixle"), $.statusCode && M.setStatusCode($.statusCode), $.handler(M)));
  });
}, lt = (o, p) => {
  p.forEach((m) => {
    m.routers.forEach(([$, w]) => {
      ft(o, $, w);
    });
  });
}, gt = ({
  provider: o,
  logger: p,
  ...m
}) => (p !== void 0 && ct(p), P("Starting an application..."), lt(o, m.modules), P("Application successfully started"), o.server), pt = (o) => o;
export {
  gt as createApp,
  $t as createModule,
  pt as createProvider,
  dt as createRouter,
  ht as createService
};
