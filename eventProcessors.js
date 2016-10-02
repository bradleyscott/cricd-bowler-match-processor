var debug = require('debug')('bowling-processor:eventProcessors');
var _ = require('underscore');
var exports = module.exports = {};

var getBowlersIndex = function(stats, bowler) {
    for(var i = 0; i < stats.length; i++)
        if(stats[i].bowler.id == bowler.id) return i;

    stats.push({
        bowler: bowler,
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
    });
    return stats.length - 1;
};

exports.incrementStats = function(stats, increment) {
    debug('Incrementing stats using: %s', JSON.stringify(increment));

    var bowler = increment.event.bowler;
    if(!bowler) return;
    var index = getBowlersIndex(stats, bowler);

    if(increment.runs) stats[index].runs += increment.runs;

    if(increment.event.eventType == 'wide') {
        stats[index].runsFromWides += increment.runs;
        stats[index].widesBowled += 1;
    }
    else if(increment.event.eventType == 'noBall') {
        stats[index].runsFromNoBalls += increment.runs;
        stats[index].noBallsBowled += 1;
    }
    else if(increment.event.eventType != 'timedOut')
        stats[index].legalBallsBowled += 1;

    stats[index].economyRate = (stats[index].runs / stats[index].legalBallsBowled) * 6;

    // Wickets and strike rate
    if(increment.wicket) stats[index].wickets.push(increment.wicket);
    if(stats[index].wickets.length > 0) stats[index].strikeRate = stats[index].runs / stats[index].wickets.length;

    // Methods of scoring
    if(!increment.isWide && !increment.isNoBall && increment.runs) {
        if(stats[index].scoring[increment.runs]) stats[index].scoring[increment.runs]++;
        else stats[index].scoring[increment.runs] = 1;
    }

    stats[index].events.push(increment.event);
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
