export const parseInput = (input) => input.split('\n');

export const calc1Verbose = (input) => {
    let gamma = [];
    let epsilon = [];
    const commonBits = [];
    input.forEach((val) => {
        val.split('').forEach((digit, digitIndex) => {
            if (!commonBits[digitIndex]) {
                commonBits[digitIndex] = { 0: 0, 1: 0 };
            }

            if (digit === '1') {
                commonBits[digitIndex][1] += 1;
            } else {
                commonBits[digitIndex][0] += 1;
            }
        });
    });

    commonBits.forEach((val) => {
        if (val[1] > val[0]) {
            gamma.push(1);
            epsilon.push(0);
        } else {
            gamma.push(0);
            epsilon.push(1);
        }
    });

    const gammaInt = parseInt(gamma.join(''), 2);
    const epsilonInt = parseInt(epsilon.join(''), 2);

    return gammaInt * epsilonInt;
};

export const calc1 = (input) => {
    const gammaMap = input[0].split('').map((val, index) => {
        const bits = input.map(n => n.split('')[index]);
        const ones = bits.filter(x => x === '1').length;
        const zeroes = bits.length - ones;
        if (zeroes > ones) {
            return 0;
        } else {
            return 1;
        }
    });
    const epsilonMap = gammaMap.map(n => n === 1 ? 0 : 1);

    return parseInt(gammaMap.join(''), 2) * parseInt(epsilonMap.join(''), 2);
}

const filterNumbers = (numbers, position, oxygen) => {
    // Grab bits in position
    const bits = numbers.map(n => n.split('')[position]);
    const ones = bits.filter(x => x === '1').length;
    const zeroes = bits.filter(x => x === '0').length;
    if (zeroes > ones) {
        // more 0s
        // filter out only numbers with 0s in the position
        if (oxygen) {
            return numbers.filter(n => n.split('')[position] === '0');
        } else {
            return numbers.filter(n => n.split('')[position] === '1');
        }
    } else {
        // more 1s
        // filter out only numbers with 1s in the position
        if (oxygen) {
            return numbers.filter(n => n.split('')[position] === '1');
        } else {
            return numbers.filter(n => n.split('')[position] === '0');
        }
    }
}

export const calc2 = (input) => {
    let oxygenNumbers = input;
    for(let i = 0; i < input[0].length; i++) {
        oxygenNumbers = filterNumbers(oxygenNumbers, i, true);
        if (oxygenNumbers.length === 1) {
            break;
        }
    }

    let co2Numbers = input;
    for(let i = 0; i < input[0].length; i++) {
        co2Numbers = filterNumbers(co2Numbers, i, false);
        if (co2Numbers.length === 1) {
            break;
        }
    }

    const oxygenLevel = parseInt(oxygenNumbers[0], 2);
    const co2Level = parseInt(co2Numbers[0], 2);

    return oxygenLevel * co2Level;
};
