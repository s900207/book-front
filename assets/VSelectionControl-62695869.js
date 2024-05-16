import{p as h,ap as G,aY as H,m as U,aq as O,f as z,g as q,D as R,a4 as _,o,aO as J,bi as K,q as Q,t as u,u as E,c as d,b1 as W,s as w,x as X,a5 as Z,G as T,aA as p,aB as ee,U as le,Y as ae,bD as te,aN as ne,b3 as oe,bq as I,bE as ue,h as ie,bt as re,ae as ce}from"./index-be7a6887.js";const N=Symbol.for("vuetify:selection-control-group"),$=h({color:String,disabled:{type:Boolean,default:null},defaultsTarget:String,error:Boolean,id:String,inline:Boolean,falseIcon:G,trueIcon:G,ripple:{type:Boolean,default:!0},multiple:{type:Boolean,default:null},name:String,readonly:{type:Boolean,default:null},modelValue:null,type:String,valueComparator:{type:Function,default:H},...U(),...O(),...z()},"SelectionControlGroup"),se=h({...$({defaultsTarget:"VSelectionControl"})},"VSelectionControlGroup");q()({name:"VSelectionControlGroup",props:se(),emits:{"update:modelValue":e=>!0},setup(e,i){let{slots:v}=i;const l=R(e,"modelValue"),t=_(),y=o(()=>e.id||`v-selection-control-group-${t}`),c=o(()=>e.name||y.value),a=new Set;return J(N,{modelValue:l,forceUpdate:()=>{a.forEach(n=>n())},onForceUpdate:n=>{a.add(n),K(()=>{a.delete(n)})}}),Q({[e.defaultsTarget]:{color:u(e,"color"),disabled:u(e,"disabled"),density:u(e,"density"),error:u(e,"error"),inline:u(e,"inline"),modelValue:l,multiple:o(()=>!!e.multiple||e.multiple==null&&Array.isArray(l.value)),name:c,falseIcon:u(e,"falseIcon"),trueIcon:u(e,"trueIcon"),readonly:u(e,"readonly"),ripple:u(e,"ripple"),type:u(e,"type"),valueComparator:u(e,"valueComparator")}}),E(()=>{var n;return d("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline},e.class],style:e.style,role:e.type==="radio"?"radiogroup":void 0},[(n=v.default)==null?void 0:n.call(v)])}),{}}});const de=h({label:String,baseColor:String,trueValue:null,falseValue:null,value:null,...U(),...$()},"VSelectionControl");function ve(e){const i=ne(N,void 0),{densityClasses:v}=oe(e),l=R(e,"modelValue"),t=o(()=>e.trueValue!==void 0?e.trueValue:e.value!==void 0?e.value:!0),y=o(()=>e.falseValue!==void 0?e.falseValue:!1),c=o(()=>!!e.multiple||e.multiple==null&&Array.isArray(l.value)),a=o({get(){const f=i?i.modelValue.value:l.value;return c.value?I(f).some(r=>e.valueComparator(r,t.value)):e.valueComparator(f,t.value)},set(f){if(e.readonly)return;const r=f?t.value:y.value;let m=r;c.value&&(m=f?[...I(l.value),r]:I(l.value).filter(C=>!e.valueComparator(C,t.value))),i?i.modelValue.value=m:l.value=m}}),{textColorClasses:n,textColorStyles:b}=ue(o(()=>{if(!(e.error||e.disabled))return a.value?e.color:e.baseColor})),{backgroundColorClasses:V,backgroundColorStyles:S}=ie(o(()=>a.value&&!e.error&&!e.disabled?e.color:void 0)),k=o(()=>a.value?e.trueIcon:e.falseIcon);return{group:i,densityClasses:v,trueValue:t,falseValue:y,model:a,textColorClasses:n,textColorStyles:b,backgroundColorClasses:V,backgroundColorStyles:S,icon:k}}const me=q()({name:"VSelectionControl",directives:{Ripple:W},inheritAttrs:!1,props:de(),emits:{"update:modelValue":e=>!0},setup(e,i){let{attrs:v,slots:l}=i;const{group:t,densityClasses:y,icon:c,model:a,textColorClasses:n,textColorStyles:b,backgroundColorClasses:V,backgroundColorStyles:S,trueValue:k}=ve(e),f=_(),r=w(!1),m=w(!1),C=X(),g=o(()=>e.id||`input-${f}`),x=o(()=>!e.disabled&&!e.readonly);t==null||t.onForceUpdate(()=>{C.value&&(C.value.checked=a.value)});function A(s){x.value&&(r.value=!0,re(s.target,":focus-visible")!==!1&&(m.value=!0))}function B(){r.value=!1,m.value=!1}function L(s){s.stopPropagation()}function M(s){x.value&&(e.readonly&&t&&ce(()=>t.forceUpdate()),a.value=s.target.checked)}return E(()=>{var P,D;const s=l.label?l.label({label:e.label,props:{for:g.value}}):e.label,[Y,j]=Z(v),F=d("input",T({ref:C,checked:a.value,disabled:!!e.disabled,id:g.value,onBlur:B,onFocus:A,onInput:M,"aria-disabled":!!e.disabled,type:e.type,value:k.value,name:e.name,"aria-checked":e.type==="checkbox"?a.value:void 0},j),null);return d("div",T({class:["v-selection-control",{"v-selection-control--dirty":a.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":r.value,"v-selection-control--focus-visible":m.value,"v-selection-control--inline":e.inline},y.value,e.class]},Y,{style:e.style}),[d("div",{class:["v-selection-control__wrapper",n.value],style:b.value},[(P=l.default)==null?void 0:P.call(l,{backgroundColorClasses:V,backgroundColorStyles:S}),p(d("div",{class:["v-selection-control__input"]},[((D=l.input)==null?void 0:D.call(l,{model:a,textColorClasses:n,textColorStyles:b,backgroundColorClasses:V,backgroundColorStyles:S,inputNode:F,icon:c.value,props:{onFocus:A,onBlur:B,id:g.value}}))??d(le,null,[c.value&&d(ae,{key:"icon",icon:c.value},null),F])]),[[ee("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),s&&d(te,{for:g.value,onClick:L},{default:()=>[s]})])}),{isFocused:r,input:C}}});export{me as V,de as m};