import{P as i}from"./Page.1c2e989b.js";import{d,a as p,z as f,h as m,m as r,p as g,g as e,k as t,t as c,l as v,s as h,n as x,_ as k}from"./index.b826352e.js";const b={class:"card"},B=["src"],C={class:"nickname"},I=d({__name:"Me",setup(y){const s=p(),_=f(),u=()=>{s.logout().then(()=>{_.push("/login")})};return(M,N)=>{const l=x("van-button");return g(),m(i,{tabBarProps:{activeIndex:2}},{default:r(()=>{var o,a,n;return[e("div",b,[e("img",{src:(o=t(s).userInfo)==null?void 0:o.avatar,alt:""},null,8,B),e("div",C,[e("span",null,c((a=t(s).userInfo)==null?void 0:a.nickname),1),e("span",null,"("+c((n=t(s).userInfo)==null?void 0:n.id)+")",1)]),v(l,{onClick:u,size:"small",class:"login-out",color:"linear-gradient(to right, #ff6034, #ee0a24)"},{default:r(()=>[h(" \u6CE8\u9500\u767B\u5F55 ")]),_:1})])]}),_:1})}}});const V=k(I,[["__scopeId","data-v-41998cb4"]]);export{V as default};
