/* 
 * Prototypal inheritance example.
 */

/**
 * Returns a new object which extends passed one.
 * 
 * @author Alberto Miranda <b3rt.js@gmail.com>
 * @param {Object} parent
 * @returns {Object}
 */
function extend(parent) {
    function F(){}; //use empty function constructor
    F.prototype = parent; //point its prorotype to our passed parent object
    
    //return a new object which inherits from parent
    //then you can add more properties/methods to this returned child
    //if you call any non-existing property/method on the child the call
    //will go up thru the prototype chain; this is how we achieve inheritance. 
    return new F();
}

//------------------------------------------------------------------------------

//create a parent to inherit from
//suppose this parent or base object was filled with our db data
var Post = {
    id: 12,
    userId: 2,
    message: "YEAH!",
    socialId: null,
    socialNetwork: "facebook",
    log: function(message) {
        console.log('[ POST ]--> ' + this.message);  
    },
    save: function() {
        log('save post ' + this.id);
    },
    delete: function() {
        log('delete post ' + this.id);
    },
    show: function() {
        log('message for post ' + this.id + ': ' + this.message);
    }
};

//------------------------------------------------------------------------------

//create a child
var FacebookPost = extend(Post);

//add methods to child object
FacebookPost.publish = function() {
    if (this.socialId === null){
        this.log('publishing post ' + this.id + ' on Facebook...');
        
        var socialId = '10151562198042671'; //suppose publishing was done here
        this.log('DONE! Social ID: ' + this.socialId);
    } else {
        this.log('post ' + this.id + ' was already published with Social ID "' + this.socialId + '"');
    }
};

FacebookPost.getLikes = function() {
    return 42;  
};

//------------------------------------------------------------------------------

//test
FacebookPost.publish();
