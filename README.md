# nautilus-orchestrator-api-nodejs
Project with Orchestrator API - ECMA6 - Auto Generator Crud RESTFul

## How to use

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

Access the file `{project}/application/model/user.js`
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

## API Requests

//FIND ALL

    GET /v1/users
    Host: localhost:3000
    Cache-Control: no-cache

//FIND BY ID

    GET /v1/users/{ID}
    Host: localhost:3000
    Cache-Control: no-cache

//SAVE

    POST /v1/users
    Host: localhost:3000
    Content-Type: application/json
    Cache-Control: no-cache
    {
    	"user_name":"NautilusStar",
    	"password":"1234",
    	"email":"email@email.com"
    }

//UPDATE

    PUT /v1/users/{ID}
    Host: localhost:3000
    Content-Type: application/json
    {
    	"user_name":"StarNautilus",
    	"password":"4321",
    	"email":"email@email.com"
    }

//DELETE

    DELETE /v1/users/{ID}
    Host: localhost:3000
    Cache-Control: no-cache

### Structure
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
