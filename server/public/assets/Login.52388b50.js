import{d as b,j as _,aq as V,u as h,a as x,b as y,w as c,ak as u,o as C,G as t,g as a,al as S,ax as k,ay as w,_ as D}from"./index.737d6864.js";const p=e=>(k("data-v-2d4b8265"),e=e(),w(),e),E=p(()=>a("div",{class:"title"},[a("h2",null,"\u6B22\u8FCE\u767B\u5F55")],-1)),I={style:{margin:"30px"}},q=p(()=>a("div",{class:"tip"},"\u53EF\u4F7F\u7528\u8D26\u53F7\uFF1A000001\u3001000002\u30010000003 \u5BC6\u7801\u5747\u4E3A 666666",-1)),A=b({__name:"Login",setup(e){const s=_("000001"),n=_("666666"),i=V(),m=h(),r=x(),v=f=>{i.login({account:s.value,password:n.value}).then(()=>{m.push("/"),r.connect(),r.initData()})};return(f,o)=>{const d=u("van-field"),B=u("van-cell-group"),g=u("van-button"),F=u("van-form");return C(),y(F,{class:"form",onSubmit:v},{default:c(()=>[E,t(B,{inset:""},{default:c(()=>[t(d,{modelValue:s.value,"onUpdate:modelValue":o[0]||(o[0]=l=>s.value=l),name:"\u8D26\u6237",placeholder:"\u8D26\u6237",rules:[{required:!0,message:"\u8BF7\u586B\u5199\u8D26\u6237"}]},null,8,["modelValue"]),t(d,{modelValue:n.value,"onUpdate:modelValue":o[1]||(o[1]=l=>n.value=l),type:"password",name:"\u5BC6\u7801",placeholder:"\u5BC6\u7801",rules:[{required:!0,message:"\u8BF7\u586B\u5199\u5BC6\u7801"}]},null,8,["modelValue"])]),_:1}),a("div",I,[t(g,{round:"",block:"",type:"primary","native-type":"submit"},{default:c(()=>[S(" \u63D0\u4EA4 ")]),_:1})]),q]),_:1})}}});const N=D(A,[["__scopeId","data-v-2d4b8265"]]);export{N as default};
