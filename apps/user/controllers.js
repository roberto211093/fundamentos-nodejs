'use strict';
var express = require('express'),
	router = express.Router(),
	User = require('./models').User; //importamos el modelo de usuarios


router.route('/salir/')

	.get(function (req, res) {
		req.logout();//logout es un metodo q nos da Passport.js para finalizar session
		res.redirect('/');//redireccionamos a la raiz
	});

router.route('/ingresar/')

	.get(function (req, res) {
		var context = {//creamos la variable context que es todo lo que vamos a enviar al template que utiliza la url
			error_message : req.flash('error')[0]//creamos la variable error_message y la igualamos al error, se coloca [0] porque viene como una lista
		};
		res.render('user/login.html', context);//redirigimos al template login.html y enviamos la variable context
	});


router.route('/registrar/')
	.get(function (req, res) {
		res.render('user/register.html');
	})
	.post(function (req, res) {
		console.log(req.body);
		var user = new User({
			username : req.body.username,
			password : req.body.password
		});
		user.save(function (err) {//Guardamos en DB
			if (err) {
				console.log(err);//Si hay algun error
			};
			//req.login();//Es un metodo de Pasaport.JS, lo usamos para que el usuario no vuelva a rellenar sus datos (lo registramos)
			res.redirect('/ingresar/');//Si todo ok redireccionamos a la url ingresar
		});
	});
	module.exports = router;