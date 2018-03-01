# head-meta-tags

## Configuration

Here is an example with all possible tags configured. To exclude a tag simply ommit it from the configuration.

```js
var config = {
    // Traditional
    title: 'Hello World',
    description: 'A simple greeting to the world.',
    img: { src: '/path/to/image' },
    keywords: 'key, words, keywords',
    siteName: 'Example',
    url: 'https://example.com/articles/11',
    canonical: 'https://example.com/some-fancy-slug',

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

## Usage

```js
app.use(headMetaTags(config));
```
