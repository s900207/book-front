import{p as J,m as K,a as O,g as Q,u as X,c as e,W as N,x as y,U as j,a2 as H,af as E,A as ee,Y as B,$ as t,ay as te,a1 as R,az as ae,a4 as x,V as oe,ar as T,a9 as F,a6 as k,a7 as $,ae as r,ab as p,ax as D,a8 as L,a5 as le,as as z,ap as se,aA as ne,Z as ue}from"./index-8dd01e71.js";import{u as re}from"./vee-validate.esm-5b1dfc9a.js";import{V as ie}from"./VContainer-d51de82a.js";import{V as m}from"./VRow-50a5750e.js";import{V as u}from"./VCol-dd35acfd.js";import{V as M}from"./VForm-d2915f10.js";import{V as A}from"./VRating-f26cbcce.js";import{V as q}from"./VTextarea-878ba44e.js";import{b as ce,V as de,a as me,c as fe}from"./VList-8d618f6d.js";import"./VDivider-2639bf83.js";const pe=J({start:Boolean,end:Boolean,...K(),...O()},"VListItemAction"),ve=Q()({name:"VListItemAction",props:pe(),setup(c,v){let{slots:g}=v;return X(()=>e(c.tag,{class:["v-list-item-action",{"v-list-item-action--start":c.start,"v-list-item-action--end":c.end},c.class],style:c.style},g)),{}}});function _e(c){const{apiAuth:v}=E(),g=N(),d=y(!1),w=j(),h=H();return{isFavorite:d,checkFavoriteStatus:async()=>{try{const{data:i}=await v.get("/users/favorite",{params:{bookId:c}});d.value=i.result.includes(c)}catch(i){console.error(i),d.value=!1}},addFavorite:async()=>{if(!g.isLogin){h.push("/login");return}d.value=!d.value;try{const{data:i}=await v.post("/users/favorite",{bookId:c,isFavorite:d.value});g.favorite=i.result,w({text:d.value?"已加入我的最愛":"已移除我的最愛",showCloseButton:!1,snackbarProps:{timeout:2e3,color:d.value?"green":"red",location:"bottom"}})}catch(i){console.error(i),i.response&&i.response.status===401?h.push("/login"):w({text:"發生錯誤，請稍後再試",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}}}}const ge=r("span",null,"加入購物車",-1),he=r("h3",null,"出版者:",-1),be=r("h3",null,"價格:",-1),Ve=r("h3",null,"分類:",-1),ke=r("h3",null,"簡介:",-1),ye=["innerHTML"],we={key:1},Ce=r("h3",null,"新增書評:",-1),xe=r("h3",null,"書評:",-1),Fe=r("h3",null,"編輯書評",-1),De={__name:"BookView",setup(c){const v=ae(),g=H(),{api:d,apiAuth:w}=E(),h=y(!1),C=y(!1),_=j(),i=N(),b=y({usersId:"",rating:0,comment:""}),P=y(!1),{handleSubmit:I}=re({initialValues:{usersId:"",rating:0,comment:""}}),l=y({_id:"",image:"",title:"",authors:"",publisher:"",retailPrice:"",categories:"",buyLink:"",description:"",reviews:[]}),f=y([]),{isFavorite:S,checkFavoriteStatus:W,addFavorite:Y}=_e(v.params.id),U=I(async s=>{var a,o;if(console.log(b.value),!i.isLogin){g.push("/login"),_({text:"請先登入",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}});return}try{const{data:n}=await w.post(`/books/${v.params.id}/reviews`,{rating:b.value.rating,conmment:b.value.comment});n&&n.result&&l.value.reviews.push(n.result),_({text:"新增成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}})}catch(n){console.log(n);const V=((o=(a=n==null?void 0:n.response)==null?void 0:a.data)==null?void 0:o.message)||"發生錯誤，請稍後再試";_({text:V,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}}),Z=I(async s=>{var a,o;try{console.log(f.value),console.log("Form values:",s);const n=new FormData;for(const V in s)n.append(V,f.value[V]||s[V]);P.value===""&&await w.patch(`/books/${f.value.bookId}/reviews/${f.value.id}`,n),console.log("FormData entries:",...n.entries()),_({text:"編輯成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}})}catch(n){console.log(n);const V=((o=(a=n==null?void 0:n.response)==null?void 0:a.data)==null?void 0:o.message)||"發生錯誤，請稍後再試";_({text:V,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}});console.log(f.value),ee(async()=>{try{const{data:s}=await d.get(`/books/${v.params.id}`);l.value._id=s.result._id,l.value.image=s.result.image,l.value.title=s.result.title,l.value.authors=s.result.authors,l.value.publisher=s.result.publisher,l.value.retailPrice=s.result.retailPrice,l.value.categories=s.result.categories,l.value.buyLink=s.result.buyLink;let a=s.result.description.replace(/(※|★|◆|✓|●|▓|▌|￭|──|【)/g,"<br>$1");a=a.replace(/(】)/g,"$1<br>"),a=a.replace(new RegExp("(?<=──[^,]*?)(?=,)","g"),"<br>$1"),l.value.description=a,l.value.reviews=s.result.reviews,document.title=`書評網 | ${l.value.title}`,await W()}catch(s){console.log(s)}});const G=async()=>{var s,a;if(!i.isLogin){g.push("/login");return}try{const{data:o}=await w.patch("/users/cart",{book:l.value._id,quantity:1});i.cart=o.result,_({text:"新增成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}})}catch(o){const n=((a=(s=o==null?void 0:o.response)==null?void 0:s.data)==null?void 0:a.message)||"發生錯誤，請稍後再試";_({text:n,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}};return(s,a)=>(x(),B(R,null,[e(ie,null,{default:t(()=>[e(m,null,{default:t(()=>[e(u,{cols:"12",md:"3",style:{position:"sticky"},top:"0"},{default:t(()=>[e(oe,{src:l.value.image},null,8,["src"]),e(T,null,{default:t(()=>[e(m,{class:"justify-center align-center"},{default:t(()=>[e(u,{cols:"6"},{default:t(()=>[e(F,{color:k(S)?"red":"blue",onClick:k(Y)},{prepend:t(()=>[e($,{href:k(S)?"#icon-heart-minus":"#icon-heart-plus"},null,8,["href"])]),default:t(()=>[r("span",null,p(k(S)?"取消最愛":"加入最愛"),1)]),_:1},8,["color","onClick"])]),_:1}),e(u,{cols:"6"},{default:t(()=>[e(F,{onClick:G,color:"primary"},{prepend:t(()=>[e($,{href:"#icon-cart"})]),default:t(()=>[ge]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(u,{cols:"12",md:"9"},{default:t(()=>[r("h1",null,p(l.value.title),1),r("h2",null,p(l.value.authors),1),e(m,null,{default:t(()=>[e(u,{cols:"auto"},{default:t(()=>[he]),_:1}),e(u,null,{default:t(()=>[r("p",null,p(l.value.publisher),1)]),_:1})]),_:1}),e(m,null,{default:t(()=>[e(u,{cols:"auto"},{default:t(()=>[be]),_:1}),e(u,null,{default:t(()=>[r("p",null,"$"+p(l.value.retailPrice),1)]),_:1})]),_:1}),e(m,null,{default:t(()=>[e(u,{cols:"auto"},{default:t(()=>[Ve]),_:1}),e(u,null,{default:t(()=>[r("p",null,p(l.value.categories),1)]),_:1})]),_:1}),e(m,null,{default:t(()=>[e(u,{cols:"auto"},{default:t(()=>[ke,C.value?(x(),B("p",{key:0,innerHTML:l.value.description},null,8,ye)):(x(),B("p",we,p(l.value.description.substring(0,500)),1))]),_:1}),e(u,{class:"text-center"},{default:t(()=>[e(F,{color:(C.value,"#4d4637"),onClick:a[0]||(a[0]=o=>C.value=!C.value),rounded:"",width:"40px",height:"40px"},{default:t(()=>[r("template",null,[e($,{href:C.value?"#icon-chevron-up":"#icon-chevron-down",color:"#f6eee0"},null,8,["href"])])]),_:1},8,["color"])]),_:1})]),_:1}),e(m,null,{default:t(()=>[e(u,{cols:"12"},{default:t(()=>[Ce,e(M,{disabled:h.value,onSubmit:D(k(U),["prevent"])},{default:t(()=>[e(A,{modelValue:b.value.rating,"onUpdate:modelValue":a[1]||(a[1]=o=>b.value.rating=o),color:"#4d4637 darken-3",hover:""},null,8,["modelValue"]),e(q,{modelValue:b.value.comment,"onUpdate:modelValue":a[2]||(a[2]=o=>b.value.comment=o),label:"你的書評",required:""},null,8,["modelValue"]),e(F,{color:"#4d4637",type:"submit",loading:h.value},{default:t(()=>[L("提交")]),_:1},8,["loading"])]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1}),e(m,null,{default:t(()=>[e(u,{cols:"12"},{default:t(()=>[xe,e(ce,null,{default:t(()=>[(x(!0),B(R,null,le(l.value.reviews,o=>(x(),ue(de,{key:o._id},{default:t(()=>[e(z,null,{default:t(()=>[e(m,null,{default:t(()=>[e(u,{cols:"auto"},{default:t(()=>[e(me,{style:{fontSize:"30px"}},{default:t(()=>[L(p(o.user.account),1)]),_:2},1024)]),_:2},1024),e(u,{cols:"auto"},{default:t(()=>[e(ve,null,{default:t(()=>[e(A,{modelValue:o.rating,"onUpdate:modelValue":n=>o.rating=n,color:"#4d4637 darken-3",size:"25",readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1024),e(m,null,{default:t(()=>[e(u,{cols:"auto"},{default:t(()=>[e(fe,{class:"mb-5",style:{fontSize:"20px"}},{default:t(()=>[L(p(o.comment),1)]),_:2},1024)]),_:2},1024),e(u,{class:"d-flex justify-end"})]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(te,{modelValue:P.value,"onUpdate:modelValue":a[6]||(a[6]=o=>P.value=o),"max-width":"290"},{default:t(()=>[e(M,{disabled:h.value,onSubmit:D(k(U),["prevent"])},{default:t(()=>[e(z,null,{default:t(()=>[e(se,null,{default:t(()=>[Fe]),_:1}),e(ne,null,{default:t(()=>[e(A,{modelValue:f.value.rating,"onUpdate:modelValue":a[3]||(a[3]=o=>f.value.rating=o),color:"#4d4637 darken-3",hover:""},null,8,["modelValue"]),e(q,{modelValue:f.value.comment,"onUpdate:modelValue":a[4]||(a[4]=o=>f.value.comment=o),label:"你的書評",required:""},null,8,["modelValue"])]),_:1}),e(T,null,{default:t(()=>[e(F,{color:"#4d4637",onClick:a[5]||(a[5]=o=>k(Z)(s.review)),loading:h.value},{default:t(()=>[L("修正")]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1},8,["modelValue"])],64))}};export{De as default};
