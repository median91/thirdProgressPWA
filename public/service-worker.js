importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
console.log(`Workbox Berhasil Dimuat`);
else
console.log(`Workbox Gagal`);

workbox.precaching.precacheAndRoute([
  {url:"/", revision: "1"},
  {url:"/manifest.json", revision: "1"},
  {url:"/nav.html", revision: "1"},
  {url:"/index.html", revision: "1"},
  {url:"/kelompok.html", revision: "1"},
  {url:"/tims.html", revision: "1"},
  {url:"/pages/home.html", revision: "1"},
  {url:"/pages/about.html", revision: "1"},
  {url:"/pages/saved.html", revision: "1"},
  {url:"/pages/tims.html", revision: "1"},
  {url:"/css/materialize.min.css", revision: "1"},
  {url:"/js/materialize.min.js", revision: "1"},
  {url:"/js/api.js", revision: "1"},
  {url:"/js/nav.js", revision: "1"},
  {url:"/js/db.js", revision: "1"},
  {url:"/js/idb.js", revision: "1"},
  {url:"/js/push.js", revision: "1"},
  {url:"/mask_icon.png", revision: "1"},
  {url:"/maskable_icon.png", revision: "1"},
  {url:"/notification.png", revision: "1"}
], {
  ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com/,
  workbox.strategies.staleWhileRevalidate({
  cachename: 'google-fonts-stylesheets',
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org\/v2\//,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'football-data',
  })
);

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: '/notification.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });
