const connection = require('../model/connection');
connection.connecting();

class UserService {
    static signup(user) {
        let connect = connection.getConnect();
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO productstore.users (name, birthday, address, password, email, phone)
                       VALUES ('${user.name}', '${user.birthday}', '${user.address}', '${user.password}', '${user.email}
                               ', '${user.phone}')`
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    static login(user) {
        let connect = connection.getConnect();
        return new Promise((resolve, reject) => {
            let sql = ` SELECT *
                        FROM productstore.users
                        WHERE email = '${user.email}'
                          and password = '${user.password}'`
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

}

module.exports = UserService
