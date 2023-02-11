const adminService = require('../../service/adminService');
const baseHandle = require ('../handle/baseHandle')
const qs = require("qs");
class AdminHandle {
    static async loginAdmin (req,res){
        if (req.method==="GET"){
            let loginAdminHtml = await baseHandle.readFile('./views/admin/loginAdmin.html');
            res.writeHead(200,'text/html');
            res.write(loginAdminHtml);
            res.end()
        } else {
            let data = '';
            req.on('data',chunk=>{
                data+=chunk
            });
            req.on('end', async ()=>{
                let admin = qs.parse(data);
               let  loginAdmin = await adminService.loginAdmin(admin);
               if (loginAdmin.length!==0){
                   res.writeHead(301,{Location : '/list'});
                   res.end()
               }else {
                   res.writeHead(301,{Location : '/admin-login'});
                   res.end()
               }
            })

        }
    }

};
module.exports = AdminHandle;