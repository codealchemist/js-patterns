/* 
 * Factory pattern example.
 */

var HeroFactory = function() {
    var log = function(message) {
        console.log('[ HERO-FACTORY ]--> ' + message);
    };
    
    var getHero = function(heroName) {
        if (!Heroes[heroName]) return false;
        return Heroes[heroName];
    };
    
    var create = function(heroName) {
        //any complex logic to create heores goes here
        var hero = getHero(heroName);
        if (!hero) {
            log('Sorry, but "' + heroName + '" does not belong to this response team.');
            return false;
        }
        
        log(heroName + ' created!');
        console.log(hero);
        return hero;
    };
    
    return {
        create: create
    };
}();

//------------------------------------------------------------------------------

//add heroes
Heroes = {};
Heroes.Thor = {
    name: 'Thor',
    habilities: ['strength', 'speed', 'agility', 'immortality', 'lightning', 'flying'],
    log: function(message) {
        console.log('[ THOR ]--> ' + message);
    },
    lightning: function() {
        this.log('fires lightning!');
        return this;
    },
    fly: function() {
        this.log('is flying');
        return this;
    }
};

Heroes.IronMan = {
    alias: 'Iron Man',
    name: 'Tony Stark',
    habilities: ['strength', 'speed', 'weapons', 'flying', 'genius'],
    log: function(message) {
        console.log('[ IRONMAN ]--> ' + message);
    },
    fly: function() {
        this.log('is flying');
        return this;
    },
    fire: function(target) {
        this.log('is firing weapons at ' + target);
        return this;
    },
    upgrade: function() {
        this.log('is upgrading the armor');
        return this;
    }
};

Heroes.BlackWidow = {
    alias: 'Black Widow',
    name: 'Natasha Romanoff',
    habilities: ['agility', 'spionage'],
    log: function(message) {
        console.log('[ BLACK-WIDOW ]--> ' + message);
    },
    infiltrate: function(target) {
        this.log('is infiltrating into ' + target);
        return this;
    },
    fight: function(target) {
        this.log('is fighting ' + target);
        return this;
    }
};

Heroes.CaptainAmerica = {
    alias: 'Captain America',
    name: 'Steve Rogers',
    habilities: ['strength', 'speed', 'agility', 'leadership'],
    log: function(message) {
        console.log('[ CAPTAIN-AMERICA ]--> ' + message);
    },
    fight: function(target) {
        this.log('is fighting ' + target);
        return this;
    },
    command: function(hero, action, params) {
        this.log('commands ' + hero.alias + ' to ' + action);
        params = params || null;
        if (!hero instanceof Object) {
            this.log('Sorry, ' + hero.alias + ' is not available.');
            return this;
        }
        if (!hero[action]) {
            this.log('Sorry, ' + hero.alias + ' is unable to ' + action);
            return this;
        }
        
        if (!Array.isArray(params)) params = [params]; //ensure array
        hero[action].apply(hero, params);
        return this;
    }
};

Heroes.Hulk = {
    alias: 'Hulk',
    name: 'Dr. Bruce Banner',
    habilities: ['strength', 'speed', 'jumping', 'undestructible', 'genius'],
    log: function(message) {
        console.log(this.prototye);
        console.log('[ HULK ]--> ' + message);
    },
    smash: function() {
        this.log('SMASH!');
        return this;
    }
};

//------------------------------------------------------------------------------

var IronMan = HeroFactory.create('IronMan');
var BlackWidow = HeroFactory.create('BlackWidow');
var Hulk = HeroFactory.create('Hulk');
var CaptainAmerica = HeroFactory.create('CaptainAmerica');

CaptainAmerica.command(Hulk, 'smash');
CaptainAmerica.command(IronMan, 'fire', 'monster at three o clock');
