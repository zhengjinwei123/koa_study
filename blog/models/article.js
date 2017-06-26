"use strict";

let mongoose = require('mongoose');
let schema = require('../db/schemas/article');
module.exports = mongoose.model('article',schema);