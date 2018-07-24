'use strict';
var router_main = require('../apps/main/controllers');
var router_user = require('../apps/user/controllers');
var router_book = require('../apps/book/controllers');

var routers = function (server) {
	server.use('/', router_main);
	server.use('/', router_user);
	server.use('/', router_book);
};

module.exports = routers;