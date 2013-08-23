/*
 * Publisher / Subscriber implementation.
 */

var publisher = function() {
    var eventMap = {};
    
    var log = function(message) {
        console.log('[ PUBLISHER ]--> ' + message);
    };
    
    /**
     * Subscribes passed callback to passed event.
     * Returns an identifier for created subscription that can be used to
     * unsubscribe it.
     * 
     * @author Alberto Miranda <b3rt.js@gmail.com>
     * @param {string} event
     * @param {function} callback
     * @return {string} id
     */
    var subscribe = function(event, callback) {
        log('subscribe: event "' + event + '"');
        
        //create an id
        var timestamp = new Date().getTime();
        
        //add subscription
        if (typeof eventMap[event] === 'undefined') eventMap[event] = [];
        eventMap[event].push({
            id: timestamp,
            callback: callback
        });
        
        //create and return id
        var id = {
            id: timestamp,
            event: event
        };
        return id;
    };
    
    /**
     * Unsubscribes subscription matching passed id.
     * Returns true if subscripion was successfully removed, false if not found.
     * 
     * @author Alberto Miranda <b3rt.js@gmail.com>
     * @param {object} id
     * @return {boolean}
     */
    var unsubscribe = function(id) {
        log('unsubscribe: id: ');
        console.log(id);
        
        //get subscriptions
        var subscriptions = eventMap[id.event],
            total = subscriptions.length,
            currentSubscription;
    
        //iterate subscriptions and remove the one that matches passed id
        for (var i=0; i<total; ++i) {
            currentSubscription = subscriptions[i];
            if (currentSubscription.id === id.id) {
                eventMap[id.event].splice(i,1);
                log('unsubscribe: removed subscription, id:');
                console.log(id);
                return true;
            }
        }
        
        return false;
    };
    
    /**
     * Publishes passed event calling every subscribed callback.
     * If there are no subscriptions for passed event returns false.
     * 
     * @author Alberto Miranda <b3rt.js@gmail.com>
     * @param {string} event
     * @param {object} params
     */
    var publish = function(event, params) {
        log('publish: event "' + event + '" with params:');
        console.log(params);
        
        //get subscriptions for passed event
        //if no subscription return false
        var subscriptions = eventMap[event];
        if (!subscriptions || subscriptions.length === 0) {
            log('publish: no subscription for event "' + event + '"');
            return false;
        }
        var params = params || null,
            total = subscriptions.length,
            currentSubscription;
    
        //iterate subscriptions and call their callbacks passing params
        for (var i=0; i<total; ++i) {
            currentSubscription = subscriptions[i];
            if (typeof currentSubscription.callback === 'function') {
                currentSubscription.callback(params, event);
            }
        }
    };
    
    //public interface
    return {
        publish: publish,
        subscribe: subscribe,
        unsubscribe: unsubscribe
    };
}();

//------------------------------------------------------------------------------

//create test object
var Soldier = {
    name: 'John Snow',
    log: function(message) {
        console.log('[ JOHN SNOW ]--> ' + message);
    },
    attack: function(params, event) {
        Soldier.log('event: ' + event);
        Soldier.log('params:');
        console.log(params);
    },
    freeze: function(params, event) {
        Soldier.log('Wow, what should I do now?!');
        Soldier.log('event: ' + event);
        Soldier.log('params:');
        console.log(params);
    }
};

//subscribe to an event
var subscriptionId1 = publisher.subscribe('battle/starts', Soldier.attack);
var subscriptionId2 = publisher.subscribe('redhead/approaches', Soldier.freeze);

//publish event
publisher.publish('battle/starts', {enemy: 'White Walker'});

//unsubscribe
publisher.unsubscribe(subscriptionId1);

//publish event
publisher.publish('battle/starts', {enemy: 'DRAGON!'});
publisher.publish('redhead/approaches', {looks: 'misterious'});
