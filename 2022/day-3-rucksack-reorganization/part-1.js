const intersection = require('lodash/intersection');
const fs = require('fs');
const filename = process.argv[2];
if (!filename) throw 'no file name';

const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseLetters = lowerCaseLetters.toUpperCase();
const letters = [...lowerCaseLetters, ...upperCaseLetters];

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    const rucksacks = data
        .trim() // Remove white space at end of file
        .split('\n'); // split by line breaks

    const compartments = rucksacks
        .map((rucksack) => {
            const compartmentLength = rucksack.length / 2;
            const compartment1 = rucksack.slice(0, compartmentLength);
            const compartment2 = rucksack.slice(compartmentLength, rucksack.length);
            const intersectedLetter = intersection(compartment1.split(''), compartment2.split(''))[0];
            return letters.indexOf(intersectedLetter) + 1;
        });

    const totalPriority = compartments.reduce((acc, curr) => acc + curr, 0)
    console.log(totalPriority);
});