let urlsToCache = [
    '/',
    '/styles/main.css',
    '/js/app.js',
    'js/chunk-vendors.js',
    'manifest.json',
];

self.addEventListener("install", async event => {
    const cache = await caches.open('showcase-static');
    cache.addAll(urlsToCache)
})

self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url)

    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req))
    } else {
        event.respondWith(networkFirst(req))
    }
})

async function cacheFirst(req) {
    const cachedResponse = await caches.match(req)
    return cachedResponse || fetch(req)
}

async function networkFirst(req) {
    const dynamicCache = await caches.open('showcase-dynamic');
    try {
        const res = await fetch(req)
        dynamicCache.put(req, res.clone())
        return res
    } catch (error) {
        return await dynamicCache.match(req)
    }
}
