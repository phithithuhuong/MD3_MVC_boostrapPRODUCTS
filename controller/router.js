const productHandle = require('./handle/productHandle')
const user_router = require('./router/user_router');
const product_router = require('./router/product_router');
const buyProduct_router = require('./router/buyProduct_router')
const router = {
    '/home': productHandle.home,
}
let router_menu = {...router, ...user_router,...product_router,...buyProduct_router};

module.exports = router_menu