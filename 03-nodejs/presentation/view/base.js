class BaseView {
    /*
        Class based approach
    */
    constructor(app, path){
        app.get(path, this.get.bind(this));
        app.post(path, this.post.bind(this));
        app.put(path, this.put.bind(this));
        app.delete(path, this.delete.bind(this));
        this.app = app;
    }

    get(req, res){
        res.status(HTTP_STATUS.NOT_FOUND).send('fasdf');
    }

    put(req, res){
        res.status(HTTP_STATUS.NOT_FOUND).send();
    }

    post(req, res){
        res.status(HTTP_STATUS.NOT_FOUND).send();
    }

    delete(req, res){
        res.status(HTTP_STATUS.NOT_FOUND).send();
    }
}

const HTTP_STATUS = {
    NOT_FOUND : 404,
    BAD_REQUEST: 400,
    OK: 200,
    INTERNAL_ERROR: 500
}

module.exports = {
    BaseView: BaseView,
    HTTP_STATUS: HTTP_STATUS
}