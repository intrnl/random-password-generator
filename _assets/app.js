function D(l){let e=document.createElement("template");return e.innerHTML=l,e}function I(l){return l.content.cloneNode(!0)}function p(l,e){let t=l,s=0,n=e.length,u,r;for(;s<n;s++)for(u=e[s],t=t.firstChild,r=0;r<u;r++)t=t.nextSibling;return t}function R(l,e){l.append(e)}function b(l,e,t,s){l.addEventListener(e,t,s)}function G(l,e,t){l.setAttribute(e,t)}var S=Object,re=Symbol,ie=/\B([A-Z])/g;function K(l){return l.replace(ie,"-$1").toLowerCase()}var ue=S.is,ce=S.assign,U=l=>typeof l=="function";function g(l){return l===""?null:+l}var o,w=1<<0,C=1<<1,T=1<<2,xe=1<<3,Q=1<<4,x=1<<5,m,f,y,k=0,B=0,oe=0;function W(){k++}function Y(){if(k>1){k--;return}let l,e=!1;for(;y;){let t=y;for(y=o,B++;t;){let s=t.o;t.o=o,t.c&=~T;try{t.s()}catch(n){e||(l=n,e=!0)}t=s}}if(B=0,k--,e)throw l}function fe(l){let e;if(f)if(e=l.j,!e||e.p!==f)e={d:0,c:0,l:o,g:l,e:f.b,h:o,p:f,i:o,m:o},f.b=e,l.j=e,f.c&Q&&l.n(e);else if(e.c&C){e.c&=~C;let t=f.b,s=e.h,n=e.e;e!==t&&(s&&(s.e=n),n&&(n.h=s),t&&(t.h=e),e.h=o,e.e=t,f.b=e)}else e=o;try{return l.peek()}finally{e&&(e.d=l.d)}}function pe(l){for(let e=l.b;e;e=e.e){let t=e.g.j;t&&(e.l=t),e.g.j=e,e.c|=C}}function he(l){let e=l.b,t;for(;e;){let s=e.e;e.c&C?(e.g.k(e),e.e=o):(t&&(t.h=e),e.h=o,e.e=t,t=e),e.g.j=e.l,e.l&&(e.l=o),e=s}l.b=t}function de(l){let e=this;he(e),f=l,Y(),e.c&=~w}var E=class{constructor(e){let t=this;t.d=0,t.a=e,t.j=o,t.f=o}n(e){let t=this;e.c&x||(e.c|=x,e.i=t.f,t.f&&(t.f.m=e),t.f=e)}k(e){let t=this,s=e.m,n=e.i;e.c&x&&(e.c&=~x,s&&(s.i=n,e.m=o),n&&(n.m=s,e.i=o),e===t.f&&(t.f=n))}subscribe(e){return v(()=>e(this.value))}set(e){return this.value=e}peek(){return this.a}get value(){return fe(this)}set value(e){let t=this;if(e!==t.a){if(t.a=e,B>100)return;t.d++,oe++,W();try{for(let s=t.f;s;s=s.i)s.p.q()}finally{Y()}}}};var j=class{constructor(e){this.r=e,this.b=o,this.o=o,this.c=Q}s(){let e=this;if(e.c&w)return;let t=e.u();try{e.r()}finally{t()}}u(){let e=this,t=f;return e.c|=w,W(),f=e,pe(e),de.bind(e,t)}q(){let e=this;e.c&(T|w)||(e.c|=T,e.o=y,y=e)}v(){let e=this;for(let t=e.b;t;t=t.e)t.g.k(t);e.b=o}},A=class{constructor(e){let t=this;t.scopes=[],t.cleanups=[],t.parent=m,!e&&m&&m.scopes.push(t)}run(e){let t=m;try{return m=this,e()}finally{m=t}}clear(){let e=this,t=e.scopes,s=e.cleanups;for(let n of t)n.clear(),n.parent=o;for(let n of s)n();t.length=0,s.length=0}};function Z(l){return new A(l)}function X(l){U(l)&&m&&m.cleanups.push(l)}function h(l){return new E(l)}function v(l){let e=new j(l),t=e.v.bind(e);return e.s(),X(t),t}var be=!1,ve=1;var $=null,ee=re(),N=class extends HTMLElement{$m=!1;$c=Z(!0);$p={};$h=[];constructor(){super();let e=this,t=e.$p,s=e.constructor.$d;for(let n in s){let u=s[n];t[u]=h(ee)}}connectedCallback(){let e=this;if(!e.$m){e.$m=!0;let t=e.constructor.$c,s=e.constructor.$s,n=e.$c,u=e.$h,r=e.shadowRoot,c=!1;r||(r=e.attachShadow({mode:"open"}),c=!0);let a=$;try{if($=e,n.run(()=>t(r,e)),document.adoptedStyleSheets)c&&(r.adoptedStyleSheets=s);else for(let i of s)R(r,i.cloneNode(!0));for(let i of u){let _=i();U(_)&&n.cleanups.push(_)}u.length=0}finally{$=a}}}disconnectedCallback(){let e=this;e.$m&&(e.$c.clear(),e.shadowRoot.innerHTML="",e.$m=!1)}attributeChangedCallback(e,t,s){let n=this,u=n.constructor.$d;e in u&&(n.$p[u[e]].value=s===""?!0:s)}};function z(l,e,t,s){let n=[],u=S.create(null);class r extends N{static observedAttributes=n;static $c=e;static $a=u;static $d=t;static $s=s}for(let c in t){let a=t[c],i=K(c);u[i]=c,n.push(i),S.defineProperty(r.prototype,c,{get(){return this.$p[a].a},set(_){this.$p[a].value=_}})}return be&&(l="velvet-"+ve++),l&&customElements.define(l,r),r}function F(l){if(!document.adoptedStyleSheets){let t=document.createElement("style");return t.textContent=l,t}let e=new CSSStyleSheet;return e.replaceSync(l),e}function te(l){let e=[];for(let a=0,i=l.lowercase;a<i;a++)e.push("l");for(let a=0,i=l.uppercase;a<i;a++)e.push("u");for(let a=0,i=l.number;a<i;a++)e.push("n");for(let a=0,i=l.special;a<i;a++)e.push("s");for(let a=e.length;a<l.length;a++)e.push("r");me(e);let t="",s="abcdefghijkmnopqrstuvwxyz",n="ABCDEFGHJKLMNPQRSTUVWXYZ",u="23456789",r="!@#$%^&*()_+-=.";l.ambiguous&&(s+="l",n+="IO",u+="10"),l.lowercase>-1&&(t+=s),l.uppercase>-1&&(t+=n),l.number>-1&&(t+=u),l.special>-1&&(t+=r);let c="";for(let a=0;a<e.length;a++){let i;switch(e[a]){case"l":i=s;break;case"u":i=n;break;case"n":i=u;break;case"s":i=r;break;case"r":i=t;break}c+=i[le(0,i.length)]}return c}function me(l){for(let e=l.length-1;e>0;e--){let t=le(0,e),s=l[e];l[e]=l[t],l[t]=s}}function le(l,e){let t=e-l,s=Math.ceil(Math.log2(t)/8);if(t<=0||!s)return l;let n=256**s,u=new Uint8Array(s);for(;;){crypto.getRandomValues(u);let r=0;for(let c=0;c<s;c++)r=(r<<8)+u[c];if(r<n-n%t)return l+r%t}}var _e=D("<h3>random password generator</h3> <form> <div class=password> <input readonly /> <button type=button>copy</button> <button type=submit>generate</button> </div> <hr /> <label> <span>length</span> <input required type=number min=1 /> </label> <label> <span>lowercase</span> <input required type=number min=-1 /> </label> <label> <span>uppercase</span> <input required type=number min=-1 /> </label> <label> <span>number</span> <input required type=number min=-1 /> </label> <label> <span>special</span> <input required type=number min=-1 /> </label> <label> <span>ambiguous</span> <input type=checkbox /> </label> <hr /> <p> <a target=_blank href=https://codeberg.org/intrnl/random-password-generator> source code </a> </p> </form>"),ge=F("*,*:before,*:after{box-sizing:border-box}h3,form,label{margin-top:0;margin-bottom:16px}h3,form{display:block}label{display:flex;align-items:center;justify-content:space-between}label>span{display:block;margin-bottom:4px;flex-grow:1}input,button{padding:8px;height:36px}input{font-family:monospace}.password{display:flex;gap:8px}.password input{width:-moz-available;width:-webkit-fill-available;width:fill-available}hr{color:transparent;border:0;border-bottom:1px solid #808080;margin:16px 0}a{text-decoration:none}a:hover{text-decoration:underline}");function ye(l,e){let t=h(16),s=h(1),n=h(1),u=h(1),r=h(1),c=h(!1),a=h(""),i=h();function _(J){J&&J.preventDefault(),a.value=te({length:t.value,lowercase:s.value,uppercase:n.value,number:u.value,special:r.value,ambiguous:c.value})}function se(){i.value.select(),document.execCommand("copy")}_();let d=I(_e),V=p(d,[2,1,1]),ne=p(d,[2,1,3]),q=p(d,[2,5,3]),L=p(d,[2,7,3]),O=p(d,[2,9,3]),H=p(d,[2,11,3]),M=p(d,[2,13,3]),P=p(d,[2,15,3]),ae=p(d,[2]);v(()=>G(V,"value",a.value)),i.value=V,b(ne,"click",se),v(()=>q.value=t.value),b(q,"input",()=>t.value=g(q.value)),v(()=>L.value=s.value),b(L,"input",()=>s.value=g(L.value)),v(()=>O.value=n.value),b(O,"input",()=>n.value=g(O.value)),v(()=>H.value=u.value),b(H,"input",()=>u.value=g(H.value)),v(()=>M.value=r.value),b(M,"input",()=>r.value=g(M.value)),v(()=>P.checked=c.value),b(P,"input",()=>c.value=P.checked),b(ae,"submit",_),R(l,d)}var et=z("x-app",ye,{},[ge]);export{et as default};
//# sourceMappingURL=app.js.map
