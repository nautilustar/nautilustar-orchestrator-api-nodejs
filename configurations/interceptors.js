function Interceptors() {

    function CorsOrigin() {
        this.apply = function (req, res, next) {
            // permite qualquer origin
            res.setHeader('Access-Control-Allow-Origin', '*');

            // metodos permitidos
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');

            // cabeçalhos permitidos
            res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Wsid');

            // next middleware
            next();
        }
    }

    return {
        cors: new CorsOrigin()
    }
}

module.exports = Interceptors;