'use strict';

var BaseRepository = require('./base_repository');
var UserModel = require('../model/user');

class UserRepository extends BaseRepository {
    constructor() {
        super(UserModel);
    }
}

module.exports = UserRepository;