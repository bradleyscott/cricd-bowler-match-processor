var assert = require('assert');
var processor = require('../eventProcessors.js');
var should = require('should');

var getStats = function() {
    return [{
        bowler: { id: 1 },
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
    }];
};

describe('The bowlers run count', function() {
    it('should not increase on a dot ball', function() {
        var stats = getStats();
        var increment = { runs: 0, event: { bowler: { id: 1 }, eventType: 'delivery' } };
        processor.incrementStats(stats, increment);
        stats[0].runs.should.equal(0);
    });

    it('should increase by 1 when a single is scored', function() {
        var stats = getStats();
        var increment = { runs: 1, event: { bowler: { id: 1 }, eventType: 'delivery' } };
        processor.incrementStats(stats, increment);
        stats[0].runs.should.equal(1);
    });
});

describe('When the bowler bowls a wide', function() {
    var stats = getStats();
    var increment = { runs: 1, event: { bowler: { id: 1 }, eventType: 'wide' } };
    processor.incrementStats(stats, increment);

    it('the wide ball count should increment', function() {
        stats[0].widesBowled.should.equal(1);
    });

    it('the runs from wides should increase', function() {
        stats[0].runsFromWides.should.equal(1);
    });
});

describe('When the bowler bowls a no ball', function() {
    var stats = getStats();
    var increment = { runs: 1, event: { bowler: { id: 1 }, eventType: 'noBall' } };
    processor.incrementStats(stats, increment);

    it('the wide ball count should increment', function() {
        stats[0].noBallsBowled.should.equal(1);
    });

    it('the runs from wides should increase', function() {
        stats[0].runsFromNoBalls.should.equal(1);
    });
});

describe('The legal deliveries count', function() {
    it('should increment on a legal delivery', function() {
        var stats = getStats();
        var increment = { runs: 0, event: { bowler: { id: 1 }, eventType: 'delivery' } };
        processor.incrementStats(stats, increment);
        stats[0].legalBallsBowled.should.equal(1);
    });

    it('should not increment on a wide', function() {
        var stats = getStats();
        var increment = { runs: 0, event: { bowler: { id: 1 }, eventType: 'wide' } };
        processor.incrementStats(stats, increment);
        stats[0].legalBallsBowled.should.equal(0);
    });

    it('should not increment on a no ball', function() {
        var stats = getStats();
        var increment = { runs: 0, event: { bowler: { id: 1 }, eventType: 'noBall' } };
        processor.incrementStats(stats, increment);
        stats[0].legalBallsBowled.should.equal(0);
    });
});

describe('The wickets count', function() {
    it('should increment when there is a wicket', function() {
        var stats = getStats();
        var increment = { wicket: { eventType: 'bowled' }, event: { bowler: { id: 1 }, eventType: 'bowled' } };
        processor.incrementStats(stats, increment);
        stats[0].wickets.length.should.equal(1);
    });

    it('should not increment on a delivery not yielding a wicket', function() {
        var stats = getStats();
        var increment = { runs: 0, event: { bowler: { id: 1 }, eventType: 'wide' } };
        processor.incrementStats(stats, increment);
        stats[0].wickets.length.should.equal(0);
    });
});

describe('The methods of scoring count', function() {
    it('should increment singles when there is a single', function() {
        var stats = getStats();
        var increment = { runs: 1, event: { bowler: { id: 1 }, eventType: 'delivery' } };
        processor.incrementStats(stats, increment);
        stats[0].scoring[1].should.equal(1);
    });

    it('should increment boundary four when there is a boundary', function() {
        var stats = getStats();
        var increment = { runs: 4, event: { bowler: { id: 1 }, eventType: 'delivery' } };
        processor.incrementStats(stats, increment);
        stats[0].scoring[4].should.equal(1);
    });
});