import{p as E,m as J,a as K,g as Q,u as W,c as e,ak as X,K as Z,x as f,L as G,M as O,A as Y,P as _,Q as C,S as l,al as ee,U as R,a0 as le,V as te,J as g,Z as k,aj as r,$ as c,R as T,T as ae,ai as U,X as L,W as oe,ac as A,aa as se,am as ue,an as ne}from"./index-8903cfc0.js";import{u as ie,V as F}from"./vee-validate.esm-a271b352.js";import{V as re}from"./VContainer-8385ec07.js";import{V as d,a as n}from"./VRow-3996a4f3.js";import{V as B}from"./VRating-54225fd6.js";import{V as D}from"./VTextarea-695bc0fe.js";import{b as de,V as ce,a as me,c as fe}from"./VList-1b756733.js";import"./VDivider-dd441843.js";const ve=E({start:Boolean,end:Boolean,...J(),...K()},"VListItemAction"),M=Q()({name:"VListItemAction",props:ve(),setup(v,h){let{slots:x}=h;return W(()=>e(v.tag,{class:["v-list-item-action",{"v-list-item-action--start":v.start,"v-list-item-action--end":v.end},v.class],style:v.style},x)),{}}}),pe=r("h3",null,"出版者:",-1),_e=r("h3",null,"價格:",-1),ge=r("h3",null,"分類:",-1),Ve=r("h3",null,"簡介:",-1),be=["innerHTML"],ke={key:1},he=r("h3",null,"新增書評:",-1),ye=r("h3",null,"書評:",-1),we=r("h3",null,"編輯書評",-1),Re={__name:"BookView",setup(v){const h=X(),x=Z(),{api:N,apiAuth:P}=le(),y=f(!1),w=f(!1),V=G(),j=O(),m=f({usersId:"",rating:0,comment:""}),b=f(!1),S=f(!1),{handleSubmit:I}=ie({initialValues:{usersId:"",rating:0,comment:""}}),o=f({_id:"",image:"",title:"",authors:"",publisher:"",retailPrice:"",categories:"",buyLink:"",description:"",reviews:[]}),i=f([]),z=()=>{b.value=!1},$=I(async s=>{var t,a;if(console.log(m.value),!j.isLogin){x.push("/login"),V({text:"請先登入",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}});return}try{const{data:u}=await P.post(`/books/${h.params.id}/reviews`,{rating:m.value.rating,conmment:m.value.comment});u&&u.result&&o.value.reviews.push(u.result),V({text:"新增成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}})}catch(u){console.log(u);const p=((a=(t=u==null?void 0:u.response)==null?void 0:t.data)==null?void 0:a.message)||"發生錯誤，請稍後再試";V({text:p,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}}),q=s=>{if(s){const t=o.value.reviews.find(a=>a._id===s);i.value.id=t._id,i.value.rating=t.rating,i.value.comment=t.comment,i.value.bookId=o.value._id,console.log(i.value.bookId)}b.value=!0},H=I(async s=>{var t,a;console.log(i.value);try{const u=new FormData;for(const p in s)u.append(p,i.value[p]);b.value===""&&await P.patch(`/books/${i.value.bookId}/reviews/${i.value.id}`,u),V({text:"編輯成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}})}catch(u){console.log(u);const p=((a=(t=u==null?void 0:u.response)==null?void 0:t.data)==null?void 0:a.message)||"發生錯誤，請稍後再試";V({text:p,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}z()});return Y(async()=>{try{const{data:s}=await N.get(`/books/${h.params.id}`);o.value._id=s.result._id,o.value.image=s.result.image,o.value.title=s.result.title,o.value.authors=s.result.authors,o.value.publisher=s.result.publisher,o.value.retailPrice=s.result.retailPrice,o.value.categories=s.result.categories,o.value.buyLink=s.result.buyLink;let t=s.result.description.replace(/(※|★|◆|【)/g,"<br>$1");t=t.replace(/(】)/g,"$1<br>"),t=t.replace(new RegExp("(?<=──[^,]*?)(?=,)","g"),"<br>$1"),o.value.description=t,o.value.reviews=s.result.reviews,document.title=`書評網 | ${o.value.title}`}catch(s){console.log(s)}}),(s,t)=>(_(),C(R,null,[e(re,null,{default:l(()=>[e(d,null,{default:l(()=>[e(n,{cols:"12",md:"3",style:{position:"sticky"},top:"0"},{default:l(()=>[e(te,{src:o.value.image},null,8,["src"]),e(n,{class:"d-flex justify-space-between"},{default:l(()=>[e(g,{class:"mt-5",color:"#4d4637",dark:"",href:o.value.buyLink,target:"_blank"},{default:l(()=>[k("購買介面")]),_:1},8,["href"]),e(g,{class:"text-right",icon:S.value?"mdi-heart-minus":"mdi-heart-plus",color:S.value?"red":"blue",onClick:s.addFavorite},null,8,["icon","color","onClick"])]),_:1})]),_:1}),e(n,{cols:"12",md:"9"},{default:l(()=>[r("h1",null,c(o.value.title),1),r("h2",null,c(o.value.authors),1),e(d,null,{default:l(()=>[e(n,{cols:"auto"},{default:l(()=>[pe]),_:1}),e(n,null,{default:l(()=>[r("p",null,c(o.value.publisher),1)]),_:1})]),_:1}),e(d,null,{default:l(()=>[e(n,{cols:"auto"},{default:l(()=>[_e]),_:1}),e(n,null,{default:l(()=>[r("p",null,"$"+c(o.value.retailPrice),1)]),_:1})]),_:1}),e(d,null,{default:l(()=>[e(n,{cols:"auto"},{default:l(()=>[ge]),_:1}),e(n,null,{default:l(()=>[r("p",null,c(o.value.categories),1)]),_:1})]),_:1}),e(d,null,{default:l(()=>[e(n,{cols:"auto"},{default:l(()=>[Ve,w.value?(_(),C("p",{key:0,innerHTML:o.value.description},null,8,be)):(_(),C("p",ke,c(o.value.description.substring(0,500)),1))]),_:1}),e(n,{class:"text-center"},{default:l(()=>[o.value.description.length>100?(_(),T(g,{key:0,color:"#4d4637",onClick:t[0]||(t[0]=a=>w.value=!w.value),icon:w.value?"mdi-chevron-up":"mdi-chevron-down"},null,8,["icon"])):ae("",!0)]),_:1})]),_:1}),e(d,null,{default:l(()=>[e(n,{cols:"12"},{default:l(()=>[he,e(F,{disabled:y.value,onSubmit:U(L($),["prevent"])},{default:l(()=>[e(B,{modelValue:m.value.rating,"onUpdate:modelValue":t[1]||(t[1]=a=>m.value.rating=a),color:"#4d4637 darken-3",hover:""},null,8,["modelValue"]),e(D,{modelValue:m.value.comment,"onUpdate:modelValue":t[2]||(t[2]=a=>m.value.comment=a),label:"你的書評",required:""},null,8,["modelValue"]),e(g,{color:"#4d4637",type:"submit",loading:y.value},{default:l(()=>[k("提交")]),_:1},8,["loading"])]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1}),e(d,null,{default:l(()=>[e(n,{cols:"12"},{default:l(()=>[ye,e(de,null,{default:l(()=>[(_(!0),C(R,null,oe(o.value.reviews,a=>(_(),T(ce,{key:a._id},{default:l(()=>[e(A,null,{default:l(()=>[e(d,null,{default:l(()=>[e(n,{cols:"auto"},{default:l(()=>[e(me,{style:{fontSize:"30px"}},{default:l(()=>[k(c(a.user.account),1)]),_:2},1024)]),_:2},1024),e(n,{cols:"auto"},{default:l(()=>[e(M,null,{default:l(()=>[e(B,{modelValue:a.rating,"onUpdate:modelValue":u=>a.rating=u,color:"#4d4637 darken-3",size:"25",readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1024),e(d,null,{default:l(()=>[e(n,{cols:"auto"},{default:l(()=>[e(fe,{class:"mb-5",style:{fontSize:"20px"}},{default:l(()=>[k(c(a.comment),1)]),_:2},1024)]),_:2},1024),e(n,{class:"d-flex justify-end"},{default:l(()=>[e(M,null,{default:l(()=>[e(g,{icon:"mdi-pencil",color:"#4d4637",onClick:()=>q(a._id)},null,8,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(ee,{modelValue:b.value,"onUpdate:modelValue":t[6]||(t[6]=a=>b.value=a),"max-width":"290"},{default:l(()=>[e(F,{disabled:y.value,onSubmit:U(L($),["prevent"])},{default:l(()=>[e(A,null,{default:l(()=>[e(se,null,{default:l(()=>[we]),_:1}),e(ue,null,{default:l(()=>[e(B,{modelValue:i.value.rating,"onUpdate:modelValue":t[3]||(t[3]=a=>i.value.rating=a),color:"#4d4637 darken-3",hover:""},null,8,["modelValue"]),e(D,{modelValue:i.value.comment,"onUpdate:modelValue":t[4]||(t[4]=a=>i.value.comment=a),label:"你的書評",required:""},null,8,["modelValue"])]),_:1}),e(ne,null,{default:l(()=>[e(g,{color:"#4d4637",onClick:t[5]||(t[5]=a=>L(H)(s.review)),loading:y.value},{default:l(()=>[k("修正")]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1},8,["modelValue"])],64))}};export{Re as default};