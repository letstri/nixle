var scalex=function(_){"use strict";var we=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Oe(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ae={exports:{}};(function(e,t){(function(r,n){e.exports=n()})(we,function(){var r=1e3,n=6e4,i=36e5,d="millisecond",g="second",h="minute",D="hour",A="day",J="week",O="month",ve="quarter",T="year",Y="date",Me="Invalid Date",it=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,ut=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,ct={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(c){var a=["th","st","nd","rd"],s=c%100;return"["+c+(a[(s-20)%10]||a[s]||a[0])+"]"}},se=function(c,a,s){var u=String(c);return!u||u.length>=a?c:""+Array(a+1-u.length).join(s)+c},lt={s:se,z:function(c){var a=-c.utcOffset(),s=Math.abs(a),u=Math.floor(s/60),o=s%60;return(a<=0?"+":"-")+se(u,2,"0")+":"+se(o,2,"0")},m:function c(a,s){if(a.date()<s.date())return-c(s,a);var u=12*(s.year()-a.year())+(s.month()-a.month()),o=a.clone().add(u,O),l=s-o<0,f=a.clone().add(u+(l?-1:1),O);return+(-(u+(s-o)/(l?o-f:f-o))||0)},a:function(c){return c<0?Math.ceil(c)||0:Math.floor(c)},p:function(c){return{M:O,y:T,w:J,d:A,D:Y,h:D,m:h,s:g,ms:d,Q:ve}[c]||String(c||"").toLowerCase().replace(/s$/,"")},u:function(c){return c===void 0}},F="en",P={};P[F]=ct;var pe="$isDayjsObject",oe=function(c){return c instanceof X||!(!c||!c[pe])},V=function c(a,s,u){var o;if(!a)return F;if(typeof a=="string"){var l=a.toLowerCase();P[l]&&(o=l),s&&(P[l]=s,o=l);var f=a.split("-");if(!o&&f.length>1)return c(f[0])}else{var y=a.name;P[y]=a,o=y}return!u&&o&&(F=o),o||!u&&F},v=function(c,a){if(oe(c))return c.clone();var s=typeof a=="object"?a:{};return s.date=c,s.args=arguments,new X(s)},b=lt;b.l=V,b.i=oe,b.w=function(c,a){return v(c,{locale:a.$L,utc:a.$u,x:a.$x,$offset:a.$offset})};var X=function(){function c(s){this.$L=V(s.locale,null,!0),this.parse(s),this.$x=this.$x||s.x||{},this[pe]=!0}var a=c.prototype;return a.parse=function(s){this.$d=function(u){var o=u.date,l=u.utc;if(o===null)return new Date(NaN);if(b.u(o))return new Date;if(o instanceof Date)return new Date(o);if(typeof o=="string"&&!/Z$/i.test(o)){var f=o.match(it);if(f){var y=f[2]-1||0,$=(f[7]||"0").substring(0,3);return l?new Date(Date.UTC(f[1],y,f[3]||1,f[4]||0,f[5]||0,f[6]||0,$)):new Date(f[1],y,f[3]||1,f[4]||0,f[5]||0,f[6]||0,$)}}return new Date(o)}(s),this.init()},a.init=function(){var s=this.$d;this.$y=s.getFullYear(),this.$M=s.getMonth(),this.$D=s.getDate(),this.$W=s.getDay(),this.$H=s.getHours(),this.$m=s.getMinutes(),this.$s=s.getSeconds(),this.$ms=s.getMilliseconds()},a.$utils=function(){return b},a.isValid=function(){return this.$d.toString()!==Me},a.isSame=function(s,u){var o=v(s);return this.startOf(u)<=o&&o<=this.endOf(u)},a.isAfter=function(s,u){return v(s)<this.startOf(u)},a.isBefore=function(s,u){return this.endOf(u)<v(s)},a.$g=function(s,u,o){return b.u(s)?this[u]:this.set(o,s)},a.unix=function(){return Math.floor(this.valueOf()/1e3)},a.valueOf=function(){return this.$d.getTime()},a.startOf=function(s,u){var o=this,l=!!b.u(u)||u,f=b.p(s),y=function(x,S){var B=b.w(o.$u?Date.UTC(o.$y,S,x):new Date(o.$y,S,x),o);return l?B:B.endOf(A)},$=function(x,S){return b.w(o.toDate()[x].apply(o.toDate("s"),(l?[0,0,0,0]:[23,59,59,999]).slice(S)),o)},M=this.$W,p=this.$M,w=this.$D,H="set"+(this.$u?"UTC":"");switch(f){case T:return l?y(1,0):y(31,11);case O:return l?y(1,p):y(0,p+1);case J:var k=this.$locale().weekStart||0,W=(M<k?M+7:M)-k;return y(l?w-W:w+(6-W),p);case A:case Y:return $(H+"Hours",0);case D:return $(H+"Minutes",1);case h:return $(H+"Seconds",2);case g:return $(H+"Milliseconds",3);default:return this.clone()}},a.endOf=function(s){return this.startOf(s,!1)},a.$set=function(s,u){var o,l=b.p(s),f="set"+(this.$u?"UTC":""),y=(o={},o[A]=f+"Date",o[Y]=f+"Date",o[O]=f+"Month",o[T]=f+"FullYear",o[D]=f+"Hours",o[h]=f+"Minutes",o[g]=f+"Seconds",o[d]=f+"Milliseconds",o)[l],$=l===A?this.$D+(u-this.$W):u;if(l===O||l===T){var M=this.clone().set(Y,1);M.$d[y]($),M.init(),this.$d=M.set(Y,Math.min(this.$D,M.daysInMonth())).$d}else y&&this.$d[y]($);return this.init(),this},a.set=function(s,u){return this.clone().$set(s,u)},a.get=function(s){return this[b.p(s)]()},a.add=function(s,u){var o,l=this;s=Number(s);var f=b.p(u),y=function(p){var w=v(l);return b.w(w.date(w.date()+Math.round(p*s)),l)};if(f===O)return this.set(O,this.$M+s);if(f===T)return this.set(T,this.$y+s);if(f===A)return y(1);if(f===J)return y(7);var $=(o={},o[h]=n,o[D]=i,o[g]=r,o)[f]||1,M=this.$d.getTime()+s*$;return b.w(M,this)},a.subtract=function(s,u){return this.add(-1*s,u)},a.format=function(s){var u=this,o=this.$locale();if(!this.isValid())return o.invalidDate||Me;var l=s||"YYYY-MM-DDTHH:mm:ssZ",f=b.z(this),y=this.$H,$=this.$m,M=this.$M,p=o.weekdays,w=o.months,H=o.meridiem,k=function(S,B,z,Z){return S&&(S[B]||S(u,l))||z[B].slice(0,Z)},W=function(S){return b.s(y%12||12,S,"0")},x=H||function(S,B,z){var Z=S<12?"AM":"PM";return z?Z.toLowerCase():Z};return l.replace(ut,function(S,B){return B||function(z){switch(z){case"YY":return String(u.$y).slice(-2);case"YYYY":return b.s(u.$y,4,"0");case"M":return M+1;case"MM":return b.s(M+1,2,"0");case"MMM":return k(o.monthsShort,M,w,3);case"MMMM":return k(w,M);case"D":return u.$D;case"DD":return b.s(u.$D,2,"0");case"d":return String(u.$W);case"dd":return k(o.weekdaysMin,u.$W,p,2);case"ddd":return k(o.weekdaysShort,u.$W,p,3);case"dddd":return p[u.$W];case"H":return String(y);case"HH":return b.s(y,2,"0");case"h":return W(1);case"hh":return W(2);case"a":return x(y,$,!0);case"A":return x(y,$,!1);case"m":return String($);case"mm":return b.s($,2,"0");case"s":return String(u.$s);case"ss":return b.s(u.$s,2,"0");case"SSS":return b.s(u.$ms,3,"0");case"Z":return f}return null}(S)||f.replace(":","")})},a.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},a.diff=function(s,u,o){var l,f=this,y=b.p(u),$=v(s),M=($.utcOffset()-this.utcOffset())*n,p=this-$,w=function(){return b.m(f,$)};switch(y){case T:l=w()/12;break;case O:l=w();break;case ve:l=w()/3;break;case J:l=(p-M)/6048e5;break;case A:l=(p-M)/864e5;break;case D:l=p/i;break;case h:l=p/n;break;case g:l=p/r;break;default:l=p}return o?l:b.a(l)},a.daysInMonth=function(){return this.endOf(O).$D},a.$locale=function(){return P[this.$L]},a.locale=function(s,u){if(!s)return this.$L;var o=this.clone(),l=V(s,u,!0);return l&&(o.$L=l),o},a.clone=function(){return b.w(this.$d,this)},a.toDate=function(){return new Date(this.valueOf())},a.toJSON=function(){return this.isValid()?this.toISOString():null},a.toISOString=function(){return this.$d.toISOString()},a.toString=function(){return this.$d.toUTCString()},c}(),Se=X.prototype;return v.prototype=Se,[["$ms",d],["$s",g],["$m",h],["$H",D],["$W",A],["$M",O],["$y",T],["$D",Y]].forEach(function(c){Se[c[1]]=function(a){return this.$g(a,c[0],c[1])}}),v.extend=function(c,a){return c.$i||(c(a,X,v),c.$i=!0),v},v.locale=V,v.isDayjs=oe,v.unix=function(c){return v(1e3*c)},v.en=P[F],v.Ls=P,v.p={},v})})(ae);var _e=ae.exports;const Ce=Oe(_e),K=10,ie=(e=0)=>t=>`\x1B[${t+e}m`,ue=(e=0)=>t=>`\x1B[${38+e};5;${t}m`,ce=(e=0)=>(t,r,n)=>`\x1B[${38+e};2;${t};${r};${n}m`,m={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};Object.keys(m.modifier);const De=Object.keys(m.color),Ae=Object.keys(m.bgColor);[...De,...Ae];function Te(){const e=new Map;for(const[t,r]of Object.entries(m)){for(const[n,i]of Object.entries(r))m[n]={open:`\x1B[${i[0]}m`,close:`\x1B[${i[1]}m`},r[n]=m[n],e.set(i[0],i[1]);Object.defineProperty(m,t,{value:r,enumerable:!1})}return Object.defineProperty(m,"codes",{value:e,enumerable:!1}),m.color.close="\x1B[39m",m.bgColor.close="\x1B[49m",m.color.ansi=ie(),m.color.ansi256=ue(),m.color.ansi16m=ce(),m.bgColor.ansi=ie(K),m.bgColor.ansi256=ue(K),m.bgColor.ansi16m=ce(K),Object.defineProperties(m,{rgbToAnsi256:{value(t,r,n){return t===r&&r===n?t<8?16:t>248?231:Math.round((t-8)/247*24)+232:16+36*Math.round(t/255*5)+6*Math.round(r/255*5)+Math.round(n/255*5)},enumerable:!1},hexToRgb:{value(t){const r=/[a-f\d]{6}|[a-f\d]{3}/i.exec(t.toString(16));if(!r)return[0,0,0];let[n]=r;n.length===3&&(n=[...n].map(d=>d+d).join(""));const i=Number.parseInt(n,16);return[i>>16&255,i>>8&255,i&255]},enumerable:!1},hexToAnsi256:{value:t=>m.rgbToAnsi256(...m.hexToRgb(t)),enumerable:!1},ansi256ToAnsi:{value(t){if(t<8)return 30+t;if(t<16)return 90+(t-8);let r,n,i;if(t>=232)r=((t-232)*10+8)/255,n=r,i=r;else{t-=16;const h=t%36;r=Math.floor(t/36)/5,n=Math.floor(h/6)/5,i=h%6/5}const d=Math.max(r,n,i)*2;if(d===0)return 30;let g=30+(Math.round(i)<<2|Math.round(n)<<1|Math.round(r));return d===2&&(g+=60),g},enumerable:!1},rgbToAnsi:{value:(t,r,n)=>m.ansi256ToAnsi(m.rgbToAnsi256(t,r,n)),enumerable:!1},hexToAnsi:{value:t=>m.ansi256ToAnsi(m.hexToAnsi256(t)),enumerable:!1}}),m}const C=Te(),U=(()=>{if(navigator.userAgentData){const e=navigator.userAgentData.brands.find(({brand:t})=>t==="Chromium");if(e&&e.version>93)return 3}return/\b(Chrome|Chromium)\//.test(navigator.userAgent)?1:0})(),le=U!==0&&{level:U,hasBasic:!0,has256:U>=2,has16m:U>=3},Be={stdout:le,stderr:le};function je(e,t,r){let n=e.indexOf(t);if(n===-1)return e;const i=t.length;let d=0,g="";do g+=e.slice(d,n)+t+r,d=n+i,n=e.indexOf(t,d);while(n!==-1);return g+=e.slice(d),g}function Pe(e,t,r,n){let i=0,d="";do{const g=e[n-1]==="\r";d+=e.slice(i,g?n-1:n)+t+(g?`\r
`:`
`)+r,i=n+1,n=e.indexOf(`
`,i)}while(n!==-1);return d+=e.slice(i),d}const{stdout:fe,stderr:de}=Be,Q=Symbol("GENERATOR"),R=Symbol("STYLER"),N=Symbol("IS_EMPTY"),he=["ansi","ansi","ansi256","ansi16m"],E=Object.create(null),ke=(e,t={})=>{if(t.level&&!(Number.isInteger(t.level)&&t.level>=0&&t.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");const r=fe?fe.level:0;e.level=t.level===void 0?r:t.level},xe=e=>{const t=(...r)=>r.join(" ");return ke(t,e),Object.setPrototypeOf(t,L.prototype),t};function L(e){return xe(e)}Object.setPrototypeOf(L.prototype,Function.prototype);for(const[e,t]of Object.entries(C))E[e]={get(){const r=q(this,te(t.open,t.close,this[R]),this[N]);return Object.defineProperty(this,e,{value:r}),r}};E.visible={get(){const e=q(this,this[R],!0);return Object.defineProperty(this,"visible",{value:e}),e}};const ee=(e,t,r,...n)=>e==="rgb"?t==="ansi16m"?C[r].ansi16m(...n):t==="ansi256"?C[r].ansi256(C.rgbToAnsi256(...n)):C[r].ansi(C.rgbToAnsi(...n)):e==="hex"?ee("rgb",t,r,...C.hexToRgb(...n)):C[r][e](...n),Re=["rgb","hex","ansi256"];for(const e of Re){E[e]={get(){const{level:r}=this;return function(...n){const i=te(ee(e,he[r],"color",...n),C.color.close,this[R]);return q(this,i,this[N])}}};const t="bg"+e[0].toUpperCase()+e.slice(1);E[t]={get(){const{level:r}=this;return function(...n){const i=te(ee(e,he[r],"bgColor",...n),C.bgColor.close,this[R]);return q(this,i,this[N])}}}}const Ee=Object.defineProperties(()=>{},{...E,level:{enumerable:!0,get(){return this[Q].level},set(e){this[Q].level=e}}}),te=(e,t,r)=>{let n,i;return r===void 0?(n=e,i=t):(n=r.openAll+e,i=t+r.closeAll),{open:e,close:t,openAll:n,closeAll:i,parent:r}},q=(e,t,r)=>{const n=(...i)=>Ie(n,i.length===1?""+i[0]:i.join(" "));return Object.setPrototypeOf(n,Ee),n[Q]=e,n[R]=t,n[N]=r,n},Ie=(e,t)=>{if(e.level<=0||!t)return e[N]?"":t;let r=e[R];if(r===void 0)return t;const{openAll:n,closeAll:i}=r;if(t.includes("\x1B"))for(;r!==void 0;)t=je(t,r.close,r.open),r=r.parent;const d=t.indexOf(`
`);return d!==-1&&(t=Pe(t,i,n,d)),n+t+i};Object.defineProperties(L.prototype,E);const Ye=L();L({level:de?de.level:0});const I=Ye;let ge={log:console.log};const He=e=>{ge=e},G=(e,t)=>{const r=t?.type||"info",n=`🫡 ${I.bgBlue(" ScaleX ")}`,i=`${Ce().format("DD/MM/YYYY, HH:mm")}`,d=I.dim(`[${r.toUpperCase()}]`),g={info:I.blue,success:I.green,error:I.red,warn:I.yellow};ge?.log(`${n} ${i} ${d} ${g[r](e)}`)},Ne=(e,t)=>[e,t],Le=e=>e({log:G}),Fe=e=>e,be=e=>{const t=e.startsWith("/")?e:`/${e}`;return t.endsWith("/")?t.slice(0,-1):t},We=(e,t,r)=>{r({log:G}).forEach(n=>{const i=n.method?n.method.toLowerCase():"get",d=e.methods[i],g=be(t)+be(n.path);d(g,h=>(n.statusCode&&h.setStatusCode(n.statusCode),n.handler(h)))})},ze=(e,t)=>{t.forEach(r=>{r.routers.forEach(([n,i])=>{We(e,n,i)})})},Ue=(e,{logger:t,...r})=>(t&&He(t),G("Starting an application..."),ze(e,r.modules),G("Application successfully started"),e.server);function ye(e,t){try{return t in e}catch{return!1}}var qe=Object.defineProperty,Ge=(e,t,r)=>t in e?qe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,j=(e,t,r)=>(Ge(e,typeof t!="symbol"?t+"":t,r),r);class re extends Error{constructor(t,r={}){super(t,r),j(this,"statusCode",500),j(this,"fatal",!1),j(this,"unhandled",!1),j(this,"statusMessage"),j(this,"data"),j(this,"cause"),r.cause&&!this.cause&&(this.cause=r.cause)}toJSON(){const t={message:this.message,statusCode:ne(this.statusCode,500)};return this.statusMessage&&(t.statusMessage=me(this.statusMessage)),this.data!==void 0&&(t.data=this.data),t}}j(re,"__h3_error__",!0);function Je(e){if(typeof e=="string")return new re(e);if(Ve(e))return e;const t=new re(e.message??e.statusMessage??"",{cause:e.cause||e});if(ye(e,"stack"))try{Object.defineProperty(t,"stack",{get(){return e.stack}})}catch{try{t.stack=e.stack}catch{}}if(e.data&&(t.data=e.data),e.statusCode?t.statusCode=ne(e.statusCode,t.statusCode):e.status&&(t.statusCode=ne(e.status,t.statusCode)),e.statusMessage?t.statusMessage=e.statusMessage:e.statusText&&(t.statusMessage=e.statusText),t.statusMessage){const r=t.statusMessage;me(t.statusMessage)!==r&&console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.")}return e.fatal!==void 0&&(t.fatal=e.fatal),e.unhandled!==void 0&&(t.unhandled=e.unhandled),t}function Ve(e){return e?.constructor?.__h3_error__===!0}const Xe=/[^\u0009\u0020-\u007E]/g;function me(e=""){return e.replace(Xe,"")}function ne(e,t=200){return!e||(typeof e=="string"&&(e=Number.parseInt(e,10)),e<100||e>999)?t:e}typeof setImmediate>"u"||setImmediate;function Ze(e){if(typeof e=="function")return Object.assign(e,{__is_handler__:!0});const t={onRequest:$e(e.onRequest),onBeforeResponse:$e(e.onBeforeResponse)};return Object.assign(n=>Ke(n,e.handler,t),{__is_handler__:!0})}function $e(e){return e?Array.isArray(e)?e:[e]:void 0}async function Ke(e,t,r){if(r.onRequest){for(const d of r.onRequest)if(await d(e),e.handled)return}const i={body:await t(e)};if(r.onBeforeResponse)for(const d of r.onBeforeResponse)await d(e,i);return i.body}const Qe=Ze;function et(e){return ye(e,"__is_handler__")}function tt(e){if(et(e))return e;if(typeof e!="function")throw new TypeError("Invalid handler. It should be a function:",e);return Qe(t=>rt(e,t.node.req,t.node.res))}function rt(e,t,r){const n=e.length>2;return new Promise((i,d)=>{const g=h=>(n&&(r.off("close",g),r.off("error",g)),h?d(Je(h)):i(void 0));try{const h=e(t,r,g);n&&h===void 0?(r.once("close",g),r.once("error",g)):i(h)}catch(h){g(h)}})}const nt=e=>{const t=n=>(i,d)=>e.router[n](i,tt((g,h)=>(h.setHeader("x-powered-by","ScaleX"),d({req:g,res:h,setStatusCode:D=>h.statusCode=D}))));return{methods:{get:t("get"),post:t("post"),patch:t("patch"),put:t("put"),delete:t("delete")},server:e}},st=e=>{const t=n=>(i,d)=>e[n](i,async(g,h)=>{h.setHeader("x-powered-by","ScaleX"),h.send(await d({req:g,res:h,setStatusCode:h.status}))});return{methods:{get:t("get"),post:t("post"),patch:t("patch"),put:t("put"),delete:t("delete")},server:e}},ot=e=>{const t=n=>(i,d)=>e[n](i,async(g,h)=>{h.header("x-powered-by","ScaleX"),h.send(await d({req:g,res:h,setStatusCode:h.status}))});return{methods:{get:t("get"),post:t("post"),patch:t("patch"),put:t("put"),delete:t("delete")},server:e}},at=e=>{const t=n=>(i,d)=>e[n](i,({request:g,set:h})=>(h.headers["x-powered-by"]="ScaleX",d({req:g,res:null,setStatusCode:D=>h.status=D})));return{methods:{get:t("get"),post:t("post"),patch:t("patch"),put:t("put"),delete:t("delete")},server:e}};return _.createApp=Ue,_.createModule=Fe,_.createRouter=Ne,_.createService=Le,_.elysiaProvider=at,_.expressProvider=st,_.fastifyProvider=ot,_.nitroProvider=nt,Object.defineProperty(_,Symbol.toStringTag,{value:"Module"}),_}({});
