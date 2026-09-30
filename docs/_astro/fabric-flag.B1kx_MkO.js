import{a as e,h as t,m as n,n as r,r as i,t as a}from"./Plane.DX6e4G0f.js";var o=3.8,s=1/120,c=33,l=627,u=.585/(o/32)**2,d=.525/(2/18)**2,f=class{positions=new Float32Array(l*3);normals=new Float32Array(l*3);height=new Float32Array(l);velocity=new Float32Array(l);time=0;gust=0;constructor(){this.updateGeometry()}brush(e,t,n){let r=Math.max(-1,Math.min(1,n));this.gust=Math.min(1.8,this.gust+Math.abs(r)*.22);for(let n=0;n<=18;n++)for(let i=1;i<=32;i++){let a=((i/32-e)/.13)**2+((n/18-t)/.23)**2;this.velocity[n*c+i]+=Math.exp(-a*2)*r*1.5}}step(e){this.time+=s*(.7+e*.5),this.gust*=Math.exp(-.01);let t=e+this.gust;for(let e=0;e<=18;e++){let n=e/18;for(let r=1;r<=32;r++){let i=e*c+r,a=r/32,o=this.height[i],l=u*(this.height[i-1]+this.height[r<32?i+1:i]-2*o)+d*(this.height[e>0?i-c:i]+this.height[e<18?i+c:i]-2*o),f=t*a*(.22*Math.sin(a*9.5-this.time*3.6+n*1.8)+.085*Math.sin(a*17-this.time*5.2-n*3.4)+.035*Math.sin(a*25-this.time*7+n*7));this.velocity[i]+=(38*(f-o)+l-4.8*this.velocity[i])*s}}for(let e=0;e<l;e++)this.height[e]+=this.velocity[e]*s}updateGeometry(){for(let e=0;e<=18;e++){let t=-3.8/2;for(let n=0;n<=32;n++){let r=e*c+n,i=n/32;if(n>0){let e=this.height[r]-this.height[r-1],n=o/32;t+=Math.sqrt(Math.max(n*n*.18,n*n-e*e))}this.positions[r*3]=t,this.positions[r*3+1]=2*(.5-e/18)-.09*i*i+this.height[r]*.13,this.positions[r*3+2]=this.height[r]}}for(let e=0;e<=18;e++)for(let t=0;t<=32;t++){let n=e*c+t,r=(t>0?n-1:n)*3,i=(t<32?n+1:n)*3,a=(e>0?n-c:n)*3,o=(e<18?n+c:n)*3,s=this.positions,l=s[i]-s[r],u=s[i+1]-s[r+1],d=s[i+2]-s[r+2],f=s[a]-s[o],p=s[a+1]-s[o+1],m=s[a+2]-s[o+2],h=u*m-d*p,g=d*f-l*m,_=l*p-u*f,v=Math.hypot(h,g,_);this.normals[n*3]=h/v,this.normals[n*3+1]=g/v,this.normals[n*3+2]=_/v}}},p=`#version 300 es
precision highp float;
in vec3 position;
in vec2 uv;
in vec3 normal;
uniform vec2 view;
uniform float shadow;
uniform vec2 spread;
out vec2 vUv;
out vec3 vNormal;
void main() {
  vUv = uv;
  vNormal = normal;
  vec3 p = position;
  if (shadow > 0.5) {
    p.xy += vec2(0.08, -0.16) * (p.z + 0.7) + spread;
  }
  // A slight oblique view makes the folds legible even at small sizes.
  p.x += p.z * 0.19;
  p.y += p.z * 0.09;
  gl_Position = vec4(p.xy / view, 0.0, 1.0);
}
`,m=`#version 300 es
precision highp float;
uniform sampler2D artwork;
uniform float shadow;
uniform float shadowOpacity;
in vec2 vUv;
in vec3 vNormal;
out vec4 outColor;
void main() {
  if (shadow > 0.5) {
    outColor = vec4(vec3(0.15, 0.13, 0.11) * shadowOpacity, shadowOpacity);
    return;
  }
  // Filter the weave by its pixel footprint so moving folds and tiny flags stay stable.
  vec2 thread = vUv * vec2(180.0, 95.0);
  vec2 footprint = fwidth(thread);
  float detail = 1.0 - smoothstep(0.3, 0.65, max(footprint.x, footprint.y));
  vec2 yarn = sin(thread * 6.283185);
  vec2 slope = cos(thread * 6.283185);
  float weave = yarn.x * yarn.y;
  float fiber = fract(sin(dot(floor(thread), vec2(127.1, 311.7))) * 43758.5453) - 0.5;
  vec3 normal = normalize(vNormal);
  if (normal.z < 0.0) normal = -normal;
  normal = normalize(normal + vec3(slope.x * yarn.y, -yarn.x * slope.y, 0.0) * detail * 0.06);
  vec3 light = normalize(vec3(-0.7, 0.9, 1.0));
  float diffuse = max(dot(normal, light), 0.0);
  float sheen = pow(max(dot(normal, normalize(light + vec3(0.0, 0.0, 1.0))), 0.0), 26.0);
  vec3 color = texture(artwork, vUv).rgb;
  float hem = 1.0 - smoothstep(0.002, 0.005, min(min(vUv.x, 1.0-vUv.x), min(vUv.y, 1.0-vUv.y)));
  float seam = 1.0 - smoothstep(0.0006, 0.0018, abs(min(vUv.y, 1.0-vUv.y) - 0.012));
  float stitches = smoothstep(0.0, 0.3, sin(vUv.x * 1700.0));
  color *= 0.58 + diffuse * 0.54;
  color *= 1.0 + detail * (weave * 0.045 + fiber * 0.025);
  color *= 1.0 - hem * 0.12 - seam * stitches * 0.075;
  color += vec3(1.0, 0.95, 0.85) * sheen * 0.07;
  outColor = vec4(color, 1.0);
}
`,h=4;async function g(o,c,l,u){let d=new Image;d.src=c,await d.decode(),l.throwIfAborted();let g={alpha:!0,antialias:!0,depth:!1,premultipliedAlpha:!0};if(!o.getContext(`webgl2`,g))throw Error(`WebGL2 is unavailable. Try a browser with graphics acceleration enabled.`);let _=new n({canvas:o,...g,dpr:Math.min(devicePixelRatio,2),webgl:2}),v=_.gl,y=new f,b=new e,x=[],S={value:[2.7,1.7]},C,w,T=0,E=0,D=0,O=!0,k=!0,A=!1,j=.65,M=new ResizeObserver(L),N=new IntersectionObserver(([e])=>{k=e.isIntersecting,z()});function P(){if(!A){A=!0,cancelAnimationFrame(T),M.disconnect(),N.disconnect(),document.removeEventListener(`visibilitychange`,z),o.removeEventListener(`webglcontextlost`,F),C?.remove(),w&&v.deleteTexture(w.texture);for(let e of x)e.remove(),v.deleteShader(e.vertexShader),v.deleteShader(e.fragmentShader);v.getExtension(`WEBGL_lose_context`)?.loseContext()}}function F(e){e.preventDefault(),P(),u(`L’affichage graphique a été interrompu. Rechargez la page pour relancer l’animation.`)}function I(){if(A||!C)return;y.updateGeometry();let e=C.attributes.position;e.data=y.positions,e.needsUpdate=!0,C.attributes.normal.data=y.normals,C.attributes.normal.needsUpdate=!0,_.render({scene:b,sort:!1,frustumCull:!1})}function L(){if(A)return;let{width:e,height:t}=o.getBoundingClientRect();e<=0||t<=0||(_.setSize(e,t),o.style.width=`100%`,o.style.height=`100%`,S.value[1]=S.value[0]*t/e,I())}function R(e){if(T=0,!(A||O||!k||document.hidden)){if(E&&e-E<16.166666666666668){T=requestAnimationFrame(R);return}for(D+=E?Math.min((e-E)/1e3,.05):s,E=e;D>=s;)y.step(j),D-=s;I(),T=requestAnimationFrame(R)}}function z(){cancelAnimationFrame(T),T=0,E=0,!A&&!O&&k&&!document.hidden&&(T=requestAnimationFrame(R))}try{C=new a(v,{widthSegments:32,heightSegments:18});let e=document.createElement(`canvas`);e.width=256,e.height=138;let n=e.getContext(`2d`);if(!n)throw Error(`The flag artwork could not be prepared. Reload to try again.`);n.drawImage(d,0,0,e.width,e.height),w=new r(v,{image:e,generateMipmaps:!0});let s={value:1},c={value:[0,0]},l=new t(v,{vertex:p,fragment:m,uniforms:{view:S,artwork:{value:w},shadow:s,shadowOpacity:{value:1-.965**(1/h)},spread:c},transparent:!0,cullFace:null,depthTest:!1,depthWrite:!1});if(x.push(l),!v.getProgramParameter(l.program,v.LINK_STATUS))throw Error(v.getProgramInfoLog(l.program)||`The flag shaders could not compile.`);for(let e=0;e<=h;e++){let t=e*2.39996,n=Math.sqrt(e/h)*.075,r=new i(v,{geometry:C,program:l});r.onBeforeRender(()=>{s.value=+(e<h),c.value[0]=Math.cos(t)*n,c.value[1]=Math.sin(t)*n}),r.setParent(b)}for(let e=0;e<180;e++)y.step(j);return o.addEventListener(`webglcontextlost`,F),document.addEventListener(`visibilitychange`,z),M.observe(o),N.observe(o),L(),{dispose:P,configure(e,t){j=e,O=t,z()},gust(){!O&&!A&&y.brush(.65,.5,1)}}}catch(e){throw P(),e}}var _=`/bonjour-france/_astro/artwork.BCa8CIsq.svg?v=db1a639f`;export{g as createFlagRenderer,_ as flagArtwork};