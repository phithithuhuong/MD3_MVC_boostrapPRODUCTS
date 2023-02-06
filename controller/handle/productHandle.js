const qs = require('qs');
const url = require('url')
const baseHandle = require('../handle/baseHandle');
const productService = require('../../service/productService')

class ProductHandle {
    static async home(req, res) {
        let homeHtml = await baseHandle.readFile('./views/home.html');
        res.writeHead(200, 'text/html');
        res.write(homeHtml);
        res.end()

    }

    static async create(req, res) {
        if (req.method === "GET") {
            let homeHtml = await baseHandle.readFile('./views/product/create.html');
            res.writeHead(200, 'text/html');
            res.write(homeHtml);
            res.end()
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk
            });
            req.on('end', async () => {
                let product = qs.parse(data);
                await productService.create(product);
                res.writeHead(301, {Location: '/list'});
                res.end()
            })
        }


    }

    static getList(listHtml, products) {
        let tbody = '';
        products.map(product => {
            tbody += `<center><div class="card mb-3" style="max-width: 1100px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="${product.img}" class="card-img" alt="gucci">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text" style="color: red"> PRICE : ${product.price}$</p>
        <p class="card-text"><small class="text-muted">DESCRIPTION : ${product.description}</small></p>
          <a href="/edit?idProduct=${product.idProduct}" class="btn btn-primary">UPDATE</a>
          <a href="/delete?id=${product.idProduct}" onclick="return confirm('Are you sure  want to delete this product?')"  class="btn btn-info">DELETE</a>
      </div>
    </div>
  </div>
</div>
</center> `
        })
        listHtml = listHtml.replace('{product}', tbody);
        return listHtml;
    }

    static async list(req, res) {
        if (req.method === "GET") {
            let homeHtml = await baseHandle.readFile('./views/product/list.html');
            let product = await productService.showAll()
            homeHtml = await ProductHandle.getList(homeHtml, product)
            res.writeHead(200, 'text/html');
            res.write(homeHtml);
            res.end()
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            });
            req.on('end', async () => {
                let search = qs.parse(data);
                let listHtml = await baseHandle.readFile('./views/product/list.html');
                console.log(search);
                let searchName = await productService.search(search.search);
                listHtml = ProductHandle.getList(listHtml, searchName);
                res.writeHead(200, 'text/html');
                res.write(listHtml);
                res.end()


            })
        }


    }

    static async remove(req, res) {
        let query = url.parse(req.url, true).query;
        let id = qs.parse(query).id;
        console.log(id)
        await productService.remove(id);
        res.writeHead(301, {Location: '/list'});
        res.end();


    };

    static async edit(req, res, id) {
        let query = url.parse(req.url, true).query;
           id = qs.parse(query).idProduct;
        if (req.method === "GET") {
            let editHtml = await baseHandle.readFile('./views/product/edit.html');
            res.writeHead(200, 'text/html');
            let product = await productService.findId(id)
            editHtml = editHtml.replace('{name}', product[0].name)
            editHtml = editHtml.replace('{id}', product[0].idProduct)
            editHtml = editHtml.replace('{img}', product[0].img)
            editHtml = editHtml.replace('{price}', product[0].price)
            editHtml = editHtml.replace('{description}', product[0].description);
            res.write(editHtml);
            console.log(product[0].idProduct)
            res.end();
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk
            });
            req.on('end', async () => {
                let product = qs.parse(data);
                await productService.edit(product, id)
                res.writeHead(301,{Location : '/list'});
                res.end();
            })
        }
    }


}

module.exports = ProductHandle