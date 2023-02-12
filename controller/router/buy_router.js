const buyHandle = require('../handle/buyHandle');
const buy_router = {
    '/buy/list': buyHandle.listBuy,
    '/buy/now':buyHandle.buyNow,
    '/buy/cart': buyHandle.cart,
    '/cart': buyHandle.listCart,
};
module.exports = buy_router