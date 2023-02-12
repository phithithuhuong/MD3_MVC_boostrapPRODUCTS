const connection = require('../model/connection');
let connect = connection.getConnect();

class OderService {

    static getIdCustomer(emailSession) {
        return new Promise((resolve, reject) => {
            let sql = `select idCustomer from customer where email = '${emailSession}'`;
            connect.query(sql, (err, values) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(values)
                }
            })
        });
    };

    static createOrder(idCustomer,dateBuy) {
        return new Promise((resolve, reject) => {
            let sql = `insert into orders(idCustomer,dateBuy) VALUES (${idCustomer}, '${dateBuy}')`;
            connect.query(sql, (err, values) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(values)
                }
            })
        });
    };
    static createOrderDetail(idOrder,idProduct,quantity){
        return new Promise((resolve, reject) => {
            let sql =` insert into orderdetail(idOrder, idProduct, quantity) VALUES (${idOrder}, ${idProduct}, ${quantity})`;
            connect.query(sql,(err,value)=>{
                if (err){
                    reject(err)
                } else {
                    resolve(value)
                }
            })
        })

    }

};
module.exports = OderService