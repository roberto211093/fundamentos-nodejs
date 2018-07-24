'use strict';
var mongoose = require('../../config/mongoose'),//traemos a mongoose
	userSchema = require('./schemas').userSchema;//traemos el esquema de usuarios

var models = {//declaramos la variable models

	User : mongoose.model('user', userSchema)//creamos un modelo con nombre de user, y le pasamos el esquema de usuarios

};

module.exports = models;//exportamos la variable models