var express = require('express');
var app = express();
var headMetaTags = require('../index.js');

app.set('view engine', 'ejs');

var config = {
    tags: {
        // Traditional
        title: 'Hello World',
        description: 'A simple greeting to the world.',
        keywords: 'key, words, keywords',
        canonical: 'https://example.com/some-fancy-slug',

        // Common
        img: { src: '/path/to/image' },
        siteName: 'Example',
        url: 'https://example.com/articles/11',
        
        // schema.org/Google
        schema: true,

        // Twitter
        twitter: {
            //Requires title, description, image to be set
            type: 'summary',
            authorHandle: '@authorHandle',
            pubHandle: '@pubHandle'
        },

        // OpenGraph/Facebook
        og: {
            //Requires title, description, image to be set
            type: 'article'
        }
    }
};

app.get('/', function(req, res, next){
    res.data = {
        view: 'index'
    };
    next();
});

app.get('/override', function(req, res, next){
    res.data = {
        vars: {
            test: 'hello',
            world: 'world'
        },
        tags: {
            title:'New World',
            description: 'An overriden greeting to the world.'
        },
        view: 'index'
    };
    next();
});

app.get('/nosocial', function(req, res, next){
    res.data = {
        vars: {
            test: 'hello',
            world: 'world'
        },
        tags: {
            schema: false,
            twitter:false,
            og:false
        },
        view: 'index'
    };
    next();
});

app.use(headMetaTags(config.tags));

var server = app.listen('3000', function(){
    var port = server.address().port;
    console.log('Test app running at port %s', port);
});

module.exports = server;