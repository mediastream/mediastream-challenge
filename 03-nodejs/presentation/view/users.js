const base = require('./base')
var UserModule = require('./../../module/users.module');

class UsersView extends base.BaseView {
    constructor(app, presenter)
    {
        super(app, '/');
        this.presenter = presenter;
    }

    get(req,res){        
        this.presenter.get()
        .then(csv => res.type('text/csv').status(base.HTTP_STATUS.OK).send(csv))
        .catch(reason => res.status(base.HTTP_STATUS.INTERNAL_ERROR).send(reason));
    }

}

module.exports = UsersView;