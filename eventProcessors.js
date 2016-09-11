var debug = require('debug')('bowler-match-processor-eventProcessors');
var _ = require('underscore');
var exports = module.exports = {};

startSpell = function(){
    return {
        runs: 0,
        legalBallsBowled: 0,
        widesBowled: 0,
        runsFromWides: 0,
        noBallsBowled: 0,
        runsFromNoBalls: 0,
        economyRate: 0,
        wickets: [],
        strikeRate: 0,
        scoring: {},
        events: []
    };
};

exports.incrementStats = function(stats, increment) {
    debug('Incrementing stats using: %s', JSON.stringify(increment));

    var innings = increment.event.ball.innings;
    var bowler; 
    if(increment.event.bowler) bowler = increment.event.bowler.id;
    if(!bowler) return;

    if(!stats[innings]) stats[innings] = {};
    if(!stats[innings][bowler]) stats[innings][bowler] = startSpell();

    
    if(increment.runs) stats[innings][bowler].runs += increment.runs;

    if(increment.event.eventType == 'wide') {
        stats[innings][bowler].runsFromWides += increment.runs;
        stats[innings][bowler].widesBowled += 1;
    }
    else if(increment.event.eventType == 'noBall') {
        stats[innings][bowler].runsFromNoBalls += increment.runs;
        stats[innings][bowler].noBallsBowled += 1;
    }
    else if(increment.event.eventType != 'timedOut')
        stats[innings][bowler].legalBallsBowled += 1;

    stats[innings][bowler].economyRate = (stats[innings][bowler].runs / stats[innings][bowler].legalBallsBowled) * 6;

    // Wickets and strike rate
    if(increment.wicket) stats[innings][bowler].wickets.push(increment.wicket);
    if(stats[innings][bowler].wickets.length > 0) stats[innings][bowler].strikeRate = stats[innings][bowler].runs / stats[innings][bowler].wickets.length;

    // Methods of scoring
    if(!increment.isWide && !increment.isNoBall && increment.runs) {
        if(stats[innings][bowler].scoring[increment.runs]) stats[innings][bowler].scoring[increment.runs]++;
        else stats[innings][bowler].scoring[increment.runs] = 1;
    }

    stats[innings][bowler].events.push(increment.event);
};

exports.delivery = function(e) {
    debug('Processing delivery: %s', JSON.stringify(e));
    var increment = {};
    e.runs ? increment.runs = parseInt(e.runs) : increment.runs = 0;
    increment.event = e;

    return increment;
};

exports.noBall = function(e) {
    debug('Processing noBall: %s', JSON.stringify(e));
    var increment = {};
    e.runs ? increment.runs = parseInt(e.runs) + 1 : increment.runs = 1;
    increment.event = e;

    return increment;
};

exports.wide = function(e) {
    debug('Processing wide: %s', JSON.stringify(e));
    var increment = {};
    e.runs ? increment.runs = parseInt(e.runs) + 1 : increment.runs = 1;
    increment.event = e;

    return increment;
};

exports.bye = function(e) {
    debug('Processing bye: %s', JSON.stringify(e));
    var increment = {};
    increment.runs = 0;
    increment.event = e;

    return increment;
};

exports.legBye = function(e) {
    debug('Processing legBye: %s', JSON.stringify(e));
    var increment = {};
    e.runs ? increment.runs = parseInt(e.runs) : increment.runs = 0;
    increment.event = e;

    return increment;
};

exports.bowled = function(e) {
    debug('Processing bowled: %s', JSON.stringify(e));
    var increment = {};
    increment.runs = 0;
    increment.wicket = e;
    increment.event = e;

    return increment;
};

exports.timedOut = function(e) {
    debug('Processing timedOut: %s', JSON.stringify(e));
    var increment = {};
    increment.event = e;

    return increment;
};

exports.caught = function(e) {
    debug('Processing caught: %s', JSON.stringify(e));
    var increment = {};
    increment.runs = 0;
    increment.wicket = e;
    increment.event = e;

    return increment;
};

exports.handledBall = function(e) {
    debug('Processing handledBall: %s', JSON.stringify(e));
    var increment = {};
    increment.runs = 0;
    increment.event = e;

    return increment;
};

exports.doubleHit = function(e) {
    debug('Processing doubleHit: %s', JSON.stringify(e));
    var increment = {};
    increment.runs = 0;
    increment.wicket = e;
    increment.event = e;

    return increment;
};


exports.hitWicket = function(e) {
    debug('Processing hitWicket: %s', JSON.stringify(e));
    var increment = {};
    increment.runs = 0;
    increment.wicket = e;
    increment.event = e;

    return increment;
};

exports.lbw = function(e) {
    debug('Processing lbw: %s', JSON.stringify(e));
    var increment = {};
    increment.runs = 0;
    increment.wicket = e;
    increment.event = e;

    return increment;
};

exports.obstruction = function(e) {
    debug('Processing obstruction: %s', JSON.stringify(e));
    var increment = {};
    increment.runs = e.runs;
    increment.event = e;

    return increment;
};

exports.runOut = function(e) {
    debug('Processing runOut: %s', JSON.stringify(e));
    var increment = {};
    increment.runs = e.runs; // TODO: Run outs can happen on wides and no-balls
    increment.event = e;

    return increment;
};

exports.stumped = function(e) {
    debug('Processing stumped: %s', JSON.stringify(e));
    var increment = {};
    increment.runs = 0;
    increment.wicket = e;
    increment.event = e;

    return increment;
};
