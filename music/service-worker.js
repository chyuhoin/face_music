if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return c[e]||(s=new Promise(async s=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=s}else importScripts(e),s()})),s.then(()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]})},s=(s,c)=>{Promise.all(s.map(e)).then(e=>c(1===e.length?e[0]:e))},c={require:Promise.resolve(s)};self.define=(s,a,r)=>{c[s]||(c[s]=Promise.resolve().then(()=>{let c={};const d={uri:location.origin+s.slice(1)};return Promise.all(a.map(s=>{switch(s){case"exports":return c;case"module":return d;default:return e(s)}})).then(e=>{const s=r(...e);return c.default||(c.default=s),c})}))}}define("./service-worker.js",["./workbox-b4c2a21b"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/css/AdminData.9a9f7f44.css",revision:"8eca9b8f6f9067317d40b66e2913722b"},{url:"/css/AdminMusic.87dd8a4e.css",revision:"5a14ad895a935a58e81c488d32aa3db9"},{url:"/css/AdminUser.9074b23c.css",revision:"9a383e570b286b30ac1644e31d548aff"},{url:"/css/Mv.fad850d5.css",revision:"b40f9bea7b0d2808fb345dcd2d35d269"},{url:"/css/Mvs.f32935d9.css",revision:"6da4906c15b0652c09f572cc6c879156"},{url:"/css/PlaylistDetail.e5c0ad93.css",revision:"47b1abf2280e379c7dee8dac03f84340"},{url:"/css/Playlists.d57dbcf4.css",revision:"acd4b1f5546a35bce2e7b580268f43c3"},{url:"/css/Search.1f275ae2.css",revision:"b065fd3b862f2fedea17b48b5c12b3b2"},{url:"/css/SearchMvs.d91be546.css",revision:"6cb21519043ea37c5da6b10b66f141a3"},{url:"/css/SearchPlaylists.ac7d41bb.css",revision:"4069ac7297280988ce9b775552901592"},{url:"/css/SearchSongs.b3177a33.css",revision:"c8e26c0abf989b8f2ddd6f0bb07e3dac"},{url:"/css/Songs.767cc30c.css",revision:"d1ce4363d73f7e4c6883d953e1e031d5"},{url:"/css/app.e45b09a4.css",revision:"ce49cef198e4890cb4d6e4ffdbb65a1b"},{url:"/css/chunk-vendors.e19c045b.css",revision:"ee46dd14a6faa4ee663e30f12b83a354"},{url:"/favicon.ico",revision:"fb0bfa066d55c810f2239addad12a06b"},{url:"/fonts/element-icons.535877f5.woff",revision:"535877f50039c0cb49a6196a5b7517cd"},{url:"/fonts/element-icons.732389de.ttf",revision:"732389ded34cb9c52dd88271f1345af9"},{url:"/img/play-bar.e5a7a142.png",revision:"e5a7a1420384639f27927dd0b5e64edb"},{url:"/index.html",revision:"3a00fd98b004730df98b35dcd574bd29"},{url:"/js/AdminData.32335f5f.js",revision:"2979e4ad3d0063482dcc8af6e243265b"},{url:"/js/AdminMusic.04cdd82d.js",revision:"44aff24e1979decfa03f8039a87b6314"},{url:"/js/AdminUser.0e05de73.js",revision:"894da27ea66e811bb92ef63aa4e8967d"},{url:"/js/Discovery.75a4d108.js",revision:"1055ad8134b9f3773090020ab04d0dc5"},{url:"/js/Mv.21a1b952.js",revision:"49b07cc9bf5f44aab5f07ac83890336f"},{url:"/js/Mvs.7fcaed33.js",revision:"c83063d043e62ed3ae7261cdafa5945c"},{url:"/js/PlaylistDetail.931dd6f9.js",revision:"7f603f065be35c70deb13ae74df61d03"},{url:"/js/Playlists.487fc234.js",revision:"cd21124cd0c09c97a331989a4964582a"},{url:"/js/Search.4dcb55f1.js",revision:"83a8ad9e015c84e31722d13e333a692b"},{url:"/js/SearchMvs.8244ada5.js",revision:"e24720a8aaa4e7fbf8ac0e27093dfaee"},{url:"/js/SearchPlaylists.ad3349f3.js",revision:"aa18ce948bb9c5894f165ad3651d9a4e"},{url:"/js/SearchSongs.b1b5143c.js",revision:"7765b7894cd9b6d9c2cd5710f890d83b"},{url:"/js/Songs.80a0255a.js",revision:"2d51f80b88e85a9628123ee4e00425c1"},{url:"/js/app.a75867e8.js",revision:"f2c7b083d2063f09558742dbed524794"},{url:"/js/chunk-vendors.706ecda0.js",revision:"d93d866b378611c72a6e5269835442ef"}],{})}));
