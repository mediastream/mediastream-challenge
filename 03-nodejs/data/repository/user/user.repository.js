var colors = require('colors');

class UserRepository {    

    constructor(userModel, cache = []){
        if(!userModel) throw 'User model must be defined';

        this.userModel = userModel;
        this.cache = cache;
    }

    all(refresh=false){
        return new Promise((resolve, reject) => {
            if(this.cache.length > 0 && !refresh) {
                console.log('[UserRepository] #all() Result from cache'.green);
                return resolve(this.cache);
            }
            
            console.log('[UserRepository] #all() Result from DB'.yellow);
            this.userModel.find((err, list)=>{                
                if(err) reject(err);
                this.cache = list;
                resolve(this.cache);
            });
        }); 
    }
}

module.exports = UserRepository;