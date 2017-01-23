const Mongoose = require('mongoose');

Mongoose.Promise = global.Promise;

function Database() { }

Database.prototype.connect = function () {
    // if OPENSHIFT env variables are present, use the available connection info:
    var connection = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL;
    connection += process.env.OPENSHIFT_APP_NAME || process.env.MONGO_DB;

    // Connect to mongodb
    var conn = function () {
        var options = { server: { socketOptions: { keepAlive: 10 } } };
        Mongoose.connect(connection, options);
    };

    conn();

    Mongoose.connection.on('error', console.log);
    Mongoose.connection.on('disconnected', conn);
}

module.exports = new Database();
