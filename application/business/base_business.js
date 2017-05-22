'use strict';

const errors = {
    internalError: {
        'error': '500 Internal Error',
        'error_description': 'Erro interno',
        'error_uri': ['Houve um problema com o servidor. Entre em contato com o administrador do sistema.']
    }
}

class BaseBusiness {

    /**
     * Constructor method
     * 
     * @param object {object repository}
     */
    constructor(repository) {
        this._repository = repository;
    }

    /**
     * Method for return object model
     * 
     * @return model
     */
    get getRepository() {
        return this._repository;
    }

    set setRepository(value) {
        return this._repository = value;
    }

    /**
     * Method for find by id
     * 
     * @return promise
     */
    findById(id, res) {
        if (!res) {
            return this._repository.findById(id);
        } else {
            return this._repository.findById(id)
                .then(function (data) {
                    res.json(data);
                })
                .catch(function (err) {
                    console.log(err);
                    res.status(500).json(errors.internalError);
                });
        }
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
            return this._repository.findByQuery(query)
        } else {
            return this._repository.findByQuery(query)
                .then(function (data) {
                    res.json(data);
                })
                .catch(function (err) {
                    console.log(err);
                    res.status(500).json(errors.internalError);
                });
        }
    }

    /**
     * Method for find one result by query
     * 
     * @param query {object for query}
     * @return promise
     */
    findOneByQuery(query, res) {
        if (!res) {
            return this._repository.findOneByQuery(query);
        } else {
            return this._repository.findOneByQuery(query)
                .then(function (data) {
                    res.json(data);
                })
                .catch(function (err) {
                    console.log(err);
                    res.status(500).json(errors.internalError);
                });
        }
    }

    /**
     * Method for find by query with options
     * 
     * @param query {object for query}
     * @param fields {string for fields}
     * @param options {object for options}
     * @param populate {array for populate}
     * @return promise | response
     */
    findByQueryWithOptions(query, fields, options, populate, res) {
        fields = (fields) ? fields : '';
        options = (options) ? options : {};
        query = (query) ? query : {};
        populate = (populate) ? populate : [];

        if (!res) {
            return this._repository
                .findByQueryWithOptions(query, fields, options, populate);
        } else {
            return this._repository
                .findByQueryWithOptions(query, fields, options, populate)
                .then(function (data) {
                    res.json(data);
                })
                .catch(function (err) {
                    console.log(err);
                    res.status(500).json(errors.internalError);
                });
        }
    }

    /**
     * Method for count result by query
     * 
     * @param query {object for query}
     * @return promise
     */
    count(query, res, callback) {
        if (!res) {
            return this._repository.count(query);
        } else if (res) {
            this._repository.count(query, callback);
        } else {
            return this._repository.count(query)
                .then(function (data) {
                    res.json(data);
                })
                .catch(function (err) {
                    console.log(err);
                    res.status(500).json(errors.internalError);
                });
        }
    }

    /**
     * Method for remove all elements
     * 
     * @return promise
     */
    removeAll(res) {
        return this.removeByQuery({}, res);
    }

    /**
     * Method for remove elements by query
     * 
     * @param query {object for query}
     * @return promise | response
     */
    removeByQuery(query, res) {
        if (!res) {
            return this._repository.removeByQuery(query);
        } else {
            return this._repository.removeByQuery(query, res)
                .then(function (data) {
                    res.json(data);
                })
                .catch(function (err) {
                    console.log(err);
                    res.status(500).json(errors.internalError);
                });
        }
    }

    /**
     * Method for remove elements by query
     * 
     * @param query {object for query}
     * @return promise
     */
    removeById(id, res) {
        return this.removeByQuery({ _id: id }, res);
    }

    /**
     * Method for update data
     * 
     * @param query {object for query}
     * @param object {object for data}
     * @return promise
     */
    update(query, object, res) {
        if (typeof res === undefined) {
            return this._repository.update(query, object);
        } else {
            return this._repository.update(query, object)
                .then(function (data) {
                    res.json(data);
                })
                .catch(function (err) {
                    console.log(err);
                    res.status(500).json(errors.internalError);
                });
        }
    }

    /**
     * Method for save data
     * 
     * @param object {object for data}
     * @return promise
     */
    save(object, res) {
        if (!res) {
            return this._repository.save(object);
        } else {
            return this._repository.save(object)
                .then(function (data) {
                    res.status(201).json(data);
                })
                .catch(function (err) {
                    console.log(err);
                    res.status(500).json(errors.internalError);
                });
        }
    }
}

module.exports = BaseBusiness;