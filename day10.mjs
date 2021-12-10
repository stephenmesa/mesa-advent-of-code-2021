export const parseInput = (input) => input.split('\n');

const openingChars = ['(', '[', '<', '{'];
const closingChars = [')', ']', '>', '}'];

const getLineCorruption = (line) => {
    const stack = [];

    const lineChars = line.split('');
    for (let index = 0; index < lineChars.length; index++) {
        const char = lineChars[index];

        if (typeof openingChars.find(x => x === char) !== 'undefined') {
            // opening character, push it to the stack
            stack.push(char);
        } else if (typeof closingChars.find(x => x === char) !== 'undefined') {
            // closing char, make sure it corresponds to the latest on the stack
            const openingCharToMatch = stack.pop();
            const matchIndex = openingChars.indexOf(openingCharToMatch);
            if (char === closingChars[matchIndex]) {
                // It matches! Yay! Do nothing
            } else {
                // Corruption!
                return {
                    expected: closingChars[matchIndex],
                    found: char,
                };
            }
        }
    }

    return null;
};

const calculateErrorScore = (err) => {
    const pointsLookup = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
    };

    return pointsLookup[err.found];
};

export const calc1 = (input) => {
    const lineCorruptions = input.map(getLineCorruption).filter(c => c !== null);
    const errorScores = lineCorruptions.map(calculateErrorScore);
    return errorScores.reduce((sum, n) => sum+n, 0);
};

const getIncompleteLineCharacters = (line) => {
    const stack = [];

    const lineChars = line.split('');
    for (let index = 0; index < lineChars.length; index++) {
        const char = lineChars[index];

        if (typeof openingChars.find(x => x === char) !== 'undefined') {
            // opening character, push it to the stack
            stack.push(char);
        } else if (typeof closingChars.find(x => x === char) !== 'undefined') {
            // closing char, make sure it corresponds to the latest on the stack
            const openingCharToMatch = stack.pop();
            const matchIndex = openingChars.indexOf(openingCharToMatch);
            if (char === closingChars[matchIndex]) {
                // It matches! Yay! Do nothing
            } else {
                // Corruption!
                return null;
            }
        }
    }

    return stack.reverse().map(openingChar => {
        const matchIndex = openingChars.indexOf(openingChar);
        return closingChars[matchIndex];
    });
};

const calculateLineCompletionScore = (lineCompletion) => {
    let totalScore = 0;
    const pointsLookup = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4,
    };
    lineCompletion.forEach((char => {
        totalScore *= 5;
        totalScore += pointsLookup[char];
    }));

    return totalScore;
};

const getMiddleScore = (scores) => {
    const tempScores = scores;
    tempScores.sort((a, b) => b-a);
    return tempScores[Math.floor(tempScores.length / 2)];
};

export const calc2 = (input) => {
    const lineCompletions = input.map(getIncompleteLineCharacters).filter(c => c !== null);

    const lineScores = lineCompletions.map(calculateLineCompletionScore);
    return getMiddleScore(lineScores);
};
