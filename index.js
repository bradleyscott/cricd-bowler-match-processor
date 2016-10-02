var express = require('express');
var app = express();
var debug = require('debug')('bowling-processor');
var eventStore = require('./eventstore.js');
var eventProcessors = require('./eventProcessors.js');
var _ = require('underscore');

app.get('/', function(req, res) {
    debug('Request received with query params %s', JSON.stringify(req.query));

    var match = req.query.match;
    var innings = req.query.innings;

    if(!match || !innings) {
        var error = 'match and innings must be included in request query params';
        debug(error);
        return res.status(400).send(error);
    }

    var events = eventStore.getEvents(match, function(error, events) {
        if(error) {
            debug(error);
            return res.status(500).send(error);
        }

        events = _(events).filter(function(e){
            if(e.ball && e.ball.innings != innings) return false;
            else return true;
        });

        if(events.length == 0) {
            var message = 'No events for this match and innings';
            debug(message);
            return res.send([]);
        }

        var stats = [];

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

        return res.send(stats);
    });
});

app.listen(3001);
console.log('bowling-processor listening on port 3001...');
