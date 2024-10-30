import{U as L,x as w,Z as j,$ as s,af as z,a4 as A,c as e,au as i,bH as T,aB as K,a7 as N,aa as _,ax as D,a6 as t,as as B,V as E,ap as H,ar as Z,a9 as G,ae as J,bI as O}from"./index-dd7cdd41.js";import{c as Q,a as x,d as W}from"./index.esm-3d8b24aa.js";import{u as X,a as r}from"./vee-validate.esm-a4bb5d3f.js";import{V as Y}from"./VContainer-74679723.js";import{V as m}from"./VCol-44925eb8.js";import{V}from"./VRow-0021947d.js";import{V as ee}from"./VForm-8c0641d2.js";import{V as ae}from"./VTextarea-ef6a5f6c.js";const le=J("h1",{class:"text-center"},"引入書籍",-1),ce={__name:"ImportView",setup(oe){const{apiAuth:k}=z(),y=L(),P=w(!1),I=w(!1),d=w(""),U=Q({title:x().required("缺少商品名稱"),publisher:x().required("缺少出版者"),retailPrice:W().typeError("商品價格格式錯誤").required("缺少商品價格").min(0,"商品價格不能小於 0"),description:x().required("缺少簡介")}),{handleSubmit:S}=X({validationSchema:U,initialValues:{title:"",authors:"",publisher:"",retailPrice:"",categories:"",description:"",image:"",maturityRating:"",buyLink:""}}),c=r("title"),v=r("authors"),p=r("publisher"),f=r("retailPrice"),h=r("categories"),g=r("description"),b=r("image"),M=r("maturityRating"),R=r("buyLink"),$=S(async n=>{var l,a;console.log(n);try{const u=new FormData;for(const o in n)u.append(o,n[o]);if(b.value.value){const q=await(await fetch(b.value.value,{mode:"cors"})).blob(),F=await k.post("/upload/cloudinary",{file:q});u.append("image",F.data.url)}await k.post("/books",u),y({text:"新增成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}})}catch(u){console.log(u);const o=((a=(l=u==null?void 0:u.response)==null?void 0:l.data)==null?void 0:a.message)||"發生錯誤，請稍後再試";y({text:o,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}}),C=async()=>{var n,l;if(d.value.trim())try{const a=/^\d{10}(\d{3})?$/.test(d.value),u=encodeURIComponent(d.value.trim()),{data:o}=await O.get(`https://www.googleapis.com/books/v1/volumes?q=${a?"isbn":"intitle"}:${u}`);console.log(o),o&&o.items&&o.items.length>0&&(c.value.value=o.items[0].volumeInfo.title,v.value.value=o.items[0].volumeInfo.authors,p.value.value=o.items[0].volumeInfo.publisher,f.value.value=o.items[0].saleInfo.retailPrice?o.items[0].saleInfo.retailPrice.amount:null,h.value.value=o.items[0].volumeInfo.categories,g.value.value=o.items[0].volumeInfo.description,b.value.value=o.items[0].volumeInfo.imageLinks.thumbnail.replace("http://","https://").replace("img=1&zoom=1","img=1&zoom=2").replace("edge=curl",""),M.value.value=o.items[0].volumeInfo.maturityRating,R.value.value=o.items[0].saleInfo.buyLink,y({text:"引入成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}}))}catch(a){console.error(a);const u=((l=(n=a==null?void 0:a.response)==null?void 0:n.data)==null?void 0:l.message)||"查無此書";y({text:u,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}}),c.value.value="",v.value.value="",p.value.value="",f.value.value="",h.value.value="",g.value.value="",b.value.value=""}};return(n,l)=>(A(),j(Y,null,{default:s(()=>[e(V,null,{default:s(()=>[e(m,{cols:"12"},{default:s(()=>[le]),_:1})]),_:1}),e(_,null,{default:s(()=>[e(V,null,{default:s(()=>[e(m,null,{default:s(()=>[e(i,{class:"mx-auto mt-5",modelValue:d.value,"onUpdate:modelValue":l[0]||(l[0]=a=>d.value=a),density:"comfortable","menu-icon":"",placeholder:"請輸入書籍名稱或13碼的isbn進行搜尋",rounded:"",theme:"light",variant:"solo",style:T({width:P.value?"100%":"500px"}),"onClick:append":C,onKeydown:K(C,["enter"])},{"prepend-inner":s(()=>[e(N,{href:"#icon-magnify"})]),_:1},8,["modelValue","style"])]),_:1})]),_:1})]),_:1}),e(V,null,{default:s(()=>[e(m,{class:"d-flex justify-center",cols:"12"},{default:s(()=>[e(ee,{disabled:I.value,onSubmit:D(t($),["prevent"])},{default:s(()=>[e(B,null,{default:s(()=>[e(V,{class:"flex justify-center align-center"},{default:s(()=>[e(m,null,{default:s(()=>[e(B,{class:"d-flex justify-center align-center",outlined:""}),e(E,{src:t(b).value.value,width:"300px",cover:"",readonly:""},null,8,["src"])]),_:1}),e(m,{class:"me-2"},{default:s(()=>[e(H),e(i,{label:"書本名稱",modelValue:t(c).value.value,"onUpdate:modelValue":l[1]||(l[1]=a=>t(c).value.value=a),width:300,"error-messages":t(c).errorMessage.value},null,8,["modelValue","error-messages"]),e(i,{label:"作者",modelValue:t(v).value.value,"onUpdate:modelValue":l[2]||(l[2]=a=>t(v).value.value=a),"error-messages":t(v).errorMessage.value},null,8,["modelValue","error-messages"]),e(i,{label:"出版者",modelValue:t(p).value.value,"onUpdate:modelValue":l[3]||(l[3]=a=>t(p).value.value=a),"error-messages":t(p).errorMessage.value},null,8,["modelValue","error-messages"]),e(i,{label:"價格",modelValue:t(f).value.value,"onUpdate:modelValue":l[4]||(l[4]=a=>t(f).value.value=a),"error-messages":t(f).errorMessage.value},null,8,["modelValue","error-messages"]),e(i,{label:"分類",modelValue:t(h).value.value,"onUpdate:modelValue":l[5]||(l[5]=a=>t(h).value.value=a)},null,8,["modelValue"]),e(ae,{label:"簡介",modelValue:t(g).value.value,"onUpdate:modelValue":l[6]||(l[6]=a=>t(g).value.value=a),"error-messages":t(g).errorMessage.value},null,8,["modelValue","error-messages"]),e(Z)]),_:1})]),_:1})]),_:1}),e(V,{class:"text-center mb-5",cols:"12"},{default:s(()=>[e(m,null,{default:s(()=>[e(_),e(G,{color:"green",type:"submit",loading:I.value},null,8,["loading"])]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1})]),_:1}))}};export{ce as default};
