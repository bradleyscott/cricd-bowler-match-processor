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

    if (!match || !bowler) {
        var error = 'matchId and bowlerId must be included in request query params';
        debug(error);
        return res.status(400).send(error);
    }

    var events = eventStore.getEvents(bowler, match, function(error, events) {
        if (error) {
            debug(error);
            return res.status(500).send(error);
        }

        if(events.length == 0) {
          debug('No events for this bowler in this match');
          return res.send();
        }

        var stats = {
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

        _(events).each(function(e) {
            debug('Invoking processor for: %s', e.eventType);

            try {
                var increment = eventProcessors[e.eventType](e);
                incrementStats(stats, increment);
            } catch (error) {
                var message = 'Error trying to process events. ' + error;
                debug(message);
                return res.status(500).send(message);
            }
        });

        return res.send(stats);
    });
});

app.listen(3001);
console.log('bowler-match-processor listening on port 3001...');

incrementStats = function(stats, increment) {
    debug('Incrementing stats using: %s', JSON.stringify(increment));

    if(increment.runs) stats.runs += increment.runs;

    if(increment.isWide) {
      stats.runsFromWides += increment.runs;
      stats.widesBowled += 1;
    }
    else if(increment.isNoBall) {
      stats.runsFromNoBalls += increment.runs;
      stats.noBallsBowled += 1;
    }
    else if(increment.event.eventType != 'timedOut')
      stats.legalBallsBowled += 1;

    stats.economyRate = (stats.runs / stats.legalBallsBowled) * 6;

    // Wickets and striek rate
    if(increment.wicket) stats.wickets.push(increment.wicket);
    if(stats.wickets.length > 0) stats.strikeRate = stats.runs / stats.wickets.length;

    // Methods of scoring
    if (!increment.isWide && !increment.isNoBall && increment.runs)
    {
      if(stats.scoring[increment.runs]) stats.scoring[increment.runs]++;
      else stats.scoring[increment.runs] = 1;
    }

    stats.events.push(increment.event);
};
