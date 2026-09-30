import{i as e}from"./rolldown-runtime.Dd_uD5pT.js";import{Yn as t,qn as n,vr as r}from"./ui-primitives.gbQ-GTd_-d7ac3161.js";import{h as i,n as a,r as o,t as s}from"./Plane.DX6e4G0f.js";import{n as c,t as l}from"./Canvas.Bc0Ij3dZ-d7ac3161.js";import{n as u,r as d,t as f}from"./federal-orbit-static.BHD6qj0E-d7ac3161.js";var p=e(t(),1),m=`attribute vec3 position;
attribute vec2 uv;
uniform vec4 uBounds;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(uBounds.xy + position.xy * uBounds.zw, 0.0, 1.0);
}
`,h=`precision highp float;
uniform sampler2D uTexture;
uniform vec2 uTint;
varying vec2 vUv;

void main() {
  vec4 color = texture2D(uTexture, vUv);
  gl_FragColor = vec4(color.rgb * uTint.x, color.a * uTint.y);
}
`,g=n();function _({angle:e,onReady:t}){let{gl:n,renderer:r,scene:l,size:u}=c(),g=(0,p.useRef)(null),[_,v]=(0,p.useState)(null);if((0,p.useEffect)(()=>{let c=!1,u=!1,p=new s(n),_=new a(n,{generateMipmaps:!1,minFilter:n.LINEAR}),y={uBounds:{value:new Float32Array(4)},uTint:{value:new Float32Array(2)},uTexture:{value:_}},b=new i(n,{vertex:m,fragment:h,uniforms:y,transparent:!0,depthTest:!1,depthWrite:!1,cullFace:!1});b.setBlendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);let x=new Map,S=[],C=e=>{c||u||(u=!0,v(Error(`Impossible d’afficher l’animation des sites publics.`,{cause:e})))},w=()=>{if(!(c||u||S.length===0))try{let t=e.get();S.forEach(({site:e,mesh:n,bounds:r,tint:i},a)=>{let o=d(e,t);r.set([o.x*2-1,1-o.y*2,o.width*2,o.height*2]),i.set([o.brightness,o.opacity]),n.renderOrder=o.order*f.length+a}),r.render({scene:l})}catch(e){C(e)}},T=()=>C(Error(`Federal website orbit WebGL context was lost.`));n.canvas.addEventListener(`webglcontextlost`,T),g.current=w;let E=e.on(`change`,w);for(let{src:e}of f){if(x.has(e))continue;let t=new Image;t.src=e,x.set(e,{image:t,texture:new a(n,{minFilter:n.LINEAR_MIPMAP_LINEAR})})}return Promise.all(Array.from(x.values(),({image:e})=>e.decode())).then(()=>{if(!(c||u)){for(let e of f){let t=x.get(e.src);if(!t)throw Error(`Missing federal orbit texture: ${e.id}`);t.texture.image=t.image;let r=new Float32Array(4),i=new Float32Array(2),a=new o(n,{geometry:p,program:b,frustumCulled:!1});a.onBeforeRender(()=>{y.uBounds.value=r,y.uTint.value=i,y.uTexture.value=t.texture}),a.setParent(l),S.push({site:e,mesh:a,bounds:r,tint:i})}w(),u||t()}}).catch(C),()=>{c=!0,g.current=null,E(),n.canvas.removeEventListener(`webglcontextlost`,T);for(let{mesh:e}of S)e.setParent(null);for(let{image:e,texture:t}of x.values())e.src=``,n.deleteTexture(t.texture);p.remove(),n.deleteTexture(_.texture),n.deleteShader(b.vertexShader),n.deleteShader(b.fragmentShader),b.remove()}},[e,n,r,l,t]),(0,p.useEffect)(()=>g.current?.(),[u.width,u.height]),_)throw _;return null}function v({angle:e}){let[t,n]=(0,p.useState)(!1),i=(0,p.useCallback)(()=>n(!0),[]);return(0,g.jsxs)(g.Fragment,{children:[!t&&(0,g.jsx)(u,{}),(0,g.jsx)(`div`,{className:r(`absolute inset-0`,!t&&`invisible`),children:(0,g.jsx)(l,{dpr:[1,2],frameloop:`never`,renderer:{alpha:!0,premultipliedAlpha:!0},onCreated:({gl:e})=>e.clearColor(0,0,0,0),children:(0,g.jsx)(_,{angle:e,onReady:i})})})]})}export{v as FederalOrbitCanvas};