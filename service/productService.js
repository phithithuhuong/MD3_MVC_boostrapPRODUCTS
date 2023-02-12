const connection = require('../model/connection');

class ProductService {
    static create(product) {
        let connect = connection.getConnect();
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO productstore.products (name, img, price, description)
                       VALUES ('${product.name}', '${product.img}', ${product.price}, '${product.description}')`
            connect.query(sql, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })

    }

    static showAll() {
        let connect = connection.getConnect();
        return new Promise((resolve, reject) => {
            let sql = `select *
                       from products`;
            connect.query(sql, (err, values) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(values)
                }
            })
        })
    }
    static showAllProductInCart() {
        let connect = connection.getConnect();
        return new Promise((resolve, reject) => {
            let sql = `select * from orders`;
            connect.query(sql, (err, values) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(values)
                }
            })
        })
    }
    static remove(id) {
        let connect = connection.getConnect();
        return new Promise((resolve, reject) => {
            let sql = ` DELETE
                        FROM productstore.products
                        WHERE idProduct = ${id}`;
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })

    }

    static search(search) {
        let connect = connection.getConnect();
        return new Promise((resolve, reject) => {
            let sql = ` select *
                        from products
                        where name like '%${search}%'`;
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    static edit(product, id) {
        let connect = connection.getConnect();
        return new Promise((resolve, reject) => {
            let sql = ` UPDATE productstore.products t
                        SET t.name        = '${product.name}',
                            t.img         = '${product.img}',
                            t.price       = ${product.price},
                            t.description = '${product.description} '
                        WHERE t.idProduct = ${id} `;
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
    static findId(id){
        let connect = connection.getConnect();
        return new Promise((resolve, reject) => {
            let sql = ` SELECT *
                        FROM productstore.products
                        WHERE idProduct = ${id}`;
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

module.exports = ProductService;
