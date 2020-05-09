const publicValidKey = 'BPZR6FMp_VIo0nsudQ-B_F9V759wbDYsVMk_lqzpofSiRH2fON-udB3-cUQDBWtfWfh0mScjLQL4akwolSYobuM';
if('serviceWorker' in navigator){
    send().catch(err=>console.error(err));
}

//Register service worker, Register Push , Send Push
async function send(){
    //register service worker
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope : '/'
    });
    console.log('service worker registered');

    //register push
    console.log('registering push');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly : true,
        applicationServerKey : urlBase64ToUint8Array(publicValidKey)
    });

    console.log('Push registered');
    await fetch('/subscribe', {
        method : "POST",
        body : JSON.stringify(subscription),
        headers : {
            'content-type' : 'application/json'
        }
    });

    console.log('Push Sent')
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }