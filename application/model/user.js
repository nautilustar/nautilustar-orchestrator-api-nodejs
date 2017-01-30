var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema 
 */
var UserSchema = new Schema({
    user_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);  