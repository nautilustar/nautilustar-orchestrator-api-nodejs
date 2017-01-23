'use strict';

class BaseRoute {

    constructor(business) {
        this._business = business;
    }

    get business() {
        return this._business;
    }

    set business(value) {
        this._business = value;
    }

    findById(req, res, next) {
        this._business.findById(req.param.id, res);
    }

    findAll(req, res, next) {
        this._business.findAll(res);
    }

    save(req, res, next) {
        this._business.save(req.body, res);
    }

    update(req, res, next) {
        this._business.save(req.body, res);
    }

    removeById(req, res, next) {
        this._business.removeById(req.params.id, res);
    }

    removeAll(req, res, next) {
        this._business.removeAll(res);
    }
}

module.exports = BaseRoute;