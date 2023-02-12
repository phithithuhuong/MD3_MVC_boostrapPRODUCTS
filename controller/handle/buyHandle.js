const baseHandle = require('../handle/baseHandle');
const productService = require('../../service/productService');
const orderService = require('../../service/oderService')
const qs = require('qs')
const url = require("url");
const {parse} = require("qs");

class BuyHandle {
    static getList(listHtml, products) {
        let tbody = '';
        products.forEach((product, index) => {
            tbody += `<center>
    <div class="card mb-3" style="max-width: 1200px;">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img style="width: 100%" src="../../public/${product.img}" class="card-img" alt="GUCCI">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h2 class="card-title">${product.name}</h2>
                    <p class="card-text" style="color: red">PRICE :${product.price}$</p>
                    <p class="card-text"><small class="text-muted">DESCRIPTION :${product.description}</small></p>
                    <button type="submit" class="btn btn-info"><a href="/buy/now" style="color: white;font-size: 120%" >BUY NOW</a></button>
                    <button type="submit"  class="btn btn-danger"><a href="/buy/cart?id=${product.idProduct}" style="color: white" ><span class="glyphicon glyphicon-shopping-cart"></span></a></button>
                </div>
            </div>
        </div>
    </div>
    
</center>
<br>`
        });
        listHtml = listHtml.replace('{list-products}', tbody);
        return listHtml
    }

    static async listBuy(req, res) {
        if (req.method === "GET") {
            let listBuyHtml = await baseHandle.readFile('./views/buyProducts/listProduct.html');
            let products = await productService.showAll();
            listBuyHtml = await BuyHandle.getList(listBuyHtml, products)
            res.writeHead(200, 'text/html');
            res.write(listBuyHtml);
            res.end()
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk
            });
            req.on('end', async () => {
                let search = qs.parse(data);
                let listHtml = await baseHandle.readFile('./views/buyProducts/listProduct.html');
                let searchName = await productService.search(search.search);
                listHtml = BuyHandle.getList(listHtml, searchName);
                res.writeHead(200, 'text/html');
                res.write(listHtml);
                res.end()
            })
        }

    };

    static async buyNow(req, res) {
        if (req.method === "GET") {
            let buyNowHtml = await baseHandle.readFile('./views/buyProducts/buyNow.html');
            res.writeHead(200, 'text/html');
            res.write(buyNowHtml);
            res.end()
        } else {
            // let data = '';
            // req.on('data', chunk => {
            //     data += chunk
            // });
            // req.on('end', async () => {
            //     let order = qs.parse(data);
            //     await orderService.createOrder(order);
            //     res.writeHead(301, {Location: '/buy/list'});
            //     res.end()

            // })
        }


    };

    static async cart(req, res) {
        if (req.method === "GET") {
            let cartHtml = await baseHandle.readFile('./views/buyProducts/cart.html');
            res.writeHead(200, 'text/html');
            res.write(cartHtml);
            res.end();
        } else {
            let data = '';
            let session = await baseHandle.getSessionData(req);
            req.on('data', chunk => {
                data += chunk;
            });
            req.on('end', async () => {
                let customer = qs.parse(data);
                let getCookie = await orderService.getIdCustomer(session.email)
                console.log(getCookie)
                await orderService.createOrder(getCookie, customer.dateBuy);
                res.writeHead(301, {Location: '/buy/list'})
                res.end()
            })
        }
    };

    static getListCart(listCartHtml, products) {
        let tbody = '';
        products.forEach((product, index) => {
            tbody += `<center>
    <div class="card mb-3" style="max-width: 1200px;">
        <div class="row no-gutters">
        <div class="col-md-1">
         <div class="btn-group" data-toggle="buttons">
               <label class="btn btn-warning ">
                  <input type="checkbox" autocomplete="off">
                   <span class="glyphicon glyphicon-ok"></span>
               </label>
         </div>

         </div>
            <div class="col-md-3">
                <img style="width: 100%" src="../../public/${product.img}" class="card-img" alt="GUCCI">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h2 class="card-title">${product.name}</h2>
                    <p class="card-text" style="color: red">PRICE :${product.price}$</p>
                    <p class="card-text"><small class="text-muted">DESCRIPTION :${product.description}</small></p>
                    <button type="submit" class="btn btn-info"><a href="/buy/now" style="color: white;font-size: 120%" >BUY NOW</a></button>
<!--                    <button type="submit"  class="btn btn-danger"><a href="/buy/cart?id=${product.idProduct}" style="color: white" ><span class="glyphicon glyphicon-shopping-cart"></span></a></button>-->
                </div>
            </div>
        </div>
    </div>
    
</center>
<br>`
        });
        listCartHtml = listCartHtml.replace('{list-cart}', tbody);
        return listCartHtml
    }

    static async listCart(req, res) {
        if (req.method==="GET"){
            let listCartHtml = await baseHandle.readFile('./views/buyProducts/listCart.html');
            let products = await productService.showAll();
            console.log(products)
            listCartHtml = await BuyHandle.getListCart(listCartHtml, products)
            res.writeHead(200, 'text/html');
            res.write(listCartHtml);
            res.end()
        } else {
            let data =''
            req.on('data',chunk=>{
                data+=chunk
            })
            req.on('end', async ()=>{
                let search=  qs.parse(data);
                let listCartHtml = await baseHandle.readFile('./views/buyProducts/listCart.html');
                let findAll = await productService.search(search.search)
                listCartHtml = await BuyHandle.getListCart(listCartHtml, findAll)
                res.writeHead(200, 'text/html');
                res.write(listCartHtml);
                res.end()
            })

        }

    }


};
module.exports = BuyHandle