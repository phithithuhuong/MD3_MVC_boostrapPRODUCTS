const buyHandle = require('../handle/buyHandle');
const buy_router = {
    '/buy/list': buyHandle.listBuy,
    '/buy/now':buyHandle.buyNow,
};
module.exports = buy_router