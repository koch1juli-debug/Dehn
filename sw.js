// Offline-Speicher der App. Bei neuer Version die Zahl hochzählen.
const V="dehn-v4";
const FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png","bilder/nach-oben-greifen.png","bilder/zehen-beruehren.png","bilder/brustoeffner.png","bilder/seitlicher-ausfallschritt.png","bilder/ausfallschritt.png","bilder/kindeshaltung.png","bilder/thunderbolt.png","bilder/taube.png","bilder/sitzender-twist.png","bilder/knie-zur-brust.png","bilder/figur-vier-liegend.png","bilder/oberschenkelrueckseite-liegend.png","bilder/zurueckgelegter-schmetterling.png","bilder/wirbelsaeulen-twist.png","bilder/oberschenkel-streckung.png","bilder/schmetterling.png","bilder/sitzend-zusammenfalten.png","bilder/pflug.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(FILES.map(f=>c.add(f).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// Mit Netz: aktuelle Dateien holen und merken. Ohne Netz: gespeicherte Dateien nutzen.
self.addEventListener("fetch",e=>{
if(e.request.method!=="GET")return;
e.respondWith(fetch(e.request).then(r=>{if(r&&r.ok){const c=r.clone();caches.open(V).then(h=>h.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(m=>m||caches.match("index.html"))))});
