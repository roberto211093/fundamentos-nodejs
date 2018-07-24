'use strict';
var mongoose = require('mongoose');

/* DATABASE */
mongoose.connect('mongodb://localhost/library');

module.exports = mongoose;