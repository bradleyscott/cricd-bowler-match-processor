var debug = require('debug')('bowler-match-processor-eventProcessors');
var _ = require('underscore');
var exports = module.exports = {};

exports.delivery = function(e) {
    debug('Processing delivery: %s', JSON.stringify(e));
    var increment = {};
    e.runs ? increment.runs = parseInt(e.runs) : increment.runs = 0;
    increment.event = e;

    return increment;
};

// TODO: CLariy with Ryan naming of event
exports.noballs = function(e) {
    debug('Processing noBall: %s', JSON.stringify(e));
    var increment = {};
    e.runs ? increment.runs = parseInt(e.runs) + 1 : increment.runs = 1;
    increment.isNoBall = true;
    increment.event = e;

    return increment;
};

exports.wides = function(e) {
    debug('Processing wide: %s', JSON.stringify(e));
    var increment = {};
    e.runs ? increment.runs = parseInt(e.runs) + 1 : increment.runs = 1;
    increment.isWide = true;
    increment.event = e;

    return increment;
};

exports.byes = function(e) {
    debug('Processing bye: %s', JSON.stringify(e));
    var increment = {};
    increment.runs = 0;

    return increment;
};

// TODO: CLariy with Ryan naming of event
exports.legbyes = function(e) {
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
    increment.runs = e.runs;
    increment.wicket = e;
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
    increment.event = e;

    return increment;
};
