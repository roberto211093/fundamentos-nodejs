'use strict';
var express = require('express'),
	router = express.Router(),
	Book = require('../book/models').Book;//traemos el model de libro

router.route('/')

	.get(function (req, res) {
		Book.find().exec()//hacemos una consulta de libros con "Book.find()", ".exec()" es una promesa
		.then(function (books) {//envio books como contexto
			res.render('main/index.html', {books : books});//la ruta de las vistas estan configuradas en el server.js
			//debemos en el template recoger los datos y mostrarlos
		})
    });
    
module.exports = router; //Exportamos la variable router