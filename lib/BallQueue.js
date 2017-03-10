const SizedBallHolder = require('./SizedBallHolder');


class BallQueue extends SizedBallHolder {
    constructor(size) {
        super(size);
        this.balls = Array.from(new Array(size),(val,index)=>index+1);
    }

    isOrdered() {
        if (this.balls.length !== this.maxSize) {
            return false;
        }

        return this.balls.every((ball, ballIdx) => ball == ballIdx + 1);
    }

    next() {
        return this.balls.shift();
    }
}

module.exports = BallQueue;