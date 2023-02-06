const http= require('http');
const url =require('url')
const notFound = require('./controller/handle/notFoundHandle')
const router = require('./controller/router')
http.createServer((req, res) => {
    let urlParse = url.parse(req.url);
    let path = urlParse.pathname
    let chooseHandle;
   if ( typeof router[path]==='undefined'){
      chooseHandle = notFound
   } else {
       chooseHandle = router[path]
   }
   chooseHandle(req,res)

}).listen(3030,()=>{
    console.log('Server is running  http://localhost:3030/home')
})