"use strict";

let mongoose = require('mongoose');
let userSchema = require('../db/schemas/user');
module.exports = mongoose.model('user',userSchema);