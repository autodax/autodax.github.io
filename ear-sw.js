// The Ear Trainer moved to https://autodax.github.io/ear/. This leftover file only exists so
// phones that still have the old service worker clear its saved copy and remove it.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('ear-app-')) await caches.delete(k);
    await self.registration.unregister();
  })());
});
