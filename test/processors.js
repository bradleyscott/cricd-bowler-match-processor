var assert = require('assert');
var processor = require('../eventProcessors.js');
var should = require('should');

describe('A dot ball', function() {
    var e = { runs: 0 };
    var increment = processor.delivery(e);

    it('should not increase the bowlers run count', function() {
        increment.runs.should.equal(0);
    });

    it('should not increment the bowlers wicket count', function() {
        increment.should.not.have.property('wicket');
    });
});

describe('A single', function() {
    var e = { runs: 1 };
    var increment = processor.delivery(e);

    it('should increase the bowlers run count by 1', function() {
        increment.runs.should.equal(1);
    });

    it('should not increment the bowlers wicket count', function() {
        increment.should.not.have.property('wicket');
    });
});

describe('A no ball', function() {
    describe('where no runs were taken', function(){
        var e = { runs: 0 };
        var increment = processor.noBall(e);

        it('should increase the bowlers run count by 1', function() {
            increment.runs.should.equal(1);
        });

        it('should not increment the bowlers wicket count', function() {
            increment.should.not.have.property('wicket');
        });
    });

    describe('where 1 run was taken', function(){
        var e = { runs: 1 };
        var increment = processor.noBall(e);

        it('should increase the bowlers run count by 2', function() {
            increment.runs.should.equal(2);
        });

        it('should not increment the bowlers wicket count', function() {
            increment.should.not.have.property('wicket');
        });
    });
});

describe('A wide', function() {
    describe('where no runs were taken', function(){
        var e = { runs: 0 };
        var increment = processor.wide(e);

        it('should increase the bowlers run count by 1', function() {
            increment.runs.should.equal(1);
        });

        it('should not increment the bowlers wicket count', function() {
            increment.should.not.have.property('wicket');
        });
    });

    describe('where 1 run was taken', function(){
        var e = { runs: 1 };
        var increment = processor.wide(e);

        it('should increase the bowlers run count by 2', function() {
            increment.runs.should.equal(2);
        });

        it('should not increment the bowlers wicket count', function() {
            increment.should.not.have.property('wicket');
        });
    });
});

describe('A bye', function() {
    var e = { runs: 1 };
    var increment = processor.bye(e);

    it('should not increase the bowlers run count', function() {
        increment.runs.should.equal(0);
    });

    it('should not increment the bowlers wicket count', function() {
        increment.should.not.have.property('wicket');
    });
});

describe('A leg bye', function() {
    var e = { runs: 1 };
    var increment = processor.legBye(e);

    it('should increase the bowlers run count by 1', function() {
        increment.runs.should.equal(1);
    });

    it('should not increment the bowlers wicket count', function() {
        increment.should.not.have.property('wicket');
    });
});

describe('Bowled', function() {
    var e = {};
    var increment = processor.bowled(e);

    it('should not increase the bowlers run count', function() {
        increment.runs.should.equal(0);
    });

    it('should increment the bowlers wicket count', function() {
        increment.should.have.property('wicket');
    });
});

describe('Caught', function() {
    var e = {};
    var increment = processor.caught(e);

    it('should not increase the bowlers run count', function() {
        increment.runs.should.equal(0);
    });

    it('should increment the bowlers wicket count', function() {
        increment.should.have.property('wicket');
    });
});

describe('Handled ball', function() {
    var e = {};
    var increment = processor.handledBall(e);

    it('should not increase the bowlers run count', function() {
        increment.runs.should.equal(0);
    });

    it('should not increment the bowlers wicket count', function() {
        increment.should.not.have.property('wicket');
    });
});

describe('Double hit', function() {
    var e = {};
    var increment = processor.doubleHit(e);

    it('should not increase the bowlers run count', function() {
        increment.runs.should.equal(0);
    });

    it('should increment the bowlers wicket count', function() {
        increment.should.have.property('wicket');
    });
});

describe('Hit wicket', function() {
    var e = {};
    var increment = processor.hitWicket(e);

    it('should not increase the bowlers run count', function() {
        increment.runs.should.equal(0);
    });

    it('should increment the bowlers wicket count', function() {
        increment.should.have.property('wicket');
    });
});

describe('LBW', function() {
    var e = {};
    var increment = processor.lbw(e);

    it('should not increase the bowlers run count', function() {
        increment.runs.should.equal(0);
    });

    it('should increment the bowlers wicket count', function() {
        increment.should.have.property('wicket');
    });
});

describe('Obstruction', function() {
    describe('where no runs were taken', function(){
        var e = { runs: 0 };
        var increment = processor.obstruction(e);

        it('should not increase the bowlers run count', function() {
            increment.runs.should.equal(0);
        });

        it('should not increment the bowlers wicket count', function() {
            increment.should.not.have.property('wicket');
        });
    });

    describe('where 1 run was taken', function(){
        var e = { runs: 1 };
        var increment = processor.obstruction(e);

        it('should increase the bowlers run count by 1', function() {
            increment.runs.should.equal(1);
        });

        it('should not increment the bowlers wicket count', function() {
            increment.should.not.have.property('wicket');
        });
    });
});

describe('A run out', function() {
    describe('where no runs were taken', function(){
        var e = { runs: 0 };
        var increment = processor.runOut(e);

        it('should not increase the bowlers run count', function() {
            increment.runs.should.equal(0);
        });

        it('should not increment the bowlers wicket count', function() {
            increment.should.not.have.property('wicket');
        });
    });

    describe('where 1 run was taken', function(){
        var e = { runs: 1 };
        var increment = processor.runOut(e);

        it('should increase the bowlers run count by 1', function() {
            increment.runs.should.equal(1);
        });

        it('should not increment the bowlers wicket count', function() {
            increment.should.not.have.property('wicket');
        });
    });
});

describe('Stumped', function() {
    var e = {};
    var increment = processor.stumped(e);

    it('should not increase the bowlers run count', function() {
        increment.runs.should.equal(0);
    });

    it('should increment the bowlers wicket count', function() {
        increment.should.have.property('wicket');
    });
});
