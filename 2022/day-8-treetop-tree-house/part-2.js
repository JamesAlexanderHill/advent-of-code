const fs = require('fs');
const flatten = require('lodash/flatten');
const filename = process.argv[2];
if (!filename) throw 'no file name';

const calculateScenicScore = (row, col, grid) => {
    const cell = parseInt(grid[row][col]);
    const scenicScore = [0, 0, 0, 0];
    
    // UP
    for (let pos = row - 1; pos >= 0; pos--) {
        const curr = parseInt(grid[pos][col]);
        if (cell > curr) {
            scenicScore[0] = scenicScore[0] + 1;
        } else {
            scenicScore[0] = scenicScore[0] + 1;
            break;
        }
    }
    // LEFT
    for (let pos = col - 1; pos >= 0; pos--) {
        const curr = parseInt(grid[row][pos]);
        if (cell > curr) {
            scenicScore[1] = scenicScore[1] + 1;
        } else {
            scenicScore[1] = scenicScore[1] + 1;
            break;
        }
    }
    // RIGHT
    for (let pos = row + 1; pos <= grid[row].length - 1; pos++) {
        const curr = parseInt(grid[pos][col]);
        if (cell > curr) {
            scenicScore[2] = scenicScore[2] + 1;
        } else {
            scenicScore[2] = scenicScore[2] + 1;
            break;
        }
    }
    // DOWN
    for (let pos = col + 1; pos <= grid[row].length - 1; pos++) {
        const curr = parseInt(grid[row][pos]);
        if (cell > curr) {
            scenicScore[3] = scenicScore[3] + 1;
        } else {
            scenicScore[3] = scenicScore[3] + 1;
            break;
        }
    }
    
    return scenicScore.reduce((a, b)=> a*b);
}


fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;

    const grid = data.trim().split('\n');
    const treeScores = [];

    for(let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = [];
        for (let columnIndex = 0; columnIndex < grid[rowIndex].length; columnIndex++) {
            row.push(calculateScenicScore(rowIndex, columnIndex, grid))
        }
        treeScores.push(row);
    }
    console.log(Math.max(...flatten(treeScores)));
});
