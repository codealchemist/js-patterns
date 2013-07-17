/* 
 * Apply pattern example.
 * Also called "borrowing methods pattern".
 */

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

//use methods from our features objects on the base object
PostFileLogger.writeLog.apply(Post);
PostEmailer.sendmail.apply(Post, ['b3rt.js@gmail.com']);
PostRenderer.render.apply(Post);
