var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// _worker.js/index.js
import("node:buffer").then(({ Buffer: Buffer2 }) => {
  globalThis.Buffer = Buffer2;
}).catch(() => null);
var __ALSes_PROMISE__ = import("node:async_hooks").then(({ AsyncLocalStorage }) => {
  globalThis.AsyncLocalStorage = AsyncLocalStorage;
  const envAsyncLocalStorage = new AsyncLocalStorage();
  const requestContextAsyncLocalStorage = new AsyncLocalStorage();
  globalThis.process = {
    env: new Proxy(
      {},
      {
        ownKeys: /* @__PURE__ */ __name(() => Reflect.ownKeys(envAsyncLocalStorage.getStore()), "ownKeys"),
        getOwnPropertyDescriptor: /* @__PURE__ */ __name((_2, ...args) => Reflect.getOwnPropertyDescriptor(envAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
        get: /* @__PURE__ */ __name((_2, property) => Reflect.get(envAsyncLocalStorage.getStore(), property), "get"),
        set: /* @__PURE__ */ __name((_2, property, value) => Reflect.set(envAsyncLocalStorage.getStore(), property, value), "set")
      }
    )
  };
  globalThis[Symbol.for("__cloudflare-request-context__")] = new Proxy(
    {},
    {
      ownKeys: /* @__PURE__ */ __name(() => Reflect.ownKeys(requestContextAsyncLocalStorage.getStore()), "ownKeys"),
      getOwnPropertyDescriptor: /* @__PURE__ */ __name((_2, ...args) => Reflect.getOwnPropertyDescriptor(requestContextAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
      get: /* @__PURE__ */ __name((_2, property) => Reflect.get(requestContextAsyncLocalStorage.getStore(), property), "get"),
      set: /* @__PURE__ */ __name((_2, property, value) => Reflect.set(requestContextAsyncLocalStorage.getStore(), property, value), "set")
    }
  );
  return { envAsyncLocalStorage, requestContextAsyncLocalStorage };
}).catch(() => null);
var re = Object.create;
var D = Object.defineProperty;
var se = Object.getOwnPropertyDescriptor;
var ne = Object.getOwnPropertyNames;
var oe = Object.getPrototypeOf;
var ce = Object.prototype.hasOwnProperty;
var E = /* @__PURE__ */ __name((e, t) => () => (e && (t = e(e = 0)), t), "E");
var F = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "F");
var ie = /* @__PURE__ */ __name((e, t, r, a) => {
  if (t && typeof t == "object" || typeof t == "function") for (let n of ne(t)) !ce.call(e, n) && n !== r && D(e, n, { get: /* @__PURE__ */ __name(() => t[n], "get"), enumerable: !(a = se(t, n)) || a.enumerable });
  return e;
}, "ie");
var H = /* @__PURE__ */ __name((e, t, r) => (r = e != null ? re(oe(e)) : {}, ie(t || !e || !e.__esModule ? D(r, "default", { value: e, enumerable: true }) : r, e)), "H");
var f;
var u = E(() => {
  f = { collectedLocales: [] };
});
var _;
var d = E(() => {
  _ = { version: 3, routes: { none: [{ src: "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$", headers: { Location: "/$1" }, status: 308, continue: true }, { src: "^/_next/__private/trace$", dest: "/404", status: 404, continue: true }, { src: "^/404/?$", status: 404, continue: true, missing: [{ type: "header", key: "x-prerender-revalidate" }] }, { src: "^/500$", status: 500, continue: true }, { src: "^/?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/index.rsc", headers: { vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" }, continue: true, override: true }, { src: "^/((?!.+\\.rsc).+?)(?:/)?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/$1.rsc", headers: { vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" }, continue: true, override: true }], filesystem: [{ src: "^/index(\\.action|\\.rsc)$", dest: "/", continue: true }, { src: "^/_next/data/(.*)$", dest: "/_next/data/$1", check: true }, { src: "^/\\.prefetch\\.rsc$", dest: "/__index.prefetch.rsc", check: true }, { src: "^/(.+)/\\.prefetch\\.rsc$", dest: "/$1.prefetch.rsc", check: true }, { src: "^/\\.rsc$", dest: "/index.rsc", check: true }, { src: "^/(.+)/\\.rsc$", dest: "/$1.rsc", check: true }], miss: [{ src: "^/_next/static/.+$", status: 404, check: true, dest: "/_next/static/not-found.txt", headers: { "content-type": "text/plain; charset=utf-8" } }], rewrite: [{ src: "^/_next/data/(.*)$", dest: "/404", status: 404 }, { src: "^/error/(?<nxtPerrorType>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/error/[errorType].rsc?nxtPerrorType=$nxtPerrorType" }, { src: "^/error/(?<nxtPerrorType>[^/]+?)(?:/)?$", dest: "/error/[errorType]?nxtPerrorType=$nxtPerrorType" }], resource: [{ src: "^/.*$", status: 404 }], hit: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media|vB1ohBLUOKzERh4Lv2_3E)/.+$", headers: { "cache-control": "public,max-age=31536000,immutable" }, continue: true, important: true }, { src: "^/index(?:/)?$", headers: { "x-matched-path": "/" }, continue: true, important: true }, { src: "^/((?!index$).*?)(?:/)?$", headers: { "x-matched-path": "/$1" }, continue: true, important: true }], error: [{ src: "^/.*$", dest: "/404", status: 404 }, { src: "^/.*$", dest: "/500", status: 500 }] }, images: { domains: [], sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 16, 32, 48, 64, 96, 128, 256, 384], remotePatterns: [], minimumCacheTTL: 60, formats: ["image/webp"], dangerouslyAllowSVG: false, contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;", contentDispositionType: "attachment" }, overrides: { "404.html": { path: "404", contentType: "text/html; charset=utf-8" }, "500.html": { path: "500", contentType: "text/html; charset=utf-8" }, "_app.rsc.json": { path: "_app.rsc", contentType: "application/json" }, "_error.rsc.json": { path: "_error.rsc", contentType: "application/json" }, "_document.rsc.json": { path: "_document.rsc", contentType: "application/json" }, "404.rsc.json": { path: "404.rsc", contentType: "application/json" }, "_next/static/not-found.txt": { contentType: "text/plain" } }, framework: { version: "15.5.0" }, crons: [] };
});
var x;
var h = E(() => {
  x = { "/404.html": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/404.rsc.json": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/500.html": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/_app.rsc.json": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc.json": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc.json": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_next/static/chunks/1008-5ce89f3e7db88670.js": { type: "static" }, "/_next/static/chunks/1255-15f04a30ae2c7791.js": { type: "static" }, "/_next/static/chunks/1557-3e3cceef75faceca.js": { type: "static" }, "/_next/static/chunks/2503-94719c9088f3a6a7.js": { type: "static" }, "/_next/static/chunks/2619-04bc32f026a0d946.js": { type: "static" }, "/_next/static/chunks/2659-9c1f813eb2fcc7fd.js": { type: "static" }, "/_next/static/chunks/2698-57176cf8974a4ba4.js": { type: "static" }, "/_next/static/chunks/2730-2c2da2eb738e9035.js": { type: "static" }, "/_next/static/chunks/298-a6cdc8876a33bf42.js": { type: "static" }, "/_next/static/chunks/3191-375189fe89f42f48.js": { type: "static" }, "/_next/static/chunks/3919-47efdd2cd7f07522.js": { type: "static" }, "/_next/static/chunks/4545-1ff35ae6712ff1bf.js": { type: "static" }, "/_next/static/chunks/4567-4265d699d7c91e3b.js": { type: "static" }, "/_next/static/chunks/4bd1b696-100b9d70ed4e49c1.js": { type: "static" }, "/_next/static/chunks/5057-6af7e39ed657c495.js": { type: "static" }, "/_next/static/chunks/5239-b24dd7149d741c56.js": { type: "static" }, "/_next/static/chunks/5283-e69baa82d84145a3.js": { type: "static" }, "/_next/static/chunks/5960-b4bf7956780709e7.js": { type: "static" }, "/_next/static/chunks/5e22fd23-2d44f2f0e816aebc.js": { type: "static" }, "/_next/static/chunks/7057-accac599b6a3a7cd.js": { type: "static" }, "/_next/static/chunks/7084-e197191c554b4206.js": { type: "static" }, "/_next/static/chunks/7692-0c0a22979258884e.js": { type: "static" }, "/_next/static/chunks/7899-56ca0d3a2af725c5.js": { type: "static" }, "/_next/static/chunks/7958-5b5706d0cfd1c53a.js": { type: "static" }, "/_next/static/chunks/795d4814-a3dba3ce0a794500.js": { type: "static" }, "/_next/static/chunks/8687-d67857c4c19f9cc5.js": { type: "static" }, "/_next/static/chunks/9081-1a3fcfd4bd447357.js": { type: "static" }, "/_next/static/chunks/app/_not-found/page-d95cf279f3dec3be.js": { type: "static" }, "/_next/static/chunks/app/auth/forget-password/page-b50b91743678c2b4.js": { type: "static" }, "/_next/static/chunks/app/auth/layout-a743b674a2606d19.js": { type: "static" }, "/_next/static/chunks/app/auth/reset-password/page-28e3dbaa515067e5.js": { type: "static" }, "/_next/static/chunks/app/auth/sign-in/page-0ff6c576ad899b56.js": { type: "static" }, "/_next/static/chunks/app/auth/sign-up/page-1c6a874b5a169675.js": { type: "static" }, "/_next/static/chunks/app/auth/sign-up/verification-choice/page-be79590a4ef167f0.js": { type: "static" }, "/_next/static/chunks/app/auth/verify-otp/page-204f3e9dc576d74b.js": { type: "static" }, "/_next/static/chunks/app/dashboard/account/account-info/page-1b2e3efa8a599732.js": { type: "static" }, "/_next/static/chunks/app/dashboard/account/general-settings/page-83d2b222208ab909.js": { type: "static" }, "/_next/static/chunks/app/dashboard/account/layout-4a154f6cd92e4080.js": { type: "static" }, "/_next/static/chunks/app/dashboard/account/page-d95cf279f3dec3be.js": { type: "static" }, "/_next/static/chunks/app/dashboard/account/privacy-security/page-9a161212cacc6d17.js": { type: "static" }, "/_next/static/chunks/app/dashboard/all-task/page-92344728b5d25504.js": { type: "static" }, "/_next/static/chunks/app/dashboard/assign-task/page-d14547066273b66b.js": { type: "static" }, "/_next/static/chunks/app/dashboard/calender/page-5961aa4c20f52fd4.js": { type: "static" }, "/_next/static/chunks/app/dashboard/layout-7a80fbf89e73723c.js": { type: "static" }, "/_next/static/chunks/app/dashboard/members/page-4714c3ed5883bc0b.js": { type: "static" }, "/_next/static/chunks/app/dashboard/my-task/page-8ee4a3347c6fd830.js": { type: "static" }, "/_next/static/chunks/app/dashboard/page-b4848b3198ffd938.js": { type: "static" }, "/_next/static/chunks/app/dashboard/reports/page-8d41a4b7a36efc37.js": { type: "static" }, "/_next/static/chunks/app/error/[errorType]/page-443b57f8fd1f9492.js": { type: "static" }, "/_next/static/chunks/app/layout-d2448652c053bd48.js": { type: "static" }, "/_next/static/chunks/app/not-found-baecff5457dade3f.js": { type: "static" }, "/_next/static/chunks/app/onBoarding/page-d7320b85a1253105.js": { type: "static" }, "/_next/static/chunks/app/page-4f473bc4d0e3464b.js": { type: "static" }, "/_next/static/chunks/e34aaff9-c0178a426cf2270a.js": { type: "static" }, "/_next/static/chunks/ee560e2c-ace994b621fd59e8.js": { type: "static" }, "/_next/static/chunks/f97e080b-fa283d04ccba55cb.js": { type: "static" }, "/_next/static/chunks/framework-b9fd9bcc3ecde907.js": { type: "static" }, "/_next/static/chunks/main-app-4f2f70999e4c50cb.js": { type: "static" }, "/_next/static/chunks/main-d85e74e62d09df85.js": { type: "static" }, "/_next/static/chunks/pages/_app-4b3fb5e477a0267f.js": { type: "static" }, "/_next/static/chunks/pages/_error-c970d8b55ace1b48.js": { type: "static" }, "/_next/static/chunks/polyfills-42372ed130431b0a.js": { type: "static" }, "/_next/static/chunks/webpack-412e204ef9b44f4b.js": { type: "static" }, "/_next/static/css/dd7da4dc7e79fed6.css": { type: "static" }, "/_next/static/media/Icon Container.9df0bdd1.svg": { type: "static" }, "/_next/static/media/Key.9df987fc.svg": { type: "static" }, "/_next/static/media/Section Icon.433403a0.svg": { type: "static" }, "/_next/static/media/andrew-neel-cckf4TsHAuw-unsplash.bda2f66a.jpg": { type: "static" }, "/_next/static/media/fi-rr-bag.da1661d1.svg": { type: "static" }, "/_next/static/media/iconsignup.cd996fda.svg": { type: "static" }, "/_next/static/media/musemind-ux-agency-Mgm6aq1UYpI-unsplash.0aacdcbc.jpg": { type: "static" }, "/_next/static/media/sms.d463da7d.svg": { type: "static" }, "/_next/static/not-found.txt": { type: "static" }, "/_next/static/vB1ohBLUOKzERh4Lv2_3E/_buildManifest.js": { type: "static" }, "/_next/static/vB1ohBLUOKzERh4Lv2_3E/_ssgManifest.js": { type: "static" }, "/apple.png": { type: "static" }, "/favicon.ico": { type: "static" }, "/fonts/CreatoDisplay-Black.otf": { type: "static" }, "/fonts/CreatoDisplay-Bold.otf": { type: "static" }, "/fonts/CreatoDisplay-ExtraBold.otf": { type: "static" }, "/fonts/CreatoDisplay-Light.otf": { type: "static" }, "/fonts/CreatoDisplay-Medium.otf": { type: "static" }, "/fonts/CreatoDisplay-Regular.otf": { type: "static" }, "/fonts/CreatoDisplay-Thin.otf": { type: "static" }, "/fonts/GeistMonoVF.woff": { type: "static" }, "/fonts/GeistVF.woff": { type: "static" }, "/fonts/NeueMontreal-Bold.otf": { type: "static" }, "/fonts/NeueMontreal-BoldItalic.otf": { type: "static" }, "/fonts/NeueMontreal-Italic.otf": { type: "static" }, "/fonts/NeueMontreal-Light.otf": { type: "static" }, "/fonts/NeueMontreal-LightItalic.otf": { type: "static" }, "/fonts/NeueMontreal-Medium.otf": { type: "static" }, "/fonts/NeueMontreal-MediumItalic.otf": { type: "static" }, "/fonts/NeueMontreal-Regular.otf": { type: "static" }, "/fonts/SF-Pro-Display-Black.otf": { type: "static" }, "/fonts/SF-Pro-Display-Bold.otf": { type: "static" }, "/fonts/SF-Pro-Display-Heavy.otf": { type: "static" }, "/fonts/SF-Pro-Display-Light.otf": { type: "static" }, "/fonts/SF-Pro-Display-Medium.otf": { type: "static" }, "/fonts/SF-Pro-Display-Regular.otf": { type: "static" }, "/fonts/SF-Pro-Display-Semibold.otf": { type: "static" }, "/fonts/SF-Pro-Display-Thin.otf": { type: "static" }, "/fonts/SF-Pro-Display-Ultralight.otf": { type: "static" }, "/fonts/SFPRODISPLAYBOLD.OTF": { type: "static" }, "/fonts/SFPRODISPLAYMEDIUM.OTF": { type: "static" }, "/fonts/SFPRODISPLAYREGULAR.OTF": { type: "static" }, "/googleicon.png": { type: "static" }, "/error/[errorType]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/error/[errorType].func.js" }, "/error/[errorType].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/error/[errorType].func.js" }, "/404": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/500": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/_app.rsc": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/404.rsc": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/_not-found.html": { type: "override", path: "/_not-found.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_not-found": { type: "override", path: "/_not-found.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_not-found.rsc": { type: "override", path: "/_not-found.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/auth/forget-password.html": { type: "override", path: "/auth/forget-password.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/auth/layout,_N_T_/auth/forget-password/layout,_N_T_/auth/forget-password/page,_N_T_/auth/forget-password", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/auth/forget-password": { type: "override", path: "/auth/forget-password.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/auth/layout,_N_T_/auth/forget-password/layout,_N_T_/auth/forget-password/page,_N_T_/auth/forget-password", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/auth/forget-password.rsc": { type: "override", path: "/auth/forget-password.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/auth/layout,_N_T_/auth/forget-password/layout,_N_T_/auth/forget-password/page,_N_T_/auth/forget-password", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/auth/reset-password.html": { type: "override", path: "/auth/reset-password.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/auth/layout,_N_T_/auth/reset-password/layout,_N_T_/auth/reset-password/page,_N_T_/auth/reset-password", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/auth/reset-password": { type: "override", path: "/auth/reset-password.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/auth/layout,_N_T_/auth/reset-password/layout,_N_T_/auth/reset-password/page,_N_T_/auth/reset-password", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/auth/reset-password.rsc": { type: "override", path: "/auth/reset-password.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/auth/layout,_N_T_/auth/reset-password/layout,_N_T_/auth/reset-password/page,_N_T_/auth/reset-password", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/auth/sign-in.html": { type: "override", path: "/auth/sign-in.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/auth/layout,_N_T_/auth/sign-in/layout,_N_T_/auth/sign-in/page,_N_T_/auth/sign-in", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/auth/sign-in": { type: "override", path: "/auth/sign-in.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/auth/layout,_N_T_/auth/sign-in/layout,_N_T_/auth/sign-in/page,_N_T_/auth/sign-in", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/auth/sign-in.rsc": { type: "override", path: "/auth/sign-in.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/auth/layout,_N_T_/auth/sign-in/layout,_N_T_/auth/sign-in/page,_N_T_/auth/sign-in", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/auth/sign-up/verification-choice.html": { type: "override", path: "/auth/sign-up/verification-choice.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/auth/layout,_N_T_/auth/sign-up/layout,_N_T_/auth/sign-up/verification-choice/layout,_N_T_/auth/sign-up/verification-choice/page,_N_T_/auth/sign-up/verification-choice", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/auth/sign-up/verification-choice": { type: "override", path: "/auth/sign-up/verification-choice.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/auth/layout,_N_T_/auth/sign-up/layout,_N_T_/auth/sign-up/verification-choice/layout,_N_T_/auth/sign-up/verification-choice/page,_N_T_/auth/sign-up/verification-choice", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/auth/sign-up/verification-choice.rsc": { type: "override", path: "/auth/sign-up/verification-choice.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/auth/layout,_N_T_/auth/sign-up/layout,_N_T_/auth/sign-up/verification-choice/layout,_N_T_/auth/sign-up/verification-choice/page,_N_T_/auth/sign-up/verification-choice", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/auth/sign-up.html": { type: "override", path: "/auth/sign-up.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/auth/layout,_N_T_/auth/sign-up/layout,_N_T_/auth/sign-up/page,_N_T_/auth/sign-up", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/auth/sign-up": { type: "override", path: "/auth/sign-up.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/auth/layout,_N_T_/auth/sign-up/layout,_N_T_/auth/sign-up/page,_N_T_/auth/sign-up", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/auth/sign-up.rsc": { type: "override", path: "/auth/sign-up.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/auth/layout,_N_T_/auth/sign-up/layout,_N_T_/auth/sign-up/page,_N_T_/auth/sign-up", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/auth/verify-otp.html": { type: "override", path: "/auth/verify-otp.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/auth/layout,_N_T_/auth/verify-otp/layout,_N_T_/auth/verify-otp/page,_N_T_/auth/verify-otp", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/auth/verify-otp": { type: "override", path: "/auth/verify-otp.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/auth/layout,_N_T_/auth/verify-otp/layout,_N_T_/auth/verify-otp/page,_N_T_/auth/verify-otp", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/auth/verify-otp.rsc": { type: "override", path: "/auth/verify-otp.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/auth/layout,_N_T_/auth/verify-otp/layout,_N_T_/auth/verify-otp/page,_N_T_/auth/verify-otp", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/dashboard/account/account-info.html": { type: "override", path: "/dashboard/account/account-info.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/account/layout,_N_T_/dashboard/account/account-info/layout,_N_T_/dashboard/account/account-info/page,_N_T_/dashboard/account/account-info", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/account/account-info": { type: "override", path: "/dashboard/account/account-info.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/account/layout,_N_T_/dashboard/account/account-info/layout,_N_T_/dashboard/account/account-info/page,_N_T_/dashboard/account/account-info", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/account/account-info.rsc": { type: "override", path: "/dashboard/account/account-info.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/account/layout,_N_T_/dashboard/account/account-info/layout,_N_T_/dashboard/account/account-info/page,_N_T_/dashboard/account/account-info", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/dashboard/account/general-settings.html": { type: "override", path: "/dashboard/account/general-settings.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/account/layout,_N_T_/dashboard/account/general-settings/layout,_N_T_/dashboard/account/general-settings/page,_N_T_/dashboard/account/general-settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/account/general-settings": { type: "override", path: "/dashboard/account/general-settings.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/account/layout,_N_T_/dashboard/account/general-settings/layout,_N_T_/dashboard/account/general-settings/page,_N_T_/dashboard/account/general-settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/account/general-settings.rsc": { type: "override", path: "/dashboard/account/general-settings.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/account/layout,_N_T_/dashboard/account/general-settings/layout,_N_T_/dashboard/account/general-settings/page,_N_T_/dashboard/account/general-settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/dashboard/account/privacy-security.html": { type: "override", path: "/dashboard/account/privacy-security.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/account/layout,_N_T_/dashboard/account/privacy-security/layout,_N_T_/dashboard/account/privacy-security/page,_N_T_/dashboard/account/privacy-security", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/account/privacy-security": { type: "override", path: "/dashboard/account/privacy-security.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/account/layout,_N_T_/dashboard/account/privacy-security/layout,_N_T_/dashboard/account/privacy-security/page,_N_T_/dashboard/account/privacy-security", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/account/privacy-security.rsc": { type: "override", path: "/dashboard/account/privacy-security.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/account/layout,_N_T_/dashboard/account/privacy-security/layout,_N_T_/dashboard/account/privacy-security/page,_N_T_/dashboard/account/privacy-security", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/dashboard/account.html": { type: "override", path: "/dashboard/account.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/account/layout,_N_T_/dashboard/account/page,_N_T_/dashboard/account", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/account": { type: "override", path: "/dashboard/account.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/account/layout,_N_T_/dashboard/account/page,_N_T_/dashboard/account", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/account.rsc": { type: "override", path: "/dashboard/account.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/account/layout,_N_T_/dashboard/account/page,_N_T_/dashboard/account", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/dashboard/all-task.html": { type: "override", path: "/dashboard/all-task.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/all-task/layout,_N_T_/dashboard/all-task/page,_N_T_/dashboard/all-task", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/all-task": { type: "override", path: "/dashboard/all-task.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/all-task/layout,_N_T_/dashboard/all-task/page,_N_T_/dashboard/all-task", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/all-task.rsc": { type: "override", path: "/dashboard/all-task.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/all-task/layout,_N_T_/dashboard/all-task/page,_N_T_/dashboard/all-task", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/dashboard/assign-task.html": { type: "override", path: "/dashboard/assign-task.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/assign-task/layout,_N_T_/dashboard/assign-task/page,_N_T_/dashboard/assign-task", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/assign-task": { type: "override", path: "/dashboard/assign-task.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/assign-task/layout,_N_T_/dashboard/assign-task/page,_N_T_/dashboard/assign-task", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/assign-task.rsc": { type: "override", path: "/dashboard/assign-task.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/assign-task/layout,_N_T_/dashboard/assign-task/page,_N_T_/dashboard/assign-task", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/dashboard/calender.html": { type: "override", path: "/dashboard/calender.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/calender/layout,_N_T_/dashboard/calender/page,_N_T_/dashboard/calender", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/calender": { type: "override", path: "/dashboard/calender.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/calender/layout,_N_T_/dashboard/calender/page,_N_T_/dashboard/calender", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/calender.rsc": { type: "override", path: "/dashboard/calender.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/calender/layout,_N_T_/dashboard/calender/page,_N_T_/dashboard/calender", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/dashboard/members.html": { type: "override", path: "/dashboard/members.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/members/layout,_N_T_/dashboard/members/page,_N_T_/dashboard/members", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/members": { type: "override", path: "/dashboard/members.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/members/layout,_N_T_/dashboard/members/page,_N_T_/dashboard/members", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/members.rsc": { type: "override", path: "/dashboard/members.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/members/layout,_N_T_/dashboard/members/page,_N_T_/dashboard/members", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/dashboard/my-task.html": { type: "override", path: "/dashboard/my-task.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/my-task/layout,_N_T_/dashboard/my-task/page,_N_T_/dashboard/my-task", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/my-task": { type: "override", path: "/dashboard/my-task.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/my-task/layout,_N_T_/dashboard/my-task/page,_N_T_/dashboard/my-task", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/my-task.rsc": { type: "override", path: "/dashboard/my-task.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/my-task/layout,_N_T_/dashboard/my-task/page,_N_T_/dashboard/my-task", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/dashboard/reports.html": { type: "override", path: "/dashboard/reports.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/reports/layout,_N_T_/dashboard/reports/page,_N_T_/dashboard/reports", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/reports": { type: "override", path: "/dashboard/reports.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/reports/layout,_N_T_/dashboard/reports/page,_N_T_/dashboard/reports", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard/reports.rsc": { type: "override", path: "/dashboard/reports.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/reports/layout,_N_T_/dashboard/reports/page,_N_T_/dashboard/reports", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/dashboard.html": { type: "override", path: "/dashboard.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/page,_N_T_/dashboard", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard": { type: "override", path: "/dashboard.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/page,_N_T_/dashboard", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/dashboard.rsc": { type: "override", path: "/dashboard.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/dashboard/layout,_N_T_/dashboard/page,_N_T_/dashboard", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/index.html": { type: "override", path: "/index.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/index": { type: "override", path: "/index.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/": { type: "override", path: "/index.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/index.rsc": { type: "override", path: "/index.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/onBoarding.html": { type: "override", path: "/onBoarding.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/onBoarding/layout,_N_T_/onBoarding/page,_N_T_/onBoarding", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/onBoarding": { type: "override", path: "/onBoarding.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/onBoarding/layout,_N_T_/onBoarding/page,_N_T_/onBoarding", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/onBoarding.rsc": { type: "override", path: "/onBoarding.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/onBoarding/layout,_N_T_/onBoarding/page,_N_T_/onBoarding", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } } };
});
var B = F((We, V) => {
  "use strict";
  u();
  d();
  h();
  function b(e, t) {
    e = String(e || "").trim();
    let r = e, a, n = "";
    if (/^[^a-zA-Z\\\s]/.test(e)) {
      a = e[0];
      let c = e.lastIndexOf(a);
      n += e.substring(c + 1), e = e.substring(1, c);
    }
    let s = 0;
    return e = he(e, (c) => {
      if (/^\(\?[P<']/.test(c)) {
        let i = /^\(\?P?[<']([^>']+)[>']/.exec(c);
        if (!i) throw new Error(`Failed to extract named captures from ${JSON.stringify(c)}`);
        let p = c.substring(i[0].length, c.length - 1);
        return t && (t[s] = i[1]), s++, `(${p})`;
      }
      return c.substring(0, 3) === "(?:" || s++, c;
    }), e = e.replace(/\[:([^:]+):\]/g, (c, i) => b.characterClasses[i] || c), new b.PCRE(e, n, r, n, a);
  }
  __name(b, "b");
  function he(e, t) {
    let r = 0, a = 0, n = false;
    for (let o = 0; o < e.length; o++) {
      let s = e[o];
      if (n) {
        n = false;
        continue;
      }
      switch (s) {
        case "(":
          a === 0 && (r = o), a++;
          break;
        case ")":
          if (a > 0 && (a--, a === 0)) {
            let c = o + 1, i = r === 0 ? "" : e.substring(0, r), p = e.substring(c), l = String(t(e.substring(r, c)));
            e = i + l + p, o = r;
          }
          break;
        case "\\":
          n = true;
          break;
        default:
          break;
      }
    }
    return e;
  }
  __name(he, "he");
  (function(e) {
    class t extends RegExp {
      static {
        __name(this, "t");
      }
      constructor(a, n, o, s, c) {
        super(a, n), this.pcrePattern = o, this.pcreFlags = s, this.delimiter = c;
      }
    }
    e.PCRE = t, e.characterClasses = { alnum: "[A-Za-z0-9]", word: "[A-Za-z0-9_]", alpha: "[A-Za-z]", blank: "[ \\t]", cntrl: "[\\x00-\\x1F\\x7F]", digit: "\\d", graph: "[\\x21-\\x7E]", lower: "[a-z]", print: "[\\x20-\\x7E]", punct: "[\\]\\[!\"#$%&'()*+,./:;<=>?@\\\\^_`{|}~-]", space: "\\s", upper: "[A-Z]", xdigit: "[A-Fa-f0-9]" };
  })(b || (b = {}));
  b.prototype = b.PCRE.prototype;
  V.exports = b;
});
var X = F((U) => {
  "use strict";
  u();
  d();
  h();
  U.parse = ve;
  U.serialize = we;
  var Ne = Object.prototype.toString, S = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function ve(e, t) {
    if (typeof e != "string") throw new TypeError("argument str must be a string");
    for (var r = {}, a = t || {}, n = a.decode || je, o = 0; o < e.length; ) {
      var s = e.indexOf("=", o);
      if (s === -1) break;
      var c = e.indexOf(";", o);
      if (c === -1) c = e.length;
      else if (c < s) {
        o = e.lastIndexOf(";", s - 1) + 1;
        continue;
      }
      var i = e.slice(o, s).trim();
      if (r[i] === void 0) {
        var p = e.slice(s + 1, c).trim();
        p.charCodeAt(0) === 34 && (p = p.slice(1, -1)), r[i] = Pe(p, n);
      }
      o = c + 1;
    }
    return r;
  }
  __name(ve, "ve");
  function we(e, t, r) {
    var a = r || {}, n = a.encode || Re;
    if (typeof n != "function") throw new TypeError("option encode is invalid");
    if (!S.test(e)) throw new TypeError("argument name is invalid");
    var o = n(t);
    if (o && !S.test(o)) throw new TypeError("argument val is invalid");
    var s = e + "=" + o;
    if (a.maxAge != null) {
      var c = a.maxAge - 0;
      if (isNaN(c) || !isFinite(c)) throw new TypeError("option maxAge is invalid");
      s += "; Max-Age=" + Math.floor(c);
    }
    if (a.domain) {
      if (!S.test(a.domain)) throw new TypeError("option domain is invalid");
      s += "; Domain=" + a.domain;
    }
    if (a.path) {
      if (!S.test(a.path)) throw new TypeError("option path is invalid");
      s += "; Path=" + a.path;
    }
    if (a.expires) {
      var i = a.expires;
      if (!ke(i) || isNaN(i.valueOf())) throw new TypeError("option expires is invalid");
      s += "; Expires=" + i.toUTCString();
    }
    if (a.httpOnly && (s += "; HttpOnly"), a.secure && (s += "; Secure"), a.priority) {
      var p = typeof a.priority == "string" ? a.priority.toLowerCase() : a.priority;
      switch (p) {
        case "low":
          s += "; Priority=Low";
          break;
        case "medium":
          s += "; Priority=Medium";
          break;
        case "high":
          s += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (a.sameSite) {
      var l = typeof a.sameSite == "string" ? a.sameSite.toLowerCase() : a.sameSite;
      switch (l) {
        case true:
          s += "; SameSite=Strict";
          break;
        case "lax":
          s += "; SameSite=Lax";
          break;
        case "strict":
          s += "; SameSite=Strict";
          break;
        case "none":
          s += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return s;
  }
  __name(we, "we");
  function je(e) {
    return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e;
  }
  __name(je, "je");
  function Re(e) {
    return encodeURIComponent(e);
  }
  __name(Re, "Re");
  function ke(e) {
    return Ne.call(e) === "[object Date]" || e instanceof Date;
  }
  __name(ke, "ke");
  function Pe(e, t) {
    try {
      return t(e);
    } catch {
      return e;
    }
  }
  __name(Pe, "Pe");
});
u();
d();
h();
u();
d();
h();
u();
d();
h();
var N = "INTERNAL_SUSPENSE_CACHE_HOSTNAME.local";
u();
d();
h();
u();
d();
h();
u();
d();
h();
u();
d();
h();
var $ = H(B());
function R(e, t, r) {
  if (t == null) return { match: null, captureGroupKeys: [] };
  let a = r ? "" : "i", n = [];
  return { match: (0, $.default)(`%${e}%${a}`, n).exec(t), captureGroupKeys: n };
}
__name(R, "R");
function v(e, t, r, { namedOnly: a } = {}) {
  return e.replace(/\$([a-zA-Z0-9_]+)/g, (n, o) => {
    let s = r.indexOf(o);
    return a && s === -1 ? n : (s === -1 ? t[parseInt(o, 10)] : t[s + 1]) || "";
  });
}
__name(v, "v");
function I(e, { url: t, cookies: r, headers: a, routeDest: n }) {
  switch (e.type) {
    case "host":
      return { valid: t.hostname === e.value };
    case "header":
      return e.value !== void 0 ? M(e.value, a.get(e.key), n) : { valid: a.has(e.key) };
    case "cookie": {
      let o = r[e.key];
      return o && e.value !== void 0 ? M(e.value, o, n) : { valid: o !== void 0 };
    }
    case "query":
      return e.value !== void 0 ? M(e.value, t.searchParams.get(e.key), n) : { valid: t.searchParams.has(e.key) };
  }
}
__name(I, "I");
function M(e, t, r) {
  let { match: a, captureGroupKeys: n } = R(e, t);
  return r && a && n.length ? { valid: !!a, newRouteDest: v(r, a, n, { namedOnly: true }) } : { valid: !!a };
}
__name(M, "M");
u();
d();
h();
function q(e) {
  let t = new Headers(e.headers);
  return e.cf && (t.set("x-vercel-ip-city", encodeURIComponent(e.cf.city)), t.set("x-vercel-ip-country", e.cf.country), t.set("x-vercel-ip-country-region", e.cf.regionCode), t.set("x-vercel-ip-latitude", e.cf.latitude), t.set("x-vercel-ip-longitude", e.cf.longitude)), t.set("x-vercel-sc-host", N), new Request(e, { headers: t });
}
__name(q, "q");
u();
d();
h();
function g(e, t, r) {
  let a = t instanceof Headers ? t.entries() : Object.entries(t);
  for (let [n, o] of a) {
    let s = n.toLowerCase(), c = r?.match ? v(o, r.match, r.captureGroupKeys) : o;
    s === "set-cookie" ? e.append(s, c) : e.set(s, c);
  }
}
__name(g, "g");
function w(e) {
  return /^https?:\/\//.test(e);
}
__name(w, "w");
function m(e, t) {
  for (let [r, a] of t.entries()) {
    let n = /^nxtP(.+)$/.exec(r), o = /^nxtI(.+)$/.exec(r);
    n?.[1] ? (e.set(r, a), e.set(n[1], a)) : o?.[1] ? e.set(o[1], a.replace(/(\(\.+\))+/, "")) : (!e.has(r) || !!a && !e.getAll(r).includes(a)) && e.append(r, a);
  }
}
__name(m, "m");
function L(e, t) {
  let r = new URL(t, e.url);
  return m(r.searchParams, new URL(e.url).searchParams), r.pathname = r.pathname.replace(/\/index.html$/, "/").replace(/\.html$/, ""), new Request(r, e);
}
__name(L, "L");
function j(e) {
  return new Response(e.body, e);
}
__name(j, "j");
function A(e) {
  return e.split(",").map((t) => {
    let [r, a] = t.split(";"), n = parseFloat((a ?? "q=1").replace(/q *= */gi, ""));
    return [r.trim(), isNaN(n) ? 1 : n];
  }).sort((t, r) => r[1] - t[1]).map(([t]) => t === "*" || t === "" ? [] : t).flat();
}
__name(A, "A");
u();
d();
h();
function O(e) {
  switch (e) {
    case "none":
      return "filesystem";
    case "filesystem":
      return "rewrite";
    case "rewrite":
      return "resource";
    case "resource":
      return "miss";
    default:
      return "miss";
  }
}
__name(O, "O");
async function k(e, { request: t, assetsFetcher: r, ctx: a }, { path: n, searchParams: o }) {
  let s, c = new URL(t.url);
  m(c.searchParams, o);
  let i = new Request(c, t);
  try {
    switch (e?.type) {
      case "function":
      case "middleware": {
        let p = await import(e.entrypoint);
        try {
          s = await p.default(i, a);
        } catch (l) {
          let y = l;
          throw y.name === "TypeError" && y.message.endsWith("default is not a function") ? new Error(`An error occurred while evaluating the target edge function (${e.entrypoint})`) : l;
        }
        break;
      }
      case "override": {
        s = j(await r.fetch(L(i, e.path ?? n))), e.headers && g(s.headers, e.headers);
        break;
      }
      case "static": {
        s = await r.fetch(L(i, n));
        break;
      }
      default:
        s = new Response("Not Found", { status: 404 });
    }
  } catch (p) {
    return console.error(p), new Response("Internal Server Error", { status: 500 });
  }
  return j(s);
}
__name(k, "k");
function G(e, t) {
  let r = "^//?(?:", a = ")/(.*)$";
  return !e.startsWith(r) || !e.endsWith(a) ? false : e.slice(r.length, -a.length).split("|").every((o) => t.has(o));
}
__name(G, "G");
u();
d();
h();
function pe(e, { protocol: t, hostname: r, port: a, pathname: n }) {
  return !(t && e.protocol.replace(/:$/, "") !== t || !new RegExp(r).test(e.hostname) || a && !new RegExp(a).test(e.port) || n && !new RegExp(n).test(e.pathname));
}
__name(pe, "pe");
function le(e, t) {
  if (e.method !== "GET") return;
  let { origin: r, searchParams: a } = new URL(e.url), n = a.get("url"), o = Number.parseInt(a.get("w") ?? "", 10), s = Number.parseInt(a.get("q") ?? "75", 10);
  if (!n || Number.isNaN(o) || Number.isNaN(s) || !t?.sizes?.includes(o) || s < 0 || s > 100) return;
  let c = new URL(n, r);
  if (c.pathname.endsWith(".svg") && !t?.dangerouslyAllowSVG) return;
  let i = n.startsWith("//"), p = n.startsWith("/") && !i;
  if (!p && !t?.domains?.includes(c.hostname) && !t?.remotePatterns?.find((T) => pe(c, T))) return;
  let l = e.headers.get("Accept") ?? "", y = t?.formats?.find((T) => l.includes(T))?.replace("image/", "");
  return { isRelative: p, imageUrl: c, options: { width: o, quality: s, format: y } };
}
__name(le, "le");
function _e(e, t, r) {
  let a = new Headers();
  if (r?.contentSecurityPolicy && a.set("Content-Security-Policy", r.contentSecurityPolicy), r?.contentDispositionType) {
    let o = t.pathname.split("/").pop(), s = o ? `${r.contentDispositionType}; filename="${o}"` : r.contentDispositionType;
    a.set("Content-Disposition", s);
  }
  e.headers.has("Cache-Control") || a.set("Cache-Control", `public, max-age=${r?.minimumCacheTTL ?? 60}`);
  let n = j(e);
  return g(n.headers, a), n;
}
__name(_e, "_e");
async function K(e, { buildOutput: t, assetsFetcher: r, imagesConfig: a }) {
  let n = le(e, a);
  if (!n) return new Response("Invalid image resizing request", { status: 400 });
  let { isRelative: o, imageUrl: s } = n, i = await (o && s.pathname in t ? r.fetch.bind(r) : fetch)(s);
  return _e(i, s, a);
}
__name(K, "K");
u();
d();
h();
u();
d();
h();
u();
d();
h();
async function P(e) {
  return import(e);
}
__name(P, "P");
var xe = "x-vercel-cache-tags";
var fe = "x-next-cache-soft-tags";
var ye = Symbol.for("__cloudflare-request-context__");
async function J(e) {
  let t = `https://${N}/v1/suspense-cache/`;
  if (!e.url.startsWith(t)) return null;
  try {
    let r = new URL(e.url), a = await ge();
    if (r.pathname === "/v1/suspense-cache/revalidate") {
      let o = r.searchParams.get("tags")?.split(",") ?? [];
      for (let s of o) await a.revalidateTag(s);
      return new Response(null, { status: 200 });
    }
    let n = r.pathname.replace("/v1/suspense-cache/", "");
    if (!n.length) return new Response("Invalid cache key", { status: 400 });
    switch (e.method) {
      case "GET": {
        let o = W(e, fe), s = await a.get(n, { softTags: o });
        return s ? new Response(JSON.stringify(s.value), { status: 200, headers: { "Content-Type": "application/json", "x-vercel-cache-state": "fresh", age: `${(Date.now() - (s.lastModified ?? Date.now())) / 1e3}` } }) : new Response(null, { status: 404 });
      }
      case "POST": {
        let o = globalThis[ye], s = /* @__PURE__ */ __name(async () => {
          let c = await e.json();
          c.data.tags === void 0 && (c.tags ??= W(e, xe) ?? []), await a.set(n, c);
        }, "s");
        return o ? o.ctx.waitUntil(s()) : await s(), new Response(null, { status: 200 });
      }
      default:
        return new Response(null, { status: 405 });
    }
  } catch (r) {
    return console.error(r), new Response("Error handling cache request", { status: 500 });
  }
}
__name(J, "J");
async function ge() {
  return process.env.__NEXT_ON_PAGES__KV_SUSPENSE_CACHE ? z("kv") : z("cache-api");
}
__name(ge, "ge");
async function z(e) {
  let t = `./__next-on-pages-dist__/cache/${e}.js`, r = await P(t);
  return new r.default();
}
__name(z, "z");
function W(e, t) {
  return e.headers.get(t)?.split(",")?.filter(Boolean);
}
__name(W, "W");
function Y() {
  globalThis[Z] || (me(), globalThis[Z] = true);
}
__name(Y, "Y");
function me() {
  let e = globalThis.fetch;
  globalThis.fetch = async (...t) => {
    let r = new Request(...t), a = await be(r);
    return a || (a = await J(r), a) ? a : (Te(r), e(r));
  };
}
__name(me, "me");
async function be(e) {
  if (e.url.startsWith("blob:")) try {
    let r = `./__next-on-pages-dist__/assets/${new URL(e.url).pathname}.bin`, a = (await P(r)).default, n = { async arrayBuffer() {
      return a;
    }, get body() {
      return new ReadableStream({ start(o) {
        let s = Buffer.from(a);
        o.enqueue(s), o.close();
      } });
    }, async text() {
      return Buffer.from(a).toString();
    }, async json() {
      let o = Buffer.from(a);
      return JSON.stringify(o.toString());
    }, async blob() {
      return new Blob(a);
    } };
    return n.clone = () => ({ ...n }), n;
  } catch {
  }
  return null;
}
__name(be, "be");
function Te(e) {
  e.headers.has("user-agent") || e.headers.set("user-agent", "Next.js Middleware");
}
__name(Te, "Te");
var Z = Symbol.for("next-on-pages fetch patch");
u();
d();
h();
var Q = H(X());
var C = class {
  static {
    __name(this, "C");
  }
  constructor(t, r, a, n, o) {
    this.routes = t;
    this.output = r;
    this.reqCtx = a;
    this.url = new URL(a.request.url), this.cookies = (0, Q.parse)(a.request.headers.get("cookie") || ""), this.path = this.url.pathname || "/", this.headers = { normal: new Headers(), important: new Headers() }, this.searchParams = new URLSearchParams(), m(this.searchParams, this.url.searchParams), this.checkPhaseCounter = 0, this.middlewareInvoked = [], this.wildcardMatch = o?.find((s) => s.domain === this.url.hostname), this.locales = new Set(n.collectedLocales);
  }
  url;
  cookies;
  wildcardMatch;
  path;
  status;
  headers;
  searchParams;
  body;
  checkPhaseCounter;
  middlewareInvoked;
  locales;
  checkRouteMatch(t, { checkStatus: r, checkIntercept: a }) {
    let n = R(t.src, this.path, t.caseSensitive);
    if (!n.match || t.methods && !t.methods.map((s) => s.toUpperCase()).includes(this.reqCtx.request.method.toUpperCase())) return;
    let o = { url: this.url, cookies: this.cookies, headers: this.reqCtx.request.headers, routeDest: t.dest };
    if (!t.has?.find((s) => {
      let c = I(s, o);
      return c.newRouteDest && (o.routeDest = c.newRouteDest), !c.valid;
    }) && !t.missing?.find((s) => I(s, o).valid) && !(r && t.status !== this.status)) {
      if (a && t.dest) {
        let s = /\/(\(\.+\))+/, c = s.test(t.dest), i = s.test(this.path);
        if (c && !i) return;
      }
      return { routeMatch: n, routeDest: o.routeDest };
    }
  }
  processMiddlewareResp(t) {
    let r = "x-middleware-override-headers", a = t.headers.get(r);
    if (a) {
      let i = new Set(a.split(",").map((p) => p.trim()));
      for (let p of i.keys()) {
        let l = `x-middleware-request-${p}`, y = t.headers.get(l);
        this.reqCtx.request.headers.get(p) !== y && (y ? this.reqCtx.request.headers.set(p, y) : this.reqCtx.request.headers.delete(p)), t.headers.delete(l);
      }
      t.headers.delete(r);
    }
    let n = "x-middleware-rewrite", o = t.headers.get(n);
    if (o) {
      let i = new URL(o, this.url), p = this.url.hostname !== i.hostname;
      this.path = p ? `${i}` : i.pathname, m(this.searchParams, i.searchParams), t.headers.delete(n);
    }
    let s = "x-middleware-next";
    t.headers.get(s) ? t.headers.delete(s) : !o && !t.headers.has("location") ? (this.body = t.body, this.status = t.status) : t.headers.has("location") && t.status >= 300 && t.status < 400 && (this.status = t.status), g(this.reqCtx.request.headers, t.headers), g(this.headers.normal, t.headers), this.headers.middlewareLocation = t.headers.get("location");
  }
  async runRouteMiddleware(t) {
    if (!t) return true;
    let r = t && this.output[t];
    if (!r || r.type !== "middleware") return this.status = 500, false;
    let a = await k(r, this.reqCtx, { path: this.path, searchParams: this.searchParams, headers: this.headers, status: this.status });
    return this.middlewareInvoked.push(t), a.status === 500 ? (this.status = a.status, false) : (this.processMiddlewareResp(a), true);
  }
  applyRouteOverrides(t) {
    !t.override || (this.status = void 0, this.headers.normal = new Headers(), this.headers.important = new Headers());
  }
  applyRouteHeaders(t, r, a) {
    !t.headers || (g(this.headers.normal, t.headers, { match: r, captureGroupKeys: a }), t.important && g(this.headers.important, t.headers, { match: r, captureGroupKeys: a }));
  }
  applyRouteStatus(t) {
    !t.status || (this.status = t.status);
  }
  applyRouteDest(t, r, a) {
    if (!t.dest) return this.path;
    let n = this.path, o = t.dest;
    this.wildcardMatch && /\$wildcard/.test(o) && (o = o.replace(/\$wildcard/g, this.wildcardMatch.value)), this.path = v(o, r, a);
    let s = /\/index\.rsc$/i.test(this.path), c = /^\/(?:index)?$/i.test(n), i = /^\/__index\.prefetch\.rsc$/i.test(n);
    s && !c && !i && (this.path = n);
    let p = /\.rsc$/i.test(this.path), l = /\.prefetch\.rsc$/i.test(this.path), y = this.path in this.output;
    p && !l && !y && (this.path = this.path.replace(/\.rsc/i, ""));
    let T = new URL(this.path, this.url);
    return m(this.searchParams, T.searchParams), w(this.path) || (this.path = T.pathname), n;
  }
  applyLocaleRedirects(t) {
    if (!t.locale?.redirect || !/^\^(.)*$/.test(t.src) && t.src !== this.path || this.headers.normal.has("location")) return;
    let { locale: { redirect: a, cookie: n } } = t, o = n && this.cookies[n], s = A(o ?? ""), c = A(this.reqCtx.request.headers.get("accept-language") ?? ""), l = [...s, ...c].map((y) => a[y]).filter(Boolean)[0];
    if (l) {
      !this.path.startsWith(l) && (this.headers.normal.set("location", l), this.status = 307);
      return;
    }
  }
  getLocaleFriendlyRoute(t, r) {
    return !this.locales || r !== "miss" ? t : G(t.src, this.locales) ? { ...t, src: t.src.replace(/\/\(\.\*\)\$$/, "(?:/(.*))?$") } : t;
  }
  async checkRoute(t, r) {
    let a = this.getLocaleFriendlyRoute(r, t), { routeMatch: n, routeDest: o } = this.checkRouteMatch(a, { checkStatus: t === "error", checkIntercept: t === "rewrite" }) ?? {}, s = { ...a, dest: o };
    if (!n?.match || s.middlewarePath && this.middlewareInvoked.includes(s.middlewarePath)) return "skip";
    let { match: c, captureGroupKeys: i } = n;
    if (this.applyRouteOverrides(s), this.applyLocaleRedirects(s), !await this.runRouteMiddleware(s.middlewarePath)) return "error";
    if (this.body !== void 0 || this.headers.middlewareLocation) return "done";
    this.applyRouteHeaders(s, c, i), this.applyRouteStatus(s);
    let l = this.applyRouteDest(s, c, i);
    if (s.check && !w(this.path)) if (l === this.path) {
      if (t !== "miss") return this.checkPhase(O(t));
      this.status = 404;
    } else if (t === "miss") {
      if (!(this.path in this.output) && !(this.path.replace(/\/$/, "") in this.output)) return this.checkPhase("filesystem");
      this.status === 404 && (this.status = void 0);
    } else return this.checkPhase("none");
    return !s.continue || s.status && s.status >= 300 && s.status <= 399 ? "done" : "next";
  }
  async checkPhase(t) {
    if (this.checkPhaseCounter++ >= 50) return console.error(`Routing encountered an infinite loop while checking ${this.url.pathname}`), this.status = 500, "error";
    this.middlewareInvoked = [];
    let r = true;
    for (let o of this.routes[t]) {
      let s = await this.checkRoute(t, o);
      if (s === "error") return "error";
      if (s === "done") {
        r = false;
        break;
      }
    }
    if (t === "hit" || w(this.path) || this.headers.normal.has("location") || !!this.body) return "done";
    if (t === "none") for (let o of this.locales) {
      let s = new RegExp(`/${o}(/.*)`), i = this.path.match(s)?.[1];
      if (i && i in this.output) {
        this.path = i;
        break;
      }
    }
    let a = this.path in this.output;
    if (!a && this.path.endsWith("/")) {
      let o = this.path.replace(/\/$/, "");
      a = o in this.output, a && (this.path = o);
    }
    if (t === "miss" && !a) {
      let o = !this.status || this.status < 400;
      this.status = o ? 404 : this.status;
    }
    let n = "miss";
    return a || t === "miss" || t === "error" ? n = "hit" : r && (n = O(t)), this.checkPhase(n);
  }
  async run(t = "none") {
    this.checkPhaseCounter = 0;
    let r = await this.checkPhase(t);
    return this.headers.normal.has("location") && (!this.status || this.status < 300 || this.status >= 400) && (this.status = 307), r;
  }
};
async function ee(e, t, r, a) {
  let n = new C(t.routes, r, e, a, t.wildcard), o = await te(n);
  return Se(e, o, r);
}
__name(ee, "ee");
async function te(e, t = "none", r = false) {
  return await e.run(t) === "error" || !r && e.status && e.status >= 400 ? te(e, "error", true) : { path: e.path, status: e.status, headers: e.headers, searchParams: e.searchParams, body: e.body };
}
__name(te, "te");
async function Se(e, { path: t = "/404", status: r, headers: a, searchParams: n, body: o }, s) {
  let c = a.normal.get("location");
  if (c) {
    if (c !== a.middlewareLocation) {
      let l = [...n.keys()].length ? `?${n.toString()}` : "";
      a.normal.set("location", `${c ?? "/"}${l}`);
    }
    return new Response(null, { status: r, headers: a.normal });
  }
  let i;
  if (o !== void 0) i = new Response(o, { status: r });
  else if (w(t)) {
    let l = new URL(t);
    m(l.searchParams, n), i = await fetch(l, e.request);
  } else i = await k(s[t], e, { path: t, status: r, headers: a, searchParams: n });
  let p = a.normal;
  return g(p, i.headers), g(p, a.important), i = new Response(i.body, { ...i, status: r || i.status, headers: p }), i;
}
__name(Se, "Se");
u();
d();
h();
function ae() {
  globalThis.__nextOnPagesRoutesIsolation ??= { _map: /* @__PURE__ */ new Map(), getProxyFor: Ce };
}
__name(ae, "ae");
function Ce(e) {
  let t = globalThis.__nextOnPagesRoutesIsolation._map.get(e);
  if (t) return t;
  let r = Ee();
  return globalThis.__nextOnPagesRoutesIsolation._map.set(e, r), r;
}
__name(Ce, "Ce");
function Ee() {
  let e = /* @__PURE__ */ new Map();
  return new Proxy(globalThis, { get: /* @__PURE__ */ __name((t, r) => e.has(r) ? e.get(r) : Reflect.get(globalThis, r), "get"), set: /* @__PURE__ */ __name((t, r, a) => Me.has(r) ? Reflect.set(globalThis, r, a) : (e.set(r, a), true), "set") });
}
__name(Ee, "Ee");
var Me = /* @__PURE__ */ new Set(["_nextOriginalFetch", "fetch", "__incrementalCache"]);
var Ie = Object.defineProperty;
var Le = /* @__PURE__ */ __name((...e) => {
  let t = e[0], r = e[1], a = "__import_unsupported";
  if (!(r === a && typeof t == "object" && t !== null && a in t)) return Ie(...e);
}, "Le");
globalThis.Object.defineProperty = Le;
globalThis.AbortController = class extends AbortController {
  constructor() {
    try {
      super();
    } catch (t) {
      if (t instanceof Error && t.message.includes("Disallowed operation called within global scope")) return { signal: { aborted: false, reason: null, onabort: /* @__PURE__ */ __name(() => {
      }, "onabort"), throwIfAborted: /* @__PURE__ */ __name(() => {
      }, "throwIfAborted") }, abort() {
      } };
      throw t;
    }
  }
};
var ja = { async fetch(e, t, r) {
  ae(), Y();
  let a = await __ALSes_PROMISE__;
  if (!a) {
    let s = new URL(e.url), c = await t.ASSETS.fetch(`${s.protocol}//${s.host}/cdn-cgi/errors/no-nodejs_compat.html`), i = c.ok ? c.body : "Error: Could not access built-in Node.js modules. Please make sure that your Cloudflare Pages project has the 'nodejs_compat' compatibility flag set.";
    return new Response(i, { status: 503 });
  }
  let { envAsyncLocalStorage: n, requestContextAsyncLocalStorage: o } = a;
  return n.run({ ...t, NODE_ENV: "production", SUSPENSE_CACHE_URL: N }, async () => o.run({ env: t, ctx: r, cf: e.cf }, async () => {
    if (new URL(e.url).pathname.startsWith("/_next/image")) return K(e, { buildOutput: x, assetsFetcher: t.ASSETS, imagesConfig: _.images });
    let c = q(e);
    return ee({ request: c, ctx: r, assetsFetcher: t.ASSETS }, _, x, f);
  }));
} };
export {
  ja as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=bundledWorker-0.23951190156148683.mjs.map
