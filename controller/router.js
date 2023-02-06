const productHandle = require('./handle/productHandle')
const userHandle = require('./handle/usersHandle')

const router = {
    '/home': productHandle.home,
    '/signup': userHandle.signup,
    '/login': userHandle.login,
    '/list': productHandle.list,
    '/create': productHandle.create,
    '/delete':productHandle.remove,
    '/edit': productHandle.edit

}
module.exports = router