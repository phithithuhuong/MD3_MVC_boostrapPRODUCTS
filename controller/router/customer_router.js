const customerHandle = require('../handle/customerHandle');
const customer_router  = {
    '/signup': customerHandle.signup,
    '/login': customerHandle.login,
    '/logout':customerHandle.logout,
};
module.exports = customer_router