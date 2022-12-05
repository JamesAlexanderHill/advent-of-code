const intersection = require('lodash/intersection');
const chunk = require('lodash/chunk')
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
    const rucksackGroups = chunk(rucksacks, 3);
    const groupBadgePriority = rucksackGroups.map((groupRucksacks) => {
        const itemisedRucksack = groupRucksacks.map(rucksack => rucksack.split(''));
        const badge = intersection(...itemisedRucksack)[0];
        return letters.indexOf(badge) + 1;
    });
    const totalPriority = groupBadgePriority.reduce((acc, curr) => acc + curr, 0)
    console.log(totalPriority);
});