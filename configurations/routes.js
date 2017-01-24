function ConfigRouter() {
    const
        Express = require('express'),
        Filters = require('./filters')(),
        /**naut-file-import**/;

    /**naut-instance-object**/

    function Router() {
        return this.init(Express.Router());
    }

    Router.prototype.init = function (router) {

        /**naut-routes**/

        return router;
    }

    return {
        routes: new Router()
    }
}

module.exports = ConfigRouter;