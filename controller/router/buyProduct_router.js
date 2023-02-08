const buyProducts = require('../handle/buyProducts');
const buyProduct_router = {
    '/buy/show': buyProducts.listBuy,
}
module.exports = buyProduct_router