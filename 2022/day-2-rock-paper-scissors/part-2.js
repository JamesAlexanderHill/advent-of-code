const fs = require('fs');
const filename = process.argv[2];
if (!filename) throw 'no file name';

const outcomeMap = {
    A: { X: 3, Y: 4, Z: 8 },  // rock:     lose + scissors 0+3, draw + rock 3+1,     win + paper 6+2
    B: { X: 1, Y: 5, Z: 9 },  // paper:    lose + rock 0+1,     draw + paper 3+2,    win + scissors 6+3
    C: { X: 2, Y: 6, Z: 7 },  // scissors: lose + paper 0+2,    draw + scissors 3+3, win + rock 6+1
};

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    const rounds = data
        .trim() // Remove white space at end of file
        .split('\n'); // split by line breaks

    const outcomes = rounds.map((round) => {
        const [oppMove, requiredOutcome] = round.split(' '); // get moves for current round
        const outcome = outcomeMap[oppMove][requiredOutcome];

        return outcome;
    });

    console.log(outcomes.reduce((acc, curr) => acc + curr, 0))
});