'use strict';
var express = require('express'),
    server = express(),
    swig = require('swig'),//motor de templates
    bodyParser = require('body-parser'),//Para utilizar peticiones Post
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	flash = require('connect-flash'),//Para utilizar mensajes de error
	RedisStore = require('connect-redis')(session),//requerimos redis y le pasamos el session
    port = process.env.PORT || 8000;

/* BODY PARSER, COOKIES, SESSIONS */
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(session({
	store : new RedisStore({//creamos el store
			host : '127.0.0.1',//le pasamos el host
			port : 6379,//puerto
			db : 1//NO ES UNA BASE DE DATOS, es un tipo de almacenamiento en memoria y dispone de 16, en este caso usamos la 1 
		}),
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}));
server.use(flash());

/* PASSPORT */
require('./config/passport')(server);
/* TEMPLATES */
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', __dirname + '/views');//__dirname es una variable predefinida y devuelve la ruta del archivo en donde nos encontramos, al concatenar la carpeta views en los controllers evitamos escribir toda la ruta
swig.setDefaults({cache:false});//desactivamos los cache's de swig para ver los cambios automaticamente

/* STATIC FILES */
server.use(express.static(__dirname + '/public'));

server.listen(port, function () {
	console.log('puerto escuchado es: '+ port);
});

//LOCALS y MIDDLEWARES
server.use(function(req, res, next){//para enviar variables como contexto a todos los templates
	//en req.user esta el usuario logueado, y sino esta logueado pss esta indefinido
	server.locals.user = req.user;//la variable que se coloca luego de locals es la variable que se va a enviar al template, en este caso es user
	next();
});

if (process.env.NODE_ENV === 'dev') {//Si estoy en Desarrollo
	console.log('Estoy en Desarrollo');
	require('./config/server/local')(server);
};
if (process.env.NODE_ENV === 'prod') {//Si estoy en Produccion
	console.log('Estoy en Produccion');
	require('./config/server/prod')(server);
};

require('./routers')(server);//requerimos la variable routers y le pasamos la variable server