const customerHandle = require('../handle/customerHandle');
const customer_router  = {
    '/signup': customerHandle.signup,
    '/login': customerHandle.login,
    '/logout':customerHandle.logout,
    '/edit-password': customerHandle.editPassword,
};
module.exports = customer_router