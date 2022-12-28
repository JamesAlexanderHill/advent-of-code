const set = require('lodash/set');
const fs = require('fs');
const filename = process.argv[2];
if (!filename) throw 'no file name';

const totalSpace = 70000000;
const requiredSpace = 30000000;

const calcSize = (dir) => {
    let size = 0;
    let newDir = {...dir};

    for (const [key, value] of Object.entries(dir)) { // loop through object
        if(typeof value === 'object' && !Array.isArray(value) && value !== null) {
            // we are an object and we need to add a size key to it
            const tempDir = calcSize(value); // recurse if needed
            size += tempDir.size; // accumulate size of current directory
            newDir = {...newDir, [key]: tempDir} // overwrite the current dir to include size
        } else {
            size += parseInt(value); // accumulate size of current directory
        }
    }

    return {...newDir, size} // return the current directory with the total size
}
const getArrOfDirAboveSize = (dir, maxSize) => {
    const arr = []; // store all values above maxSize

    for (const [key, value] of Object.entries(dir)) { // loop through object
        if(typeof value === 'object' && !Array.isArray(value) && value !== null) {
            arr.push(...getArrOfDirAboveSize(value, maxSize)); // recurse if we run into an directory (object)
            if (value.size >= maxSize) { // add to array if we fulfill the requirement
                arr.push([key, value.size]);
            }
        }
    }
    return arr;
}

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    const structure = {};
    let position = '';

    const commands = data.trim().split('\n');
    commands.forEach(command => {
        const line = command.split(' ');
        if(line[0] === '$') {
            // command
            if (line[1] === 'cd') {
                // step into directory and handle position pattern
                if(position.length === 0){
                    position = line[2];
                } else if (line[2] === '..') {
                    const temp = position.split('.');
                    temp.pop()
                    position = temp.join('.');
                } else {
                    position = `${position}.${line[2]}`;
                }
            }
        } else if(line[0] === 'dir') {
            // directory means do nothing
        } else {
            // file so pass size as value
            set(structure, `${position}.${line[1].replace('.','-')}`, parseInt(line[0]));
        }
    });

    // recurse on structure to get size of nested objects
    const sizedStructure = calcSize(structure['/']);
    const unused = totalSpace - sizedStructure.size;
    const spaceToPurge = requiredSpace - unused;

    const dirArr = getArrOfDirAboveSize(sizedStructure, spaceToPurge);
    // sort and pick the lowest
    const sortedDirArr = dirArr.sort((a, b) => a[1] - b[1]);
    console.log(sortedDirArr[0][1]);
});