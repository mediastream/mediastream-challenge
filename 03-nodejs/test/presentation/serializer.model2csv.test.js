var assert = require('chai').assert;
require('chai').should();
var Model2CsvSerializer = require('./../../presentation/view/serializer/model2csv.serializer');

describe('Model2CsvSerializer', ()=>{    
    describe('#serialize()', () => {
        it('should return a csv version of obj', () => {
            serializer = new Model2CsvSerializer('name', 'email');
            csv = serializer.data({'name':'Foo', 'email':'foo@bar'});
            csv.should.be.equal('Foo,foo@bar');
        })
    });
})