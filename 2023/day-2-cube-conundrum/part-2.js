const fs = require('fs');
const filename = process.argv[2];
if (!filename) throw 'no file name';

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    let total = 0;
    const bags = data.split('\n');
    
    bags.forEach(bag => {
        if (bag.length < 5) {
            return;
        }
        const bagContent = {};
        const [_, __, ...game] = bag.concat(';').split(' ');
        const sets = game.join(' ').slice(0, -2).split('; ');

        sets.forEach(set => {
            const cubes = set.split(', ');
            cubes.forEach(cube => {
                const [count, color] = cube.split(' ');
                if (parseInt((bagContent[color]) || 0) < count) {
                    bagContent[color] = count;
                }
            })
        })

        const power = Object.values(bagContent).reduce((acc, curr) => acc*parseInt(curr), 1)
        total += power;
    })

    console.log(total);
});