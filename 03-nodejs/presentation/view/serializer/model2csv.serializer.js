const _ = require('lodash');

class Model2CsvSerializer {
    constructor(...fields){
        this.fields = fields;
    }
    
    data(obj){
        var csv = '';
        for(var field of this.fields){
            csv+=`${obj[field]},`
        }

        return csv.slice(0,-1);
    }
}

module.exports = Model2CsvSerializer;