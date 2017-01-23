'use strict';

const Util = require('../util/util');
const Logger = require('../util/logger_util');

class BaseRepository {

    /**
     * Constructor method
     * 
     * @param model {object model of mongoose}
     */
    constructor(model) {
        this._model = model;
    }

    /**
     * Method for return object model
     * 
     * @return model
     */
    get model() {
        return this._model;
    }

    set model(value) {
        this._model = value;
    }

    /**
     * Method for find by id
     * 
     * @return promise
     */
    findById(id) {
        return this._model.findById(id);
    }

    /**
     * Method for find by query
     * 
     * @param query {object for query}
     * @return promise
     */
    findAll(res) {
        if (!res) {
            return this.findByQuery({});
        } else {
            return this.findByQuery({}, res);
        }
    }

    /**
     * Method for find by query
     * 
     * @param query {object for query}
     * @return promise
     */
    findByQuery(query, res) {
        if (!res) {
            return this._model.find(query);
        } else {
            console.log(this._model);
          

        }
    }

    /**
     * Method for find one result by query
     * 
     * @param query {object for query}
     * @return promise
     */
    findOneByQuery(query) {
        return this._model.findOne(query);
    }

    /**
     * Method for find by query with options
     * 
     * @param query {object for query}
     * @param fields {string for fields}
     * @param options {object for options}
     * @param populate {array for populate}
     * @return promise
     */
    findByQueryWithOptions(query, fields, options, populate) {
        fields = (fields) ? fields : '';
        options = (options) ? options : {};
        query = (query) ? query : {};
        populate = (populate) ? populate : [];

        return this._model
            .find(query, fields, options)
            .populate(populate)
            .exec();
    }

    /**
     * Method for count result by query
     * 
     * @param query {object for query}
     * @return promise
     */
    count(query, callback) {
        if (callback) {
            return this._model.count(query, callback);
        } else {
            return this._model.count(query);
        }
    }

    /**
     * Method for remove all elements
     * 
     * @return promise
     */
    removeAll() {
        return this._model.remove({});
    }

    /**
     * Method for remove elements by query
     * 
     * @param query {object for query}
     * @return promise
     */
    removeByQuery(query) {
        return this._model.remove(query);
    }

    /**
     * Method for update data
     * 
     * @param query {object for query}
     * @param object {object for data}
     * @return promise
     */
    update(query, object) {
        return this._model.update(query, object);
    }

    /**
     * Method for save data
     * 
     * @param object {object for data}
     * @return promise
     */
    save(object) {
        var data = new this._model(object);
        return data.save();
    }

    /**
     * Method for return util standard
     * 
     * @return object
     */
    util() {
        return Util;
    }

    /**
     * Method for return logger console
     * 
     * @return object
     */
    logger() {
        return Logger;
    }
}

module.exports = BaseRepository;