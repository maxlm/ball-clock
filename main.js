const BallClock = require('./lib/Clock');
const readline = require('readline');

function isValidBallsNumber(num) {
    num = parseInt(num);

    if (!Number.isInteger(num)) {
        return false;
    }

    if (num < 27 || num > 127) {
        return false;
    }

    return true;
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "waiting for input>"
});
const ballNumbers = [];
console.log("Welcome to Ball Clock app!");
console.log("In order to proceed, you must enter number of balls to setup clock");
console.log("Number must be between 27 and 127 inclusive");
console.log("0 - run clock app");
console.log("q - quit clock app");
rl.prompt();

rl.on('line', (line) => {
    line = line.trim();
    switch (line) {
        case 'q':
            exit();
            break;
        case '0':
            if (!!ballNumbers.length) {
                rl.close();
            } else {
                console.log("you must setup at least one clock in order to run app");
                rl.prompt();
            }
            break;
        default:
            if (isValidBallsNumber(line)) {
                ballNumbers.push(parseInt(line));
                rl.prompt();
            } else {
                console.log("Wrong number");
                rl.prompt();
            }
            break;

    }
});

rl.on('close', () => {
    run(ballNumbers);
    exit();
});

rl.on('SIGINT', () => {
    exit();
});

function run(ballNumbers) {
    ballNumbers.forEach((number, idx) => {
        const clock = new BallClock(number);
        clock.start();
        const days = clock.minutes / (24 * 60);
        console.log(`=== clock ${idx +1} ===`);
        console.log(`${number} balls cycle after ${days} days`);
    })
}

function exit() {
    console.log("Bye-Bye!");
    process.exit(0);
}