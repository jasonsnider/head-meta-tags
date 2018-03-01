var express = require('express');
var app = express();
var headMetaTags = require('../index.js');

var config = {
    // Traditional
    title: 'Hello World',
    img: { src: '/path/to/image' },
    description: 'A simple greeting to the world.',
    keywords: 'key, words, keywords',
    siteName: 'Example',
    url: 'https://example.com/articles/11',
    canonical: 'https://example.com/some-fancy-slug',

    // Twitter
    twitter: {
        type: 'summary',
        authorHandle: '@authorHandle',
        pubHandle: '@pubHandle'
    },

    // OpenGraph/Facebook
    og: {
        type: 'article'
    }
};

app.use(headMetaTags(config));

app.get('/', function(req, res){
    res.send(res.tags);
});

var server = app.listen('3000',function(){
    var port = server.address().port;
    console.log('Test app running at port %s', port);
});

module.exports = server;