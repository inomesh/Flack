// this file is for checking and 
// setting service worker only.

if (!('serviceWorker' in navigator)){
    console.log("service worker not supported");
    // return 
};

window.addEventListener('load',()=>{

    navigator.serviceWorker.register('/service-worker.js',{
        scope: '/'
    })
    .then(function(registeration){
        console.log("SW is registered! this scope is ",registeration.scope);
    })
    .catch(function(error){
        console.error(error)
    })

})

