import{d as l,u,b as o,aB as _,o as d,aC as r,X as i,h as p,n as v,v as x,i as m,g as y,_ as f}from"./index.06234f14.js";const k=l({__name:"index",setup(B){const s=u(),e=o("hello");o("");const a=_();return d(()=>{r.on("async",t=>{console.log("async",t),e.value=t.data.content})}),i(e,t=>{s.async(a.query.room_id,{content:e.value})}),(t,n)=>(y(),p("div",null,[v(m("input",{class:"input",type:"text","onUpdate:modelValue":n[0]||(n[0]=c=>e.value=c)},null,512),[[x,e.value]])]))}});const h=f(k,[["__scopeId","data-v-0157e011"]]);export{h as default};
