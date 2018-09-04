importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

const bgSyncPlugin = new workbox.backgroundSync.Plugin('todoQueue', {
  maxRetentionTime: 24 * 60
});

workbox.routing.registerRoute(
  /\.(?:js|css|html)$/,
  workbox.strategies.networkFirst()
)

workbox.routing.registerRoute(
  'http://localhost:3000',
  workbox.strategies.networkFirst()
)

workbox.routing.registerRoute(
  'http://localhost:8000/todos',
  workbox.strategies.networkFirst(),
  'GET'
)

workbox.routing.registerRoute(
  'http://localhost:8000/todos',
  workbox.strategies.networkFirst({
    plugins: [bgSyncPlugin]
  }),
  'POST'
)
