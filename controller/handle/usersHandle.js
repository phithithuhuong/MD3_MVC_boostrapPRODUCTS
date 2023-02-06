const userService=  require('../../service/userService');
const baseHandle = require('../handle/baseHandle');
const qs = require('qs');
class UsersHandle {
    static async signup(req,res){
        if(req.method==="GET"){
            let signupHtml = await baseHandle.readFile('./views/user/signup.html');
            res.writeHead(200,'text/html');
            res.write(signupHtml);
            res.end()
        }else {
            let data = ''
            req.on('data', chunk=>{
                data+=chunk;
            })
            req.on('end', async ()=>{
                let user = qs.parse(data);
               let signup=  await userService.signup(user);
                if (signup.length!==0){
                    res.writeHead(301,{Location :'/home'});
                    res.end()
                } else {
                    res.writeHead(301,{Location : '/signup'});
                    res.end()
                }
            })
            req.on('err',(err)=>{
                if (err){
                    console.log(err)
                }
            })
        }


    }
    static async login(req,res){
        if (req.method==='GET'){
            let loginHtml=  await baseHandle.readFile('./views/user/login.html');
            res.writeHead(200,'text/html');
            res.write(loginHtml);
            res.end()
        } else {
            let data = '';
            req.on('data',chunk=>{
                data+=chunk;
            });
            req.on('end', async ()=>{
                let user = qs.parse(data);
             let login =  await userService.login(user);
             if (login.length!==0){
                 let now =  Date.now().toString();
                 baseHandle.createSession(now,user.email,user.password);
                 res.setHeader('Set-cookie',`loginTime=${now}`);
                 res.writeHead(301,{Location :'/home'});
                 res.end();
             } else {
                 res.writeHead(301,{Location:'/login'});
                 res.end()
             }

            })
        }
    }

};
module.exports = UsersHandle