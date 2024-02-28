import{p as P,m as J,a as K,g as L,u as A,c as l,b as Z,d as ee,e as te,f as ae,h as oe,t as U,i as le,j as ne,k as se,l as re,n as ie,s as x,o as d,q as ue,V as ce,r as D,v as R,w as de,x as M,y as ve,z as E,A as me,B as ge,C as fe,D as he,E as be,F as pe,G as $,H as ye,I as Ve,J as H,K as xe,L as ke,M as Se,N as Te,O as Be,P as f,Q as S,R as T,S as c,T as C,U as B,W as F,X as z,Y as q,Z as I,_ as _e,$ as O,a0 as we}from"./index-8903cfc0.js";import{V as Ce,a as Ie}from"./VNavigationDrawer-8b865a49.js";import{u as Pe,V as Y,a as j,b as Le}from"./VList-1b756733.js";import{V as Ae}from"./VContainer-8385ec07.js";import"./VDivider-dd441843.js";const Q=P({text:String,...J(),...K()},"VToolbarTitle"),W=L()({name:"VToolbarTitle",props:Q(),setup(e,v){let{slots:t}=v;return A(()=>{const m=!!(t.default||t.text||e.text);return l(e.tag,{class:["v-toolbar-title",e.class],style:e.style},{default:()=>{var o;return[m&&l("div",{class:"v-toolbar-title__placeholder"},[t.text?t.text():e.text,(o=t.default)==null?void 0:o.call(t)])]}})}),{}}}),Ne=[null,"prominent","default","comfortable","compact"],X=P({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>Ne.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...Z(),...J(),...ee(),...te(),...K({tag:"header"}),...ae()},"VToolbar"),G=L()({name:"VToolbar",props:X(),setup(e,v){var a;let{slots:t}=v;const{backgroundColorClasses:m,backgroundColorStyles:o}=oe(U(e,"color")),{borderClasses:n}=le(e),{elevationClasses:h}=ne(e),{roundedClasses:g}=se(e),{themeClasses:b}=re(e),{rtlClasses:p}=ie(),r=x(!!(e.extended||(a=t.extension)!=null&&a.call(t))),u=d(()=>parseInt(Number(e.height)+(e.density==="prominent"?Number(e.height):0)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0),10)),i=d(()=>r.value?parseInt(Number(e.extensionHeight)+(e.density==="prominent"?Number(e.extensionHeight):0)-(e.density==="comfortable"?4:0)-(e.density==="compact"?8:0),10):0);return ue({VBtn:{variant:"text"}}),A(()=>{var s;const y=!!(e.title||t.title),k=!!(t.image||e.image),N=(s=t.extension)==null?void 0:s.call(t);return r.value=!!(e.extended||N),l(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},m.value,n.value,h.value,g.value,b.value,p.value,e.class],style:[o.value,e.style]},{default:()=>[k&&l("div",{key:"image",class:"v-toolbar__image"},[t.image?l(D,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},t.image):l(ce,{key:"image-img",cover:!0,src:e.image},null)]),l(D,{defaults:{VTabs:{height:R(u.value)}}},{default:()=>{var V,_,w;return[l("div",{class:"v-toolbar__content",style:{height:R(u.value)}},[t.prepend&&l("div",{class:"v-toolbar__prepend"},[(V=t.prepend)==null?void 0:V.call(t)]),y&&l(W,{key:"title",text:e.title},{text:t.title}),(_=t.default)==null?void 0:_.call(t),t.append&&l("div",{class:"v-toolbar__append"},[(w=t.append)==null?void 0:w.call(t)])])]}}),l(D,{defaults:{VTabs:{height:R(i.value)}}},{default:()=>[l(de,null,{default:()=>[r.value&&l("div",{class:"v-toolbar__extension",style:{height:R(i.value)}},[N])]})]})]})}),{contentHeight:u,extensionHeight:i}}}),Re=P({scrollTarget:{type:String},scrollThreshold:{type:[String,Number],default:300}},"scroll");function Ee(e){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{canScroll:t}=v;let m=0;const o=M(null),n=x(0),h=x(0),g=x(0),b=x(!1),p=x(!1),r=d(()=>Number(e.scrollThreshold)),u=d(()=>ve((r.value-n.value)/r.value||0)),i=()=>{const a=o.value;!a||t&&!t.value||(m=n.value,n.value="window"in a?a.pageYOffset:a.scrollTop,p.value=n.value<m,g.value=Math.abs(n.value-r.value))};return E(p,()=>{h.value=h.value||n.value}),E(b,()=>{h.value=0}),me(()=>{E(()=>e.scrollTarget,a=>{var k;const y=a?document.querySelector(a):window;y&&y!==o.value&&((k=o.value)==null||k.removeEventListener("scroll",i),o.value=y,o.value.addEventListener("scroll",i,{passive:!0}))},{immediate:!0})}),ge(()=>{var a;(a=o.value)==null||a.removeEventListener("scroll",i)}),t&&E(t,i,{immediate:!0}),{scrollThreshold:r,currentScroll:n,currentThreshold:g,isScrollActive:b,scrollRatio:u,isScrollingUp:p,savedScroll:h}}const He=P({scrollBehavior:String,modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},...X(),...fe(),...Re(),height:{type:[Number,String],default:64}},"VAppBar"),De=L()({name:"VAppBar",props:He(),emits:{"update:modelValue":e=>!0},setup(e,v){let{slots:t}=v;const m=M(),o=he(e,"modelValue"),n=d(()=>{var V;const s=new Set(((V=e.scrollBehavior)==null?void 0:V.split(" "))??[]);return{hide:s.has("hide"),inverted:s.has("inverted"),collapse:s.has("collapse"),elevate:s.has("elevate"),fadeImage:s.has("fade-image")}}),h=d(()=>{const s=n.value;return s.hide||s.inverted||s.collapse||s.elevate||s.fadeImage||!o.value}),{currentScroll:g,scrollThreshold:b,isScrollingUp:p,scrollRatio:r}=Ee(e,{canScroll:h}),u=d(()=>e.collapse||n.value.collapse&&(n.value.inverted?r.value>0:r.value===0)),i=d(()=>e.flat||n.value.elevate&&(n.value.inverted?g.value>0:g.value===0)),a=d(()=>n.value.fadeImage?n.value.inverted?1-r.value:r.value:void 0),y=d(()=>{var _,w;if(n.value.hide&&n.value.inverted)return 0;const s=((_=m.value)==null?void 0:_.contentHeight)??0,V=((w=m.value)==null?void 0:w.extensionHeight)??0;return s+V});be(d(()=>!!e.scrollBehavior),()=>{ye(()=>{n.value.hide?n.value.inverted?o.value=g.value>b.value:o.value=p.value||g.value<b.value:o.value=!0})});const{ssrBootStyles:k}=Pe(),{layoutItemStyles:N}=pe({id:e.name,order:d(()=>parseInt(e.order,10)),position:U(e,"location"),layoutSize:y,elementSize:x(void 0),active:o,absolute:U(e,"absolute")});return A(()=>{const s=G.filterProps(e);return l(G,$({ref:m,class:["v-app-bar",{"v-app-bar--bottom":e.location==="bottom"},e.class],style:[{...N.value,"--v-toolbar-image-opacity":a.value,height:void 0,...k.value},e.style]},s,{collapse:u.value,flat:i.value}),t)}),{}}}),Ue=P({...Ve({icon:"$menu",variant:"text"})},"VAppBarNavIcon"),Me=L()({name:"VAppBarNavIcon",props:Ue(),setup(e,v){let{slots:t}=v;return A(()=>l(H,$(e,{class:["v-app-bar-nav-icon"]}),t)),{}}}),$e=L()({name:"VAppBarTitle",props:Q(),setup(e,v){let{slots:t}=v;return A(()=>l(W,$(e,{class:"v-app-bar-title"}),t)),{}}}),je={__name:"FrontLayout",setup(e){const{apiAuth:v}=we(),t=xe(),m=ke(),o=Se(),{mobile:n}=Te(),h=d(()=>n.value),g=M(!1),b=d(()=>[{to:"/mybook",text:"我的書籍",icon:"mdi-book-account",show:o.isLogin},{to:"/article",text:"文章",icon:"mdi-book",show:!0},{to:"/import",text:"引入書籍",icon:"mdi-book-arrow-up",show:o.isLogin},{to:"/member",text:"會員管理",icon:"mdi-cog",show:o.isLogin&&!o.isAdmin},{to:"/admin",text:"管理員管理",icon:"mdi-cog",show:o.isLogin&&o.isAdmin},{to:"/register",text:"註冊",icon:"mdi-account-plus",show:!o.isLogin},{to:"/login",text:"登入",icon:"mdi-login",show:!o.isLogin}]),p=async()=>{var r,u;try{await v.delete("/users/logout"),o.logout(),m({text:"登出成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}}),t.push("/")}catch(i){const a=((u=(r=i==null?void 0:i.response)==null?void 0:r.data)==null?void 0:u.message)||"發生錯誤，請稍後再試";m({text:a,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}};return(r,u)=>{const i=Be("RouterView");return f(),S(B,null,[h.value?(f(),T(Ce,{key:0,modelValue:g.value,"onUpdate:modelValue":u[0]||(u[0]=a=>g.value=a),temporary:"",location:"right",style:{"background-color":"#4d4637",color:"#f6eee0","margin-top":"64px"}},{default:c(()=>[l(Le,{nav:""},{default:c(()=>[(f(!0),S(B,null,F(b.value,a=>(f(),S(B,{key:a.to},[a.show?(f(),T(Y,{key:0,to:a.to},{prepend:c(()=>[l(q,{icon:a.icon},null,8,["icon"])]),default:c(()=>[l(j,null,{default:c(()=>[I(O(a.text),1)]),_:2},1024)]),_:2},1032,["to"])):C("",!0)],64))),128)),z(o).isLogin?(f(),T(Y,{key:0,onClick:p},{prepend:c(()=>[l(q,{icon:"mdi-logout"})]),default:c(()=>[l(j,null,{default:c(()=>[I("登出")]),_:1})]),_:1})):C("",!0)]),_:1})]),_:1},8,["modelValue"])):C("",!0),l(De,{color:"#4d4637"},{default:c(()=>[l(Ae,{class:"d-flex align-center"},{default:c(()=>[l(H,{to:"/",active:!1},{default:c(()=>[l($e,{class:"text-h5"},{default:c(()=>[I("書評網")]),_:1})]),_:1}),l(_e),h.value?(f(),T(Me,{key:0,onClick:u[1]||(u[1]=a=>g.value=!0)})):(f(),S(B,{key:1},[(f(!0),S(B,null,F(b.value,a=>(f(),S(B,{key:a.to},[a.show?(f(),T(H,{key:0,to:a.to,"prepend-icon":a.icon},{default:c(()=>[I(O(a.text),1)]),_:2},1032,["to","prepend-icon"])):C("",!0)],64))),128)),z(o).isLogin?(f(),T(H,{key:0,"prepend-icon":"mdi-logout",onClick:p},{default:c(()=>[I("登出")]),_:1})):C("",!0)],64))]),_:1})]),_:1}),l(Ie,{style:{"background-color":"#f6eee0"}},{default:c(()=>[l(i)]),_:1})],64)}}};export{je as default};