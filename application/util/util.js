//๑۞๑,¸¸,ø¤º°`°๑۩ ȼhąяℓ€$ţ๏ɲ ๑۩ ,¸¸,ø¤º°`°๑۞๑
var
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Lodash = require('lodash'),
    Moment = require('moment');

var Util = {};

/**
 * Mongoose
 */
Util.mongoose = mongoose;

Util.moment = Moment;

/**
 * Convert string to objectId
 */
Util.toObjectId = function (id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        id = mongoose.Types.ObjectId(id)
    }
    return id;
};

/**
 * Count key of object
 */
Util.countObjectKey = function (key) {
    if (key)
        return Object.keys(key).length;
    else
        return 0;
};

/**
 * Convert result to object js
 */
Util.resultToObject = function (result) {
    if (result && result.toObject) {
        return result.toObject();
    } else {
        return result;
    }
}

/**
 * Convert result array to unique
 */
Util.resultToObjectUnique = function (result) {
    if (result && result[0]) {
        return result[0];
    } else {
        return result;
    }
}

/**
 * Lodash lib
 */
Util.lodash = (function () {
    return Lodash;
})();

/**
 * Validate variable
 */
Util.validate = function (variable) {
    if (typeof variable == 'undefined' || variable == null) return false;
    else return true;
}

/**
 * Transform object to array by key
 */
Util.objectToArray = function (obj, key) {
    var arr = Object.keys(obj).map(
        function (index) {
            return obj[index][key];
        }
    );

    return arr;
}

Util.objectToArray = function (obj) {
    var arr = Object.keys(obj).map(
        function (index) {
            return obj[index];
        }
    );

    return arr;
}

function objectToArray(obj, arrKey) {
    var arr = [];
    Object.keys(obj).map(
        function (index) {
            arrKey.forEach(function (key) {
                arr.push(obj[index][key]);
            }, this);
        }
    );
    return arr;
}

Util.objectAttrs = function (obj, arrKey) {
    var result = {};
    if (obj && arrKey) {
        arrKey.forEach(function (key) {
            result[key] = obj[key]
        });
    }

    return result;
}

Util.arraytAttrs = function (array, keys) {
    var result = [];

    if (array && keys) {
        array.forEach(function (element, index) {
            result[index] = {};
            keys.forEach(function (key) {
                result[index][key] = element[key];
            });
        });
    }

    return result;
}

Util.getObjectValue = function (obj, value) {
    var result = undefined;
    if (obj && value) {
        result = obj[value];
    }

    return result;
}

Util.getArrayValues = function (array, value) {
    array.forEach(function (element, key) {
        array[key] = Util.getObjectValue(element, value);
    }, this);
}

Util.arrayEquals = function (array1, array2) {
    var result = [];

    array1.forEach(function (element1) {
        array2.forEach(function (element2) {
            if (element2 == element1)
                result.push(element2);
        }, this);
    }, this);

    return result;
};

Util.inArrayString = function (value, array) {
    var i = array.length;
    while (i--) {
        if (String(array[i]) === String(value)) {
            return true;
        }
    }
    return false;
}

Util.verifyKeysInObject = function (arrayKeys, object) {
    var countKeys = 0;
    var totalKeys = arrayKeys.length;

    arrayKeys.forEach(function (element) {
        if (object.hasOwnProperty(element)) countKeys++;
    }, this);

    return countKeys == totalKeys;
}

Util.replaceAll = function (str, find, replace) {
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

Util.isFunction = function (test) {
    return (typeof test === 'function');
}

Util.removeDuplicates = function (a, param) {
    return a.filter(function (item, pos, array) {
        return array.map(function (mapItem) { return mapItem[param]; }).indexOf(item[param]) === pos;
    })
}

Util.time = function () {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}

function daysBetween(date1, date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms)

    // Convert back to days and return
    return Math.round(difference_ms / ONE_DAY)

}

Util.rawurlencode = function (str) {
    str = (str + '').toString();
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
        replace(/\)/g, '%29').replace(/\*/g, '%2A');
}

Util.dateNew = function (date) {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    return new Date(year, month, day);
}

Util.noGmt = function (date) {
    return new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
}

Util.createDateAsUTC = function (date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

Util.convertDateToUTC = function (date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}

//format expire date (remove time hh:ss)
Util.removeHour = function (data) {
    var result = new Date(data);
    return new Date(result.getFullYear(), result.getMonth(), result.getDate());
}

module.exports = Util;