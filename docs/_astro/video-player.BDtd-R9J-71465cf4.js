const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/player-scrub-preview.CD3SOKV8.js","_astro/ui-primitives.gbQ-GTd_-71465cf4.js","_astro/rolldown-runtime.Dd_uD5pT.js","_astro/errors.CeGMLWmo.js","_astro/constants.C1DrMbu0-71465cf4.js","_astro/manifest.BBa47VIw-71465cf4.js"])))=>i.map(i=>d[i]);
import{i as e}from"./rolldown-runtime.Dd_uD5pT.js";import{F as t,H as n,Hr as r,Ht as i,J as a,Kr as o,M as s,N as c,Nr as l,P as u,Pr as d,Sr as f,X as p,Xr as m,Yn as h,lr as g,on as _,qn as v,vr as ee,wr as te}from"./ui-primitives.gbQ-GTd_-71465cf4.js";import"./feedback.BSNJCp8y-71465cf4.js";import{t as ne}from"./errors.CeGMLWmo.js";import{n as re}from"./sheet-title-bar.SWrqKrBl-71465cf4.js";import{a as ie,d as ae,i as oe,l as y,n as se,o as b,p as ce,r as le,t as ue,u as de}from"./use-video-paused.Co1mhGVk-71465cf4.js";import{a as x,c as fe,d as pe,f as me,i as S,l as he,m as ge,n as C,o as w,r as _e,s as ve,t as ye,u as be}from"./constants.C1DrMbu0-71465cf4.js";var xe=class extends Error{maxBytes;constructor(e){super(`Response body exceeded ${e} bytes.`),this.name=`ResponseBodyTooLargeError`,this.maxBytes=e}};function Se(e,t){e?.cancel(t?.reason).catch(()=>void 0)}async function Ce(e,t,n){let r=e.headers.get(`content-length`);if(r!==null){let n=Number(r);if(Number.isFinite(n)&&n>t)throw Se(e.body),new xe(t)}if(e.body===null)return new Uint8Array;let i=e.body.getReader(),a=[],o=0;try{for(;;){n?.throwIfAborted();let e=i.read(),r=await(n?te(e,n):e);if(r.done)break;if(o+=r.value.byteLength,o>t)throw Se(i),new xe(t);a.push(r.value)}}catch(e){throw n?.aborted&&Se(i,n),e}finally{i.releaseLock()}let s=new Uint8Array(o),c=0;for(let e of a)s.set(e,c),c+=e.byteLength;return s}var T=e(h(),1);function we(e){return e?.map(Te).join(` `)}function Te(e){if(e){let{id:t,width:n,height:r}=e;return[t,n,r].filter(e=>e!=null).join(`:`)}}function Ee(e){return e?.map(De).join(` `)}function De(e){if(e){let{id:t,kind:n,language:r,label:i}=e;return[t,n,r,i].filter(e=>e!=null).join(`:`)}}function Oe(e){return typeof e==`number`&&!Number.isNaN(e)&&Number.isFinite(e)}var ke=e=>new Promise(t=>setTimeout(t,e)),Ae={en:{"Start airplay":`Start airplay`,"Stop airplay":`Stop airplay`,Audio:`Audio`,Captions:`Captions`,"Enable captions":`Enable captions`,"Disable captions":`Disable captions`,"Start casting":`Start casting`,"Stop casting":`Stop casting`,"Enter fullscreen mode":`Enter fullscreen mode`,"Exit fullscreen mode":`Exit fullscreen mode`,Mute:`Mute`,Unmute:`Unmute`,Loop:`Loop`,"Enter picture in picture mode":`Enter picture in picture mode`,"Exit picture in picture mode":`Exit picture in picture mode`,Play:`Play`,Pause:`Pause`,"Playback rate":`Playback rate`,"Playback rate {playbackRate}":`Playback rate {playbackRate}`,Quality:`Quality`,"Seek backward":`Seek backward`,"Seek forward":`Seek forward`,Settings:`Settings`,Auto:`Auto`,"audio player":`audio player`,"video player":`video player`,volume:`volume`,seek:`seek`,"closed captions":`closed captions`,"current playback rate":`current playback rate`,"playback time":`playback time`,"media loading":`media loading`,settings:`settings`,"audio tracks":`audio tracks`,quality:`quality`,play:`play`,pause:`pause`,mute:`mute`,unmute:`unmute`,"chapter: {chapterName}":`chapter: {chapterName}`,live:`live`,Off:`Off`,"start airplay":`start airplay`,"stop airplay":`stop airplay`,"start casting":`start casting`,"stop casting":`stop casting`,"enter fullscreen mode":`enter fullscreen mode`,"exit fullscreen mode":`exit fullscreen mode`,"enter picture in picture mode":`enter picture in picture mode`,"exit picture in picture mode":`exit picture in picture mode`,"seek to live":`seek to live`,"playing live":`playing live`,"seek back {seekOffset} seconds":`seek back {seekOffset} seconds`,"seek forward {seekOffset} seconds":`seek forward {seekOffset} seconds`,"Network Error":`Network Error`,"Decode Error":`Decode Error`,"Source Not Supported":`Source Not Supported`,"Encryption Error":`Encryption Error`,"A network error caused the media download to fail.":`A network error caused the media download to fail.`,"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":`A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.`,"An unsupported error occurred. The server or network failed, or your browser does not support this format.":`An unsupported error occurred. The server or network failed, or your browser does not support this format.`,"The media is encrypted and there are no keys to decrypt it.":`The media is encrypted and there are no keys to decrypt it.`,hour:`hour`,hours:`hours`,minute:`minute`,minutes:`minutes`,second:`second`,seconds:`seconds`,"{time} remaining":`{time} remaining`,"{currentTime} of {totalTime}":`{currentTime} of {totalTime}`,"video not loaded, unknown time.":`video not loaded, unknown time.`}},je=globalThis.navigator?.language||`en`,Me=e=>{je=e},Ne=(e,t)=>{Ae[e]=t},Pe=e=>{let[t]=je.split(`-`);return Ae[je]?.[e]||Ae[t]?.[e]||Ae.en?.[e]||e},Fe=()=>{let[e]=je.split(`-`);return Ae[je]?je:Ae[e]?e:`en`},E=(e,t={})=>Pe(e).replace(/\{(\w+)\}/g,(e,n)=>n in t?String(t[n]):`{${n}}`),Ie=[{singular:`hour`,plural:`hours`},{singular:`minute`,plural:`minutes`},{singular:`second`,plural:`seconds`}],Le=(e,t)=>`${e} ${E(e===1?Ie[t].singular:Ie[t].plural)}`,Re=e=>{if(!Oe(e))return``;let t=Math.abs(e),n=t!==e,r=new Date(0,0,0,0,0,t,0),i=[r.getHours(),r.getMinutes(),r.getSeconds()].map((e,t)=>e&&Le(e,t)).filter(e=>e).join(`, `);return n?E(`{time} remaining`,{time:i}):i};function ze(e,t){let n=!1;e<0&&(n=!0,e=0-e),e=e<0?0:e;let r=Math.floor(e%60),i=Math.floor(e/60%60),a=Math.floor(e/3600),o=Math.floor(t/60%60),s=Math.floor(t/3600);return(isNaN(e)||e===1/0)&&(a=i=r=`0`),a=a>0||s>0?a+`:`:``,i=((a||o>=10)&&i<10?`0`+i:i)+`:`,r=r<10?`0`+r:r,(n?`-`:``)+a+i+r}Object.freeze({length:0,start(e){let t=e>>>0;if(t>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${t}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(e){let t=e>>>0;if(t>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${t}) is greater than or equal to the maximum bound (${this.length}).`);return 0}});var Be=class{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}},Ve=class extends Be{},He=class extends Ve{constructor(){super(...arguments),this.role=null}},Ue=class{observe(){}unobserve(){}disconnect(){}},We={createElement:function(){return new Ge.HTMLElement},createElementNS:function(){return new Ge.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent(e){return!1}},Ge={ResizeObserver:Ue,document:We,Node:Ve,Element:He,HTMLElement:class extends He{constructor(){super(...arguments),this.innerHTML=``}get content(){return new Ge.DocumentFragment}},DocumentFragment:class extends Be{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem(e){return null},setItem(e,t){},removeItem(e){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return``}},matchMedia(e){return{matches:!1,media:e}},DOMParser:class{parseFromString(e,t){return{body:{textContent:e}}}}},Ke=`global`in globalThis&&(globalThis==null?void 0:globalThis.global)===globalThis||typeof window>`u`||window.customElements===void 0,qe=Object.keys(Ge).every(e=>e in globalThis),D=Ke&&!qe?Ge:globalThis,O=Ke&&!qe?We:globalThis.document,Je=new WeakMap,Ye=e=>{let t=Je.get(e);return t||Je.set(e,t=new Set),t},Xe=new D.ResizeObserver(e=>{for(let t of e)for(let e of Ye(t.target))e(t)});function Ze(e,t){Ye(e).add(t),Xe.observe(e)}function Qe(e,t){let n=Ye(e);n.delete(t),n.size||Xe.unobserve(e)}function $e(e){let t={};for(let n of e)t[n.name]=n.value;return t}function et(e){return tt(e)??ot(e,`media-controller`)}function tt(e){let{MEDIA_CONTROLLER:t}=S,n=e.getAttribute(t);if(n)return ct(e)?.getElementById(n)}var nt=(e,t,n=`.value`)=>{let r=e.querySelector(n);r&&(r.textContent=t)},rt=(e,t)=>{let n=`slot[name="${t}"]`,r=e.shadowRoot.querySelector(n);return r?r.children:[]},it=(e,t)=>rt(e,t)[0],at=(e,t)=>!e||!t?!1:e?.contains(t)?!0:at(e,t.getRootNode().host),ot=(e,t)=>e?e.closest(t)||ot(e.getRootNode().host,t):null;function st(e=document){let t=e?.activeElement;return t?st(t.shadowRoot)??t:null}function ct(e){let t=(e?.getRootNode)?.call(e);return t instanceof ShadowRoot||t instanceof Document?t:null}function lt(e,{depth:t=3,checkOpacity:n=!0,checkVisibilityCSS:r=!0}={}){if(e.checkVisibility)return e.checkVisibility({checkOpacity:n,checkVisibilityCSS:r});let i=e;for(;i&&t>0;){let e=getComputedStyle(i);if(n&&e.opacity===`0`||r&&e.visibility===`hidden`||e.display===`none`)return!1;i=i.parentElement,t--}return!0}function ut(e,t,n,r){let i=r.x-n.x,a=r.y-n.y,o=i*i+a*a;if(o===0)return 0;let s=((e-n.x)*i+(t-n.y)*a)/o;return Math.max(0,Math.min(1,s))}function k(e,t){return dt(e,e=>e===t)||ft(e,t)}function dt(e,t){let n;for(n of e.querySelectorAll(`style:not([media])`)??[]){let e;try{e=n.sheet?.cssRules}catch{continue}for(let n of e??[])if(t(n.selectorText))return n}}function ft(e,t){let n=e.querySelectorAll(`style:not([media])`)??[],r=n?.[n.length-1];if(!r?.sheet)return console.warn(`Media Chrome: No style sheet found on style tag of`,e),{style:{setProperty:()=>{},removeProperty:()=>``,getPropertyValue:()=>``}};let i=r?.sheet.insertRule(`${t}{}`,r.sheet.cssRules.length);return r.sheet.cssRules?.[i]}function A(e,t,n=NaN){let r=e.getAttribute(t);return r==null?n:+r}function j(e,t,n){let r=+n;if(n==null||Number.isNaN(r)){e.hasAttribute(t)&&e.removeAttribute(t);return}A(e,t,void 0)!==r&&e.setAttribute(t,`${r}`)}function M(e,t){return e.hasAttribute(t)}function N(e,t,n){if(n==null){e.hasAttribute(t)&&e.removeAttribute(t);return}M(e,t)!=n&&e.toggleAttribute(t,n)}function P(e,t,n=null){return e.getAttribute(t)??n}function F(e,t,n){if(n==null){e.hasAttribute(t)&&e.removeAttribute(t);return}let r=`${n}`;P(e,t,void 0)!==r&&e.setAttribute(t,r)}var pt=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},mt=(e,t,n)=>(pt(e,t,`read from private field`),n?n.call(e):t.get(e)),ht=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},gt=(e,t,n,r)=>(pt(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),I;function _t(e){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `}var vt=class extends D.HTMLElement{constructor(){if(super(),ht(this,I,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=$e(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[S.MEDIA_CONTROLLER,x.MEDIA_PAUSED]}attributeChangedCallback(e,t,n){var r,i,a,o;e===S.MEDIA_CONTROLLER&&(t&&((i=(r=mt(this,I))?.unassociateElement)==null||i.call(r,this),gt(this,I,null)),n&&this.isConnected&&(gt(this,I,this.getRootNode()?.getElementById(n)),(o=(a=mt(this,I))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;this.tabIndex=-1,this.setAttribute(`aria-hidden`,`true`),gt(this,I,yt(this)),this.getAttribute(S.MEDIA_CONTROLLER)&&((t=(e=mt(this,I))?.associateElement)==null||t.call(e,this)),mt(this,I)&&(mt(this,I).addEventListener(`pointerdown`,this),mt(this,I).addEventListener(`click`,this),mt(this,I).hasAttribute(`tabindex`)||(mt(this,I).tabIndex=0))}disconnectedCallback(){var e,t,n,r;this.getAttribute(S.MEDIA_CONTROLLER)&&((t=(e=mt(this,I))?.unassociateElement)==null||t.call(e,this)),(n=mt(this,I))==null||n.removeEventListener(`pointerdown`,this),(r=mt(this,I))==null||r.removeEventListener(`click`,this),gt(this,I,null)}handleEvent(e){let t=e.composedPath()?.[0];if([`video`,`media-controller`].includes(t?.localName)){if(e.type===`pointerdown`)this._pointerType=e.pointerType;else if(e.type===`click`){let{clientX:t,clientY:n}=e,{left:r,top:i,width:a,height:o}=this.getBoundingClientRect(),s=t-r,c=n-i;if(s<0||c<0||s>a||c>o||a===0&&o===0)return;let l=this._pointerType||`mouse`;if(this._pointerType=void 0,l===fe.TOUCH){this.handleTap(e);return}if(l===fe.MOUSE||l===fe.PEN){this.handleMouseClick(e);return}}}}get mediaPaused(){return M(this,x.MEDIA_PAUSED)}set mediaPaused(e){N(this,x.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){let t=this.mediaPaused?w.MEDIA_PLAY_REQUEST:w.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new D.CustomEvent(t,{composed:!0,bubbles:!0}))}};I=new WeakMap,vt.shadowRootOptions={mode:`open`},vt.getTemplateHTML=_t;function yt(e){let t=e.getAttribute(S.MEDIA_CONTROLLER);return t?e.getRootNode()?.getElementById(t):ot(e,`media-controller`)}D.customElements.get(`media-gesture-receiver`)||D.customElements.define(`media-gesture-receiver`,vt);var bt=vt,xt=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},L=(e,t,n)=>(xt(e,t,`read from private field`),n?n.call(e):t.get(e)),R=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},St=(e,t,n,r)=>(xt(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Ct=(e,t,n)=>(xt(e,t,`access private method`),n),wt,Tt,Et,Dt,Ot,kt,At,jt,Mt,Nt,Pt,Ft,It,Lt,Rt,zt,Bt,Vt,Ht,Ut,z={AUDIO:`audio`,AUTOHIDE:`autohide`,BREAKPOINTS:`breakpoints`,GESTURES_DISABLED:`gesturesdisabled`,KEYBOARD_CONTROL:`keyboardcontrol`,NO_AUTOHIDE:`noautohide`,USER_INACTIVE:`userinactive`,AUTOHIDE_OVER_CONTROLS:`autohideovercontrols`};function Wt(e){return`
    <style>
      
      :host([${x.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
        outline: none;
      }

      :host {
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        line-height: 0;
        background-color: var(--media-background-color, #000);
        overflow: hidden;
      }

      :host(:not([${z.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-flow: column nowrap;
        align-items: start;
        pointer-events: none;
        background: none;
      }

      slot[name=media] {
        display: var(--media-slot-display, contents);
      }

      
      :host([${z.AUDIO}]) slot[name=media] {
        display: var(--media-slot-display, none);
      }

      
      :host([${z.AUDIO}]) [part~=layer][part~=gesture-layer] {
        height: 0;
        display: block;
      }

      
      :host(:not([${z.AUDIO}])[${z.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
          :host(:not([${z.AUDIO}])[${z.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
        display: none;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
        pointer-events: auto;
      }

      :host(:not([${z.AUDIO}])) *[part~=layer][part~=centered-layer] {
        align-items: center;
        justify-content: center;
      }

      :host(:not([${z.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
      :host(:not([${z.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
        align-self: stretch;
        flex-grow: 1;
      }

      slot[name=middle-chrome] {
        display: inline;
        flex-grow: 1;
        pointer-events: none;
        background: none;
      }

      
      ::slotted([slot=media]),
      ::slotted([slot=poster]) {
        width: 100%;
        height: 100%;
      }

      
      :host(:not([${z.AUDIO}])) .spacer {
        flex-grow: 1;
      }

      
      :host(:-webkit-full-screen) {
        
        width: 100% !important;
        height: 100% !important;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not([${z.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
        opacity: 1;
        transition: var(--media-control-transition-in, opacity 0.25s);
      }

      
      :host([${z.USER_INACTIVE}]:not([${x.MEDIA_PAUSED}]):not([${x.MEDIA_IS_AIRPLAYING}]):not([${x.MEDIA_IS_CASTING}]):not([${z.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${z.NO_AUTOHIDE}]):not([role=dialog])) {
        opacity: 0;
        transition: var(--media-control-transition-out, opacity 1s);
      }

      :host([${z.USER_INACTIVE}]:not([${z.NO_AUTOHIDE}]):not([${x.MEDIA_PAUSED}]):not([${x.MEDIA_IS_CASTING}]):not([${z.AUDIO}])) ::slotted([slot=media]) {
        cursor: none;
      }

      :host([${z.USER_INACTIVE}][${z.AUTOHIDE_OVER_CONTROLS}]:not([${z.NO_AUTOHIDE}]):not([${x.MEDIA_PAUSED}]):not([${x.MEDIA_IS_CASTING}]):not([${z.AUDIO}])) * {
        --media-cursor: none;
        cursor: none;
      }


      ::slotted(media-control-bar)  {
        align-self: stretch;
      }

      
      :host(:not([${z.AUDIO}])[${x.MEDIA_HAS_PLAYED}]) slot[name=poster] {
        display: none;
      }

      ::slotted([role=dialog]) {
        width: 100%;
        height: 100%;
        align-self: center;
      }

      ::slotted([role=menu]) {
        align-self: end;
      }
    </style>

    <slot name="media" part="layer media-layer"></slot>
    <slot name="poster" part="layer poster-layer"></slot>
    <slot name="gestures-chrome" part="layer gesture-layer">
      <media-gesture-receiver slot="gestures-chrome">
        <template shadowrootmode="${bt.shadowRootOptions.mode}">
          ${bt.getTemplateHTML({})}
        </template>
      </media-gesture-receiver>
    </slot>
    <span part="layer vertical-layer">
      <slot name="top-chrome" part="top chrome"></slot>
      <slot name="middle-chrome" part="middle chrome"></slot>
      <slot name="centered-chrome" part="layer centered-layer center centered chrome"></slot>
      
      <slot part="bottom chrome"></slot>
    </span>
    <slot name="dialog" part="layer dialog-layer"></slot>
  `}var Gt=Object.values(x),Kt=`sm:384 md:576 lg:768 xl:960`;function qt(e){Jt(e.target,e.contentRect.width)}function Jt(e,t){if(!e.isConnected)return;let n=Yt(e.getAttribute(z.BREAKPOINTS)??Kt),r=Xt(n,t),i=!1;if(Object.keys(n).forEach(t=>{if(r.includes(t)){e.hasAttribute(`breakpoint${t}`)||(e.setAttribute(`breakpoint${t}`,``),i=!0);return}e.hasAttribute(`breakpoint${t}`)&&(e.removeAttribute(`breakpoint${t}`),i=!0)}),i){let t=new CustomEvent(_e.BREAKPOINTS_CHANGE,{detail:r});e.dispatchEvent(t)}e.breakpointsComputed||(e.breakpointsComputed=!0,e.dispatchEvent(new CustomEvent(_e.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}function Yt(e){let t=e.split(/\s+/);return Object.fromEntries(t.map(e=>e.split(`:`)))}function Xt(e,t){return Object.keys(e).filter(n=>t>=parseInt(e[n]))}var Zt=class extends D.HTMLElement{constructor(){if(super(),R(this,Mt),R(this,Pt),R(this,It),R(this,Rt),R(this,Bt),R(this,wt,void 0),R(this,Tt,0),R(this,Et,null),R(this,Dt,null),R(this,Ot,void 0),this.breakpointsComputed=!1,R(this,kt,e=>{let t=this.media;for(let n of e){if(n.type!==`childList`)continue;let e=n.removedNodes;for(let r of e){if(r.slot!=`media`||n.target!=this)continue;let e=n.previousSibling&&n.previousSibling.previousElementSibling;if(!e||!t)this.mediaUnsetCallback(r);else{let t=e.slot!==`media`;for(;(e=e.previousSibling)!==null;)e.slot==`media`&&(t=!1);t&&this.mediaUnsetCallback(r)}}if(t)for(let e of n.addedNodes)e===t&&this.handleMediaUpdated(t)}}),R(this,At,!1),R(this,jt,e=>{L(this,At)||(setTimeout(()=>{qt(e),St(this,At,!1)},0),St(this,At,!0))}),R(this,Ht,void 0),R(this,Ut,()=>{if(!L(this,Ht).assignedElements({flatten:!0}).length){L(this,Et)&&this.mediaUnsetCallback(L(this,Et));return}this.handleMediaUpdated(this.media)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=$e(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}St(this,wt,new MutationObserver(L(this,kt)))}static get observedAttributes(){return[z.AUTOHIDE,z.GESTURES_DISABLED].concat(Gt).filter(e=>![x.MEDIA_RENDITION_LIST,x.MEDIA_AUDIO_TRACK_LIST,x.MEDIA_CHAPTERS_CUES,x.MEDIA_WIDTH,x.MEDIA_HEIGHT,x.MEDIA_ERROR,x.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,t,n){e.toLowerCase()==z.AUTOHIDE&&(this.autohide=n)}get media(){let e=this.querySelector(`:scope > [slot=media]`);return e?.nodeName==`SLOT`&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(St(this,Et,e),e.localName.includes(`-`)&&await D.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;L(this,wt).observe(this,{childList:!0,subtree:!0}),Ze(this,L(this,jt));let t=this.getAttribute(z.AUDIO)==null?E(`video player`):E(`audio player`);this.setAttribute(`role`,`region`),this.setAttribute(`aria-label`,t),this.handleMediaUpdated(this.media),this.setAttribute(z.USER_INACTIVE,``),Jt(this,this.getBoundingClientRect().width);let n=this.querySelector(`:scope > slot[slot=media]`);n&&(St(this,Ht,n),L(this,Ht).addEventListener(`slotchange`,L(this,Ut))),this.addEventListener(`pointerdown`,this),this.addEventListener(`pointermove`,this),this.addEventListener(`pointerup`,this),this.addEventListener(`mouseleave`,this),this.addEventListener(`keyup`,this),(e=D.window)==null||e.addEventListener(`mouseup`,this)}disconnectedCallback(){var e;Qe(this,L(this,jt)),clearTimeout(L(this,Dt)),L(this,wt).disconnect(),this.media&&this.mediaUnsetCallback(this.media),(e=D.window)==null||e.removeEventListener(`mouseup`,this),this.removeEventListener(`pointerdown`,this),this.removeEventListener(`pointermove`,this),this.removeEventListener(`pointerup`,this),this.removeEventListener(`mouseleave`,this),this.removeEventListener(`keyup`,this),L(this,Ht)&&(L(this,Ht).removeEventListener(`slotchange`,L(this,Ut)),St(this,Ht,null)),St(this,At,!1)}mediaSetCallback(e){}mediaUnsetCallback(e){St(this,Et,null)}handleEvent(e){switch(e.type){case`pointerdown`:St(this,Tt,e.timeStamp);break;case`pointermove`:Ct(this,Mt,Nt).call(this,e);break;case`pointerup`:Ct(this,Pt,Ft).call(this,e);break;case`mouseleave`:Ct(this,It,Lt).call(this);break;case`mouseup`:this.removeAttribute(z.KEYBOARD_CONTROL);break;case`keyup`:Ct(this,Bt,Vt).call(this),this.setAttribute(z.KEYBOARD_CONTROL,``)}}set autohide(e){let t=Number(e);St(this,Ot,isNaN(t)?0:t)}get autohide(){return(L(this,Ot)===void 0?2:L(this,Ot)).toString()}get breakpoints(){return P(this,z.BREAKPOINTS)}set breakpoints(e){F(this,z.BREAKPOINTS,e)}get audio(){return M(this,z.AUDIO)}set audio(e){N(this,z.AUDIO,e)}get gesturesDisabled(){return M(this,z.GESTURES_DISABLED)}set gesturesDisabled(e){N(this,z.GESTURES_DISABLED,e)}get keyboardControl(){return M(this,z.KEYBOARD_CONTROL)}set keyboardControl(e){N(this,z.KEYBOARD_CONTROL,e)}get noAutohide(){return M(this,z.NO_AUTOHIDE)}set noAutohide(e){N(this,z.NO_AUTOHIDE,e)}get autohideOverControls(){return M(this,z.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){N(this,z.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return M(this,z.USER_INACTIVE)}set userInteractive(e){N(this,z.USER_INACTIVE,e)}};wt=new WeakMap,Tt=new WeakMap,Et=new WeakMap,Dt=new WeakMap,Ot=new WeakMap,kt=new WeakMap,At=new WeakMap,jt=new WeakMap,Mt=new WeakSet,Nt=function(e){if(e.pointerType!==`mouse`&&e.timeStamp-L(this,Tt)<250)return;Ct(this,Rt,zt).call(this),clearTimeout(L(this,Dt));let t=this.hasAttribute(z.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(e.target)||t)&&Ct(this,Bt,Vt).call(this)},Pt=new WeakSet,Ft=function(e){if(e.pointerType===`touch`){let t=!this.hasAttribute(z.USER_INACTIVE);[this,this.media].includes(e.target)&&t?Ct(this,It,Lt).call(this):Ct(this,Bt,Vt).call(this)}else e.composedPath().some(e=>[`media-play-button`,`media-fullscreen-button`].includes(e?.localName))&&Ct(this,Bt,Vt).call(this)},It=new WeakSet,Lt=function(){if(L(this,Ot)<0||this.hasAttribute(z.USER_INACTIVE))return;this.setAttribute(z.USER_INACTIVE,``);let e=new D.CustomEvent(_e.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(e)},Rt=new WeakSet,zt=function(){if(!this.hasAttribute(z.USER_INACTIVE))return;this.removeAttribute(z.USER_INACTIVE);let e=new D.CustomEvent(_e.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(e)},Bt=new WeakSet,Vt=function(){Ct(this,Rt,zt).call(this),clearTimeout(L(this,Dt));let e=parseInt(this.autohide);e<0||St(this,Dt,setTimeout(()=>{Ct(this,It,Lt).call(this)},e*1e3))},Ht=new WeakMap,Ut=new WeakMap,Zt.shadowRootOptions={mode:`open`},Zt.getTemplateHTML=Wt,D.customElements.get(`media-container`)||D.customElements.define(`media-container`,Zt);var Qt=Zt,$t=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},B=(e,t,n)=>($t(e,t,`read from private field`),n?n.call(e):t.get(e)),en=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},tn=(e,t,n,r)=>($t(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),nn,rn,an,on,sn,cn,ln=class{constructor(e,t,{defaultValue:n}={defaultValue:void 0}){en(this,sn),en(this,nn,void 0),en(this,rn,void 0),en(this,an,void 0),en(this,on,new Set),tn(this,nn,e),tn(this,rn,t),tn(this,an,new Set(n))}[Symbol.iterator](){return B(this,sn,cn).values()}get length(){return B(this,sn,cn).size}get value(){return[...B(this,sn,cn)].join(` `)??``}set value(e){e!==this.value&&(tn(this,on,new Set),this.add(...e?.split(` `)??[]))}toString(){return this.value}item(e){return[...B(this,sn,cn)][e]}values(){return B(this,sn,cn).values()}forEach(e,t){B(this,sn,cn).forEach(e,t)}add(...e){var t;e.forEach(e=>B(this,on).add(e)),(this.value!==``||B(this,nn)?.hasAttribute(`${B(this,rn)}`))&&((t=B(this,nn))==null||t.setAttribute(`${B(this,rn)}`,`${this.value}`))}remove(...e){var t;e.forEach(e=>B(this,on).delete(e)),(t=B(this,nn))==null||t.setAttribute(`${B(this,rn)}`,`${this.value}`)}contains(e){return B(this,sn,cn).has(e)}toggle(e,t){return t===void 0?this.contains(e)?(this.remove(e),!1):(this.add(e),!0):t?(this.add(e),!0):(this.remove(e),!1)}replace(e,t){return this.remove(e),this.add(t),e===t}};nn=new WeakMap,rn=new WeakMap,an=new WeakMap,on=new WeakMap,sn=new WeakSet,cn=function(){return B(this,on).size?B(this,on):B(this,an)};var un=(e=``)=>e.split(/\s+/),dn=(e=``)=>{let[t,n,r]=e.split(`:`),i=r?decodeURIComponent(r):void 0;return{kind:t===`cc`?be.CAPTIONS:be.SUBTITLES,language:n,label:i}},fn=(e=``,t={})=>un(e).map(e=>{let n=dn(e);return{...t,...n}}),pn=e=>e?Array.isArray(e)?e.map(e=>typeof e==`string`?dn(e):e):typeof e==`string`?fn(e):[e]:[],mn=({kind:e,label:t,language:n}={kind:`subtitles`})=>t?`${e===`captions`?`cc`:`sb`}:${n}:${encodeURIComponent(t)}`:n,hn=(e=[])=>Array.prototype.map.call(e,mn).join(` `),gn=(e,t)=>n=>n[e]===t,_n=e=>{let t=Object.entries(e).map(([e,t])=>gn(e,t));return e=>t.every(t=>t(e))},vn=(e,t=[],n=[])=>{let r=pn(n).map(_n);Array.from(t).filter(e=>r.some(t=>t(e))).forEach(t=>{t.mode=e})},yn=(e,t=()=>!0)=>{if(!e?.textTracks)return[];let n=typeof t==`function`?t:_n(t);return Array.from(e.textTracks).filter(n)},bn=e=>!!e.mediaSubtitlesShowing?.length||e.hasAttribute(x.MEDIA_SUBTITLES_SHOWING),xn=e=>{let{media:t,fullscreenElement:n}=e;try{let e=n&&`requestFullscreen`in n?`requestFullscreen`:n&&`webkitRequestFullScreen`in n?`webkitRequestFullScreen`:void 0;if(e){let t=n[e]?.call(n);if(t instanceof Promise)return t.catch(()=>{})}else t?.webkitEnterFullscreen?t.webkitEnterFullscreen():t?.requestFullscreen&&t.requestFullscreen()}catch(e){console.error(e)}},Sn=`exitFullscreen`in O?`exitFullscreen`:`webkitExitFullscreen`in O?`webkitExitFullscreen`:`webkitCancelFullScreen`in O?`webkitCancelFullScreen`:void 0,Cn=e=>{let{documentElement:t}=e;if(Sn){let e=(t?.[Sn])?.call(t);if(e instanceof Promise)return e.catch(()=>{})}},wn=`fullscreenElement`in O?`fullscreenElement`:`webkitFullscreenElement`in O?`webkitFullscreenElement`:void 0,Tn=e=>{let{documentElement:t,media:n}=e,r=t?.[wn];return!r&&`webkitDisplayingFullscreen`in n&&`webkitPresentationMode`in n&&n.webkitDisplayingFullscreen&&n.webkitPresentationMode===me.FULLSCREEN?n:r},En=e=>{let{media:t,documentElement:n,fullscreenElement:r=t}=e;if(!t||!n)return!1;let i=Tn(e);if(!i)return!1;if(i===r||i===t)return!0;if(i.localName.includes(`-`)){let e=i.shadowRoot;if(!(wn in e))return at(i,r);for(;e?.[wn];){if(e[wn]===r)return!0;e=e[wn]?.shadowRoot}}return!1},Dn=`fullscreenEnabled`in O?`fullscreenEnabled`:`webkitFullscreenEnabled`in O?`webkitFullscreenEnabled`:void 0,On=e=>{let{documentElement:t,media:n}=e;return!!t?.[Dn]||n&&`webkitSupportsFullscreen`in n},kn,An=()=>{var e;return kn||(kn=((e=O)?.createElement)?.call(e,`video`),kn)},jn=async(e=An())=>{if(!e)return!1;let t=e.volume;e.volume=t/2+.1;let n=new AbortController,r=await Promise.race([Mn(e,n.signal),Nn(e,t)]);return n.abort(),r},Mn=(e,t)=>new Promise(n=>{e.addEventListener(`volumechange`,()=>n(!0),{signal:t})}),Nn=async(e,t)=>{for(let n=0;n<10;n++){if(e.volume===t)return!1;await ke(10)}return e.volume!==t},Pn=/.*Version\/.*Safari\/.*/.test(D.navigator.userAgent),Fn=(e=An())=>D.matchMedia(`(display-mode: standalone)`).matches&&Pn?!1:typeof e?.requestPictureInPicture==`function`,In=(e=An())=>On({documentElement:O,media:e}),Ln=In(),Rn=Fn(),zn=!!D.WebKitPlaybackTargetAvailabilityEvent,Bn=!!D.chrome,Vn=e=>yn(e.media,e=>[be.SUBTITLES,be.CAPTIONS].includes(e.kind)).sort((e,t)=>e.kind>=t.kind?1:-1),Hn=e=>yn(e.media,e=>e.mode===pe.SHOWING&&[be.SUBTITLES,be.CAPTIONS].includes(e.kind)),Un=(e,t)=>{let n=Vn(e),r=Hn(e),i=!!r.length;if(n.length){if(t===!1||i&&t!==!0)vn(pe.DISABLED,n,r);else if(t===!0||!i&&t!==!1){let t=n[0],{options:i}=e;if(!i?.noSubtitlesLangPref){let e=D.localStorage.getItem(`media-chrome-pref-subtitles-lang`),r=e?[e,...D.navigator.languages]:D.navigator.languages,i=n.filter(e=>r.some(t=>e.language.toLowerCase().startsWith(t.split(`-`)[0]))).sort((e,t)=>r.findIndex(t=>e.language.toLowerCase().startsWith(t.split(`-`)[0]))-r.findIndex(e=>t.language.toLowerCase().startsWith(e.split(`-`)[0])));i[0]&&(t=i[0])}let{language:a,label:o,kind:s}=t;vn(pe.DISABLED,n,r),vn(pe.SHOWING,n,[{language:a,label:o,kind:s}])}}},Wn=(e,t)=>e===t?!0:e==null||t==null||typeof e!=typeof t?!1:typeof e==`number`&&Number.isNaN(e)&&Number.isNaN(t)?!0:typeof e==`object`?Array.isArray(e)?Gn(e,t):Object.entries(e).every(([e,n])=>e in t&&Wn(n,t[e])):!1,Gn=(e,t)=>{let n=Array.isArray(e),r=Array.isArray(t);return n===r?n||r?e.length===t.length&&e.every((e,n)=>Wn(e,t[n])):!0:!1},Kn=Object.values(he),qn,Jn=jn().then(e=>(qn=e,qn)),Yn=async(...e)=>{await Promise.all(e.filter(e=>e).map(async e=>{if(!(`localName`in e&&e instanceof D.HTMLElement))return;let t=e.localName;if(!t.includes(`-`))return;let n=D.customElements.get(t);n&&e instanceof n||(await D.customElements.whenDefined(t),D.customElements.upgrade(e))}))},Xn=new D.DOMParser,Zn=e=>e&&(Xn.parseFromString(e,`text/html`).body.textContent||e),Qn={mediaError:{get(e,t){let{media:n}=e;if(t?.type!==`playing`)return n?.error},mediaEvents:[`emptied`,`error`,`playing`]},mediaErrorCode:{get(e,t){let{media:n}=e;if(t?.type!==`playing`)return n?.error?.code},mediaEvents:[`emptied`,`error`,`playing`]},mediaErrorMessage:{get(e,t){let{media:n}=e;if(t?.type!==`playing`)return n?.error?.message??``},mediaEvents:[`emptied`,`error`,`playing`]},mediaWidth:{get(e){let{media:t}=e;return t?.videoWidth??0},mediaEvents:[`resize`]},mediaHeight:{get(e){let{media:t}=e;return t?.videoHeight??0},mediaEvents:[`resize`]},mediaPaused:{get(e){let{media:t}=e;return t?.paused??!0},set(e,t){var n;let{media:r}=t;r&&(e?r.pause():(n=r.play())==null||n.catch(()=>{}))},mediaEvents:[`play`,`playing`,`pause`,`emptied`]},mediaHasPlayed:{get(e,t){let{media:n}=e;return n?t?t.type===`playing`:!n.paused:!1},mediaEvents:[`playing`,`emptied`]},mediaEnded:{get(e){let{media:t}=e;return t?.ended??!1},mediaEvents:[`seeked`,`ended`,`emptied`]},mediaPlaybackRate:{get(e){let{media:t}=e;return t?.playbackRate??1},set(e,t){let{media:n}=t;n&&Number.isFinite(+e)&&(n.playbackRate=+e)},mediaEvents:[`ratechange`,`loadstart`]},mediaMuted:{get(e){let{media:t}=e;return t?.muted??!1},set(e,t){let{media:n,options:{noMutedPref:r}={}}=t;if(n){n.muted=e;try{let t=D.localStorage.getItem(`media-chrome-pref-muted`)!==null,i=n.hasAttribute(`muted`);if(r){t&&D.localStorage.removeItem(`media-chrome-pref-muted`);return}if(i&&!t)return;D.localStorage.setItem(`media-chrome-pref-muted`,e?`true`:`false`)}catch(e){console.debug(`Error setting muted pref`,e)}}},mediaEvents:[`volumechange`],stateOwnersUpdateHandlers:[(e,t)=>{let{options:{noMutedPref:n}}=t,{media:r}=t;if(!(!r||r.muted||n))try{let n=D.localStorage.getItem(`media-chrome-pref-muted`)===`true`;Qn.mediaMuted.set(n,t),e(n)}catch(e){console.debug(`Error getting muted pref`,e)}}]},mediaLoop:{get(e){let{media:t}=e;return t?.loop},set(e,t){let{media:n}=t;n&&(n.loop=e)},mediaEvents:[`medialooprequest`]},mediaVolume:{get(e){let{media:t}=e;return t?.volume??1},set(e,t){let{media:n,options:{noVolumePref:r}={}}=t;if(n){try{e==null?D.localStorage.removeItem(`media-chrome-pref-volume`):!n.hasAttribute(`muted`)&&!r&&D.localStorage.setItem(`media-chrome-pref-volume`,e.toString())}catch(e){console.debug(`Error setting volume pref`,e)}Number.isFinite(+e)&&(n.volume=+e)}},mediaEvents:[`volumechange`],stateOwnersUpdateHandlers:[(e,t)=>{let{options:{noVolumePref:n}}=t;if(!n)try{let{media:n}=t;if(!n)return;let r=D.localStorage.getItem(`media-chrome-pref-volume`);if(r==null)return;Qn.mediaVolume.set(+r,t),e(+r)}catch(e){console.debug(`Error getting volume pref`,e)}}]},mediaVolumeLevel:{get(e){let{media:t}=e;return t?.volume===void 0?`high`:t.muted||t.volume===0?`off`:t.volume<.5?`low`:t.volume<.75?`medium`:`high`},mediaEvents:[`volumechange`]},mediaCurrentTime:{get(e){let{media:t}=e;return t?.currentTime??0},set(e,t){let{media:n}=t;n&&Oe(e)&&(n.currentTime=e)},mediaEvents:[`timeupdate`,`loadedmetadata`]},mediaDuration:{get(e){let{media:t,options:{defaultDuration:n}={}}=e;return n&&(!t||!t.duration||Number.isNaN(t.duration)||!Number.isFinite(t.duration))?n:Number.isFinite(t?.duration)?t.duration:NaN},mediaEvents:[`durationchange`,`loadedmetadata`,`emptied`]},mediaLoading:{get(e){let{media:t}=e;return t?.readyState<3},mediaEvents:[`waiting`,`playing`,`emptied`]},mediaSeekable:{get(e){let{media:t}=e;if(!t?.seekable?.length)return;let n=t.seekable.start(0),r=t.seekable.end(t.seekable.length-1);if(n||r)return[Number(n.toFixed(3)),Number(r.toFixed(3))]},mediaEvents:[`loadedmetadata`,`emptied`,`progress`,`seekablechange`]},mediaBuffered:{get(e){let{media:t}=e,n=t?.buffered??[];return Array.from(n).map((e,t)=>[Number(n.start(t).toFixed(3)),Number(n.end(t).toFixed(3))])},mediaEvents:[`progress`,`emptied`]},mediaStreamType:{get(e){let{media:t,options:{defaultStreamType:n}={}}=e,r=[he.LIVE,he.ON_DEMAND].includes(n)?n:void 0;if(!t)return r;let{streamType:i}=t;if(Kn.includes(i))return i===he.UNKNOWN?r:i;let a=t.duration;return a===1/0?he.LIVE:Number.isFinite(a)?he.ON_DEMAND:r},mediaEvents:[`emptied`,`durationchange`,`loadedmetadata`,`streamtypechange`]},mediaTargetLiveWindow:{get(e){let{media:t}=e;if(!t)return NaN;let{targetLiveWindow:n}=t,r=Qn.mediaStreamType.get(e);return(n==null||Number.isNaN(n))&&r===he.LIVE?0:n},mediaEvents:[`emptied`,`durationchange`,`loadedmetadata`,`streamtypechange`,`targetlivewindowchange`]},mediaTimeIsLive:{get(e){let{media:t,options:{liveEdgeOffset:n=10}={}}=e;if(!t)return!1;if(typeof t.liveEdgeStart==`number`)return!Number.isNaN(t.liveEdgeStart)&&t.currentTime>=t.liveEdgeStart;if(Qn.mediaStreamType.get(e)!==he.LIVE)return!1;let r=t.seekable;if(!r)return!0;if(!r.length)return!1;let i=r.end(r.length-1)-n;return t.currentTime>=i},mediaEvents:[`playing`,`timeupdate`,`progress`,`waiting`,`emptied`]},mediaSubtitlesList:{get(e){return Vn(e).map(({kind:e,label:t,language:n})=>({kind:e,label:t,language:n}))},mediaEvents:[`loadstart`],textTracksEvents:[`addtrack`,`removetrack`]},mediaSubtitlesShowing:{get(e){return Hn(e).map(({kind:e,label:t,language:n})=>({kind:e,label:t,language:n}))},mediaEvents:[`loadstart`],textTracksEvents:[`addtrack`,`removetrack`,`change`],stateOwnersUpdateHandlers:[(e,t)=>{var n,r;let{media:i,options:a}=t;if(!i)return;let o=e=>{a.defaultSubtitles&&(!e||[be.CAPTIONS,be.SUBTITLES].includes(e?.track?.kind))&&Un(t,!0)};return i.addEventListener(`loadstart`,o),(n=i.textTracks)==null||n.addEventListener(`addtrack`,o),(r=i.textTracks)==null||r.addEventListener(`removetrack`,o),()=>{var e,t;i.removeEventListener(`loadstart`,o),(e=i.textTracks)==null||e.removeEventListener(`addtrack`,o),(t=i.textTracks)==null||t.removeEventListener(`removetrack`,o)}}]},mediaChaptersCues:{get(e){let{media:t}=e;if(!t)return[];let[n]=yn(t,{kind:be.CHAPTERS});return Array.from(n?.cues??[]).map(({text:e,startTime:t,endTime:n})=>({text:Zn(e),startTime:t,endTime:n}))},mediaEvents:[`loadstart`,`loadedmetadata`],textTracksEvents:[`addtrack`,`removetrack`,`change`],stateOwnersUpdateHandlers:[(e,t)=>{let{media:n}=t;if(!n)return;let r=n.querySelector(`track[kind="chapters"][default][src]`),i=n.shadowRoot?.querySelector(`:is(video,audio) > track[kind="chapters"][default][src]`);return r?.addEventListener(`load`,e),i?.addEventListener(`load`,e),()=>{r?.removeEventListener(`load`,e),i?.removeEventListener(`load`,e)}}]},mediaIsPip:{get(e){let{media:t,documentElement:n}=e;if(!t||!n||!n.pictureInPictureElement)return!1;if(n.pictureInPictureElement===t)return!0;if(n.pictureInPictureElement instanceof HTMLMediaElement)return t.localName?.includes(`-`)?at(t,n.pictureInPictureElement):!1;if(n.pictureInPictureElement.localName.includes(`-`)){let e=n.pictureInPictureElement.shadowRoot;for(;e?.pictureInPictureElement;){if(e.pictureInPictureElement===t)return!0;e=e.pictureInPictureElement?.shadowRoot}}return!1},set(e,t){let{media:n}=t;if(n){if(e){if(!O.pictureInPictureEnabled){console.warn(`MediaChrome: Picture-in-picture is not enabled`);return}if(!n.requestPictureInPicture){console.warn(`MediaChrome: The current media does not support picture-in-picture`);return}let e=()=>{console.warn(`MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.`)};n.requestPictureInPicture().catch(t=>{if(t.code===11){if(!n.src){console.warn(`MediaChrome: The media is not ready for picture-in-picture. It must have a src set.`);return}if(n.readyState===0&&n.preload===`none`){let t=()=>{n.removeEventListener(`loadedmetadata`,r),n.preload=`none`},r=()=>{n.requestPictureInPicture().catch(e),t()};n.addEventListener(`loadedmetadata`,r),n.preload=`metadata`,setTimeout(()=>{n.readyState===0&&e(),t()},1e3)}else throw t}else throw t})}else O.pictureInPictureElement&&O.exitPictureInPicture()}},mediaEvents:[`enterpictureinpicture`,`leavepictureinpicture`]},mediaRenditionList:{get(e){let{media:t}=e;return[...t?.videoRenditions??[]].map(e=>({...e}))},mediaEvents:[`emptied`,`loadstart`],videoRenditionsEvents:[`addrendition`,`removerendition`]},mediaRenditionSelected:{get(e){let{media:t}=e;return t?.videoRenditions?.[t.videoRenditions?.selectedIndex]?.id},set(e,t){let{media:n}=t;if(!n?.videoRenditions){console.warn(`MediaController: Rendition selection not supported by this media.`);return}let r=e,i=Array.prototype.findIndex.call(n.videoRenditions,e=>e.id==r);n.videoRenditions.selectedIndex!=i&&(n.videoRenditions.selectedIndex=i)},mediaEvents:[`emptied`],videoRenditionsEvents:[`addrendition`,`removerendition`,`change`]},mediaAudioTrackList:{get(e){let{media:t}=e;return[...t?.audioTracks??[]]},mediaEvents:[`emptied`,`loadstart`],audioTracksEvents:[`addtrack`,`removetrack`]},mediaAudioTrackEnabled:{get(e){let{media:t}=e;return[...t?.audioTracks??[]].find(e=>e.enabled)?.id},set(e,t){let{media:n}=t;if(!n?.audioTracks){console.warn(`MediaChrome: Audio track selection not supported by this media.`);return}let r=e;for(let e of n.audioTracks)e.enabled=r==e.id},mediaEvents:[`emptied`],audioTracksEvents:[`addtrack`,`removetrack`,`change`]},mediaIsFullscreen:{get(e){return En(e)},set(e,t,n){var r;e?(xn(t),n.detail&&!t.media?.inert&&((r=t.media)==null||r.focus())):Cn(t)},rootEvents:[`fullscreenchange`,`webkitfullscreenchange`],mediaEvents:[`webkitbeginfullscreen`,`webkitendfullscreen`,`webkitpresentationmodechanged`]},mediaIsCasting:{get(e){let{media:t}=e;return!t?.remote||t.remote?.state===`disconnected`?!1:t.remote.state===`connected`},set(e,t){let{media:n}=t;if(n&&!(e&&n.remote?.state!==`disconnected`)&&(e||n.remote?.state===`connected`)){if(typeof n.remote.prompt!=`function`){console.warn(`MediaChrome: Casting is not supported in this environment`);return}n.remote.prompt().catch(()=>{})}},remoteEvents:[`connect`,`connecting`,`disconnect`]},mediaIsAirplaying:{get(){return!1},set(e,t){let{media:n}=t;if(n){if(!(n.webkitShowPlaybackTargetPicker&&D.WebKitPlaybackTargetAvailabilityEvent)){console.error(`MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment`);return}n.webkitShowPlaybackTargetPicker()}},mediaEvents:[`webkitcurrentplaybacktargetiswirelesschanged`]},mediaFullscreenUnavailable:{get(e){let{media:t}=e;if(!Ln||!In(t))return C.UNSUPPORTED}},mediaPipUnavailable:{get(e){let{media:t}=e;if(!Rn||!Fn(t))return C.UNSUPPORTED;if(t?.disablePictureInPicture)return C.UNAVAILABLE}},mediaVolumeUnavailable:{get(e){let{media:t}=e;if(qn===!1||t?.volume==null)return C.UNSUPPORTED},stateOwnersUpdateHandlers:[e=>{qn??Jn.then(t=>e(t?void 0:C.UNSUPPORTED))}]},mediaCastUnavailable:{get(e,{availability:t=`not-available`}={}){let{media:n}=e;if(!Bn||!n?.remote?.state)return C.UNSUPPORTED;if(t!=null&&t!==`available`)return C.UNAVAILABLE},stateOwnersUpdateHandlers:[(e,t)=>{var n;let{media:r}=t;if(r)return r.disableRemotePlayback||r.hasAttribute(`disableremoteplayback`)||(n=r?.remote)==null||n.watchAvailability(t=>{e({availability:t?`available`:`not-available`})}).catch(t=>{t.name===`NotSupportedError`?e({availability:null}):e({availability:`not-available`})}),()=>{var e;(e=r?.remote)==null||e.cancelWatchAvailability().catch(()=>{})}}]},mediaAirplayUnavailable:{get(e,t){if(!zn)return C.UNSUPPORTED;if(t?.availability===`not-available`)return C.UNAVAILABLE},mediaEvents:[`webkitplaybacktargetavailabilitychanged`],stateOwnersUpdateHandlers:[(e,t)=>{var n;let{media:r}=t;if(r)return r.disableRemotePlayback||r.hasAttribute(`disableremoteplayback`)||(n=r?.remote)==null||n.watchAvailability(t=>{e({availability:t?`available`:`not-available`})}).catch(t=>{t.name===`NotSupportedError`?e({availability:null}):e({availability:`not-available`})}),()=>{var e;(e=r?.remote)==null||e.cancelWatchAvailability().catch(()=>{})}}]},mediaRenditionUnavailable:{get(e){let{media:t}=e;if(!t?.videoRenditions)return C.UNSUPPORTED;if(!t.videoRenditions?.length)return C.UNAVAILABLE},mediaEvents:[`emptied`,`loadstart`],videoRenditionsEvents:[`addrendition`,`removerendition`]},mediaAudioTrackUnavailable:{get(e){let{media:t}=e;if(!t?.audioTracks)return C.UNSUPPORTED;if((t.audioTracks?.length??0)<=1)return C.UNAVAILABLE},mediaEvents:[`emptied`,`loadstart`],audioTracksEvents:[`addtrack`,`removetrack`]},mediaLang:{get(e){let{options:{mediaLang:t}={}}=e;return t??`en`}}},$n={[w.MEDIA_PREVIEW_REQUEST](e,t,{detail:n}){let{media:r}=t,i=n??void 0,a,o;if(r&&i!=null){let[e]=yn(r,{kind:be.METADATA,label:`thumbnails`}),t=Array.prototype.find.call(e?.cues??[],(e,t,n)=>t===0?e.endTime>i:t===n.length-1?e.startTime<=i:e.startTime<=i&&e.endTime>i);if(t){let e=/'^(?:[a-z]+:)?\/\//i.test(t.text)?void 0:r?.querySelector(`track[label="thumbnails"]`)?.src,n=new URL(t.text,e);o=new URLSearchParams(n.hash).get(`#xywh`).split(`,`).map(e=>+e),a=n.href}}let s=e.mediaDuration.get(t),c=e.mediaChaptersCues.get(t).find((e,t,n)=>t===n.length-1&&s===e.endTime?e.startTime<=i&&e.endTime>=i:e.startTime<=i&&e.endTime>i)?.text;return n!=null&&c==null&&(c=``),{mediaPreviewTime:i,mediaPreviewImage:a,mediaPreviewCoords:o,mediaPreviewChapter:c}},[w.MEDIA_PAUSE_REQUEST](e,t){e.mediaPaused.set(!0,t)},[w.MEDIA_PLAY_REQUEST](e,t){let n=e.mediaStreamType.get(t)===he.LIVE,r=!t.options?.noAutoSeekToLive,i=e.mediaTargetLiveWindow.get(t)>0;if(n&&r&&!i){let n=e.mediaSeekable.get(t)?.[1];if(n){let r=n-(t.options?.seekToLiveOffset??0);e.mediaCurrentTime.set(r,t)}}e.mediaPaused.set(!1,t)},[w.MEDIA_PLAYBACK_RATE_REQUEST](e,t,{detail:n}){let r=n;e.mediaPlaybackRate.set(r,t)},[w.MEDIA_MUTE_REQUEST](e,t){e.mediaMuted.set(!0,t)},[w.MEDIA_UNMUTE_REQUEST](e,t){e.mediaVolume.get(t)||e.mediaVolume.set(.25,t),e.mediaMuted.set(!1,t)},[w.MEDIA_LOOP_REQUEST](e,t,{detail:n}){let r=!!n;return e.mediaLoop.set(r,t),{mediaLoop:r}},[w.MEDIA_VOLUME_REQUEST](e,t,{detail:n}){let r=n;r&&e.mediaMuted.get(t)&&e.mediaMuted.set(!1,t),e.mediaVolume.set(r,t)},[w.MEDIA_SEEK_REQUEST](e,t,{detail:n}){let r=n;e.mediaCurrentTime.set(r,t)},[w.MEDIA_SEEK_TO_LIVE_REQUEST](e,t){let n=e.mediaSeekable.get(t)?.[1];if(Number.isNaN(Number(n)))return;let r=n-(t.options?.seekToLiveOffset??0);e.mediaCurrentTime.set(r,t)},[w.MEDIA_SHOW_SUBTITLES_REQUEST](e,t,{detail:n}){let{options:r}=t,i=Vn(t),a=pn(n),o=a[0]?.language;o&&!r.noSubtitlesLangPref&&D.localStorage.setItem(`media-chrome-pref-subtitles-lang`,o),vn(pe.SHOWING,i,a)},[w.MEDIA_DISABLE_SUBTITLES_REQUEST](e,t,{detail:n}){let r=Vn(t),i=n??[];vn(pe.DISABLED,r,i)},[w.MEDIA_TOGGLE_SUBTITLES_REQUEST](e,t,{detail:n}){Un(t,n)},[w.MEDIA_RENDITION_REQUEST](e,t,{detail:n}){let r=n;e.mediaRenditionSelected.set(r,t)},[w.MEDIA_AUDIO_TRACK_REQUEST](e,t,{detail:n}){let r=n;e.mediaAudioTrackEnabled.set(r,t)},[w.MEDIA_ENTER_PIP_REQUEST](e,t){e.mediaIsFullscreen.get(t)&&e.mediaIsFullscreen.set(!1,t),e.mediaIsPip.set(!0,t)},[w.MEDIA_EXIT_PIP_REQUEST](e,t){e.mediaIsPip.set(!1,t)},[w.MEDIA_ENTER_FULLSCREEN_REQUEST](e,t,n){e.mediaIsPip.get(t)&&e.mediaIsPip.set(!1,t),e.mediaIsFullscreen.set(!0,t,n)},[w.MEDIA_EXIT_FULLSCREEN_REQUEST](e,t){e.mediaIsFullscreen.set(!1,t)},[w.MEDIA_ENTER_CAST_REQUEST](e,t){e.mediaIsFullscreen.get(t)&&e.mediaIsFullscreen.set(!1,t),e.mediaIsCasting.set(!0,t)},[w.MEDIA_EXIT_CAST_REQUEST](e,t){e.mediaIsCasting.set(!1,t)},[w.MEDIA_AIRPLAY_REQUEST](e,t){e.mediaIsAirplaying.set(!0,t)}},er=({media:e,fullscreenElement:t,documentElement:n,stateMediator:r=Qn,requestMap:i=$n,options:a={},monitorStateOwnersOnlyWithSubscriptions:o=!0})=>{let s=[],c={options:{...a}},l=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0}),u=e=>{e!=null&&(Wn(e,l)||(l=Object.freeze({...l,...e}),s.forEach(e=>e(l))))},d=()=>{let e=Object.entries(r).reduce((e,[t,{get:n}])=>(e[t]=n(c),e),{});u(e)},f={},p,m=async(e,t)=>{let n=!!p;if(p={...c,...p??{},...e},n)return;await Yn(...Object.values(e));let i=s.length>0&&t===0&&o,a=c.media!==p.media,l=c.media?.textTracks!==p.media?.textTracks,m=c.media?.videoRenditions!==p.media?.videoRenditions,h=c.media?.audioTracks!==p.media?.audioTracks,g=c.media?.remote!==p.media?.remote,_=c.documentElement!==p.documentElement,v=!!c.media&&(a||i),ee=!!c.media?.textTracks&&(l||i),te=!!c.media?.videoRenditions&&(m||i),ne=!!c.media?.audioTracks&&(h||i),re=!!c.media?.remote&&(g||i),ie=!!c.documentElement&&(_||i),ae=v||ee||te||ne||re||ie,oe=s.length===0&&t===1&&o,y=!!p.media&&(a||oe),se=!!p.media?.textTracks&&(l||oe),b=!!p.media?.videoRenditions&&(m||oe),ce=!!p.media?.audioTracks&&(h||oe),le=!!p.media?.remote&&(g||oe),ue=!!p.documentElement&&(_||oe),de=y||se||b||ce||le||ue;if(!(ae||de)){Object.entries(p).forEach(([e,t])=>{c[e]=t}),d(),p=void 0;return}Object.entries(r).forEach(([e,{get:t,mediaEvents:n=[],textTracksEvents:r=[],videoRenditionsEvents:i=[],audioTracksEvents:a=[],remoteEvents:o=[],rootEvents:s=[],stateOwnersUpdateHandlers:l=[]}])=>{f[e]||(f[e]={});let d=n=>{let r=t(c,n);u({[e]:r})},m;m=f[e].mediaEvents,n.forEach(t=>{m&&v&&(c.media.removeEventListener(t,m),f[e].mediaEvents=void 0),y&&(p.media.addEventListener(t,d),f[e].mediaEvents=d)}),m=f[e].textTracksEvents,r.forEach(t=>{var n,r;m&&ee&&((n=c.media.textTracks)==null||n.removeEventListener(t,m),f[e].textTracksEvents=void 0),se&&((r=p.media.textTracks)==null||r.addEventListener(t,d),f[e].textTracksEvents=d)}),m=f[e].videoRenditionsEvents,i.forEach(t=>{var n,r;m&&te&&((n=c.media.videoRenditions)==null||n.removeEventListener(t,m),f[e].videoRenditionsEvents=void 0),b&&((r=p.media.videoRenditions)==null||r.addEventListener(t,d),f[e].videoRenditionsEvents=d)}),m=f[e].audioTracksEvents,a.forEach(t=>{var n,r;m&&ne&&((n=c.media.audioTracks)==null||n.removeEventListener(t,m),f[e].audioTracksEvents=void 0),ce&&((r=p.media.audioTracks)==null||r.addEventListener(t,d),f[e].audioTracksEvents=d)}),m=f[e].remoteEvents,o.forEach(t=>{var n,r;m&&re&&((n=c.media.remote)==null||n.removeEventListener(t,m),f[e].remoteEvents=void 0),le&&((r=p.media.remote)==null||r.addEventListener(t,d),f[e].remoteEvents=d)}),m=f[e].rootEvents,s.forEach(t=>{m&&ie&&(c.documentElement.removeEventListener(t,m),f[e].rootEvents=void 0),ue&&(p.documentElement.addEventListener(t,d),f[e].rootEvents=d)});let h=f[e].stateOwnersUpdateHandlers;if(h&&ae&&(Array.isArray(h)?h:[h]).forEach(e=>{typeof e==`function`&&e()}),de){let t=l.map(e=>e(d,p)).filter(e=>typeof e==`function`);f[e].stateOwnersUpdateHandlers=t.length===1?t[0]:t}else ae&&(f[e].stateOwnersUpdateHandlers=void 0)}),Object.entries(p).forEach(([e,t])=>{c[e]=t}),d(),p=void 0};return m({media:e,fullscreenElement:t,documentElement:n,options:a}),{dispatch(e){let{type:t,detail:n}=e;if(i[t]&&l.mediaErrorCode==null){u(i[t](r,c,e));return}t===`mediaelementchangerequest`?m({media:n}):t===`fullscreenelementchangerequest`?m({fullscreenElement:n}):t===`documentelementchangerequest`?m({documentElement:n}):t===`optionschangerequest`&&(Object.entries(n??{}).forEach(([e,t])=>{c.options[e]=t}),d())},getState(){return l},subscribe(e){return m({},s.length+1),s.push(e),e(l),()=>{let t=s.indexOf(e);t>=0&&(m({},s.length-1),s.splice(t,1))}}}},tr=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},V=(e,t,n)=>(tr(e,t,`read from private field`),n?n.call(e):t.get(e)),nr=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},rr=(e,t,n,r)=>(tr(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),ir=(e,t,n)=>(tr(e,t,`access private method`),n),ar,or,H,sr,cr,lr,ur,dr,fr,pr,mr,hr,gr,_r,vr,yr=[`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`Enter`,` `,`f`,`m`,`k`,`c`,`l`,`j`,`>`,`<`,`p`],br=10,xr=.025,Sr=.25,Cr=.25,wr=2,U={DEFAULT_SUBTITLES:`defaultsubtitles`,DEFAULT_STREAM_TYPE:`defaultstreamtype`,DEFAULT_DURATION:`defaultduration`,FULLSCREEN_ELEMENT:`fullscreenelement`,HOTKEYS:`hotkeys`,KEYBOARD_BACKWARD_SEEK_OFFSET:`keyboardbackwardseekoffset`,KEYBOARD_FORWARD_SEEK_OFFSET:`keyboardforwardseekoffset`,KEYBOARD_DOWN_VOLUME_STEP:`keyboarddownvolumestep`,KEYBOARD_UP_VOLUME_STEP:`keyboardupvolumestep`,KEYS_USED:`keysused`,LANG:`lang`,LOOP:`loop`,LIVE_EDGE_OFFSET:`liveedgeoffset`,NO_AUTO_SEEK_TO_LIVE:`noautoseektolive`,NO_DEFAULT_STORE:`nodefaultstore`,NO_HOTKEYS:`nohotkeys`,NO_MUTED_PREF:`nomutedpref`,NO_SUBTITLES_LANG_PREF:`nosubtitleslangpref`,NO_VOLUME_PREF:`novolumepref`,SEEK_TO_LIVE_OFFSET:`seektoliveoffset`},Tr=class extends Zt{constructor(){super(),nr(this,fr),nr(this,hr),nr(this,_r),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,nr(this,ar,new ln(this,U.HOTKEYS)),nr(this,or,void 0),nr(this,H,void 0),nr(this,sr,null),nr(this,cr,void 0),nr(this,lr,void 0),nr(this,ur,e=>{var t;(t=V(this,H))==null||t.dispatch(e)}),nr(this,dr,void 0),nr(this,mr,e=>{let{key:t,shiftKey:n}=e;if(!(n&&(t===`/`||t===`?`)||yr.includes(t))){this.removeEventListener(`keyup`,V(this,mr));return}this.keyboardShortcutHandler(e)}),this.associateElement(this);let e={};rr(this,cr,t=>{Object.entries(t).forEach(([t,n])=>{if(t in e&&e[t]===n)return;this.propagateMediaState(t,n);let r=t.toLowerCase(),i=new D.CustomEvent(ye[r],{composed:!0,detail:n});this.dispatchEvent(i)}),e=t})}static get observedAttributes(){return super.observedAttributes.concat(U.NO_HOTKEYS,U.HOTKEYS,U.DEFAULT_STREAM_TYPE,U.DEFAULT_SUBTITLES,U.DEFAULT_DURATION,U.NO_MUTED_PREF,U.NO_VOLUME_PREF,U.LANG,U.LOOP,U.LIVE_EDGE_OFFSET,U.SEEK_TO_LIVE_OFFSET,U.NO_AUTO_SEEK_TO_LIVE)}get mediaStore(){return V(this,H)}set mediaStore(e){var t;if(V(this,H)&&((t=V(this,lr))==null||t.call(this),rr(this,lr,void 0)),rr(this,H,e),!V(this,H)&&!this.hasAttribute(U.NO_DEFAULT_STORE)){ir(this,fr,pr).call(this);return}rr(this,lr,V(this,H)?.subscribe(V(this,cr)))}get fullscreenElement(){return V(this,or)??this}set fullscreenElement(e){var t;this.hasAttribute(U.FULLSCREEN_ELEMENT)&&this.removeAttribute(U.FULLSCREEN_ELEMENT),rr(this,or,e),(t=V(this,H))==null||t.dispatch({type:`fullscreenelementchangerequest`,detail:this.fullscreenElement})}get defaultSubtitles(){return M(this,U.DEFAULT_SUBTITLES)}set defaultSubtitles(e){N(this,U.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return P(this,U.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){F(this,U.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return A(this,U.DEFAULT_DURATION)}set defaultDuration(e){j(this,U.DEFAULT_DURATION,e)}get noHotkeys(){return M(this,U.NO_HOTKEYS)}set noHotkeys(e){N(this,U.NO_HOTKEYS,e)}get keysUsed(){return P(this,U.KEYS_USED)}set keysUsed(e){F(this,U.KEYS_USED,e)}get liveEdgeOffset(){return A(this,U.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){j(this,U.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return M(this,U.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){N(this,U.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return M(this,U.NO_VOLUME_PREF)}set noVolumePref(e){N(this,U.NO_VOLUME_PREF,e)}get noMutedPref(){return M(this,U.NO_MUTED_PREF)}set noMutedPref(e){N(this,U.NO_MUTED_PREF,e)}get noSubtitlesLangPref(){return M(this,U.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){N(this,U.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return M(this,U.NO_DEFAULT_STORE)}set noDefaultStore(e){N(this,U.NO_DEFAULT_STORE,e)}get resolvedLang(){return Fe()}attributeChangedCallback(e,t,n){var r,i,a,o,s,c,l,u,d,f;if(super.attributeChangedCallback(e,t,n),e===U.NO_HOTKEYS)n!==t&&n===``?(this.hasAttribute(U.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):n!==t&&n===null&&this.enableHotkeys();else if(e===U.HOTKEYS)V(this,ar).value=n;else if(e===U.DEFAULT_SUBTITLES&&n!==t)(r=V(this,H))==null||r.dispatch({type:`optionschangerequest`,detail:{defaultSubtitles:this.hasAttribute(U.DEFAULT_SUBTITLES)}});else if(e===U.DEFAULT_STREAM_TYPE)(i=V(this,H))==null||i.dispatch({type:`optionschangerequest`,detail:{defaultStreamType:this.getAttribute(U.DEFAULT_STREAM_TYPE)??void 0}});else if(e===U.LIVE_EDGE_OFFSET&&n!==t)(a=V(this,H))==null||a.dispatch({type:`optionschangerequest`,detail:{liveEdgeOffset:this.hasAttribute(U.LIVE_EDGE_OFFSET)?+this.getAttribute(U.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(U.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(U.SEEK_TO_LIVE_OFFSET):this.hasAttribute(U.LIVE_EDGE_OFFSET)?+this.getAttribute(U.LIVE_EDGE_OFFSET):void 0}});else if(e===U.SEEK_TO_LIVE_OFFSET&&n!==t)(o=V(this,H))==null||o.dispatch({type:`optionschangerequest`,detail:{seekToLiveOffset:this.hasAttribute(U.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(U.SEEK_TO_LIVE_OFFSET):this.hasAttribute(U.LIVE_EDGE_OFFSET)?+this.getAttribute(U.LIVE_EDGE_OFFSET):void 0}});else if(e===U.NO_AUTO_SEEK_TO_LIVE)(s=V(this,H))==null||s.dispatch({type:`optionschangerequest`,detail:{noAutoSeekToLive:this.hasAttribute(U.NO_AUTO_SEEK_TO_LIVE)}});else if(e===U.FULLSCREEN_ELEMENT){let e=n?this.getRootNode()?.getElementById(n):void 0;rr(this,or,e),(c=V(this,H))==null||c.dispatch({type:`fullscreenelementchangerequest`,detail:this.fullscreenElement})}else e===U.LANG&&n!==t?(Me(n),(l=V(this,H))==null||l.dispatch({type:`optionschangerequest`,detail:{mediaLang:n}})):e===U.LOOP&&n!==t?(u=V(this,H))==null||u.dispatch({type:w.MEDIA_LOOP_REQUEST,detail:n!=null}):e===U.NO_VOLUME_PREF&&n!==t?(d=V(this,H))==null||d.dispatch({type:`optionschangerequest`,detail:{noVolumePref:this.hasAttribute(U.NO_VOLUME_PREF)}}):e===U.NO_MUTED_PREF&&n!==t&&((f=V(this,H))==null||f.dispatch({type:`optionschangerequest`,detail:{noMutedPref:this.hasAttribute(U.NO_MUTED_PREF)}}))}connectedCallback(){var e,t;this.associateElement(this),!V(this,H)&&!this.hasAttribute(U.NO_DEFAULT_STORE)&&ir(this,fr,pr).call(this),(e=V(this,H))==null||e.dispatch({type:`documentelementchangerequest`,detail:O}),(t=V(this,H))==null||t.dispatch({type:`fullscreenelementchangerequest`,detail:this.fullscreenElement}),super.connectedCallback(),V(this,H)&&!V(this,lr)&&rr(this,lr,V(this,H)?.subscribe(V(this,cr))),V(this,dr)!==void 0&&V(this,H)&&this.media&&setTimeout(()=>{var e;this.media?.textTracks?.length&&((e=V(this,H))==null||e.dispatch({type:w.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:V(this,dr)}))},0),this.hasAttribute(U.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}disconnectedCallback(){var e,t,n,r,i;if((e=super.disconnectedCallback)==null||e.call(this),this.disableHotkeys(),V(this,H)){let e=V(this,H).getState();rr(this,dr,!!e.mediaSubtitlesShowing?.length),(t=V(this,H))==null||t.dispatch({type:`fullscreenelementchangerequest`,detail:void 0}),(n=V(this,H))==null||n.dispatch({type:`documentelementchangerequest`,detail:void 0}),(r=V(this,H))==null||r.dispatch({type:w.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})}V(this,lr)&&((i=V(this,lr))==null||i.call(this),rr(this,lr,void 0)),this.unassociateElement(this),V(this,sr)&&(V(this,sr).remove(),rr(this,sr,null))}mediaSetCallback(e){var t;super.mediaSetCallback(e),(t=V(this,H))==null||t.dispatch({type:`mediaelementchangerequest`,detail:e}),e.hasAttribute(`tabindex`)||(e.tabIndex=-1)}mediaUnsetCallback(e){var t;super.mediaUnsetCallback(e),(t=V(this,H))==null||t.dispatch({type:`mediaelementchangerequest`,detail:void 0})}propagateMediaState(e,t){Ir(this.mediaStateReceivers,e,t)}associateElement(e){if(!e)return;let{associatedElementSubscriptions:t}=this;if(t.has(e))return;let n=Lr(e,this.registerMediaStateReceiver.bind(this),this.unregisterMediaStateReceiver.bind(this));Object.values(w).forEach(t=>{e.addEventListener(t,V(this,ur))}),t.set(e,n)}unassociateElement(e){if(!e)return;let{associatedElementSubscriptions:t}=this;t.has(e)&&(t.get(e)(),t.delete(e),Object.values(w).forEach(t=>{e.removeEventListener(t,V(this,ur))}))}registerMediaStateReceiver(e){if(!e)return;let t=this.mediaStateReceivers;t.indexOf(e)>-1||(t.push(e),V(this,H)&&Object.entries(V(this,H).getState()).forEach(([t,n])=>{Ir([e],t,n)}))}unregisterMediaStateReceiver(e){let t=this.mediaStateReceivers,n=t.indexOf(e);n<0||t.splice(n,1)}enableHotkeys(){this.addEventListener(`keydown`,ir(this,hr,gr))}disableHotkeys(){this.removeEventListener(`keydown`,ir(this,hr,gr)),this.removeEventListener(`keyup`,V(this,mr))}get hotkeys(){return V(this,ar)}set hotkeys(e){F(this,U.HOTKEYS,e)}keyboardShortcutHandler(e){let t=e.target;if((t.getAttribute(U.KEYS_USED)?.split(` `)??t?.keysUsed??[]).map(e=>e===`Space`?` `:e).filter(Boolean).includes(e.key))return;let n,r,i;if(!V(this,ar).contains(`no${e.key.toLowerCase()}`)&&!(e.key===` `&&V(this,ar).contains(`nospace`))&&(!e.shiftKey||e.key!==`/`&&e.key!==`?`||!V(this,ar).contains(`noshift+/`)))switch(e.key){case` `:case`k`:n=V(this,H).getState().mediaPaused?w.MEDIA_PLAY_REQUEST:w.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new D.CustomEvent(n,{composed:!0,bubbles:!0}));break;case`m`:n=this.mediaStore.getState().mediaVolumeLevel===`off`?w.MEDIA_UNMUTE_REQUEST:w.MEDIA_MUTE_REQUEST,this.dispatchEvent(new D.CustomEvent(n,{composed:!0,bubbles:!0}));break;case`f`:n=this.mediaStore.getState().mediaIsFullscreen?w.MEDIA_EXIT_FULLSCREEN_REQUEST:w.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new D.CustomEvent(n,{composed:!0,bubbles:!0}));break;case`c`:this.dispatchEvent(new D.CustomEvent(w.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case`ArrowLeft`:case`j`:{let e=this.hasAttribute(U.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(U.KEYBOARD_BACKWARD_SEEK_OFFSET):br;r=Math.max((this.mediaStore.getState().mediaCurrentTime??0)-e,0),i=new D.CustomEvent(w.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`ArrowRight`:case`l`:{let e=this.hasAttribute(U.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(U.KEYBOARD_FORWARD_SEEK_OFFSET):br;r=Math.max((this.mediaStore.getState().mediaCurrentTime??0)+e,0),i=new D.CustomEvent(w.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`ArrowUp`:{let e=this.hasAttribute(U.KEYBOARD_UP_VOLUME_STEP)?+this.getAttribute(U.KEYBOARD_UP_VOLUME_STEP):xr;r=Math.min((this.mediaStore.getState().mediaVolume??1)+e,1),i=new D.CustomEvent(w.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`ArrowDown`:{let e=this.hasAttribute(U.KEYBOARD_DOWN_VOLUME_STEP)?+this.getAttribute(U.KEYBOARD_DOWN_VOLUME_STEP):xr;r=Math.max((this.mediaStore.getState().mediaVolume??1)-e,0),i=new D.CustomEvent(w.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`<`:{let e=this.mediaStore.getState().mediaPlaybackRate??1;r=Math.max(e-Sr,Cr).toFixed(2),i=new D.CustomEvent(w.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`>`:{let e=this.mediaStore.getState().mediaPlaybackRate??1;r=Math.min(e+Sr,wr).toFixed(2),i=new D.CustomEvent(w.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`/`:case`?`:e.shiftKey&&ir(this,_r,vr).call(this);break;case`p`:n=this.mediaStore.getState().mediaIsPip?w.MEDIA_EXIT_PIP_REQUEST:w.MEDIA_ENTER_PIP_REQUEST,i=new D.CustomEvent(n,{composed:!0,bubbles:!0}),this.dispatchEvent(i)}}};ar=new WeakMap,or=new WeakMap,H=new WeakMap,sr=new WeakMap,cr=new WeakMap,lr=new WeakMap,ur=new WeakMap,dr=new WeakMap,fr=new WeakSet,pr=function(){this.mediaStore=er({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(U.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(U.DEFAULT_DURATION)?+this.getAttribute(U.DEFAULT_DURATION):void 0,defaultStreamType:this.getAttribute(U.DEFAULT_STREAM_TYPE)??void 0,liveEdgeOffset:this.hasAttribute(U.LIVE_EDGE_OFFSET)?+this.getAttribute(U.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(U.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(U.SEEK_TO_LIVE_OFFSET):this.hasAttribute(U.LIVE_EDGE_OFFSET)?+this.getAttribute(U.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(U.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(U.NO_VOLUME_PREF),noMutedPref:this.hasAttribute(U.NO_MUTED_PREF),noSubtitlesLangPref:this.hasAttribute(U.NO_SUBTITLES_LANG_PREF)}})},mr=new WeakMap,hr=new WeakSet,gr=function(e){let{metaKey:t,altKey:n,key:r,shiftKey:i}=e,a=i&&(r===`/`||r===`?`);if(a&&V(this,sr)?.open){this.removeEventListener(`keyup`,V(this,mr));return}if(t||n||!a&&!yr.includes(r)){this.removeEventListener(`keyup`,V(this,mr));return}let o=e.target,s=o instanceof HTMLElement&&(o.tagName.toLowerCase()===`media-volume-range`||o.tagName.toLowerCase()===`media-time-range`);[` `,`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`].includes(r)&&!(V(this,ar).contains(`no${r.toLowerCase()}`)||r===` `&&V(this,ar).contains(`nospace`))&&!s&&e.preventDefault(),this.addEventListener(`keyup`,V(this,mr),{once:!0})},_r=new WeakSet,vr=function(){V(this,sr)||(rr(this,sr,O.createElement(`media-keyboard-shortcuts-dialog`)),this.appendChild(V(this,sr))),V(this,sr).open=!0};var Er=Object.values(x),Dr=Object.values(ve),Or=e=>{var t;let{observedAttributes:n}=e.constructor;!n&&e.nodeName?.includes(`-`)&&(D.customElements.upgrade(e),{observedAttributes:n}=e.constructor);let r=((t=(e?.getAttribute)?.call(e,S.MEDIA_CHROME_ATTRIBUTES))?.split)?.call(t,/\s+/);return Array.isArray(n||r)?(n||r).filter(e=>Er.includes(e)):[]},kr=e=>(e.nodeName?.includes(`-`)&&D.customElements.get(e.nodeName?.toLowerCase())&&!(e instanceof D.customElements.get(e.nodeName.toLowerCase()))&&D.customElements.upgrade(e),Dr.some(t=>t in e)),Ar=e=>kr(e)||!!Or(e).length,jr=e=>(e?.join)?.call(e,`:`),Mr={[x.MEDIA_SUBTITLES_LIST]:hn,[x.MEDIA_SUBTITLES_SHOWING]:hn,[x.MEDIA_SEEKABLE]:jr,[x.MEDIA_BUFFERED]:e=>e?.map(jr).join(` `),[x.MEDIA_PREVIEW_COORDS]:e=>e?.join(` `),[x.MEDIA_RENDITION_LIST]:we,[x.MEDIA_AUDIO_TRACK_LIST]:Ee},Nr=async(e,t,n)=>{if(e.isConnected||await ke(0),typeof n==`boolean`||n==null)return N(e,t,n);if(typeof n==`number`)return j(e,t,n);if(typeof n==`string`)return F(e,t,n);if(Array.isArray(n)&&!n.length)return e.removeAttribute(t);let r=Mr[t]?.call(Mr,n)??n;return e.setAttribute(t,r)},Pr=e=>!!e.closest?.call(e,`*[slot="media"]`),Fr=(e,t)=>{if(Pr(e))return;let n=(e,t)=>{Ar(e)&&t(e);let{children:n=[]}=e??{},r=e?.shadowRoot?.children??[];[...n,...r].forEach(e=>Fr(e,t))},r=e?.nodeName.toLowerCase();if(r.includes(`-`)&&!Ar(e)){D.customElements.whenDefined(r).then(()=>{n(e,t)});return}n(e,t)},Ir=(e,t,n)=>{e.forEach(e=>{if(t in e){e[t]=n;return}let r=Or(e),i=t.toLowerCase();r.includes(i)&&Nr(e,i,n)})},Lr=(e,t,n)=>{Fr(e,t);let r=e=>{t(e?.composedPath()[0]??e.target)},i=e=>{n(e?.composedPath()[0]??e.target)};e.addEventListener(w.REGISTER_MEDIA_STATE_RECEIVER,r),e.addEventListener(w.UNREGISTER_MEDIA_STATE_RECEIVER,i);let a=e=>{e.forEach(e=>{let{addedNodes:r=[],removedNodes:i=[],type:a,target:o,attributeName:s}=e;a===`childList`?(Array.prototype.forEach.call(r,e=>Fr(e,t)),Array.prototype.forEach.call(i,e=>Fr(e,n))):a===`attributes`&&s===S.MEDIA_CHROME_ATTRIBUTES&&(Ar(o)?t(o):n(o))})},o=[],s=e=>{let r=e.target;r.name!==`media`&&(o.forEach(e=>Fr(e,n)),o=[...r.assignedElements({flatten:!0})],o.forEach(e=>Fr(e,t)))};e.addEventListener(`slotchange`,s);let c=new MutationObserver(a);return c.observe(e,{childList:!0,attributes:!0,subtree:!0}),()=>{Fr(e,n),e.removeEventListener(`slotchange`,s),c.disconnect(),e.removeEventListener(w.REGISTER_MEDIA_STATE_RECEIVER,r),e.removeEventListener(w.UNREGISTER_MEDIA_STATE_RECEIVER,i)}};D.customElements.get(`media-controller`)||D.customElements.define(`media-controller`,Tr);var Rr=Tr,zr={PLACEMENT:`placement`,BOUNDS:`bounds`};function Br(e){return`
    <style>
      :host {
        --_tooltip-background-color: var(--media-tooltip-background-color, var(--media-secondary-color, rgba(20, 20, 30, .7)));
        --_tooltip-background: var(--media-tooltip-background, var(--_tooltip-background-color));
        --_tooltip-arrow-half-width: calc(var(--media-tooltip-arrow-width, 12px) / 2);
        --_tooltip-arrow-height: var(--media-tooltip-arrow-height, 5px);
        --_tooltip-arrow-background: var(--media-tooltip-arrow-color, var(--_tooltip-background-color));
        position: relative;
        pointer-events: none;
        display: var(--media-tooltip-display, inline-flex);
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        z-index: var(--media-tooltip-z-index, 1);
        background: var(--_tooltip-background);
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        font: var(--media-font,
          var(--media-font-weight, 400)
          var(--media-font-size, 13px) /
          var(--media-text-content-height, var(--media-control-height, 18px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        padding: var(--media-tooltip-padding, .35em .7em);
        border: var(--media-tooltip-border, none);
        border-radius: var(--media-tooltip-border-radius, 5px);
        filter: var(--media-tooltip-filter, drop-shadow(0 0 4px rgba(0, 0, 0, .2)));
        white-space: var(--media-tooltip-white-space, nowrap);
      }

      :host([hidden]) {
        display: none;
      }

      img, svg {
        display: inline-block;
      }

      #arrow {
        position: absolute;
        width: 0px;
        height: 0px;
        border-style: solid;
        display: var(--media-tooltip-arrow-display, block);
      }

      :host(:not([placement])),
      :host([placement="top"]) {
        position: absolute;
        bottom: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host(:not([placement])) #arrow,
      :host([placement="top"]) #arrow {
        top: 100%;
        left: 50%;
        border-width: var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width);
        border-color: var(--_tooltip-arrow-background) transparent transparent transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="right"]) {
        position: absolute;
        left: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="right"]) #arrow {
        top: 50%;
        right: 100%;
        border-width: var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0;
        border-color: transparent var(--_tooltip-arrow-background) transparent transparent;
        transform: translate(0, -50%);
      }

      :host([placement="bottom"]) {
        position: absolute;
        top: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host([placement="bottom"]) #arrow {
        bottom: 100%;
        left: 50%;
        border-width: 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width);
        border-color: transparent transparent var(--_tooltip-arrow-background) transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="left"]) {
        position: absolute;
        right: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="left"]) #arrow {
        top: 50%;
        left: 100%;
        border-width: var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height);
        border-color: transparent transparent transparent var(--_tooltip-arrow-background);
        transform: translate(0, -50%);
      }
      
      :host([placement="none"]) #arrow {
        display: none;
      }
    </style>
    <slot></slot>
    <div id="arrow"></div>
  `}var Vr=class extends D.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{if(!lt(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;let e=this.placement;if(e===`left`||e===`right`){this.style.removeProperty(`--media-tooltip-offset-x`);return}let t=getComputedStyle(this),n=ot(this,`#`+this.bounds)??et(this);if(!n)return;let{x:r,width:i}=n.getBoundingClientRect(),{x:a,width:o}=this.getBoundingClientRect(),s=a+o,c=r+i,l=t.getPropertyValue(`--media-tooltip-offset-x`),u=l?parseFloat(l.replace(`px`,``)):0,d=t.getPropertyValue(`--media-tooltip-container-margin`),f=d?parseFloat(d.replace(`px`,``)):0,p=a-r+u-f,m=s-c+u+f;if(p<0){this.style.setProperty(`--media-tooltip-offset-x`,`${p}px`);return}if(m>0){this.style.setProperty(`--media-tooltip-offset-x`,`${m}px`);return}this.style.removeProperty(`--media-tooltip-offset-x`)},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=$e(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}if(this.arrowEl=this.shadowRoot.querySelector(`#arrow`),Object.prototype.hasOwnProperty.call(this,`placement`)){let e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[zr.PLACEMENT,zr.BOUNDS]}get placement(){return P(this,zr.PLACEMENT)}set placement(e){F(this,zr.PLACEMENT,e)}get bounds(){return P(this,zr.BOUNDS)}set bounds(e){F(this,zr.BOUNDS,e)}};Vr.shadowRootOptions={mode:`open`},Vr.getTemplateHTML=Br,D.customElements.get(`media-tooltip`)||D.customElements.define(`media-tooltip`,Vr);var Hr=Vr,Ur=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},W=(e,t,n)=>(Ur(e,t,`read from private field`),n?n.call(e):t.get(e)),Wr=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Gr=(e,t,n,r)=>(Ur(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Kr=(e,t,n)=>(Ur(e,t,`access private method`),n),qr,Jr,Yr,Xr,Zr,Qr,$r,ei={TOOLTIP_PLACEMENT:`tooltipplacement`,DISABLED:`disabled`,NO_TOOLTIP:`notooltip`};function ti(e,t={}){return`
    <style>
      :host {
        position: relative;
        font: var(--media-font,
          var(--media-font-weight, bold)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        padding: var(--media-button-padding, var(--media-control-padding, 10px));
        justify-content: var(--media-button-justify-content, center);
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        transition: background .15s linear;
        pointer-events: auto;
        cursor: var(--media-cursor, pointer);
        -webkit-tap-highlight-color: transparent;
      }

      
      :host(:focus-visible) {
        box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: 0;
      }
      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgba(50 50 70 / .7));
      }

      slot[name="icon"] {
        display: inline-flex;
        align-items: center;
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-button-icon-width);
        height: var(--media-button-icon-height, var(--media-control-height, 24px));
        transform: var(--media-button-icon-transform);
        transition: var(--media-button-icon-transition);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
      }

      media-tooltip {
        
        max-width: 0;
        overflow-x: clip;
        opacity: 0;
        transition: opacity .3s, max-width 0s 9s;
      }

      :host(:hover) media-tooltip,
      :host(:focus-visible) media-tooltip {
        max-width: 100vw;
        opacity: 1;
        transition: opacity .3s;
      }

      :host([notooltip]) slot[name="tooltip"] {
        display: none;
      }
    </style>

    ${this.getSlotTemplateHTML(e,t)}

    <slot name="tooltip">
      <media-tooltip part="tooltip" aria-hidden="true">
        <template shadowrootmode="${Hr.shadowRootOptions.mode}">
          ${Hr.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(e)}
        </slot>
      </media-tooltip>
    </slot>
  `}function ni(e,t){return`
    <slot></slot>
  `}function ri(){return``}var G=class extends D.HTMLElement{constructor(){if(super(),Wr(this,Qr),Wr(this,qr,void 0),this.preventClick=!1,this.tooltipEl=null,Wr(this,Jr,e=>{this.preventClick||this.handleClick(e),setTimeout(W(this,Yr),0)}),Wr(this,Yr,()=>{var e,t;(t=(e=this.tooltipEl)?.updateXOffset)==null||t.call(e)}),Wr(this,Xr,e=>{let{key:t}=e;if(!this.keysUsed.includes(t)){this.removeEventListener(`keyup`,W(this,Xr));return}this.preventClick||this.handleClick(e)}),Wr(this,Zr,e=>{let{metaKey:t,altKey:n,key:r}=e;if(t||n||!this.keysUsed.includes(r)){this.removeEventListener(`keyup`,W(this,Xr));return}this.addEventListener(`keyup`,W(this,Xr),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=$e(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}this.tooltipEl=this.shadowRoot.querySelector(`media-tooltip`)}static get observedAttributes(){return[`disabled`,ei.TOOLTIP_PLACEMENT,S.MEDIA_CONTROLLER,x.MEDIA_LANG]}enable(){this.addEventListener(`click`,W(this,Jr)),this.addEventListener(`keydown`,W(this,Zr)),this.tabIndex=0}disable(){this.removeEventListener(`click`,W(this,Jr)),this.removeEventListener(`keydown`,W(this,Zr)),this.removeEventListener(`keyup`,W(this,Xr)),this.tabIndex=-1}attributeChangedCallback(e,t,n){var r,i,a,o;e===S.MEDIA_CONTROLLER?(t&&((i=(r=W(this,qr))?.unassociateElement)==null||i.call(r,this),Gr(this,qr,null)),n&&this.isConnected&&(Gr(this,qr,this.getRootNode()?.getElementById(n)),(o=(a=W(this,qr))?.associateElement)==null||o.call(a,this))):e===`disabled`&&n!==t?n==null?this.enable():this.disable():e===ei.TOOLTIP_PLACEMENT&&this.tooltipEl&&n!==t?this.tooltipEl.placement=n:e===x.MEDIA_LANG&&(this.shadowRoot.querySelector(`slot[name="tooltip-content"]`).innerHTML=this.constructor.getTooltipContentHTML()),W(this,Yr).call(this)}connectedCallback(){var e,t;let{style:n}=k(this.shadowRoot,`:host`);n.setProperty(`display`,`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute(`disabled`)?this.disable():this.enable(),this.setAttribute(`role`,`button`);let r=this.getAttribute(S.MEDIA_CONTROLLER);r&&(Gr(this,qr,this.getRootNode()?.getElementById(r)),(t=(e=W(this,qr))?.associateElement)==null||t.call(e,this)),D.customElements.whenDefined(`media-tooltip`).then(()=>Kr(this,Qr,$r).call(this))}disconnectedCallback(){var e,t;this.disable(),(t=(e=W(this,qr))?.unassociateElement)==null||t.call(e,this),Gr(this,qr,null),this.removeEventListener(`mouseenter`,W(this,Yr)),this.removeEventListener(`focus`,W(this,Yr)),this.removeEventListener(`click`,W(this,Jr))}get keysUsed(){return[`Enter`,` `]}get tooltipPlacement(){return P(this,ei.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){F(this,ei.TOOLTIP_PLACEMENT,e)}get mediaController(){return P(this,S.MEDIA_CONTROLLER)}set mediaController(e){F(this,S.MEDIA_CONTROLLER,e)}get disabled(){return M(this,ei.DISABLED)}set disabled(e){N(this,ei.DISABLED,e)}get noTooltip(){return M(this,ei.NO_TOOLTIP)}set noTooltip(e){N(this,ei.NO_TOOLTIP,e)}handleClick(e){}};qr=new WeakMap,Jr=new WeakMap,Yr=new WeakMap,Xr=new WeakMap,Zr=new WeakMap,Qr=new WeakSet,$r=function(){this.addEventListener(`mouseenter`,W(this,Yr)),this.addEventListener(`focus`,W(this,Yr)),this.addEventListener(`click`,W(this,Jr));let e=this.tooltipPlacement;e&&this.tooltipEl&&(this.tooltipEl.placement=e)},G.shadowRootOptions={mode:`open`},G.getTemplateHTML=ti,G.getSlotTemplateHTML=ni,G.getTooltipContentHTML=ri,D.customElements.get(`media-chrome-button`)||D.customElements.define(`media-chrome-button`,G);var ii=G,ai=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`;function oi(e){return`
    <style>
      :host([${x.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${x.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${x.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
      :host(:not([${x.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${ai}</slot>
      <slot name="exit">${ai}</slot>
    </slot>
  `}function si(){return`
    <slot name="tooltip-enter">${E(`start airplay`)}</slot>
    <slot name="tooltip-exit">${E(`stop airplay`)}</slot>
  `}var ci=e=>{let t=e.mediaIsAirplaying?E(`stop airplay`):E(`start airplay`);e.setAttribute(`aria-label`,t)},li=class extends G{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_IS_AIRPLAYING,x.MEDIA_AIRPLAY_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),ci(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_IS_AIRPLAYING&&ci(this)}get mediaIsAirplaying(){return M(this,x.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){N(this,x.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return P(this,x.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){F(this,x.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){let e=new D.CustomEvent(w.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}};li.getSlotTemplateHTML=oi,li.getTooltipContentHTML=si,D.customElements.get(`media-airplay-button`)||D.customElements.define(`media-airplay-button`,li);var ui=li,di=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,fi=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function pi(e){return`
    <style>
      :host([aria-checked="true"]) slot[name=off] {
        display: none !important;
      }

      
      :host(:not([aria-checked="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-checked="true"]) slot[name=tooltip-enable],
      :host(:not([aria-checked="true"])) slot[name=tooltip-disable] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${di}</slot>
      <slot name="off">${fi}</slot>
    </slot>
  `}function mi(){return`
    <slot name="tooltip-enable">${E(`Enable captions`)}</slot>
    <slot name="tooltip-disable">${E(`Disable captions`)}</slot>
  `}var hi=e=>{e.setAttribute(`aria-checked`,bn(e).toString())},gi=class extends G{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_SUBTITLES_LIST,x.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`button`),this.setAttribute(`aria-label`,E(`closed captions`)),hi(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_SUBTITLES_SHOWING&&hi(this)}get mediaSubtitlesList(){return _i(this,x.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){vi(this,x.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return _i(this,x.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){vi(this,x.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new D.CustomEvent(w.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}};gi.getSlotTemplateHTML=pi,gi.getTooltipContentHTML=mi;var _i=(e,t)=>{let n=e.getAttribute(t);return n?fn(n):[]},vi=(e,t,n)=>{if(!n?.length){e.removeAttribute(t);return}let r=hn(n);e.getAttribute(t)!==r&&e.setAttribute(t,r)};D.customElements.get(`media-captions-button`)||D.customElements.define(`media-captions-button`,gi);var yi=gi,bi=`<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>`,xi=`<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>`;function Si(e){return`
    <style>
      :host([${x.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${x.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${x.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
      :host(:not([${x.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${bi}</slot>
      <slot name="exit">${xi}</slot>
    </slot>
  `}function Ci(){return`
    <slot name="tooltip-enter">${E(`Start casting`)}</slot>
    <slot name="tooltip-exit">${E(`Stop casting`)}</slot>
  `}var wi=e=>{let t=e.mediaIsCasting?E(`stop casting`):E(`start casting`);e.setAttribute(`aria-label`,t)},Ti=class extends G{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_IS_CASTING,x.MEDIA_CAST_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),wi(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_IS_CASTING&&wi(this)}get mediaIsCasting(){return M(this,x.MEDIA_IS_CASTING)}set mediaIsCasting(e){N(this,x.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return P(this,x.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){F(this,x.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){let e=this.mediaIsCasting?w.MEDIA_EXIT_CAST_REQUEST:w.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new D.CustomEvent(e,{composed:!0,bubbles:!0}))}};Ti.getSlotTemplateHTML=Si,Ti.getTooltipContentHTML=Ci,D.customElements.get(`media-cast-button`)||D.customElements.define(`media-cast-button`,Ti);var Ei=Ti,Di=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Oi=(e,t,n)=>(Di(e,t,`read from private field`),n?n.call(e):t.get(e)),ki=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Ai=(e,t,n,r)=>(Di(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),ji=(e,t,n)=>(Di(e,t,`access private method`),n),Mi,Ni,Pi,Fi,Ii,Li,Ri,zi,Bi,Vi,Hi,Ui,Wi,Gi,Ki;function qi(e){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        display: var(--media-dialog-display, inline-flex);
        justify-content: center;
        align-items: center;
        
        transition-behavior: allow-discrete;
        visibility: hidden;
        opacity: 0;
        transform: translateY(2px) scale(.99);
        pointer-events: none;
      }

      :host([open]) {
        transition: display .2s, visibility 0s, opacity .2s ease-out, transform .15s ease-out;
        visibility: visible;
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      #content {
        display: flex;
        position: relative;
        box-sizing: border-box;
        width: min(320px, 100%);
        word-wrap: break-word;
        max-height: 100%;
        overflow: auto;
        text-align: center;
        line-height: 1.4;
      }
    </style>
    ${this.getSlotTemplateHTML(e)}
  `}function Ji(e){return`
    <slot id="content"></slot>
  `}var Yi={OPEN:`open`,ANCHOR:`anchor`},Xi=class extends D.HTMLElement{constructor(){super(),ki(this,Fi),ki(this,Li),ki(this,zi),ki(this,Vi),ki(this,Ui),ki(this,Gi),ki(this,Mi,!1),ki(this,Ni,null),ki(this,Pi,null)}static get observedAttributes(){return[Yi.OPEN,Yi.ANCHOR]}get open(){return M(this,Yi.OPEN)}set open(e){N(this,Yi.OPEN,e)}handleEvent(e){switch(e.type){case`invoke`:ji(this,Vi,Hi).call(this,e);break;case`focusout`:ji(this,Ui,Wi).call(this,e);break;case`keydown`:ji(this,Gi,Ki).call(this,e)}}connectedCallback(){ji(this,Fi,Ii).call(this),this.role||=`dialog`,this.addEventListener(`invoke`,this),this.addEventListener(`focusout`,this),this.addEventListener(`keydown`,this)}disconnectedCallback(){this.removeEventListener(`invoke`,this),this.removeEventListener(`focusout`,this),this.removeEventListener(`keydown`,this)}attributeChangedCallback(e,t,n){ji(this,Fi,Ii).call(this),e===Yi.OPEN&&n!==t&&(this.open?ji(this,Li,Ri).call(this):ji(this,zi,Bi).call(this))}focus(){Ai(this,Ni,st());let e=!this.dispatchEvent(new Event(`focus`,{composed:!0,cancelable:!0})),t=!this.dispatchEvent(new Event(`focusin`,{composed:!0,bubbles:!0,cancelable:!0}));e||t||this.querySelector(`[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]`)?.focus()}get keysUsed(){return[`Escape`,`Tab`]}};Mi=new WeakMap,Ni=new WeakMap,Pi=new WeakMap,Fi=new WeakSet,Ii=function(){if(!Oi(this,Mi)&&(Ai(this,Mi,!0),!this.shadowRoot)){this.attachShadow(this.constructor.shadowRootOptions);let e=$e(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e),queueMicrotask(()=>{let{style:e}=k(this.shadowRoot,`:host`);e.setProperty(`transition`,`display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in`)})}},Li=new WeakSet,Ri=function(){var e;(e=Oi(this,Pi))==null||e.setAttribute(`aria-expanded`,`true`),this.dispatchEvent(new Event(`open`,{composed:!0,bubbles:!0})),this.addEventListener(`transitionend`,()=>this.focus(),{once:!0})},zi=new WeakSet,Bi=function(){var e;(e=Oi(this,Pi))==null||e.setAttribute(`aria-expanded`,`false`),this.dispatchEvent(new Event(`close`,{composed:!0,bubbles:!0}))},Vi=new WeakSet,Hi=function(e){Ai(this,Pi,e.relatedTarget),at(this,e.relatedTarget)||(this.open=!this.open)},Ui=new WeakSet,Wi=function(e){var t;at(this,e.relatedTarget)||((t=Oi(this,Ni))==null||t.focus(),Oi(this,Pi)&&Oi(this,Pi)!==e.relatedTarget&&this.open&&(this.open=!1))},Gi=new WeakSet,Ki=function(e){var t,n,r,i,a;let{key:o,ctrlKey:s,altKey:c,metaKey:l}=e;s||c||l||this.keysUsed.includes(o)&&(e.preventDefault(),e.stopPropagation(),o===`Tab`?(e.shiftKey?(n=(t=this.previousElementSibling)?.focus)==null||n.call(t):(i=(r=this.nextElementSibling)?.focus)==null||i.call(r),this.blur()):o===`Escape`&&((a=Oi(this,Ni))==null||a.focus(),this.open=!1))},Xi.shadowRootOptions={mode:`open`},Xi.getTemplateHTML=qi,Xi.getSlotTemplateHTML=Ji,D.customElements.get(`media-chrome-dialog`)||D.customElements.define(`media-chrome-dialog`,Xi);var Zi=Xi,Qi=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},K=(e,t,n)=>(Qi(e,t,`read from private field`),n?n.call(e):t.get(e)),q=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},$i=(e,t,n,r)=>(Qi(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),ea=(e,t,n)=>(Qi(e,t,`access private method`),n),ta,na,ra,ia,aa,oa,sa,ca,la,ua,da,fa,pa,ma,ha,ga,_a,va,ya,ba,xa,Sa,Ca,wa,Ta;function Ea(e){return`
    <style>
      :host {
        --_focus-box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        --_media-range-padding: var(--media-range-padding, var(--media-control-padding, 10px));

        box-shadow: var(--_focus-visible-box-shadow, none);
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        height: calc(var(--media-control-height, 24px) + 2 * var(--_media-range-padding));
        display: inline-flex;
        align-items: center;
        
        vertical-align: middle;
        box-sizing: border-box;
        position: relative;
        width: 100px;
        transition: background .15s linear;
        cursor: var(--media-cursor, pointer);
        pointer-events: auto;
        touch-action: none; 
      }

      
      input[type=range]:focus {
        outline: 0;
      }
      input[type=range]:focus::-webkit-slider-runnable-track {
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgb(50 50 70 / .7));
      }

      #leftgap {
        padding-left: var(--media-range-padding-left, var(--_media-range-padding));
      }

      #rightgap {
        padding-right: var(--media-range-padding-right, var(--_media-range-padding));
      }

      #startpoint,
      #endpoint {
        position: absolute;
      }

      #endpoint {
        right: 0;
      }

      #container {
        
        width: var(--media-range-track-width, 100%);
        transform: translate(var(--media-range-track-translate-x, 0px), var(--media-range-track-translate-y, 0px));
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        min-width: 40px;
      }

      #range {
        
        display: var(--media-time-range-hover-display, block);
        bottom: var(--media-time-range-hover-bottom, 0);
        height: var(--media-time-range-hover-height, max(100% , 25px));
        width: 100%;
        position: absolute;
        cursor: var(--media-cursor, pointer);

        -webkit-appearance: none; 
        -webkit-tap-highlight-color: transparent;
        background: transparent; 
        margin: 0;
        z-index: 1;
      }

      @media (hover: hover) {
        #range {
          bottom: var(--media-time-range-hover-bottom, 0);
          height: var(--media-time-range-hover-height, max(100%, 20px));
        }
      }

      
      
      #range::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: transparent;
        width: .1px;
        height: .1px;
      }

      
      #range::-moz-range-thumb {
        background: transparent;
        border: transparent;
        width: .1px;
        height: .1px;
      }

      #appearance {
        height: var(--media-range-track-height, 4px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        position: absolute;
        
        will-change: transform;
      }

      #track {
        background: var(--media-range-track-background, rgb(255 255 255 / .2));
        border-radius: var(--media-range-track-border-radius, 1px);
        border: var(--media-range-track-border, none);
        outline: var(--media-range-track-outline);
        outline-offset: var(--media-range-track-outline-offset);
        backdrop-filter: var(--media-range-track-backdrop-filter);
        -webkit-backdrop-filter: var(--media-range-track-backdrop-filter);
        box-shadow: var(--media-range-track-box-shadow, none);
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      #progress,
      #pointer {
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #progress {
        background: var(--media-range-bar-color, var(--media-primary-color, rgb(238 238 238)));
        transition: var(--media-range-track-transition);
      }

      #pointer {
        background: var(--media-range-track-pointer-background);
        border-right: var(--media-range-track-pointer-border-right);
        transition: visibility .25s, opacity .25s;
        visibility: hidden;
        opacity: 0;
      }

      @media (hover: hover) {
        :host(:hover) #pointer {
          transition: visibility .5s, opacity .5s;
          visibility: visible;
          opacity: 1;
        }
      }

      #thumb,
      ::slotted([slot=thumb]) {
        width: var(--media-range-thumb-width, 10px);
        height: var(--media-range-thumb-height, 10px);
        transition: var(--media-range-thumb-transition);
        transform: var(--media-range-thumb-transform, none);
        opacity: var(--media-range-thumb-opacity, 1);
        translate: -50%;
        position: absolute;
        left: 0;
        cursor: var(--media-cursor, pointer);
      }

      #thumb {
        border-radius: var(--media-range-thumb-border-radius, 10px);
        background: var(--media-range-thumb-background, var(--media-primary-color, rgb(238 238 238)));
        box-shadow: var(--media-range-thumb-box-shadow, 1px 1px 1px transparent);
        border: var(--media-range-thumb-border, none);
      }

      :host([disabled]) #thumb {
        background-color: #777;
      }

      .segments #appearance {
        height: var(--media-range-segment-hover-height, 7px);
      }

      #track {
        clip-path: url(#segments-clipping);
      }

      #segments {
        --segments-gap: var(--media-range-segments-gap, 2px);
        position: absolute;
        width: 100%;
        height: 100%;
      }

      #segments-clipping {
        transform: translateX(calc(var(--segments-gap) / 2));
      }

      #segments-clipping:empty {
        display: none;
      }

      #segments-clipping rect {
        height: var(--media-range-track-height, 4px);
        y: calc((var(--media-range-segment-hover-height, 7px) - var(--media-range-track-height, 4px)) / 2);
        transition: var(--media-range-segment-transition, transform .1s ease-in-out);
        transform: var(--media-range-segment-transform, scaleY(1));
        transform-origin: center;
      }

      /* Visible label for accessibility - positioned off-screen but technically visible (Firefox requires visible labels) */
      #range-label {
        position: absolute;
        left: -10000px;
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        pointer-events: none;
      }
    </style>
    <div id="leftgap"></div>
    <div id="container">
      <div id="startpoint"></div>
      <div id="endpoint"></div>
      <div id="appearance">
        <div id="track" part="track">
          <div id="pointer"></div>
          <div id="progress" part="progress"></div>
        </div>
        <slot name="thumb">
          <div id="thumb" part="thumb"></div>
        </slot>
        <svg id="segments" aria-hidden="true"><clipPath id="segments-clipping"></clipPath></svg>
      </div>
        <input id="range" type="range" min="0" max="1" step="any" value="0">
        <label for="range" id="range-label"></label>

      ${this.getContainerTemplateHTML(e)}
    </div>
    <div id="rightgap"></div>
  `}function Da(e){return``}var Oa=class extends D.HTMLElement{constructor(){if(super(),q(this,ua),q(this,fa),q(this,ma),q(this,ga),q(this,va),q(this,ba),q(this,Sa),q(this,wa),q(this,ta,void 0),q(this,na,void 0),q(this,ra,void 0),q(this,ia,void 0),q(this,aa,{}),q(this,oa,[]),q(this,sa,()=>{if(this.range.matches(`:focus-visible`)){let{style:e}=k(this.shadowRoot,`:host`);e.setProperty(`--_focus-visible-box-shadow`,`var(--_focus-box-shadow)`)}}),q(this,ca,()=>{let{style:e}=k(this.shadowRoot,`:host`);e.removeProperty(`--_focus-visible-box-shadow`)}),q(this,la,()=>{let e=this.shadowRoot.querySelector(`#segments-clipping`);e&&e.parentNode.append(e)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=$e(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}this.container=this.shadowRoot.querySelector(`#container`),$i(this,ra,this.shadowRoot.querySelector(`#startpoint`)),$i(this,ia,this.shadowRoot.querySelector(`#endpoint`)),this.range=this.shadowRoot.querySelector(`#range`),this.appearance=this.shadowRoot.querySelector(`#appearance`)}static get observedAttributes(){return[`disabled`,`aria-disabled`,S.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,n){var r,i,a,o;e===S.MEDIA_CONTROLLER?(t&&((i=(r=K(this,ta))?.unassociateElement)==null||i.call(r,this),$i(this,ta,null)),n&&this.isConnected&&($i(this,ta,this.getRootNode()?.getElementById(n)),(o=(a=K(this,ta))?.associateElement)==null||o.call(a,this))):(e===`disabled`||e===`aria-disabled`&&t!==n)&&(n==null?(this.range.removeAttribute(e),ea(this,fa,pa).call(this)):(this.range.setAttribute(e,n),ea(this,ma,ha).call(this)))}connectedCallback(){var e,t;let{style:n}=k(this.shadowRoot,`:host`);n.setProperty(`display`,`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),K(this,aa).pointer=k(this.shadowRoot,`#pointer`),K(this,aa).progress=k(this.shadowRoot,`#progress`),K(this,aa).thumb=k(this.shadowRoot,`#thumb, ::slotted([slot="thumb"])`),K(this,aa).activeSegment=k(this.shadowRoot,`#segments-clipping rect:nth-child(0)`);let r=this.getAttribute(S.MEDIA_CONTROLLER);r&&($i(this,ta,this.getRootNode()?.getElementById(r)),(t=(e=K(this,ta))?.associateElement)==null||t.call(e,this)),this.updateBar(),this.shadowRoot.addEventListener(`focusin`,K(this,sa)),this.shadowRoot.addEventListener(`focusout`,K(this,ca)),ea(this,fa,pa).call(this),Ze(this.container,K(this,la))}disconnectedCallback(){var e,t;ea(this,ma,ha).call(this),(t=(e=K(this,ta))?.unassociateElement)==null||t.call(e,this),$i(this,ta,null),this.shadowRoot.removeEventListener(`focusin`,K(this,sa)),this.shadowRoot.removeEventListener(`focusout`,K(this,ca)),Qe(this.container,K(this,la))}updatePointerBar(e){var t;(t=K(this,aa).pointer)==null||t.style.setProperty(`width`,`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,t;let n=this.range.valueAsNumber*100;(e=K(this,aa).progress)==null||e.style.setProperty(`width`,`${n}%`),(t=K(this,aa).thumb)==null||t.style.setProperty(`left`,`${n}%`)}updateSegments(e){let t=this.shadowRoot.querySelector(`#segments-clipping`);if(t.textContent=``,this.container.classList.toggle(`segments`,!!e?.length),!e?.length)return;let n=[...new Set([+this.range.min,...e.flatMap(e=>[e.start,e.end]),+this.range.max])];$i(this,oa,[...n]);let r=n.pop();for(let[e,i]of n.entries()){let[a,o]=[e===0,e===n.length-1],s=a?`calc(var(--segments-gap) / -1)`:`${i*100}%`,c=`calc(${((o?r:n[e+1])-i)*100}%${a||o?``:` - var(--segments-gap)`})`,l=O.createElementNS(`http://www.w3.org/2000/svg`,`rect`),u=ft(this.shadowRoot,`#segments-clipping rect:nth-child(${e+1})`);u.style.setProperty(`x`,s),u.style.setProperty(`width`,c),t.append(l)}}getPointerRatio(e){return ut(e.clientX,e.clientY,K(this,ra).getBoundingClientRect(),K(this,ia).getBoundingClientRect())}get dragging(){return this.hasAttribute(`dragging`)}handleEvent(e){switch(e.type){case`pointermove`:ea(this,wa,Ta).call(this,e);break;case`input`:this.updateBar();break;case`pointerenter`:ea(this,va,ya).call(this,e);break;case`pointerdown`:ea(this,ga,_a).call(this,e);break;case`pointerup`:ea(this,ba,xa).call(this);break;case`pointerleave`:ea(this,Sa,Ca).call(this)}}get keysUsed(){return[`ArrowUp`,`ArrowRight`,`ArrowDown`,`ArrowLeft`]}};ta=new WeakMap,na=new WeakMap,ra=new WeakMap,ia=new WeakMap,aa=new WeakMap,oa=new WeakMap,sa=new WeakMap,ca=new WeakMap,la=new WeakMap,ua=new WeakSet,da=function(e){let t=K(this,aa).activeSegment;if(!t)return;let n=this.getPointerRatio(e),r=`#segments-clipping rect:nth-child(${K(this,oa).findIndex((e,t,r)=>{let i=r[t+1];return i!=null&&n>=e&&n<=i})+1})`;(t.selectorText!=r||!t.style.transform)&&(t.selectorText=r,t.style.setProperty(`transform`,`var(--media-range-segment-hover-transform, scaleY(2))`))},fa=new WeakSet,pa=function(){!this.hasAttribute(`disabled`)&&this.isConnected&&(this.addEventListener(`input`,this),this.addEventListener(`pointerdown`,this),this.addEventListener(`pointerenter`,this))},ma=new WeakSet,ha=function(){var e,t;this.removeEventListener(`input`,this),this.removeEventListener(`pointerdown`,this),this.removeEventListener(`pointerenter`,this),this.removeEventListener(`pointerleave`,this),(e=D.window)==null||e.removeEventListener(`pointerup`,this),(t=D.window)==null||t.removeEventListener(`pointermove`,this)},ga=new WeakSet,_a=function(e){var t;$i(this,na,e.composedPath().includes(this.range)),(t=D.window)==null||t.addEventListener(`pointerup`,this,{once:!0})},va=new WeakSet,ya=function(e){var t;e.pointerType!==`mouse`&&ea(this,ga,_a).call(this,e),this.addEventListener(`pointerleave`,this,{once:!0}),(t=D.window)==null||t.addEventListener(`pointermove`,this)},ba=new WeakSet,xa=function(){var e;(e=D.window)==null||e.removeEventListener(`pointerup`,this),this.toggleAttribute(`dragging`,!1),this.range.disabled=this.hasAttribute(`disabled`)},Sa=new WeakSet,Ca=function(){var e,t;this.removeEventListener(`pointerleave`,this),(e=D.window)==null||e.removeEventListener(`pointermove`,this),this.toggleAttribute(`dragging`,!1),this.range.disabled=this.hasAttribute(`disabled`),(t=K(this,aa).activeSegment)==null||t.style.removeProperty(`transform`)},wa=new WeakSet,Ta=function(e){(e.pointerType!==`pen`||e.buttons!==0)&&(this.toggleAttribute(`dragging`,e.buttons===1||e.pointerType!==`mouse`),this.updatePointerBar(e),ea(this,ua,da).call(this,e),this.dragging&&(e.pointerType!==`mouse`||!K(this,na))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(e),this.range.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0}))))},Oa.shadowRootOptions={mode:`open`},Oa.getTemplateHTML=Ea,Oa.getContainerTemplateHTML=Da,D.customElements.get(`media-chrome-range`)||D.customElements.define(`media-chrome-range`,Oa);var ka=Oa,Aa=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},ja=(e,t,n)=>(Aa(e,t,`read from private field`),n?n.call(e):t.get(e)),Ma=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Na=(e,t,n,r)=>(Aa(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Pa;function Fa(e){return`
    <style>
      :host {
        
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-control-bar-display, inline-flex));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --media-loading-indicator-icon-height: 44px;
      }

      ::slotted(media-time-range),
      ::slotted(media-volume-range) {
        min-height: 100%;
      }

      ::slotted(media-time-range),
      ::slotted(media-clip-selector) {
        flex-grow: 1;
      }

      ::slotted([role="menu"]) {
        position: absolute;
      }
    </style>

    <slot></slot>
  `}var Ia=class extends D.HTMLElement{constructor(){if(super(),Ma(this,Pa,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=$e(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[S.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,n){var r,i,a,o;e===S.MEDIA_CONTROLLER&&(t&&((i=(r=ja(this,Pa))?.unassociateElement)==null||i.call(r,this),Na(this,Pa,null)),n&&this.isConnected&&(Na(this,Pa,this.getRootNode()?.getElementById(n)),(o=(a=ja(this,Pa))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;let n=this.getAttribute(S.MEDIA_CONTROLLER);n&&(Na(this,Pa,this.getRootNode()?.getElementById(n)),(t=(e=ja(this,Pa))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=ja(this,Pa))?.unassociateElement)==null||t.call(e,this),Na(this,Pa,null)}};Pa=new WeakMap,Ia.shadowRootOptions={mode:`open`},Ia.getTemplateHTML=Fa,D.customElements.get(`media-control-bar`)||D.customElements.define(`media-control-bar`,Ia);var La=Ia,Ra=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},za=(e,t,n)=>(Ra(e,t,`read from private field`),n?n.call(e):t.get(e)),Ba=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Va=(e,t,n,r)=>(Ra(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Ha;function Ua(e,t={}){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-text-background, var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7))));
        padding: var(--media-control-padding, 10px);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        pointer-events: auto;
      }

      
      :host(:focus-visible) {
        box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: 0;
      }

      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }
    </style>

    ${this.getSlotTemplateHTML(e,t)}
  `}function Wa(e,t){return`
    <slot></slot>
  `}var Ga=class extends D.HTMLElement{constructor(){if(super(),Ba(this,Ha,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=$e(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[S.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,n){var r,i,a,o;e===S.MEDIA_CONTROLLER&&(t&&((i=(r=za(this,Ha))?.unassociateElement)==null||i.call(r,this),Va(this,Ha,null)),n&&this.isConnected&&(Va(this,Ha,this.getRootNode()?.getElementById(n)),(o=(a=za(this,Ha))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;let{style:n}=k(this.shadowRoot,`:host`);n.setProperty(`display`,`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);let r=this.getAttribute(S.MEDIA_CONTROLLER);r&&(Va(this,Ha,this.getRootNode()?.getElementById(r)),(t=(e=za(this,Ha))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=za(this,Ha))?.unassociateElement)==null||t.call(e,this),Va(this,Ha,null)}};Ha=new WeakMap,Ga.shadowRootOptions={mode:`open`},Ga.getTemplateHTML=Ua,Ga.getSlotTemplateHTML=Wa,D.customElements.get(`media-text-display`)||D.customElements.define(`media-text-display`,Ga);var Ka=Ga,qa=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Ja=(e,t,n)=>(qa(e,t,`read from private field`),n?n.call(e):t.get(e)),Ya=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Xa=(e,t,n,r)=>(qa(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Za;function Qa(e,t){return`
    <slot>${ze(t.mediaDuration)}</slot>
  `}var $a=class extends Ga{constructor(){super(),Ya(this,Za,void 0),Xa(this,Za,this.shadowRoot.querySelector(`slot`)),Ja(this,Za).textContent=ze(this.mediaDuration??0)}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_DURATION]}attributeChangedCallback(e,t,n){e===x.MEDIA_DURATION&&(Ja(this,Za).textContent=ze(+n)),super.attributeChangedCallback(e,t,n)}get mediaDuration(){return A(this,x.MEDIA_DURATION)}set mediaDuration(e){j(this,x.MEDIA_DURATION,e)}};Za=new WeakMap,$a.getSlotTemplateHTML=Qa,D.customElements.get(`media-duration-display`)||D.customElements.define(`media-duration-display`,$a);var eo=$a,to={2:E(`Network Error`),3:E(`Decode Error`),4:E(`Source Not Supported`),5:E(`Encryption Error`)},no={2:E(`A network error caused the media download to fail.`),3:E(`A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.`),4:E(`An unsupported error occurred. The server or network failed, or your browser does not support this format.`),5:E(`The media is encrypted and there are no keys to decrypt it.`)},ro=e=>e.code===1?null:{title:to[e.code]??`Error ${e.code}`,message:no[e.code]??e.message},io=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},ao=(e,t,n)=>(io(e,t,`read from private field`),n?n.call(e):t.get(e)),oo=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},so=(e,t,n,r)=>(io(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),co;function lo(e){return`
    <style>
      :host {
        background: rgb(20 20 30 / .8);
      }

      #content {
        display: block;
        padding: 1.2em 1.5em;
      }

      h3,
      p {
        margin-block: 0 .3em;
      }
    </style>
    <slot name="error-${e.mediaerrorcode}" id="content">
      ${fo({code:+e.mediaerrorcode,message:e.mediaerrormessage})}
    </slot>
  `}function uo(e){return e.code&&ro(e)!==null}function fo(e){let{title:t,message:n}=ro(e)??{},r=``;return t&&(r+=`<slot name="error-${e.code}-title"><h3>${t}</h3></slot>`),n&&(r+=`<slot name="error-${e.code}-message"><p>${n}</p></slot>`),r}var po=[x.MEDIA_ERROR_CODE,x.MEDIA_ERROR_MESSAGE],mo=class extends Xi{constructor(){super(...arguments),oo(this,co,null)}static get observedAttributes(){return[...super.observedAttributes,...po]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,t,n){if(super.attributeChangedCallback(e,t,n),!po.includes(e))return;let r=this.mediaError??{code:this.mediaErrorCode,message:this.mediaErrorMessage};if(this.open=uo(r),this.open&&(this.shadowRoot.querySelector(`slot`).name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector(`#content`).innerHTML=this.formatErrorMessage(r),!this.hasAttribute(`aria-label`))){let{title:e}=ro(r);e&&this.setAttribute(`aria-label`,e)}}get mediaError(){return ao(this,co)}set mediaError(e){so(this,co,e)}get mediaErrorCode(){return A(this,`mediaerrorcode`)}set mediaErrorCode(e){j(this,`mediaerrorcode`,e)}get mediaErrorMessage(){return P(this,`mediaerrormessage`)}set mediaErrorMessage(e){F(this,`mediaerrormessage`,e)}};co=new WeakMap,mo.getSlotTemplateHTML=lo,mo.formatErrorMessage=fo,D.customElements.get(`media-error-dialog`)||D.customElements.define(`media-error-dialog`,mo);var ho=mo,go=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},_o=(e,t,n)=>(go(e,t,`read from private field`),n?n.call(e):t.get(e)),vo=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},yo,bo;function xo(e){return`
    <style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        background: rgb(20 20 30 / .8);
        backdrop-filter: blur(10px);
      }

      #content {
        display: block;
        width: clamp(400px, 40vw, 700px);
        max-width: 90vw;
        text-align: left;
      }

      h2 {
        margin: 0 0 1.5rem 0;
        font-size: 1.5rem;
        font-weight: 500;
        text-align: center;
      }

      .shortcuts-table {
        width: 100%;
        border-collapse: collapse;
      }

      .shortcuts-table tr {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .shortcuts-table tr:last-child {
        border-bottom: none;
      }

      .shortcuts-table td {
        padding: 0.75rem 0.5rem;
      }

      .shortcuts-table td:first-child {
        text-align: right;
        padding-right: 1rem;
        width: 40%;
        min-width: 120px;
      }

      .shortcuts-table td:last-child {
        padding-left: 1rem;
      }

      .key {
        display: inline-block;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        font-weight: 500;
        min-width: 1.5rem;
        text-align: center;
        margin: 0 0.2rem;
      }

      .description {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.95rem;
      }

      .key-combo {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.3rem;
      }

      .key-separator {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.9rem;
      }
    </style>
    <slot id="content">
      ${So()}
    </slot>
  `}function So(){return`
    <h2>Keyboard Shortcuts</h2>
    <table class="shortcuts-table">${[{keys:[`Space`,`k`],description:`Toggle Playback`},{keys:[`m`],description:`Toggle mute`},{keys:[`f`],description:`Toggle fullscreen`},{keys:[`c`],description:`Toggle captions or subtitles, if available`},{keys:[`p`],description:`Toggle Picture in Picture`},{keys:[`←`,`j`],description:`Seek back 10s`},{keys:[`→`,`l`],description:`Seek forward 10s`},{keys:[`↑`],description:`Turn volume up`},{keys:[`↓`],description:`Turn volume down`},{keys:[`< (SHIFT+,)`],description:`Decrease playback rate`},{keys:[`> (SHIFT+.)`],description:`Increase playback rate`}].map(({keys:e,description:t})=>`
      <tr>
        <td>
          <div class="key-combo">${e.map((e,t)=>t>0?`<span class="key-separator">or</span><span class="key">${e}</span>`:`<span class="key">${e}</span>`).join(``)}</div>
        </td>
        <td class="description">${t}</td>
      </tr>
    `).join(``)}</table>
  `}var Co=class extends Xi{constructor(){super(...arguments),vo(this,yo,e=>{if(!this.open)return;let t=this.shadowRoot?.querySelector(`#content`);if(!t)return;let n=e.composedPath(),r=n[0]===this||n.includes(this),i=n.includes(t);r&&!i&&(this.open=!1)}),vo(this,bo,e=>{if(!this.open)return;let t=e.shiftKey&&(e.key===`/`||e.key===`?`);(e.key===`Escape`||t)&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&(this.open=!1,e.preventDefault(),e.stopPropagation())})}connectedCallback(){super.connectedCallback(),this.open&&(this.addEventListener(`click`,_o(this,yo)),document.addEventListener(`keydown`,_o(this,bo)))}disconnectedCallback(){this.removeEventListener(`click`,_o(this,yo)),document.removeEventListener(`keydown`,_o(this,bo))}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===`open`&&(this.open?(this.addEventListener(`click`,_o(this,yo)),document.addEventListener(`keydown`,_o(this,bo))):(this.removeEventListener(`click`,_o(this,yo)),document.removeEventListener(`keydown`,_o(this,bo))))}};yo=new WeakMap,bo=new WeakMap,Co.getSlotTemplateHTML=xo,D.customElements.get(`media-keyboard-shortcuts-dialog`)||D.customElements.define(`media-keyboard-shortcuts-dialog`,Co);var wo=Co,To=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Eo=(e,t,n)=>(To(e,t,`read from private field`),n?n.call(e):t.get(e)),Do=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Oo=(e,t,n,r)=>(To(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),ko,Ao=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,jo=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`;function Mo(e){return`
    <style>
      :host([${x.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${x.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${x.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
      :host(:not([${x.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Ao}</slot>
      <slot name="exit">${jo}</slot>
    </slot>
  `}function No(){return`
    <slot name="tooltip-enter">${E(`Enter fullscreen mode`)}</slot>
    <slot name="tooltip-exit">${E(`Exit fullscreen mode`)}</slot>
  `}var Po=e=>{let t=e.mediaIsFullscreen?E(`exit fullscreen mode`):E(`enter fullscreen mode`);e.setAttribute(`aria-label`,t)},Fo=class extends G{constructor(){super(...arguments),Do(this,ko,null)}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_IS_FULLSCREEN,x.MEDIA_FULLSCREEN_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Po(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_IS_FULLSCREEN&&Po(this)}get mediaFullscreenUnavailable(){return P(this,x.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){F(this,x.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return M(this,x.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){N(this,x.MEDIA_IS_FULLSCREEN,e)}handleClick(e){Oo(this,ko,e);let t=Eo(this,ko)instanceof PointerEvent,n=this.mediaIsFullscreen?new D.CustomEvent(w.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0}):new D.CustomEvent(w.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0,detail:t});this.dispatchEvent(n)}};ko=new WeakMap,Fo.getSlotTemplateHTML=Mo,Fo.getTooltipContentHTML=No,D.customElements.get(`media-fullscreen-button`)||D.customElements.define(`media-fullscreen-button`,Fo);var Io=Fo,{MEDIA_TIME_IS_LIVE:Lo,MEDIA_PAUSED:Ro}=x,{MEDIA_SEEK_TO_LIVE_REQUEST:zo,MEDIA_PLAY_REQUEST:Bo}=w,Vo=`<svg viewBox="0 0 6 12" aria-hidden="true"><circle cx="3" cy="6" r="2"></circle></svg>`;function Ho(e){return`
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${Lo}]:not([${Ro}])) slot[name=indicator] > *,
      :host([${Lo}]:not([${Ro}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${Lo}]:not([${Ro}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator">${Vo}</slot>
    
    <slot name="spacer">&nbsp;</slot><slot name="text">${E(`live`)}</slot>
  `}var Uo=e=>{let t=e.mediaPaused||!e.mediaTimeIsLive,n=E(t?`seek to live`:`playing live`);e.setAttribute(`aria-label`,n);let r=e.shadowRoot?.querySelector(`slot[name="text"]`);r&&(r.textContent=E(`live`)),t?e.removeAttribute(`aria-disabled`):e.setAttribute(`aria-disabled`,`true`)},Wo=class extends G{static get observedAttributes(){return[...super.observedAttributes,Lo,Ro]}connectedCallback(){super.connectedCallback(),Uo(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),Uo(this)}get mediaPaused(){return M(this,x.MEDIA_PAUSED)}set mediaPaused(e){N(this,x.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return M(this,x.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){N(this,x.MEDIA_TIME_IS_LIVE,e)}handleClick(){(this.mediaPaused||!this.mediaTimeIsLive)&&(this.dispatchEvent(new D.CustomEvent(zo,{composed:!0,bubbles:!0})),this.hasAttribute(Ro)&&this.dispatchEvent(new D.CustomEvent(Bo,{composed:!0,bubbles:!0})))}};Wo.getSlotTemplateHTML=Ho,D.customElements.get(`media-live-button`)||D.customElements.define(`media-live-button`,Wo);var Go=Wo,Ko=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},qo=(e,t,n)=>(Ko(e,t,`read from private field`),n?n.call(e):t.get(e)),Jo=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Yo=(e,t,n,r)=>(Ko(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Xo,Zo,Qo={LOADING_DELAY:`loadingdelay`,NO_AUTOHIDE:`noautohide`},$o=500,es=`
<svg aria-hidden="true" viewBox="0 0 100 100">
  <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
    <animateTransform
       attributeName="transform"
       attributeType="XML"
       type="rotate"
       dur="1s"
       from="0 50 50"
       to="360 50 50"
       repeatCount="indefinite" />
  </path>
</svg>
`;function ts(e){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${$o}ms);
      }

      #status {
        color: rgba(0,0,0,0);
        width: 0px;
        height: 0px;
      }

      :host slot[name=icon] > *,
      :host ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 0);
        transition: opacity 0.15s;
      }

      :host([${x.MEDIA_LOADING}]:not([${x.MEDIA_PAUSED}])) slot[name=icon] > *,
      :host([${x.MEDIA_LOADING}]:not([${x.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 1);
        transition: opacity 0.15s var(--_loading-indicator-delay);
      }

      :host #status {
        visibility: var(--media-loading-indicator-opacity, hidden);
        transition: visibility 0.15s;
      }

      :host([${x.MEDIA_LOADING}]:not([${x.MEDIA_PAUSED}])) #status {
        visibility: var(--media-loading-indicator-opacity, visible);
        transition: visibility 0.15s var(--_loading-indicator-delay);
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-loading-indicator-icon-width);
        height: var(--media-loading-indicator-icon-height, 100px);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
      }
    </style>

    <slot name="icon">${es}</slot>
    <div id="status" role="status" aria-live="polite">${E(`media loading`)}</div>
  `}var ns=class extends D.HTMLElement{constructor(){if(super(),Jo(this,Xo,void 0),Jo(this,Zo,$o),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=$e(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[S.MEDIA_CONTROLLER,x.MEDIA_PAUSED,x.MEDIA_LOADING,Qo.LOADING_DELAY]}attributeChangedCallback(e,t,n){var r,i,a,o;e===Qo.LOADING_DELAY&&t!==n?this.loadingDelay=Number(n):e===S.MEDIA_CONTROLLER&&(t&&((i=(r=qo(this,Xo))?.unassociateElement)==null||i.call(r,this),Yo(this,Xo,null)),n&&this.isConnected&&(Yo(this,Xo,this.getRootNode()?.getElementById(n)),(o=(a=qo(this,Xo))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;let n=this.getAttribute(S.MEDIA_CONTROLLER);n&&(Yo(this,Xo,this.getRootNode()?.getElementById(n)),(t=(e=qo(this,Xo))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=qo(this,Xo))?.unassociateElement)==null||t.call(e,this),Yo(this,Xo,null)}get loadingDelay(){return qo(this,Zo)}set loadingDelay(e){Yo(this,Zo,e);let{style:t}=k(this.shadowRoot,`:host`);t.setProperty(`--_loading-indicator-delay`,`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return M(this,x.MEDIA_PAUSED)}set mediaPaused(e){N(this,x.MEDIA_PAUSED,e)}get mediaLoading(){return M(this,x.MEDIA_LOADING)}set mediaLoading(e){N(this,x.MEDIA_LOADING,e)}get mediaController(){return P(this,S.MEDIA_CONTROLLER)}set mediaController(e){F(this,S.MEDIA_CONTROLLER,e)}get noAutohide(){return M(this,Qo.NO_AUTOHIDE)}set noAutohide(e){N(this,Qo.NO_AUTOHIDE,e)}};Xo=new WeakMap,Zo=new WeakMap,ns.shadowRootOptions={mode:`open`},ns.getTemplateHTML=ts,D.customElements.get(`media-loading-indicator`)||D.customElements.define(`media-loading-indicator`,ns);var rs=ns,is=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,as=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,os=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`;function ss(e){return`
    <style>
      :host(:not([${x.MEDIA_VOLUME_LEVEL}])) slot[name=icon] slot:not([name=high]),
      :host([${x.MEDIA_VOLUME_LEVEL}=high]) slot[name=icon] slot:not([name=high]) {
        display: none !important;
      }

      :host([${x.MEDIA_VOLUME_LEVEL}=off]) slot[name=icon] slot:not([name=off]) {
        display: none !important;
      }

      :host([${x.MEDIA_VOLUME_LEVEL}=low]) slot[name=icon] slot:not([name=low]) {
        display: none !important;
      }

      :host([${x.MEDIA_VOLUME_LEVEL}=medium]) slot[name=icon] slot:not([name=medium]) {
        display: none !important;
      }

      :host(:not([${x.MEDIA_VOLUME_LEVEL}=off])) slot[name=tooltip-unmute],
      :host([${x.MEDIA_VOLUME_LEVEL}=off]) slot[name=tooltip-mute] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="off">${is}</slot>
      <slot name="low">${as}</slot>
      <slot name="medium">${as}</slot>
      <slot name="high">${os}</slot>
    </slot>
  `}function cs(){return`
    <slot name="tooltip-mute">${E(`Mute`)}</slot>
    <slot name="tooltip-unmute">${E(`Unmute`)}</slot>
  `}var ls=e=>{let t=e.mediaVolumeLevel===`off`?E(`unmute`):E(`mute`);e.setAttribute(`aria-label`,t)},us=class extends G{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_VOLUME_LEVEL]}connectedCallback(){super.connectedCallback(),ls(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_VOLUME_LEVEL&&ls(this)}get mediaVolumeLevel(){return P(this,x.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){F(this,x.MEDIA_VOLUME_LEVEL,e)}handleClick(){let e=this.mediaVolumeLevel===`off`?w.MEDIA_UNMUTE_REQUEST:w.MEDIA_MUTE_REQUEST;this.dispatchEvent(new D.CustomEvent(e,{composed:!0,bubbles:!0}))}};us.getSlotTemplateHTML=ss,us.getTooltipContentHTML=cs,D.customElements.get(`media-mute-button`)||D.customElements.define(`media-mute-button`,us);var ds=us,fs=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`;function ps(e){return`
    <style>
      :host([${x.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      :host(:not([${x.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${x.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
      :host(:not([${x.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${fs}</slot>
      <slot name="exit">${fs}</slot>
    </slot>
  `}function ms(){return`
    <slot name="tooltip-enter">${E(`Enter picture in picture mode`)}</slot>
    <slot name="tooltip-exit">${E(`Exit picture in picture mode`)}</slot>
  `}var hs=e=>{let t=e.mediaIsPip?E(`exit picture in picture mode`):E(`enter picture in picture mode`);e.setAttribute(`aria-label`,t)},gs=class extends G{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_IS_PIP,x.MEDIA_PIP_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),hs(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_IS_PIP&&hs(this)}get mediaPipUnavailable(){return P(this,x.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){F(this,x.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return M(this,x.MEDIA_IS_PIP)}set mediaIsPip(e){N(this,x.MEDIA_IS_PIP,e)}handleClick(){let e=this.mediaIsPip?w.MEDIA_EXIT_PIP_REQUEST:w.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new D.CustomEvent(e,{composed:!0,bubbles:!0}))}};gs.getSlotTemplateHTML=ps,gs.getTooltipContentHTML=ms,D.customElements.get(`media-pip-button`)||D.customElements.define(`media-pip-button`,gs);var _s=gs,vs=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},ys=(e,t,n)=>(vs(e,t,`read from private field`),n?n.call(e):t.get(e)),bs=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},xs,Ss={RATES:`rates`},Cs=[1,1.2,1.5,1.7,2];function ws(e){return Math.round(e*100)/100}function Ts(e){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${e.mediaplaybackrate?ws(+e.mediaplaybackrate):1}x</slot>
  `}function Es(){return E(`Playback rate`)}var Ds=class extends G{constructor(){super(),bs(this,xs,new ln(this,Ss.RATES,{defaultValue:Cs})),this.container=this.shadowRoot.querySelector(`slot[name="icon"]`),this.container.innerHTML=`${ws(this.mediaPlaybackRate??1)}x`}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PLAYBACK_RATE,Ss.RATES]}attributeChangedCallback(e,t,n){if(super.attributeChangedCallback(e,t,n),e===Ss.RATES&&(ys(this,xs).value=n),e===x.MEDIA_PLAYBACK_RATE){let e=n?+n:NaN,t=ws(Number.isNaN(e)?1:e);this.container.innerHTML=`${t}x`,this.setAttribute(`aria-label`,E(`Playback rate {playbackRate}`,{playbackRate:t}))}}get rates(){return ys(this,xs)}set rates(e){e?Array.isArray(e)?ys(this,xs).value=e.join(` `):typeof e==`string`&&(ys(this,xs).value=e):ys(this,xs).value=``}get mediaPlaybackRate(){return A(this,x.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){j(this,x.MEDIA_PLAYBACK_RATE,e)}handleClick(){let e=Array.from(ys(this,xs).values(),e=>+e).sort((e,t)=>e-t),t=e.find(e=>e>this.mediaPlaybackRate)??e[0]??1,n=new D.CustomEvent(w.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:t});this.dispatchEvent(n)}};xs=new WeakMap,Ds.getSlotTemplateHTML=Ts,Ds.getTooltipContentHTML=Es,D.customElements.get(`media-playback-rate-button`)||D.customElements.define(`media-playback-rate-button`,Ds);var Os=Ds,ks=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,As=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`;function js(e){return`
    <style>
      :host([${x.MEDIA_PAUSED}]) slot[name=pause],
      :host(:not([${x.MEDIA_PAUSED}])) slot[name=play] {
        display: none !important;
      }

      :host([${x.MEDIA_PAUSED}]) slot[name=tooltip-pause],
      :host(:not([${x.MEDIA_PAUSED}])) slot[name=tooltip-play] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="play">${ks}</slot>
      <slot name="pause">${As}</slot>
    </slot>
  `}function Ms(){return`
    <slot name="tooltip-play">${E(`Play`)}</slot>
    <slot name="tooltip-pause">${E(`Pause`)}</slot>
  `}var Ns=e=>{let t=e.mediaPaused?E(`play`):E(`pause`);e.setAttribute(`aria-label`,t)},Ps=class extends G{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PAUSED,x.MEDIA_ENDED]}connectedCallback(){super.connectedCallback(),Ns(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),(e===x.MEDIA_PAUSED||e===x.MEDIA_LANG)&&Ns(this)}get mediaPaused(){return M(this,x.MEDIA_PAUSED)}set mediaPaused(e){N(this,x.MEDIA_PAUSED,e)}handleClick(){let e=this.mediaPaused?w.MEDIA_PLAY_REQUEST:w.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new D.CustomEvent(e,{composed:!0,bubbles:!0}))}};Ps.getSlotTemplateHTML=js,Ps.getTooltipContentHTML=Ms,D.customElements.get(`media-play-button`)||D.customElements.define(`media-play-button`,Ps);var Fs=Ps,Is={PLACEHOLDER_SRC:`placeholdersrc`,SRC:`src`};function Ls(e){return`
    <style>
      :host {
        pointer-events: none;
        display: var(--media-poster-image-display, inline-block);
        box-sizing: border-box;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        background-repeat: no-repeat;
        background-position: var(--media-poster-image-background-position, var(--media-object-position, center));
        background-size: var(--media-poster-image-background-size, var(--media-object-fit, contain));
        object-fit: var(--media-object-fit, contain);
        object-position: var(--media-object-position, center);
      }
    </style>

    <img part="poster img" aria-hidden="true" id="image"/>
  `}var Rs=e=>{e.style.removeProperty(`background-image`)},zs=(e,t)=>{e.style[`background-image`]=`url('${t}')`},Bs=class extends D.HTMLElement{static get observedAttributes(){return[Is.PLACEHOLDER_SRC,Is.SRC]}constructor(){if(super(),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=$e(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.image=this.shadowRoot.querySelector(`#image`)}attributeChangedCallback(e,t,n){e===Is.SRC&&(n==null?this.image.removeAttribute(Is.SRC):this.image.setAttribute(Is.SRC,n)),e===Is.PLACEHOLDER_SRC&&(n==null?Rs(this.image):zs(this.image,n))}get placeholderSrc(){return P(this,Is.PLACEHOLDER_SRC)}set placeholderSrc(e){F(this,Is.SRC,e)}get src(){return P(this,Is.SRC)}set src(e){F(this,Is.SRC,e)}};Bs.shadowRootOptions={mode:`open`},Bs.getTemplateHTML=Ls,D.customElements.get(`media-poster-image`)||D.customElements.define(`media-poster-image`,Bs);var Vs=Bs,Hs=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Us=(e,t,n)=>(Hs(e,t,`read from private field`),n?n.call(e):t.get(e)),Ws=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Gs=(e,t,n,r)=>(Hs(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Ks,qs=class extends Ga{constructor(){super(),Ws(this,Ks,void 0),Gs(this,Ks,this.shadowRoot.querySelector(`slot`))}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PREVIEW_CHAPTER,x.MEDIA_LANG]}attributeChangedCallback(e,t,n){if(super.attributeChangedCallback(e,t,n),(e===x.MEDIA_PREVIEW_CHAPTER||e===x.MEDIA_LANG)&&n!==t&&n!=null){if(Us(this,Ks).textContent=n,n!==``){let e=E(`chapter: {chapterName}`,{chapterName:n});this.setAttribute(`aria-valuetext`,e)}else this.removeAttribute(`aria-valuetext`)}}get mediaPreviewChapter(){return P(this,x.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){F(this,x.MEDIA_PREVIEW_CHAPTER,e)}};Ks=new WeakMap,D.customElements.get(`media-preview-chapter-display`)||D.customElements.define(`media-preview-chapter-display`,qs);var Js=qs,Ys=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Xs=(e,t,n)=>(Ys(e,t,`read from private field`),n?n.call(e):t.get(e)),Zs=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Qs=(e,t,n,r)=>(Ys(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),$s;function ec(e){return`
    <style>
      :host {
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-preview-thumbnail-display, inline-block));
        overflow: hidden;
      }

      img {
        display: none;
        position: relative;
      }
    </style>
    <img crossorigin loading="eager" decoding="async">
  `}var tc=class extends D.HTMLElement{constructor(){if(super(),Zs(this,$s,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=$e(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[S.MEDIA_CONTROLLER,x.MEDIA_PREVIEW_IMAGE,x.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,t;let n=this.getAttribute(S.MEDIA_CONTROLLER);n&&(Qs(this,$s,this.getRootNode()?.getElementById(n)),(t=(e=Xs(this,$s))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=Xs(this,$s))?.unassociateElement)==null||t.call(e,this),Qs(this,$s,null)}attributeChangedCallback(e,t,n){var r,i,a,o;[x.MEDIA_PREVIEW_IMAGE,x.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===S.MEDIA_CONTROLLER&&(t&&((i=(r=Xs(this,$s))?.unassociateElement)==null||i.call(r,this),Qs(this,$s,null)),n&&this.isConnected&&(Qs(this,$s,this.getRootNode()?.getElementById(n)),(o=(a=Xs(this,$s))?.associateElement)==null||o.call(a,this)))}get mediaPreviewImage(){return P(this,x.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){F(this,x.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){let e=this.getAttribute(x.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(e=>+e)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(x.MEDIA_PREVIEW_COORDS);return}this.setAttribute(x.MEDIA_PREVIEW_COORDS,e.join(` `))}update(){let e=this.mediaPreviewCoords,t=this.mediaPreviewImage;if(!(e&&t))return;let[n,r,i,a]=e,o=t.split(`#`)[0],s=getComputedStyle(this),{maxWidth:c,maxHeight:l,minWidth:u,minHeight:d}=s,f=s.getPropertyValue(`--media-preview-thumbnail-object-fit`).trim()||`contain`,p,m;if(f===`fill`){let e=parseInt(c)/i,t=parseInt(l)/a,n=parseInt(u)/i,r=parseInt(d)/a;p=e<1?e:Math.max(e,n),m=t<1?t:Math.max(t,r)}else{let e=Math.min(parseInt(c)/i,parseInt(l)/a),t=Math.max(parseInt(u)/i,parseInt(d)/a),n=e<1?e:t>1?t:1;p=n,m=n}let{style:h}=k(this.shadowRoot,`:host`),g=k(this.shadowRoot,`img`).style,_=this.shadowRoot.querySelector(`img`),v=Math.min(p,m)<1?`min`:`max`;h.setProperty(`${v}-width`,`initial`,`important`),h.setProperty(`${v}-height`,`initial`,`important`),h.width=`${i*p}px`,h.height=`${a*m}px`;let ee=()=>{g.width=`${this.imgWidth*p}px`,g.height=`${this.imgHeight*m}px`,g.display=`block`};_.src!==o&&(_.onload=()=>{this.imgWidth=_.naturalWidth,this.imgHeight=_.naturalHeight,ee(),_.onload=null},_.src=o,ee()),ee(),g.transform=`translate(-${n*p}px, -${r*m}px)`}};$s=new WeakMap,tc.shadowRootOptions={mode:`open`},tc.getTemplateHTML=ec,D.customElements.get(`media-preview-thumbnail`)||D.customElements.define(`media-preview-thumbnail`,tc);var nc=tc,rc=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},ic=(e,t,n)=>(rc(e,t,`read from private field`),n?n.call(e):t.get(e)),ac=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},oc=(e,t,n,r)=>(rc(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),sc,cc=class extends Ga{constructor(){super(),ac(this,sc,void 0),oc(this,sc,this.shadowRoot.querySelector(`slot`)),ic(this,sc).textContent=ze(0)}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_PREVIEW_TIME&&n!=null&&(ic(this,sc).textContent=ze(parseFloat(n)))}get mediaPreviewTime(){return A(this,x.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){j(this,x.MEDIA_PREVIEW_TIME,e)}};sc=new WeakMap,D.customElements.get(`media-preview-time-display`)||D.customElements.define(`media-preview-time-display`,cc);var lc=cc,uc={SEEK_OFFSET:`seekoffset`},dc=30,fc=e=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${e}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`;function pc(e,t){return`
    <slot name="icon">${fc(t.seekOffset)}</slot>
  `}var mc=(e,t)=>{e.setAttribute(`aria-label`,E(`seek back {seekOffset} seconds`,{seekOffset:t}))};function hc(){return E(`Seek backward`)}var gc=0,_c=class extends G{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_CURRENT_TIME,uc.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=A(this,uc.SEEK_OFFSET,dc)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),mc(this,this.seekOffset),e===uc.SEEK_OFFSET&&(this.seekOffset=A(this,uc.SEEK_OFFSET,dc))}get seekOffset(){return A(this,uc.SEEK_OFFSET,dc)}set seekOffset(e){j(this,uc.SEEK_OFFSET,e),this.setAttribute(`aria-label`,E(`seek back {seekOffset} seconds`,{seekOffset:this.seekOffset})),nt(it(this,`icon`),this.seekOffset)}get mediaCurrentTime(){return A(this,x.MEDIA_CURRENT_TIME,gc)}set mediaCurrentTime(e){j(this,x.MEDIA_CURRENT_TIME,e)}handleClick(){let e=Math.max(this.mediaCurrentTime-this.seekOffset,0),t=new D.CustomEvent(w.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}};_c.getSlotTemplateHTML=pc,_c.getTooltipContentHTML=hc,D.customElements.get(`media-seek-backward-button`)||D.customElements.define(`media-seek-backward-button`,_c);var vc=_c,yc={SEEK_OFFSET:`seekoffset`},bc=30,xc=e=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${e}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`;function Sc(e,t){return`
    <slot name="icon">${xc(t.seekOffset)}</slot>
  `}var Cc=(e,t)=>{e.setAttribute(`aria-label`,E(`seek forward {seekOffset} seconds`,{seekOffset:t}))};function wc(){return E(`Seek forward`)}var Tc=0,Ec=class extends G{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_CURRENT_TIME,yc.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=A(this,yc.SEEK_OFFSET,bc)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),Cc(this,this.seekOffset),e===yc.SEEK_OFFSET&&(this.seekOffset=A(this,yc.SEEK_OFFSET,bc))}get seekOffset(){return A(this,yc.SEEK_OFFSET,bc)}set seekOffset(e){j(this,yc.SEEK_OFFSET,e),this.setAttribute(`aria-label`,E(`seek forward {seekOffset} seconds`,{seekOffset:this.seekOffset})),nt(it(this,`icon`),this.seekOffset)}get mediaCurrentTime(){return A(this,x.MEDIA_CURRENT_TIME,Tc)}set mediaCurrentTime(e){j(this,x.MEDIA_CURRENT_TIME,e)}handleClick(){let e=this.mediaCurrentTime+this.seekOffset,t=new D.CustomEvent(w.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}};Ec.getSlotTemplateHTML=Sc,Ec.getTooltipContentHTML=wc,D.customElements.get(`media-seek-forward-button`)||D.customElements.define(`media-seek-forward-button`,Ec);var Dc=Ec,Oc=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},kc=(e,t,n)=>(Oc(e,t,`read from private field`),n?n.call(e):t.get(e)),Ac=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},jc=(e,t,n,r)=>(Oc(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Mc=(e,t,n)=>(Oc(e,t,`access private method`),n),Nc,Pc,Fc,Ic,Lc,Rc,zc,Bc,Vc,Hc,Uc,Wc={REMAINING:`remaining`,SHOW_DURATION:`showduration`,NO_TOGGLE:`notoggle`},Gc=[...Object.values(Wc),x.MEDIA_CURRENT_TIME,x.MEDIA_DURATION,x.MEDIA_SEEKABLE],Kc=[`Enter`,` `],qc=`&nbsp;/&nbsp;`,Jc=(e,{timesSep:t=qc}={})=>{let n=e.mediaCurrentTime??0,[,r]=e.mediaSeekable??[],i=0;Number.isFinite(e.mediaDuration)?i=e.mediaDuration:Number.isFinite(r)&&(i=r);let a=e.remaining?ze(0-(i-n)):ze(n);return e.showDuration?`${a}${t}${ze(i)}`:a},Yc=e=>{let t=e.mediaCurrentTime,[,n]=e.mediaSeekable??[],r=null;if(Number.isFinite(e.mediaDuration)?r=e.mediaDuration:Number.isFinite(n)&&(r=n),t==null||r===null){e.setAttribute(`aria-description`,E(`video not loaded, unknown time.`));return}let i=e.remaining?Re(0-(r-t)):Re(t);if(!e.showDuration){e.setAttribute(`aria-description`,i);return}let a=E(`{currentTime} of {totalTime}`,{currentTime:i,totalTime:Re(r)});e.setAttribute(`aria-description`,a)};function Xc(e,t){return`
    <slot>${Jc(t)}</slot>
  `}var Zc=e=>{e.setAttribute(`aria-label`,E(`playback time`))},Qc=class extends Ga{constructor(){super(),Ac(this,Ic),Ac(this,Rc),Ac(this,Bc),Ac(this,Hc),Ac(this,Nc,void 0),Ac(this,Pc,null),Ac(this,Fc,e=>{let{metaKey:t,altKey:n,key:r}=e;if(t||n||!Kc.includes(r)){this.removeEventListener(`keyup`,kc(this,Pc));return}this.addEventListener(`keyup`,kc(this,Pc))}),jc(this,Nc,this.shadowRoot.querySelector(`slot`)),kc(this,Nc).innerHTML=`${Jc(this)}`}static get observedAttributes(){return[...super.observedAttributes,...Gc,`disabled`]}connectedCallback(){let{style:e}=k(this.shadowRoot,`:host(:hover:not([notoggle]))`);e.setProperty(`cursor`,`var(--media-cursor, pointer)`),e.setProperty(`background`,`var(--media-control-hover-background, rgba(50 50 70 / .7))`),this.setAttribute(`aria-label`,E(`playback time`)),Mc(this,Bc,Vc).call(this),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute(`remaining`)?this.removeAttribute(`remaining`):this.setAttribute(`remaining`,``))}disconnectedCallback(){this.disable(),Mc(this,Rc,zc).call(this),super.disconnectedCallback()}attributeChangedCallback(e,t,n){Zc(this),Gc.includes(e)?this.update():e===`disabled`&&n!==t?n==null?Mc(this,Bc,Vc).call(this):Mc(this,Hc,Uc).call(this):e===Wc.NO_TOGGLE&&n!==t&&(this.noToggle?Mc(this,Hc,Uc).call(this):Mc(this,Bc,Vc).call(this)),super.attributeChangedCallback(e,t,n)}enable(){this.noToggle||(this.tabIndex=0)}disable(){this.tabIndex=-1}get remaining(){return M(this,Wc.REMAINING)}set remaining(e){N(this,Wc.REMAINING,e)}get showDuration(){return M(this,Wc.SHOW_DURATION)}set showDuration(e){N(this,Wc.SHOW_DURATION,e)}get noToggle(){return M(this,Wc.NO_TOGGLE)}set noToggle(e){N(this,Wc.NO_TOGGLE,e)}get mediaDuration(){return A(this,x.MEDIA_DURATION)}set mediaDuration(e){j(this,x.MEDIA_DURATION,e)}get mediaCurrentTime(){return A(this,x.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){j(this,x.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){let e=this.getAttribute(x.MEDIA_SEEKABLE);if(e)return e.split(`:`).map(e=>+e)}set mediaSeekable(e){if(e==null){this.removeAttribute(x.MEDIA_SEEKABLE);return}this.setAttribute(x.MEDIA_SEEKABLE,e.join(`:`))}update(){let e=Jc(this);Yc(this),e!==kc(this,Nc).innerHTML&&(kc(this,Nc).innerHTML=e)}};Nc=new WeakMap,Pc=new WeakMap,Fc=new WeakMap,Ic=new WeakSet,Lc=function(){kc(this,Pc)||(jc(this,Pc,e=>{let{key:t}=e;if(!Kc.includes(t)){this.removeEventListener(`keyup`,kc(this,Pc));return}this.toggleTimeDisplay()}),this.addEventListener(`keydown`,kc(this,Fc)),this.addEventListener(`click`,this.toggleTimeDisplay))},Rc=new WeakSet,zc=function(){kc(this,Pc)&&(this.removeEventListener(`keyup`,kc(this,Pc)),this.removeEventListener(`keydown`,kc(this,Fc)),this.removeEventListener(`click`,this.toggleTimeDisplay),jc(this,Pc,null))},Bc=new WeakSet,Vc=function(){!this.noToggle&&!this.hasAttribute(`disabled`)&&(this.setAttribute(`role`,`button`),this.enable(),Mc(this,Ic,Lc).call(this))},Hc=new WeakSet,Uc=function(){this.removeAttribute(`role`),this.disable(),Mc(this,Rc,zc).call(this)},Qc.getSlotTemplateHTML=Xc,D.customElements.get(`media-time-display`)||D.customElements.define(`media-time-display`,Qc);var $c=Qc,el=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},J=(e,t,n)=>(el(e,t,`read from private field`),n?n.call(e):t.get(e)),tl=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},nl=(e,t,n,r)=>(el(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),rl=(e,t,n,r)=>({set _(r){nl(e,t,r,n)},get _(){return J(e,t,r)}}),il,al,ol,sl,cl,ll,ul,dl,fl,pl,ml=class{constructor(e,t,n){tl(this,il,void 0),tl(this,al,void 0),tl(this,ol,void 0),tl(this,sl,void 0),tl(this,cl,void 0),tl(this,ll,void 0),tl(this,ul,void 0),tl(this,dl,void 0),tl(this,fl,0),tl(this,pl,(e=performance.now())=>{nl(this,fl,requestAnimationFrame(J(this,pl))),nl(this,sl,performance.now()-J(this,ol));let t=1e3/this.fps;if(J(this,sl)>t){nl(this,ol,e-J(this,sl)%t);let n=1e3/((e-J(this,al))/++rl(this,cl)._),r=(e-J(this,ll))/1e3/this.duration,i=J(this,ul)+r*this.playbackRate;i-J(this,il).valueAsNumber>0?nl(this,dl,this.playbackRate/this.duration/n):(nl(this,dl,.995*J(this,dl)),i=J(this,il).valueAsNumber+J(this,dl)),this.callback(i)}}),nl(this,il,e),this.callback=t,this.fps=n}start(){J(this,fl)===0&&(nl(this,ol,performance.now()),nl(this,al,J(this,ol)),nl(this,cl,0),J(this,pl).call(this))}stop(){J(this,fl)!==0&&(cancelAnimationFrame(J(this,fl)),nl(this,fl,0))}update({start:e,duration:t,playbackRate:n}){let r=e-J(this,il).valueAsNumber,i=Math.abs(t-this.duration);(r>0||r<-.03||i>=.5)&&this.callback(e),nl(this,ul,e),nl(this,ll,performance.now()),this.duration=t,this.playbackRate=n}};il=new WeakMap,al=new WeakMap,ol=new WeakMap,sl=new WeakMap,cl=new WeakMap,ll=new WeakMap,ul=new WeakMap,dl=new WeakMap,fl=new WeakMap,pl=new WeakMap;var hl=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Y=(e,t,n)=>(hl(e,t,`read from private field`),n?n.call(e):t.get(e)),X=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},gl=(e,t,n,r)=>(hl(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),_l=(e,t,n)=>(hl(e,t,`access private method`),n),vl,yl,bl,xl,Sl,Cl,wl,Tl,El,Dl,Ol,kl,Al,jl,Ml,Nl,Pl,Fl,Il,Ll,Rl,zl,Bl,Vl,Hl,Ul,Wl=e=>{let t=e.range,n=Re(+ql(e)),r=Re(+e.mediaSeekableEnd),i=n&&r?E(`{currentTime} of {totalTime}`,{currentTime:n,totalTime:r}):E(`video not loaded, unknown time.`);t.setAttribute(`aria-valuetext`,i)};function Gl(e){return`
    <style>
      :host {
        --media-box-border-radius: 4px;
        --media-box-padding-left: 10px;
        --media-box-padding-right: 10px;
        --media-preview-border-radius: var(--media-box-border-radius);
        --media-box-arrow-offset: var(--media-box-border-radius);
        --_control-background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        --_preview-background: var(--media-preview-background, var(--_control-background));

        
        contain: layout;
      }

      #buffered {
        background: var(--media-time-range-buffered-color, rgb(255 255 255 / .4));
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #preview-rail,
      #current-rail {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 100%;
        pointer-events: none;
        will-change: transform;
      }

      [part~="box"] {
        width: min-content;
        
        position: absolute;
        bottom: 100%;
        flex-direction: column;
        align-items: center;
        transform: translateX(-50%);
      }

      [part~="current-box"] {
        display: var(--media-current-box-display, var(--media-box-display, flex));
        margin: var(--media-current-box-margin, var(--media-box-margin, 0 0 5px));
        visibility: hidden;
      }

      [part~="preview-box"] {
        display: var(--media-preview-box-display, var(--media-box-display, flex));
        margin: var(--media-preview-box-margin, var(--media-box-margin, 0 0 5px));
        transition-property: var(--media-preview-transition-property, visibility, opacity);
        transition-duration: var(--media-preview-transition-duration-out, .25s);
        transition-delay: var(--media-preview-transition-delay-out, 0s);
        visibility: hidden;
        opacity: 0;
      }

      :host(:is([${x.MEDIA_PREVIEW_IMAGE}], [${x.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
        transition-duration: var(--media-preview-transition-duration-in, .5s);
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
        opacity: 1;
      }

      @media (hover: hover) {
        :host(:is([${x.MEDIA_PREVIEW_IMAGE}], [${x.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
          transition-duration: var(--media-preview-transition-duration-in, .5s);
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
          opacity: 1;
        }
      }

      media-preview-thumbnail,
      ::slotted(media-preview-thumbnail) {
        visibility: hidden;
        
        transition: visibility 0s .25s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-thumbnail-background, var(--_preview-background));
        box-shadow: var(--media-preview-thumbnail-box-shadow, 0 0 4px rgb(0 0 0 / .2));
        max-width: var(--media-preview-thumbnail-max-width, 180px);
        max-height: var(--media-preview-thumbnail-max-height, 160px);
        min-width: var(--media-preview-thumbnail-min-width, 120px);
        min-height: var(--media-preview-thumbnail-min-height, 80px);
        border: var(--media-preview-thumbnail-border);
        border-radius: var(--media-preview-thumbnail-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius) 0 0);
      }

      :host([${x.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
      :host([${x.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      @media (hover: hover) {
        :host([${x.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
        :host([${x.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
        }

        :host([${x.MEDIA_PREVIEW_TIME}]:hover) {
          --media-time-range-hover-display: block;
        }
      }

      media-preview-chapter-display,
      ::slotted(media-preview-chapter-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        visibility: hidden;
        
        transition: min-width 0s, border-radius 0s, margin 0s, padding 0s, visibility 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-chapter-background, var(--_preview-background));
        border-radius: var(--media-preview-chapter-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-chapter-padding, 3.5px 9px);
        margin: var(--media-preview-chapter-margin, 0 0 5px);
        text-shadow: var(--media-preview-chapter-text-shadow, 0 0 4px rgb(0 0 0 / .75));
      }

      :host([${x.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
      :host([${x.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-chapter-border-radius, 0);
        padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
        margin: var(--media-preview-chapter-margin, 0);
        min-width: 100%;
      }

      media-preview-chapter-display[${x.MEDIA_PREVIEW_CHAPTER}],
      ::slotted(media-preview-chapter-display[${x.MEDIA_PREVIEW_CHAPTER}]) {
        visibility: visible;
      }

      media-preview-chapter-display:not([aria-valuetext]),
      ::slotted(media-preview-chapter-display:not([aria-valuetext])) {
        display: none;
      }

      media-preview-time-display,
      ::slotted(media-preview-time-display),
      media-time-display,
      ::slotted(media-time-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        
        transition: min-width 0s, border-radius 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-time-background, var(--_preview-background));
        border-radius: var(--media-preview-time-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-time-padding, 3.5px 9px);
        margin: var(--media-preview-time-margin, 0);
        text-shadow: var(--media-preview-time-text-shadow, 0 0 4px rgb(0 0 0 / .75));
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50%)
        ));
      }

      :host([${x.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
      :host([${x.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-time-border-radius,
          0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
        min-width: 100%;
      }

      :host([${x.MEDIA_PREVIEW_TIME}]:hover) {
        --media-time-range-hover-display: block;
      }

      [part~="arrow"],
      ::slotted([part~="arrow"]) {
        display: var(--media-box-arrow-display, inline-block);
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2 + var(--media-box-arrow-offset)),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50% - var(--media-box-arrow-offset))
        ));
        
        border-color: transparent;
        border-top-color: var(--media-box-arrow-background, var(--_control-background));
        border-width: var(--media-box-arrow-border-width,
          var(--media-box-arrow-height, 5px) var(--media-box-arrow-width, 6px) 0);
        border-style: solid;
        justify-content: center;
        height: 0;
      }
    </style>
    <div id="preview-rail">
      <slot name="preview" part="box preview-box">
        <media-preview-thumbnail>
          <template shadowrootmode="${nc.shadowRootOptions.mode}">
            ${nc.getTemplateHTML({})}
          </template>
        </media-preview-thumbnail>
        <media-preview-chapter-display></media-preview-chapter-display>
        <media-preview-time-display></media-preview-time-display>
        <slot name="preview-arrow"><div part="arrow"></div></slot>
      </slot>
    </div>
    <div id="current-rail">
      <slot name="current" part="box current-box">
        
      </slot>
    </div>
  `}var Kl=(e,t=e.mediaCurrentTime)=>{let n=Number.isFinite(e.mediaSeekableStart)?e.mediaSeekableStart:0,r=Number.isFinite(e.mediaDuration)?e.mediaDuration:e.mediaSeekableEnd;if(Number.isNaN(r))return 0;let i=(t-n)/(r-n);return Math.max(0,Math.min(i,1))},ql=(e,t=e.range.valueAsNumber)=>{let n=Number.isFinite(e.mediaSeekableStart)?e.mediaSeekableStart:0,r=Number.isFinite(e.mediaDuration)?e.mediaDuration:e.mediaSeekableEnd;return Number.isNaN(r)?0:t*(r-n)+n},Jl=class extends Oa{constructor(){super(),X(this,kl),X(this,Ml),X(this,Pl),X(this,Il),X(this,Rl),X(this,Bl),X(this,Hl),X(this,vl,null),X(this,yl,void 0),X(this,bl,void 0),X(this,xl,void 0),X(this,Sl,void 0),X(this,Cl,void 0),X(this,wl,void 0),X(this,Tl,void 0),X(this,El,void 0),X(this,Dl,void 0),X(this,Ol,()=>{_l(this,kl,Al).call(this)?Y(this,yl).start():Y(this,yl).stop()}),X(this,jl,e=>{this.dragging||(Oe(e)&&(this.range.valueAsNumber=e),Y(this,Dl)||this.updateBar())}),this.shadowRoot.querySelector(`#track`).insertAdjacentHTML(`afterbegin`,`<div id="buffered" part="buffered"></div>`),gl(this,bl,this.shadowRoot.querySelectorAll(`[part~="box"]`)),gl(this,Sl,this.shadowRoot.querySelector(`[part~="preview-box"]`)),gl(this,Cl,this.shadowRoot.querySelector(`[part~="current-box"]`));let e=getComputedStyle(this);gl(this,wl,parseInt(e.getPropertyValue(`--media-box-padding-left`))),gl(this,Tl,parseInt(e.getPropertyValue(`--media-box-padding-right`))),gl(this,yl,new ml(this.range,Y(this,jl),60))}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PAUSED,x.MEDIA_DURATION,x.MEDIA_SEEKABLE,x.MEDIA_CURRENT_TIME,x.MEDIA_PREVIEW_IMAGE,x.MEDIA_PREVIEW_TIME,x.MEDIA_PREVIEW_CHAPTER,x.MEDIA_BUFFERED,x.MEDIA_PLAYBACK_RATE,x.MEDIA_LOADING,x.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute(`aria-label`,E(`seek`)),Y(this,Ol).call(this),gl(this,vl,this.getRootNode()),(e=Y(this,vl))==null||e.addEventListener(`transitionstart`,this)}disconnectedCallback(){var e;super.disconnectedCallback(),Y(this,yl).stop(),(e=Y(this,vl))==null||e.removeEventListener(`transitionstart`,this),gl(this,vl,null)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),t!=n&&(e===x.MEDIA_CURRENT_TIME||e===x.MEDIA_PAUSED||e===x.MEDIA_ENDED||e===x.MEDIA_LOADING||e===x.MEDIA_DURATION||e===x.MEDIA_SEEKABLE?(Y(this,yl).update({start:Kl(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),Y(this,Ol).call(this),Wl(this)):e===x.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===x.MEDIA_DURATION||e===x.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=Y(this,El),this.updateBar()))}get mediaChaptersCues(){return Y(this,El)}set mediaChaptersCues(e){gl(this,El,e),this.updateSegments(Y(this,El)?.map(e=>({start:Kl(this,e.startTime),end:Kl(this,e.endTime)})))}get mediaPaused(){return M(this,x.MEDIA_PAUSED)}set mediaPaused(e){N(this,x.MEDIA_PAUSED,e)}get mediaLoading(){return M(this,x.MEDIA_LOADING)}set mediaLoading(e){N(this,x.MEDIA_LOADING,e)}get mediaDuration(){return A(this,x.MEDIA_DURATION)}set mediaDuration(e){j(this,x.MEDIA_DURATION,e)}get mediaCurrentTime(){return A(this,x.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){j(this,x.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return A(this,x.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){j(this,x.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){let e=this.getAttribute(x.MEDIA_BUFFERED);return e?e.split(` `).map(e=>e.split(`:`).map(e=>+e)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(x.MEDIA_BUFFERED);return}let t=e.map(e=>e.join(`:`)).join(` `);this.setAttribute(x.MEDIA_BUFFERED,t)}get mediaSeekable(){let e=this.getAttribute(x.MEDIA_SEEKABLE);if(e)return e.split(`:`).map(e=>+e)}set mediaSeekable(e){if(e==null){this.removeAttribute(x.MEDIA_SEEKABLE);return}this.setAttribute(x.MEDIA_SEEKABLE,e.join(`:`))}get mediaSeekableEnd(){let[,e=this.mediaDuration]=this.mediaSeekable??[];return e}get mediaSeekableStart(){let[e=0]=this.mediaSeekable??[];return e}get mediaPreviewImage(){return P(this,x.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){F(this,x.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return A(this,x.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){j(this,x.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return M(this,x.MEDIA_ENDED)}set mediaEnded(e){N(this,x.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){let e=this.mediaBuffered;if(!e.length)return;let t;if(this.mediaEnded)t=1;else{let n=this.mediaCurrentTime,[,r=this.mediaSeekableStart]=e.find(([e,t])=>e<=n&&n<=t)??[];t=Kl(this,r)}let{style:n}=k(this.shadowRoot,`#buffered`);n.setProperty(`width`,`${t*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector(`slot[name="current"]`).assignedElements().length)return;let e=k(this.shadowRoot,`#current-rail`),t=k(this.shadowRoot,`[part~="current-box"]`),n=_l(this,Ml,Nl).call(this,Y(this,Cl)),r=_l(this,Pl,Fl).call(this,n,this.range.valueAsNumber),i=_l(this,Il,Ll).call(this,n,this.range.valueAsNumber);e.style.transform=`translateX(${r})`,e.style.setProperty(`--_range-width`,`${n.range.width}`),t.style.setProperty(`--_box-shift`,`${i}`),t.style.setProperty(`--_box-width`,`${n.box.width}px`),t.style.setProperty(`visibility`,`initial`)}handleEvent(e){switch(super.handleEvent(e),e.type){case`input`:_l(this,Hl,Ul).call(this);break;case`pointermove`:_l(this,Rl,zl).call(this,e);break;case`pointerup`:Y(this,Dl)&&gl(this,Dl,!1);break;case`pointerdown`:gl(this,Dl,!0);break;case`pointerleave`:_l(this,Bl,Vl).call(this,null);break;case`transitionstart`:at(e.target,this)&&setTimeout(()=>Y(this,Ol).call(this),0)}}};vl=new WeakMap,yl=new WeakMap,bl=new WeakMap,xl=new WeakMap,Sl=new WeakMap,Cl=new WeakMap,wl=new WeakMap,Tl=new WeakMap,El=new WeakMap,Dl=new WeakMap,Ol=new WeakMap,kl=new WeakSet,Al=function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&lt(this)},jl=new WeakMap,Ml=new WeakSet,Nl=function(e){let t=((this.getAttribute(`bounds`)?ot(this,`#${this.getAttribute(`bounds`)}`):this.parentElement)??this).getBoundingClientRect(),n=this.range.getBoundingClientRect(),r=e.offsetWidth;return{box:{width:r,min:-(n.left-t.left-r/2),max:t.right-n.left-r/2},bounds:t,range:n}},Pl=new WeakSet,Fl=function(e,t){let n=`${t*100}%`,{width:r,min:i,max:a}=e.box;if(!r)return n;if(Number.isNaN(i)||(n=`max(${`calc(1 / var(--_range-width) * 100 * ${i}% + var(--media-box-padding-left))`}, ${n})`),!Number.isNaN(a)){let e=`calc(1 / var(--_range-width) * 100 * ${a}% - var(--media-box-padding-right))`;n=`min(${n}, ${e})`}return n},Il=new WeakSet,Ll=function(e,t){let{width:n,min:r,max:i}=e.box,a=t*e.range.width;if(a<r+Y(this,wl)){let t=e.range.left-e.bounds.left-Y(this,wl);return`${a-n/2+t}px`}if(a>i-Y(this,Tl)){let t=e.bounds.right-e.range.right-Y(this,Tl);return`${a+n/2-t-e.range.width}px`}return 0},Rl=new WeakSet,zl=function(e){let t=[...Y(this,bl)].some(t=>e.composedPath().includes(t));if(!this.dragging&&(t||!e.composedPath().includes(this))){_l(this,Bl,Vl).call(this,null);return}let n=this.mediaSeekableEnd;if(!n)return;let r=k(this.shadowRoot,`#preview-rail`),i=k(this.shadowRoot,`[part~="preview-box"]`),a=_l(this,Ml,Nl).call(this,Y(this,Sl)),o=(e.clientX-a.range.left)/a.range.width;o=Math.max(0,Math.min(1,o));let s=_l(this,Pl,Fl).call(this,a,o),c=_l(this,Il,Ll).call(this,a,o);r.style.transform=`translateX(${s})`,r.style.setProperty(`--_range-width`,`${a.range.width}`),i.style.setProperty(`--_box-shift`,`${c}`),i.style.setProperty(`--_box-width`,`${a.box.width}px`);let l=Math.round(Y(this,xl))-Math.round(o*n);Math.abs(l)<1&&o>.01&&o<.99||(gl(this,xl,o*n),_l(this,Bl,Vl).call(this,Y(this,xl)))},Bl=new WeakSet,Vl=function(e){this.dispatchEvent(new D.CustomEvent(w.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:e}))},Hl=new WeakSet,Ul=function(){Y(this,yl).stop();let e=ql(this);this.dispatchEvent(new D.CustomEvent(w.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e}))},Jl.shadowRootOptions={mode:`open`},Jl.getContainerTemplateHTML=Gl,D.customElements.get(`media-time-range`)||D.customElements.define(`media-time-range`,Jl);var Yl=Jl,Xl=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Zl=(e,t,n)=>(Xl(e,t,`read from private field`),n?n.call(e):t.get(e)),Ql=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},$l,eu=1,tu=e=>e.mediaMuted?0:e.mediaVolume,nu=e=>`${Math.round(e*100)}%`,ru=class extends Oa{constructor(){super(...arguments),Ql(this,$l,()=>{let e=this.range.value,t=new D.CustomEvent(w.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)})}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_VOLUME,x.MEDIA_MUTED,x.MEDIA_VOLUME_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),this.range.setAttribute(`aria-label`,E(`volume`)),this.range.addEventListener(`input`,Zl(this,$l))}disconnectedCallback(){this.range.removeEventListener(`input`,Zl(this,$l)),super.disconnectedCallback()}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),(e===x.MEDIA_VOLUME||e===x.MEDIA_MUTED)&&(this.range.valueAsNumber=tu(this),this.range.setAttribute(`aria-valuetext`,nu(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return A(this,x.MEDIA_VOLUME,eu)}set mediaVolume(e){j(this,x.MEDIA_VOLUME,e)}get mediaMuted(){return M(this,x.MEDIA_MUTED)}set mediaMuted(e){N(this,x.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return P(this,x.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){F(this,x.MEDIA_VOLUME_UNAVAILABLE,e)}};$l=new WeakMap,D.customElements.get(`media-volume-range`)||D.customElements.define(`media-volume-range`,ru);var iu=ru;function au(e){return`
      <style>
        :host {
          min-width: 4ch;
          padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
          width: 100%;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          font-weight: var(--media-button-font-weight, normal);
        }

        #checked-indicator {
          display: none;
        }

        :host([${x.MEDIA_LOOP}]) #checked-indicator {
          display: block;
        }
      </style>
      
      <span id="icon">
     </span>

      <div id="checked-indicator">
        <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
          <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
        </svg>
      </div>
    `}function ou(){return E(`Loop`)}var su=class extends G{constructor(){super(...arguments),this.container=null}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_LOOP]}connectedCallback(){super.connectedCallback(),this.container=this.shadowRoot?.querySelector(`#icon`)||null,this.container&&(this.container.textContent=E(`Loop`))}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_LOOP&&this.container&&this.setAttribute(`aria-checked`,this.mediaLoop?`true`:`false`)}get mediaLoop(){return M(this,x.MEDIA_LOOP)}set mediaLoop(e){N(this,x.MEDIA_LOOP,e)}handleClick(){let e=!this.mediaLoop,t=new D.CustomEvent(w.MEDIA_LOOP_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}};su.getSlotTemplateHTML=au,su.getTooltipContentHTML=ou,D.customElements.get(`media-loop-button`)||D.customElements.define(`media-loop-button`,su);var cu=su;function lu(e,t){return t.suspended?{open:!1,reason:`suspended`}:t.seeking?{open:!1,reason:`seeking`}:t.waiting?{open:!1,reason:`foreground-waiting`}:t.fullyBuffered||Number.isFinite(t.foregroundBufferAheadSeconds)&&t.foregroundBufferAheadSeconds>=(e?4:8)?{open:!0,reason:`foreground-buffered`}:{open:!1,reason:`foreground-buffer`}}var uu=32,du=18,fu=1.6,pu=Math.ceil(fu*3),mu=Array.from({length:11},(e,t)=>{let n=t-pu;return Math.exp(-n*n/(2*fu*fu))}),hu=0,gu=mu.map(e=>(hu+=e,e/hu));function _u({canvas:e,onContextLost:t,signal:n}){let r=[],i=!1;function a(){if(!i){i=!0,n.removeEventListener(`abort`,a);for(let e of r)e.removeEventListener(`contextlost`,o),e.width=1,e.height=1}}function o(){i||(a(),t())}function s(t,n){let i=e.ownerDocument.createElement(`canvas`);r.push(i),i.width=t,i.height=n;let a=i.getContext(`2d`,{alpha:!1});if(!a)throw Error(`Seek backdrop Canvas 2D surface allocation failed.`);return a.imageSmoothingEnabled=!0,a.imageSmoothingQuality=`high`,i.addEventListener(`contextlost`,o),{element:i,context:a}}try{if(n.aborted)throw new DOMException(`Seek backdrop initialization was aborted.`,`AbortError`);let t=e.getContext(`2d`,{alpha:!1});if(!t)throw Error(`Seek backdrop output Canvas 2D is unavailable.`);let r=s(42,28),o=s(uu,r.element.height),c=s(uu,du);return n.addEventListener(`abort`,a,{once:!0}),{drawImage(n){if(i)return;let a=r.context;a.imageSmoothingEnabled=!0,a.drawImage(n,pu,pu,uu,du),a.imageSmoothingEnabled=!1,a.drawImage(r.element,pu,pu,1,du,0,pu,pu,du),a.drawImage(r.element,36,pu,1,du,37,pu,pu,du),a.drawImage(r.element,0,pu,r.element.width,1,0,0,r.element.width,pu),a.drawImage(r.element,0,22,r.element.width,1,0,23,r.element.width,pu);for(let e=0;e<gu.length;e++)o.context.globalAlpha=gu[e],o.context.drawImage(r.element,e,0,uu,o.element.height,0,0,uu,o.element.height);for(let e=0;e<gu.length;e++)c.context.globalAlpha=gu[e],c.context.drawImage(o.element,0,e,uu,du,0,0,uu,du);t.imageSmoothingEnabled=!0,t.imageSmoothingQuality=`high`,t.drawImage(c.element,0,0,e.width,e.height)},dispose:a}}catch(e){throw a(),e}}function vu(e){let t=0,n=e.currentTime;for(let r=0;r<e.buffered.length;r++)if(n>=e.buffered.start(r)&&n<=e.buffered.end(r)){t=e.buffered.end(r);break}return{foregroundBufferAheadSeconds:Math.max(0,t-n),fullyBuffered:Number.isFinite(e.duration)&&e.duration>0&&t>=e.duration-.05}}var yu=m([o({webkitDisplayingFullscreen:r(!0)}),o({webkitPresentationMode:l([`fullscreen`,`picture-in-picture`])})]);function bu(e){return e.ownerDocument.pictureInPictureElement===e||e.ownerDocument.fullscreenElement===e||yu.safeParse(e).success}var xu=new Set([`style`,`children`,`ref`,`key`,`suppressContentEditableWarning`,`suppressHydrationWarning`,`dangerouslySetInnerHTML`]),Su={className:`class`,htmlFor:`for`};function Cu(e){return e.toLowerCase()}function wu(e){if(typeof e==`boolean`)return e?``:void 0;if(typeof e!=`function`&&!(typeof e==`object`&&e))return e}function Z({react:e,tagName:t,elementClass:n,events:r,displayName:i,defaultProps:a,toAttributeName:o=Cu,toAttributeValue:s=wu}){let c=Number.parseInt(e.version)>=19,l=e.forwardRef((i,l)=>{let u=e.useRef(null),d=e.useRef(new Map),f={},p={},m={},h={};for(let[e,t]of Object.entries(i)){if(xu.has(e)){m[e]=t;continue}let r=o(Su[e]??e);if(n.prototype&&e in n.prototype&&!(e in(globalThis.HTMLElement?.prototype??{}))&&!n.observedAttributes?.some(e=>e===r)){h[e]=t;continue}if(e.startsWith(`on`)){f[e]=t;continue}let i=s(t);r&&i!=null&&(p[r]=String(i),c||(m[r]=i)),r&&c&&(m[r]=i===wu(t)?t:i)}if(typeof window<`u`){for(let t in f){let n=f[t],i=t.endsWith(`Capture`),a=(r?.[t]??t.slice(2).toLowerCase()).slice(0,i?-7:void 0);e.useLayoutEffect(()=>{let e=u?.current;if(e&&typeof n==`function`)return e.addEventListener(a,n,i),()=>{e.removeEventListener(a,n,i)}},[u?.current,n])}e.useLayoutEffect(()=>{if(u.current===null)return;let e=new Map;for(let t in h)Tu(u.current,t,h[t]),d.current.delete(t),e.set(t,h[t]);for(let[e,t]of d.current)Tu(u.current,e,void 0);d.current=e})}if(typeof window>`u`&&n?.getTemplateHTML&&n?.shadowRootOptions){let{mode:t,delegatesFocus:r}=n.shadowRootOptions;m.children=[e.createElement(`template`,{shadowrootmode:t,shadowrootdelegatesfocus:r,dangerouslySetInnerHTML:{__html:n.getTemplateHTML(p,i)},key:`ce-la-react-ssr-template-shadow-root`}),m.children]}return e.createElement(t,{...a,...m,ref:e.useCallback(e=>{u.current=e,typeof l==`function`?l(e):l!==null&&(l.current=e)},[l])},m.children)});return l.displayName=i??n.name,l}function Tu(e,t,n){e[t]=n,n==null&&t in(globalThis.HTMLElement?.prototype??{})&&e.removeAttribute(t)}function Q(e){if(typeof e==`boolean`)return e?``:void 0;if(typeof e!=`function`){if(Array.isArray(e)&&e.every(e=>typeof e==`string`||typeof e==`number`||typeof e==`boolean`))return e.join(` `);if(!(typeof e==`object`&&e))return e}}Z({tagName:`media-gesture-receiver`,elementClass:bt,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Z({tagName:`media-container`,elementClass:Qt,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var Eu=Z({tagName:`media-controller`,elementClass:Rr,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});Z({tagName:`media-tooltip`,elementClass:Hr,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Z({tagName:`media-chrome-button`,elementClass:ii,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Z({tagName:`media-airplay-button`,elementClass:ui,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var Du=Z({tagName:`media-captions-button`,elementClass:yi,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});Z({tagName:`media-cast-button`,elementClass:Ei,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Z({tagName:`media-chrome-dialog`,elementClass:Zi,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Z({tagName:`media-chrome-range`,elementClass:ka,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var Ou=Z({tagName:`media-control-bar`,elementClass:La,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});Z({tagName:`media-text-display`,elementClass:Ka,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Z({tagName:`media-duration-display`,elementClass:eo,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Z({tagName:`media-error-dialog`,elementClass:ho,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Z({tagName:`media-keyboard-shortcuts-dialog`,elementClass:wo,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Z({tagName:`media-fullscreen-button`,elementClass:Io,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Z({tagName:`media-live-button`,elementClass:Go,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var ku=Z({tagName:`media-loading-indicator`,elementClass:rs,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});Z({tagName:`media-mute-button`,elementClass:ds,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Z({tagName:`media-pip-button`,elementClass:_s,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Z({tagName:`media-playback-rate-button`,elementClass:Os,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var Au=Z({tagName:`media-play-button`,elementClass:Fs,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});Z({tagName:`media-poster-image`,elementClass:Vs,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Z({tagName:`media-preview-chapter-display`,elementClass:Js,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Z({tagName:`media-preview-thumbnail`,elementClass:nc,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var ju=Z({tagName:`media-preview-time-display`,elementClass:lc,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});Z({tagName:`media-seek-backward-button`,elementClass:vc,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Z({tagName:`media-seek-forward-button`,elementClass:Dc,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var Mu=Z({tagName:`media-time-display`,elementClass:$c,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Nu=Z({tagName:`media-time-range`,elementClass:Yl,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Pu=Z({tagName:`media-volume-range`,elementClass:iu,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});Z({tagName:`media-loop-button`,elementClass:cu,react:T.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Ne(`es`,{"Start airplay":`Iniciar AirPlay`,"Stop airplay":`Detener AirPlay`,Audio:`Audio`,Captions:`Subtítulos`,"Enable captions":`Activar subtítulos`,"Disable captions":`Desactivar subtítulos`,"Start casting":`Iniciar transmisión`,"Stop casting":`Detener transmisión`,"Enter fullscreen mode":`Entrar en modo pantalla completa`,"Exit fullscreen mode":`Salir del modo pantalla completa`,Mute:`Silenciar`,Unmute:`Reactivar sonido`,Loop:`Bucle`,"Enter picture in picture mode":`Entrar en modo imagen en imagen`,"Exit picture in picture mode":`Salir del modo imagen en imagen`,Play:`Reproducir`,Pause:`Pausar`,"Playback rate":`Velocidad de reproducción`,"Playback rate {playbackRate}":`Velocidad de reproducción {playbackRate}`,Quality:`Calidad`,"Seek backward":`Retroceder`,"Seek forward":`Avanzar`,Settings:`Configuración`,Auto:`Auto`,"audio player":`reproductor de audio`,"video player":`reproductor de video`,volume:`volumen`,seek:`búsqueda`,"closed captions":`subtítulos`,"current playback rate":`velocidad de reproducción actual`,"playback time":`tiempo de reproducción`,"media loading":`cargando medios`,settings:`configuración`,"audio tracks":`pistas de audio`,quality:`calidad`,play:`reproducir`,pause:`pausar`,mute:`silenciar`,unmute:`reactivar sonido`,"chapter: {chapterName}":`capítulo: {chapterName}`,live:`en vivo`,Off:`Apagado`,"start airplay":`iniciar AirPlay`,"stop airplay":`detener AirPlay`,"start casting":`iniciar transmisión`,"stop casting":`detener transmisión`,"enter fullscreen mode":`entrar en modo pantalla completa`,"exit fullscreen mode":`salir del modo pantalla completa`,"enter picture in picture mode":`entrar en modo imagen en imagen`,"exit picture in picture mode":`salir del modo imagen en imagen`,"seek to live":`ir a la transmisión en vivo`,"playing live":`reproduciendo en vivo`,"seek back {seekOffset} seconds":`retroceder {seekOffset} segundos`,"seek forward {seekOffset} seconds":`avanzar {seekOffset} segundos`,"Network Error":`Error de red`,"Decode Error":`Error de decodificación`,"Source Not Supported":`Fuente no compatible`,"Encryption Error":`Error de cifrado`,"A network error caused the media download to fail.":`Un error de red causó la falla en la descarga del contenido.`,"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":`Un error de medios causó la interrupción de la reproducción. El contenido podría estar dañado o tu navegador no admite este formato.`,"An unsupported error occurred. The server or network failed, or your browser does not support this format.":`Ocurrió un error de incompatibilidad. El servidor o la red fallaron, o tu navegador no admite este formato.`,"The media is encrypted and there are no keys to decrypt it.":`El contenido está cifrado y no hay claves disponibles para descifrarlo.`,hour:`hora`,hours:`horas`,minute:`minuto`,minutes:`minutos`,second:`segundo`,seconds:`segundos`,"{time} remaining":`{time} restante`,"{currentTime} of {totalTime}":`{currentTime} de {totalTime}`,"video not loaded, unknown time.":`video no cargado, tiempo desconocido.`}),Ne(`fr`,{"Start airplay":`Démarrer la diffusion AirPlay`,"Stop airplay":`Arrêter la diffusion AirPlay`,Audio:`Audio`,Captions:`Sous-titres`,"Enable captions":`Activer les sous-titres`,"Disable captions":`Désactiver les sous-titres`,"Start casting":`Démarrer la diffusion (cast)`,"Stop casting":`Arrêter la diffusion (cast)`,"Enter fullscreen mode":`Mettre en mode plein écran`,"Exit fullscreen mode":`Quitter le mode plein écran`,Mute:`Désactiver le son`,Unmute:`Activer le son`,Loop:`Lire en boucle`,"Enter picture in picture mode":`Mettre en mode image-en-image (PiP)`,"Exit picture in picture mode":`Quitter le mode image-en-image (PiP)`,Play:`Lire`,Pause:`Pause`,"Playback rate":`Taux de lecture`,"Playback rate {playbackRate}":`Taux de lecture {playbackRate}`,Quality:`Qualité`,"Seek backward":`Reculer`,"Seek forward":`Avancer`,Settings:`Paramètres`,Auto:`Auto`,"audio player":`lecteur audio`,"video player":`lecteur vidéo`,volume:`volume`,seek:`se déplacer`,"closed captions":`sous-titres codés`,"current playback rate":`taux de lecture actuel`,"playback time":`durée de lecture`,"media loading":`chargement des médias`,settings:`paramètres`,"audio tracks":`pistes audio`,quality:`qualité`,play:`lire`,pause:`pause`,mute:`désactiver le son`,unmute:`activer le son`,"chapter: {chapterName}":`chapitre: {chapterName}`,live:`en direct`,Off:`Désactivé`,"start airplay":`démarrer la diffusion AirPlay`,"stop airplay":`arrêter la diffusion AirPlay`,"start casting":`démarrer la diffusion (cast)`,"stop casting":`arrêter la diffusion (cast)`,"enter fullscreen mode":`mettre en mode plein écran`,"exit fullscreen mode":`quitter le mode plein écran`,"enter picture in picture mode":`mettre en mode image-en-image (PiP)`,"exit picture in picture mode":`quitter le mode image-en-image (PiP)`,"seek to live":`aller au direct`,"playing live":`lecture en direct`,"seek back {seekOffset} seconds":`reculer {seekOffset} secondes`,"seek forward {seekOffset} seconds":`avancer {seekOffset} secondes`,"Network Error":`Erreur réseau`,"Decode Error":`Erreur de décodage`,"Source Not Supported":`Source non supportée`,"Encryption Error":`Erreur de chiffrement`,"A network error caused the media download to fail.":`Une erreur réseau a causé l’échec du téléchargement du média.`,"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":`Une erreur de média a provoqué l’interruption de la lecture. Le média peut être corrompu ou votre navigateur ne prend pas en charge ce format.`,"An unsupported error occurred. The server or network failed, or your browser does not support this format.":`Une erreur non supportée s’est produite. Le serveur ou le réseau a échoué, ou votre navigateur ne prend pas en charge ce format.`,"The media is encrypted and there are no keys to decrypt it.":`Le média est chiffré et il n’y a pas de clés pour le déchiffrer.`,hour:`heure`,hours:`heures`,minute:`minute`,minutes:`minutes`,second:`seconde`,seconds:`secondes`,"{time} remaining":`{time} restant`,"{currentTime} of {totalTime}":`{currentTime} sur {totalTime}`,"video not loaded, unknown time.":`vidéo non chargée, durée inconnue.`});function Fu({grid:e,signal:t,onData:n,onError:r}){let i=e.width*e.height*3,a=new Map,o,s=!1,c=!1,l;function u(e=!1){l&&!l.controller.signal.aborted&&(l.timedOut=e,l.controller.abort())}function d(){s||(s=!0,u(),a.clear(),t.removeEventListener(`abort`,d))}function p(e){s||(d(),r(`Chunked backdrop stopped: ${ne(e)}`))}async function m(e,t){let n=await fetch(e.gzip.url,{signal:t.controller.signal,priority:`low`});if(!n.ok)throw await n.body?.cancel().catch(e=>{throw Error(`Backdrop chunk HTTP ${n.status} response cleanup failed`,{cause:e})}),Error(`Backdrop chunk could not load (HTTP ${n.status})`);if(!n.body)throw Error(`Backdrop chunk response has no body`);if(t.controller.signal.aborted)throw await n.body.cancel(),Error(`Backdrop chunk was cancelled before reading`);let r=new Uint8Array(e.raw.bytes),i=n.body.getReader(),a=0,o=()=>{i.cancel().catch(e=>{s||p(Error(`Backdrop chunk cancellation failed`,{cause:e}))})};t.controller.signal.addEventListener(`abort`,o,{once:!0});try{for(;;){let e=await i.read();if(e.done)break;if(a+e.value.byteLength>r.byteLength)throw Error(`Backdrop chunk exceeds its declared length`);r.set(e.value,a),a+=e.value.byteLength}if(t.controller.signal.aborted)throw Error(`Backdrop chunk download cancelled`);if(a!==r.byteLength)throw Error(`Backdrop chunk is truncated`);if(await f(r)!==e.raw.sha256)throw Error(`Backdrop chunk checksum does not match this video version`);return r}catch(e){throw await i.cancel().catch(e=>{throw Error(`Backdrop chunk response cleanup failed`,{cause:e})}),e}finally{t.controller.signal.removeEventListener(`abort`,o),i.releaseLock()}}function h(){if(s||l||!c||!o)return;let t=Math.floor(o.frameIndex/e.framesPerChunk),r=a.has(t)?o.playing&&t+1<e.chunks.length&&!a.has(t+1)?t+1:void 0:t;if(r===void 0)return;let i=e.chunks[r];if(!i)return p(Error(`Requested backdrop frame has no chunk`));let d={index:r,controller:new AbortController,timedOut:!1};l=d;let f=setTimeout(()=>u(!0),3e3);m(i,d).then(t=>{if(s)return;if(d.timedOut){p(Error(`Backdrop chunk exceeded its 3s budget`));return}if(d.controller.signal.aborted||!o)return;let n=Math.floor(o.frameIndex/e.framesPerChunk);r<n-1||r>n+1||a.set(r,t)}).catch(e=>{s||(d.timedOut?p(Error(`Backdrop chunk exceeded its 3s budget`)):d.controller.signal.aborted||p(e))}).finally(()=>{clearTimeout(f),l===d&&(l=void 0),!s&&(n(),h())}).catch(p)}return t.addEventListener(`abort`,d,{once:!0}),t.aborted&&d(),{observe(t){if(s)return;if(!Number.isInteger(t.frameIndex)||t.frameIndex<0||t.frameIndex>=e.frameCount)return p(Error(`Chunked backdrop frame is outside the validated timeline`));o=t;let n=Math.floor(t.frameIndex/e.framesPerChunk);for(let e of a.keys())(e<n-1||e>n+1)&&a.delete(e);l&&(l.index<n||l.index>n+1)&&u(),c=lu(c,t).open,c||u(),h()},getFrame(t){if(s)return;let n=Math.floor(t/e.framesPerChunk),r=e.chunks[n],o=a.get(n);if(!r||!o)return;let c=(t-r.startFrame)*i;return o.subarray(c,c+i)},dispose:d}}var Iu=160,Lu=90,Ru=6,zu=o({requestVideoFrameCallback:d(),cancelVideoFrameCallback:d()});function Bu(e){return zu.safeParse(e).success}function Vu(e,t){return Math.max(0,Math.min(t.frameCount-1,Math.floor((e-t.firstFrameSeconds)*t.frameRate+1e-4)))}function Hu(e,t,n,r,i){let a=e.getContext(`2d`,{alpha:!1});if(!a)throw Error(`Canvas 2D is unavailable; use the static backdrop.`);let o=document.createElement(`canvas`);o.width=t,o.height=n;let s;function c(){s=void 0,o.width=1,o.height=1}try{let l=o.getContext(`2d`,{alpha:!1});if(!l)throw Error(`Canvas 2D grid surface allocation failed.`);return o.addEventListener(`contextlost`,r,{signal:i}),s=l.createImageData(t,n),a.imageSmoothingEnabled=!0,a.imageSmoothingQuality=`high`,{drawGrid(t){if(!s)return;let n=s.data;for(let e=0,r=0;e<t.length;e+=3,r+=4)n[r]=t[e],n[r+1]=t[e+1],n[r+2]=t[e+2],n[r+3]=255;l.putImageData(s,0,0),a.imageSmoothingEnabled=!0,a.imageSmoothingQuality=`high`,a.drawImage(o,0,0,e.width,e.height)},dispose:c}}catch(e){throw c(),e}}function Uu(e){let{video:t,canvas:n,onError:r,onFrame:i,onSuspend:a,onFrameUnavailable:o}=e,s=new AbortController,c,l,u,d,f=!1,p=e.suspended??!1,m=null,h=null,g=null,_=+!!t.seeking,v=t.seeking,ee=t.seeking?Ru:0,te=null,re=0;function ie(){d!==void 0&&(t.cancelVideoFrameCallback(d),d=void 0)}function ae(){f||(f=!0,ie(),s.abort(),l?.dispose(),u?.dispose(),c=void 0,n.width=1,n.height=1)}function oe(e){f||(ae(),r(e))}function y(){oe(`A Canvas 2D backdrop context was lost; foreground playback remains native.`)}function se(e,r,a){if(f||p||!c||t.readyState<HTMLMediaElement.HAVE_CURRENT_DATA||t.seeking&&a!==`video-frame-callback`)return;let d=performance.now();try{let f=c,p=Vu(e,f),m=f.getFrame(p),h=!!(t.seeking||a===`settled-seek`||!m&&ee>0);if(h&&a===`settled-seek`&&te===_||!m&&(o?.(p),!h))return;if(t.videoWidth>0&&t.videoHeight>0){let e=Math.min(Iu/t.videoWidth,Lu/t.videoHeight),r=Math.max(1,Math.round(t.videoWidth*e)),i=Math.max(1,Math.round(t.videoHeight*e));(n.width!==r||n.height!==i)&&(n.width=r,n.height=i)}let g=e,v=`video`;if(h)u??=_u({canvas:n,onContextLost:y,signal:s.signal}),u.drawImage(t),a===`settled-seek`&&(te=_),!t.seeking&&!t.paused&&ee--;else if(m){if(m.byteLength!==f.width*f.height*3)throw Error(`Backdrop frame does not match its validated RGB dimensions.`);l?.drawGrid(m),g=f.firstFrameSeconds+p/f.frameRate,v=`grid`,ee=0,re=0}let ne=performance.now()-d;if(h&&(re=ne>8?re+1:0,re>=2)){oe(`Live seek backdrop exceeded its drawing budget; foreground remains native.`);return}let ie=Math.max(0,d-r);i?.({frameIndex:p,mediaTime:e,sourceTime:g,drawMs:ne,lateMs:ie,clock:a,source:v})}catch(e){oe(`Backdrop rendering stopped: ${ne(e)}`)}}function b(){if(f||d!==void 0||p)return;let e=_,n=t.requestVideoFrameCallback((r,i)=>{f||d!==n||e!==_||(d=void 0,m=i.mediaTime,h=e,v=!1,g=null,se(i.mediaTime,i.expectedDisplayTime,`video-frame-callback`),(t.seeking||!t.paused&&!t.ended)&&b())});d=n}function ce(){if(f||p||t.seeking||((t.paused||_>0&&v)&&t.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA&&h!==_&&(g=t.currentTime,v=!1),v))return;let e=g===null?m===null?`initial-clock`:`video-frame-callback`:`settled-seek`;se(g??m??t.currentTime,performance.now(),e)}function le(){f||(ie(),m=null,h=null,g=null,te=null,v=!0,a?.())}function ue(){if(p){le();return}ce(),(!t.paused||v||m===null)&&b()}let de={dispose:ae,drawCurrent:ce,setSuspended(e){f||p===e||(p=e,ue())}};try{if(!Bu(t))throw Error(`Video frame callbacks are unavailable; use the static backdrop.`);c=e.frameSource,n.width=Iu,n.height=Lu;let r=s.signal;l=Hu(n,c.width,c.height,y,r),n.addEventListener(`contextlost`,y,{signal:r}),t.addEventListener(`play`,()=>{g=null,b()},{signal:r}),t.addEventListener(`playing`,b,{signal:r}),t.addEventListener(`loadeddata`,ue,{signal:r}),t.addEventListener(`seeking`,()=>{_++,ee=Ru,te=null,le(),b()},{signal:r}),t.addEventListener(`seeked`,ue,{signal:r}),t.addEventListener(`pause`,ce,{signal:r}),t.addEventListener(`ended`,ce,{signal:r}),t.addEventListener(`emptied`,()=>{ie(),m=null,h=null,g=null,ee=0,te=null,v=!1},{signal:r}),ue(),b()}catch(e){oe(`Backdrop initialization failed: ${ne(e)}`)}return de}function Wu({video:e,canvas:t,poster:n,manifestUrl:r,onFrame:i}){let a=new AbortController,o=e.ownerDocument,s=!1,c=!1,l=!1,u=bu(e),d=!1,f=!1,p,m,h,g,_;function v(e){t.hidden=e!==`ready`&&e!==`holding`,n.hidden=!t.hidden,t.dataset.backdropState=e}function ee(){s||(s=!0,a.abort(),_?.controller.abort(),g?.dispose(),h?.dispose(),v(`disposed`))}function re(e){s||(ee(),v(`fallback`),t.dataset.backdropError=e)}function ie(){return o.visibilityState!==`visible`||u||d}function ae(){ie()&&(f=!1),v(f?`holding`:`deferred`)}async function oe(n){let c=await fetch(r,{signal:n,priority:`low`});if(!c.ok)throw await te(c.body?.cancel()??Promise.resolve(),n),Error(`Backdrop manifest could not load (HTTP ${c.status})`);let l=await Ce(c,524288,n);n.throwIfAborted();let u=ge.parse(JSON.parse(new TextDecoder().decode(l)));if(s)return;let d=new URL(`../`,new URL(r,o.baseURI));m={...u,chunks:u.chunks.map(e=>({...e,gzip:{...e.gzip,url:new URL(e.gzip.url,d).href}}))},g=Fu({grid:m,signal:a.signal,onData:()=>h?.drawCurrent(),onError:re}),h=Uu({video:e,canvas:t,suspended:ie(),frameSource:{...m,getFrame:g.getFrame},onFrameUnavailable(e){s||(ae(),y(e))},onFrame(e){s||(p=e.frameIndex,f=!ie(),v(f?`ready`:`deferred`),y(e.frameIndex),i?.(e))},onSuspend(){s||(p=void 0,ae(),y())},onError:re}),s?h.dispose():y()}function y(t){if(s)return;let n={...vu(e),seeking:e.seeking,waiting:!e.paused&&l||e.readyState<HTMLMediaElement.HAVE_CURRENT_DATA,suspended:ie()};if(g&&m){g.observe({...n,playing:!e.paused&&!e.ended,frameIndex:t??(!e.paused&&!e.seeking?p:void 0)??Vu(e.currentTime,m)});return}if(c=lu(c,n).open,!c){v(`deferred`),_&&(_.interrupted=!0,_.controller.abort());return}if(_)return;let r={controller:new AbortController,interrupted:!1,timedOut:!1};_=r,v(`loading`);let i=setTimeout(()=>{r.interrupted||(r.timedOut=!0,r.controller.abort())},3e3);oe(r.controller.signal).catch(e=>{s||r.interrupted||re(r.timedOut?`Backdrop manifest exceeded its 3s budget`:ne(e))}).finally(()=>{clearTimeout(i),_===r&&(_=void 0),y()})}let se={dispose:ee,setPreviewActive(e){s||d===e||(d=e,ce())}};v(`deferred`),delete t.dataset.backdropError;let b=a.signal;if(!Bu(e))return re(`Video frame callbacks are unavailable; use the static backdrop.`),se;for(let t of[`progress`,`timeupdate`,`seeking`,`pause`,`loadeddata`])e.addEventListener(t,()=>y(),{signal:b});e.addEventListener(`emptied`,()=>{f=!1,p=void 0,ae(),y()},{signal:b}),e.addEventListener(`waiting`,()=>{l=!0,ae(),y()},{signal:b});for(let t of[`playing`,`seeked`])e.addEventListener(t,()=>{l=!1,y()},{signal:b});function ce(){ie()&&ae(),h?.setSuspended(ie()),y()}o.addEventListener(`visibilitychange`,ce,{signal:b});for(let t of[`enterpictureinpicture`,`webkitbeginfullscreen`])e.addEventListener(t,()=>{u=!0,ce()},{signal:b});let le=()=>{u=bu(e),ce()};for(let t of[`leavepictureinpicture`,`webkitendfullscreen`,`webkitpresentationmodechanged`])e.addEventListener(t,le,{signal:b});return o.addEventListener(`fullscreenchange`,le,{signal:b}),y(),se}function Gu({enabled:e,foreground:t,canvas:n,poster:r,manifestUrl:i}){let a=(0,T.useRef)(null),o=(0,T.useRef)(!1);return(0,T.useEffect)(()=>{if(!e||!t||!n||!r)return;let s=Wu({video:t,canvas:n,poster:r,manifestUrl:i});return a.current=s,s.setPreviewActive(o.current),()=>{a.current=null,s.dispose()}},[e,t,n,r,i]),(0,T.useCallback)(e=>{o.current=e,a.current?.setPreviewActive(e)},[])}function Ku({video:e,foreground:t,range:n,picture:r,backdrop:i,thumbnail:a,onActiveChange:o,network:s}){let c=ce(e).previewManifest;(0,T.useEffect)(()=>{if(!t||!n||!r||!i||!a)return;let l=!1,u;return g(async()=>{let{attachScrubPreview:e}=await import(`./player-scrub-preview.CD3SOKV8.js`);return{attachScrubPreview:e}},__vite__mapDeps([0,1,2,3,4,5])).then(({attachScrubPreview:d})=>{l||(u=d({video:t,range:n,picture:r,backdrop:i,thumbnail:a,manifestUrl:new URL(c,t.ownerDocument.baseURI).href,videoId:e.id,videoVersion:e.version,onActiveChange:o,network:s}))}).catch(e=>{l||(r.dataset.previewError=ne(e))}),()=>{l=!0,u?.()}},[e.id,e.version,c,t,n,r,i,a,o,s])}function qu(e,t){(0,T.useLayoutEffect)(()=>{let n=e.current,r=n?.querySelector(`button`),i=n?.ownerDocument.defaultView;if(!t||!n||!r||!i)return;let a=()=>{let e=r.getBoundingClientRect(),t=Math.max(0,e.top),a=Math.max(0,i.innerHeight-e.bottom),o=a>t;n.dataset.direction=o?`down`:`up`,n.style.setProperty(`--video-volume-available`,`${o?a:t}px`)};return a(),i.addEventListener(`resize`,a),n.ownerDocument.addEventListener(`scroll`,a,!0),()=>{i.removeEventListener(`resize`,a),n.ownerDocument.removeEventListener(`scroll`,a,!0),n.style.removeProperty(`--video-volume-available`),delete n.dataset.direction}},[e,t])}function Ju(e){(0,T.useLayoutEffect)(()=>{let t=e?.closest(`media-control-bar`)?.querySelector(`media-time-display`),n=e?.querySelector(`media-preview-time-display`),r=e?.ownerDocument.defaultView;if(!e||!t||!n||!r)return;let i,a,o=()=>{i=void 0;let e=n.assignedSlot;if(e&&a!==void 0){let t=e.getBoundingClientRect(),r=Math.max(0,(t.width-n.getBoundingClientRect().width)/2),i=Math.max(-r,Math.min(r,a-t.left-t.width/2));n.style.transform=`translateX(${i}px)`}let o=t.getBoundingClientRect(),s=n.getBoundingClientRect(),c=r.getComputedStyle(n).visibility===`visible`&&s.left<o.right+4&&s.right>o.left-4&&s.top<o.bottom+4&&s.bottom>o.top-4;t.toggleAttribute(`data-timecode-overlap`,c)},s=()=>{i===void 0&&(i=r.requestAnimationFrame(o))},c=e=>{a=e.clientX,s()},l=new ResizeObserver(s);l.observe(e),l.observe(t),l.observe(n);let u=new MutationObserver(s);return u.observe(e,{attributes:!0,attributeFilter:[`mediapreviewtime`,`dragging`]}),e.addEventListener(`pointermove`,c),e.addEventListener(`pointerenter`,c),e.addEventListener(`pointerleave`,s),e.addEventListener(`pointercancel`,s),o(),()=>{i!==void 0&&r.cancelAnimationFrame(i),l.disconnect(),u.disconnect(),e.removeEventListener(`pointermove`,c),e.removeEventListener(`pointerenter`,c),e.removeEventListener(`pointerleave`,s),e.removeEventListener(`pointercancel`,s),t.removeAttribute(`data-timecode-overlap`),n.style.removeProperty(`transform`)}},[e])}var $=v();function Yu(e){(0,T.useEffect)(()=>{if(!e)return;let t=new AbortController,n={signal:t.signal},r=()=>e.setAttribute(`data-native-captions`,``),i=()=>e.toggleAttribute(`data-native-captions`,bu(e));for(let t of[`enterpictureinpicture`,`webkitbeginfullscreen`])e.addEventListener(t,r,n);for(let t of[`leavepictureinpicture`,`webkitendfullscreen`,`webkitpresentationmodechanged`])e.addEventListener(t,i,n);return e.ownerDocument.addEventListener(`fullscreenchange`,i,n),i(),()=>{t.abort(),e.removeAttribute(`data-native-captions`)}},[e])}function Xu({media:e}){Yu(e);let t=(0,T.useCallback)(t=>{if(!e)return()=>{};let n=new Set,r=()=>{let r=new Set(e.textTracks);for(let e of n)r.has(e)||(e.removeEventListener(`cuechange`,t),n.delete(e));for(let e of r)n.has(e)||(e.addEventListener(`cuechange`,t),n.add(e));t()};return e.textTracks.addEventListener(`addtrack`,r),e.textTracks.addEventListener(`removetrack`,r),e.textTracks.addEventListener(`change`,t),r(),()=>{e.textTracks.removeEventListener(`addtrack`,r),e.textTracks.removeEventListener(`removetrack`,r),e.textTracks.removeEventListener(`change`,t);for(let e of n)e.removeEventListener(`cuechange`,t)}},[e]),n=(0,T.useCallback)(()=>{let t=e?.querySelector(`track[kind="captions"]`)?.track;return t?.mode===`showing`?Array.from(t.activeCues??[],e=>e instanceof VTTCue?e.getCueAsHTML().textContent??``:``).join(`
`):``},[e]),r=(0,T.useSyncExternalStore)(t,n,()=>``);return(0,$.jsx)(`div`,{slot:`middle-chrome`,ref:e=>e?.setAttribute(`noautohide`,``),"data-video-captions":!0,className:`video-captions`,"aria-hidden":!0,children:r&&(0,$.jsx)(`span`,{children:r})})}function Zu(e){return e===`ArrowLeft`||e===`ArrowDown`?-1:+(e===`ArrowRight`||e===`ArrowUp`)}function Qu({video:e,labels:r,active:o,fullscreenElement:l,onClose:d}){let f=(0,T.useRef)(null),m=(0,T.useRef)(null),h=(0,T.useRef)(!1),[g,v]=(0,T.useState)(null),[te,ne]=(0,T.useState)(null),[x,fe]=(0,T.useState)(null),[pe,me]=(0,T.useState)(null),[S,he]=(0,T.useState)(null),[ge,C]=(0,T.useState)(null),[_e,ve]=(0,T.useState)(null);Ju(_e);let[ye,be]=(0,T.useState)(!1),[xe,Se]=(0,T.useState)(!1),Ce=(0,T.useRef)(null),we=ye||xe;qu(Ce,we);let Te=(0,T.useId)(),Ee=i(),De=ce(e);oe(g);let{error:Oe,failure:ke,previewNetwork:Ae}=b(g,De.master,!0,!0),je=ie(g,ke,f),{setScrubActive:Me}=je,Ne=le(g,e,r.lang,`custom`),Pe=ue(g),{blocked:Fe,retry:E}=y(g,o&&je.autoplay);(0,T.useEffect)(()=>{o||g?.pause()},[o,g]);let Ie=Oe||Fe&&Pe,Le=(0,T.useEffectEvent)(e=>{e.stopPropagation(),Ne.toggle()});(0,T.useEffect)(()=>{let e=f.current;return e?.addEventListener(w.MEDIA_TOGGLE_SUBTITLES_REQUEST,Le,!0),()=>e?.removeEventListener(w.MEDIA_TOGGLE_SUBTITLES_REQUEST,Le,!0)},[g]);let Re=Gu({enabled:Ee===!1,foreground:g,canvas:te,poster:x,manifestUrl:De.backdropManifest});return Ku({video:e,foreground:g,range:_e,picture:pe,backdrop:S,thumbnail:ge,onActiveChange:(0,T.useCallback)(e=>{Me(e),Re(e)},[Me,Re]),network:Ae}),(0,T.useEffect)(()=>{Ie?m.current?.focus():h.current&&f.current?.focus(),h.current=Ie},[Ie]),(0,T.useEffect)(()=>()=>{g&&de(g,l)},[g,l]),(0,$.jsxs)(`div`,{tabIndex:-1,className:`video-viewport relative flex size-full min-w-0 items-center justify-center overflow-clip bg-video-background p-4 mobile:p-12`,onPointerDown:e=>{e.button===0&&e.target===e.currentTarget&&d()},children:[(0,$.jsxs)(`div`,{className:`group/backdrops contents`,"aria-hidden":!0,children:[(0,$.jsx)(`img`,{ref:fe,src:De.poster,alt:``,className:`pointer-events-none absolute inset-0 size-full scale-110 object-cover opacity-60 blur-3xl group-has-[canvas[data-scrub-backdrop]:not([hidden])]/backdrops:invisible`}),(0,$.jsx)(`canvas`,{ref:ne,hidden:!0,"aria-hidden":!0,"data-video-backdrop":!0,className:`pointer-events-none absolute inset-0 size-full scale-110 object-cover opacity-60 group-has-[canvas[data-scrub-backdrop]:not([hidden])]/backdrops:invisible`}),(0,$.jsx)(`canvas`,{ref:he,hidden:!0,"aria-hidden":!0,"data-scrub-backdrop":!0,className:`pointer-events-none absolute inset-0 size-full scale-110 object-cover opacity-60`})]}),(0,$.jsx)(`div`,{className:`pointer-events-none absolute inset-0 bg-linear-to-b from-video-background/40 via-transparent to-video-background/40`}),(0,$.jsxs)(Eu,{ref:e=>{f.current=e,e&&l&&(e.fullscreenElement=l)},lang:r.lang,noMutedPref:!0,noVolumePref:!0,noSubtitlesLangPref:!0,tabIndex:0,noHotkeys:Ie,gesturesDisabled:Ie,noAutohide:Ie,autohide:`3`,autohideOverControls:!0,"aria-label":r.title,className:`video-player relative aspect-video w-full min-w-0 max-w-[min(1600px,calc((100dvh-6rem)*16/9))] overflow-clip rounded-16 mobile:rounded-72`,children:[(0,$.jsx)(`video`,{ref:v,slot:`media`,crossOrigin:`anonymous`,poster:De.poster,playsInline:!0,preload:`metadata`,"aria-label":r.title,className:`size-full object-contain leading-normal`,children:Ne.caption&&(0,$.jsx)(ae,{caption:Ne.caption,defaultEnabled:Ne.defaultEnabled,onReady:Ne.ready,onLoad:Ne.loaded,onError:()=>{let e=f.current;e?.querySelector(`media-captions-button`)?.contains(e.ownerDocument.activeElement)&&e.focus(),Ne.failedTrack()}},Ne.key)},je.attempt),(0,$.jsx)(`canvas`,{ref:me,slot:`middle-chrome`,hidden:!0,"aria-hidden":!0,"data-scrub-preview":!0,className:`pointer-events-none! absolute inset-0 size-full object-contain`}),(0,$.jsx)(Xu,{media:g}),(0,$.jsx)(re,{slot:`top-chrome`,onClick:d,onKeyDownCapture:e=>{e.key===` `&&e.stopPropagation()},onKeyUpCapture:e=>{e.key===` `&&e.stopPropagation()},label:r.close,variant:`tertiary`,size:`icon-md`,className:ee(`video-glass absolute top-4 right-4 z-20 size-11 text-video-foreground mobile:top-6 mobile:right-6`,!Ie&&`video-chrome`),children:(0,$.jsx)(n,{size:20,"aria-hidden":!0})}),!Ie&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(Au,{slot:`centered-chrome`,className:`video-chrome video-play-toggle`,children:[(0,$.jsx)(`span`,{slot:`play`,children:(0,$.jsx)(a,{size:20,"aria-hidden":!0})}),(0,$.jsx)(`span`,{slot:`pause`,children:(0,$.jsx)(p,{size:20,"aria-hidden":!0})})]}),(0,$.jsx)(ku,{slot:`centered-chrome`,noAutohide:!0,className:`pointer-events-none absolute translate-y-12`,"aria-label":r.loading}),(0,$.jsxs)(Ou,{className:`video-chrome pointer-events-none! absolute inset-x-4 bottom-4 flex-col gap-1 mobile:inset-x-8 mobile:bottom-8`,children:[(0,$.jsxs)(`div`,{className:`flex w-full flex-wrap items-center justify-between gap-2`,children:[(0,$.jsx)(Mu,{showDuration:!0,noToggle:!0,className:`video-timecode shrink-0 rounded-8 whitespace-nowrap tabular-nums`,"aria-label":r.elapsed}),(0,$.jsxs)(`div`,{className:`flex min-w-0 items-center gap-2`,children:[Ne.caption&&!Ne.failed&&(0,$.jsxs)(Du,{ref:e=>{e&&(e.setAttribute(`role`,`switch`),e.setAttribute(`aria-label`,r.captions))},className:`video-glass pointer-events-auto size-11 shrink-0 rounded-full`,children:[(0,$.jsx)(`span`,{slot:`off`,children:(0,$.jsx)(t,{size:20,"aria-hidden":!0})}),(0,$.jsx)(`span`,{slot:`on`,children:(0,$.jsx)(u,{size:20,"aria-hidden":!0})})]}),(0,$.jsx)(`div`,{className:`relative size-11 shrink-0`,children:(0,$.jsxs)(`div`,{ref:Ce,className:`video-volume video-glass pointer-events-auto absolute right-0 bottom-0 w-11 rounded-full`,"data-open":we,onPointerEnter:e=>{e.pointerType===`mouse`&&Se(!0)},onPointerLeave:e=>{e.pointerType===`mouse`&&(Se(!1),be(!1))},onFocus:()=>be(!0),onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||be(!1)},children:[(0,$.jsxs)(_,{"aria-label":r.volume,"aria-expanded":we,"aria-controls":Te,onClick:()=>{g&&(g.muted=!g.muted)},onKeyDownCapture:e=>{e.key===` `&&e.stopPropagation()},onKeyUpCapture:e=>{e.key===` `&&e.stopPropagation()},variant:`tertiary`,size:`icon-md`,className:`video-volume-toggle absolute right-0 bottom-0 text-video-foreground hover:bg-transparent active:text-video-foreground`,children:[(0,$.jsx)(s,{className:`video-volume-off`,size:20,"aria-hidden":!0}),(0,$.jsx)(c,{className:`video-volume-on`,size:20,"aria-hidden":!0})]}),(0,$.jsx)(Pu,{ref:e=>{e?.range?.setAttribute(`aria-orientation`,`vertical`)},id:Te,inert:!we,"aria-hidden":!we,"aria-label":r.volume,onKeyDownCapture:e=>{let t=Zu(e.key);if(!g||!t)return;e.preventDefault(),e.stopPropagation();let n=g.muted?0:g.volume;g.volume=Math.max(0,Math.min(1,n+t*.05)),g.muted=g.volume===0}})]})})]})]}),(0,$.jsxs)(Nu,{ref:ve,className:`w-full! min-w-0`,"aria-label":r.seek,onPointerDown:e=>{e.button===0&&!e.currentTarget.hasAttribute(`disabled`)&&e.currentTarget.setAttribute(`dragging`,``)},onPointerCancel:e=>e.currentTarget.removeAttribute(`dragging`),onPointerMove:e=>{let t=e.currentTarget,n=t.getBoundingClientRect().left+t.clientLeft+Number.parseFloat(getComputedStyle(t).paddingLeft);t.style.setProperty(`--video-hover-position`,`${e.clientX-n}px`)},onKeyDownCapture:e=>{let t=Zu(e.key);if(!g||!Number.isFinite(g.duration)||!t)return;e.preventDefault(),e.stopPropagation();let n=pe?.hidden===!1,r=n?e.currentTarget.mediaCurrentTime??g.currentTime:g.currentTime,i=Math.max(0,Math.min(g.duration,r+t*5));n?e.currentTarget.dispatchEvent(new CustomEvent(w.MEDIA_SEEK_REQUEST,{bubbles:!0,composed:!0,detail:i})):g.currentTime=i},children:[(0,$.jsx)(`canvas`,{ref:C,slot:`preview`,hidden:!0,"aria-hidden":!0,width:160,height:90,"data-hover-thumbnail":!0,className:`pointer-events-none mb-1 aspect-video w-40 rounded-8 bg-video-background`}),(0,$.jsx)(ju,{slot:`preview`,"aria-hidden":`true`,className:`video-timecode pointer-events-none rounded-8 whitespace-nowrap tabular-nums`})]})]})]})]}),Ne.failed&&(0,$.jsx)(se,{labels:r,onRetry:()=>{Ne.retry(),f.current?.focus()}}),Ie&&(0,$.jsxs)(`div`,{className:`pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-video-background/80 p-6 text-center leading-normal text-video-foreground`,children:[Oe&&(0,$.jsx)(`p`,{role:`alert`,className:`max-w-md`,children:r.error}),(0,$.jsxs)(_,{ref:m,onClick:()=>{Oe?je.retry():E()},"aria-label":Oe?r.retry:r.play,variant:`secondary`,className:`video-recovery pointer-events-auto bg-video-foreground text-video-background hover:bg-video-foreground/90 active:bg-video-foreground`,children:[(0,$.jsx)(a,{"aria-hidden":!0}),Oe?r.retry:r.play]})]})]})}export{Qu as VideoPlayer,Yl as a,U as c,lu as i,Tr as l,vu as n,Oa as o,_u as r,G as s,bu as t,Ce as u};