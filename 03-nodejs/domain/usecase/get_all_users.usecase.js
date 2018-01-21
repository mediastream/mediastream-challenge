UserModel = require('./../../data/models/User');
UserRepository = require('./../../data/repository/user/user.repository');

class GetAllUsersUseCase {
    constructor(){
        this.repo = new UserRepository(UserModel);
    }
    execute(refresh=false){
        return this.repo.all(refresh)
    }
}

module.exports = GetAllUsersUseCase;