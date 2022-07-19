//check for service worker support
if ('serviceWorker' in navigator) {
  try {
    await navigator.serviceWorker.register('../worker.js')
    console.log('Service Worker Registered')
  } catch (err) {
    console.log(err, 'Service Worker Failed to Register')
  }
}
