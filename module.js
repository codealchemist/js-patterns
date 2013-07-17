/* 
 * Revealing module pattern example.
 */

/**
 * Post object gets the return of the immediate function.
 * Revealing module pattern way.
 * Variables inside the function closure remain private.
 * The return of the function creates the module's public interface and it's
 * what the Post object will give access to.
 * 
 * @author Alberto Miranda <b3rt.js@gmail.com>
 * @returns {Object}
 */
var Post = function() {
    var localId = null,
        id = null,
        message = null;

    var log = function(message) {
        console.log('[ POST ]--> ' + message);
    };

    var publish = function() {
        log('publishing post ' + localId + ': "' + message + '"');
        id = new Date().getTime();
    };
    
    var getLocalId = function() {
        return localId;
    };
    
    var getId = function() {
        log('getId: id: ' + id);
        return id;
    };
    
    var getMessage = function() {
        log('getMessage: message: ' + message);
        return message;
    };
    
    var load = function(localIdToLoad) {
        log('load post ' + localIdToLoad);
        localId = localIdToLoad;
        message = 'Rock and Roll!';
    };
     
    //public interface
    return {
        publish: publish,
        getLocalId: getLocalId,
        getId: getId,
        getMessage: getMessage,
        load: load
    };
}();

//------------------------------------------------------------------------------

//test
Post.load(42);
Post.getMessage();
if (Post.getId() === null) {
    Post.publish();
}
Post.getId();
