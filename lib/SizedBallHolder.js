class SizedBallHolder {
    constructor(size) {
        if (!Number.isInteger(size)) {
            throw new Error("size must be an integer");
        }
        this.maxSize = size;
        this.balls = [];
    }

    push(ball) {
        if (this.isFull()) {
            throw new Error(`max size limit of ${this.maxSize} exceeded`);
        }
        this.balls.push(ball);
    }

    isFull() {
        return this.balls.length == this.maxSize;
    }
}

module.exports = SizedBallHolder;