import{i as e}from"./rolldown-runtime.Dd_uD5pT.js";import{Yn as t,qn as n}from"./ui-primitives.gbQ-GTd_-d7ac3161.js";import{t as r}from"./responsive-image.BSKZ1JVh-d7ac3161.js";import{PrivacyAnimation as i}from"./privacy-animation.ComU_rp1-d7ac3161.js";import{n as a,t as o}from"./Canvas.Bc0Ij3dZ-d7ac3161.js";import{t as s}from"./privacy.vert.CLyVY58L.js";var c=e(t(),1),l=`data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20overflow='visible'%20style='display:%20block;'%20width='65.1163'%20height='65.1163'%20viewBox='0%200%2065.1163%2065.1163'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Arrow%20Up'%3e%3cpath%20id='Vector'%20d='M9.76744%2032.5581L14.3581%2037.1488L29.3023%2022.2372V55.3488H35.814V22.2372L50.7581%2037.1488L55.3488%2032.5581L32.5581%209.76744L9.76744%2032.5581Z'%20fill='%23F3F3F3'/%3e%3c/g%3e%3c/svg%3e`,u={sources:{webp:`/bonjour-france/_astro/orb.Ch2tS8dm.webp 32w, /bonjour-france/_astro/orb.BDl03C9R.webp 64w, /bonjour-france/_astro/orb.vAS0hWwX.webp 128w, /bonjour-france/_astro/orb.BStO7voz.webp 256w, /bonjour-france/_astro/orb.DTPvbMi6.webp 384w, /bonjour-france/_astro/orb.DAHYYguJ.webp 640w, /bonjour-france/_astro/orb.BSzxCIG-.webp 960w, /bonjour-france/_astro/orb.DfpwI60b.webp 1024w`},img:{src:`/bonjour-france/_astro/orb.DfpwI60b.webp`,w:1024,h:936}},d=`precision highp float;
uniform float uTime;
varying vec2 vUv;

vec3 cubic(vec3 a, vec3 b, vec3 c, vec3 d, float t) {
  return b + 0.5 * t * (c - a + t * (2.0 * a - 5.0 * b + 4.0 * c - d + t * (3.0 * (b - c) + d - a)));
}

vec3 ramp(float x, vec3 a, vec3 b, vec3 c, vec3 d, vec3 e, vec3 f) {
  float t = clamp(x, 0.0, 1.0) * 5.0;
  if (t < 1.0) return cubic(a, a, b, c, t);
  if (t < 2.0) return cubic(a, b, c, d, t - 1.0);
  if (t < 3.0) return cubic(b, c, d, e, t - 2.0);
  if (t < 4.0) return cubic(c, d, e, f, t - 3.0);
  return cubic(d, e, f, f, t - 4.0);
}

float field(vec2 p, vec2 center) {
  return 0.08 / (dot(p - center, p - center) + 0.08);
}

void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y);
  float t = uTime;
  // Local swelling bends the reference bands without rotating or reordering them.
  float swell = field(p, vec2(0.3 + 0.16 * sin(t * 0.39), 0.7))
    - field(p, vec2(0.72, 0.35 + 0.16 * sin(t * 0.34)));
  p += vec2(0.12 * sin(t * 0.36), 0.11 * sin(t * 0.46)) * swell;
  // Color control points sampled from Figma 3768:57252, with its square cover crop.
  vec3 row0 = ramp(p.x, vec3(0.00000, 0.02745, 0.04314), vec3(0.01176, 0.13725, 0.25882), vec3(0.00784, 0.25882, 0.52941), vec3(0.06275, 0.40392, 0.80784), vec3(0.08235, 0.43529, 0.86275), vec3(0.00000, 0.00784, 0.01176));
  vec3 row1 = ramp(p.x, vec3(0.00784, 0.12157, 0.23137), vec3(0.01176, 0.24314, 0.52941), vec3(0.14118, 0.49412, 0.95294), vec3(0.24706, 0.57647, 0.99608), vec3(0.29020, 0.60392, 0.99216), vec3(0.13333, 0.45882, 0.86275));
  vec3 row2 = ramp(p.x, vec3(0.01176, 0.29020, 0.60392), vec3(0.16863, 0.51765, 0.96863), vec3(0.35294, 0.65098, 0.99608), vec3(0.49804, 0.72157, 1.00000), vec3(0.61569, 0.76471, 0.99608), vec3(0.41176, 0.65882, 0.98824));
  vec3 row3 = ramp(p.x, vec3(0.25490, 0.56078, 0.97647), vec3(0.53725, 0.72549, 0.99608), vec3(0.59216, 0.74118, 0.99608), vec3(0.66667, 0.74902, 0.99608), vec3(0.70980, 0.72941, 0.96863), vec3(0.45098, 0.59216, 0.87451));
  vec3 row4 = ramp(p.x, vec3(0.54510, 0.64314, 0.98824), vec3(0.83137, 0.75294, 0.97255), vec3(0.67059, 0.74902, 0.98824), vec3(0.46667, 0.65490, 0.97647), vec3(0.22745, 0.41961, 0.71373), vec3(0.04314, 0.28627, 0.53725));
  vec3 row5 = ramp(p.x, vec3(0.01569, 0.01569, 0.02353), vec3(0.57647, 0.74118, 0.98039), vec3(0.36863, 0.65882, 0.94118), vec3(0.13725, 0.45882, 0.76471), vec3(0.01176, 0.25490, 0.49020), vec3(0.00784, 0.01961, 0.02745));
  vec3 color = ramp(p.y, row0, row1, row2, row3, row4, row5);
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  gl_FragColor = vec4(clamp(color + (grain - 0.5) / 255.0, 0.0, 1.0), 1.0);
}
`,f=n();function p({playing:e}){let{gl:t,renderer:n,scene:r,camera:i,size:o}=a(),l=(0,c.useRef)(null),u=(0,c.useRef)(0),[p,m]=(0,c.useState)(null);if((0,c.useEffect)(()=>{let a=l.current;if(!a)return;let o=0,s=0,c=!1,d=e=>{c=!0,cancelAnimationFrame(o),m(Error(`Failed to render the privacy orb.`,{cause:e}))},f=t=>{if(!c){e&&s&&(u.current+=Math.min((t-s)/1e3,.05)),s=t;try{a.program.uniforms.uTime.value=u.current,n.render({scene:r,camera:i}),e&&(o=requestAnimationFrame(f))}catch(e){d(e)}}},p=()=>d(Error(`Privacy orb WebGL context was lost.`));return t.canvas.addEventListener(`webglcontextlost`,p),o=requestAnimationFrame(f),()=>{cancelAnimationFrame(o),t.canvas.removeEventListener(`webglcontextlost`,p)}},[t,n,r,i,o.width,o.height,e]),(0,c.useEffect)(()=>{let e=l.current;if(!e)return;let{geometry:n,program:r}=e;return()=>{n.remove(),t.deleteShader(r.vertexShader),t.deleteShader(r.fragmentShader),r.remove()}},[t]),p)throw p;return(0,f.jsxs)(`mesh`,{ref:l,frustumCulled:!1,children:[(0,f.jsx)(`triangle`,{}),(0,f.jsx)(`program`,{vertex:s,fragment:d,depthTest:!1,depthWrite:!1,uniforms:{uTime:u.current}})]})}function m({animated:e=!1,playing:t=!1,animateArrow:n=!0}){let i=(0,c.useId)();return(0,f.jsxs)(`div`,{className:`pointer-events-none absolute top-1/2 left-1/2 isolate aspect-square h-full -translate-x-1/2 -translate-y-1/2`,children:[(0,f.jsx)(`svg`,{viewBox:`0 0 453 453`,"aria-hidden":`true`,className:`absolute inset-0 size-full`,children:(0,f.jsx)(`path`,{fill:`var(--color-surface-muted)`,d:`M0 0h453v453H0z`})}),(0,f.jsxs)(`div`,{className:e&&n?`privacy-account-click absolute inset-0`:`absolute inset-0`,children:[(0,f.jsxs)(`svg`,{viewBox:`0 0 453 453`,"aria-hidden":`true`,className:`absolute inset-0 size-full`,children:[(0,f.jsxs)(`defs`,{children:[(0,f.jsx)(`clipPath`,{id:`${i}-clip`,children:(0,f.jsx)(`circle`,{cx:`226.5`,cy:`226.5`,r:`90`})}),(0,f.jsx)(`filter`,{id:i,x:`-100%`,y:`-100%`,width:`300%`,height:`300%`,children:(0,f.jsx)(`feDropShadow`,{dx:`0`,dy:`32.558`,stdDeviation:`32.558`,floodColor:`#010e24`,floodOpacity:`.08`})})]}),(0,f.jsx)(`circle`,{cx:`226.5`,cy:`226.5`,r:`90`,fill:`var(--color-surface-muted)`,filter:`url(#${i})`}),(0,f.jsx)(`foreignObject`,{x:`136.5`,y:`136.5`,width:`180`,height:`180`,clipPath:`url(#${i}-clip)`,children:(0,f.jsx)(r,{image:u,alt:``,className:`size-full object-cover`})})]}),e?(0,f.jsx)(`div`,{className:`pointer-events-none absolute top-[30.13245%] left-[30.13245%] size-[39.7351%] overflow-hidden rounded-full`,children:(0,f.jsx)(o,{"aria-hidden":`true`,className:`size-full`,dpr:[1,2],frameloop:`never`,renderer:{alpha:!0},children:(0,f.jsx)(p,{playing:t})})}):null,(0,f.jsx)(`svg`,{viewBox:`0 0 453 453`,"aria-hidden":`true`,className:`pointer-events-none absolute inset-0 z-10 size-full`,children:(0,f.jsx)(`g`,{clipPath:`url(#${i}-clip)`,children:(0,f.jsx)(`g`,{className:e&&n?`privacy-account-arrow`:void 0,children:(0,f.jsx)(`image`,{href:l,x:`193.942`,y:`193.942`,width:`65.116`,height:`65.116`,transform:`rotate(90 226.5 226.5)`})})})})]})]})}function h({className:e,animateArrow:t=!0}){return(0,f.jsx)(i,{label:`privacy-account`,showPlaybackControl:!1,className:e,render:e=>(0,f.jsx)(m,{animated:!0,playing:e,animateArrow:t}),children:(0,f.jsx)(m,{})})}export{h as t};