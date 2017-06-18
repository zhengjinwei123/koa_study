"use strict";
let Crypto = require('crypto');

module.exports = {
    md5: function (str, encode) {
        return Crypto.createHash('md5').update(str).digest(encode || 'hex');
    }
};