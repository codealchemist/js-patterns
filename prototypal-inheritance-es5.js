/* 
 * Prototypal inheritance example.
 * Using ES5 Object.create().
 */

//create a parent to inherit from
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

//create a child adding new methods to it
var FacebookPost = Object.create(Post, {
    fbLog: {
        value: function(message) {
            console.log('[ FACEBOOK-POST ]--> ' + message);  
        }
    },
    publish: {
        value: function() {
            if (this.socialId === null){
                this.fbLog('publishing post ' + this.id + ' on Facebook...');

                var socialId = '10151562198042671'; //suppose publishing was done here
                this.fbLog('DONE! Social ID: ' + socialId);
            } else {
                this.fbLog('post ' + this.id + ' was already published with Social ID "' + this.socialId + '"');
            }
        }
    },
    getLikes: {
        value: function() {
            return 42;
        }
    }
});

//------------------------------------------------------------------------------

//test
FacebookPost.publish();
FacebookPost.save();
