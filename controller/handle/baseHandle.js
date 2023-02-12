const fs = require('fs');
const qs = require ('qs');
const customerService = require('../../service/customerService')
class BaseHandle {
    static readFile(file){
        return  new Promise((resolve, reject) => {
            fs.readFile(file,'utf-8',(err, data) => {
                if (err){
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    }
    static createSession( email, password) {
        let expire = 60 * 60 * 24 * 7 * 1000 ;
        let session = {
            email: email,
            password: password,
            expire: expire
        }
        fs.writeFile(`./session/${session.email}`, JSON.stringify(session), 'utf-8', err => {
            if (err) throw err;
        })
    }
    static async checkSession(req) {
        let filePath =  BaseHandle.getSessionPath(req);
        if (await this.exists(filePath)) {
            let sessionString = await this.readFile(filePath);
            let session = JSON.parse(sessionString);
            let now = Date.now();
            return session.expire >= now;
        }
        return false;
    }
    static deleteSession(fileName) {
        let filePath = `./session/${fileName}`;
        fs.unlink(filePath, err => {
            if (err) throw err;
            console.log('File deleted!');
        });
    }
    static getCookie(req) {
        let cookie = qs.parse(req.headers.cookie);
        return cookie;
    }
    static getSessionPath(req) {
        let cookie = this.getCookie(req);
        console.log(Object.values(cookie)[0].slice(38,60))
        let loginTime = Object.values(cookie)[0].slice(48,67);
        let filePath = `./session/${loginTime}`;
        return filePath;
    }
    static async getSessionData(req) {
        let sessionPath = this.getSessionPath(req);
        let sessionString = await this.readFile(sessionPath);
        return JSON.parse(sessionString);
    }

    static exists(filePath) {
        return new Promise((resolve, reject) => {
            fs.exists(filePath, result => {
                resolve(result);
            })
        })
    }

}
module.exports = BaseHandle;