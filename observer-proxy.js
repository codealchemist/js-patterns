/* 
 * Observer-proxy pattern example.
 * The proxy is used to auto-trigger events matching the name of each observed
 * object's method.
 * So, calling "Post.publish()" will automatically trigger the "publish" event
 * on the Post object.
 */

/**
 * Calls passed callback on every method call of passed object.
 * Callback will receive the following params: object, methodName.
 * After calling the callback the original method will be called.
 * If exceptions is passed each of its elements will represent a method that
 * won't be proxied.
 * 
 * @author Alberto Miranda <b3rt.js@gmail.com>
 * @param {Object} object
 * @param {function} callback
 * @param {Array} exceptions
 * @returns {Object} a proxy of passed object
 */
var Proxy = function(object, callback, exceptions){
    var instance = {};
    exceptions = exceptions || [];
    var log = function(message) {
        console.log('[ PROXY ]--> ' + message);
    };
    
    if (typeof object !== 'object'){
        log('Not an object!');
        return false;
    }
    
    var isException = function(methodName){
        //TODO: add indexOf polyfill for IE8 and earlier
        if (exceptions.indexOf(methodName) !== -1) return true;
        return false;
    };
    
    var getProxiedMethod = function(propertyName, property) {
        return function() {
            //call callback with default params
            log('callback for ' + propertyName);
            callback(object, propertyName);

            //call method
            log('call original method for ' + propertyName);
            property.apply(object, arguments);
        };
    };
    
    //copy object methods into proxy
    var property;
    for(var propertyName in object) {
        property = object[propertyName];
        instance[propertyName] = property; //assign same property by default
        if (typeof property === 'function') {
            //if it's an exception use the original method
            if (isException(propertyName)) {
                log('exception on: ' + propertyName);
                continue;
            }
            
            log('proxying "' + propertyName + '"');
            instance[propertyName] = getProxiedMethod(propertyName, property);
        }
    }
    
    return instance;
};

//------------------------------------------------------------------------------

/**
 * This object gives observable capability to other objects.
 * 
 * @author Alberto Miranda <b3rt.js@gmail.com>
 * @returns {Object}
 */
var Observable = function(object) {
    var observers = function() {
        var list = {};
        var add = function(event, callback) {
            list[event] = list[event] || [];
            list[event].push(callback);
        };
        
        var exists = function(event, callback) {
            if (!list[event]) return false; //the event is not being observed
            
            //iterate observer to see if passed callback is already assigned to
            //passed event
            var currentObserversList = list[event],
                total = currentObserversList.length,
                currentObserver;
            for(var i=0; i<total; ++i) {
                currentObserver = currentObserversList[i];
                if (callback === currentObserver) return true;
            }
            return false;
        };
        
        var trigger = function(event, object) {
            //no observers for this event
            if (!list[event]){
                log('no observers for "' + event + '"');
                return false;
            }
            
            //call all registered observers
            var currentObserversList = list[event],
                total = currentObserversList.length,
                currentObserver;
            for(var i=0; i<total; ++i) {
                currentObserver = currentObserversList[i];
                currentObserver(object);
            }
        };
        
        var remove = function(event) {
            delete list[event];
        };
        
        return {
            add: add,
            remove: remove,
            exists: exists,
            trigger: trigger
        };
    }();
    
    var log = function(message) {
        console.log('[ OBSERVABLE ]--> ' + message);  
    };
    
    var on = function(event, callback) {
        //if already handled return false so each observer is called once
        if ( observers.exists(event, callback) ) return false;
        
        //add observer
        observers.add(event, callback);
    };
    
    /**
     * Turns off passed event. Won't be observed anymore.
     */
    var off = function(event) {
        observers.remove(event);
    };
    
    var trigger = function(event) {
        log('trigger event: ' + event);
        observers.trigger(event, object);
    };
    
    //proxy all calls to object methods to automatically trigger events named
    //after every method on each method call
    object = Proxy(object, function(obj, methodName){
        trigger(methodName); //auto-trigger!
    });
    
    //add observable methods to object
    object.on = on;
    object.off = off;
    object.trigger = trigger;
    
    //return proxied observable
    return object;
};

//------------------------------------------------------------------------------

//create an object to observe
var Post = {
    id: 42,
    message: 'METAAAAAL!',
    log: function(message) {
        console.log('[ POST ]--> ' + message);
    },
    publish: function() {
        this.log('publish');
    }
};

//and another one
var User = {
    id: 109,
    email: 'b3rt.js@gmail.com',
    username: 'thor',
    log: function(message) {
        console.log('[ USER ]--> ' + message);
    },
    save: function(){
        this.log('save');
    }
};

//------------------------------------------------------------------------------

//make Post object observable
Post = new Observable(Post);

//do something on 'publish' event
//note that 'publish' event IS FIRED BY 'publish' method on Post
Post.on('publish', function(obj) {
    console.log('Post.publish event called');
    console.log(obj);
});

//auto-trigger publish event
Post.publish();



//make User object observable
User = new Observable(User);

//do something on 'save' event
User.on('save', function(obj) {
    console.log('User.save event fired');
});

//and do something else too on 'save' event
User.on('save', function(obj){
    console.log('User.save event called for User "' + obj.email + '"');
});

//auto-trigger save event by calling save method
User.save();

//turn off save event on User and try the auto-trigger again
User.off('save');
User.save();
