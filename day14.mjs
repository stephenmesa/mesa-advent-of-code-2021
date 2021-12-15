export const parseInput = (input) => {
    const lines = input.split('\n');
    const template = lines[0];

    const insertionRules = lines.slice(2).map(x => {
        const split = x.split(' -> ');
        return {
            match: split[0],
            insert: split[1],
        };
    });

    return {
        template,
        insertionRules,
    }
};

const getLetterToInsert = (letterPair, rules) => {
    const rule = rules.find(x => x.match === letterPair);
    return rule.insert;
};

const getInsertions = (template, rules) => {
    return template.split('').slice(0, -1).map((letter, index) => ({ letter: getLetterToInsert(template.substring(index, index + 2), rules), index: index + 1 }));
};

const insertLetters = (template, insertions) => {
    let newTemplate = template.split('');
    let offset = 0;
    insertions.forEach(i => {
        newTemplate.splice(i.index + offset, 0, i.letter);
        offset += i.letter.length;
    });

    return newTemplate.join('');
};

export const calc1 = (input, steps = 10) => {
    let template = input.template;
    for (let index = 1; index <= steps; index++) {
        const insertions = getInsertions(template, input.insertionRules);
        template = insertLetters(template, insertions);
    }

    const letterCounts = template.split('').reduce((acc, letter) => {
        if (!acc[letter]) {
            return {
                ...acc,
                [letter]: 1,
            };
        } else {
            return {
                ...acc,
                [letter]: acc[letter] + 1,
            };
        }
    }, {});

    let mostCommonLetterCount = 0;
    let leastCommonLetterCount = Number.MAX_SAFE_INTEGER;

    Object.keys(letterCounts).forEach((letter) => {
        if (letterCounts[letter] > mostCommonLetterCount) {
            mostCommonLetterCount = letterCounts[letter];
        }
        if (letterCounts[letter] < leastCommonLetterCount) {
            leastCommonLetterCount = letterCounts[letter];
        }
    })
    return mostCommonLetterCount - leastCommonLetterCount;
}

const getLetterPairs = (template) => {
    return template.split('').slice(0, -1).map((letter, index) => template.substring(index, index + 2));
};

const calculateStep = (lookup) => {
    let mutatedLookup = JSON.parse(JSON.stringify(lookup));

    lookup.forEach(l => {
        if (l.count > 0) {
            const firstPair = l.match.substring(0, 1) + l.insert;
            const secondPair = l.insert + l.match.substring(1, 2);
            mutatedLookup.find(ml => ml.match === firstPair).count += l.count;
            mutatedLookup.find(ml => ml.match === secondPair).count += l.count;
            mutatedLookup.find(ml => ml.match === l.match).count -= l.count;
        }
    });
    return mutatedLookup;
};

export const calc2 = (input, steps = 10) => {
    let template = input.template;

    let pairs = getLetterPairs(template);

    let lookup = input.insertionRules.map(r => ({
        match: r.match,
        insert: r.insert,
        count: pairs.filter(p => p === r.match).length
    }));
    
    for (let index = 1; index <= steps; index++) {
        lookup = calculateStep(lookup);
    }

    const letterCounts = {};
    lookup.forEach(l => {
        const firstLetter = l.match.substring(0, 1);
        if (!letterCounts[firstLetter]) {
            letterCounts[firstLetter] = l.count;
        } else {
            letterCounts[firstLetter] += l.count;
        }
    });

    letterCounts[template.substring(template.length - 1)] += 1;

    let mostCommonLetterCount = 0;
    let leastCommonLetterCount = Number.MAX_SAFE_INTEGER;

    Object.keys(letterCounts).forEach((letter) => {
        if (letterCounts[letter] > mostCommonLetterCount) {
            mostCommonLetterCount = letterCounts[letter];
        }
        if (letterCounts[letter] < leastCommonLetterCount) {
            leastCommonLetterCount = letterCounts[letter];
        }
    })
    return mostCommonLetterCount - leastCommonLetterCount;
}
