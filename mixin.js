/* 
 * Mixin example.
 */

/**
 * Mixin pattern.
 * Mixes all objects passed as params in a new object and returns it.
 * 
 * @author Alberto Miranda <b3rt.js@gmail.com>
 * @param {Array} objects to mix
 * @returns {Object} the resulting mix
 */
function mixin(objects) {
    var total = objects.length,
        mix = {},
        currentObject;

    for (i=0; i<total; ++i) {
        currentObject = objects[i];
        for (property in currentObject) {
            mix[property] = currentObject[property];
        }
    }
    
    return mix;
}

//------------------------------------------------------------------------------

//create a base object we want to give more functionality to
//suppose this parent or base object was filled with our db data
var Post = {
    id: 12,
    userId: 2,
    message: "YEAH!",
    socialId: null,
    socialNetwork: "facebook",
    log: function(message) {
        console.log('[ POST ]--> ' + message);  
    },
    save: function() {
        this.log('save post ' + this.id);
    },
    delete: function() {
        this.log('delete post ' + this.id);
    },
    show: function() {
        this.log('message for post ' + this.id + ': ' + this.message);
    }
};

//------------------------------------------------------------------------------

//create an object with Post file logging features
var PostFileLogger = {
    writeLog: function() {
        console.log('[ FILE-LOGGER ]--> write to log file: "' + this.id + ': ' + this.message + '"');
    }
};

//create an object with Post email features
var PostEmailer = {
    sendmail: function(to) {
        console.log('[ EMAILER ]--> send email to "' + to + '" with body: ' + this.message);
    }
};

//create an object with rendering features
var PostRenderer = {
    render: function() {
        console.log('[ RENDERER ]--> render post ' + this.id);
    }
};

//------------------------------------------------------------------------------

//give our Post object new features by mixing them into it
var FeaturedPost = mixin([
    Post, 
    PostFileLogger, 
    PostEmailer, 
    PostRenderer
]);

//------------------------------------------------------------------------------

//test
FeaturedPost.writeLog();
FeaturedPost.sendmail('b3rt@gmail.com');
FeaturedPost.render();
FeaturedPost.save();
