const CACHE_NAME = 'static-cache';
const urlsToCache = [
    '/',
    '/allchannels',
    '/static/css/homepage.css',
    '/login',
    '/chat',
    '/static/css/index.css',
    '/static/css/mobile.css',
    '/static/css/chat.css',
    '/static/css/sidebar.css',
    '/static/js/functions.js',
    '/static/js/hashtag.js',
    '/static/js/localStorage.js',
    '/static/js/main.js',
    '/static/js/socket.js',
    '/offline.html',
]

self.addEventListener('install', function(event){

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(function(cache){
            return cache.addAll(urlsToCache)
        })
        .then(()=>{
           return self.skipWaiting();
        })
    )
});


self.addEventListener('activate',event => {

    event.waitUntil(
      caches.keys().then( keyList => {
        return Promise.all(keyList.map( key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        }))
      })
    )
    return self.clients.claim();
});


self.addEventListener('fetch', event => {

  event.respondWith(

    caches.match(event.request)
    .then( response => {
      return response || fetch(event.request)
    })
    .catch( ()=>{
      return caches.match('/offline.html')
    })
  )
})