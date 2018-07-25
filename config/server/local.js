'use strict';
var qt = require('quickthumb');//llamamos a quickthumb para poder mostrar las imagenes en las url's

var config = function (server) {
	//console.log('Estoy en Desarrollo, pero en otro archivo');
	server.use(function (req, res, next) {
		req.MEDIA_URL = 'http://localhost:8000/media';//el req.MEDIA_URL lo creamos porq lo utilizamos para crear un nuevo libro
		next();
	});
	server.use(qt.static(__dirname + '/../../'))//lo configuramos para mostrar la imagenes en "http://localhost:8000/media/books/nombredelibro.png"
	//__dirname es una variable incognita que nos dice en que lugar estamos, nos da la ruta
	//le concateno '/../../' porque quiero ir 2 niveles antes de la ruta q trae __dirname
};

module.exports = config;