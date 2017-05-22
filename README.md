# nautilus-orchestrator-api-nodejs
Project with Orchestrator API - Auto Generator Crud RESTFul in ECMA6

#### How to use

* Clone the project *
https://github.com/nautilustar/nautilustar-orchestrator-api-nodejs.git

## Installation

**Install gulp**
`npm install -g gulp-cli`

**Install packages**
`npm install`

## Settings

**Ceate route for 'users'**
`gulp naut-create --file user --route users`

**Parameters**

    --file: file name 
    
    --route: route name

**Last step - Setting your entity**

Access the file {project}/application/model/user.js
And put your fields

Mongoose guide http://mongoosejs.com/docs/guide.html   

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

### Estructure
/**application**
- - -/business
- - -/filters
- - -/interceptors
- - -/model
- - -/repository
- - -/routes
- - -/util

/**configurations**
- - -database.js
- - -filters.js
- - -database.js
- - -interceptors.js
- - -routes.js

/**node-modules**

/**templates**

/**tests**

index.js

gulpfile.js

package.json

enviroment.env
