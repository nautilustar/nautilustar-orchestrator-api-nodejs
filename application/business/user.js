'use strict';  

const BaseBusiness = require('./base_business'); 
const UserRepository = require('../repository/user');

class UserBusiness extends BaseBusiness {
    constructor() {
        super(new UserRepository());
    }
}

module.exports = UserBusiness;