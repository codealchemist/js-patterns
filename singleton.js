/* 
 * Singleton example.
 */

//the most basic singleton example would be
var Singleton = {
    id: 'ROCK!'
};

/**
 * Immediate function returning a singleton object with a getInstance method.
 * 
 * @author Alberto Miranda <b3rt.js@gmail.com>
 * @return {Object}
 */
var Resource = function() {
    var id = '42';
    var instance = null;
    var getInstance = function() {
        //if we already have a created instance return it
        if (instance !== null) return instance;

        //create the instance object and return it
        instance = {
            getId: function() {
                return id;
            }
        };
        return instance;
    };
    
    return {
        getInstance: getInstance
    };
}();

//------------------------------------------------------------------------------

//get an instance
var resource1 = Resource.getInstance();

//get another instance
var resource2 = Resource.getInstance();

//ids will remain always the same and since "id" its inside a closure there's
//no way to change it from outside (it's private)
resource1.getId() === resource2.getId();
