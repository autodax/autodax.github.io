/* Ear Trainer offline support. Serves ear.html, its icons and the piano sounds from the phone's storage
   when there is no signal, and keeps them fresh when there is. It ignores every other page on this site. */
const APP = 'ear-app-v1';            // ear.html, manifest, icons
const SAMPLES = 'music-samples-v2';  // piano sounds (same cache the app itself uses)
const NOTES = [21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78,81,84,87,90,93,96,99,102,105,108];
const PAGES = ['/ear.html', '/ear/manifest.json', '/ear/icon-180.png', '/ear/icon-512.png'];
const WAIT_MS = 3000;                // how long to wait for the network before using the saved copy

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const app = await caches.open(APP);
    await Promise.all(PAGES.map(async u => { try { await app.add(new Request(u, {cache:'reload'})); } catch(_){} }));
    const smp = await caches.open(SAMPLES);
    await Promise.all(NOTES.map(async n => { const u = `/ear/piano/${n}.m4a`;
      try { if (!(await smp.match(u))) await smp.add(u); } catch(_){} }));
    self.skipWaiting();
  })());
});
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

// Network first (so updates arrive), but fall back to the saved copy when offline or too slow.
function networkFirst(e, key){
  return (async () => {
    const cache = await caches.open(APP);
    const net = fetch(e.request, {cache:'no-store'}).then(async r => { if (r && r.ok) await cache.put(key, r.clone()); return r; });
    e.waitUntil(net.catch(() => {}));   // keep refreshing the saved copy even after a slow answer
    const slow = new Promise(res => setTimeout(() => res(null), WAIT_MS));
    try { const r = await Promise.race([net, slow]); if (r) return r; } catch(_){}
    const hit = await cache.match(key);
    return hit || net;
  })();
}

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  const p = url.pathname;
  if (p === '/ear.html') return e.respondWith(networkFirst(e, '/ear.html'));
  if (p === '/ear/manifest.json' || p === '/ear/icon-180.png' || p === '/ear/icon-512.png') return e.respondWith(networkFirst(e, p));
  if (p.startsWith('/ear/piano/')) return e.respondWith((async () => {
    const cache = await caches.open(SAMPLES), hit = await cache.match(p);
    if (hit) return hit;
    const r = await fetch(req); if (r && r.ok) cache.put(p, r.clone()); return r;
  })());
  // anything else (the other apps on this site) is left alone
});
