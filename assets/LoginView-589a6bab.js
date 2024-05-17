import{I as x,J as S,K as k,N as B,P as y,Q as r,_ as C,c as e,U as a,ag as F,ad as i,H as N,X as U,ah as M}from"./index-515d7cab.js";import{u as P,a as m,V as q}from"./vee-validate.esm-4d263e8b.js";import{c as R,a as d}from"./index.esm-af3d0f9c.js";import{V as T}from"./VContainer-7dfdcdac.js";import{a as p,V as $}from"./VRow-1877bb51.js";import{V as A}from"./VDivider-2163616c.js";const D=M("h1",null,"登入",-1),j={__name:"LoginView",setup(H){const{api:V}=C(),f=x(),c=S(),g=k(),b=R({account:d().required("帳號為必填欄位").min(4,"使用者帳號長度不符").max(20,"使用者帳號長度不符"),password:d().required("密碼為必填欄位").min(4,"密碼長度不符").max(20,"密碼長度不符")}),{handleSubmit:h,isSubmitting:w}=P({validationSchema:b}),l=m("account"),n=m("password"),_=h(async u=>{var o,s;try{const{data:t}=await V.post("/users/login",{account:u.account,password:u.password});g.login(t.result),c({text:"登入成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}}),f.push("/")}catch(t){console.log(t);const v=((s=(o=t==null?void 0:t.response)==null?void 0:o.data)==null?void 0:s.message)||"發生錯誤，請稍後再試";c({text:v,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}});return(u,o)=>(B(),y(T,null,{default:r(()=>[e($,{class:"text-center"},{default:r(()=>[e(p,{cols:"12"},{default:r(()=>[D]),_:1}),e(A),e(p,{cols:"12"},{default:r(()=>[e(q,{disabled:a(w),onSubmit:F(a(_),["prevent"])},{default:r(()=>[e(i,{label:"帳號",minlength:"4",maxlength:"20",counter:"",modelValue:a(l).value.value,"onUpdate:modelValue":o[0]||(o[0]=s=>a(l).value.value=s),"error-messages":a(l).errorMessage.value,"prepend-icon":"mdi-account"},null,8,["modelValue","error-messages"]),e(i,{label:"密碼",type:"password",minlength:"4",maxlength:"20",counter:"",modelValue:a(n).value.value,"onUpdate:modelValue":o[1]||(o[1]=s=>a(n).value.value=s),"error-messages":a(n).errorMessage.value,"prepend-icon":"mdi-key"},null,8,["modelValue","error-messages"]),e(N,{type:"submit",color:"#4d4637"},{default:r(()=>[U("登入")]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1})]),_:1}))}};export{j as default};
