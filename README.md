# head-meta-tags

Provides a default configuration of social and traditional html meta tags that can be selectively overridden on a per route basis. Works by replacing ```res.render()``` with a JSON object within the route.

## Configuration

*Full example*

configured to show all possible tags.

```js
var config = {

    // Traditional
    title: 'Hello World',
    description: 'A simple greeting to the world.',
    keywords: 'key, words, keywords',
    canonical: 'https://example.com/some-fancy-slug',

    // Common
    img: { src: '/path/to/image' },
    siteName: 'Example',
    url: 'https://example.com/articles/11',
    
    // schema.org
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
};
```

*Full example* outputs the following.

```html
<title>Hello World</title>
<meta name="description" content="A simple greeting to the world.">
<meta name="keywords" content="key, words, keywords">
<link rel="canonical" href="https://example.com/some-fancy-slug">
<!-- schema.org -->
<meta itemprop="name" content="Hello World">
<meta itemprop="description" content="A simple greeting to the world.">
<meta itemprop="image" content="/path/to/image">
<!-- Twitter -->
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Hello World">
<meta name="twitter:description" content="A simple greeting to the world.">
<meta name="twitter:creator" content="@authorHandle">
<meta name="twitter:image" content="/path/to/image">
<meta name="twitter:site" content="@pubHandle">
<!-- OpenGraph/Facebook -->
<meta property="og:title" content="Hello World">
<meta property="og:type" content="article">
<meta property="og:url" content="https://example.com/articles/11">
<meta property="og:image" content="/path/to/image">
<meta property="og:description" content="A simple greeting to the world.">
<meta property="og:site_name" content="Example">
```

*Just a title*

Omit a tag to remove it, this is the simplest configuration.

```js
var config = {
    // Traditional
    title: 'Hello World'
};
```

*Just a title* outputs the following.
```html
<title>Hello World</title>
<meta name="description" content="A simple greeting to the world.">
```


## Usage

Provide a configuration object.
```js
var config = {
    title: 'Hello World',
    description: 'A simple greeting to the world.',
}
```

Require head-meta-tags.
```js
var headMetaTags = require('head-meta-tags');
```

Override a selected tag by adding a tags attribute to the reponse object. This should only include the tags you want to override.
```js
app.get('/', function(req, res, next){
    res.data = {
        // Accessible in the view by vars.SOME_VARIABLE_NAME
        vars: {},
        // Override selected tags
        tags: {
            title:'New World',
            description: 'An overriden greeting to the world.'
        },
        // Equates to res.render('index');
        view: 'index'
    };
    next();
});
```

Call headMetaTags with the with the configuration object.
```js
app.use(headMetaTags(config));
```




