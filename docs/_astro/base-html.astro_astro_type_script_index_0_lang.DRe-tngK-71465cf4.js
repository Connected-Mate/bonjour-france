import{$n as e,Xn as t}from"./ui-primitives.gbQ-GTd_-71465cf4.js";import{t as n}from"./chat-bot-recovery.CLoFAWsk-71465cf4.js";var r=[`███╗   ██╗ ██████╗  ███████╗`,`████╗  ██║ ██╔══██╗ ██╔════╝`,`██╔██╗ ██║ ██║  ██║ ███████╗`,`██║╚██╗██║ ██║  ██║ ╚════██║`,`██║ ╚████║ ██████╔╝ ███████║`,`╚═╝  ╚═══╝ ╚═════╝  ╚══════╝`],i=`\n${r.map(e=>`  ${e}`).join(`
`)}\n`,a=`color:#000;font:12px/1.15 monospace;`;if(globalThis.matchMedia?.(`(prefers-reduced-motion: no-preference)`).matches){let e=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="110" viewBox="0 0 240 110">
    ${r.map((e,t)=>`<defs><clipPath id="row-${t}"><rect width="0" height="110">
          <animate attributeName="width" from="0" to="240" dur="0.7s" begin="${t*.06}s" fill="freeze" calcMode="spline" keySplines="0.22 1 0.36 1"/>
        </rect></clipPath></defs>
        <text x="12" y="${20+t*14}" fill="#000" font-family="monospace" font-size="12" xml:space="preserve" clip-path="url(#row-${t})">${e}</text>`).join(``)}
    <path d="M12 104H228" stroke="#000" stroke-width="1" stroke-dasharray="216" stroke-dashoffset="216">
      <animate attributeName="stroke-dashoffset" values="216;0;-216" keyTimes="0;0.55;1" dur="1.2s" fill="freeze"/>
    </path>
  </svg>`,t=btoa(String.fromCharCode(...new TextEncoder().encode(e)));i=`NDS`,a=`font-size:0;padding:55px 120px;background-image:url("data:image/svg+xml;base64,${t}");background-repeat:no-repeat;background-position:center;background-size:240px 110px;`}console.info(`%c${i}%c
  National Design Studio is transforming how Americans experience
  their government on the web and in the world.

  Join us → https://ndstudio.gov
`,a,`color:#000;font:11px/1.8 monospace;`);function o(){try{for(let e of[`aws-waf-token`,`site-locale`])document.cookie=`${e}=; path=/; max-age=0; samesite=lax${location.protocol===`https:`?`; secure`:``}`}catch{t(`error`,`legacy_cookies_clear_failed`,{source:`legacy-preferences`})}try{localStorage.removeItem(`america:language`),localStorage.removeItem(`america:debug-chat-timing`)}catch{t(`error`,`legacy_preferences_clear_failed`,{source:`legacy-preferences`})}try{sessionStorage.removeItem(`america:pending-chat-launch`),sessionStorage.removeItem(`america:home-chat-intent`)}catch{t(`error`,`legacy_chat_handoff_clear_failed`,{source:`legacy-preferences`})}`caches`in globalThis&&caches.delete(`transformers-cache`).catch(()=>{t(`error`,`legacy_pii_cache_clear_failed`,{source:`legacy-preferences`})})}var s=new AbortController;n(s.signal).catch(n=>{s.signal.aborted||t(`warn`,`chat_verification_warmup_failed`,{error:e(n)})}),window.addEventListener(`pagehide`,e=>{e.persisted||s.abort()}),o();