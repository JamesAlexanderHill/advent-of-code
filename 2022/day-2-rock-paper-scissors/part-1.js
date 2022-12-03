const fs = require('fs');
const filename = process.argv[2];
if (!filename) throw 'no file name';

const outcomeMap = {
    A: { X: 4, Y: 8, Z: 3 }, // draw + rock, win + paper, loss + scissors
    B: { X: 1, Y: 5, Z: 9 }, // loss + rock, draw + paper, win + scissors
    C: { X: 7, Y: 2, Z: 6 }, // win + rock, loss + paper, draw + scissors
};

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    const rounds = data
        .trim() // Remove white space at end of file
        .split('\n'); // split by line breaks

    const outcomes = rounds.map((round) => {
        const [oppMove, myMove] = round.split(' '); // get moves for current round
        const outcome = outcomeMap[oppMove][myMove];

        return outcome;
    });

    console.log(outcomes.reduce((acc, curr) => acc + curr, 0))
});