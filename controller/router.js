const productHandle = require('./handle/productHandle')
const user_router = require('./router/customer_router');
const product_router = require('./router/product_router');
const buy_router = require('./router/buy_router');
const admin_router = require('./router/admin_router')
const router = {
    '/home': productHandle.home,
    '/introduce': productHandle.introduce,
}
let router_menu = {...router, ...user_router, ...product_router, ...buy_router, ...admin_router};
console.log(router_menu)
module.exports = router_menu