var request = require('supertest');
var should = require('should');


describe('starting server', function () {

  var server;
  var headMetaTags;
  
  beforeEach(function () {
    server = require('./server');
    headMetaTags = require('../index.js');
  });

  afterEach(function () {
    server.close();
  });

  it('testing all tags', function testAllTags(done) {

    request(server)
      .get('/')
      .expect(function(res) {
        res.text.should.containEql('<title>Hello World</title>');
        res.text.should.containEql('<meta name="description" content="A simple greeting to the world.">');
        res.text.should.containEql('<meta name="keywords" content="key, words, keywords">');
        res.text.should.containEql('<link rel="canonical" href="https://example.com/some-fancy-slug">');
        res.text.should.containEql('<meta itemprop="name" content="Hello World">');
        res.text.should.containEql('<meta itemprop="description" content="A simple greeting to the world.">');
        res.text.should.containEql('<meta itemprop="image" content="/path/to/image">');
        res.text.should.containEql('<meta name="twitter:card" content="summary">');
        res.text.should.containEql('<meta name="twitter:title" content="Hello World">');
        res.text.should.containEql('<meta name="twitter:description" content="A simple greeting to the world.">');
        res.text.should.containEql('<meta name="twitter:creator" content="@authorHandle">');
        res.text.should.containEql('<meta name="twitter:image" content="/path/to/image">');
        res.text.should.containEql('<meta name="twitter:site" content="@pubHandle">');
        res.text.should.containEql('<meta name="twitter:title" content="Hello World">');
        res.text.should.containEql('<meta property="og:title" content="Hello World">');
        res.text.should.containEql('<meta property="og:type" content="article">');
        res.text.should.containEql('<meta property="og:url" content="https://example.com/articles/11">');
        res.text.should.containEql('<meta property="og:description" content="A simple greeting to the world.">');
        res.text.should.containEql('<meta property="og:site_name" content="Example">');
      })
      .expect(200, done);
  });

  it('testing all tags with overrides', function testAllTags(done) {

    request(server)
      .get('/override')
      .expect(function(res) {
        res.text.should.containEql('<title>New World</title>');
        res.text.should.containEql('<meta name="description" content="An overriden greeting to the world.">');
        res.text.should.containEql('<meta name="keywords" content="key, words, keywords">');
        res.text.should.containEql('<link rel="canonical" href="https://example.com/some-fancy-slug">');
        res.text.should.containEql('<meta itemprop="name" content="Hello World">');
        res.text.should.containEql('<meta itemprop="description" content="A simple greeting to the world.">');
        res.text.should.containEql('<meta itemprop="image" content="/path/to/image">');
        res.text.should.containEql('<meta name="twitter:card" content="summary">');
        res.text.should.containEql('<meta name="twitter:title" content="Hello World">');
        res.text.should.containEql('<meta name="twitter:description" content="A simple greeting to the world.">');
        res.text.should.containEql('<meta name="twitter:creator" content="@authorHandle">');
        res.text.should.containEql('<meta name="twitter:image" content="/path/to/image">');
        res.text.should.containEql('<meta name="twitter:site" content="@pubHandle">');
        res.text.should.containEql('<meta name="twitter:title" content="Hello World">');
        res.text.should.containEql('<meta property="og:title" content="Hello World">');
        res.text.should.containEql('<meta property="og:type" content="article">');
        res.text.should.containEql('<meta property="og:url" content="https://example.com/articles/11">');
        res.text.should.containEql('<meta property="og:description" content="A simple greeting to the world.">');
        res.text.should.containEql('<meta property="og:site_name" content="Example">');

      })
      .expect(200, done);
  });

  it('testing without social tags', function testAllTags(done) {

    request(server)
      .get('/nosocial')
      .expect(function(res) {
        res.text.should.containEql('<title>Hello World</title>');
        res.text.should.containEql('<meta name="description" content="A simple greeting to the world.">');
      })
      .expect(200, done);
  });
  

});
