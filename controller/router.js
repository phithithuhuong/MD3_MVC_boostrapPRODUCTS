const productHandle = require('./handle/productHandle')
const user_router = require('./router/customer_router');
const product_router = require('./router/product_router');
const buy_router = require('./router/buy_router')
const router = {
    '/home': productHandle.home,
}
let router_menu = {...router, ...user_router,...product_router,...buy_router};

module.exports = router_menu