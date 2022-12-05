const fs = require('fs');
const filename = process.argv[2];
if (!filename) throw 'no file name';

const countSections = (assignment) => {
    const [firstSection, lastSection] = assignment.split('-');

    return lastSection - firstSection;
}
const isOverlaped = (largerSection, smallerSection) => {
    const [largeStart, largeEnd] = largerSection.split('-');
    const [smallStart, smallEnd] = smallerSection.split('-');

    if (parseInt(smallStart) >= parseInt(largeStart) && parseInt(smallStart) <= parseInt(largeEnd)) {
        return true;
    }
    if (parseInt(smallEnd) >= parseInt(largeStart) && parseInt(smallEnd) <= parseInt(largeEnd)) {
        return true;
    }

    return false;
}

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    const assignmentPairs = data
        .trim() // Remove white space at end of file
        .split('\n'); // split by line breaks

    const doPairsContain = assignmentPairs.map((pair) => {
        const [assignmentA, assignmentB] = pair.split(',');
        const numOfSectionsA = countSections(assignmentA);
        const numOfSectionsB = countSections(assignmentB);

        if (numOfSectionsA > numOfSectionsB) {
            return isOverlaped(assignmentA, assignmentB);
        } else {
            return isOverlaped(assignmentB, assignmentA);
        }
    })
    console.log(doPairsContain.filter(Boolean).length);
});