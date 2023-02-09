const buyHandle = require('../handle/buyHandle');
const buy_router = {
    '/buy/list': buyHandle.listBuy,
};
module.exports = buy_router