var nitro=function(t,d,n){"use strict";const i=n.createProvider(o=>{const e=u=>(s,a)=>o.router[u](s,d.fromNodeMiddleware((c,r)=>(r.setHeader("x-powered-by","Nixle"),a({req:c,res:r,setStatusCode:l=>r.statusCode=l}))));return{methods:{get:e("get"),post:e("post"),patch:e("patch"),put:e("put"),delete:e("delete")},server:o}});return t.nitroProvider=i,Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),t}({},h3,nixle);