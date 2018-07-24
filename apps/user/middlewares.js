'use strict';

var middlewares = {//creamos la variable middlewares

	isLoggedIn : function (req, res, next) {//creamos la variable isLoggedIn para denterminar si el usuario esta logueado
		if (req.user) {
			next();
			return;
		};
		res.redirect('/');
	}

};

module.exports = middlewares;