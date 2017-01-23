function ConfigRouter() {
    const
        Express = require('express'),
        Filters = require('./filters')(),
        User = require('../application/routes/user');

    var user = new User();

    function Router() {
        return this.init(Express.Router());
    }

    Router.prototype.init = function (router) {

        //users       
        router.post('/users', Filters.user.validationInsert, user.save.bind(user));
        router.put('/users/:id', Filters.user.validationUpdate, user.update.bind(user));
        router.delete('/users/:id', Filters.user.validationRemove, user.removeById.bind(user));
        router.get('/users', user.findAll.bind(user));
        router.get('/users/:id', Filters.user.validationFindById, user.findById.bind(user));
        router.delete('/users', user.removeAll.bind(user));

        return router;
    }

    return {
        routes: new Router()
    }
}

module.exports = ConfigRouter;