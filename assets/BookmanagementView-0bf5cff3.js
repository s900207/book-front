import{p as X,g as Y,o as B,t as p,aO as ee,q as ae,u as te,c as l,U as oe,G as D,L as le,x as v,P as se,R as re,S as b,af as ne,ao as ue,V as de,J as ie,Z as ce,a0 as me}from"./index-be7a6887.js";import{V as ge}from"./VContainer-12b5a0e6.js";import{a as pe,V as ve}from"./VRow-438e5831.js";import{m as be,a as ye,b as Pe,c as fe,d as he,e as ke,f as Ve,u as Se,p as Te,g as we,h as xe,i as Be,j as De,k as Ie,l as Ce,n as F,o as E,q as H,r as N}from"./VDataTable-f42b9c9f.js";import"./VList-ec931b5b.js";import"./VDivider-72d8773d.js";import"./VSelectionControl-62695869.js";const _e=X({itemsLength:{type:[Number,String],required:!0},...be(),...ye(),...Pe()},"VDataTableServer"),Re=Y()({name:"VDataTableServer",props:_e(),emits:{"update:modelValue":a=>!0,"update:page":a=>!0,"update:itemsPerPage":a=>!0,"update:sortBy":a=>!0,"update:options":a=>!0,"update:expanded":a=>!0,"update:groupBy":a=>!0},setup(a,V){let{attrs:f,slots:e}=V;const{groupBy:i}=fe(a),{sortBy:r,multiSort:h,mustSort:S}=he(a),{page:m,itemsPerPage:y}=ke(a),P=B(()=>parseInt(a.itemsLength,10)),{columns:c,headers:T}=Ve(a,{groupBy:i,showSelect:p(a,"showSelect"),showExpand:p(a,"showExpand")}),{items:g}=Se(a,c),{toggleSort:n}=Te({sortBy:r,multiSort:h,mustSort:S,page:m}),{opened:o,isGroupOpen:t,toggleGroup:u,extractRows:s}=we({groupBy:i,sortBy:r}),{pageCount:w,setItemsPerPage:U}=xe({page:m,itemsPerPage:y,itemsLength:P}),{flatItems:I}=Be(g,i,o),{isSelected:O,select:q,selectAll:K,toggleSelect:$,someSelected:j,allSelected:J}=De(a,{allItems:g,currentPage:g}),{isExpanded:W,toggleExpand:Z}=Ie(a),C=B(()=>s(g.value));Ce({page:m,itemsPerPage:y,sortBy:r,groupBy:i,search:p(a,"search")}),ee("v-data-table",{toggleSort:n,sortBy:r}),ae({VDataTableRows:{hideNoData:p(a,"hideNoData"),noDataText:p(a,"noDataText"),loading:p(a,"loading"),loadingText:p(a,"loadingText")}});const d=B(()=>({page:m.value,itemsPerPage:y.value,sortBy:r.value,pageCount:w.value,toggleSort:n,setItemsPerPage:U,someSelected:j.value,allSelected:J.value,isSelected:O,select:q,selectAll:K,toggleSelect:$,isExpanded:W,toggleExpand:Z,isGroupOpen:t,toggleGroup:u,items:C.value.map(x=>x.raw),internalItems:C.value,groupedItems:I.value,columns:c.value,headers:T.value}));te(()=>{const x=F.filterProps(a),z=E.filterProps(a),M=H.filterProps(a),Q=N.filterProps(a);return l(N,D({class:["v-data-table",{"v-data-table--loading":a.loading},a.class],style:a.style},Q),{top:()=>{var k;return(k=e.top)==null?void 0:k.call(e,d.value)},default:()=>{var k,_,R,G,L,A;return e.default?e.default(d.value):l(oe,null,[(k=e.colgroup)==null?void 0:k.call(e,d.value),l("thead",{class:"v-data-table__thead",role:"rowgroup"},[l(E,D(z,{sticky:a.fixedHeader}),e)]),(_=e.thead)==null?void 0:_.call(e,d.value),l("tbody",{class:"v-data-table__tbody",role:"rowgroup"},[(R=e["body.prepend"])==null?void 0:R.call(e,d.value),e.body?e.body(d.value):l(H,D(f,M,{items:I.value}),e),(G=e["body.append"])==null?void 0:G.call(e,d.value)]),(L=e.tbody)==null?void 0:L.call(e,d.value),(A=e.tfoot)==null?void 0:A.call(e,d.value)])},bottom:()=>e.bottom?e.bottom(d.value):l(F,x,{prepend:e["footer.prepend"]})})})}}),Ue={__name:"BookmanagementView",setup(a){const{apiAuth:V}=me(),f=le(),e=v(10),i=v([{key:"createdAt",order:"desc"}]),r=v(1),h=v([]),S=[{title:"圖片",align:"center",sortable:!1,key:"image"},{title:"書名",align:"center",sortable:!0,key:"title"},{title:"作者",align:"center",sortable:!0,key:"authors"},{title:"出版者",align:"center",sortable:!0,key:"publisher"},{title:"價格",align:"center",sortable:!0,key:"retailPrice"},{title:"分類",align:"center",sortable:!0,key:"categories"},{title:"刪除",align:"center",sortable:!1,key:"delete"}],m=v(!0),y=v(0),P=v(""),c=async()=>{var n,o,t,u;m.value=!0;try{const{data:s}=await V.get("/books/all",{params:{page:r.value,itemsPerPage:e.value,sortBy:((n=i.value[0])==null?void 0:n.key)||"createdAt",sortOrder:((o=i.value[0])==null?void 0:o.order)==="asc"?1:-1,search:P.value}});h.value.splice(0,h.value.length,...s.result.data),y.value=s.result.total}catch(s){console.log(s);const w=((u=(t=s==null?void 0:s.response)==null?void 0:t.data)==null?void 0:u.message)||"發生錯誤，請稍後再試";f({text:w,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}m.value=!1};c();const T=async n=>{var o,t;if(console.log(n),!n._id){console.error("沒有書籍 ID");return}try{await V.delete(`/books/${n._id}`),f({text:"書籍已成功刪除",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}}),c()}catch(u){console.log(u);const s=((t=(o=u==null?void 0:u.response)==null?void 0:o.data)==null?void 0:t.message)||"刪除書籍時發生錯誤，請稍後再試";f({text:s,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}},g=()=>{r.value=1,c()};return(n,o)=>(se(),re(ge,null,{default:b(()=>[l(ve,null,{default:b(()=>[l(pe,{cols:"12"},{default:b(()=>[l(Re,{"items-per-page":e.value,"onUpdate:itemsPerPage":[o[1]||(o[1]=t=>e.value=t),c],"sort-by":i.value,"onUpdate:sortBy":[o[2]||(o[2]=t=>i.value=t),c],page:r.value,"onUpdate:page":[o[3]||(o[3]=t=>r.value=t),c],items:h.value,headers:S,loading:m.value,"items-length":y.value,search:P.value,hover:""},{top:b(()=>[l(ne,{label:"搜尋","append-icon":"mdi-magnify",modelValue:P.value,"onUpdate:modelValue":o[0]||(o[0]=t=>P.value=t),"onClick:append":g,onKeydown:ue(g,["enter"])},null,8,["modelValue"])]),"item.image":b(({item:t})=>[l(de,{src:t.image},null,8,["src"])]),"item.delete":b(({item:t})=>[l(ie,{onClick:u=>T(t)},{default:b(()=>[ce("刪除")]),_:2},1032,["onClick"])]),_:2},1032,["items-per-page","sort-by","page","items","loading","items-length","search"])]),_:1})]),_:1})]),_:1}))}};export{Ue as default};