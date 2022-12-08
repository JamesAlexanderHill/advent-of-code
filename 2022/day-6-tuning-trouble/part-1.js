const fs = require('fs');
const filename = process.argv[2];
if (!filename) throw 'no file name';

const windowSize = 4;

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;

    const letters = data.split('').filter(letter => letter != '\n');
    let processedPackets;

    for (let i = 0; i < letters.length - 3; i++) {
        const recentChars = letters.slice(i, i + windowSize);
        const isUnique = recentChars.length === new Set(recentChars).size;
        processedPackets = i + windowSize;
        if (isUnique) {
            break;
        }
    }
    console.log(processedPackets)
});