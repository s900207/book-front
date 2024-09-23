import{p as ae,g as te,o as _,t as f,aM as le,q as oe,u as se,c as o,a2 as re,G,X as ue,x as g,$ as ne,a0 as r,a5 as de,as as k,aA as ie,V as me,J as D,a8 as T,ax as ce,ap as pe,al as ge,az as ve,ao as be,a9 as Ve,ab as fe}from"./index-b4a74277.js";import{V as ye}from"./VContainer-be093c81.js";import{V as Pe}from"./VCol-989ff7f0.js";import{m as ke,a as xe,b as he,c as we,d as Te,e as Se,f as Be,u as Ce,p as De,g as Ie,h as Ue,i as qe,j as Ae,k as Fe,l as _e,n as O,o as K,q as j,r as z}from"./VDataTable-1885ed33.js";import{V as Ge}from"./VForm-91c92a52.js";import{V as Re}from"./VTextarea-e37c7ac2.js";import{V as Ee}from"./VRow-a316554e.js";import"./VList-80cb75f0.js";import"./VDivider-4dc62cb6.js";import"./VSelectionControl-193f3040.js";const Le=ae({itemsLength:{type:[Number,String],required:!0},...ke(),...xe(),...he()},"VDataTableServer"),He=te()({name:"VDataTableServer",props:Le(),emits:{"update:modelValue":l=>!0,"update:page":l=>!0,"update:itemsPerPage":l=>!0,"update:sortBy":l=>!0,"update:options":l=>!0,"update:expanded":l=>!0,"update:groupBy":l=>!0},setup(l,x){let{attrs:b,slots:a}=x;const{groupBy:p}=we(l),{sortBy:m,multiSort:h,mustSort:I}=Te(l),{page:v,itemsPerPage:y}=Se(l),P=_(()=>parseInt(l.itemsLength,10)),{columns:V,headers:s}=Be(l,{groupBy:p,showSelect:f(l,"showSelect"),showExpand:f(l,"showExpand")}),{items:d}=Ce(l,V),{toggleSort:S}=De({sortBy:m,multiSort:h,mustSort:I,page:v}),{opened:B,isGroupOpen:U,toggleGroup:C,extractRows:q}=Ie({groupBy:p,sortBy:m}),{pageCount:u,setItemsPerPage:t}=Ue({page:v,itemsPerPage:y,itemsLength:P}),{flatItems:e}=qe(d,p,B),{isSelected:n,select:i,selectAll:A,toggleSelect:J,someSelected:M,allSelected:W}=Ae(l,{allItems:d,currentPage:d}),{isExpanded:X,toggleExpand:Q}=Fe(l),R=_(()=>q(d.value));_e({page:v,itemsPerPage:y,sortBy:m,groupBy:p,search:f(l,"search")}),le("v-data-table",{toggleSort:S,sortBy:m}),oe({VDataTableRows:{hideNoData:f(l,"hideNoData"),noDataText:f(l,"noDataText"),loading:f(l,"loading"),loadingText:f(l,"loadingText")}});const c=_(()=>({page:v.value,itemsPerPage:y.value,sortBy:m.value,pageCount:u.value,toggleSort:S,setItemsPerPage:t,someSelected:M.value,allSelected:W.value,isSelected:n,select:i,selectAll:A,toggleSelect:J,isExpanded:X,toggleExpand:Q,isGroupOpen:U,toggleGroup:C,items:R.value.map(F=>F.raw),internalItems:R.value,groupedItems:e.value,columns:V.value,headers:s.value}));se(()=>{const F=O.filterProps(l),Y=K.filterProps(l),Z=j.filterProps(l),ee=z.filterProps(l);return o(z,G({class:["v-data-table",{"v-data-table--loading":l.loading},l.class],style:l.style},ee),{top:()=>{var w;return(w=a.top)==null?void 0:w.call(a,c.value)},default:()=>{var w,E,L,H,N,$;return a.default?a.default(c.value):o(re,null,[(w=a.colgroup)==null?void 0:w.call(a,c.value),o("thead",{class:"v-data-table__thead",role:"rowgroup"},[o(K,G(Y,{sticky:l.fixedHeader}),a)]),(E=a.thead)==null?void 0:E.call(a,c.value),o("tbody",{class:"v-data-table__tbody",role:"rowgroup"},[(L=a["body.prepend"])==null?void 0:L.call(a,c.value),a.body?a.body(c.value):o(j,G(b,Z,{items:e.value}),a),(H=a["body.append"])==null?void 0:H.call(a,c.value)]),(N=a.tbody)==null?void 0:N.call(a,c.value),($=a.tfoot)==null?void 0:$.call(a,c.value)])},bottom:()=>a.bottom?a.bottom(c.value):o(O,F,{prepend:a["footer.prepend"]})})})}}),Qe={__name:"BookmanagementView",setup(l){const{apiAuth:x}=fe(),b=ue(),a=g(10),p=g([{key:"createdAt",order:"desc"}]),m=g(1),h=g([]),I=[{title:"圖片",align:"center",sortable:!1,key:"image"},{title:"書名",align:"center",sortable:!0,key:"title"},{title:"作者",align:"center",sortable:!0,key:"authors"},{title:"出版者",align:"center",sortable:!0,key:"publisher"},{title:"價格",align:"center",sortable:!0,key:"retailPrice"},{title:"分類",align:"center",sortable:!0,key:"categories"},{title:"編輯",align:"center",sortable:!1,key:"edit"},{title:"刪除",align:"center",sortable:!1,key:"delete"}],v=g(!0),y=g(0),P=g(""),V=g(!1),s=g({_id:"",title:"",authors:"",publisher:"",retailPrice:"",categories:"",description:""}),d=async()=>{var u,t,e,n;v.value=!0;try{const{data:i}=await x.get("/books/all",{params:{page:m.value,itemsPerPage:a.value,sortBy:((u=p.value[0])==null?void 0:u.key)||"createdAt",sortOrder:((t=p.value[0])==null?void 0:t.order)==="asc"?1:-1,search:P.value}});h.value.splice(0,h.value.length,...i.result.data),y.value=i.result.total}catch(i){console.log(i);const A=((n=(e=i==null?void 0:i.response)==null?void 0:e.data)==null?void 0:n.message)||"發生錯誤，請稍後再試";b({text:A,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}v.value=!1};d();const S=async u=>{var t,e;if(console.log(u),!u._id){console.error("沒有書籍 ID");return}try{await x.delete(`/books/${u._id}`),b({text:"書籍已成功刪除",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}}),d()}catch(n){console.log(n);const i=((e=(t=n==null?void 0:n.response)==null?void 0:t.data)==null?void 0:e.message)||"刪除書籍時發生錯誤，請稍後再試";b({text:i,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}},B=()=>{m.value=1,d()},U=u=>{s.value={...u},V.value=!0},C=()=>{V.value=!1},q=async()=>{var u,t;try{await x.patch(`/books/${s.value._id}`,s.value),b({text:"書籍已成功更新",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}}),d(),C()}catch(e){console.log(e);const n=((t=(u=e==null?void 0:e.response)==null?void 0:u.data)==null?void 0:t.message)||"更新書籍時發生錯誤，請稍後再試";b({text:n,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}};return(u,t)=>(de(),ne(ye,null,{default:r(()=>[o(Ee,null,{default:r(()=>[o(Pe,{cols:"12"},{default:r(()=>[o(He,{"items-per-page":a.value,"onUpdate:itemsPerPage":[t[1]||(t[1]=e=>a.value=e),d],"sort-by":p.value,"onUpdate:sortBy":[t[2]||(t[2]=e=>p.value=e),d],page:m.value,"onUpdate:page":[t[3]||(t[3]=e=>m.value=e),d],items:h.value,headers:I,loading:v.value,"items-length":y.value,search:P.value,hover:""},{top:r(()=>[o(k,{label:"搜尋","append-icon":"mdi-magnify",modelValue:P.value,"onUpdate:modelValue":t[0]||(t[0]=e=>P.value=e),"onClick:append":B,onKeydown:ie(B,["enter"])},null,8,["modelValue"])]),"item.image":r(({item:e})=>[o(me,{src:e.image},null,8,["src"])]),"item.edit":r(({item:e})=>[o(D,{onClick:n=>U(e)},{default:r(()=>[T("編輯")]),_:2},1032,["onClick"])]),"item.delete":r(({item:e})=>[o(D,{onClick:n=>S(e)},{default:r(()=>[T("刪除")]),_:2},1032,["onClick"])]),_:2},1032,["items-per-page","sort-by","page","items","loading","items-length","search"]),o(ce,{modelValue:V.value,"onUpdate:modelValue":t[10]||(t[10]=e=>V.value=e),persistent:"","max-width":"600px"},{default:r(()=>[o(pe,null,{default:r(()=>[o(ge,null,{default:r(()=>[T("編輯書籍")]),_:1}),o(ve,null,{default:r(()=>[o(Ge,{ref:"editForm"},{default:r(()=>[o(k,{modelValue:s.value.title,"onUpdate:modelValue":t[4]||(t[4]=e=>s.value.title=e),label:"書名",required:""},null,8,["modelValue"]),o(k,{modelValue:s.value.authors,"onUpdate:modelValue":t[5]||(t[5]=e=>s.value.authors=e),label:"作者",required:""},null,8,["modelValue"]),o(k,{modelValue:s.value.publisher,"onUpdate:modelValue":t[6]||(t[6]=e=>s.value.publisher=e),label:"出版者",required:""},null,8,["modelValue"]),o(k,{modelValue:s.value.retailPrice,"onUpdate:modelValue":t[7]||(t[7]=e=>s.value.retailPrice=e),label:"價格",required:"",type:"number"},null,8,["modelValue"]),o(k,{modelValue:s.value.categories,"onUpdate:modelValue":t[8]||(t[8]=e=>s.value.categories=e),label:"分類",required:""},null,8,["modelValue"]),o(Re,{modelValue:s.value.description,"onUpdate:modelValue":t[9]||(t[9]=e=>s.value.description=e),label:"簡介",rows:"5"},null,8,["modelValue"])]),_:1},512)]),_:1}),o(be,null,{default:r(()=>[o(Ve),o(D,{color:"blue darken-1",text:"",onClick:C},{default:r(()=>[T("取消")]),_:1}),o(D,{color:"blue darken-1",text:"",onClick:q},{default:r(()=>[T("保存")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{Qe as default};
