const Mongoose = require('mongoose');

Mongoose.Promise = global.Promise;

function Database() { }

Database.prototype.connect = function () {
    var connection = process.env.MONGODB_URL;

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
