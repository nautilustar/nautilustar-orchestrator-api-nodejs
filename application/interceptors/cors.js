class Cors {
    apply() {
        return function (req, res, next) {
            // permite qualquer origin
            res.setHeader('Access-Control-Allow-Origin', '*');

            // metodos permitidos
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');

            // cabeçalhos permitidos
            res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

            // next middleware
            next();
        }
    }
}

module.exports = Cors;