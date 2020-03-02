importScripts("./localforage.js")

let urlsToCache = [
    '/',
    '/styles/main.css',
    '/js/app.js',
    'js/chunk-vendors.js',
    '/manifest.json',
    '/192.png',
    '/512.png',
    '/img/icons/favicon-16x16.png',
    '/img/icons/favicon-32x32.png',
    'http://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons',
    './localforage.js',
    '/fallback.json',
    '/img/fallback.jpg',
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

    } else if (url.pathname.match(/\/api\/projects\//g) != null && url.pathname != "/api/projects/") {
        // matches only project detail pages
        event.respondWith(indexedApi(req))
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
        const cachedRes = await dynamicCache.match(req)
        return cachedRes
    }
}

async function indexedApi(req) {
    try {
        const res = await fetch(req)

        localforage.setItem(req.url, res.clone().json()).catch((err) => {
            console.error(err);
        })
        return res

    } catch (error) {
        const indexedRes = await localforage.getItem(req.url)
        if (indexedRes) {
            return new Response(indexedRes)
        } else {
            return await caches.match('./fallback.json')
        }
    }
}
