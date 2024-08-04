import{Y as P,Z as q,X as S,x as f,o as g,A,a0 as D,a2 as I,a3 as l,ab as N,c as o,V as $,J as u,a8 as v,aa as y,an as _}from"./index-31ee1f4e.js";import{V as T}from"./VContainer-6dd4e90d.js";import{V as b}from"./VCol-b032b8d3.js";import{V as J}from"./VDivider-2c614de3.js";import{V as L}from"./VDataTable-9d442f82.js";import"./VList-1dd7995f.js";import"./VSelectionControl-26a013fd.js";const M=_("h1",null,"購物車",-1),F={__name:"CartView",setup(R){const{apiAuth:d}=N(),r=P(),m=q(),h=S(),n=f([]),x=[{align:"center",sortable:!1,value:"name"},{title:"書本圖片",key:"book.image"},{title:"書本名稱",key:"book.title"},{title:"單價",key:"book.retailPrice"},{title:"數量",key:"quantity"},{title:"總價",key:"total",value:e=>e.book.retailPrice*e.quantity},{title:"操作",key:"action"}],C=g(()=>n.value.reduce((e,a)=>e+a.quantity*a.book.retailPrice,0)),k=async(e,a)=>{var t,s;if(!m.isLogin){h.push("/login");return}try{const{data:i}=await d.patch("/users/cart",{book:e,quantity:a});m.cart=i.result,r({text:"新增成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}});const c=n.value.findIndex(B=>B.book._id===e);n.value[c].quantity+=a,n.value[c].quantity<=0&&n.value.splice(c,1)}catch(i){const c=((s=(t=i==null?void 0:i.response)==null?void 0:t.data)==null?void 0:s.message)||"發生錯誤，請稍後再試";r({text:c,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}},V=g(()=>n.value.length>0),p=f(!1),w=async()=>{var e,a;p.value=!0;try{await d.post("/orders"),m.cart=0,h.push("/orders"),r({text:"結帳成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}})}catch(t){const s=((a=(e=t==null?void 0:t.response)==null?void 0:e.data)==null?void 0:a.message)||"發生錯誤，請稍後再試";r({text:s,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}p.value=!1};return A(async()=>{var e,a;try{const{data:t}=await d.get("/users/cart");n.value.push(...t.result)}catch(t){const s=((a=(e=t==null?void 0:t.response)==null?void 0:e.data)==null?void 0:a.message)||"發生錯誤，請稍後再試";r({text:s,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}}),(e,a)=>(D(),I(T,null,{default:l(()=>[o(b,{cols:"12"},{default:l(()=>[M]),_:1}),o(J),o(b,{cols:"12"},{default:l(()=>[o(L,{items:n.value,headers:x},{"item.book.image":l(({item:t})=>[o($,{src:t.book.image,alt:"Book Image","max-height":"100","max-width":"60"},null,8,["src"])]),"item.quantity":l(({item:t})=>[o(u,{variant:"text",icon:"mdi-minus",color:"red",onClick:s=>k(t.book._id,-1)},null,8,["onClick"]),v(y(t.quantity),1),o(u,{variant:"text",icon:"mdi-plus",color:"green",onClick:s=>k(t.book._id,1)},null,8,["onClick"])]),"item.action":l(({item:t})=>[o(u,{variant:"text",icon:"mdi-delete",color:"red",onClick:s=>k(t.book._id,t.quantity*-1)},null,8,["onClick"])]),_:2},1032,["items"])]),_:1}),o(b,{class:"text-center",cols:"12"},{default:l(()=>[_("p",null,"總金額: "+y(C.value),1),o(u,{color:"green",disabled:!V.value,loading:p.value,onClick:w},{default:l(()=>[v("結帳")]),_:1},8,["disabled","loading"])]),_:1})]),_:1}))}};export{F as default};
