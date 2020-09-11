self.addEventListener('install', function(event){
    console.log('Service Worker Installed');
    event.waitUntil(
    caches.open('static')
        .then(function(cache) {
        // cache.add('/')
        // cache.add('/index.html')
        // cache.add('/src/js/app.js');
        cache.addAll([
            '/',
            '/index.html',
            '/src/js/app.js',
            '/src/images/pwa.jpg',
            '/src/images/logo-wa.png',
            '/src/images/wa-bg.png',
            '/src/images/wa-gif.gif',
            '/src/images/sun.png',
            'https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@600&family=Roboto:wght@500&display=swap',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
            'https://fonts.googleapis.com/css?family=Raleway:400,700',
            'src/css/app.css'
            ]);
        })
    );   
});

self.addEventListener('activate', function(){
    console.log('Service Worker Activated')
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
        .then((res)=>{
            if(res) {
                return res;
            } else {
               return fetch(event.request);
            }
        })
    );
});