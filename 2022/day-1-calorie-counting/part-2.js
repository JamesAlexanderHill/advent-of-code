const fs = require('fs');
const filename = process.argv[2];
if (!filename) throw 'no file name';

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    const arr = data.split('\n');
    let elfIndex = 0;
    const collapsedArr = [];
    for(let i = 0; i < arr.length; i++) {
        const currentNumber = parseInt(arr[i]) || false;
        if(currentNumber) {
            if (collapsedArr[elfIndex]) {
                collapsedArr[elfIndex] += currentNumber;
            } else {
                collapsedArr[elfIndex] = currentNumber;
            }
        } else {
            elfIndex++;
        }
    }
    const sortedCollapsedArr = collapsedArr.sort(function(a, b){return b-a});

    console.log(sortedCollapsedArr.slice(0, 3).reduce((acc, curr) => acc + curr, 0));
});