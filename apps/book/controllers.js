'use strict';
var express = require('express'),
	router = express.Router(),
	formidable = require('formidable'),//llamamos a formidable para guardar las img's de los libros
	path = require('path'),//path es un modulo que esta en el nucleo de Node que sirve para manejar las rutas de nuestros sistemas de archivos
	slug = require('slug'),
	fs = require('fs'),
	Book = require('./models').Book,//llamamos al modelo libro
	isLoggedIn = require('../user/middlewares').isLoggedIn;//llamamos a isLoggedIn

//router.use(isLoggedIn);//para que todas las rutas esten protegidas
router.route('/libro/:book_slug')

	.get(function (req, res) {//realizamos la consulta
		Book.findOne({slug : req.params.book_slug}).exec()//Book.findOne en este caso porque solo vamos a buscar 1 libro
		//"slug : req.params.book_slug" se traduce a --> donde el slug = al slug que viene como parametro en la url
		//book_slug es el nombre que tenemos es la parte de la ruta
		.then(function (book) {//lo pasamos por contexto
			res.render('book/book_detail.html', {book : book});//book = book
			//res.render('book/book_detail.html');
		});
	});

	router.route('/admin/crear-libro')
	.get(isLoggedIn, function (req, res) {//llamamos a isLoggedIn para saber si esta logueado
		res.render('book/book_create.html')
	}).
	post(isLoggedIn, function (req, res) {//metodo post porq es por donde vienen los datos en book_create.html
		var form = new formidable.IncomingForm();//creamos la variable form como dice la guia de formidable
		var path_file = path.join(__dirname, '..', '..', 'media', 'books');//creamos la variable path_file
		//__dirname es una variable incognita que nos dice en que lugar estamos, nos da la ruta
		//pasamos '..', '..', para subir 2 niveles (para estar al nivel del proyecto)
		//'media' es el nombre de la carpeta en donde van a estar las imagenes
		//'books' es el nombre de la carpeta especifica donde guardamos las imagenes, es decir, 'books' estara dentro de 'media'
		form.uploadDir = path_file;//creamos la variable form.uploadDir, esto lo que nos dice es en donde vamos a subir la imagen
		//return;
		form.parse(req, function (err, fields, files) {//form.parse le pasamos el request, la funcion, el error, los campos, y los archivos
			console.log(files);
			console.log(fields);
			var book = new Book({//creamos la variable book para guardar un nuevo libro
				title : fields.title,//titulo
				slug : slug(fields.title.toLowerCase()),//slug de la img del libro
				summary : fields.summary,//resumen
				author : fields.author,//autor
				image : req.MEDIA_URL + '/books/' + files.image.name//imagen
			});
				//image : req.MEDIA_URL + '/books/' + files.image.name//imagen
			book.save(function (err) {
				if (err) {//Si hay un error
					console.log(err);
					return;
				};
			});
		});
		form.on('end', function (fields, files) {
		var file_name = this.openedFiles[0].path;
		var new_file_name = this.openedFiles[0].name;
			fs.rename(file_name, path_file + '/' + new_file_name, function (err, stats){
				if (err) {console.log(err)};
				res.redirect('/admin/crear-libro/');
			});
		});
	});

module.exports = router;