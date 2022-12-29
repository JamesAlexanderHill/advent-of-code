const fs = require('fs');
const flatten = require('lodash/flatten');
const filename = process.argv[2];
if (!filename) throw 'no file name';

const checkTreeVisibility = (row, col, grid) => {
    const cell = parseInt(grid[row][col]);
    let isVisible = [true, true, true, true];

    // UP
    for (let pos = row - 1; pos >= 0; pos--) {
        const curr = parseInt(grid[pos][col]);
        if (cell <= curr) {
            isVisible[0] = false;
        }
        if (pos === 0 && isVisible[0]) {
            return true;
        }
    }
    // LEFT
    for (let pos = col - 1; pos >= 0; pos--) {
        const curr = parseInt(grid[row][pos]);
        if (cell <= curr) {
            isVisible[1] = false;
        }
        if (pos === 0 && isVisible[1]) {
            return true;
        }
    }
    // RIGHT
    for (let pos = row + 1; pos <= grid[row].length - 1; pos++) {
        const curr = parseInt(grid[pos][col]);
        if (cell <= curr) {
            isVisible[2] = false;
        }
        if (pos === grid[row].length - 1 && isVisible[2]) {
            return true;
        }
    }
    // DOWN
    for (let pos = col + 1; pos <= grid[row].length - 1; pos++) {
        const curr = parseInt(grid[row][pos]);
        if (cell <= curr) {
            isVisible[3] = false;
        }
        if (pos === grid[row].length - 1 && isVisible[3]) {
            return true;
        }
    }
    return false;
}

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;

    const grid = data.trim().split('\n');
    const treeVisibility = [];

    for(let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        if (rowIndex === 0 || rowIndex === grid.length - 1) {
            // set whole row to true
            treeVisibility[rowIndex] = Array(grid[rowIndex].length).fill(true);
        } else {
            // set first and last element to true by default
            // figure out the rest by stepping through
            const row = [];
            for (let columnIndex = 0; columnIndex < grid[rowIndex].length; columnIndex++) {
                if (columnIndex === 0 || columnIndex === grid[rowIndex].length - 1) {
                    row.push(true);
                } else {
                    // check if tree is visible from any edge
                    row.push(checkTreeVisibility(rowIndex, columnIndex, grid));
                }
            }
            treeVisibility[rowIndex] = row;
        }
    }
    console.log(flatten(treeVisibility).filter(Boolean).length);
});