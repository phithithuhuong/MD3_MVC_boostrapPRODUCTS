const baseHandle = require('../handle/baseHandle');
const productService = require('../../service/productService')
const qs = require('qs')
class BuyHandle {
    static getList(listHtml,products){
        let tbody='';
        products.forEach((product,index)=>{
            tbody+=`<center>
    <div class="card mb-3" style="max-width: 1200px;">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img style="width: 100%" src="${product.img}" class="card-img" alt="GUCCI">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h4 class="card-title">${product.name}</h4>
                    <p class="card-text">PRICE :${product.price}</p>
                    <p class="card-text"><small class="text-muted">DESCRIPTION :${product.description}</small></p>
                    <button type="submit" class="btn btn-info"><a href="##">BUY NOW</a></button>
                    <button type="submit" class="btn btn-danger"><a href=""><span class="glyphicon glyphicon-shopping-cart"></span></a></button>
                </div>
            </div>
        </div>
    </div>
    
</center>
<br>`
        });
        listHtml = listHtml.replace('{list-products}',tbody);
        return listHtml
    }
    static async listBuy(req, res) {
        if (req.method==="GET"){
            let listBuyHtml = await baseHandle.readFile('./views/buyProducts/listProduct.html');
            let products =  await productService.showAll();
            listBuyHtml= await BuyHandle.getList(listBuyHtml,products)
            res.writeHead(200, 'text/html');
            res.write(listBuyHtml);
            res.end()
        }else {
            let data = '';
            req.on('data', chunk=>{
                data+=chunk
            });
            req.on('end',async ()=>{
                let search = qs.parse(data);
                console.log(search,1)
                let listHtml = await baseHandle.readFile('./views/buyProducts/listProduct.html');
                console.log(search);
                let searchName = await productService.search(search.search);
                listHtml = BuyHandle.getList(listHtml, searchName);
                res.writeHead(200, 'text/html');
                res.write(listHtml);
                res.end()
            })
        }

        }


};
module.exports = BuyHandle