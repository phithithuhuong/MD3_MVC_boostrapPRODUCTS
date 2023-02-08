const http= require('http');
const url =require('url')
const notFound = require('./controller/handle/notFoundHandle')
const router_menu = require('./controller/router')
http.createServer((req, res) => {
    let urlParse = url.parse(req.url);
    let path = urlParse.pathname
    let chooseHandle;
   if ( typeof router_menu[path]==='undefined'){
      chooseHandle = notFound
   } else {
       chooseHandle = router_menu[path]
   }
   chooseHandle(req,res)

}).listen(3030,()=>{
    console.log('Server is running  http://localhost:3030/home')
})
