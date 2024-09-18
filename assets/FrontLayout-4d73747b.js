import{p as w,m as Y,a as z,g as N,u as P,c as o,b as le,d as ne,e as K,f as Q,h as Z,t as R,i as se,j as re,k as ee,l as ie,n as ue,s as _,o as f,q as ce,V as de,r as U,v as H,w as ve,x as X,y as me,z as $,A as ge,B as fe,C as be,D as he,E as ye,F as Ve,G as E,H as xe,I as ke,J as M,K as Se,L as Be,M as Te,N as _e,O as Ce,P as pe,Q as we,R as Ne,S as Pe,T as Ie,U as Le,W as F,X as Ae,Y as Re,Z as Ee,_ as He,$ as $e,a0 as g,a1 as C,a2 as k,a3 as d,a4 as T,a5 as p,a6 as q,a7 as D,a8 as A,a9 as De,aa as O,ab as Me}from"./index-36b314a2.js";import{V as Ue,a as Fe}from"./VNavigationDrawer-287888e5.js";import{u as Ye,V as W,a as j,b as ze}from"./VList-a8dd1efc.js";import{V as Xe}from"./VContainer-ab880846.js";import"https://s900207.github.io/book-front/assets/materialdesignicons-webfont-61e8aba5.ttf";import"https://s900207.github.io/book-front/assets/materialdesignicons-webfont-a5928a0d.woff";import"https://s900207.github.io/book-front/assets/materialdesignicons-webfont-662fefa8.woff2";import"./VDivider-8b5600f2.js";const te=w({text:String,...Y(),...z()},"VToolbarTitle"),ae=N()({name:"VToolbarTitle",props:te(),setup(e,i){let{slots:t}=i;return P(()=>{const v=!!(t.default||t.text||e.text);return o(e.tag,{class:["v-toolbar-title",e.class],style:e.style},{default:()=>{var l;return[v&&o("div",{class:"v-toolbar-title__placeholder"},[t.text?t.text():e.text,(l=t.default)==null?void 0:l.call(t)])]}})}),{}}}),qe=[null,"prominent","default","comfortable","compact"],oe=w({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>qe.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...le(),...Y(),...ne(),...K(),...z({tag:"header"}),...Q()},"VToolbar"),G=N()({name:"VToolbar",props:oe(),setup(e,i){var a;let{slots:t}=i;const{backgroundColorClasses:v,backgroundColorStyles:l}=Z(R(e,"color")),{borderClasses:n}=se(e),{elevationClasses:b}=re(e),{roundedClasses:m}=ee(e),{themeClasses:h}=ie(e),{rtlClasses:y}=ue(),s=_(!!(e.extended||(a=t.extension)!=null&&a.call(t))),u=f(()=>parseInt(Number(e.height)+(e.density==="prominent"?Number(e.height):0)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0),10)),c=f(()=>s.value?parseInt(Number(e.extensionHeight)+(e.density==="prominent"?Number(e.extensionHeight):0)-(e.density==="comfortable"?4:0)-(e.density==="compact"?8:0),10):0);return ce({VBtn:{variant:"text"}}),P(()=>{var r;const V=!!(e.title||t.title),x=!!(t.image||e.image),S=(r=t.extension)==null?void 0:r.call(t);return s.value=!!(e.extended||S),o(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},v.value,n.value,b.value,m.value,h.value,y.value,e.class],style:[l.value,e.style]},{default:()=>[x&&o("div",{key:"image",class:"v-toolbar__image"},[t.image?o(U,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},t.image):o(de,{key:"image-img",cover:!0,src:e.image},null)]),o(U,{defaults:{VTabs:{height:H(u.value)}}},{default:()=>{var B,I,L;return[o("div",{class:"v-toolbar__content",style:{height:H(u.value)}},[t.prepend&&o("div",{class:"v-toolbar__prepend"},[(B=t.prepend)==null?void 0:B.call(t)]),V&&o(ae,{key:"title",text:e.title},{text:t.title}),(I=t.default)==null?void 0:I.call(t),t.append&&o("div",{class:"v-toolbar__append"},[(L=t.append)==null?void 0:L.call(t)])])]}}),o(U,{defaults:{VTabs:{height:H(c.value)}}},{default:()=>[o(ve,null,{default:()=>[s.value&&o("div",{class:"v-toolbar__extension",style:{height:H(c.value)}},[S])]})]})]})}),{contentHeight:u,extensionHeight:c}}}),Oe=w({scrollTarget:{type:String},scrollThreshold:{type:[String,Number],default:300}},"scroll");function We(e){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{canScroll:t}=i;let v=0;const l=X(null),n=_(0),b=_(0),m=_(0),h=_(!1),y=_(!1),s=f(()=>Number(e.scrollThreshold)),u=f(()=>me((s.value-n.value)/s.value||0)),c=()=>{const a=l.value;!a||t&&!t.value||(v=n.value,n.value="window"in a?a.pageYOffset:a.scrollTop,y.value=n.value<v,m.value=Math.abs(n.value-s.value))};return $(y,()=>{b.value=b.value||n.value}),$(h,()=>{b.value=0}),ge(()=>{$(()=>e.scrollTarget,a=>{var x;const V=a?document.querySelector(a):window;V&&V!==l.value&&((x=l.value)==null||x.removeEventListener("scroll",c),l.value=V,l.value.addEventListener("scroll",c,{passive:!0}))},{immediate:!0})}),fe(()=>{var a;(a=l.value)==null||a.removeEventListener("scroll",c)}),t&&$(t,c,{immediate:!0}),{scrollThreshold:s,currentScroll:n,currentThreshold:m,isScrollActive:h,scrollRatio:u,isScrollingUp:y,savedScroll:b}}const je=w({scrollBehavior:String,modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},...oe(),...be(),...Oe(),height:{type:[Number,String],default:64}},"VAppBar"),Ge=N()({name:"VAppBar",props:je(),emits:{"update:modelValue":e=>!0},setup(e,i){let{slots:t}=i;const v=X(),l=he(e,"modelValue"),n=f(()=>{var B;const r=new Set(((B=e.scrollBehavior)==null?void 0:B.split(" "))??[]);return{hide:r.has("hide"),inverted:r.has("inverted"),collapse:r.has("collapse"),elevate:r.has("elevate"),fadeImage:r.has("fade-image")}}),b=f(()=>{const r=n.value;return r.hide||r.inverted||r.collapse||r.elevate||r.fadeImage||!l.value}),{currentScroll:m,scrollThreshold:h,isScrollingUp:y,scrollRatio:s}=We(e,{canScroll:b}),u=f(()=>e.collapse||n.value.collapse&&(n.value.inverted?s.value>0:s.value===0)),c=f(()=>e.flat||n.value.elevate&&(n.value.inverted?m.value>0:m.value===0)),a=f(()=>n.value.fadeImage?n.value.inverted?1-s.value:s.value:void 0),V=f(()=>{var I,L;if(n.value.hide&&n.value.inverted)return 0;const r=((I=v.value)==null?void 0:I.contentHeight)??0,B=((L=v.value)==null?void 0:L.extensionHeight)??0;return r+B});ye(f(()=>!!e.scrollBehavior),()=>{xe(()=>{n.value.hide?n.value.inverted?l.value=m.value>h.value:l.value=y.value||m.value<h.value:l.value=!0})});const{ssrBootStyles:x}=Ye(),{layoutItemStyles:S}=Ve({id:e.name,order:f(()=>parseInt(e.order,10)),position:R(e,"location"),layoutSize:V,elementSize:_(void 0),active:l,absolute:R(e,"absolute")});return P(()=>{const r=G.filterProps(e);return o(G,E({ref:v,class:["v-app-bar",{"v-app-bar--bottom":e.location==="bottom"},e.class],style:[{...S.value,"--v-toolbar-image-opacity":a.value,height:void 0,...x.value},e.style]},r,{collapse:u.value,flat:c.value}),t)}),{}}}),Je=w({...ke({icon:"$menu",variant:"text"})},"VAppBarNavIcon"),Ke=N()({name:"VAppBarNavIcon",props:Je(),setup(e,i){let{slots:t}=i;return P(()=>o(M,E(e,{class:["v-app-bar-nav-icon"]}),t)),{}}}),Qe=N()({name:"VAppBarTitle",props:te(),setup(e,i){let{slots:t}=i;return P(()=>o(ae,E(e,{class:"v-app-bar-title"}),t)),{}}});const Ze=w({bordered:Boolean,color:String,content:[Number,String],dot:Boolean,floating:Boolean,icon:Se,inline:Boolean,label:{type:String,default:"$vuetify.badge"},max:[Number,String],modelValue:{type:Boolean,default:!0},offsetX:[Number,String],offsetY:[Number,String],textColor:String,...Y(),...Be({location:"top end"}),...K(),...z(),...Q(),...Te({transition:"scale-rotate-transition"})},"VBadge"),J=N()({name:"VBadge",inheritAttrs:!1,props:Ze(),setup(e,i){const{backgroundColorClasses:t,backgroundColorStyles:v}=Z(R(e,"color")),{roundedClasses:l}=ee(e),{t:n}=_e(),{textColorClasses:b,textColorStyles:m}=Ce(R(e,"textColor")),{themeClasses:h}=pe(),{locationStyles:y}=we(e,!0,s=>(e.floating?e.dot?2:4:e.dot?8:12)+(["top","bottom"].includes(s)?+(e.offsetY??0):["left","right"].includes(s)?+(e.offsetX??0):0));return P(()=>{const s=Number(e.content),u=!e.max||isNaN(s)?e.content:s<=+e.max?s:`${e.max}+`,[c,a]=Ne(i.attrs,["aria-atomic","aria-label","aria-live","role","title"]);return o(e.tag,E({class:["v-badge",{"v-badge--bordered":e.bordered,"v-badge--dot":e.dot,"v-badge--floating":e.floating,"v-badge--inline":e.inline},e.class]},a,{style:e.style}),{default:()=>{var V,x;return[o("div",{class:"v-badge__wrapper"},[(x=(V=i.slots).default)==null?void 0:x.call(V),o(Pe,{transition:e.transition},{default:()=>{var S,r;return[Ie(o("span",E({class:["v-badge__badge",h.value,t.value,l.value,b.value],style:[v.value,m.value,e.inline?{}:y.value],"aria-atomic":"true","aria-label":n(e.label,s),"aria-live":"polite",role:"status"},c),[e.dot?void 0:i.slots.badge?(r=(S=i.slots).badge)==null?void 0:r.call(S):e.icon?o(F,{icon:e.icon},null):u]),[[Le,e.modelValue]])]}})])]}})}),{}}}),it={__name:"FrontLayout",setup(e){const{apiAuth:i}=Me(),t=Ae(),v=Re(),l=Ee(),{mobile:n}=He(),b=f(()=>n.value),m=X(!1),h=f(()=>[{to:"/mybook",text:"我的書籍",icon:"mdi-book-account",show:l.isLogin},{to:"/article",text:"文章",icon:"mdi-book",show:!1},{to:"/admin",text:"管理員管理",icon:"mdi-cog",show:l.isLogin&&l.isAdmin},{to:"/cart",text:"購物車",icon:"mdi-cart",show:!0},{to:"/orders",text:"訂單",icon:"mdi-list-box",show:l.isLogin},{to:"/register",text:"註冊",icon:"mdi-account-plus",show:!l.isLogin},{to:"/login",text:"登入",icon:"mdi-login",show:!l.isLogin}]),y=async()=>{var s,u;try{await i.delete("/users/logout"),l.logout(),v({text:"登出成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}}),t.push("/")}catch(c){const a=((u=(s=c==null?void 0:c.response)==null?void 0:s.data)==null?void 0:u.message)||"發生錯誤，請稍後再試";v({text:a,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}};return(s,u)=>{const c=$e("RouterView");return g(),C(p,null,[b.value?(g(),k(Ue,{key:0,modelValue:m.value,"onUpdate:modelValue":u[0]||(u[0]=a=>m.value=a),temporary:"",location:"right",style:{"background-color":"#4d4637",color:"#f6eee0","margin-top":"64px"}},{default:d(()=>[o(ze,{nav:""},{default:d(()=>[(g(!0),C(p,null,q(h.value,a=>(g(),C(p,{key:a.to},[a.show?(g(),k(W,{key:0,to:a.to},{prepend:d(()=>[o(F,{icon:a.icon},null,8,["icon"])]),append:d(()=>[a.to==="/cart"?(g(),k(J,{key:0,color:"error",content:D(l).cart,inline:""},null,8,["content"])):T("",!0)]),default:d(()=>[o(j,null,{default:d(()=>[A(O(a.text),1)]),_:2},1024)]),_:2},1032,["to"])):T("",!0)],64))),128)),D(l).isLogin?(g(),k(W,{key:0,onClick:y},{prepend:d(()=>[o(F,{icon:"mdi-logout"})]),default:d(()=>[o(j,null,{default:d(()=>[A("登出")]),_:1})]),_:1})):T("",!0)]),_:1})]),_:1},8,["modelValue"])):T("",!0),o(Ge,{color:"#4d4637"},{default:d(()=>[o(Xe,{class:"d-flex align-center"},{default:d(()=>[o(M,{to:"/",active:!1},{default:d(()=>[o(Qe,{class:"text-h5"},{default:d(()=>[A("書評網")]),_:1})]),_:1}),o(De),b.value?(g(),k(Ke,{key:0,onClick:u[1]||(u[1]=a=>m.value=!0)})):(g(),C(p,{key:1},[(g(!0),C(p,null,q(h.value,a=>(g(),C(p,{key:a.to},[a.show?(g(),k(M,{key:0,to:a.to,"prepend-icon":a.icon},{default:d(()=>[A(O(a.text),1),a.to==="/cart"?(g(),k(J,{key:0,color:"error",content:D(l).cart,floating:""},null,8,["content"])):T("",!0)]),_:2},1032,["to","prepend-icon"])):T("",!0)],64))),128)),D(l).isLogin?(g(),k(M,{key:0,"prepend-icon":"mdi-logout",onClick:y},{default:d(()=>[A("登出")]),_:1})):T("",!0)],64))]),_:1})]),_:1}),o(Fe,{style:{"background-color":"#f6eee0"}},{default:d(()=>[o(c)]),_:1})],64)}}};export{it as default};
