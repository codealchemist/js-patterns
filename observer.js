/* 
 * Observer pattern example.
 */

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
            if (!list[event]) return false; //no observers for this event
            
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
    
    var on = function(event, callback) {
        //if already handled return false so each observer is called once
        if ( observers.exists(event, callback) ) return false;
        
        //add observer
        observers.add(event, callback);
    };
    
    /**
     * Turns off passed event. Won't be observed anymore.
     */
    var off = function(event) {
        observers.remove(event);
    };
    
    var trigger = function(event) {
        observers.trigger(event, this);
    };
    
    //add observable methods to object and return it
    object.on = on;
    object.off = off;
    object.trigger = trigger;
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
//note that 'publish' event is independent from 'publish' method on Post
Post.on('publish', function(obj) {
    console.log('Post.publish event called');
    console.log(obj);
});

//trigger publish event
Post.trigger('publish');



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

//trigger publish event
User.trigger('save');

//turn off save event on User and try the trigger again
User.off('save');
User.trigger('save');
