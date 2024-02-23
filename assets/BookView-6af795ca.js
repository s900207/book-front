import{p as j,m as q,a as E,g as G,u as J,c as t,al as z,am as K,an as Q,f as W,ao as X,l as Z,D as O,o as k,y as Y,ap as ee,s as te,a4 as le,U as T,J as S,G as ae,Z as w,aq as ne,K as oe,x as $,L as se,M as ie,A as ue,P as L,R as A,S as a,a0 as re,V as ce,ak as m,$ as b,Q as F,T as de,aj as me,X as ve,W as fe}from"./index-1db6a4dc.js";import{u as ge,V as be}from"./vee-validate.esm-56b7550e.js";import{V as he}from"./VContainer-85c20c02.js";import{a as c,V as h}from"./VRow-a2ecdf1c.js";import{V as _e}from"./VTextarea-b5a394ed.js";import{b as Ve,V as ye,a as ke,c as Le}from"./VList-26370067.js";import"./VDivider-39d2672a.js";const pe=j({start:Boolean,end:Boolean,...q(),...E()},"VListItemAction"),Ie=G()({name:"VListItemAction",props:pe(),setup(e,_){let{slots:v}=_;return J(()=>t(e.tag,{class:["v-list-item-action",{"v-list-item-action--start":e.start,"v-list-item-action--end":e.end},e.class],style:e.style},v)),{}}});const xe=j({name:String,itemAriaLabel:{type:String,default:"$vuetify.rating.ariaLabel.item"},activeColor:String,color:String,clearable:Boolean,disabled:Boolean,emptyIcon:{type:z,default:"$ratingEmpty"},fullIcon:{type:z,default:"$ratingFull"},halfIncrements:Boolean,hover:Boolean,length:{type:[Number,String],default:5},readonly:Boolean,modelValue:{type:[Number,String],default:0},itemLabels:Array,itemLabelPosition:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},ripple:Boolean,...q(),...K(),...Q(),...E(),...W()},"VRating"),H=G()({name:"VRating",props:xe(),emits:{"update:modelValue":e=>!0},setup(e,_){let{slots:v}=_;const{t:P}=X(),{themeClasses:M}=Z(e),p=O(e,"modelValue"),f=k(()=>Y(parseFloat(p.value),0,+e.length)),V=k(()=>ee(Number(e.length),1)),g=k(()=>V.value.flatMap(l=>e.halfIncrements?[l-.5,l]:[l])),d=te(-1),I=k(()=>g.value.map(l=>{const n=e.hover&&d.value>-1,i=f.value>=l,r=d.value>=l,y=(n?r:i)?e.fullIcon:e.emptyIcon,R=e.activeColor??e.color,C=i||r?R:e.color;return{isFilled:i,isHovered:r,icon:y,color:C}})),o=k(()=>[0,...g.value].map(l=>{function n(){d.value=l}function i(){d.value=-1}function r(){e.disabled||e.readonly||(p.value=f.value===l&&e.clearable?0:l)}return{onMouseenter:e.hover?n:void 0,onMouseleave:e.hover?i:void 0,onClick:r}})),B=k(()=>e.name??`v-rating-${le()}`);function s(l){var U,D;let{value:n,index:i,showStar:r=!0}=l;const{onMouseenter:x,onMouseleave:y,onClick:R}=o.value[i+1],C=`${B.value}-${String(n).replace(".","-")}`,N={color:(U=I.value[i])==null?void 0:U.color,density:e.density,disabled:e.disabled,icon:(D=I.value[i])==null?void 0:D.icon,ripple:e.ripple,size:e.size,variant:"plain"};return t(T,null,[t("label",{for:C,class:{"v-rating__item--half":e.halfIncrements&&n%1>0,"v-rating__item--full":e.halfIncrements&&n%1===0},onMouseenter:x,onMouseleave:y,onClick:R},[t("span",{class:"v-rating__hidden"},[P(e.itemAriaLabel,n,e.length)]),r?v.item?v.item({...I.value[i],props:N,value:n,index:i,rating:f.value}):t(S,ae({"aria-label":P(e.itemAriaLabel,n,e.length)},N),null):void 0]),t("input",{class:"v-rating__hidden",name:B.value,id:C,type:"radio",value:n,checked:f.value===n,tabindex:-1,readonly:e.readonly,disabled:e.disabled},null)])}function u(l){return v["item-label"]?v["item-label"](l):l.label?t("span",null,[l.label]):t("span",null,[w(" ")])}return J(()=>{var n;const l=!!((n=e.itemLabels)!=null&&n.length)||v["item-label"];return t(e.tag,{class:["v-rating",{"v-rating--hover":e.hover,"v-rating--readonly":e.readonly},M.value,e.class],style:e.style},{default:()=>[t(s,{value:0,index:-1,showStar:!1},null),V.value.map((i,r)=>{var x,y;return t("div",{class:"v-rating__wrapper"},[l&&e.itemLabelPosition==="top"?u({value:i,index:r,label:(x=e.itemLabels)==null?void 0:x[r]}):void 0,t("div",{class:"v-rating__item"},[e.halfIncrements?t(T,null,[t(s,{value:i-.5,index:r*2},null),t(s,{value:i,index:r*2+1},null)]):t(s,{value:i,index:r},null)]),l&&e.itemLabelPosition==="bottom"?u({value:i,index:r,label:(y=e.itemLabels)==null?void 0:y[r]}):void 0])})]})}),{}}}),Se=m("h3",null,"出版者:",-1),we=m("h3",null,"價格:",-1),Pe=m("h3",null,"分類:",-1),Be=m("h3",null,"簡介:",-1),Ce=["innerHTML"],$e={key:1},Me=m("h3",null,"新增書評:",-1),Re=m("h3",null,"書評:",-1),He={__name:"BookView",setup(e){const _=ne(),v=oe(),{api:P,apiAuth:M}=re(),p=$(!1),f=$(!1),V=se(),g=ie(),d=$({usersId:"",rating:0,comment:""}),{handleSubmit:I}=ge({initialValues:{usersId:"",rating:0,comment:""}}),o=$({_id:"",image:"",title:"",authors:"",publisher:"",retailPrice:"",categories:"",buyLink:"",description:"",reviews:[]}),B=I(async s=>{var u,l;if(console.log(d.value),!g.isLogin){v.push("/login"),V({text:"請先登入",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}});return}try{if(g&&g.user&&g.user._id){const{data:n}=await M.post(`/books/${_.params.id}/reviews`,{user:g.user._id,rating:d.value.rating,conmment:d.value.comment});n&&n.result&&o.value.reviews.push(n.result),V({text:"新增成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}})}}catch(n){console.log(n);const i=((l=(u=n==null?void 0:n.response)==null?void 0:u.data)==null?void 0:l.message)||"發生錯誤，請稍後再試";V({text:i,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}});return ue(async()=>{try{const{data:s}=await P.get(`/books/${_.params.id}`);o.value._id=s.result._id,o.value.image=s.result.image,o.value.title=s.result.title,o.value.authors=s.result.authors,o.value.publisher=s.result.publisher,o.value.retailPrice=s.result.retailPrice,o.value.categories=s.result.categories,o.value.buyLink=s.result.buyLink;let u=s.result.description.replace(/(※|★|◆|【)/g,"<br>$1");u=u.replace(/(】)/g,"$1<br>"),u=u.replace(new RegExp("(?<=──[^,]*?)(?=,)","g"),"<br>$1"),o.value.description=u,o.value.reviews=s.result.reviews,document.title=`書評網 | ${o.value.title}`}catch(s){console.log(s)}}),(s,u)=>(L(),A(he,null,{default:a(()=>[t(h,null,{default:a(()=>[t(c,{cols:"12",md:"3",style:{position:"sticky"},top:"0"},{default:a(()=>[t(ce,{src:o.value.image},null,8,["src"]),t(c,{class:"d-flex justify-space-between"},{default:a(()=>[t(S,{class:"mt-5",color:"#4d4637",dark:"",href:o.value.buyLink,target:"_blank"},{default:a(()=>[w("購買介面")]),_:1},8,["href"]),t(S,{class:"mt-3",icon:"mdi-heart-plus"})]),_:1})]),_:1}),t(c,{cols:"12",md:"9"},{default:a(()=>[m("h1",null,b(o.value.title),1),m("h2",null,b(o.value.authors),1),t(h,null,{default:a(()=>[t(c,{cols:"auto"},{default:a(()=>[Se]),_:1}),t(c,null,{default:a(()=>[m("p",null,b(o.value.publisher),1)]),_:1})]),_:1}),t(h,null,{default:a(()=>[t(c,{cols:"auto"},{default:a(()=>[we]),_:1}),t(c,null,{default:a(()=>[m("p",null,"$"+b(o.value.retailPrice),1)]),_:1})]),_:1}),t(h,null,{default:a(()=>[t(c,{cols:"auto"},{default:a(()=>[Pe]),_:1}),t(c,null,{default:a(()=>[m("p",null,b(o.value.categories),1)]),_:1})]),_:1}),t(h,null,{default:a(()=>[t(c,{cols:"auto"},{default:a(()=>[Be,f.value?(L(),F("p",{key:0,innerHTML:o.value.description},null,8,Ce)):(L(),F("p",$e,b(o.value.description.substring(0,500)),1))]),_:1}),t(c,{class:"text-center"},{default:a(()=>[o.value.description.length>100?(L(),A(S,{key:0,color:"#4d4637",onClick:u[0]||(u[0]=l=>f.value=!f.value),icon:f.value?"mdi-chevron-up":"mdi-chevron-down"},null,8,["icon"])):de("",!0)]),_:1})]),_:1}),t(h,null,{default:a(()=>[t(c,{cols:"12"},{default:a(()=>[Me,t(be,{disabled:p.value,onSubmit:me(ve(B),["prevent"])},{default:a(()=>[t(H,{modelValue:d.value.rating,"onUpdate:modelValue":u[1]||(u[1]=l=>d.value.rating=l),color:"#4d4637 darken-3",hover:""},null,8,["modelValue"]),t(_e,{modelValue:d.value.comment,"onUpdate:modelValue":u[2]||(u[2]=l=>d.value.comment=l),label:"你的書評",required:""},null,8,["modelValue"]),t(S,{color:"#4d4637",type:"submit",loading:p.value},{default:a(()=>[w("提交")]),_:1},8,["loading"])]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1}),t(h,null,{default:a(()=>[t(c,{cols:"12"},{default:a(()=>[Re,t(Ve,null,{default:a(()=>[(L(!0),F(T,null,fe(o.value.reviews,l=>(L(),A(ye,{key:l._id},{default:a(()=>[t(ke,null,{default:a(()=>[w(b(l.usersId.name),1)]),_:2},1024),t(Le,null,{default:a(()=>[w(b(l.comment),1)]),_:2},1024),t(Ie,null,{default:a(()=>[t(H,{modelValue:l.rating,"onUpdate:modelValue":n=>l.rating=n,color:"#4d4637 darken-3",readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}};export{He as default};
