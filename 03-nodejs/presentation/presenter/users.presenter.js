var _ = require('lodash');
var Model2CsvSerializer = require('./../view/serializer/model2csv.serializer');

class UsersPresenter {
    
    constructor(getAllUsersUseCase){
        if(!getAllUsersUseCase) throw 'Use case must be provided';
        
        this.usecase = getAllUsersUseCase;;
        this.serializer = new Model2CsvSerializer('name','email');
    }

    get(){
        return new Promise((resolve, reject)=> {
            this.usecase.execute()
            .then(data => resolve(this.toViewModel(data)))
            .catch(reason => reject(reason))
        });
    }

    toViewModel(entities){
        return _.map(entities, entity => this.serializer.data(entity))
        .join("\n\r");
    }
}

module.exports = UsersPresenter;