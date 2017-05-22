const Util = require('../util/util');

class BaseFilter {

    constructor(fields) {
        this._fields = fields;
    }

    get fields() {
        return this._fields;
    }

    set fields(fields) {
        this._fields = fields;
    }

    stringFields() {
        var result = '';

        for (var i = 0; i < this._fields.length; i++) {
            if (i == this._fields.length - 1) {
                result = result + this._fields[i];
            } else {
                result = result + this._fields[i] + ', ';
            }
        }

        return result;
    }

    validateInsert(req, res, next) {
        if (Util.countObjectKey(req.body) == 0) {
            res.status(412).send(this._error412());
        } else if (req.body) {
            if (!this._validateRequiredFields(req.body)) {
                res.status(400).send({
                    'error': '400 - Bad Request',
                    'error_description': 'Campos obrigatórios',
                    'error_uri': this._errorRequiredField(req)
                });
            } else {
                next();
            }
        }
    }

    validateUpdate(req, res, next) {
        if (!req.params.id) {
            res.status(412).send(this._errorId412());
        } else {
            if (Util.countObjectKey(req.body) == 0) {
                res.status(412).send(this._error412());
            } else if (req.body) {
                if (!this._validateRequiredFields(req.body)) {
                    res.status(400).send({
                        'error': '400 - Bad Request',
                        'error_description': 'Campos obrigatórios',
                        'error_uri': this._errorRequiredField(req)
                    });
                } else {
                    next();
                }
            }
        }
    }

    validateRemove(req, res, next) {
        if (!req.params.id) {
            res.status(412).send(this._errorId412());
        }
    }

    validateFindById(req, res, next) {
        if (!req.params.id) {
            res.status(412).send(this._errorId412());
        }
    }

    _validateRequiredFields(body) {
        return Util.verifyKeysInObject(this._fields, body);
    }

    _error412() {
        return {
            'error': '412 Precondition Failed',
            'error_description': 'Não há paramêtros suficientes',
            'error_uri': ['O corpo da mensagem precisa ter os seguintes elementos [{0}]'.format(this.stringFields())]
        };
    }

    _errorId412() {
        return {
            'error': '412 Precondition Failed',
            'error_description': 'Não há paramêtros suficientes',
            'error_uri': ['Não foi informado o ID na URI']
        };
    }

    _errorRequiredField(req) {
        var errors = [];

        this._fields.forEach(function (element) {
            if (!req['body'][element]) errors.push("O campo '{0}' é obrigatório".format(element));
        }, this);

        return errors;
    }
}

String.prototype.format = function () {
    var formatted = this;

    for (var i = 0; i < arguments.length; i++) {
        var regex = new RegExp('\\{' + i + '}', 'gi');
        formatted = formatted.replace(regex, arguments[i]);
    }

    return formatted;
}

module.exports = BaseFilter;