const fs = require('fs');
const filename = process.argv[2];
if (!filename) throw 'no file name';

const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const notSymbol = [...numbers, '.'];

const ringChars = (grid, y, x) => {
    const ring = [];
    const canCheckTop = y > 0;
    const canCheckRight = x < grid[y].length - 1;
    const canCheckBottom = y < grid.length - 1;
    const canCheckLeft = x > 0;

    if(canCheckTop) {
        if (canCheckLeft) {
            ring.push(grid[y - 1][x - 1]);
        }
        ring.push(grid[y - 1][x]);
        if (canCheckRight) {
            ring.push(grid[y - 1][x + 1]);
        }
    }
    if (canCheckLeft) {
        ring.push(grid[y][x - 1]);
    }
    if (canCheckRight) {
        ring.push(grid[y][x + 1]);
    }
    if(canCheckBottom) {
        if (canCheckLeft) {
            ring.push(grid[y + 1][x - 1]);
        }
        ring.push(grid[y + 1][x]);
        if (canCheckRight) {
            ring.push(grid[y + 1][x + 1]);
        }
    }

    return ring.filter((char) => !notSymbol.includes(char));
}

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;

    const grid = [];
    const numberAndAdjacentTiles = [];
    let partNumber = '';
    let ring = [];

    const rows = data.split('\r\n');
    rows.forEach(row => {
        if (row === '') {
            return;
        }
        grid.push(row.split(''));
    })
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex];

        for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
            const char = row[cellIndex];
            const isNumber = numbers.includes(char);

            if (isNumber) {
                if (cellIndex === 0) {
                    // handle if we end a row with a number and then start with a number
                    numberAndAdjacentTiles.push([partNumber, ring]);
                    partNumber = '';
                    ring = [];
                }
                partNumber += char;
                ring.push(...ringChars(grid, rowIndex, cellIndex))
            } else {
                if (partNumber != '') {
                    numberAndAdjacentTiles.push([partNumber, ring]);
                    partNumber = '';
                    ring = [];
                }
            }
        }
    }

    const partNumbers = numberAndAdjacentTiles
        .filter(([partNumber, adjacentTiles]) => adjacentTiles.length > 0)
        .map(([partNumber, adjacentTiles]) => partNumber)

    console.log(partNumbers.reduce((acc, partNumber) => acc + parseInt(partNumber), 0));
});