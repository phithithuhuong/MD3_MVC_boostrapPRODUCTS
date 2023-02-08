const userHandle = require('../handle/usersHandle');
const user_router  = {
    '/signup': userHandle.signup,
    '/login': userHandle.login,
    '/logout':userHandle.logout,
};
module.exports = user_router