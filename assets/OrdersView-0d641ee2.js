import{Y as f,x as k,A as V,a0 as l,a2 as h,a3 as t,ab as y,c as s,a8 as b,aa as c,an as d,a1 as n,a6 as w,a5 as x}from"./index-31ee1f4e.js";import{V as A}from"./VContainer-6dd4e90d.js";import{V as u}from"./VCol-b032b8d3.js";import{V as g}from"./VDataTable-9d442f82.js";import{V as B}from"./VRow-dcbc69e6.js";import"./VList-1dd7995f.js";import"./VDivider-2c614de3.js";import"./VSelectionControl-26a013fd.js";const C=d("h1",null,"訂單",-1),F={__name:"OrdersView",setup(v){const{apiAuth:m}=y(),p=f(),i=k([]),_=[{title:"訂單編號",key:"_id"},{title:"日期",key:"createdAt"},{title:"商品",key:"cart",sortable:!1},{title:"金額",key:"price",sortable:!1,value:a=>a.cart.reduce((r,e)=>r+e.quantity*e.book.retailPrice,0)}];return V(async()=>{var a,r;try{const{data:e}=await m.get("/orders");i.value.push(...e.result)}catch(e){const o=((r=(a=e==null?void 0:e.response)==null?void 0:a.data)==null?void 0:r.message)||"發生錯誤，請稍後再試";p({text:o,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}}),(a,r)=>(l(),h(A,null,{default:t(()=>[s(B,null,{default:t(()=>[s(u,{cols:"12"},{default:t(()=>[C]),_:1}),s(u,{cols:"12"},{default:t(()=>[s(g,{items:i.value,headers:_},{"item.createdAt":t(({item:e})=>[b(c(new Date(e.createdAt).toLocaleString()),1)]),"item.cart":t(({item:e})=>[d("ul",null,[(l(!0),n(x,null,w(e.cart,o=>(l(),n("li",{key:o._id},c(o.book.title)+" * "+c(o.quantity),1))),128))])]),_:2},1032,["items"])]),_:1})]),_:1})]),_:1}))}};export{F as default};
