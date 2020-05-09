console.log('service worker loaded');
self.addEventListener('push', (event)=>{
    const data = event.data.json();
    console.log('push Received');
    self.registration.showNotification(data.title , {
        body : "Notified by Rajendera",
        icon : "../../Parallax/hats.jpeg"
    });
})