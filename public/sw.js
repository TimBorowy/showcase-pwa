importScripts("./localforage.js")
const staticCacheName = 'showcase-static-v1'
let urlsToCache = [
  '/',
  '/styles/main.css',
  '/js/app.js',
  'js/chunk-vendors.js',
  '/manifest.json',
  '/img/192.png',
  '/img/512.png',
  '/img/icons/favicon-16x16.png',
  '/img/icons/favicon-32x32.png',
  '/css/font.css',
  '/fonts/material-icons.woff2',
  '/fonts/roboto-v20-latin-regular.eot?#iefix',
  '/fonts/roboto-v20-latin-regular.woff2',
  '/fonts/roboto-v20-latin-regular.woff',
  '/fonts/roboto-v20-latin-regular.ttf',
  '/fonts/roboto-v20-latin-regular.svg#Roboto',
  './localforage.js',
  '/fallback.json',
  '/img/fallback.jpg',
];

self.addEventListener('install', function (event) {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url)

  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(req))
  } else if (url.pathname === "/api/projects/tags/") {
    event.respondWith(networkOnly(req))
  } else if (url.pathname.match(/\/api\/projects\//g) != null && url.pathname != "/api/projects/") {
    event.respondWith(indexedApi(req))
  } else {
    event.respondWith(networkFirst(req))
  }
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          // Delete all cache exept static appshell on worker activation
          return cacheName != staticCacheName
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
})

async function cacheFirst(req) {
  const cachedResponse = await caches.match(req)
  return cachedResponse || fetch(req)
}

async function networkFirst(req) {
  const dynamicCache = await caches.open('showcase-dynamic-v1');

  try {
    const res = await fetch(req)
    dynamicCache.put(req, res.clone())
    return res
  } catch (error) {
    const cachedRes = await dynamicCache.match(req)
    return cachedRes
  }
}

async function networkOnly(req) {
  try {
    const res = await fetch(req)
    return res
  } catch (error) {
    return error
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
