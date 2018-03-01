var hmt = {
    tags:'',
    opts:{},
    init: function(options){
        this.opts = options;
        this.html();
        this.schema();
        this.twitter();
        this.openGraph();
    },

    html: function(){

        this.tags = this.tags  + `<title>${this.opts.title}</title>\n`;

        if(this.opts.description){
            this.tags = this.tags
                + `<meta name="description" content="${this.opts.description}">\n`;
        }

        if(this.opts.keywords){
            this.tags = this.tags
                + `<meta name="keywords" content="${this.opts.keywords}">\n`;
        }

        if(this.opts.canonical){
            this.tags = this.tags +  `<link rel="canonical" href="${this.opts.canonical}">\n`;
        }

        if(this.opts.author){
            this.tags = this.tags +  `<meta name="author" content="${this.opts.author.name}">\n`;
        }

        if(this.opts.robots){
            this.tags = this.tags +  `<meta name="robots" content="${this.opts.robots}">\n`;
        }

    },

    schema: function(){

        this.tags = this.tags 
                + `<!-- schema.org -->\n`;

        if(this.opts.title){
            this.tags = this.tags 
                + `<meta itemprop="name" content="${this.opts.title}">\n`;
        }

        if(this.opts.description){
            this.tags = this.tags
                + `<meta itemprop="description" content="${this.opts.description}">\n`;
        }

        if(this.opts.img.src){
            this.tags = this.tags
                + `<meta itemprop="image" content="${this.opts.img.src}">\n`;
        }
    },

    twitter: function(){
        this.tags = this.tags + `<!-- Twitter -->\n`;

        if(this.opts.twitter){

            this.tags = this.tags 
                + `<meta name="twitter:card" content="${this.opts.twitter.type}">\n`
                + `<meta name="twitter:title" content="${this.opts.title}">\n`
                + `<meta name="twitter:description" content="${this.opts.description}">\n`
                + `<meta name="twitter:creator" content="${this.opts.twitter.authorHandle}">\n`;

                if(this.opts.img.src){
                    this.tags = this.tags
                        + `<meta name="twitter:image" content="${this.opts.img.src}">\n`;
                }
            
                if(this.opts.twitter.pubHandle){
                    this.tags = this.tags
                        + `<meta name="twitter:site" content="${this.opts.twitter.pubHandle}">\n`;
                }
        }
    },

    openGraph: function(){
        if(this.opts.og){
            this.tags = this.tags + `<!-- OpenGraph/Facebook -->\n`;
            this.tags = this.tags 
                + `<meta property="og:title" content="${this.opts.title}">\n`
                + `<meta property="og:type" content="${this.opts.og.type}">\n`
                + `<meta property="og:url" content="${this.opts.url}">\n`
                + `<meta property="og:image" content="${this.opts.img.src}">\n`
                + `<meta property="og:description" content="${this.opts.description}">\n`
                + `<meta property="og:site_name" content="${this.opts.siteName}">\n`;
        }
    },

    getTags: function(){
        return this.tags;
    }
};


module.exports = function(options) {

    var opts = options || {}

    var tags='';

    hmt.init(opts);
    tags = hmt.getTags();

    return function(req, res, next) {
        // Implement the middleware function based on the options object
        res.tags = tags;
        next();
    }
}
