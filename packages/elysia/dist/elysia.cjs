"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const v=require("nixle"),n=v.createProvider(s=>({server:s,request:(a,d,o)=>s[a](d,({request:l,set:r,cookie:i})=>o({req:l,res:r,setStatusCode:e=>r.status=e,setHeader:(e,t)=>r.headers[e]=t,setCookie:(e,t,u)=>{u&&i[e].set(u),i[e].value=t}}))}));exports.elysiaProvider=n;