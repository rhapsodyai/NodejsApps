#!/usr/bin/env node --harmony
'use strict';
const
	express = require('express'),
	morgan = require('morgan'),
	cookieParser = require('cookie-parser'),
	redisClient = require('redis').createClient(),
	RedisStore = require('connect-redis')(express),
	app = express();

const config = {
	bookdb: 'http://localhost:5984/books/',
	b4db: 'http://localhost:5984/b4/'
};

require('./lib/book-search.js')(config, app);
require('./lib/field-search.js')(config, app);
require('./lib/bundle.js')(config, app);


app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/bower_components'));
app.use(morgan('combined'));
app.use(cookieParser());

app.use(express.session({
	secret: 'unguessable',
	store: new RedisStore({
		client: redisClient
	})
}));

app.get('/api/:name', function(req, res) {
	res.json(200, { "hello": req.params.name });
});

app.listen(3000, function() {
	console.log("ready captain.");
});

app.use(express.cookieParser());
app.use(express.session({ secret: 'unguessable' }));
