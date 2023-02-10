const userService=  require('../../service/customerService');
const baseHandle = require('../handle/baseHandle');
const qs = require('qs');
const {LONG} = require("mysql/lib/protocol/constants/types");
class CustomerHandle {
    static async signup(req,res){
        if(req.method==="GET"){
            let signupHtml = await baseHandle.readFile('./views/customer/signup.html');
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
            let loginHtml=  await baseHandle.readFile('./views/customer/login.html');
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
                console.log(user)
             let login =  await userService.login(user);
                console.log(login)
             if (login.length!==0){
                 let now =  Date.now().toString();
                  baseHandle.createSession(now,user.email,user.password);
                 console.log(user)
                 res.setHeader('Set-cookie',`loginTime=${now}`);
                 res.writeHead(301,{Location :'/buy/list'});
                 res.end();
             } else {
                 res.writeHead(301,{Location:'/login'});
                 res.end()
             }

            })
        }
    }
    static logout = (req, res) => {
        let cookie = qs.parse(req.headers.cookie);
        console.log(cookie)
        let fileName = cookie.loginTime;
        console.log(fileName)
        baseHandle.deleteSession(fileName);
        res.writeHead(301, {Location: '/login'});
        res.end();
    }


};
module.exports = CustomerHandle