const fs = require('fs');
const filename = process.argv[2];
if (!filename) throw 'no file name';

const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const grid = [];

const getCell = (y, x) => {
    if(y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) {
        return '.';
    }
    
    return grid[y][x];
}

const ring = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
]
const numberFromPoint = (y, x) => {
    const startCell = getCell(y,x);

    if (!numbers.includes(startCell)) {
        return '';
    }

    let partNumber = startCell;
    for (let xPos = x - 1; xPos >= 0; xPos--) {
        const cell = getCell(y,xPos);
        if (numbers.includes(cell)) {
            partNumber = `${cell}${partNumber}`;
        } else {
            break;
        }
    }
    for (let xPos = x + 1; xPos < grid[y].length; xPos++) {
        const cell = getCell(y,xPos);
        if (numbers.includes(cell)) {
            partNumber = `${partNumber}${cell}`;
        } else {
            break;
        }
    }

    return partNumber
}

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    let total = 0;

    // populate grid
    const rows = data.split('\r\n');
    rows.forEach(row => {
        if (row === '') {
            return;
        }
        grid.push(row.split(''));
    })

    // loop through cells
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex];

        for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
            const char = row[cellIndex];
            const isGear = char === '*';

            if (isGear) {
                const gears = new Set();
                // loop through ring, find numbers
                ring.forEach(([yOffset, xOffset]) => {
                    const cell = getCell(rowIndex + yOffset, cellIndex + xOffset);
                    if (numbers.includes(cell)) {
                        gears.add(numberFromPoint(rowIndex + yOffset, cellIndex + xOffset));
                    }
                });

                const gearArr = [...gears];

                if (gearArr.length > 1) {
                    total += [...gears].reduce((acc, partNumber) => acc * partNumber, 1);
                }
            };
        }
    }
    console.log(total);
});