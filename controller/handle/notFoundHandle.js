const baseHandle= require('./baseHandle');
const notFound = async function (req,res) {
    let notFound = await baseHandle.readFile('./views/err/notFound.html');
    res.writeHead(200,'text/html');
    res.write(notFound);
    res.end()

};
module.exports = notFound