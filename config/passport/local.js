'use strict';
var passport = require('passport'),//requerimos passport
	LocalStrategy = require('passport-local').Strategy,//requerimos la estrategia de autentificacion
	User = require('../../apps/user/models').User;//requerimos el modelo de usuarios

var local = function (server) {//creamos la variable local y le pasamos el servidor

	passport.use(new LocalStrategy({//passport utilice la estrategia q acabamos de crear LocalStrategy
			usernameField : 'username',
			passwordField : 'password',
		},
		function (username, password, done) {
			User.findOne({ username : username}).exec()//findOne va a buscar un solo documento que se encuentre dentro del modelo user o en este caso en la coleccion de usuarios
			//username : username es equivalente a decir busca un username igual a username
			.then(function (user) {//si es correcto, en user va a venir los datos del usuario, sino user va a ser indefinido
				if (!user) {//si user es undefined
					return done(null, false, {'message' : 'El username ' + username + ' no esta registrado!'});
				} else {
					if (user.password === password) {//si viene el usuario preguntamos si la password es correcta
						return done(null, user);//retornamos el usuario
					} else {
						return done(null, false, {'message' : 'La password es incorrecta!'});
					};
				}
			});
		}
	));

	//Declaramos una ruta para que los usuarios se puedan loguear
	server.post('/login', passport.authenticate('local', {
			successRedirect : '/',//En caso de logueo correcto
			failureRedirect : '/ingresar/',//en caso de logueo incorrecto
			failureFlash : true,//Para poder usar mensajes de error cuando pase algo malo en la autentificacion
	}))

};

module.exports = local;//exportamos la variable local