const connection = require('../model/connection');
let connect = connection.getConnect();

class OderService {

    static createOrder(order) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO productstore.orderdetail (quantity) VALUES ( ${order.quantity}));
            )`;
            connect.query(sql, (err, values) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(values)
                }
            })
        });


    }

};
module.exports = OderService