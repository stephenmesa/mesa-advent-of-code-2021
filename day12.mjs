export const parseInput = (input) => input.split('\n').map(l => l.split('-'));

const cannotRevisitCave = (caveName, caveAllowedRevisit) => {
    if (caveName === 'start' || caveName === 'end') {
        return {
            revisit: false,
            usedRevisit: false,
        };
    } else if (caveName.match(/[A-Z]+/g)) {
        return {
            revisit: true,
            usedRevisit: false,
        };
    } else if (caveName === caveAllowedRevisit) {
        return {
            revisit: true,
            usedRevisit: true,
        };
    } else {
        return {
            revisit: false,
            usedRevisit: false,
        };
    }
};

const findPaths = (caves, start, end, revisitCave = null) => {
    const possibleNextSteps = caves.filter(p => p[0] === start || p[1] === start);
    let caveAllowedRevisit = revisitCave;
    const revisitPolicy = cannotRevisitCave(start, caveAllowedRevisit);
    if (revisitPolicy.usedRevisit) {
        caveAllowedRevisit = null;
    }
    const nextCaves = revisitPolicy.revisit ? [...caves] : caves.filter(p => p[0] !== start && p[1] !== start);
    if (possibleNextSteps.length === 0) {
        return [];
    }

    const paths = [];
    possibleNextSteps.forEach(s => {
        const nextCave = s[0] === start ? s[1] : s[0];
        if (nextCave === end) {
            paths.push([start, nextCave]);
        } else {
            // Remove this step if it's a small cave
            const nextPaths = findPaths(nextCaves, nextCave, end, caveAllowedRevisit);
            paths.push(...nextPaths.map(np => [start, ...np]));
        }
    });

    return paths;
};

export const calc1 = (input) => {
    const paths = findPaths(input, 'start', 'end');
    return paths.length;
};

const unique = (value, index, self) => {
    return self.indexOf(value) === index
}

export const calc2 = (input) => {
    const allSmallCaves = input.reduce((acc, row) => [...acc, ...row], []).filter(unique).filter(c => c !== 'start' && c !== 'end' && !!c.match(/[a-z]+/g));

    const diffPaths = allSmallCaves.map(c => findPaths(input, 'start', 'end', c));
    
    const allPaths = diffPaths.reduce((acc, a) => ([...acc, ...a]), []);

    return allPaths.map(x => x.join('')).filter(unique).length;
};
