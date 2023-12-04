const fs = require('fs');
const filename = process.argv[2];
if (!filename) throw 'no file name';

const limit = {
    red: 12,
    green: 13,
    blue: 14,
};

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    let total = 0;
    const bags = data.split('\n');
    
    bags.forEach(bag => {
        if (bag.length < 5) {
            return;
        }
        const bagContent = {};
        const [_, gameIndexStr, ...game] = bag.concat(';').split(' ');
        const gameIndex = gameIndexStr.slice(0, -1); // remove colon
        const sets = game.join(' ').slice(0, -2).split('; ');

        sets.forEach(set => {
            const setContent = {};
            const cubes = set.split(', ');
            cubes.forEach(cube => {
                const [count, color] = cube.split(' ');
                setContent[color] = (setContent[color] || 0) + parseInt(count);
            })
            Object.entries(setContent).forEach(([color, count]) => {
                if ((bagContent[color] || 0) < count) {
                    bagContent[color] = count;
                }
            })
        })

        // if bagContent done not overflow limits, then make valid
        const redIsValid = bagContent.red <= limit.red;
        const greenIsValid = bagContent.green <= limit.green;
        const blueIsValid = bagContent.blue <= limit.blue;

        if (redIsValid && greenIsValid && blueIsValid) {
            total += parseInt(gameIndex);
        }
    })

    console.log(total);
});