const fs = require('fs');
const filename = process.argv[2];
if (!filename) throw 'no file name';

const numbers = ['1','2','3','4','5','6','7','8','9'];
const numbersWords = ['one','two','three','four','five','six','seven','eight','nine', ...numbers];
const numberMap = {
    '1': '1',
    'one': '1',
    'two': '2',
    '2': '2',
    'three': '3',
    '3': '3',
    'four': '4',
    '4': '4',
    'five': '5',
    '5': '5',
    'six': '6',
    '6': '6',
    'seven': '7',
    '7': '7',
    'eight': '8',
    '8': '8',
    'nine': '9',
    '9': '9',
};

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    let total = 0;
    const lines = data.split('\n');
    
    lines.forEach((line) => {
        // find start/end values
        let start;
        let startSubstring = '';
        
        let end;
        let endSubstring = '';
        for(let i = 1; i <= line.length; i++) {
            if (!start) {
                startSubstring = line.slice(0, i);
                if (i < 3) {
                    const startNumber = numbers.find((number) => startSubstring.includes(number));
                    if (startNumber) {
                        start = startNumber;
                    }
                } else {
                    const startNumber = numbersWords.find((number) => startSubstring.includes(number));
                    if (startNumber) {
                        start = startNumber;
                    }
                }
            }
            if (!end) {
                endSubstring = line.slice(-i);
                if (i < 3) {
                    const endNumber = numbers.find((number) => endSubstring.includes(number));
                    if (endNumber) {
                        end = endNumber;
                    }
                } else {
                    const endNumber = numbersWords.find((number) => endSubstring.includes(number));
                    if (endNumber) {
                        end = endNumber;
                    }
                }
            }
        }

        // convert to numbers
        start = numberMap[start]
        end = numberMap[end]
        // join
        const combined = `${start}${end}`;
        total += parseInt(combined);
    })

    console.log(total);
});