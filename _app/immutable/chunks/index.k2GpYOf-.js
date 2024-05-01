var C=Object.defineProperty;var O=(e,t,n)=>t in e?C(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var y=(e,t,n)=>(O(e,typeof t!="symbol"?t+"":t,n),n);import{r as h,n as p,f as v,h as B,i as E,j as I,k as b,l as L,m as P,p as N,q as T,v as D,w as q}from"./scheduler.jvbkmqBA.js";let $=!1;function M(){$=!0}function z(){$=!1}function F(e,t,n,i){for(;e<t;){const a=e+(t-e>>1);n(a)<=i?e=a+1:t=a}return e}function H(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const r=[];for(let s=0;s<t.length;s++){const o=t[s];o.claim_order!==void 0&&r.push(o)}t=r}const n=new Int32Array(t.length+1),i=new Int32Array(t.length);n[0]=-1;let a=0;for(let r=0;r<t.length;r++){const s=t[r].claim_order,o=(a>0&&t[n[a]].claim_order<=s?a+1:F(1,a,d=>t[n[d]].claim_order,s))-1;i[r]=n[o]+1;const u=o+1;n[u]=r,a=Math.max(u,a)}const c=[],l=[];let f=t.length-1;for(let r=n[a]+1;r!=0;r=i[r-1]){for(c.push(t[r-1]);f>=r;f--)l.push(t[f]);f--}for(;f>=0;f--)l.push(t[f]);c.reverse(),l.sort((r,s)=>r.claim_order-s.claim_order);for(let r=0,s=0;r<l.length;r++){for(;s<c.length&&l[r].claim_order>=c[s].claim_order;)s++;const o=s<c.length?c[s]:null;e.insertBefore(l[r],o)}}function R(e,t){if($){for(H(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentNode!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function le(e,t,n){$&&!n?R(e,t):(t.parentNode!==e||t.nextSibling!=n)&&e.insertBefore(t,n||null)}function U(e){e.parentNode&&e.parentNode.removeChild(e)}function ae(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function V(e){return document.createElement(e)}function W(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function x(e){return document.createTextNode(e)}function fe(){return x(" ")}function ce(){return x("")}function ue(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function A(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}const G=["width","height"];function J(e,t){const n=Object.getOwnPropertyDescriptors(e.__proto__);for(const i in t)t[i]==null?e.removeAttribute(i):i==="style"?e.style.cssText=t[i]:i==="__value"?e.value=e[i]=t[i]:n[i]&&n[i].set&&G.indexOf(i)===-1?e[i]=t[i]:A(e,i,t[i])}function K(e,t){Object.keys(t).forEach(n=>{Q(e,n,t[n])})}function Q(e,t,n){const i=t.toLowerCase();i in e?e[i]=typeof e[i]=="boolean"&&n===""?!0:n:t in e?e[t]=typeof e[t]=="boolean"&&n===""?!0:n:A(e,t,n)}function oe(e){return/-/.test(e)?K:J}function X(e){return Array.from(e.childNodes)}function Y(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function S(e,t,n,i,a=!1){Y(e);const c=(()=>{for(let l=e.claim_info.last_index;l<e.length;l++){const f=e[l];if(t(f)){const r=n(f);return r===void 0?e.splice(l,1):e[l]=r,a||(e.claim_info.last_index=l),f}}for(let l=e.claim_info.last_index-1;l>=0;l--){const f=e[l];if(t(f)){const r=n(f);return r===void 0?e.splice(l,1):e[l]=r,a?r===void 0&&e.claim_info.last_index--:e.claim_info.last_index=l,f}}return i()})();return c.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,c}function j(e,t,n,i){return S(e,a=>a.nodeName===t,a=>{const c=[];for(let l=0;l<a.attributes.length;l++){const f=a.attributes[l];n[f.name]||c.push(f.name)}c.forEach(l=>a.removeAttribute(l))},()=>i(t))}function _e(e,t,n){return j(e,t,n,V)}function de(e,t,n){return j(e,t,n,W)}function Z(e,t){return S(e,n=>n.nodeType===3,n=>{const i=""+t;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>x(t),!0)}function me(e){return Z(e," ")}function he(e,t){t=""+t,e.data!==t&&(e.data=t)}function $e(e,t){e.value=t??""}function ye(e,t,n,i){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,"")}function pe(e,t){return new e(t)}const m=new Set;let _;function xe(){_={r:0,c:[],p:_}}function ge(){_.r||h(_.c),_=_.p}function k(e,t){e&&e.i&&(m.delete(e),e.i(t))}function we(e,t,n,i){if(e&&e.o){if(m.has(e))return;m.add(e),_.c.push(()=>{m.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}function ve(e,t,n){const i=e.$$.props[t];i!==void 0&&(e.$$.bound[i]=n,n(e.$$.ctx[i]))}function be(e){e&&e.c()}function Ne(e,t){e&&e.l(t)}function ee(e,t,n){const{fragment:i,after_update:a}=e.$$;i&&i.m(t,n),b(()=>{const c=e.$$.on_mount.map(T).filter(E);e.$$.on_destroy?e.$$.on_destroy.push(...c):h(c),e.$$.on_mount=[]}),a.forEach(b)}function te(e,t){const n=e.$$;n.fragment!==null&&(L(n.after_update),h(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ne(e,t){e.$$.dirty[0]===-1&&(D.push(e),q(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function Ee(e,t,n,i,a,c,l=null,f=[-1]){const r=P;N(e);const s=e.$$={fragment:null,ctx:[],props:c,update:p,not_equal:a,bound:v(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(r?r.$$.context:[])),callbacks:v(),dirty:f,skip_bound:!1,root:t.target||r.$$.root};l&&l(s.root);let o=!1;if(s.ctx=n?n(e,t.props||{},(u,d,...g)=>{const w=g.length?g[0]:d;return s.ctx&&a(s.ctx[u],s.ctx[u]=w)&&(!s.skip_bound&&s.bound[u]&&s.bound[u](w),o&&ne(e,u)),d}):[],s.update(),o=!0,h(s.before_update),s.fragment=i?i(s.ctx):!1,t.target){if(t.hydrate){M();const u=X(t.target);s.fragment&&s.fragment.l(u),u.forEach(U)}else s.fragment&&s.fragment.c();t.intro&&k(e.$$.fragment),ee(e,t.target,t.anchor),z(),B()}N(r)}class Ae{constructor(){y(this,"$$");y(this,"$$set")}$destroy(){te(this,1),this.$destroy=p}$on(t,n){if(!E(n))return p;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const a=i.indexOf(n);a!==-1&&i.splice(a,1)}}$set(t){this.$$set&&!I(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ie="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ie);export{oe as A,$e as B,ae as C,W as D,de as E,ve as F,Ae as S,we as a,x as b,_e as c,X as d,V as e,Z as f,U as g,me as h,Ee as i,le as j,R as k,he as l,ce as m,ge as n,A as o,ye as p,xe as q,pe as r,fe as s,k as t,be as u,Ne as v,ee as w,te as x,J as y,ue as z};