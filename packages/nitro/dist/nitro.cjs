"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const u=require("h3"),c=require("nixle"),a=c.createProvider(r=>{const e=o=>(d,s)=>r.router[o](d,u.fromNodeMiddleware((i,t)=>(t.setHeader("x-powered-by","Nixle"),s({req:i,res:t,setStatusCode:n=>t.statusCode=n}))));return{methods:{get:e("get"),post:e("post"),patch:e("patch"),put:e("put"),delete:e("delete")},server:r}});exports.nitroProvider=a;