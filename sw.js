const CACHE_NAME = "rompecabezas-jjcf";

self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll([
            './',
            //'./index.html',
            './js/scripts.js',
            './css/style.css'
        ]);
    })());
});

self.addEventListener('fetch',event => {
    event.respondWith((async () =>{
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);

        if(cachedResponse){
            return cachedResponse;
        }else{
            try{
                const fetchResponse = await fetch(event.request);
                cache.put(event.request,fetchResponse.close());
                return fetchResponse;
            }catch(e){
                //Hubo problemas de red de datos.
            }
        }
    })());
});