var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema 
 */
var UserSchema = new Schema({
    user_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);  