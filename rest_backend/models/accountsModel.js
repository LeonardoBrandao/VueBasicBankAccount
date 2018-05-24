'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    number: {
        type: String,
        unique : true,
        required : true,
        dropDups: true
    },
    balance: {
        type: String,
        required : true
    }
});

module.exports = mongoose.model('Accounts', AccountSchema);
