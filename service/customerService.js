const connection = require('../model/connection');
connection.connecting();

class CustomerService {
    static signup(user) {
        let connect = connection.getConnect();
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO productstore.customer (name, birthday, address, password, email, phone)
                       VALUES ('${user.name}', '${user.birthday}', '${user.address}', '${user.password}', '${user.email.trim()}
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

    static login(customer) {
        let connect = connection.getConnect();
        return new Promise((resolve, reject) => {
            let sql = ` SELECT *
                        FROM productstore.customer
                        WHERE email = '${customer.email}'
                          and password = '${customer.password}'`
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {

                    resolve(result)
                }
            })
        })
    };
    static editPassword(customer,email){
        let connect = connection.getConnect();
        return new Promise((resolve, reject) => {
            let sql = ` UPDATE productstore.customer t SET t.password = ${customer.password} WHERE t.email = ${email}`
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {

                    resolve(result)
                }
            })
        })


    };
    static getEmail(email){
        let connect = connection.getConnect();
        return new Promise((resolve, reject) => {
            let sql = ` SELECT * FROM productstore.customer t WHERE t.email = ${email}`
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


module.exports = CustomerService
