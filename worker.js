const cacheAssets = [
  '/',
  '/index.html',
  '/meta',
  '/styles',
  '/styles/index.css',
  '/styles/login.css',
  '/styles/main.css',
  '/styles/register.css',
  '/styles/reset.css',
  '/styles/utility.css',
  '/styles/assets/android-chrome-192x192.png',
  '/styles/assets/android-chrome-512x512.png',
  '/styles/assets/apple-touch-icon-114x114.png',
  '/styles/assets/apple-touch-icon-120x120.png',
  '/styles/assets/apple-touch-icon-144x144.png',
  '/styles/assets/apple-touch-icon-152x152.png',
  '/styles/assets/apple-touch-icon-180x180.png',
  '/styles/assets/apple-touch-icon-57x57.png',
  '/styles/assets/apple-touch-icon-60x60.png',
  '/styles/assets/apple-touch-icon-72x72.png',
  '/styles/assets/apple-touch-icon-76x76.png',
  '/styles/assets/apple-touch-icon.png',
  '/styles/assets/favicon-16x16.png',
  '/styles/assets/favicon-32x32.png',
  '/styles/assets/favicon.ico',
  '/styles/assets/icon.png',
  '/styles/assets/mstile-144x144.png',
  '/styles/assets/mstile-150x150.png',
  'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap',
]
const cacheName = 'todo-v1'
const cacheDName = 'dynamic-todo-v1'
//get the install event
self.addEventListener('install', (event) => {
  //cache all html, css, js and image files
  event.waitUntil(async () => {
    const cache = await caches.open(cacheName)
    await cache.addAll(cacheAssets)
  })
})
//get the activate event
self.addEventListener('activate', (event) => {})
//get the fetch event
self.addEventListener('fetch', (event) => {
  event.waitUntil(async () => {
    const cache = await caches.open(cacheName)
    const response = await cache.match(event.request)
    if (response) {
      event.respondWith(response)
    } else {
      const eventResponse = await fetch(event.request)
      const cacheD = await caches.open(cacheDName)
      cacheD.put(event.request, eventResponse.clone())
      return eventResponse
    }
  })
})
