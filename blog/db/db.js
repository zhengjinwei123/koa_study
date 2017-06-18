"use strict";

let Mongoose = require("mongoose");
Mongoose.Promise = global.Promise = require('bluebird');
let Settings = require("../settings");

let db = Mongoose.connect("mongodb://" + Settings.mongodb.host + ":" + Settings.mongodb.port + "/" +Settings.mongodb.database);

exports.db = db;
