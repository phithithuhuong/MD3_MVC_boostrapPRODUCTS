const productHandle = require('../handle/productHandle');
const product_router = {
    '/list': productHandle.list,
    '/create': productHandle.create,
    '/delete': productHandle.remove,
    '/edit': productHandle.edit,
};
module.exports= product_router