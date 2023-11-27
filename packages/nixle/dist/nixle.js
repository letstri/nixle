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
    var n = 1e3, r = 6e4, u = 36e5, f = "millisecond", b = "second", p = "minute", C = "hour", A = "day", W = "week", O = "month", re = "quarter", T = "year", Y = "date", ne = "Invalid Date", $e = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, me = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, pe = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(l) {
      var i = ["th", "st", "nd", "rd"], s = l % 100;
      return "[" + l + (i[(s - 20) % 10] || i[s] || i[0]) + "]";
    } }, z = function(l, i, s) {
      var a = String(l);
      return !a || a.length >= i ? l : "" + Array(i + 1 - a.length).join(s) + l;
    }, ye = { s: z, z: function(l) {
      var i = -l.utcOffset(), s = Math.abs(i), a = Math.floor(s / 60), o = s % 60;
      return (i <= 0 ? "+" : "-") + z(a, 2, "0") + ":" + z(o, 2, "0");
    }, m: function l(i, s) {
      if (i.date() < s.date())
        return -l(s, i);
      var a = 12 * (s.year() - i.year()) + (s.month() - i.month()), o = i.clone().add(a, O), c = s - o < 0, h = i.clone().add(a + (c ? -1 : 1), O);
      return +(-(a + (s - o) / (c ? o - h : h - o)) || 0);
    }, a: function(l) {
      return l < 0 ? Math.ceil(l) || 0 : Math.floor(l);
    }, p: function(l) {
      return { M: O, y: T, w: W, d: A, D: Y, h: C, m: p, s: b, ms: f, Q: re }[l] || String(l || "").toLowerCase().replace(/s$/, "");
    }, u: function(l) {
      return l === void 0;
    } }, F = "en", B = {};
    B[F] = pe;
    var se = "$isDayjsObject", K = function(l) {
      return l instanceof U || !(!l || !l[se]);
    }, G = function l(i, s, a) {
      var o;
      if (!i)
        return F;
      if (typeof i == "string") {
        var c = i.toLowerCase();
        B[c] && (o = c), s && (B[c] = s, o = c);
        var h = i.split("-");
        if (!o && h.length > 1)
          return l(h[0]);
      } else {
        var g = i.name;
        B[g] = i, o = g;
      }
      return !a && o && (F = o), o || !a && F;
    }, y = function(l, i) {
      if (K(l))
        return l.clone();
      var s = typeof i == "object" ? i : {};
      return s.date = l, s.args = arguments, new U(s);
    }, d = ye;
    d.l = G, d.i = K, d.w = function(l, i) {
      return y(l, { locale: i.$L, utc: i.$u, x: i.$x, $offset: i.$offset });
    };
    var U = function() {
      function l(s) {
        this.$L = G(s.locale, null, !0), this.parse(s), this.$x = this.$x || s.x || {}, this[se] = !0;
      }
      var i = l.prototype;
      return i.parse = function(s) {
        this.$d = function(a) {
          var o = a.date, c = a.utc;
          if (o === null)
            return /* @__PURE__ */ new Date(NaN);
          if (d.u(o))
            return /* @__PURE__ */ new Date();
          if (o instanceof Date)
            return new Date(o);
          if (typeof o == "string" && !/Z$/i.test(o)) {
            var h = o.match($e);
            if (h) {
              var g = h[2] - 1 || 0, m = (h[7] || "0").substring(0, 3);
              return c ? new Date(Date.UTC(h[1], g, h[3] || 1, h[4] || 0, h[5] || 0, h[6] || 0, m)) : new Date(h[1], g, h[3] || 1, h[4] || 0, h[5] || 0, h[6] || 0, m);
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
        var o = this, c = !!d.u(a) || a, h = d.p(s), g = function(k, S) {
          var x = d.w(o.$u ? Date.UTC(o.$y, S, k) : new Date(o.$y, S, k), o);
          return c ? x : x.endOf(A);
        }, m = function(k, S) {
          return d.w(o.toDate()[k].apply(o.toDate("s"), (c ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(S)), o);
        }, v = this.$W, M = this.$M, w = this.$D, _ = "set" + (this.$u ? "UTC" : "");
        switch (h) {
          case T:
            return c ? g(1, 0) : g(31, 11);
          case O:
            return c ? g(1, M) : g(0, M + 1);
          case W:
            var j = this.$locale().weekStart || 0, R = (v < j ? v + 7 : v) - j;
            return g(c ? w - R : w + (6 - R), M);
          case A:
          case Y:
            return m(_ + "Hours", 0);
          case C:
            return m(_ + "Minutes", 1);
          case p:
            return m(_ + "Seconds", 2);
          case b:
            return m(_ + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, i.endOf = function(s) {
        return this.startOf(s, !1);
      }, i.$set = function(s, a) {
        var o, c = d.p(s), h = "set" + (this.$u ? "UTC" : ""), g = (o = {}, o[A] = h + "Date", o[Y] = h + "Date", o[O] = h + "Month", o[T] = h + "FullYear", o[C] = h + "Hours", o[p] = h + "Minutes", o[b] = h + "Seconds", o[f] = h + "Milliseconds", o)[c], m = c === A ? this.$D + (a - this.$W) : a;
        if (c === O || c === T) {
          var v = this.clone().set(Y, 1);
          v.$d[g](m), v.init(), this.$d = v.set(Y, Math.min(this.$D, v.daysInMonth())).$d;
        } else
          g && this.$d[g](m);
        return this.init(), this;
      }, i.set = function(s, a) {
        return this.clone().$set(s, a);
      }, i.get = function(s) {
        return this[d.p(s)]();
      }, i.add = function(s, a) {
        var o, c = this;
        s = Number(s);
        var h = d.p(a), g = function(M) {
          var w = y(c);
          return d.w(w.date(w.date() + Math.round(M * s)), c);
        };
        if (h === O)
          return this.set(O, this.$M + s);
        if (h === T)
          return this.set(T, this.$y + s);
        if (h === A)
          return g(1);
        if (h === W)
          return g(7);
        var m = (o = {}, o[p] = r, o[C] = u, o[b] = n, o)[h] || 1, v = this.$d.getTime() + s * m;
        return d.w(v, this);
      }, i.subtract = function(s, a) {
        return this.add(-1 * s, a);
      }, i.format = function(s) {
        var a = this, o = this.$locale();
        if (!this.isValid())
          return o.invalidDate || ne;
        var c = s || "YYYY-MM-DDTHH:mm:ssZ", h = d.z(this), g = this.$H, m = this.$m, v = this.$M, M = o.weekdays, w = o.months, _ = o.meridiem, j = function(S, x, I, V) {
          return S && (S[x] || S(a, c)) || I[x].slice(0, V);
        }, R = function(S) {
          return d.s(g % 12 || 12, S, "0");
        }, k = _ || function(S, x, I) {
          var V = S < 12 ? "AM" : "PM";
          return I ? V.toLowerCase() : V;
        };
        return c.replace(me, function(S, x) {
          return x || function(I) {
            switch (I) {
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
                return String(g);
              case "HH":
                return d.s(g, 2, "0");
              case "h":
                return R(1);
              case "hh":
                return R(2);
              case "a":
                return k(g, m, !0);
              case "A":
                return k(g, m, !1);
              case "m":
                return String(m);
              case "mm":
                return d.s(m, 2, "0");
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
        var c, h = this, g = d.p(a), m = y(s), v = (m.utcOffset() - this.utcOffset()) * r, M = this - m, w = function() {
          return d.m(h, m);
        };
        switch (g) {
          case T:
            c = w() / 12;
            break;
          case O:
            c = w();
            break;
          case re:
            c = w() / 3;
            break;
          case W:
            c = (M - v) / 6048e5;
            break;
          case A:
            c = (M - v) / 864e5;
            break;
          case C:
            c = M / u;
            break;
          case p:
            c = M / r;
            break;
          case b:
            c = M / n;
            break;
          default:
            c = M;
        }
        return o ? c : d.a(c);
      }, i.daysInMonth = function() {
        return this.endOf(O).$D;
      }, i.$locale = function() {
        return B[this.$L];
      }, i.locale = function(s, a) {
        if (!s)
          return this.$L;
        var o = this.clone(), c = G(s, a, !0);
        return c && (o.$L = c), o;
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
      }, l;
    }(), oe = U.prototype;
    return y.prototype = oe, [["$ms", f], ["$s", b], ["$m", p], ["$H", C], ["$W", A], ["$M", O], ["$y", T], ["$D", Y]].forEach(function(l) {
      oe[l[1]] = function(i) {
        return this.$g(i, l[0], l[1]);
      };
    }), y.extend = function(l, i) {
      return l.$i || (l(i, U, y), l.$i = !0), y;
    }, y.locale = G, y.isDayjs = K, y.unix = function(l) {
      return y(1e3 * l);
    }, y.en = B[F], y.Ls = B, y.p = {}, y;
  });
})(ge);
var Se = ge.exports;
const we = /* @__PURE__ */ Me(Se), Q = 10, ie = (t = 0) => (e) => `\x1B[${e + t}m`, ae = (t = 0) => (e) => `\x1B[${38 + t};5;${e}m`, ue = (t = 0) => (e, n, r) => `\x1B[${38 + t};2;${e};${n};${r}m`, $ = {
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
Object.keys($.modifier);
const Oe = Object.keys($.color), De = Object.keys($.bgColor);
[...Oe, ...De];
function Ce() {
  const t = /* @__PURE__ */ new Map();
  for (const [e, n] of Object.entries($)) {
    for (const [r, u] of Object.entries(n))
      $[r] = {
        open: `\x1B[${u[0]}m`,
        close: `\x1B[${u[1]}m`
      }, n[r] = $[r], t.set(u[0], u[1]);
    Object.defineProperty($, e, {
      value: n,
      enumerable: !1
    });
  }
  return Object.defineProperty($, "codes", {
    value: t,
    enumerable: !1
  }), $.color.close = "\x1B[39m", $.bgColor.close = "\x1B[49m", $.color.ansi = ie(), $.color.ansi256 = ae(), $.color.ansi16m = ue(), $.bgColor.ansi = ie(Q), $.bgColor.ansi256 = ae(Q), $.bgColor.ansi16m = ue(Q), Object.defineProperties($, {
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
      value: (e) => $.rgbToAnsi256(...$.hexToRgb(e)),
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
          const p = e % 36;
          n = Math.floor(e / 36) / 5, r = Math.floor(p / 6) / 5, u = p % 6 / 5;
        }
        const f = Math.max(n, r, u) * 2;
        if (f === 0)
          return 30;
        let b = 30 + (Math.round(u) << 2 | Math.round(r) << 1 | Math.round(n));
        return f === 2 && (b += 60), b;
      },
      enumerable: !1
    },
    rgbToAnsi: {
      value: (e, n, r) => $.ansi256ToAnsi($.rgbToAnsi256(e, n, r)),
      enumerable: !1
    },
    hexToAnsi: {
      value: (e) => $.ansi256ToAnsi($.hexToAnsi256(e)),
      enumerable: !1
    }
  }), $;
}
const Ae = Ce(), D = Ae, J = (() => {
  if (navigator.userAgentData) {
    const t = navigator.userAgentData.brands.find(({ brand: e }) => e === "Chromium");
    if (t && t.version > 93)
      return 3;
  }
  return /\b(Chrome|Chromium)\//.test(navigator.userAgent) ? 1 : 0;
})(), le = J !== 0 && {
  level: J,
  hasBasic: !0,
  has256: J >= 2,
  has16m: J >= 3
}, Te = {
  stdout: le,
  stderr: le
}, xe = Te;
function Be(t, e, n) {
  let r = t.indexOf(e);
  if (r === -1)
    return t;
  const u = e.length;
  let f = 0, b = "";
  do
    b += t.slice(f, r) + e + n, f = r + u, r = t.indexOf(e, f);
  while (r !== -1);
  return b += t.slice(f), b;
}
function je(t, e, n, r) {
  let u = 0, f = "";
  do {
    const b = t[r - 1] === "\r";
    f += t.slice(u, b ? r - 1 : r) + e + (b ? `\r
` : `
`) + n, u = r + 1, r = t.indexOf(`
`, u);
  } while (r !== -1);
  return f += t.slice(u), f;
}
const { stdout: ce, stderr: he } = xe, X = Symbol("GENERATOR"), P = Symbol("STYLER"), L = Symbol("IS_EMPTY"), fe = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
], E = /* @__PURE__ */ Object.create(null), ke = (t, e = {}) => {
  if (e.level && !(Number.isInteger(e.level) && e.level >= 0 && e.level <= 3))
    throw new Error("The `level` option should be an integer from 0 to 3");
  const n = ce ? ce.level : 0;
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
  E[t] = {
    get() {
      const n = Z(this, te(e.open, e.close, this[P]), this[L]);
      return Object.defineProperty(this, t, { value: n }), n;
    }
  };
E.visible = {
  get() {
    const t = Z(this, this[P], !0);
    return Object.defineProperty(this, "visible", { value: t }), t;
  }
};
const ee = (t, e, n, ...r) => t === "rgb" ? e === "ansi16m" ? D[n].ansi16m(...r) : e === "ansi256" ? D[n].ansi256(D.rgbToAnsi256(...r)) : D[n].ansi(D.rgbToAnsi(...r)) : t === "hex" ? ee("rgb", e, n, ...D.hexToRgb(...r)) : D[n][t](...r), _e = ["rgb", "hex", "ansi256"];
for (const t of _e) {
  E[t] = {
    get() {
      const { level: n } = this;
      return function(...r) {
        const u = te(ee(t, fe[n], "color", ...r), D.color.close, this[P]);
        return Z(this, u, this[L]);
      };
    }
  };
  const e = "bg" + t[0].toUpperCase() + t.slice(1);
  E[e] = {
    get() {
      const { level: n } = this;
      return function(...r) {
        const u = te(ee(t, fe[n], "bgColor", ...r), D.bgColor.close, this[P]);
        return Z(this, u, this[L]);
      };
    }
  };
}
const Ne = Object.defineProperties(() => {
}, {
  ...E,
  level: {
    enumerable: !0,
    get() {
      return this[X].level;
    },
    set(t) {
      this[X].level = t;
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
}, Z = (t, e, n) => {
  const r = (...u) => Pe(r, u.length === 1 ? "" + u[0] : u.join(" "));
  return Object.setPrototypeOf(r, Ne), r[X] = t, r[P] = e, r[L] = n, r;
}, Pe = (t, e) => {
  if (t.level <= 0 || !e)
    return t[L] ? "" : e;
  let n = t[P];
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
Object.defineProperties(H.prototype, E);
const Ee = H();
H({ level: he ? he.level : 0 });
const N = Ee;
let be = {
  log: console.log
};
const Fe = (t) => {
  be = t;
}, q = (t, e) => {
  const n = e?.type || "info", r = `🫡 ${N.bgBlue(" Nixle ")}`, u = `${we().format("DD/MM/YYYY, HH:mm")}`, f = N.dim(`[${n.toUpperCase()}]`), b = {
    info: N.blue,
    success: N.green,
    error: N.red,
    warn: N.yellow
  };
  be?.log(`${r} ${u} ${f} ${b[n](t)}`);
}, We = (t, e) => [t, e], Ge = (t) => t({ log: q }), Ue = (t) => t, de = (t) => {
  const e = t.startsWith("/") ? t : `/${t}`;
  return e.endsWith("/") ? e.slice(0, -1) : e;
}, Re = (t, e, n) => {
  n({ log: q }).forEach((r) => {
    const u = r.method ? r.method.toLowerCase() : "get", f = t.methods[u], b = de(e) + de(r.path);
    f(b, (p) => (r.statusCode && p.setStatusCode(r.statusCode), r.handler(p)));
  });
}, Ie = (t, e) => {
  e.forEach((n) => {
    n.routers.forEach(([r, u]) => {
      Re(t, r, u);
    });
  });
}, Ve = (t, { logger: e, ...n }) => (e && Fe(e), q("Starting an application..."), Ie(t, n.modules), q("Application successfully started"), t.server), Je = (t) => t, Ze = (t) => {
  const e = (r) => (u, f) => t[r](u, async (b, p) => {
    p.header("x-powered-by", "Nixle"), p.send(await f({ req: b, res: p, setStatusCode: p.status }));
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
  const e = (r) => (u, f) => t[r](u, ({ request: b, set: p }) => (p.headers["x-powered-by"] = "Nixle", f({ req: b, res: null, setStatusCode: (C) => p.status = C })));
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
  Ve as createApp,
  Ue as createModule,
  Je as createProvider,
  We as createRouter,
  Ge as createService,
  qe as elysiaProvider,
  Ze as fastifyProvider
};
