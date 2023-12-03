const fs = require('fs');
const filename = process.argv[2];
if (!filename) throw 'no file name';

const numbers = ['1','2','3','4','5','6','7','8','9'];

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    let total = 0;
    const lines = data.split('\n');
    
    lines.forEach(line => {
        const numbersOnly = [...line].filter(char => numbers.includes(char))
        const calibrationValue = `${numbersOnly[0]}${numbersOnly.at(-1)}`;
        total += parseInt(calibrationValue);
    })

    console.log(total);
});