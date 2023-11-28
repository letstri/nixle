var nixle=function(_){"use strict";var rt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function z(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var V={exports:{}};(function(o,y){(function(p,$){o.exports=$()})(rt,function(){var p=1e3,$=6e4,w=36e5,k="millisecond",M="second",H="minute",j="hour",D="day",P="week",b="month",K="quarter",S="year",W="date",X="Invalid Date",$t=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,gt=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,yt={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(s){var r=["th","st","nd","rd"],t=s%100;return"["+s+(r[(t-20)%10]||r[t]||r[0])+"]"}},R=function(s,r,t){var n=String(s);return!n||n.length>=r?s:""+Array(r+1-n.length).join(t)+s},mt={s:R,z:function(s){var r=-s.utcOffset(),t=Math.abs(r),n=Math.floor(t/60),e=t%60;return(r<=0?"+":"-")+R(n,2,"0")+":"+R(e,2,"0")},m:function s(r,t){if(r.date()<t.date())return-s(t,r);var n=12*(t.year()-r.year())+(t.month()-r.month()),e=r.clone().add(n,b),i=t-e<0,a=r.clone().add(n+(i?-1:1),b);return+(-(n+(t-e)/(i?e-a:a-e))||0)},a:function(s){return s<0?Math.ceil(s)||0:Math.floor(s)},p:function(s){return{M:b,y:S,w:P,d:D,D:W,h:j,m:H,s:M,ms:k,Q:K}[s]||String(s||"").toLowerCase().replace(/s$/,"")},u:function(s){return s===void 0}},L="en",Y={};Y[L]=yt;var tt="$isDayjsObject",Z=function(s){return s instanceof F||!(!s||!s[tt])},U=function s(r,t,n){var e;if(!r)return L;if(typeof r=="string"){var i=r.toLowerCase();Y[i]&&(e=i),t&&(Y[i]=t,e=i);var a=r.split("-");if(!e&&a.length>1)return s(a[0])}else{var c=r.name;Y[c]=r,e=c}return!n&&e&&(L=e),e||!n&&L},d=function(s,r){if(Z(s))return s.clone();var t=typeof r=="object"?r:{};return t.date=s,t.args=arguments,new F(t)},u=mt;u.l=U,u.i=Z,u.w=function(s,r){return d(s,{locale:r.$L,utc:r.$u,x:r.$x,$offset:r.$offset})};var F=function(){function s(t){this.$L=U(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[tt]=!0}var r=s.prototype;return r.parse=function(t){this.$d=function(n){var e=n.date,i=n.utc;if(e===null)return new Date(NaN);if(u.u(e))return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){var a=e.match($t);if(a){var c=a[2]-1||0,l=(a[7]||"0").substring(0,3);return i?new Date(Date.UTC(a[1],c,a[3]||1,a[4]||0,a[5]||0,a[6]||0,l)):new Date(a[1],c,a[3]||1,a[4]||0,a[5]||0,a[6]||0,l)}}return new Date(e)}(t),this.init()},r.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},r.$utils=function(){return u},r.isValid=function(){return this.$d.toString()!==X},r.isSame=function(t,n){var e=d(t);return this.startOf(n)<=e&&e<=this.endOf(n)},r.isAfter=function(t,n){return d(t)<this.startOf(n)},r.isBefore=function(t,n){return this.endOf(n)<d(t)},r.$g=function(t,n,e){return u.u(t)?this[n]:this.set(e,t)},r.unix=function(){return Math.floor(this.valueOf()/1e3)},r.valueOf=function(){return this.$d.getTime()},r.startOf=function(t,n){var e=this,i=!!u.u(n)||n,a=u.p(t),c=function(T,m){var O=u.w(e.$u?Date.UTC(e.$y,m,T):new Date(e.$y,m,T),e);return i?O:O.endOf(D)},l=function(T,m){return u.w(e.toDate()[T].apply(e.toDate("s"),(i?[0,0,0,0]:[23,59,59,999]).slice(m)),e)},h=this.$W,g=this.$M,v=this.$D,A="set"+(this.$u?"UTC":"");switch(a){case S:return i?c(1,0):c(31,11);case b:return i?c(1,g):c(0,g+1);case P:var C=this.$locale().weekStart||0,E=(h<C?h+7:h)-C;return c(i?v-E:v+(6-E),g);case D:case W:return l(A+"Hours",0);case j:return l(A+"Minutes",1);case H:return l(A+"Seconds",2);case M:return l(A+"Milliseconds",3);default:return this.clone()}},r.endOf=function(t){return this.startOf(t,!1)},r.$set=function(t,n){var e,i=u.p(t),a="set"+(this.$u?"UTC":""),c=(e={},e[D]=a+"Date",e[W]=a+"Date",e[b]=a+"Month",e[S]=a+"FullYear",e[j]=a+"Hours",e[H]=a+"Minutes",e[M]=a+"Seconds",e[k]=a+"Milliseconds",e)[i],l=i===D?this.$D+(n-this.$W):n;if(i===b||i===S){var h=this.clone().set(W,1);h.$d[c](l),h.init(),this.$d=h.set(W,Math.min(this.$D,h.daysInMonth())).$d}else c&&this.$d[c](l);return this.init(),this},r.set=function(t,n){return this.clone().$set(t,n)},r.get=function(t){return this[u.p(t)]()},r.add=function(t,n){var e,i=this;t=Number(t);var a=u.p(n),c=function(g){var v=d(i);return u.w(v.date(v.date()+Math.round(g*t)),i)};if(a===b)return this.set(b,this.$M+t);if(a===S)return this.set(S,this.$y+t);if(a===D)return c(1);if(a===P)return c(7);var l=(e={},e[H]=$,e[j]=w,e[M]=p,e)[a]||1,h=this.$d.getTime()+t*l;return u.w(h,this)},r.subtract=function(t,n){return this.add(-1*t,n)},r.format=function(t){var n=this,e=this.$locale();if(!this.isValid())return e.invalidDate||X;var i=t||"YYYY-MM-DDTHH:mm:ssZ",a=u.z(this),c=this.$H,l=this.$m,h=this.$M,g=e.weekdays,v=e.months,A=e.meridiem,C=function(m,O,I,B){return m&&(m[O]||m(n,i))||I[O].slice(0,B)},E=function(m){return u.s(c%12||12,m,"0")},T=A||function(m,O,I){var B=m<12?"AM":"PM";return I?B.toLowerCase():B};return i.replace(gt,function(m,O){return O||function(I){switch(I){case"YY":return String(n.$y).slice(-2);case"YYYY":return u.s(n.$y,4,"0");case"M":return h+1;case"MM":return u.s(h+1,2,"0");case"MMM":return C(e.monthsShort,h,v,3);case"MMMM":return C(v,h);case"D":return n.$D;case"DD":return u.s(n.$D,2,"0");case"d":return String(n.$W);case"dd":return C(e.weekdaysMin,n.$W,g,2);case"ddd":return C(e.weekdaysShort,n.$W,g,3);case"dddd":return g[n.$W];case"H":return String(c);case"HH":return u.s(c,2,"0");case"h":return E(1);case"hh":return E(2);case"a":return T(c,l,!0);case"A":return T(c,l,!1);case"m":return String(l);case"mm":return u.s(l,2,"0");case"s":return String(n.$s);case"ss":return u.s(n.$s,2,"0");case"SSS":return u.s(n.$ms,3,"0");case"Z":return a}return null}(m)||a.replace(":","")})},r.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},r.diff=function(t,n,e){var i,a=this,c=u.p(n),l=d(t),h=(l.utcOffset()-this.utcOffset())*$,g=this-l,v=function(){return u.m(a,l)};switch(c){case S:i=v()/12;break;case b:i=v();break;case K:i=v()/3;break;case P:i=(g-h)/6048e5;break;case D:i=(g-h)/864e5;break;case j:i=g/w;break;case H:i=g/$;break;case M:i=g/p;break;default:i=g}return e?i:u.a(i)},r.daysInMonth=function(){return this.endOf(b).$D},r.$locale=function(){return Y[this.$L]},r.locale=function(t,n){if(!t)return this.$L;var e=this.clone(),i=U(t,n,!0);return i&&(e.$L=i),e},r.clone=function(){return u.w(this.$d,this)},r.toDate=function(){return new Date(this.valueOf())},r.toJSON=function(){return this.isValid()?this.toISOString():null},r.toISOString=function(){return this.$d.toISOString()},r.toString=function(){return this.$d.toUTCString()},s}(),et=F.prototype;return d.prototype=et,[["$ms",k],["$s",M],["$m",H],["$H",j],["$W",D],["$M",b],["$y",S],["$D",W]].forEach(function(s){et[s[1]]=function(r){return this.$g(r,s[0],s[1])}}),d.extend=function(s,r){return s.$i||(s(r,F,d),s.$i=!0),d},d.locale=U,d.isDayjs=Z,d.unix=function(s){return d(1e3*s)},d.en=Y[L],d.Ls=Y,d.p={},d})})(V);var nt=V.exports;const st=z(nt);var J={exports:{}},f=String,q=function(){return{isColorSupported:!1,reset:f,bold:f,dim:f,italic:f,underline:f,inverse:f,hidden:f,strikethrough:f,black:f,red:f,green:f,yellow:f,blue:f,magenta:f,cyan:f,white:f,gray:f,bgBlack:f,bgRed:f,bgGreen:f,bgYellow:f,bgBlue:f,bgMagenta:f,bgCyan:f,bgWhite:f}};J.exports=q(),J.exports.createColors=q;var it=J.exports;const x=z(it);let G={log:console.log};const at=o=>{G=o},N=(o,y)=>{const p=y?.type||"info",$=`🫡 ${x.bgBlue(" Nixle ")}`,w=`${st().format("DD/MM/YYYY, HH:mm")}`,k=x.dim(`[${p.charAt(0).toUpperCase()}]`),M={info:x.blue,success:x.green,error:x.red,warn:x.yellow};G?.log(`${$} ${w} ${k} ${M[p](o)}`)},ot=(o,y)=>[o,y],ut=o=>o({log:N}),ct=o=>o,Q=o=>{const y=o.startsWith("/")?o:`/${o}`;return y.endsWith("/")?y.slice(0,-1):y},ft=(o,y,p)=>{p({log:N}).forEach($=>{const w=$.method?$.method.toLowerCase():"get",k=Q(y)+Q($.path);o.request(w,k,M=>(M.setHeader("x-powered-by","Nixle"),$.statusCode&&M.setStatusCode($.statusCode),$.handler(M)))})},lt=(o,y)=>{y.forEach(p=>{p.routers.forEach(([$,w])=>{ft(o,$,w)})})},dt=({provider:o,logger:y,...p})=>(y!==void 0&&at(y),N("Starting an application..."),lt(o,p.modules),N("Application successfully started"),o.server),ht=o=>o;return _.createApp=dt,_.createModule=ct,_.createProvider=ht,_.createRouter=ot,_.createService=ut,Object.defineProperty(_,Symbol.toStringTag,{value:"Module"}),_}({});
