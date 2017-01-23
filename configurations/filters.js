function Filters() {

    function User() { }

    User.prototype.validationInsert = function (req, res, next) {
        if (!req.body) {
            res.status(412).send({
                'error': 'Precondition Failed',
                'error_description': 'Não há paramêtros suficientes',
                'error_uri': 'O corpo da mensagem precisa ter os seguintes elementos {user_name,password}'
            });
        } else if (req.body) {
            var errors = [];

            if (!req.body.user_name) errors.push('O campo "user_name" obrigatório');
            if (!req.body.password) errors.push('O campo "password" obrigatório');

            if (errors.length > 0) {
                res.status(400).send({
                    'error': 'Bad Request',
                    'error_description': 'Campos obrigatórios',
                    'error_uri': errors
                });
            } else {
                next();
            }
        }
    };

    User.prototype.validationUpdate = function (req, res, next) {
        if (!req.params.id) {
            res.status(412).send({
                'error': 'Precondition Failed',
                'error_description': 'Não há paramêtros suficientes',
                'error_uri': 'Não foi informado o ID na URI'
            });
        } else {
            var errors = [];

            if (!req.body.user_name) errors.push('O campo "user_name" obrigatório');
            if (!req.body.password) errors.push('O campo "password" obrigatório');

            if (errors.length > 0) {
                res.status(400).send({
                    'error': 'Bad Request',
                    'error_description': 'Campos obrigatórios',
                    'error_uri': errors
                });
            } else {
                next();
            }
        }
    };

    User.prototype.validationRemove = function (req, res, next) {
        if (!req.params.id) {
            res.status(412).send({
                'error': 'Precondition Failed',
                'error_description': 'Não há paramêtros suficientes',
                'error_uri': 'Não foi informado o ID na URI'
            });
        } else {
            next();
        }
    };

    User.prototype.validationFindById = function (req, res, next) {
        if (!req.params.id) {
            res.status(412).send({
                'error': 'Precondition Failed',
                'error_description': 'Não há paramêtros suficientes',
                'error_uri': 'Não foi informado o ID na URI'
            });
        } else {
            next();
        }
    };

    return {
        user: new User()
    }
}

module.exports = Filters;