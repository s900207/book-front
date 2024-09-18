import{Y as $,x,a0 as q,a2 as L,a3 as s,ab as T,c as e,as as i,bF as j,az as z,a9 as C,av as A,a7 as o,ap as _,V as N,al as K,ao as D,J as E,a8 as G,an as J,bG as Y}from"./index-36b314a2.js";import{c as H,a as w,d as O}from"./index.esm-3d8b24aa.js";import{u as Q,a as r}from"./vee-validate.esm-0dcf860d.js";import{V as W}from"./VContainer-ab880846.js";import{V as m}from"./VCol-306208bc.js";import{V as b}from"./VRow-9ed4fb13.js";import{V as X}from"./VForm-7c0ecd74.js";import{V as Z}from"./VTextarea-f74a38ba.js";import"https://s900207.github.io/book-front/assets/materialdesignicons-webfont-61e8aba5.ttf";import"https://s900207.github.io/book-front/assets/materialdesignicons-webfont-a5928a0d.woff";import"https://s900207.github.io/book-front/assets/materialdesignicons-webfont-662fefa8.woff2";const ee=J("h1",{class:"text-center"},"引入書籍",-1),ve={__name:"ImportView",setup(ae){const{apiAuth:P}=T(),V=$(),B=x(!1),k=x(!1),d=x(""),S=H({title:w().required("缺少商品名稱"),publisher:w().required("缺少出版者"),retailPrice:O().typeError("商品價格格式錯誤").required("缺少商品價格").min(0,"商品價格不能小於 0"),description:w().required("缺少簡介")}),{handleSubmit:U}=Q({validationSchema:S,initialValues:{title:"",authors:"",publisher:"",retailPrice:"",categories:"",description:"",image:"",maturityRating:"",buyLink:""}}),c=r("title"),v=r("authors"),p=r("publisher"),f=r("retailPrice"),y=r("categories"),g=r("description"),h=r("image"),M=r("maturityRating"),F=r("buyLink"),R=U(async n=>{var l,a;console.log(n);try{const u=new FormData;for(const t in n)u.append(t,n[t]);await P.post("/books",u),V({text:"新增成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}})}catch(u){console.log(u);const t=((a=(l=u==null?void 0:u.response)==null?void 0:l.data)==null?void 0:a.message)||"發生錯誤，請稍後再試";V({text:t,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}}),I=async()=>{var n,l;if(d.value.trim())try{const a=/^\d{10}(\d{3})?$/.test(d.value),u=encodeURIComponent(d.value.trim()),{data:t}=await Y.get(`https://www.googleapis.com/books/v1/volumes?q=${a?"isbn":"intitle"}:${u}`);console.log(t),t&&t.items&&t.items.length>0&&(c.value.value=t.items[0].volumeInfo.title,v.value.value=t.items[0].volumeInfo.authors,p.value.value=t.items[0].volumeInfo.publisher,f.value.value=t.items[0].saleInfo.retailPrice?t.items[0].saleInfo.retailPrice.amount:null,y.value.value=t.items[0].volumeInfo.categories,g.value.value=t.items[0].volumeInfo.description,h.value.value=t.items[0].volumeInfo.imageLinks.thumbnail.replace("http://","https://").replace("img=1&zoom=1","img=2").replace("edge=curl",""),M.value.value=t.items[0].volumeInfo.maturityRating,F.value.value=t.items[0].saleInfo.buyLink,V({text:"引入成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}}))}catch(a){console.error(a);const u=((l=(n=a==null?void 0:a.response)==null?void 0:n.data)==null?void 0:l.message)||"查無此書";V({text:u,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}}),c.value.value="",v.value.value="",p.value.value="",f.value.value="",y.value.value="",g.value.value="",h.value.value=""}};return(n,l)=>(q(),L(W,null,{default:s(()=>[e(b,null,{default:s(()=>[e(m,{cols:"12"},{default:s(()=>[ee]),_:1})]),_:1}),e(C,null,{default:s(()=>[e(b,null,{default:s(()=>[e(m,null,{default:s(()=>[e(i,{class:"mx-auto mt-5",modelValue:d.value,"onUpdate:modelValue":l[0]||(l[0]=a=>d.value=a),density:"comfortable","menu-icon":"",placeholder:"請輸入書籍名稱或13碼的isbn進行搜尋","prepend-inner-icon":"mdi-magnify",rounded:"",theme:"light",variant:"solo",style:j({width:B.value?"100%":"500px"}),"onClick:append":I,onKeydown:z(I,["enter"])},null,8,["modelValue","style"])]),_:1})]),_:1})]),_:1}),e(b,null,{default:s(()=>[e(m,{class:"d-flex justify-center",cols:"12"},{default:s(()=>[e(X,{disabled:k.value,onSubmit:A(o(R),["prevent"])},{default:s(()=>[e(_,null,{default:s(()=>[e(b,{class:"flex justify-center align-center"},{default:s(()=>[e(m,null,{default:s(()=>[e(_,{class:"d-flex justify-center align-center",outlined:""}),e(N,{src:o(h).value.value,width:"300px",cover:"",readonly:""},null,8,["src"])]),_:1}),e(m,{class:"me-2"},{default:s(()=>[e(K),e(i,{label:"書本名稱",modelValue:o(c).value.value,"onUpdate:modelValue":l[1]||(l[1]=a=>o(c).value.value=a),width:300,"error-messages":o(c).errorMessage.value},null,8,["modelValue","error-messages"]),e(i,{label:"作者",modelValue:o(v).value.value,"onUpdate:modelValue":l[2]||(l[2]=a=>o(v).value.value=a),"error-messages":o(v).errorMessage.value},null,8,["modelValue","error-messages"]),e(i,{label:"出版者",modelValue:o(p).value.value,"onUpdate:modelValue":l[3]||(l[3]=a=>o(p).value.value=a),"error-messages":o(p).errorMessage.value},null,8,["modelValue","error-messages"]),e(i,{label:"價格",modelValue:o(f).value.value,"onUpdate:modelValue":l[4]||(l[4]=a=>o(f).value.value=a),"error-messages":o(f).errorMessage.value},null,8,["modelValue","error-messages"]),e(i,{label:"分類",modelValue:o(y).value.value,"onUpdate:modelValue":l[5]||(l[5]=a=>o(y).value.value=a)},null,8,["modelValue"]),e(Z,{label:"簡介",modelValue:o(g).value.value,"onUpdate:modelValue":l[6]||(l[6]=a=>o(g).value.value=a),"error-messages":o(g).errorMessage.value},null,8,["modelValue","error-messages"]),e(D)]),_:1})]),_:1})]),_:1}),e(b,{class:"text-center mb-5",cols:"12"},{default:s(()=>[e(m,null,{default:s(()=>[e(C),e(E,{color:"green",type:"submit",loading:k.value},{default:s(()=>[G("送出")]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1})]),_:1}))}};export{ve as default};
