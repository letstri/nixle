"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});var it=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Q(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var K={exports:{}};(function(o,p){(function(y,$){o.exports=$()})(it,function(){var y=1e3,$=6e4,D=36e5,k="millisecond",b="second",w="minute",T="hour",S="day",I="week",v="month",Z="quarter",O="year",H="date",z="Invalid Date",et=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,rt=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,nt={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(s){var r=["th","st","nd","rd"],t=s%100;return"["+s+(r[(t-20)%10]||r[t]||r[0])+"]"}},B=function(s,r,t){var n=String(s);return!n||n.length>=r?s:""+Array(r+1-n.length).join(t)+s},st={s:B,z:function(s){var r=-s.utcOffset(),t=Math.abs(r),n=Math.floor(t/60),e=t%60;return(r<=0?"+":"-")+B(n,2,"0")+":"+B(e,2,"0")},m:function s(r,t){if(r.date()<t.date())return-s(t,r);var n=12*(t.year()-r.year())+(t.month()-r.month()),e=r.clone().add(n,v),i=t-e<0,a=r.clone().add(n+(i?-1:1),v);return+(-(n+(t-e)/(i?e-a:a-e))||0)},a:function(s){return s<0?Math.ceil(s)||0:Math.floor(s)},p:function(s){return{M:v,y:O,w:I,d:S,D:H,h:T,m:w,s:b,ms:k,Q:Z}[s]||String(s||"").toLowerCase().replace(/s$/,"")},u:function(s){return s===void 0}},L="en",x={};x[L]=nt;var V="$isDayjsObject",J=function(s){return s instanceof N||!(!s||!s[V])},P=function s(r,t,n){var e;if(!r)return L;if(typeof r=="string"){var i=r.toLowerCase();x[i]&&(e=i),t&&(x[i]=t,e=i);var a=r.split("-");if(!e&&a.length>1)return s(a[0])}else{var c=r.name;x[c]=r,e=c}return!n&&e&&(L=e),e||!n&&L},d=function(s,r){if(J(s))return s.clone();var t=typeof r=="object"?r:{};return t.date=s,t.args=arguments,new N(t)},u=st;u.l=P,u.i=J,u.w=function(s,r){return d(s,{locale:r.$L,utc:r.$u,x:r.$x,$offset:r.$offset})};var N=function(){function s(t){this.$L=P(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[V]=!0}var r=s.prototype;return r.parse=function(t){this.$d=function(n){var e=n.date,i=n.utc;if(e===null)return new Date(NaN);if(u.u(e))return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){var a=e.match(et);if(a){var c=a[2]-1||0,l=(a[7]||"0").substring(0,3);return i?new Date(Date.UTC(a[1],c,a[3]||1,a[4]||0,a[5]||0,a[6]||0,l)):new Date(a[1],c,a[3]||1,a[4]||0,a[5]||0,a[6]||0,l)}}return new Date(e)}(t),this.init()},r.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},r.$utils=function(){return u},r.isValid=function(){return this.$d.toString()!==z},r.isSame=function(t,n){var e=d(t);return this.startOf(n)<=e&&e<=this.endOf(n)},r.isAfter=function(t,n){return d(t)<this.startOf(n)},r.isBefore=function(t,n){return this.endOf(n)<d(t)},r.$g=function(t,n,e){return u.u(t)?this[n]:this.set(e,t)},r.unix=function(){return Math.floor(this.valueOf()/1e3)},r.valueOf=function(){return this.$d.getTime()},r.startOf=function(t,n){var e=this,i=!!u.u(n)||n,a=u.p(t),c=function(C,m){var _=u.w(e.$u?Date.UTC(e.$y,m,C):new Date(e.$y,m,C),e);return i?_:_.endOf(S)},l=function(C,m){return u.w(e.toDate()[C].apply(e.toDate("s"),(i?[0,0,0,0]:[23,59,59,999]).slice(m)),e)},h=this.$W,g=this.$M,M=this.$D,j="set"+(this.$u?"UTC":"");switch(a){case O:return i?c(1,0):c(31,11);case v:return i?c(1,g):c(0,g+1);case I:var Y=this.$locale().weekStart||0,A=(h<Y?h+7:h)-Y;return c(i?M-A:M+(6-A),g);case S:case H:return l(j+"Hours",0);case T:return l(j+"Minutes",1);case w:return l(j+"Seconds",2);case b:return l(j+"Milliseconds",3);default:return this.clone()}},r.endOf=function(t){return this.startOf(t,!1)},r.$set=function(t,n){var e,i=u.p(t),a="set"+(this.$u?"UTC":""),c=(e={},e[S]=a+"Date",e[H]=a+"Date",e[v]=a+"Month",e[O]=a+"FullYear",e[T]=a+"Hours",e[w]=a+"Minutes",e[b]=a+"Seconds",e[k]=a+"Milliseconds",e)[i],l=i===S?this.$D+(n-this.$W):n;if(i===v||i===O){var h=this.clone().set(H,1);h.$d[c](l),h.init(),this.$d=h.set(H,Math.min(this.$D,h.daysInMonth())).$d}else c&&this.$d[c](l);return this.init(),this},r.set=function(t,n){return this.clone().$set(t,n)},r.get=function(t){return this[u.p(t)]()},r.add=function(t,n){var e,i=this;t=Number(t);var a=u.p(n),c=function(g){var M=d(i);return u.w(M.date(M.date()+Math.round(g*t)),i)};if(a===v)return this.set(v,this.$M+t);if(a===O)return this.set(O,this.$y+t);if(a===S)return c(1);if(a===I)return c(7);var l=(e={},e[w]=$,e[T]=D,e[b]=y,e)[a]||1,h=this.$d.getTime()+t*l;return u.w(h,this)},r.subtract=function(t,n){return this.add(-1*t,n)},r.format=function(t){var n=this,e=this.$locale();if(!this.isValid())return e.invalidDate||z;var i=t||"YYYY-MM-DDTHH:mm:ssZ",a=u.z(this),c=this.$H,l=this.$m,h=this.$M,g=e.weekdays,M=e.months,j=e.meridiem,Y=function(m,_,E,U){return m&&(m[_]||m(n,i))||E[_].slice(0,U)},A=function(m){return u.s(c%12||12,m,"0")},C=j||function(m,_,E){var U=m<12?"AM":"PM";return E?U.toLowerCase():U};return i.replace(rt,function(m,_){return _||function(E){switch(E){case"YY":return String(n.$y).slice(-2);case"YYYY":return u.s(n.$y,4,"0");case"M":return h+1;case"MM":return u.s(h+1,2,"0");case"MMM":return Y(e.monthsShort,h,M,3);case"MMMM":return Y(M,h);case"D":return n.$D;case"DD":return u.s(n.$D,2,"0");case"d":return String(n.$W);case"dd":return Y(e.weekdaysMin,n.$W,g,2);case"ddd":return Y(e.weekdaysShort,n.$W,g,3);case"dddd":return g[n.$W];case"H":return String(c);case"HH":return u.s(c,2,"0");case"h":return A(1);case"hh":return A(2);case"a":return C(c,l,!0);case"A":return C(c,l,!1);case"m":return String(l);case"mm":return u.s(l,2,"0");case"s":return String(n.$s);case"ss":return u.s(n.$s,2,"0");case"SSS":return u.s(n.$ms,3,"0");case"Z":return a}return null}(m)||a.replace(":","")})},r.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},r.diff=function(t,n,e){var i,a=this,c=u.p(n),l=d(t),h=(l.utcOffset()-this.utcOffset())*$,g=this-l,M=function(){return u.m(a,l)};switch(c){case O:i=M()/12;break;case v:i=M();break;case Z:i=M()/3;break;case I:i=(g-h)/6048e5;break;case S:i=(g-h)/864e5;break;case T:i=g/D;break;case w:i=g/$;break;case b:i=g/y;break;default:i=g}return e?i:u.a(i)},r.daysInMonth=function(){return this.endOf(v).$D},r.$locale=function(){return x[this.$L]},r.locale=function(t,n){if(!t)return this.$L;var e=this.clone(),i=P(t,n,!0);return i&&(e.$L=i),e},r.clone=function(){return u.w(this.$d,this)},r.toDate=function(){return new Date(this.valueOf())},r.toJSON=function(){return this.isValid()?this.toISOString():null},r.toISOString=function(){return this.$d.toISOString()},r.toString=function(){return this.$d.toUTCString()},s}(),q=N.prototype;return d.prototype=q,[["$ms",k],["$s",b],["$m",w],["$H",T],["$W",S],["$M",v],["$y",O],["$D",H]].forEach(function(s){q[s[1]]=function(r){return this.$g(r,s[0],s[1])}}),d.extend=function(s,r){return s.$i||(s(r,N,d),s.$i=!0),d},d.locale=P,d.isDayjs=J,d.unix=function(s){return d(1e3*s)},d.en=x[L],d.Ls=x,d.p={},d})})(K);var at=K.exports;const ot=Q(at);var R={exports:{}},f=String,X=function(){return{isColorSupported:!1,reset:f,bold:f,dim:f,italic:f,underline:f,inverse:f,hidden:f,strikethrough:f,black:f,red:f,green:f,yellow:f,blue:f,magenta:f,cyan:f,white:f,gray:f,bgBlack:f,bgRed:f,bgGreen:f,bgYellow:f,bgBlue:f,bgMagenta:f,bgCyan:f,bgWhite:f}};R.exports=X();R.exports.createColors=X;var ut=R.exports;const W=Q(ut);let tt={log:console.log};const ct=o=>{tt=o},F=(o,p)=>{const y=p?.type||"info",$=`🫡 ${W.bgBlue(" Nixle ")}`,D=`${ot().format("DD/MM/YYYY, HH:mm")}`,k=W.dim(`[${y.toUpperCase()}]`),b={info:W.blue,success:W.green,error:W.red,warn:W.yellow};tt?.log(`${$} ${D} ${k} ${b[y](o)}`)},ft=(o,p)=>[o,p],lt=o=>o({log:F}),dt=o=>o,G=o=>{const p=o.startsWith("/")?o:`/${o}`;return p.endsWith("/")?p.slice(0,-1):p},ht=(o,p,y)=>{y({log:F}).forEach($=>{const D=$.method?$.method.toLowerCase():"get",k=o.methods[D],b=G(p)+G($.path);k(b,w=>($.statusCode&&w.setStatusCode($.statusCode),$.handler(w)))})},$t=(o,p)=>{p.forEach(y=>{y.routers.forEach(([$,D])=>{ht(o,$,D)})})},gt=(o,{logger:p,...y})=>(p&&ct(p),F("Starting an application..."),$t(o,y.modules),F("Application successfully started"),o.server),pt=o=>o;exports.createApp=gt;exports.createModule=dt;exports.createProvider=pt;exports.createRouter=ft;exports.createService=lt;
