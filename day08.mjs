export const parseInput = (input) => {
    return input.split('\n').map(line => {
        const splitLine = line.split(' | ');
        return {
            segments: splitLine[0].split(' '),
            outputValues: splitLine[1].split(' '),
        };
    });
};

export const calc1 = (input) => {
    const tracker = {
        1: 0,
        4: 0,
        7: 0,
        8: 0,
    };
    input.forEach(line => {
        line.outputValues.map(v => v.length).forEach(n => {
            switch (n) {
                case 2:
                    // digit is 1
                    tracker[1] += 1;
                    break;
                case 3:
                    // digit is 7
                    tracker[7] += 1;
                    break;
                case 4:
                    // digit is 4
                    tracker[4] += 1;
                    break;
                case 7:
                    // digit is 8
                    tracker[8] += 1;
                    break;
            }
        });
    });

    return tracker[1] + tracker[4] + tracker[7] + tracker[8];
};

export const calc2 = (input) => {
    const outputValues = input.map(line => {
        const oneSegment = line.segments.find((val => val.length === 2));
        const fourSegment = line.segments.find((val => val.length === 4));
        const sevenSegment = line.segments.find((val => val.length === 3));
        const eightSegment = line.segments.find((val => val.length === 7));
        // 3 must have 5 letters, and two must be the letters from the 1 digit
        const threeSegment = line.segments.find((val) => val.length === 5 && val.indexOf(oneSegment[0]) >= 0 && val.indexOf(oneSegment[1]) >= 0);
        // 9 must be the same letters as 3, but a total of 6 letters
        const nineSegment = line.segments.find((val) => val.length === 6 && threeSegment.split('').every(l => val.indexOf(l) >= 0));
        // 0 must have 6 letters, must have both letters from the 1, and cannot be 9
        const zeroSegment = line.segments.find((val) => val.length === 6 && oneSegment.split('').every(l => val.indexOf(l) >= 0) && val !== nineSegment);
        // 6 must have 6 letters and not be 9 or 0
        const sixSegment = line.segments.find((val) => val.length === 6 && val !== nineSegment && val !== zeroSegment);
        // 5 must have 5 letters and they all exist in the 6 letters and not be 3
        const fiveSegment = line.segments.find((val) => val.length === 5 && val.split('').every(l => nineSegment.indexOf(l) >= 0) && val !== threeSegment);
        // 2 must have 5 letters and not be 5 nor 3
        const twoSegment = line.segments.find((val) => val.length === 5 && val !== fiveSegment && val !== threeSegment);
        const digitLookup = {
            [zeroSegment.split('').sort().join('')]: 0,
            [oneSegment.split('').sort().join('')]: 1,
            [twoSegment.split('').sort().join('')]: 2,
            [threeSegment.split('').sort().join('')]: 3,
            [fourSegment.split('').sort().join('')]: 4,
            [fiveSegment.split('').sort().join('')]: 5,
            [sixSegment.split('').sort().join('')]: 6,
            [sevenSegment.split('').sort().join('')]: 7,
            [eightSegment.split('').sort().join('')]: 8,
            [nineSegment.split('').sort().join('')]: 9,
        };

        return line.outputValues.map(val => digitLookup[val.split('').sort().join('')]).join('');
    });

    return outputValues.map(Number).reduce((sum, val) => sum + val, 0);
};
