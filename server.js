const http = require('http');
const url = require('url')
const notFound = require('./controller/handle/notFoundHandle')
const router_menu = require('./controller/router')
const fs = require("fs");
let mimeTypes = {
    'jpg': 'images/jpg',
    'png': 'images/png',
    'js': 'text/javascript',
    'css': 'text/css',
    'svg': 'image/svg+xml',
    'ttf': 'font/ttf',
    'woff': 'font/woff',
    'woff2': 'font/woff2',
    'eot': 'application/vnd.ms-fontobject',
    'jfif': 'image/jpeg'
}
http.createServer((req, res) => {
    let urlParse = url.parse(req.url);
    let path = urlParse.pathname
    const filesDefences = path.match(/\.js|\.css|\.png|\.svg|\.jpg|\.ttf|\.woff|\.woff2|\.eot|\.jfif/);
    if (filesDefences) {
        const extension = mimeTypes[filesDefences[0].toString().split('.')[1]];
        res.writeHead(200, {'Content-Type': extension});
        fs.createReadStream(__dirname + req.url).pipe(res)
    } else {
        let chooseHandle;
        if (typeof router_menu[path] === 'undefined') {
            chooseHandle = notFound
        } else {
            chooseHandle = router_menu[path]
        }
        chooseHandle(req, res)
    }


}).listen(3031, () => {
    console.log('Server is running  http://localhost:3031/admin-login')
});
