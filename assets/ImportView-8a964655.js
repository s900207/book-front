import{U as q,x,Z as F,$ as s,af as L,a4 as T,c as e,au as i,bH as j,aB as z,a7 as A,aa as C,ax as N,a6 as o,as as U,V as K,ap as D,ar as E,a9 as H,a8 as Z,ae as G,bI as J}from"./index-0c5b23d9.js";import{c as O,a as w,d as Q}from"./index.esm-3d8b24aa.js";import{u as W,a as r}from"./vee-validate.esm-fe90fd8d.js";import{V as X}from"./VContainer-d913b096.js";import{V as m}from"./VCol-a281f719.js";import{V}from"./VRow-c7433197.js";import{V as Y}from"./VForm-0afee63b.js";import{V as ee}from"./VTextarea-4d1a9960.js";const ae=G("h1",{class:"text-center"},"引入書籍",-1),de={__name:"ImportView",setup(le){const{apiAuth:k}=L(),y=q(),B=x(!1),I=x(!1),d=x(""),P=O({title:w().required("缺少商品名稱"),publisher:w().required("缺少出版者"),retailPrice:Q().typeError("商品價格格式錯誤").required("缺少商品價格").min(0,"商品價格不能小於 0"),description:w().required("缺少簡介")}),{handleSubmit:S}=W({validationSchema:P,initialValues:{title:"",authors:"",publisher:"",retailPrice:"",categories:"",description:"",image:"",maturityRating:"",buyLink:""}}),c=r("title"),v=r("authors"),p=r("publisher"),f=r("retailPrice"),h=r("categories"),g=r("description"),b=r("image"),M=r("maturityRating"),R=r("buyLink"),_=async()=>{var n,t;if(d.value.trim())try{const a=/^\d{10}(\d{3})?$/.test(d.value),u=encodeURIComponent(d.value.trim()),{data:l}=await J.get(`https://www.googleapis.com/books/v1/volumes?q=${a?"isbn":"intitle"}:${u}`);console.log(l),l&&l.items&&l.items.length>0&&(c.value.value=l.items[0].volumeInfo.title,v.value.value=l.items[0].volumeInfo.authors,p.value.value=l.items[0].volumeInfo.publisher,f.value.value=l.items[0].saleInfo.retailPrice?l.items[0].saleInfo.retailPrice.amount:null,h.value.value=l.items[0].volumeInfo.categories,g.value.value=l.items[0].volumeInfo.description,b.value.value=l.items[0].volumeInfo.imageLinks.thumbnail.replace("http://","https://").replace("img=1&zoom=1","img=1&zoom=2").replace("edge=curl",""),M.value.value=l.items[0].volumeInfo.maturityRating,R.value.value=l.items[0].saleInfo.buyLink,y({text:"引入成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}}))}catch(a){console.error(a);const u=((t=(n=a==null?void 0:a.response)==null?void 0:n.data)==null?void 0:t.message)||"查無此書";y({text:u,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}}),c.value.value="",v.value.value="",p.value.value="",f.value.value="",h.value.value="",g.value.value="",b.value.value=""}},$=S(async n=>{var t,a;console.log(n);try{const u=new FormData;for(const l in n)u.append(l,n[l]);if(b.value.value){const l=await k.post("/upload",{imageUrl:b.value.value});l.data.secure_url&&u.append("imageUrl",l.data.secure_url)}await k.post("/books",u),y({text:"新增成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}})}catch(u){console.log(u);const l=((a=(t=u==null?void 0:u.response)==null?void 0:t.data)==null?void 0:a.message)||"發生錯誤，請稍後再試";y({text:l,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}});return(n,t)=>(T(),F(X,null,{default:s(()=>[e(V,null,{default:s(()=>[e(m,{cols:"12"},{default:s(()=>[ae]),_:1})]),_:1}),e(C,null,{default:s(()=>[e(V,null,{default:s(()=>[e(m,null,{default:s(()=>[e(i,{class:"mx-auto mt-5",modelValue:d.value,"onUpdate:modelValue":t[0]||(t[0]=a=>d.value=a),density:"comfortable","menu-icon":"",placeholder:"請輸入書籍名稱或13碼的isbn進行搜尋",rounded:"",theme:"light",variant:"solo",style:j({width:B.value?"100%":"500px"}),"onClick:append":_,onKeydown:z(_,["enter"])},{"prepend-inner":s(()=>[e(A,{href:"#icon-magnify"})]),_:1},8,["modelValue","style"])]),_:1})]),_:1})]),_:1}),e(V,null,{default:s(()=>[e(m,{class:"d-flex justify-center",cols:"12"},{default:s(()=>[e(Y,{disabled:I.value,onSubmit:N(o($),["prevent"])},{default:s(()=>[e(U,null,{default:s(()=>[e(V,{class:"flex justify-center align-center"},{default:s(()=>[e(m,null,{default:s(()=>[e(U,{class:"d-flex justify-center align-center",outlined:""}),e(K,{src:o(b).value.value,width:"300px",cover:"",readonly:""},null,8,["src"])]),_:1}),e(m,{class:"me-2"},{default:s(()=>[e(D),e(i,{label:"書本名稱",modelValue:o(c).value.value,"onUpdate:modelValue":t[1]||(t[1]=a=>o(c).value.value=a),width:300,"error-messages":o(c).errorMessage.value},null,8,["modelValue","error-messages"]),e(i,{label:"作者",modelValue:o(v).value.value,"onUpdate:modelValue":t[2]||(t[2]=a=>o(v).value.value=a),"error-messages":o(v).errorMessage.value},null,8,["modelValue","error-messages"]),e(i,{label:"出版者",modelValue:o(p).value.value,"onUpdate:modelValue":t[3]||(t[3]=a=>o(p).value.value=a),"error-messages":o(p).errorMessage.value},null,8,["modelValue","error-messages"]),e(i,{label:"價格",modelValue:o(f).value.value,"onUpdate:modelValue":t[4]||(t[4]=a=>o(f).value.value=a),"error-messages":o(f).errorMessage.value},null,8,["modelValue","error-messages"]),e(i,{label:"分類",modelValue:o(h).value.value,"onUpdate:modelValue":t[5]||(t[5]=a=>o(h).value.value=a)},null,8,["modelValue"]),e(ee,{label:"簡介",modelValue:o(g).value.value,"onUpdate:modelValue":t[6]||(t[6]=a=>o(g).value.value=a),"error-messages":o(g).errorMessage.value},null,8,["modelValue","error-messages"]),e(E)]),_:1})]),_:1})]),_:1}),e(V,{class:"text-center mb-5",cols:"12"},{default:s(()=>[e(m,null,{default:s(()=>[e(C),e(H,{color:"green",type:"submit",loading:I.value},{default:s(()=>[Z("送出")]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1})]),_:1}))}};export{de as default};
