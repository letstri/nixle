import "express";
import "fastify";
import "elysia";
var ve = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Me(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ge = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(ve, function() {
    var n = 1e3, r = 6e4, u = 36e5, f = "millisecond", g = "second", m = "minute", C = "hour", A = "day", W = "week", O = "month", re = "quarter", T = "year", Y = "date", ne = "Invalid Date", me = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, pe = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, $e = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(c) {
      var i = ["th", "st", "nd", "rd"], s = c % 100;
      return "[" + c + (i[(s - 20) % 10] || i[s] || i[0]) + "]";
    } }, q = function(c, i, s) {
      var a = String(c);
      return !a || a.length >= i ? c : "" + Array(i + 1 - a.length).join(s) + c;
    }, ye = { s: q, z: function(c) {
      var i = -c.utcOffset(), s = Math.abs(i), a = Math.floor(s / 60), o = s % 60;
      return (i <= 0 ? "+" : "-") + q(a, 2, "0") + ":" + q(o, 2, "0");
    }, m: function c(i, s) {
      if (i.date() < s.date())
        return -c(s, i);
      var a = 12 * (s.year() - i.year()) + (s.month() - i.month()), o = i.clone().add(a, O), l = s - o < 0, h = i.clone().add(a + (l ? -1 : 1), O);
      return +(-(a + (s - o) / (l ? o - h : h - o)) || 0);
    }, a: function(c) {
      return c < 0 ? Math.ceil(c) || 0 : Math.floor(c);
    }, p: function(c) {
      return { M: O, y: T, w: W, d: A, D: Y, h: C, m, s: g, ms: f, Q: re }[c] || String(c || "").toLowerCase().replace(/s$/, "");
    }, u: function(c) {
      return c === void 0;
    } }, R = "en", B = {};
    B[R] = $e;
    var se = "$isDayjsObject", z = function(c) {
      return c instanceof U || !(!c || !c[se]);
    }, G = function c(i, s, a) {
      var o;
      if (!i)
        return R;
      if (typeof i == "string") {
        var l = i.toLowerCase();
        B[l] && (o = l), s && (B[l] = s, o = l);
        var h = i.split("-");
        if (!o && h.length > 1)
          return c(h[0]);
      } else {
        var b = i.name;
        B[b] = i, o = b;
      }
      return !a && o && (R = o), o || !a && R;
    }, y = function(c, i) {
      if (z(c))
        return c.clone();
      var s = typeof i == "object" ? i : {};
      return s.date = c, s.args = arguments, new U(s);
    }, d = ye;
    d.l = G, d.i = z, d.w = function(c, i) {
      return y(c, { locale: i.$L, utc: i.$u, x: i.$x, $offset: i.$offset });
    };
    var U = function() {
      function c(s) {
        this.$L = G(s.locale, null, !0), this.parse(s), this.$x = this.$x || s.x || {}, this[se] = !0;
      }
      var i = c.prototype;
      return i.parse = function(s) {
        this.$d = function(a) {
          var o = a.date, l = a.utc;
          if (o === null)
            return /* @__PURE__ */ new Date(NaN);
          if (d.u(o))
            return /* @__PURE__ */ new Date();
          if (o instanceof Date)
            return new Date(o);
          if (typeof o == "string" && !/Z$/i.test(o)) {
            var h = o.match(me);
            if (h) {
              var b = h[2] - 1 || 0, $ = (h[7] || "0").substring(0, 3);
              return l ? new Date(Date.UTC(h[1], b, h[3] || 1, h[4] || 0, h[5] || 0, h[6] || 0, $)) : new Date(h[1], b, h[3] || 1, h[4] || 0, h[5] || 0, h[6] || 0, $);
            }
          }
          return new Date(o);
        }(s), this.init();
      }, i.init = function() {
        var s = this.$d;
        this.$y = s.getFullYear(), this.$M = s.getMonth(), this.$D = s.getDate(), this.$W = s.getDay(), this.$H = s.getHours(), this.$m = s.getMinutes(), this.$s = s.getSeconds(), this.$ms = s.getMilliseconds();
      }, i.$utils = function() {
        return d;
      }, i.isValid = function() {
        return this.$d.toString() !== ne;
      }, i.isSame = function(s, a) {
        var o = y(s);
        return this.startOf(a) <= o && o <= this.endOf(a);
      }, i.isAfter = function(s, a) {
        return y(s) < this.startOf(a);
      }, i.isBefore = function(s, a) {
        return this.endOf(a) < y(s);
      }, i.$g = function(s, a, o) {
        return d.u(s) ? this[a] : this.set(o, s);
      }, i.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, i.valueOf = function() {
        return this.$d.getTime();
      }, i.startOf = function(s, a) {
        var o = this, l = !!d.u(a) || a, h = d.p(s), b = function(k, S) {
          var x = d.w(o.$u ? Date.UTC(o.$y, S, k) : new Date(o.$y, S, k), o);
          return l ? x : x.endOf(A);
        }, $ = function(k, S) {
          return d.w(o.toDate()[k].apply(o.toDate("s"), (l ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(S)), o);
        }, v = this.$W, M = this.$M, w = this.$D, _ = "set" + (this.$u ? "UTC" : "");
        switch (h) {
          case T:
            return l ? b(1, 0) : b(31, 11);
          case O:
            return l ? b(1, M) : b(0, M + 1);
          case W:
            var j = this.$locale().weekStart || 0, I = (v < j ? v + 7 : v) - j;
            return b(l ? w - I : w + (6 - I), M);
          case A:
          case Y:
            return $(_ + "Hours", 0);
          case C:
            return $(_ + "Minutes", 1);
          case m:
            return $(_ + "Seconds", 2);
          case g:
            return $(_ + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, i.endOf = function(s) {
        return this.startOf(s, !1);
      }, i.$set = function(s, a) {
        var o, l = d.p(s), h = "set" + (this.$u ? "UTC" : ""), b = (o = {}, o[A] = h + "Date", o[Y] = h + "Date", o[O] = h + "Month", o[T] = h + "FullYear", o[C] = h + "Hours", o[m] = h + "Minutes", o[g] = h + "Seconds", o[f] = h + "Milliseconds", o)[l], $ = l === A ? this.$D + (a - this.$W) : a;
        if (l === O || l === T) {
          var v = this.clone().set(Y, 1);
          v.$d[b]($), v.init(), this.$d = v.set(Y, Math.min(this.$D, v.daysInMonth())).$d;
        } else
          b && this.$d[b]($);
        return this.init(), this;
      }, i.set = function(s, a) {
        return this.clone().$set(s, a);
      }, i.get = function(s) {
        return this[d.p(s)]();
      }, i.add = function(s, a) {
        var o, l = this;
        s = Number(s);
        var h = d.p(a), b = function(M) {
          var w = y(l);
          return d.w(w.date(w.date() + Math.round(M * s)), l);
        };
        if (h === O)
          return this.set(O, this.$M + s);
        if (h === T)
          return this.set(T, this.$y + s);
        if (h === A)
          return b(1);
        if (h === W)
          return b(7);
        var $ = (o = {}, o[m] = r, o[C] = u, o[g] = n, o)[h] || 1, v = this.$d.getTime() + s * $;
        return d.w(v, this);
      }, i.subtract = function(s, a) {
        return this.add(-1 * s, a);
      }, i.format = function(s) {
        var a = this, o = this.$locale();
        if (!this.isValid())
          return o.invalidDate || ne;
        var l = s || "YYYY-MM-DDTHH:mm:ssZ", h = d.z(this), b = this.$H, $ = this.$m, v = this.$M, M = o.weekdays, w = o.months, _ = o.meridiem, j = function(S, x, L, V) {
          return S && (S[x] || S(a, l)) || L[x].slice(0, V);
        }, I = function(S) {
          return d.s(b % 12 || 12, S, "0");
        }, k = _ || function(S, x, L) {
          var V = S < 12 ? "AM" : "PM";
          return L ? V.toLowerCase() : V;
        };
        return l.replace(pe, function(S, x) {
          return x || function(L) {
            switch (L) {
              case "YY":
                return String(a.$y).slice(-2);
              case "YYYY":
                return d.s(a.$y, 4, "0");
              case "M":
                return v + 1;
              case "MM":
                return d.s(v + 1, 2, "0");
              case "MMM":
                return j(o.monthsShort, v, w, 3);
              case "MMMM":
                return j(w, v);
              case "D":
                return a.$D;
              case "DD":
                return d.s(a.$D, 2, "0");
              case "d":
                return String(a.$W);
              case "dd":
                return j(o.weekdaysMin, a.$W, M, 2);
              case "ddd":
                return j(o.weekdaysShort, a.$W, M, 3);
              case "dddd":
                return M[a.$W];
              case "H":
                return String(b);
              case "HH":
                return d.s(b, 2, "0");
              case "h":
                return I(1);
              case "hh":
                return I(2);
              case "a":
                return k(b, $, !0);
              case "A":
                return k(b, $, !1);
              case "m":
                return String($);
              case "mm":
                return d.s($, 2, "0");
              case "s":
                return String(a.$s);
              case "ss":
                return d.s(a.$s, 2, "0");
              case "SSS":
                return d.s(a.$ms, 3, "0");
              case "Z":
                return h;
            }
            return null;
          }(S) || h.replace(":", "");
        });
      }, i.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, i.diff = function(s, a, o) {
        var l, h = this, b = d.p(a), $ = y(s), v = ($.utcOffset() - this.utcOffset()) * r, M = this - $, w = function() {
          return d.m(h, $);
        };
        switch (b) {
          case T:
            l = w() / 12;
            break;
          case O:
            l = w();
            break;
          case re:
            l = w() / 3;
            break;
          case W:
            l = (M - v) / 6048e5;
            break;
          case A:
            l = (M - v) / 864e5;
            break;
          case C:
            l = M / u;
            break;
          case m:
            l = M / r;
            break;
          case g:
            l = M / n;
            break;
          default:
            l = M;
        }
        return o ? l : d.a(l);
      }, i.daysInMonth = function() {
        return this.endOf(O).$D;
      }, i.$locale = function() {
        return B[this.$L];
      }, i.locale = function(s, a) {
        if (!s)
          return this.$L;
        var o = this.clone(), l = G(s, a, !0);
        return l && (o.$L = l), o;
      }, i.clone = function() {
        return d.w(this.$d, this);
      }, i.toDate = function() {
        return new Date(this.valueOf());
      }, i.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, i.toISOString = function() {
        return this.$d.toISOString();
      }, i.toString = function() {
        return this.$d.toUTCString();
      }, c;
    }(), oe = U.prototype;
    return y.prototype = oe, [["$ms", f], ["$s", g], ["$m", m], ["$H", C], ["$W", A], ["$M", O], ["$y", T], ["$D", Y]].forEach(function(c) {
      oe[c[1]] = function(i) {
        return this.$g(i, c[0], c[1]);
      };
    }), y.extend = function(c, i) {
      return c.$i || (c(i, U, y), c.$i = !0), y;
    }, y.locale = G, y.isDayjs = z, y.unix = function(c) {
      return y(1e3 * c);
    }, y.en = B[R], y.Ls = B, y.p = {}, y;
  });
})(ge);
var Se = ge.exports;
const we = /* @__PURE__ */ Me(Se), K = 10, ie = (t = 0) => (e) => `\x1B[${e + t}m`, ae = (t = 0) => (e) => `\x1B[${38 + t};5;${e}m`, ue = (t = 0) => (e, n, r) => `\x1B[${38 + t};2;${e};${n};${r}m`, p = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
Object.keys(p.modifier);
const Oe = Object.keys(p.color), De = Object.keys(p.bgColor);
[...Oe, ...De];
function Ce() {
  const t = /* @__PURE__ */ new Map();
  for (const [e, n] of Object.entries(p)) {
    for (const [r, u] of Object.entries(n))
      p[r] = {
        open: `\x1B[${u[0]}m`,
        close: `\x1B[${u[1]}m`
      }, n[r] = p[r], t.set(u[0], u[1]);
    Object.defineProperty(p, e, {
      value: n,
      enumerable: !1
    });
  }
  return Object.defineProperty(p, "codes", {
    value: t,
    enumerable: !1
  }), p.color.close = "\x1B[39m", p.bgColor.close = "\x1B[49m", p.color.ansi = ie(), p.color.ansi256 = ae(), p.color.ansi16m = ue(), p.bgColor.ansi = ie(K), p.bgColor.ansi256 = ae(K), p.bgColor.ansi16m = ue(K), Object.defineProperties(p, {
    rgbToAnsi256: {
      value(e, n, r) {
        return e === n && n === r ? e < 8 ? 16 : e > 248 ? 231 : Math.round((e - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(e / 255 * 5) + 6 * Math.round(n / 255 * 5) + Math.round(r / 255 * 5);
      },
      enumerable: !1
    },
    hexToRgb: {
      value(e) {
        const n = /[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));
        if (!n)
          return [0, 0, 0];
        let [r] = n;
        r.length === 3 && (r = [...r].map((f) => f + f).join(""));
        const u = Number.parseInt(r, 16);
        return [
          /* eslint-disable no-bitwise */
          u >> 16 & 255,
          u >> 8 & 255,
          u & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: !1
    },
    hexToAnsi256: {
      value: (e) => p.rgbToAnsi256(...p.hexToRgb(e)),
      enumerable: !1
    },
    ansi256ToAnsi: {
      value(e) {
        if (e < 8)
          return 30 + e;
        if (e < 16)
          return 90 + (e - 8);
        let n, r, u;
        if (e >= 232)
          n = ((e - 232) * 10 + 8) / 255, r = n, u = n;
        else {
          e -= 16;
          const m = e % 36;
          n = Math.floor(e / 36) / 5, r = Math.floor(m / 6) / 5, u = m % 6 / 5;
        }
        const f = Math.max(n, r, u) * 2;
        if (f === 0)
          return 30;
        let g = 30 + (Math.round(u) << 2 | Math.round(r) << 1 | Math.round(n));
        return f === 2 && (g += 60), g;
      },
      enumerable: !1
    },
    rgbToAnsi: {
      value: (e, n, r) => p.ansi256ToAnsi(p.rgbToAnsi256(e, n, r)),
      enumerable: !1
    },
    hexToAnsi: {
      value: (e) => p.ansi256ToAnsi(p.hexToAnsi256(e)),
      enumerable: !1
    }
  }), p;
}
const Ae = Ce(), D = Ae, J = (() => {
  if (navigator.userAgentData) {
    const t = navigator.userAgentData.brands.find(({ brand: e }) => e === "Chromium");
    if (t && t.version > 93)
      return 3;
  }
  return /\b(Chrome|Chromium)\//.test(navigator.userAgent) ? 1 : 0;
})(), ce = J !== 0 && {
  level: J,
  hasBasic: !0,
  has256: J >= 2,
  has16m: J >= 3
}, Te = {
  stdout: ce,
  stderr: ce
}, xe = Te;
function Be(t, e, n) {
  let r = t.indexOf(e);
  if (r === -1)
    return t;
  const u = e.length;
  let f = 0, g = "";
  do
    g += t.slice(f, r) + e + n, f = r + u, r = t.indexOf(e, f);
  while (r !== -1);
  return g += t.slice(f), g;
}
function je(t, e, n, r) {
  let u = 0, f = "";
  do {
    const g = t[r - 1] === "\r";
    f += t.slice(u, g ? r - 1 : r) + e + (g ? `\r
` : `
`) + n, u = r + 1, r = t.indexOf(`
`, u);
  } while (r !== -1);
  return f += t.slice(u), f;
}
const { stdout: le, stderr: he } = xe, Q = Symbol("GENERATOR"), E = Symbol("STYLER"), N = Symbol("IS_EMPTY"), fe = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
], F = /* @__PURE__ */ Object.create(null), ke = (t, e = {}) => {
  if (e.level && !(Number.isInteger(e.level) && e.level >= 0 && e.level <= 3))
    throw new Error("The `level` option should be an integer from 0 to 3");
  const n = le ? le.level : 0;
  t.level = e.level === void 0 ? n : e.level;
}, Ye = (t) => {
  const e = (...n) => n.join(" ");
  return ke(e, t), Object.setPrototypeOf(e, H.prototype), e;
};
function H(t) {
  return Ye(t);
}
Object.setPrototypeOf(H.prototype, Function.prototype);
for (const [t, e] of Object.entries(D))
  F[t] = {
    get() {
      const n = X(this, te(e.open, e.close, this[E]), this[N]);
      return Object.defineProperty(this, t, { value: n }), n;
    }
  };
F.visible = {
  get() {
    const t = X(this, this[E], !0);
    return Object.defineProperty(this, "visible", { value: t }), t;
  }
};
const ee = (t, e, n, ...r) => t === "rgb" ? e === "ansi16m" ? D[n].ansi16m(...r) : e === "ansi256" ? D[n].ansi256(D.rgbToAnsi256(...r)) : D[n].ansi(D.rgbToAnsi(...r)) : t === "hex" ? ee("rgb", e, n, ...D.hexToRgb(...r)) : D[n][t](...r), _e = ["rgb", "hex", "ansi256"];
for (const t of _e) {
  F[t] = {
    get() {
      const { level: n } = this;
      return function(...r) {
        const u = te(ee(t, fe[n], "color", ...r), D.color.close, this[E]);
        return X(this, u, this[N]);
      };
    }
  };
  const e = "bg" + t[0].toUpperCase() + t.slice(1);
  F[e] = {
    get() {
      const { level: n } = this;
      return function(...r) {
        const u = te(ee(t, fe[n], "bgColor", ...r), D.bgColor.close, this[E]);
        return X(this, u, this[N]);
      };
    }
  };
}
const Pe = Object.defineProperties(() => {
}, {
  ...F,
  level: {
    enumerable: !0,
    get() {
      return this[Q].level;
    },
    set(t) {
      this[Q].level = t;
    }
  }
}), te = (t, e, n) => {
  let r, u;
  return n === void 0 ? (r = t, u = e) : (r = n.openAll + t, u = e + n.closeAll), {
    open: t,
    close: e,
    openAll: r,
    closeAll: u,
    parent: n
  };
}, X = (t, e, n) => {
  const r = (...u) => Ee(r, u.length === 1 ? "" + u[0] : u.join(" "));
  return Object.setPrototypeOf(r, Pe), r[Q] = t, r[E] = e, r[N] = n, r;
}, Ee = (t, e) => {
  if (t.level <= 0 || !e)
    return t[N] ? "" : e;
  let n = t[E];
  if (n === void 0)
    return e;
  const { openAll: r, closeAll: u } = n;
  if (e.includes("\x1B"))
    for (; n !== void 0; )
      e = Be(e, n.close, n.open), n = n.parent;
  const f = e.indexOf(`
`);
  return f !== -1 && (e = je(e, u, r, f)), r + e + u;
};
Object.defineProperties(H.prototype, F);
const Fe = H();
H({ level: he ? he.level : 0 });
const P = Fe;
let be = {
  log: console.log
};
const Re = (t) => {
  be = t;
}, Z = (t, e) => {
  const n = e?.type || "info", r = `🫡 ${P.bgBlue(" ScaleX ")}`, u = `${we().format("DD/MM/YYYY, HH:mm")}`, f = P.dim(`[${n.toUpperCase()}]`), g = {
    info: P.blue,
    success: P.green,
    error: P.red,
    warn: P.yellow
  };
  be?.log(`${r} ${u} ${f} ${g[n](t)}`);
}, Ge = (t, e) => [t, e], Ue = (t) => t({ log: Z }), Ve = (t) => t, de = (t) => {
  const e = t.startsWith("/") ? t : `/${t}`;
  return e.endsWith("/") ? e.slice(0, -1) : e;
}, Ie = (t, e, n) => {
  n({ log: Z }).forEach((r) => {
    const u = r.method ? r.method.toLowerCase() : "get", f = t.methods[u], g = de(e) + de(r.path);
    f(g, (m) => (r.statusCode && m.setStatusCode(r.statusCode), r.handler(m)));
  });
}, Le = (t, e) => {
  e.forEach((n) => {
    n.routers.forEach(([r, u]) => {
      Ie(t, r, u);
    });
  });
}, Je = (t, { logger: e, ...n }) => (e && Re(e), Z("Starting an application..."), Le(t, n.modules), Z("Application successfully started"), t.server), Xe = (t) => t, Ze = (t) => {
  const e = (r) => (u, f) => t[r](u, async (g, m) => {
    m.setHeader("x-powered-by", "ScaleX"), m.send(await f({ req: g, res: m, setStatusCode: m.status }));
  });
  return {
    methods: {
      get: e("get"),
      post: e("post"),
      patch: e("patch"),
      put: e("put"),
      delete: e("delete")
    },
    server: t
  };
}, qe = (t) => {
  const e = (r) => (u, f) => t[r](u, async (g, m) => {
    m.header("x-powered-by", "ScaleX"), m.send(await f({ req: g, res: m, setStatusCode: m.status }));
  });
  return {
    methods: {
      get: e("get"),
      post: e("post"),
      patch: e("patch"),
      put: e("put"),
      delete: e("delete")
    },
    server: t
  };
}, ze = (t) => {
  const e = (r) => (u, f) => t[r](u, ({ request: g, set: m }) => (m.headers["x-powered-by"] = "ScaleX", f({ req: g, res: null, setStatusCode: (C) => m.status = C })));
  return {
    methods: {
      get: e("get"),
      post: e("post"),
      patch: e("patch"),
      put: e("put"),
      delete: e("delete")
    },
    server: t
  };
};
export {
  Je as createApp,
  Ve as createModule,
  Xe as createProvider,
  Ge as createRouter,
  Ue as createService,
  ze as elysiaProvider,
  Ze as expressProvider,
  qe as fastifyProvider
};
