const BallQueue = require('./BallQueue');
const BallTrack = require('./BallTrack');

class BallClock {
    constructor(numberOfBalls) {
        this.ballQueue = new BallQueue(numberOfBalls);
        this.minuteIndicatorTrack = new BallTrack(4);
        this.fiveMinuteIndicatorTrack = new BallTrack(11);
        this.hourIndicatorTrack = new BallTrack(11);
        this.minutes = 0;
        this.ballTracks = [this.minuteIndicatorTrack, this.fiveMinuteIndicatorTrack, this.hourIndicatorTrack];
    }

    tick() {
        this.minutes+= 1;
        const currentBall = this.ballQueue.next();
        const allTrackOverflow = this.ballTracks.every((ballTrack) => {
            const isFull = ballTrack.isFull();

            if (isFull) {
               ballTrack.flush((ball) => {
                   this.ballQueue.push(ball);
               });
            } else {
                ballTrack.push(currentBall);
            }

            return isFull;
        });

        if(allTrackOverflow) {
            this.ballQueue.push(currentBall);
        }
    }

    start() {
        do {
            this.tick();
        } while (!this.ballQueue.isOrdered());
    }
}

module.exports = BallClock;