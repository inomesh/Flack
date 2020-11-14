const CACHE_NAME = "static-cache";
const urlsToCache = [
  "/",
  "/allchannels",
  "/login",
  "/chat",
  "/static/css/index.css",
  "/static/css/homepage.css",
  "/static/css/mobile.css",
  "/static/css/chat.css",
  "/static/css/sidebar.css",
  "/static/js/functions.js",
  "/static/js/hashtag.js",
  "/static/js/localStorage.js",
  "/static/js/main.js",
  "/static/site.webmanifest",
  "/offline.html",

  // images
  "static/images/android-chrome-192x192.png",
  "static/images/android-chrome-512x512.png",
  "static/images/chat-background.jpg",
  "static/images/Create_user.png",
  "static/images/favicon-16x16.png",
  "static/images/favicon-32x32.png",
  "static/images/homepage0.jpg",
  "static/images/image.jpg",
  "static/images/image2.jpg",
  "static/images/image3.jpg",
  "static/images/image4.jpg",
  "static/images/image5.jpg",
  "static/images/IT-slack.png",
  "static/images/secure_login.png",
  "static/images/slack_logo.png",
  "static/images/slack1.jpg",
  "static/images/team_work.png",
  "static/images/texture.png",
  "static/images/wavingHandEmoji.png",

  // bootstrap cdn
  "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js",

  // font awesome
  'https://kit.fontawesome.com/2ede387783.js',
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  return self.clients.claim();
});

// self.addEventListener("fetch", async (event) => {
//   // Let the browser do its default thing
//   // for non-GET requests.
//   if (event.request.method != "GET") return;

//   event.respondWith(
//     caches
//       .match(event.request)
//       .then((response) => {
//         return (
//           response ||
//           fetch(event.request).then((e) => {
//             console.log(e);
//           })
//         );
//       })
//       .catch(() => {
//         return caches.match("/offline.html");
//       })
//   );
// });

self.addEventListener("fetch", function (event) {

  let req = new Request(event.request.url, {
    method: event.request.method,
    headers: event.request.headers,
    mode: event.request.mode == "navigate" ? "cors" : event.request.mode,
    credentials: event.request.credentials,
    redirect: event.request.redirect == 'manual' ? "follow" : event.request.redirect,
  });

  if (req.method === 'POST') {
    return req
  }

  if (event.request.url.startsWith('https://ka-f.fontawesome.com')) {
    req.mode = 'cors'
    return fetch(req)
  }

  event.respondWith(
    caches
      .match(req)

      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(req).then(function (response) {
          // Check if we received a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.

          if (
            !req.startsWith("http://127.0.0.1:5000/socket.io/")
          ) {
            let responseToCache = response.clone();

            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(req, responseToCache);
            });
          }

          return response;
        });
      })
      .catch(() => {
        return caches.match("/offline.html");
      })
  );
});
