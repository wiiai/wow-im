import{d,o as l,g as n,h as o,F as u,l as p,m,i as a,k as h,t as _,_ as k,H as v,u as f,j as x,y as g,x as C}from"./index.466a04c4.js";import{u as y,T as F}from"./index.5fb92392.js";const S={class:"list"},B=["onClick"],N={class:"avatar"},I=["src"],V={class:"main"},$={class:"name"},L={key:0},T=d({__name:"index",props:["clickItem"],setup(r){const c=r,s=y();return l(()=>{s.list.length||s.queryFriend()}),(i,t)=>(n(),o("div",S,[(n(!0),o(u,null,p(m(s).list,e=>(n(),o("div",{class:"item",onClick:j=>c.clickItem(e)},[a("div",N,[a("img",{src:e.avatar,alt:""},null,8,I)]),a("div",V,[a("div",$,[e.is_group?(n(),o("span",L,"[\u7FA4]")):h("",!0),a("span",null,_(e.nickname)+"("+_(e.id)+")",1)])])],8,B))),256))]))}});const b=k(T,[["__scopeId","data-v-a0a55a88"]]),D=d({__name:"index",setup(r){const c=v(),s=f(),i=t=>{s.setCurrentChat({rid:`${t.id}`,nickname:t.nickname,avatar:t.avatar,is_group:Number(!1)}),c.push("/")};return(t,e)=>(n(),x(F,null,{nav:g(()=>[C(b,{"click-item":i})]),_:1}))}});export{D as default};
