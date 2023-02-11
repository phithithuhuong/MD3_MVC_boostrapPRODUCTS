const connection = require('../model/connection');
let connect = connection.getConnect()

class AdminService {
    static loginAdmin(admin) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT *
                       FROM admin
                       WHERE email = '${admin.email}'
                         and password = '${admin.password}'`;
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })

    }

};
module.exports = AdminService