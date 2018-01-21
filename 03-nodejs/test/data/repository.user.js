require('chai').should();
var UserRepository = require('./../../data/repository/user/user.repository');

describe('User Repository', () => {
    describe('#all', () => {
        var UserModel = {
            find: function(callback){
                var data = [1,2,3,4,5];
                return callback(null,data);
            }
        }
                
        it('should retrive data from db', (done) => {            
            new UserRepository(UserModel).all().then(data => {
                data.length.should.be.equals(5);
                done();
            }).catch(reason => done(reason));            
        });
        
        it('should retrive data from cache', (done) => {
            new UserRepository(UserModel, [1]).all().then(data => {
                data.length.should.be.equals(1);
                done();
            }).catch(reason => done(reason));            
        });

        it('should force retrive data from DB', (done) => {
            new UserRepository(UserModel, [1]).all(true).then(data => {
                data.length.should.be.equals(5);
                done();
            }).catch(reason => done(reason));            
        });
    })
});