const fs = require('fs');
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
    static createSession(time, email, password) {
        let expire = 60 * 60 * 24 * 7 * 1000 + time;
        let session = {
            email: email,
            password: password,
            expire: expire
        }
        fs.writeFile(`./session/${time}`, JSON.stringify(session), 'utf-8', err => {
            if (err) throw err;
        })
    }
}
module.exports = BaseHandle;