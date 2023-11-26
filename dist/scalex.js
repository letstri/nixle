import "nitropack";
import "express";
import "fastify";
import "elysia";
var Ce = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function De(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var $e = { exports: {} };
(function(e, t) {
  (function(r, n) {
    e.exports = n();
  })(Ce, function() {
    var r = 1e3, n = 6e4, i = 36e5, d = "millisecond", g = "second", h = "minute", _ = "hour", D = "day", z = "week", O = "month", oe = "quarter", A = "year", P = "date", ae = "Invalid Date", we = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Se = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, Oe = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(c) {
      var a = ["th", "st", "nd", "rd"], s = c % 100;
      return "[" + c + (a[(s - 20) % 10] || a[s] || a[0]) + "]";
    } }, Z = function(c, a, s) {
      var u = String(c);
      return !u || u.length >= a ? c : "" + Array(a + 1 - u.length).join(s) + c;
    }, _e = { s: Z, z: function(c) {
      var a = -c.utcOffset(), s = Math.abs(a), u = Math.floor(s / 60), o = s % 60;
      return (a <= 0 ? "+" : "-") + Z(u, 2, "0") + ":" + Z(o, 2, "0");
    }, m: function c(a, s) {
      if (a.date() < s.date())
        return -c(s, a);
      var u = 12 * (s.year() - a.year()) + (s.month() - a.month()), o = a.clone().add(u, O), l = s - o < 0, f = a.clone().add(u + (l ? -1 : 1), O);
      return +(-(u + (s - o) / (l ? o - f : f - o)) || 0);
    }, a: function(c) {
      return c < 0 ? Math.ceil(c) || 0 : Math.floor(c);
    }, p: function(c) {
      return { M: O, y: A, w: z, d: D, D: P, h: _, m: h, s: g, ms: d, Q: oe }[c] || String(c || "").toLowerCase().replace(/s$/, "");
    }, u: function(c) {
      return c === void 0;
    } }, H = "en", x = {};
    x[H] = Oe;
    var ie = "$isDayjsObject", K = function(c) {
      return c instanceof q || !(!c || !c[ie]);
    }, U = function c(a, s, u) {
      var o;
      if (!a)
        return H;
      if (typeof a == "string") {
        var l = a.toLowerCase();
        x[l] && (o = l), s && (x[l] = s, o = l);
        var f = a.split("-");
        if (!o && f.length > 1)
          return c(f[0]);
      } else {
        var m = a.name;
        x[m] = a, o = m;
      }
      return !u && o && (H = o), o || !u && H;
    }, p = function(c, a) {
      if (K(c))
        return c.clone();
      var s = typeof a == "object" ? a : {};
      return s.date = c, s.args = arguments, new q(s);
    }, b = _e;
    b.l = U, b.i = K, b.w = function(c, a) {
      return p(c, { locale: a.$L, utc: a.$u, x: a.$x, $offset: a.$offset });
    };
    var q = function() {
      function c(s) {
        this.$L = U(s.locale, null, !0), this.parse(s), this.$x = this.$x || s.x || {}, this[ie] = !0;
      }
      var a = c.prototype;
      return a.parse = function(s) {
        this.$d = function(u) {
          var o = u.date, l = u.utc;
          if (o === null)
            return /* @__PURE__ */ new Date(NaN);
          if (b.u(o))
            return /* @__PURE__ */ new Date();
          if (o instanceof Date)
            return new Date(o);
          if (typeof o == "string" && !/Z$/i.test(o)) {
            var f = o.match(we);
            if (f) {
              var m = f[2] - 1 || 0, $ = (f[7] || "0").substring(0, 3);
              return l ? new Date(Date.UTC(f[1], m, f[3] || 1, f[4] || 0, f[5] || 0, f[6] || 0, $)) : new Date(f[1], m, f[3] || 1, f[4] || 0, f[5] || 0, f[6] || 0, $);
            }
          }
          return new Date(o);
        }(s), this.init();
      }, a.init = function() {
        var s = this.$d;
        this.$y = s.getFullYear(), this.$M = s.getMonth(), this.$D = s.getDate(), this.$W = s.getDay(), this.$H = s.getHours(), this.$m = s.getMinutes(), this.$s = s.getSeconds(), this.$ms = s.getMilliseconds();
      }, a.$utils = function() {
        return b;
      }, a.isValid = function() {
        return this.$d.toString() !== ae;
      }, a.isSame = function(s, u) {
        var o = p(s);
        return this.startOf(u) <= o && o <= this.endOf(u);
      }, a.isAfter = function(s, u) {
        return p(s) < this.startOf(u);
      }, a.isBefore = function(s, u) {
        return this.endOf(u) < p(s);
      }, a.$g = function(s, u, o) {
        return b.u(s) ? this[u] : this.set(o, s);
      }, a.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, a.valueOf = function() {
        return this.$d.getTime();
      }, a.startOf = function(s, u) {
        var o = this, l = !!b.u(u) || u, f = b.p(s), m = function(j, w) {
          var T = b.w(o.$u ? Date.UTC(o.$y, w, j) : new Date(o.$y, w, j), o);
          return l ? T : T.endOf(D);
        }, $ = function(j, w) {
          return b.w(o.toDate()[j].apply(o.toDate("s"), (l ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(w)), o);
        }, M = this.$W, v = this.$M, S = this.$D, E = "set" + (this.$u ? "UTC" : "");
        switch (f) {
          case A:
            return l ? m(1, 0) : m(31, 11);
          case O:
            return l ? m(1, v) : m(0, v + 1);
          case z:
            var B = this.$locale().weekStart || 0, N = (M < B ? M + 7 : M) - B;
            return m(l ? S - N : S + (6 - N), v);
          case D:
          case P:
            return $(E + "Hours", 0);
          case _:
            return $(E + "Minutes", 1);
          case h:
            return $(E + "Seconds", 2);
          case g:
            return $(E + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, a.endOf = function(s) {
        return this.startOf(s, !1);
      }, a.$set = function(s, u) {
        var o, l = b.p(s), f = "set" + (this.$u ? "UTC" : ""), m = (o = {}, o[D] = f + "Date", o[P] = f + "Date", o[O] = f + "Month", o[A] = f + "FullYear", o[_] = f + "Hours", o[h] = f + "Minutes", o[g] = f + "Seconds", o[d] = f + "Milliseconds", o)[l], $ = l === D ? this.$D + (u - this.$W) : u;
        if (l === O || l === A) {
          var M = this.clone().set(P, 1);
          M.$d[m]($), M.init(), this.$d = M.set(P, Math.min(this.$D, M.daysInMonth())).$d;
        } else
          m && this.$d[m]($);
        return this.init(), this;
      }, a.set = function(s, u) {
        return this.clone().$set(s, u);
      }, a.get = function(s) {
        return this[b.p(s)]();
      }, a.add = function(s, u) {
        var o, l = this;
        s = Number(s);
        var f = b.p(u), m = function(v) {
          var S = p(l);
          return b.w(S.date(S.date() + Math.round(v * s)), l);
        };
        if (f === O)
          return this.set(O, this.$M + s);
        if (f === A)
          return this.set(A, this.$y + s);
        if (f === D)
          return m(1);
        if (f === z)
          return m(7);
        var $ = (o = {}, o[h] = n, o[_] = i, o[g] = r, o)[f] || 1, M = this.$d.getTime() + s * $;
        return b.w(M, this);
      }, a.subtract = function(s, u) {
        return this.add(-1 * s, u);
      }, a.format = function(s) {
        var u = this, o = this.$locale();
        if (!this.isValid())
          return o.invalidDate || ae;
        var l = s || "YYYY-MM-DDTHH:mm:ssZ", f = b.z(this), m = this.$H, $ = this.$m, M = this.$M, v = o.weekdays, S = o.months, E = o.meridiem, B = function(w, T, L, G) {
          return w && (w[T] || w(u, l)) || L[T].slice(0, G);
        }, N = function(w) {
          return b.s(m % 12 || 12, w, "0");
        }, j = E || function(w, T, L) {
          var G = w < 12 ? "AM" : "PM";
          return L ? G.toLowerCase() : G;
        };
        return l.replace(Se, function(w, T) {
          return T || function(L) {
            switch (L) {
              case "YY":
                return String(u.$y).slice(-2);
              case "YYYY":
                return b.s(u.$y, 4, "0");
              case "M":
                return M + 1;
              case "MM":
                return b.s(M + 1, 2, "0");
              case "MMM":
                return B(o.monthsShort, M, S, 3);
              case "MMMM":
                return B(S, M);
              case "D":
                return u.$D;
              case "DD":
                return b.s(u.$D, 2, "0");
              case "d":
                return String(u.$W);
              case "dd":
                return B(o.weekdaysMin, u.$W, v, 2);
              case "ddd":
                return B(o.weekdaysShort, u.$W, v, 3);
              case "dddd":
                return v[u.$W];
              case "H":
                return String(m);
              case "HH":
                return b.s(m, 2, "0");
              case "h":
                return N(1);
              case "hh":
                return N(2);
              case "a":
                return j(m, $, !0);
              case "A":
                return j(m, $, !1);
              case "m":
                return String($);
              case "mm":
                return b.s($, 2, "0");
              case "s":
                return String(u.$s);
              case "ss":
                return b.s(u.$s, 2, "0");
              case "SSS":
                return b.s(u.$ms, 3, "0");
              case "Z":
                return f;
            }
            return null;
          }(w) || f.replace(":", "");
        });
      }, a.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, a.diff = function(s, u, o) {
        var l, f = this, m = b.p(u), $ = p(s), M = ($.utcOffset() - this.utcOffset()) * n, v = this - $, S = function() {
          return b.m(f, $);
        };
        switch (m) {
          case A:
            l = S() / 12;
            break;
          case O:
            l = S();
            break;
          case oe:
            l = S() / 3;
            break;
          case z:
            l = (v - M) / 6048e5;
            break;
          case D:
            l = (v - M) / 864e5;
            break;
          case _:
            l = v / i;
            break;
          case h:
            l = v / n;
            break;
          case g:
            l = v / r;
            break;
          default:
            l = v;
        }
        return o ? l : b.a(l);
      }, a.daysInMonth = function() {
        return this.endOf(O).$D;
      }, a.$locale = function() {
        return x[this.$L];
      }, a.locale = function(s, u) {
        if (!s)
          return this.$L;
        var o = this.clone(), l = U(s, u, !0);
        return l && (o.$L = l), o;
      }, a.clone = function() {
        return b.w(this.$d, this);
      }, a.toDate = function() {
        return new Date(this.valueOf());
      }, a.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, a.toISOString = function() {
        return this.$d.toISOString();
      }, a.toString = function() {
        return this.$d.toUTCString();
      }, c;
    }(), ue = q.prototype;
    return p.prototype = ue, [["$ms", d], ["$s", g], ["$m", h], ["$H", _], ["$W", D], ["$M", O], ["$y", A], ["$D", P]].forEach(function(c) {
      ue[c[1]] = function(a) {
        return this.$g(a, c[0], c[1]);
      };
    }), p.extend = function(c, a) {
      return c.$i || (c(a, q, p), c.$i = !0), p;
    }, p.locale = U, p.isDayjs = K, p.unix = function(c) {
      return p(1e3 * c);
    }, p.en = x[H], p.Ls = x, p.p = {}, p;
  });
})($e);
var Ae = $e.exports;
const Te = /* @__PURE__ */ De(Ae), Q = 10, ce = (e = 0) => (t) => `\x1B[${t + e}m`, le = (e = 0) => (t) => `\x1B[${38 + e};5;${t}m`, fe = (e = 0) => (t, r, n) => `\x1B[${38 + e};2;${t};${r};${n}m`, y = {
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
Object.keys(y.modifier);
const xe = Object.keys(y.color), Be = Object.keys(y.bgColor);
[...xe, ...Be];
function je() {
  const e = /* @__PURE__ */ new Map();
  for (const [t, r] of Object.entries(y)) {
    for (const [n, i] of Object.entries(r))
      y[n] = {
        open: `\x1B[${i[0]}m`,
        close: `\x1B[${i[1]}m`
      }, r[n] = y[n], e.set(i[0], i[1]);
    Object.defineProperty(y, t, {
      value: r,
      enumerable: !1
    });
  }
  return Object.defineProperty(y, "codes", {
    value: e,
    enumerable: !1
  }), y.color.close = "\x1B[39m", y.bgColor.close = "\x1B[49m", y.color.ansi = ce(), y.color.ansi256 = le(), y.color.ansi16m = fe(), y.bgColor.ansi = ce(Q), y.bgColor.ansi256 = le(Q), y.bgColor.ansi16m = fe(Q), Object.defineProperties(y, {
    rgbToAnsi256: {
      value(t, r, n) {
        return t === r && r === n ? t < 8 ? 16 : t > 248 ? 231 : Math.round((t - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(t / 255 * 5) + 6 * Math.round(r / 255 * 5) + Math.round(n / 255 * 5);
      },
      enumerable: !1
    },
    hexToRgb: {
      value(t) {
        const r = /[a-f\d]{6}|[a-f\d]{3}/i.exec(t.toString(16));
        if (!r)
          return [0, 0, 0];
        let [n] = r;
        n.length === 3 && (n = [...n].map((d) => d + d).join(""));
        const i = Number.parseInt(n, 16);
        return [
          /* eslint-disable no-bitwise */
          i >> 16 & 255,
          i >> 8 & 255,
          i & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: !1
    },
    hexToAnsi256: {
      value: (t) => y.rgbToAnsi256(...y.hexToRgb(t)),
      enumerable: !1
    },
    ansi256ToAnsi: {
      value(t) {
        if (t < 8)
          return 30 + t;
        if (t < 16)
          return 90 + (t - 8);
        let r, n, i;
        if (t >= 232)
          r = ((t - 232) * 10 + 8) / 255, n = r, i = r;
        else {
          t -= 16;
          const h = t % 36;
          r = Math.floor(t / 36) / 5, n = Math.floor(h / 6) / 5, i = h % 6 / 5;
        }
        const d = Math.max(r, n, i) * 2;
        if (d === 0)
          return 30;
        let g = 30 + (Math.round(i) << 2 | Math.round(n) << 1 | Math.round(r));
        return d === 2 && (g += 60), g;
      },
      enumerable: !1
    },
    rgbToAnsi: {
      value: (t, r, n) => y.ansi256ToAnsi(y.rgbToAnsi256(t, r, n)),
      enumerable: !1
    },
    hexToAnsi: {
      value: (t) => y.ansi256ToAnsi(y.hexToAnsi256(t)),
      enumerable: !1
    }
  }), y;
}
const ke = je(), C = ke, J = (() => {
  if (navigator.userAgentData) {
    const e = navigator.userAgentData.brands.find(({ brand: t }) => t === "Chromium");
    if (e && e.version > 93)
      return 3;
  }
  return /\b(Chrome|Chromium)\//.test(navigator.userAgent) ? 1 : 0;
})(), de = J !== 0 && {
  level: J,
  hasBasic: !0,
  has256: J >= 2,
  has16m: J >= 3
}, Pe = {
  stdout: de,
  stderr: de
}, Ee = Pe;
function Re(e, t, r) {
  let n = e.indexOf(t);
  if (n === -1)
    return e;
  const i = t.length;
  let d = 0, g = "";
  do
    g += e.slice(d, n) + t + r, d = n + i, n = e.indexOf(t, d);
  while (n !== -1);
  return g += e.slice(d), g;
}
function Ie(e, t, r, n) {
  let i = 0, d = "";
  do {
    const g = e[n - 1] === "\r";
    d += e.slice(i, g ? n - 1 : n) + t + (g ? `\r
` : `
`) + r, i = n + 1, n = e.indexOf(`
`, i);
  } while (n !== -1);
  return d += e.slice(i), d;
}
const { stdout: he, stderr: ge } = Ee, ee = Symbol("GENERATOR"), I = Symbol("STYLER"), F = Symbol("IS_EMPTY"), be = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
], Y = /* @__PURE__ */ Object.create(null), Ye = (e, t = {}) => {
  if (t.level && !(Number.isInteger(t.level) && t.level >= 0 && t.level <= 3))
    throw new Error("The `level` option should be an integer from 0 to 3");
  const r = he ? he.level : 0;
  e.level = t.level === void 0 ? r : t.level;
}, He = (e) => {
  const t = (...r) => r.join(" ");
  return Ye(t, e), Object.setPrototypeOf(t, W.prototype), t;
};
function W(e) {
  return He(e);
}
Object.setPrototypeOf(W.prototype, Function.prototype);
for (const [e, t] of Object.entries(C))
  Y[e] = {
    get() {
      const r = V(this, re(t.open, t.close, this[I]), this[F]);
      return Object.defineProperty(this, e, { value: r }), r;
    }
  };
Y.visible = {
  get() {
    const e = V(this, this[I], !0);
    return Object.defineProperty(this, "visible", { value: e }), e;
  }
};
const te = (e, t, r, ...n) => e === "rgb" ? t === "ansi16m" ? C[r].ansi16m(...n) : t === "ansi256" ? C[r].ansi256(C.rgbToAnsi256(...n)) : C[r].ansi(C.rgbToAnsi(...n)) : e === "hex" ? te("rgb", t, r, ...C.hexToRgb(...n)) : C[r][e](...n), Ne = ["rgb", "hex", "ansi256"];
for (const e of Ne) {
  Y[e] = {
    get() {
      const { level: r } = this;
      return function(...n) {
        const i = re(te(e, be[r], "color", ...n), C.color.close, this[I]);
        return V(this, i, this[F]);
      };
    }
  };
  const t = "bg" + e[0].toUpperCase() + e.slice(1);
  Y[t] = {
    get() {
      const { level: r } = this;
      return function(...n) {
        const i = re(te(e, be[r], "bgColor", ...n), C.bgColor.close, this[I]);
        return V(this, i, this[F]);
      };
    }
  };
}
const Le = Object.defineProperties(() => {
}, {
  ...Y,
  level: {
    enumerable: !0,
    get() {
      return this[ee].level;
    },
    set(e) {
      this[ee].level = e;
    }
  }
}), re = (e, t, r) => {
  let n, i;
  return r === void 0 ? (n = e, i = t) : (n = r.openAll + e, i = t + r.closeAll), {
    open: e,
    close: t,
    openAll: n,
    closeAll: i,
    parent: r
  };
}, V = (e, t, r) => {
  const n = (...i) => Fe(n, i.length === 1 ? "" + i[0] : i.join(" "));
  return Object.setPrototypeOf(n, Le), n[ee] = e, n[I] = t, n[F] = r, n;
}, Fe = (e, t) => {
  if (e.level <= 0 || !t)
    return e[F] ? "" : t;
  let r = e[I];
  if (r === void 0)
    return t;
  const { openAll: n, closeAll: i } = r;
  if (t.includes("\x1B"))
    for (; r !== void 0; )
      t = Re(t, r.close, r.open), r = r.parent;
  const d = t.indexOf(`
`);
  return d !== -1 && (t = Ie(t, i, n, d)), n + t + i;
};
Object.defineProperties(W.prototype, Y);
const We = W();
W({ level: ge ? ge.level : 0 });
const R = We;
let pe = {
  log: console.log
};
const ze = (e) => {
  pe = e;
}, X = (e, t) => {
  const r = t?.type || "info", n = `🫡 ${R.bgBlue(" ScaleX ")}`, i = `${Te().format("DD/MM/YYYY, HH:mm")}`, d = R.dim(`[${r.toUpperCase()}]`), g = {
    info: R.blue,
    success: R.green,
    error: R.red,
    warn: R.yellow
  };
  pe?.log(`${n} ${i} ${d} ${g[r](e)}`);
}, ut = (e, t) => [e, t], ct = (e) => e({ log: X }), lt = (e) => e, me = (e) => {
  const t = e.startsWith("/") ? e : `/${e}`;
  return t.endsWith("/") ? t.slice(0, -1) : t;
}, Ue = (e, t, r) => {
  r({ log: X }).forEach((n) => {
    const i = n.method ? n.method.toLowerCase() : "get", d = e.methods[i], g = me(t) + me(n.path);
    d(g, (h) => (n.statusCode && h.setStatusCode(n.statusCode), n.handler(h)));
  });
}, qe = (e, t) => {
  t.forEach((r) => {
    r.routers.forEach(([n, i]) => {
      Ue(e, n, i);
    });
  });
}, ft = (e, { logger: t, ...r }) => (t && ze(t), X("Starting an application..."), qe(e, r.modules), X("Application successfully started"), e.server);
function Me(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
var Ge = Object.defineProperty, Je = (e, t, r) => t in e ? Ge(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, k = (e, t, r) => (Je(e, typeof t != "symbol" ? t + "" : t, r), r);
class ne extends Error {
  constructor(t, r = {}) {
    super(t, r), k(this, "statusCode", 500), k(this, "fatal", !1), k(this, "unhandled", !1), k(this, "statusMessage"), k(this, "data"), k(this, "cause"), r.cause && !this.cause && (this.cause = r.cause);
  }
  toJSON() {
    const t = {
      message: this.message,
      statusCode: se(this.statusCode, 500)
    };
    return this.statusMessage && (t.statusMessage = ve(this.statusMessage)), this.data !== void 0 && (t.data = this.data), t;
  }
}
k(ne, "__h3_error__", !0);
function Ve(e) {
  if (typeof e == "string")
    return new ne(e);
  if (Xe(e))
    return e;
  const t = new ne(e.message ?? e.statusMessage ?? "", {
    cause: e.cause || e
  });
  if (Me(e, "stack"))
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
  if (e.data && (t.data = e.data), e.statusCode ? t.statusCode = se(e.statusCode, t.statusCode) : e.status && (t.statusCode = se(e.status, t.statusCode)), e.statusMessage ? t.statusMessage = e.statusMessage : e.statusText && (t.statusMessage = e.statusText), t.statusMessage) {
    const r = t.statusMessage;
    ve(t.statusMessage) !== r && console.warn(
      "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
    );
  }
  return e.fatal !== void 0 && (t.fatal = e.fatal), e.unhandled !== void 0 && (t.unhandled = e.unhandled), t;
}
function Xe(e) {
  return e?.constructor?.__h3_error__ === !0;
}
const Ze = /[^\u0009\u0020-\u007E]/g;
function ve(e = "") {
  return e.replace(Ze, "");
}
function se(e, t = 200) {
  return !e || (typeof e == "string" && (e = Number.parseInt(e, 10)), e < 100 || e > 999) ? t : e;
}
function Ke(e) {
  if (typeof e == "function")
    return Object.assign(e, { __is_handler__: !0 });
  const t = {
    onRequest: ye(e.onRequest),
    onBeforeResponse: ye(e.onBeforeResponse)
  };
  return Object.assign((n) => Qe(n, e.handler, t), { __is_handler__: !0 });
}
function ye(e) {
  return e ? Array.isArray(e) ? e : [e] : void 0;
}
async function Qe(e, t, r) {
  if (r.onRequest) {
    for (const d of r.onRequest)
      if (await d(e), e.handled)
        return;
  }
  const i = { body: await t(e) };
  if (r.onBeforeResponse)
    for (const d of r.onBeforeResponse)
      await d(e, i);
  return i.body;
}
const et = Ke;
function tt(e) {
  return Me(e, "__is_handler__");
}
function rt(e) {
  if (tt(e))
    return e;
  if (typeof e != "function")
    throw new TypeError(
      "Invalid handler. It should be a function:",
      e
    );
  return et((t) => nt(
    e,
    t.node.req,
    t.node.res
  ));
}
function nt(e, t, r) {
  const n = e.length > 2;
  return new Promise((i, d) => {
    const g = (h) => (n && (r.off("close", g), r.off("error", g)), h ? d(Ve(h)) : i(void 0));
    try {
      const h = e(t, r, g);
      n && h === void 0 ? (r.once("close", g), r.once("error", g)) : i(h);
    } catch (h) {
      g(h);
    }
  });
}
const dt = (e) => {
  const t = (n) => (i, d) => e.router[n](
    i,
    rt((g, h) => (h.setHeader("x-powered-by", "ScaleX"), d({ req: g, res: h, setStatusCode: (_) => h.statusCode = _ })))
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
}, ht = (e) => {
  const t = (n) => (i, d) => e[n](i, async (g, h) => {
    h.setHeader("x-powered-by", "ScaleX"), h.send(await d({ req: g, res: h, setStatusCode: h.status }));
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
}, gt = (e) => {
  const t = (n) => (i, d) => e[n](i, async (g, h) => {
    h.header("x-powered-by", "ScaleX"), h.send(await d({ req: g, res: h, setStatusCode: h.status }));
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
}, bt = (e) => {
  const t = (n) => (i, d) => e[n](i, ({ request: g, set: h }) => (h.headers["x-powered-by"] = "ScaleX", d({ req: g, res: null, setStatusCode: (_) => h.status = _ })));
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
  ft as createApp,
  lt as createModule,
  ut as createRouter,
  ct as createService,
  bt as elysiaProvider,
  ht as expressProvider,
  gt as fastifyProvider,
  dt as nitroProvider
};
