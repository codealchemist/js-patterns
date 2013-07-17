/* 
 * Module with prototypal inheritance example.
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
var Post = function(message) {
    var localId = null,
        id = null;

    var log = function(message) {
        console.log('[ POST ]--> ' + message);
    };

    var publish = function() {
        log('publishing: "' + message + '"');
        id = new Date().getTime();
    };
    
    var getLocalId = function() {
        return localId;
    };
    
    var getId = function() {
        return id;
    };
    
    //set local id for current Post instance
    localId = new Date().getTime();
    
    //public interface
    return {
        publish: publish,
        getLocalId: getLocalId,
        getId: getId
    };
};

//------------------------------------------------------------------------------

//create a Post child
var FacebookPost = extend(new Post('YEAH!'));

//add new methods to the child object
FacebookPost.getLikes = function() {
    return 42;  
};

FacebookPost.getIds = function() {
    return {
        local: this.getLocalId(),
        remote: this.getId()
    };
};

//------------------------------------------------------------------------------

//test
FacebookPost.publish();
FacebookPost.getIds();
