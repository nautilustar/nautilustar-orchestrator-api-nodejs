function ConfigRouter() {
	var multer = require('multer');

	const Express = require('express');

	/**naut-file-import**/
	const UserFilter = require('../application/filters/user');

	const User = require('../application/routes/user');

	/**naut-instance-object**/

	var userFilter = new UserFilter(false);
	var user = new User();

	function Router() {
		return this.init(Express.Router());
	}

	Router.prototype.init = function (router) {
		
		/**naut-routes**/

		//users
		router.post('/users', userFilter.validateInsert.bind(userFilter), user.save.bind(user));
		router.put('/users/:id', userFilter.validateUpdate.bind(userFilter), user.update.bind(user));
		router.delete('/users/:id', user.removeById.bind(user));
		router.get('/users', user.findAll.bind(user));
		router.get('/users/:id', user.findById.bind(user));
		router.delete('/users', user.removeAll.bind(user));

		return router;
	}

	return {
		routes: new Router()
	}
}

module.exports = ConfigRouter;