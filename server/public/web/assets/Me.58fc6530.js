import{b as C,E as Ze,G as ee,H as ye,I as Ue,J as je,K as Ke,L as qe,M as ke,N as E,d as R,O as we,P as Se,e as T,Q as Te,R as Ce,S as Ie,U as N,V as Be,m as u,W as B,X as Re,Y as L,Z as $e,$ as F,a0 as q,a1 as M,a2 as te,a3 as Xe,a4 as G,o as Ye,a5 as le,a6 as Ge,a7 as pe,a8 as Je,a9 as Qe,aa as et,ab as tt,ac as z,ad as fe,ae as nt,af as at,ag as ve,ah as ot,ai as lt,aj as it,ak as st,al as rt,am as ct,an as dt,ao as ut,ap as ft,aq as vt,ar as ht,as as bt,at as gt,au as mt,av as he,aw as _t,ax as ne,D as ie,u as xt,_ as Pe,g as U,n as j,q as ae,f as O,F as be,k as yt,i as ge,p as oe,t as K,a as kt,h as D,l as J}from"./index.d7bf5f63.js";function wt(){const e=C([]),n=[];return Ze(()=>{e.value=[]}),[e,s=>(n[s]||(n[s]=a=>{e.value[s]=a}),n[s])]}function St(e,n,l){let s=0;const a=e.scrollLeft,o=l===0?1:Math.round(l*1e3/16);function c(){e.scrollLeft+=(n-a)/o,++s<o&&ee(c)}c()}function Tt(e,n,l,s){let a=ye(e);const o=a<n,c=l===0?1:Math.round(l*1e3/16),h=(n-a)/c;function i(){a+=h,(o&&a>n||!o&&a<n)&&(a=n),Ue(e,a),o&&a<n||!o&&a>n?ee(i):s&&ee(s)}i()}function Ct(e,n){if(!je||!window.IntersectionObserver)return;const l=new IntersectionObserver(o=>{n(o[0].intersectionRatio>0)},{root:document.body}),s=()=>{e.value&&l.observe(e.value)},a=()=>{e.value&&l.unobserve(e.value)};Ke(a),qe(a),ke(s)}const[It,Bt]=E("sticky"),Rt={zIndex:B,position:Re("top"),container:Object,offsetTop:L(0),offsetBottom:L(0)};var $t=R({name:It,props:Rt,emits:["scroll","change"],setup(e,{emit:n,slots:l}){const s=C(),a=we(s),o=Se({fixed:!1,width:0,height:0,transform:0}),c=T(()=>Te(e.position==="top"?e.offsetTop:e.offsetBottom)),h=T(()=>{const{fixed:f,height:y,width:k}=o;if(f)return{width:`${k}px`,height:`${y}px`}}),i=T(()=>{if(!o.fixed)return;const f=Ce(Ie(e.zIndex),{width:`${o.width}px`,height:`${o.height}px`,[e.position]:`${c.value}px`});return o.transform&&(f.transform=`translate3d(0, ${o.transform}px, 0)`),f}),m=f=>n("scroll",{scrollTop:f,isFixed:o.fixed}),b=()=>{if(!s.value||$e(s))return;const{container:f,position:y}=e,k=F(s),g=ye(window);if(o.width=k.width,o.height=k.height,y==="top")if(f){const w=F(f),d=w.bottom-c.value-o.height;o.fixed=c.value>k.top&&w.bottom>0,o.transform=d<0?d:0}else o.fixed=c.value>k.top;else{const{clientHeight:w}=document.documentElement;if(f){const d=F(f),$=w-d.top-c.value-o.height;o.fixed=w-c.value<k.bottom&&w>d.top,o.transform=$<0?-$:0}else o.fixed=w-c.value<k.bottom}m(g)};return N(()=>o.fixed,f=>n("change",f)),Be("scroll",b,{target:a,passive:!0}),Ct(s,b),()=>{var f;return u("div",{ref:s,style:h.value},[u("div",{class:Bt({fixed:o.fixed}),style:i.value},[(f=l.default)==null?void 0:f.call(l)])])}}});const pt=q($t),[Pt,me]=E("tab");var At=R({name:Pt,props:{id:String,dot:Boolean,type:String,color:String,title:String,badge:B,shrink:Boolean,isActive:Boolean,disabled:Boolean,controls:String,scrollable:Boolean,activeColor:String,inactiveColor:String,showZeroBadge:M},setup(e,{slots:n}){const l=T(()=>{const a={},{type:o,color:c,disabled:h,isActive:i,activeColor:m,inactiveColor:b}=e;c&&o==="card"&&(a.borderColor=c,h||(i?a.backgroundColor=c:a.color=c));const y=i?m:b;return y&&(a.color=y),a}),s=()=>{const a=u("span",{class:me("text",{ellipsis:!e.scrollable})},[n.title?n.title():e.title]);return e.dot||te(e.badge)&&e.badge!==""?u(Xe,{dot:e.dot,content:e.badge,showZero:e.showZeroBadge},{default:()=>[a]}):a};return()=>u("div",{id:e.id,role:"tab",class:[me([e.type,{grow:e.scrollable&&!e.shrink,shrink:e.shrink,active:e.isActive,disabled:e.disabled}])],style:l.value,tabindex:e.disabled?void 0:e.isActive?0:-1,"aria-selected":e.isActive,"aria-disabled":e.disabled||void 0,"aria-controls":e.controls},[s()])}});const[Nt,_e]=E("tabs");var zt=R({name:Nt,props:{count:G(Number),inited:Boolean,animated:Boolean,duration:G(B),swipeable:Boolean,lazyRender:Boolean,currentIndex:G(Number)},emits:["change"],setup(e,{emit:n,slots:l}){const s=C(),a=h=>n("change",h),o=()=>{var h;const i=(h=l.default)==null?void 0:h.call(l);return e.animated||e.swipeable?u(Ge,{ref:s,loop:!1,class:_e("track"),duration:+e.duration*1e3,touchable:e.swipeable,lazyRender:e.lazyRender,showIndicators:!1,onChange:a},{default:()=>[i]}):i},c=h=>{const i=s.value;i&&i.state.active!==h&&i.swipeTo(h,{immediate:!e.inited})};return N(()=>e.currentIndex,c),Ye(()=>{c(e.currentIndex)}),le({swipeRef:s}),()=>u("div",{class:_e("content",{animated:e.animated||e.swipeable})},[o()])}});const[Ae,Z]=E("tabs"),Ot={type:Re("line"),color:String,border:Boolean,sticky:Boolean,shrink:Boolean,active:L(0),duration:L(.3),animated:Boolean,ellipsis:M,swipeable:Boolean,scrollspy:Boolean,offsetTop:L(0),background:String,lazyRender:M,lineWidth:B,lineHeight:B,beforeChange:Function,swipeThreshold:L(5),titleActiveColor:String,titleInactiveColor:String},Ne=Symbol(Ae);var Lt=R({name:Ae,props:Ot,emits:["click","change","scroll","disabled","rendered","click-tab","update:active"],setup(e,{emit:n,slots:l}){let s,a,o;const c=C(),h=C(),i=C(),m=C(),b=pe(),f=we(c),[y,k]=wt(),{children:g,linkChildren:w}=Je(Ne),d=Se({inited:!1,position:"",lineStyle:{},currentIndex:-1}),$=T(()=>g.length>e.swipeThreshold||!e.ellipsis||e.shrink),X=T(()=>({borderColor:e.color,background:e.background})),p=(t,r)=>{var v;return(v=t.name)!=null?v:r},se=T(()=>{const t=g[d.currentIndex];if(t)return p(t,d.currentIndex)}),Y=T(()=>Te(e.offsetTop)),re=T(()=>e.sticky?Y.value+s:0),H=t=>{const r=h.value,v=y.value;if(!$.value||!r||!v||!v[d.currentIndex])return;const _=v[d.currentIndex].$el,x=_.offsetLeft-(r.offsetWidth-_.offsetWidth)/2;St(r,x,t?0:+e.duration)},P=()=>{const t=d.inited;z(()=>{const r=y.value;if(!r||!r[d.currentIndex]||e.type!=="line"||$e(c.value))return;const v=r[d.currentIndex].$el,{lineWidth:_,lineHeight:x}=e,S=v.offsetLeft+v.offsetWidth/2,A={width:fe(_),backgroundColor:e.color,transform:`translateX(${S}px) translateX(-50%)`};if(t&&(A.transitionDuration=`${e.duration}s`),te(x)){const ue=fe(x);A.height=ue,A.borderRadius=ue}d.lineStyle=A})},ze=t=>{const r=t<d.currentIndex?-1:1;for(;t>=0&&t<g.length;){if(!g[t].disabled)return t;t+=r}},V=(t,r)=>{const v=ze(t);if(!te(v))return;const _=g[v],x=p(_,v),S=d.currentIndex!==null;d.currentIndex!==v&&(d.currentIndex=v,r||H(),P()),x!==e.active&&(n("update:active",x),S&&n("change",x,_.title)),o&&!e.scrollspy&&at(Math.ceil(ve(c.value)-Y.value))},W=(t,r)=>{const v=g.find((x,S)=>p(x,S)===t),_=v?g.indexOf(v):0;V(_,r)},ce=(t=!1)=>{if(e.scrollspy){const r=g[d.currentIndex].$el;if(r&&f.value){const v=ve(r,f.value)-re.value;a=!0,Tt(f.value,v,t?0:+e.duration,()=>{a=!1})}}},Oe=(t,r,v)=>{const{title:_,disabled:x}=g[r],S=p(g[r],r);x?n("disabled",S,_):(it(e.beforeChange,{args:[S],done:()=>{V(r),ce()}}),n("click",S,_),st(t)),n("click-tab",{name:S,title:_,event:v,disabled:x})},Le=t=>{o=t.isFixed,n("scroll",t)},Ee=t=>{z(()=>{W(t),ce(!0)})},De=()=>{for(let t=0;t<g.length;t++){const{top:r}=F(g[t].$el);if(r>re.value)return t===0?0:t-1}return g.length-1},Fe=()=>{if(e.scrollspy&&!a){const t=De();V(t)}},Me=()=>g.map((t,r)=>u(At,ot({key:t.id,id:`${b}-${r}`,ref:k(r),type:e.type,color:e.color,style:t.titleStyle,class:t.titleClass,shrink:e.shrink,isActive:r===d.currentIndex,controls:t.id,scrollable:$.value,activeColor:e.titleActiveColor,inactiveColor:e.titleInactiveColor,onClick:v=>Oe(t,r,v)},lt(t,["dot","badge","title","disabled","showZeroBadge"])),{title:t.$slots.title})),He=()=>{if(e.type==="line"&&g.length)return u("div",{class:Z("line"),style:d.lineStyle},null)},de=()=>{var t,r,v;const{type:_,border:x,sticky:S}=e,A=[u("div",{ref:S?void 0:i,class:[Z("wrap"),{[nt]:_==="line"&&x}]},[u("div",{ref:h,role:"tablist",class:Z("nav",[_,{shrink:e.shrink,complete:$.value}]),style:X.value,"aria-orientation":"horizontal"},[(t=l["nav-left"])==null?void 0:t.call(l),Me(),He(),(r=l["nav-right"])==null?void 0:r.call(l)])]),(v=l["nav-bottom"])==null?void 0:v.call(l)];return S?u("div",{ref:i},[A]):A};N([()=>e.color,Qe],P),N(()=>e.active,t=>{t!==se.value&&W(t)}),N(()=>g.length,()=>{d.inited&&(W(e.active),P(),z(()=>{H(!0)}))});const Ve=()=>{W(e.active,!0),z(()=>{d.inited=!0,i.value&&(s=F(i.value).height),H(!0)})},We=(t,r)=>n("rendered",t,r);return le({resize:()=>{P(),z(()=>{var t,r;return(r=(t=m.value)==null?void 0:t.swipeRef.value)==null?void 0:r.resize()})},scrollTo:Ee}),et(P),tt(P),ke(Ve),Be("scroll",Fe,{target:f,passive:!0}),w({id:b,props:e,setLine:P,onRendered:We,currentName:se,scrollIntoView:H}),()=>u("div",{ref:c,class:Z([e.type])},[e.sticky?u(pt,{container:c.value,offsetTop:Y.value,onScroll:Le},{default:()=>[de()]}):de(),u(zt,{ref:m,count:g.length,inited:d.inited,animated:e.animated,duration:e.duration,swipeable:e.swipeable,lazyRender:e.lazyRender,currentIndex:d.currentIndex,onChange:V},{default:()=>{var t;return[(t=l.default)==null?void 0:t.call(l)]}})])}});const[Et,Q]=E("tab"),Dt=Ce({},rt,{dot:Boolean,name:B,badge:B,title:String,disabled:Boolean,titleClass:ct,titleStyle:[String,Object],showZeroBadge:M});var Ft=R({name:Et,props:Dt,setup(e,{slots:n}){const l=pe(),s=C(!1),{parent:a,index:o}=dt(Ne);if(!a)return;const c=()=>{var b;return(b=e.name)!=null?b:o.value},h=()=>{s.value=!0,a.props.lazyRender&&z(()=>{a.onRendered(c(),e.title)})},i=T(()=>{const b=c()===a.currentName.value;return b&&!s.value&&h(),b}),m=C(!i.value);return N(i,b=>{b?m.value=!1:bt(()=>{m.value=!0})}),N(()=>e.title,()=>{a.setLine(),a.scrollIntoView()}),ut(ft,i),()=>{var b;const f=`${a.id}-${o.value}`,{animated:y,swipeable:k,scrollspy:g,lazyRender:w}=a.props;if(!n.default&&!y)return;const d=g||i.value;if(y||k)return u(vt,{id:l,role:"tabpanel",class:Q("panel-wrapper",{inactive:m.value}),tabindex:i.value?0:-1,"aria-hidden":!i.value,"aria-labelledby":f},{default:()=>{var p;return[u("div",{class:Q("panel")},[(p=n.default)==null?void 0:p.call(n)])]}});const X=s.value||g||!w?(b=n.default)==null?void 0:b.call(n):null;return le({id:l}),ht(u("div",{id:l,role:"tabpanel",class:Q("panel"),tabindex:d?0:-1,"aria-labelledby":f},[X]),[[gt,d]])}}});const Mt=q(Ft),Ht=q(Lt),[Vt,I]=E("nav-bar"),Wt={title:String,fixed:Boolean,zIndex:B,border:M,leftText:String,rightText:String,leftArrow:Boolean,placeholder:Boolean,safeAreaInsetTop:Boolean};var Zt=R({name:Vt,props:Wt,emits:["click-left","click-right"],setup(e,{emit:n,slots:l}){const s=C(),a=mt(s,I),o=b=>n("click-left",b),c=b=>n("click-right",b),h=()=>l.left?l.left():[e.leftArrow&&u(ne,{class:I("arrow"),name:"arrow-left"},null),e.leftText&&u("span",{class:I("text")},[e.leftText])],i=()=>l.right?l.right():u("span",{class:I("text")},[e.rightText]),m=()=>{const{title:b,fixed:f,border:y,zIndex:k}=e,g=Ie(k),w=e.leftArrow||e.leftText||l.left,d=e.rightText||l.right;return u("div",{ref:s,style:g,class:[I({fixed:f}),{[_t]:y,"van-safe-area-top":e.safeAreaInsetTop}]},[u("div",{class:I("content")},[w&&u("div",{class:[I("left"),he],onClick:o},[h()]),u("div",{class:[I("title"),"van-ellipsis"]},[l.title?l.title():b]),d&&u("div",{class:[I("right"),he],onClick:c},[i()])])])};return()=>e.fixed&&e.placeholder?a(m):m()}});const xe=q(Zt),Ut=R({components:{[ne.name]:ne},props:{activeIndex:{type:Number,default:0}},setup(){const e=ie(),n=xt();return C(0),{menus:T(()=>[{span:"\u6D88\u606F",icon:"chat-o",activeIcon:"chat",path:"/",dot:n.unReadNum},{span:"\u901A\u8BAF\u5F55",icon:"friends-o",activeIcon:"friends",path:"/friend"},{span:"\u6211\u7684",icon:"manager-o",activeIcon:"manager",path:"/me"}]),handleClick:(a,o)=>{e.push(a.path)}}}});const jt={class:"tab-bar"};function Kt(e,n,l,s,a,o){const c=ae("van-tabbar-item"),h=ae("van-tabbar");return O(),U("div",jt,[u(h,{route:""},{default:j(()=>[(O(!0),U(be,null,yt(e.menus,i=>(O(),U(be,null,[i.dot?(O(),ge(c,{key:0,replace:"",to:i.path,icon:i.icon,badge:i.dot},{default:j(()=>[oe(K(i.span),1)]),_:2},1032,["to","icon","badge"])):(O(),ge(c,{key:1,replace:"",to:i.path,icon:i.icon},{default:j(()=>[oe(K(i.span),1)]),_:2},1032,["to","icon"]))],64))),256))]),_:1})])}const qt=Pe(Ut,[["render",Kt],["__scopeId","data-v-2e4e3434"]]);xe.name+"";const Xt={tabBarProps:{activeIndex:2}},Yt={class:"card"},Gt=["src"],Jt={class:"nickname"},Qt=R({__name:"Me",setup(e){const n=kt(),l=ie(),s=()=>{n.logout().then(()=>{l.push("/login")})};return(a,o)=>{var h,i,m;const c=ae("van-button");return O(),U("div",Xt,[D("div",Yt,[D("img",{src:(h=J(n).userInfo)==null?void 0:h.avatar,alt:""},null,8,Gt),D("div",Jt,[D("span",null,K((i=J(n).userInfo)==null?void 0:i.nickname),1),D("span",null,"("+K((m=J(n).userInfo)==null?void 0:m.id)+")",1)]),u(c,{onClick:s,size:"small",class:"login-out",color:"linear-gradient(to right, #ff6034, #ee0a24)"},{default:j(()=>[oe(" \u6CE8\u9500\u767B\u5F55 ")]),_:1})])])}}});const nn=Pe(Qt,[["__scopeId","data-v-ebbb34e2"]]);export{nn as default};