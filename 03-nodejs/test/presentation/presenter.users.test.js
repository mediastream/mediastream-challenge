var assert = require('chai').assert;
require('chai').should();
var UserPresenter = require('./../../presentation/presenter/users.presenter');

describe('UserPresenter', ()=>{    
    describe('#get()', () => {
        it('should return users as csv', (done) => {
            
            var usecaseStub = {
                execute(refresh=false){
                    var data = [
                        {'name':'Foo', 'email':'foo@bar'},
                        {'name':'Bar', 'email':'bar@foo'}
                    ]
                    
                    return new Promise((resolve, reject)=>resolve(data));
                }
            }            
            
            var presenter = new UserPresenter(usecaseStub);

            presenter.get()
                .then(csv => {
                    csv.should.be.equal('Foo,foo@bar\n\rBar,bar@foo');
                    done();
                })
                .catch(reason => {
                    done(reason)
                });
        })
    });
})