var hmt = {
    //The final HTML tags
    tags:'',
    //Default tag settings
    oTags:{},
    //Tags settings as overridden in the response
    rTags: {},

    //initialize the hmt object
    init: function(oTags, rTags){
        this.oTags = oTags;
        this.rTags = rTags;
        this.merge(oTags, rTags);
        this.html();
        this.schema();
        this.twitter();
        this.openGraph();
    },

    //merge the overriden settings into the original settings
    merge: function(){

        var result = {};
        for(var key in this.oTags){
            result[key] = this.oTags[key];
        }

        for(var key in this.rTags){
            result[key] = this.rTags[key];
        } 

        this.oTags = result;
    },

    //build the "original" HTML tags
    html: function(){

        this.tags = this.tags + `<!-- meta tags -->\n`;

        this.tags = this.tags  + `<title>${this.oTags.title}</title>\n`;

        if(this.oTags.description){
            this.tags = this.tags
                + `<meta name="description" content="${this.oTags.description}">\n`;
        }

        if(this.oTags.keywords){
            this.tags = this.tags
                + `<meta name="keywords" content="${this.oTags.keywords}">\n`;
        }

        if(this.oTags.canonical){
            this.tags = this.tags +  `<link rel="canonical" href="${this.oTags.canonical}">\n`;
        }

        if(this.oTags.author){
            this.tags = this.tags +  `<meta name="author" content="${this.oTags.author.name}">\n`;
        }

        if(this.oTags.robots){
            this.tags = this.tags +  `<meta name="robots" content="${this.oTags.robots}">\n`;
        }

    },

    //Build schema.org tags
    schema: function(){

        if(this.oTags.schema){
            this.tags = this.tags + `<!-- schema.org -->\n`;

            if(this.oTags.title){
                this.tags = this.tags 
                    + `<meta itemprop="name" content="${this.oTags.title}">\n`;
            }

            if(this.oTags.description){
                this.tags = this.tags
                    + `<meta itemprop="description" content="${this.oTags.description}">\n`;
            }

            if(this.oTags.img.src){
                this.tags = this.tags
                    + `<meta itemprop="image" content="${this.oTags.img.src}">\n`;
            }
        }
    },

    //Build a Twitter card
    twitter: function(){
        
        if(this.oTags.twitter){
            this.tags = this.tags + `<!-- Twitter -->\n`;

            this.tags = this.tags 
                + `<meta name="twitter:card" content="${this.oTags.twitter.type}">\n`
                + `<meta name="twitter:title" content="${this.oTags.title}">\n`
                + `<meta name="twitter:description" content="${this.oTags.description}">\n`
                + `<meta name="twitter:creator" content="${this.oTags.twitter.authorHandle}">\n`;

                if(this.oTags.img.src){
                    this.tags = this.tags
                        + `<meta name="twitter:image" content="${this.oTags.img.src}">\n`;
                }
            
                if(this.oTags.twitter.pubHandle){
                    this.tags = this.tags
                        + `<meta name="twitter:site" content="${this.oTags.twitter.pubHandle}">\n`;
                }
        }
    },

    //Build the open graph tags
    openGraph: function(){
        if(this.oTags.og){
            this.tags = this.tags + `<!-- OpenGraph/Facebook -->\n`;

            this.tags = this.tags 
                + `<meta property="og:title" content="${this.oTags.title}">\n`
                + `<meta property="og:type" content="${this.oTags.og.type}">\n`
                + `<meta property="og:url" content="${this.oTags.url}">\n`
                + `<meta property="og:image" content="${this.oTags.img.src}">\n`
                + `<meta property="og:description" content="${this.oTags.description}">\n`
                + `<meta property="og:site_name" content="${this.oTags.siteName}">\n`;
        }
    },

    //Return all tags as an HTML string
    getTags: function(){
        return this.tags;
    }
};


module.exports = function(options) {

    var oTags = options || {};
    var tags='';

    return function(req, res, next) {

        var rTags = res.data.tags || {};

        hmt.init(oTags, rTags);
        tags = hmt.getTags();

        let data = {
            vars: res.data.vars || {}, 
            tags: tags
        }

        return res.render(
            res.data.view || 'error', 
            data
        );
    }
}
