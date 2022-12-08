const fs = require('fs');
const filename = process.argv[2];
if (!filename) throw 'no file name';

const getStackById = (rows, columnIndex) => rows.map(row => row[1 + (columnIndex * 4)]).filter(((element) => element !== ' '))

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;

    const [stacks, moves] = data.split('\n\n'); // Split data
    const rows = stacks.split('\n').slice(0,-1).reverse(); // prepare stacks to be converted into arrays
    const columnCount = (rows[0].length + 1) / 4; // figure out how many arrays we need to make
    const supplyStacks = Array.from({length: columnCount}, (_, index) => getStackById(rows, index));

    moves.trim().split('\n').forEach(move => {
        const [, num,, from,, to] = move.split(' ');

        // Get arrays we are going to be manipulating
        const fromStack = supplyStacks[from - 1];
        const toStack = supplyStacks[to - 1];

        // Update supply stacks with divided fromStack
        supplyStacks[from - 1] = fromStack.slice(0, -num);
        supplyStacks[to - 1] = [...toStack, ...fromStack.slice(-num)];
    }) 
    // Get last letter in each stack
    console.log(supplyStacks.reduce((acc, curr) => acc +curr.at(-1), ''))
});