var ve = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Me(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ge = { exports: {} };
(function(t, e) {
  (function(s, n) {
    t.exports = n();
  })(ve, function() {
    var s = 1e3, n = 6e4, u = 36e5, g = "millisecond", m = "second", O = "minute", x = "hour", A = "day", W = "week", w = "month", ne = "quarter", C = "year", Y = "date", re = "Invalid Date", $e = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, me = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, ye = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(l) {
      var i = ["th", "st", "nd", "rd"], r = l % 100;
      return "[" + l + (i[(r - 20) % 10] || i[r] || i[0]) + "]";
    } }, q = function(l, i, r) {
      var a = String(l);
      return !a || a.length >= i ? l : "" + Array(i + 1 - a.length).join(r) + l;
    }, pe = { s: q, z: function(l) {
      var i = -l.utcOffset(), r = Math.abs(i), a = Math.floor(r / 60), o = r % 60;
      return (i <= 0 ? "+" : "-") + q(a, 2, "0") + ":" + q(o, 2, "0");
    }, m: function l(i, r) {
      if (i.date() < r.date())
        return -l(r, i);
      var a = 12 * (r.year() - i.year()) + (r.month() - i.month()), o = i.clone().add(a, w), c = r - o < 0, f = i.clone().add(a + (c ? -1 : 1), w);
      return +(-(a + (r - o) / (c ? o - f : f - o)) || 0);
    }, a: function(l) {
      return l < 0 ? Math.ceil(l) || 0 : Math.floor(l);
    }, p: function(l) {
      return { M: w, y: C, w: W, d: A, D: Y, h: x, m: O, s: m, ms: g, Q: ne }[l] || String(l || "").toLowerCase().replace(/s$/, "");
    }, u: function(l) {
      return l === void 0;
    } }, P = "en", B = {};
    B[P] = ye;
    var se = "$isDayjsObject", K = function(l) {
      return l instanceof U || !(!l || !l[se]);
    }, G = function l(i, r, a) {
      var o;
      if (!i)
        return P;
      if (typeof i == "string") {
        var c = i.toLowerCase();
        B[c] && (o = c), r && (B[c] = r, o = c);
        var f = i.split("-");
        if (!o && f.length > 1)
          return l(f[0]);
      } else {
        var d = i.name;
        B[d] = i, o = d;
      }
      return !a && o && (P = o), o || !a && P;
    }, y = function(l, i) {
      if (K(l))
        return l.clone();
      var r = typeof i == "object" ? i : {};
      return r.date = l, r.args = arguments, new U(r);
    }, h = pe;
    h.l = G, h.i = K, h.w = function(l, i) {
      return y(l, { locale: i.$L, utc: i.$u, x: i.$x, $offset: i.$offset });
    };
    var U = function() {
      function l(r) {
        this.$L = G(r.locale, null, !0), this.parse(r), this.$x = this.$x || r.x || {}, this[se] = !0;
      }
      var i = l.prototype;
      return i.parse = function(r) {
        this.$d = function(a) {
          var o = a.date, c = a.utc;
          if (o === null)
            return /* @__PURE__ */ new Date(NaN);
          if (h.u(o))
            return /* @__PURE__ */ new Date();
          if (o instanceof Date)
            return new Date(o);
          if (typeof o == "string" && !/Z$/i.test(o)) {
            var f = o.match($e);
            if (f) {
              var d = f[2] - 1 || 0, $ = (f[7] || "0").substring(0, 3);
              return c ? new Date(Date.UTC(f[1], d, f[3] || 1, f[4] || 0, f[5] || 0, f[6] || 0, $)) : new Date(f[1], d, f[3] || 1, f[4] || 0, f[5] || 0, f[6] || 0, $);
            }
          }
          return new Date(o);
        }(r), this.init();
      }, i.init = function() {
        var r = this.$d;
        this.$y = r.getFullYear(), this.$M = r.getMonth(), this.$D = r.getDate(), this.$W = r.getDay(), this.$H = r.getHours(), this.$m = r.getMinutes(), this.$s = r.getSeconds(), this.$ms = r.getMilliseconds();
      }, i.$utils = function() {
        return h;
      }, i.isValid = function() {
        return this.$d.toString() !== re;
      }, i.isSame = function(r, a) {
        var o = y(r);
        return this.startOf(a) <= o && o <= this.endOf(a);
      }, i.isAfter = function(r, a) {
        return y(r) < this.startOf(a);
      }, i.isBefore = function(r, a) {
        return this.endOf(a) < y(r);
      }, i.$g = function(r, a, o) {
        return h.u(r) ? this[a] : this.set(o, r);
      }, i.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, i.valueOf = function() {
        return this.$d.getTime();
      }, i.startOf = function(r, a) {
        var o = this, c = !!h.u(a) || a, f = h.p(r), d = function(k, M) {
          var T = h.w(o.$u ? Date.UTC(o.$y, M, k) : new Date(o.$y, M, k), o);
          return c ? T : T.endOf(A);
        }, $ = function(k, M) {
          return h.w(o.toDate()[k].apply(o.toDate("s"), (c ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(M)), o);
        }, p = this.$W, v = this.$M, S = this.$D, _ = "set" + (this.$u ? "UTC" : "");
        switch (f) {
          case C:
            return c ? d(1, 0) : d(31, 11);
          case w:
            return c ? d(1, v) : d(0, v + 1);
          case W:
            var j = this.$locale().weekStart || 0, R = (p < j ? p + 7 : p) - j;
            return d(c ? S - R : S + (6 - R), v);
          case A:
          case Y:
            return $(_ + "Hours", 0);
          case x:
            return $(_ + "Minutes", 1);
          case O:
            return $(_ + "Seconds", 2);
          case m:
            return $(_ + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, i.endOf = function(r) {
        return this.startOf(r, !1);
      }, i.$set = function(r, a) {
        var o, c = h.p(r), f = "set" + (this.$u ? "UTC" : ""), d = (o = {}, o[A] = f + "Date", o[Y] = f + "Date", o[w] = f + "Month", o[C] = f + "FullYear", o[x] = f + "Hours", o[O] = f + "Minutes", o[m] = f + "Seconds", o[g] = f + "Milliseconds", o)[c], $ = c === A ? this.$D + (a - this.$W) : a;
        if (c === w || c === C) {
          var p = this.clone().set(Y, 1);
          p.$d[d]($), p.init(), this.$d = p.set(Y, Math.min(this.$D, p.daysInMonth())).$d;
        } else
          d && this.$d[d]($);
        return this.init(), this;
      }, i.set = function(r, a) {
        return this.clone().$set(r, a);
      }, i.get = function(r) {
        return this[h.p(r)]();
      }, i.add = function(r, a) {
        var o, c = this;
        r = Number(r);
        var f = h.p(a), d = function(v) {
          var S = y(c);
          return h.w(S.date(S.date() + Math.round(v * r)), c);
        };
        if (f === w)
          return this.set(w, this.$M + r);
        if (f === C)
          return this.set(C, this.$y + r);
        if (f === A)
          return d(1);
        if (f === W)
          return d(7);
        var $ = (o = {}, o[O] = n, o[x] = u, o[m] = s, o)[f] || 1, p = this.$d.getTime() + r * $;
        return h.w(p, this);
      }, i.subtract = function(r, a) {
        return this.add(-1 * r, a);
      }, i.format = function(r) {
        var a = this, o = this.$locale();
        if (!this.isValid())
          return o.invalidDate || re;
        var c = r || "YYYY-MM-DDTHH:mm:ssZ", f = h.z(this), d = this.$H, $ = this.$m, p = this.$M, v = o.weekdays, S = o.months, _ = o.meridiem, j = function(M, T, I, V) {
          return M && (M[T] || M(a, c)) || I[T].slice(0, V);
        }, R = function(M) {
          return h.s(d % 12 || 12, M, "0");
        }, k = _ || function(M, T, I) {
          var V = M < 12 ? "AM" : "PM";
          return I ? V.toLowerCase() : V;
        };
        return c.replace(me, function(M, T) {
          return T || function(I) {
            switch (I) {
              case "YY":
                return String(a.$y).slice(-2);
              case "YYYY":
                return h.s(a.$y, 4, "0");
              case "M":
                return p + 1;
              case "MM":
                return h.s(p + 1, 2, "0");
              case "MMM":
                return j(o.monthsShort, p, S, 3);
              case "MMMM":
                return j(S, p);
              case "D":
                return a.$D;
              case "DD":
                return h.s(a.$D, 2, "0");
              case "d":
                return String(a.$W);
              case "dd":
                return j(o.weekdaysMin, a.$W, v, 2);
              case "ddd":
                return j(o.weekdaysShort, a.$W, v, 3);
              case "dddd":
                return v[a.$W];
              case "H":
                return String(d);
              case "HH":
                return h.s(d, 2, "0");
              case "h":
                return R(1);
              case "hh":
                return R(2);
              case "a":
                return k(d, $, !0);
              case "A":
                return k(d, $, !1);
              case "m":
                return String($);
              case "mm":
                return h.s($, 2, "0");
              case "s":
                return String(a.$s);
              case "ss":
                return h.s(a.$s, 2, "0");
              case "SSS":
                return h.s(a.$ms, 3, "0");
              case "Z":
                return f;
            }
            return null;
          }(M) || f.replace(":", "");
        });
      }, i.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, i.diff = function(r, a, o) {
        var c, f = this, d = h.p(a), $ = y(r), p = ($.utcOffset() - this.utcOffset()) * n, v = this - $, S = function() {
          return h.m(f, $);
        };
        switch (d) {
          case C:
            c = S() / 12;
            break;
          case w:
            c = S();
            break;
          case ne:
            c = S() / 3;
            break;
          case W:
            c = (v - p) / 6048e5;
            break;
          case A:
            c = (v - p) / 864e5;
            break;
          case x:
            c = v / u;
            break;
          case O:
            c = v / n;
            break;
          case m:
            c = v / s;
            break;
          default:
            c = v;
        }
        return o ? c : h.a(c);
      }, i.daysInMonth = function() {
        return this.endOf(w).$D;
      }, i.$locale = function() {
        return B[this.$L];
      }, i.locale = function(r, a) {
        if (!r)
          return this.$L;
        var o = this.clone(), c = G(r, a, !0);
        return c && (o.$L = c), o;
      }, i.clone = function() {
        return h.w(this.$d, this);
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
    return y.prototype = oe, [["$ms", g], ["$s", m], ["$m", O], ["$H", x], ["$W", A], ["$M", w], ["$y", C], ["$D", Y]].forEach(function(l) {
      oe[l[1]] = function(i) {
        return this.$g(i, l[0], l[1]);
      };
    }), y.extend = function(l, i) {
      return l.$i || (l(i, U, y), l.$i = !0), y;
    }, y.locale = G, y.isDayjs = K, y.unix = function(l) {
      return y(1e3 * l);
    }, y.en = B[P], y.Ls = B, y.p = {}, y;
  });
})(ge);
var Oe = ge.exports;
const Se = /* @__PURE__ */ Me(Oe), Q = 10, ie = (t = 0) => (e) => `\x1B[${e + t}m`, ae = (t = 0) => (e) => `\x1B[${38 + t};5;${e}m`, ue = (t = 0) => (e, s, n) => `\x1B[${38 + t};2;${e};${s};${n}m`, b = {
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
Object.keys(b.modifier);
const we = Object.keys(b.color), De = Object.keys(b.bgColor);
[...we, ...De];
function Ae() {
  const t = /* @__PURE__ */ new Map();
  for (const [e, s] of Object.entries(b)) {
    for (const [n, u] of Object.entries(s))
      b[n] = {
        open: `\x1B[${u[0]}m`,
        close: `\x1B[${u[1]}m`
      }, s[n] = b[n], t.set(u[0], u[1]);
    Object.defineProperty(b, e, {
      value: s,
      enumerable: !1
    });
  }
  return Object.defineProperty(b, "codes", {
    value: t,
    enumerable: !1
  }), b.color.close = "\x1B[39m", b.bgColor.close = "\x1B[49m", b.color.ansi = ie(), b.color.ansi256 = ae(), b.color.ansi16m = ue(), b.bgColor.ansi = ie(Q), b.bgColor.ansi256 = ae(Q), b.bgColor.ansi16m = ue(Q), Object.defineProperties(b, {
    rgbToAnsi256: {
      value(e, s, n) {
        return e === s && s === n ? e < 8 ? 16 : e > 248 ? 231 : Math.round((e - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(e / 255 * 5) + 6 * Math.round(s / 255 * 5) + Math.round(n / 255 * 5);
      },
      enumerable: !1
    },
    hexToRgb: {
      value(e) {
        const s = /[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));
        if (!s)
          return [0, 0, 0];
        let [n] = s;
        n.length === 3 && (n = [...n].map((g) => g + g).join(""));
        const u = Number.parseInt(n, 16);
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
      value: (e) => b.rgbToAnsi256(...b.hexToRgb(e)),
      enumerable: !1
    },
    ansi256ToAnsi: {
      value(e) {
        if (e < 8)
          return 30 + e;
        if (e < 16)
          return 90 + (e - 8);
        let s, n, u;
        if (e >= 232)
          s = ((e - 232) * 10 + 8) / 255, n = s, u = s;
        else {
          e -= 16;
          const O = e % 36;
          s = Math.floor(e / 36) / 5, n = Math.floor(O / 6) / 5, u = O % 6 / 5;
        }
        const g = Math.max(s, n, u) * 2;
        if (g === 0)
          return 30;
        let m = 30 + (Math.round(u) << 2 | Math.round(n) << 1 | Math.round(s));
        return g === 2 && (m += 60), m;
      },
      enumerable: !1
    },
    rgbToAnsi: {
      value: (e, s, n) => b.ansi256ToAnsi(b.rgbToAnsi256(e, s, n)),
      enumerable: !1
    },
    hexToAnsi: {
      value: (e) => b.ansi256ToAnsi(b.hexToAnsi256(e)),
      enumerable: !1
    }
  }), b;
}
const Ce = Ae(), D = Ce, J = (() => {
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
}, Be = Te;
function je(t, e, s) {
  let n = t.indexOf(e);
  if (n === -1)
    return t;
  const u = e.length;
  let g = 0, m = "";
  do
    m += t.slice(g, n) + e + s, g = n + u, n = t.indexOf(e, g);
  while (n !== -1);
  return m += t.slice(g), m;
}
function ke(t, e, s, n) {
  let u = 0, g = "";
  do {
    const m = t[n - 1] === "\r";
    g += t.slice(u, m ? n - 1 : n) + e + (m ? `\r
` : `
`) + s, u = n + 1, n = t.indexOf(`
`, u);
  } while (n !== -1);
  return g += t.slice(u), g;
}
const { stdout: ce, stderr: fe } = Be, X = Symbol("GENERATOR"), F = Symbol("STYLER"), L = Symbol("IS_EMPTY"), he = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
], N = /* @__PURE__ */ Object.create(null), xe = (t, e = {}) => {
  if (e.level && !(Number.isInteger(e.level) && e.level >= 0 && e.level <= 3))
    throw new Error("The `level` option should be an integer from 0 to 3");
  const s = ce ? ce.level : 0;
  t.level = e.level === void 0 ? s : e.level;
}, Ye = (t) => {
  const e = (...s) => s.join(" ");
  return xe(e, t), Object.setPrototypeOf(e, H.prototype), e;
};
function H(t) {
  return Ye(t);
}
Object.setPrototypeOf(H.prototype, Function.prototype);
for (const [t, e] of Object.entries(D))
  N[t] = {
    get() {
      const s = Z(this, te(e.open, e.close, this[F]), this[L]);
      return Object.defineProperty(this, t, { value: s }), s;
    }
  };
N.visible = {
  get() {
    const t = Z(this, this[F], !0);
    return Object.defineProperty(this, "visible", { value: t }), t;
  }
};
const ee = (t, e, s, ...n) => t === "rgb" ? e === "ansi16m" ? D[s].ansi16m(...n) : e === "ansi256" ? D[s].ansi256(D.rgbToAnsi256(...n)) : D[s].ansi(D.rgbToAnsi(...n)) : t === "hex" ? ee("rgb", e, s, ...D.hexToRgb(...n)) : D[s][t](...n), _e = ["rgb", "hex", "ansi256"];
for (const t of _e) {
  N[t] = {
    get() {
      const { level: s } = this;
      return function(...n) {
        const u = te(ee(t, he[s], "color", ...n), D.color.close, this[F]);
        return Z(this, u, this[L]);
      };
    }
  };
  const e = "bg" + t[0].toUpperCase() + t.slice(1);
  N[e] = {
    get() {
      const { level: s } = this;
      return function(...n) {
        const u = te(ee(t, he[s], "bgColor", ...n), D.bgColor.close, this[F]);
        return Z(this, u, this[L]);
      };
    }
  };
}
const Ee = Object.defineProperties(() => {
}, {
  ...N,
  level: {
    enumerable: !0,
    get() {
      return this[X].level;
    },
    set(t) {
      this[X].level = t;
    }
  }
}), te = (t, e, s) => {
  let n, u;
  return s === void 0 ? (n = t, u = e) : (n = s.openAll + t, u = e + s.closeAll), {
    open: t,
    close: e,
    openAll: n,
    closeAll: u,
    parent: s
  };
}, Z = (t, e, s) => {
  const n = (...u) => Fe(n, u.length === 1 ? "" + u[0] : u.join(" "));
  return Object.setPrototypeOf(n, Ee), n[X] = t, n[F] = e, n[L] = s, n;
}, Fe = (t, e) => {
  if (t.level <= 0 || !e)
    return t[L] ? "" : e;
  let s = t[F];
  if (s === void 0)
    return e;
  const { openAll: n, closeAll: u } = s;
  if (e.includes("\x1B"))
    for (; s !== void 0; )
      e = je(e, s.close, s.open), s = s.parent;
  const g = e.indexOf(`
`);
  return g !== -1 && (e = ke(e, u, n, g)), n + e + u;
};
Object.defineProperties(H.prototype, N);
const Ne = H();
H({ level: fe ? fe.level : 0 });
const E = Ne;
let be = {
  log: console.log
};
const Pe = (t) => {
  be = t;
}, z = (t, e) => {
  const s = e?.type || "info", n = `🫡 ${E.bgBlue(" Nixle ")}`, u = `${Se().format("DD/MM/YYYY, HH:mm")}`, g = E.dim(`[${s.toUpperCase()}]`), m = {
    info: E.blue,
    success: E.green,
    error: E.red,
    warn: E.yellow
  };
  be?.log(`${n} ${u} ${g} ${m[s](t)}`);
}, Le = (t, e) => [t, e], He = (t) => t({ log: z }), We = (t) => t, de = (t) => {
  const e = t.startsWith("/") ? t : `/${t}`;
  return e.endsWith("/") ? e.slice(0, -1) : e;
}, Re = (t, e, s) => {
  s({ log: z }).forEach((n) => {
    const u = n.method ? n.method.toLowerCase() : "get", g = t.methods[u], m = de(e) + de(n.path);
    g(m, (O) => (n.statusCode && O.setStatusCode(n.statusCode), n.handler(O)));
  });
}, Ie = (t, e) => {
  e.forEach((s) => {
    s.routers.forEach(([n, u]) => {
      Re(t, n, u);
    });
  });
}, Ge = (t, { logger: e, ...s }) => (e && Pe(e), z("Starting an application..."), Ie(t, s.modules), z("Application successfully started"), t.server), Ue = (t) => t;
export {
  Ge as createApp,
  We as createModule,
  Ue as createProvider,
  Le as createRouter,
  He as createService
};
