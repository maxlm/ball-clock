const SizedBallHolder = require('./SizedBallHolder');

class BallTrack extends SizedBallHolder{
    constructor(size) {
        super(size);
    }

    flush(cb) {
        while (!!this.balls.length) {
            cb(this.balls.pop());
        }
    }
}

module.exports = BallTrack;