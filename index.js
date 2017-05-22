const
    bodyParser = require('body-parser'),
    db = require('./configurations/database'),
    express = require('express'),
    env = require('node-env-file'),
    server = express();

//filters
const Cors = require('./application/interceptors/cors');
var interceptorCors = new Cors();

env(__dirname + '/enviroment.env', { verbose: false, overwrite: false, raise: false, logger: console });
process.env.PORT = process.env.NODE_PORT || process.env.PORT;

// set ip and port
const
    port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT,
    ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP;

var
    interceptors = require('./configurations/interceptors')(),
    routes = require('./configurations/routes')(server.oauth).routes;

//configurations
server.config = (function () {
    server.disable('x-powered-by');
    server.enable('trust proxy');
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use(interceptorCors.apply());
    server.use('/v1', routes);
    db.connect();
})();

//start server
server.listen(port, ip, function (err) {
    console.log('[%s] Server on connetected %s listenning port %s', Date(Date.now()), ip, port);
});

exports.listen = function () {
    this.server.listen.apply(this.server, arguments);
};

exports.close = function (callback) {
    this.server.close(callback);
};