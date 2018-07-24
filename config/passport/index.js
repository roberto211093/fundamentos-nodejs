'use strict';
var passport = require('passport');

var passportConfig = function (server) {//creamos la variable passportConfig y le pasamos nuestro servidor

	server.use(passport.initialize());
	server.use(passport.session());

	passport.serializeUser(function (user, done) {
		done(null, user); // req.user
	});
	passport.deserializeUser(function (user, done) {
		done(null, user);
	});

	require('./local')(server);//Para utilizar el archivo local.js

};

module.exports = passportConfig;