/* 
 * Sandbox pattern example.
 */

/**
 * Will feed requested features to passed callback.
 * 
 * @author Alberto Miranda <b3rt.js@gmail.com>
 * @param {Array} requestedFeatures
 * @param {function} callback
 * @returns {Sandbox}
 */
function Sandbox(requestedFeatures, callback) {
    this.id = new Date().getTime();
    
    if ( !(this instanceof Sandbox) ) {
        return new Sandbox(requestedFeatures, callback);
    }
    
    //add requested features to features array
    var currentFeatureName,
        features = [],
        totalRequestedFeatures = requestedFeatures.length;
    for(var i=0; i<totalRequestedFeatures; ++i) {
        currentFeatureName = requestedFeatures[i];
        if (Sandbox.features[currentFeatureName]) {
            features.push( Sandbox.features[currentFeatureName] );
        }
    }
    
    //run callback passing features
    callback.apply(this, features);
}

//------------------------------------------------------------------------------

//create some feature objects to use in the sandbox
Sandbox.features = {};
Sandbox.features.Email = {
    featureName: 'Email',
    version: '1.0',
    log: function(message) {
        console.log('[ EMAIL ]--> ' + message);
    },
    sendmail: function(to) {
        this.log('send email to "' + to + '"');
    }
};

Sandbox.features.RemoteLog = {
    featureName: 'RemoteLog',
    version: '1.2',
    log: function(message) {
        console.log('[ REMOTE-LOG ]--> ' + message);
    }
};

Sandbox.features.Database = {
    featureName: 'Database',
    version: '2.4',
    log: function(message) {
        console.log('[ DATABASE ]--> ' + message);
    },
    load: function(collection, id) {
        this.log('load id "' + id + '" from collection "' + collection + '"');
    },
    save: function(collection, id, object) {
        this.log('save id "' + id + '" on collection "' + collection + '", object:');
        console.log(object);
    }
};

//------------------------------------------------------------------------------

//test
Sandbox([
    'Email', 
    'RemoteLog', 
    'Database'
], function(Email, RemoteLog, Database){
    console.log(Email);
    console.log(RemoteLog);
    console.log(Database);
    
    Email.sendmail('b3rt.js@gmail.com');
    RemoteLog.log('Hey!');
    Database.load('posts', 42);
});

