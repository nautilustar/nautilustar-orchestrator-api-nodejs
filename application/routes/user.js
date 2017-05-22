'use strict';

const BaseRoute = require('./base_route');
const UserBusiness = require('../business/user');

class UserRoute extends BaseRoute {
    constructor() {
        super(new UserBusiness());
    }
}

module.exports = UserRoute;