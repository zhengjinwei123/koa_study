"use strict";

let mongoose = require('mongoose');
let schema = require('../db/schemas/articleType');
module.exports = mongoose.model('articletype',schema);