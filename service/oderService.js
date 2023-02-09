const connection = require('../model/connection');
let connect = connection.getConnect();

class OderService {
    static createCustomer(customer) {
        return new Promise((resolve, reject) => {
            let sql = `insert into customer(namecustomer, address, phonecustomer, email)
                       VALUES ('${customer.nameCustomer}', '${customer.address}', ${customer.phoneCustomer},
                               '${customer.email}')`;
            connect.query(sql, (err, values) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(values)
                }
            })
        });


    };

    static createOrder(order) {
        return new Promise((resolve, reject) => {
            let sql = `insert into orders (dateBuy, quantity, idCustomer, idProduct)
                       VALUES ('${order.dateBuy}', ${order.quantity}, ${order.idCustomer}, ${idProduct});
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