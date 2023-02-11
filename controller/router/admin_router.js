const adminHandle = require('../handle/adminHandle');
const admin_router = {
    '/admin-login': adminHandle.loginAdmin,
};
module.exports = admin_router