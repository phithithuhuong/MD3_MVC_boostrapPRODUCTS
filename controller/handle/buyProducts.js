const baseHandle = require('./baseHandle');
const productService = require('../../service/productService')
class BuyProducts {
    static getListBuy(listHtml,products){
        let tbody =''
        products.forEach((product,index)=>{
            tbody+=`
               <center><div class="card mb-3" style="max-width: 1000px;" style = "border: 1px solid green">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="${product.img}" style="width: 100%" class="card-img" alt="gucci">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text" style="color: red"> PRICE : ${product.price}$</p>
        <p class="card-text"><small class="text-muted">DESCRIPTION : ${product.description}</small></p>
          <a href="/delete?id=${product.idProduct}" onclick="return confirm('Are you sure  want to delete this product?')"  class="btn btn-info">BUY NOW</a>
      </div>
    </div>
  </div>
</div>
</center>
<br>`
        });
        listHtml = listHtml.replace('{list-products}',tbody)
        return listHtml

    };
    static async listBuy(req,res){
        let listBuyHtml = await baseHandle.readFile('./views/buyProducts/listProduct.html');
        let product = await productService.showAll();
        listBuyHtml  = BuyProducts.getListBuy(listBuyHtml,product)
        res.writeHead(200,'text/html');
        res.write(listBuyHtml);
        res.end()
    }

};
module.exports = BuyProducts;