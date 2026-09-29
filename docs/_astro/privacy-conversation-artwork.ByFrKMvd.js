import{i as e}from"./rolldown-runtime.Dd_uD5pT.js";import{Yn as t,qn as n}from"./ui-primitives.gbQ-GTd_.js";import{t as r}from"./responsive-image.BSKZ1JVh.js";import{PrivacyAnimation as i}from"./privacy-animation.ComU_rp1.js";import{n as a}from"./Plane.DX6e4G0f.js";import{n as o,t as s}from"./Canvas.Bc0Ij3dZ.js";import{t as c}from"./privacy.vert.CLyVY58L.js";var l=e(t(),1),u={sources:{webp:`/bonjour-france/_astro/particles.D8uMiVkM.webp 32w, /bonjour-france/_astro/particles.DXcGaTxt.webp 64w, /bonjour-france/_astro/particles.CDjnJTJl.webp 128w, /bonjour-france/_astro/particles.7iqPNfw9.webp 256w, /bonjour-france/_astro/particles.BS---Q6q.webp 384w, /bonjour-france/_astro/particles.CbM0zDa3.webp 640w, /bonjour-france/_astro/particles.XpJTuM-1.webp 960w, /bonjour-france/_astro/particles.sGGeFJRD.webp 1024w`},img:{src:`/bonjour-france/_astro/particles.sGGeFJRD.webp`,w:1024,h:562}},d=`uniform sampler2D uMessages;
uniform float uTime;
varying vec2 vUv;

vec4 message(vec2 p) {
  // Inverse warp keeps the pill aligned with the outgoing particles.
  p.x = conversationSourceX(p.x, p.y);
  p.y -= conversationBend(p.x, p.y);
  float y = mod(p.y + 34.0 - uTime * 20.0, CONVERSATION_PERIOD);
  return texture2D(uMessages, vec2(p.x / 453.0, 1.0 - y / CONVERSATION_PERIOD));
}

void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * 453.0;
  vec3 color = vec3(1.0 / 255.0);
  if (p.y < 226.0) {
    float dissolve = conversationPull(p.y);
    vec4 bubble = message(p);
    // Blur only the last strip before the physical shredding edge.
    if (dissolve > 0.0) {
      bubble = vec4(0.0);
      float weightSum = 0.0;
      for (int x = -4; x <= 4; x++) {
        for (int y = -4; y <= 4; y++) {
          vec2 offset = vec2(float(x), float(y));
          float weight = exp(-dot(offset, offset) * 0.125);
          bubble += message(p + offset * dissolve * 2.5) * weight;
          weightSum += weight;
        }
      }
      bubble /= weightSum;
    }
    color = mix(color, bubble.rgb, bubble.a);
  }
  gl_FragColor = vec4(color, 1.0);
}
`,f=`attribute vec3 position;
uniform sampler2D uMessages;
uniform float uTime;
uniform float uScale;
varying float vAlpha;
varying float vSeed;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 source = position.xy;
  float seed = hash(source);
  float time = floor(uTime * 12.0) / 12.0;
  float crossingY = CONVERSATION_CENTER - conversationBend(source.x, CONVERSATION_CENTER);
  float age = mod(time - (crossingY - (source.y - 34.0)) / 20.0 - seed * 0.1, CONVERSATION_PERIOD / 20.0);
  vec4 ink = texture2D(uMessages, vec2(source.x / 453.0, 1.0 - source.y / CONVERSATION_PERIOD));
  float speed = 5.0 + hash(source + 31.0) * 20.0;
  float gravity = 0.5 + hash(source + 17.0) * 7.0;
  float y = 227.5 + speed * age + gravity * age * age;
  float x = conversationDisplayX(source.x, CONVERSATION_CENTER)
    + (hash(source.yx) - 0.5) * age * 13.0;
  // Keep the falling shreds aligned to a six-pixel lattice.
  x = floor(x / 6.0) * 6.0 + 3.0;
  y = floor((y - 227.0) / 6.0) * 6.0 + 230.0;
  float fade = 1.0 - smoothstep(245.0, 445.0, y);
  vAlpha = ink.a * smoothstep(0.1, 0.8, ink.r) * fade * (0.35 + seed * 0.6);
  vAlpha *= step(0.88, seed) * (1.0 - smoothstep(7.0, 10.0, age));
  vSeed = seed;
  gl_Position = vec4(x / 453.0 * 2.0 - 1.0, 1.0 - y / 453.0 * 2.0, 0.0, 1.0);
  gl_PointSize = (1.0 + floor(hash(source + 8.0) * 2.0)) * 6.0 * uScale;
}
`,p=`precision highp float;
varying float vAlpha;
varying float vSeed;

void main() {
  vec2 p = (floor(gl_PointCoord * 6.0) + 0.5) / 6.0;
  float height = (1.0 + floor(fract(vSeed * 71.0) * 3.0)) / 6.0;
  float mask = step(abs(p.y - 0.5), height * 0.5);
  // Offset phosphor channels turn each shred into a tiny CRT pixel cluster.
  vec3 phosphor = vec3(
    exp(-pow((p.x - 0.23) * 5.0, 2.0)),
    exp(-pow((p.x - 0.50) * 5.0, 2.0)),
    exp(-pow((p.x - 0.77) * 5.0, 2.0))
  );
  float scanline = mix(0.65, 1.0, mod(floor(p.y * 6.0), 2.0));
  float core = exp(-pow((p.x - 0.5) * 5.0, 2.0));
  vec3 tint = mix(vec3(1.0, 0.86, 0.93), vec3(0.88, 0.86, 1.0), fract(vSeed * 43.0));
  vec3 color = phosphor * vec3(0.38, 0.26, 0.42) + core * tint * 0.65;
  gl_FragColor = vec4(color * scanline, mask * vAlpha);
}
`,m=`precision highp float;

const float CONVERSATION_CENTER = 226.5;

float conversationPull(float y) {
  float approach = smoothstep(CONVERSATION_CENTER - 16.0, CONVERSATION_CENTER, y);
  return approach * approach;
}

float conversationDisplayX(float sourceX, float y) {
  float offset = sourceX - CONVERSATION_CENTER;
  return sourceX + clamp(offset / 32.0, -1.0, 1.0) * 4.0 * conversationPull(y);
}

float conversationSourceX(float displayX, float y) {
  float offset = displayX - CONVERSATION_CENTER;
  float expansion = 4.0 * conversationPull(y);
  float sourceOffset = abs(offset) < 32.0 + expansion
    ? offset / (1.0 + expansion / 32.0)
    : offset - sign(offset) * expansion;
  return CONVERSATION_CENTER + sourceOffset;
}

float conversationBend(float sourceX, float y) {
  float edge = clamp(abs(sourceX - CONVERSATION_CENTER) / CONVERSATION_CENTER, 0.0, 1.0);
  return conversationPull(y) * 1.5 * (1.0 - edge * edge);
}
`,h=n(),g=[`Je suis ancien militaire. À quelles aides ai-je droit ?`,`Je ne retrouve pas la carte Vitale de mon enfant !`,`Comment changer de nom d’usage ?`,`Aidez-moi à changer d’adresse`,`Aidez-moi à trouver un nouvel emploi`,`Il me faut un passeport en urgence !`,`Je pars à la retraite, que dois-je faire ?`],_=24,v=g.length*112,y=`#define CONVERSATION_PERIOD ${v}.0\n`,b=y+m+d,x=y+m+f,S=Float32Array.from(g.flatMap((e,t)=>Array.from({length:3624},(e,n)=>[n%151*3+1.5,t*112+Math.floor(n/151)*3+1.5,0]).flat()));function C({playing:e}){let{gl:t,renderer:n,scene:r,camera:i,size:s}=o(),u=(0,l.useMemo)(()=>({size:3,data:S}),[t]),d=(0,l.useRef)(null),f=(0,l.useRef)(null),m=(0,l.useRef)(0),[_,y]=(0,l.useState)(null),[C,w]=(0,l.useState)(null);if((0,l.useEffect)(()=>{let e=!1,n=document.createElement(`canvas`);n.width=906,n.height=v*2;let r=n.getContext(`2d`);if(!r)throw Error(`Failed to create the conversation message atlas.`);let i=new a(t,{generateMipmaps:!1,minFilter:t.LINEAR});return document.fonts.load(`19.94px "InterVariable"`).then(()=>{if(e)return;r.scale(2,2),r.font=`19.94px "InterVariable", sans-serif`,r.letterSpacing=`-0.1994px`,r.textAlign=`center`,r.textBaseline=`middle`;let a=getComputedStyle(t.canvas),o=a.getPropertyValue(`--color-background-primary`),s=a.getPropertyValue(`--color-text-primary`);for(let[e,t]of g.entries()){let n=e*112,i=r.measureText(t).width+48;r.fillStyle=o,r.globalAlpha=.95,r.beginPath(),r.roundRect((453-i)/2,n,i,71.85,36),r.fill(),r.globalAlpha=1,r.fillStyle=s,r.fillText(t,226.5,n+35.925)}i.image=n,y(i)}).catch(t=>{e||w(Error(`Failed to load conversation typography.`,{cause:t}))}),()=>{e=!0,t.deleteTexture(i.texture)}},[t]),(0,l.useEffect)(()=>{let a=d.current,o=f.current;if(!_||!a||!o)return;let s=0,c=0,l=!1,u=e=>{l=!0,cancelAnimationFrame(s),w(Error(`Failed to render the conversation artwork.`,{cause:e}))},p=d=>{if(!l){e&&c&&(m.current+=Math.min((d-c)/1e3,.05)),c=d;try{a.program.uniforms.uTime.value=m.current,o.program.uniforms.uTime.value=m.current,o.program.uniforms.uScale.value=t.canvas.width/453,n.render({scene:r,camera:i}),e&&(s=requestAnimationFrame(p))}catch(e){u(e)}}},h=()=>u(Error(`Conversation WebGL context was lost.`));return t.canvas.addEventListener(`webglcontextlost`,h),s=requestAnimationFrame(p),()=>{cancelAnimationFrame(s),t.canvas.removeEventListener(`webglcontextlost`,h)}},[t,n,r,i,_,e,s.width,s.height]),(0,l.useEffect)(()=>{let e=[d.current,f.current];return()=>{for(let n of e)n?.geometry.remove(),n&&(t.deleteShader(n.program.vertexShader),t.deleteShader(n.program.fragmentShader),n.program.remove())}},[t,_]),C)throw C;return _?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(`mesh`,{ref:d,frustumCulled:!1,children:[(0,h.jsx)(`triangle`,{}),(0,h.jsx)(`program`,{vertex:c,fragment:b,depthTest:!1,depthWrite:!1,uniforms:{uMessages:_,uTime:m.current}})]}),(0,h.jsxs)(`mesh`,{ref:f,mode:t.POINTS,frustumCulled:!1,renderOrder:1,children:[(0,h.jsx)(`geometry`,{position:u}),(0,h.jsx)(`program`,{vertex:x,fragment:p,transparent:!0,depthTest:!1,depthWrite:!1,blendFunc:{src:t.SRC_ALPHA,dst:t.ONE,srcAlpha:t.ONE,dstAlpha:t.ONE_MINUS_SRC_ALPHA},uniforms:{uMessages:_,uTime:m.current,uScale:t.canvas.width/453}})]})]}):null}function w(){return(0,h.jsxs)(`svg`,{viewBox:`0 0 453 453`,"aria-hidden":`true`,className:`absolute inset-0 size-full`,children:[(0,h.jsxs)(`defs`,{children:[(0,h.jsx)(`filter`,{id:`conversation-blur`,children:(0,h.jsx)(`feGaussianBlur`,{stdDeviation:`4.985`})}),(0,h.jsx)(`clipPath`,{id:`conversation-messages`,children:(0,h.jsx)(`path`,{d:`M0 0h453v226H0z`})}),(0,h.jsxs)(`linearGradient`,{id:`conversation-fade`,x2:`0`,y2:`1`,children:[(0,h.jsx)(`stop`,{stopColor:`#010101`,stopOpacity:`0`}),(0,h.jsx)(`stop`,{offset:`1`,stopColor:`#010101`})]})]}),(0,h.jsx)(`foreignObject`,{x:`-8.747`,y:`227`,width:`490.519`,height:`269.008`,children:(0,h.jsx)(r,{image:u,alt:``,className:`size-full object-fill`})}),(0,h.jsx)(`path`,{fill:`url(#conversation-fade)`,d:`M0 227h453v226H0z`}),(0,h.jsx)(`g`,{clipPath:`url(#conversation-messages)`,className:`font-inter`,children:g.slice(0,3).map((e,t)=>(0,h.jsx)(`foreignObject`,{y:t*112-34,width:`453`,height:`71.85`,filter:t===2?`url(#conversation-blur)`:void 0,children:(0,h.jsx)(`div`,{className:`mx-auto flex h-full w-fit items-center rounded-full bg-background-primary/95 whitespace-nowrap text-primary`,style:{paddingInline:_,fontSize:19.94,letterSpacing:-.1994},children:e})},e))})]})}function T(){return(0,h.jsx)(i,{label:`privacy-conversation`,render:e=>(0,h.jsx)(s,{"aria-hidden":`true`,className:`pointer-events-none inset-0`,style:{position:`absolute`},dpr:[1,2],frameloop:`never`,renderer:{alpha:!0},children:(0,h.jsx)(C,{playing:e})}),children:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(w,{}),(0,h.jsx)(`svg`,{viewBox:`0 0 453 453`,"aria-hidden":`true`,className:`pointer-events-none absolute inset-0 z-10 size-full`,children:(0,h.jsx)(`path`,{d:`M26.5 226.5h400`,stroke:`#4b4b4b`})})]})})}export{T as PrivacyConversationArtwork};