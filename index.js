var express = require('express');
var app = express();
var debug = require('debug')('bowler-match');
var eventStore = require('./eventstore.js');
var eventProcessors = require('./eventProcessors.js');
var _ = require('underscore');

app.get('/', function(req, res) {
    debug('Request received with query params %s', JSON.stringify(req.query));

    var match = req.query.match;
    var bowler = req.query.bowler;
    var innings = req.query.innings;

    if(!match) {
        var error = 'match must be included in request query params';
        debug(error);
        return res.status(400).send(error);
    }

    var events = eventStore.getEvents(bowler, match, function(error, events) {
        if(error) {
            debug(error);
            return res.status(500).send(error);
        }

        if(events.length == 0) {
            var message = 'No events for this bowler in this match';
            debug(message);
            return res.status(404).send(message);
        }

        var stats = {};

        _(events).each(function(e) {
            debug('Invoking processor for: %s', e.eventType);

            try {
                var increment = eventProcessors[e.eventType](e);
                eventProcessors.incrementStats(stats, increment);
            } catch(error) {
                var message = 'Error trying to process events. ' + error;
                debug(message);
                return res.status(500).send(message);
            }
        });

        if(innings && bowler) stats = stats[innings][bowler];
        else if(innings) stats = stats[innings];

        return res.send(stats);
    });
});

app.listen(3001);
console.log('bowler-match-processor listening on port 3001...');
