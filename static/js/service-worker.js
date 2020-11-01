const CACHE_NAME = 'static-cache';
const urlsToCache = [
    '/',
    '/allchannels',
    '/static/css/homepage.css',
    '/static/css/index.css',
    '/static/css/mobile.css',
    '/static/css/chat.css',
    '/static/css/sidebar.css',
    '/static/js/functions.js',
    '/static/js/hashtag.js',
    '/static/js/localStorage.js',
    '/static/js/main.js',
    '/static/js/socket.js',
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


// self.addEventListener('activate',event => {

//     event.waitUntil()

// })



self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
  
          return fetch(event.request).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              let responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  });




