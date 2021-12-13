export const parseInput = (input) => {
    const lines = input.split('\n');

    const coords = [];
    const folds = [];
    let readingCoords = true;
    lines.forEach(l => {
        if (readingCoords) {
            if (l === '') {
                readingCoords = false;
            } else {
                const parsed = l.split(',');
                coords.push({
                    x: Number(parsed[0]),
                    y: Number(parsed[1]),
                });
            }
        } else {
            const regexMatch = l.match(/fold along ([xy])=(\d+)/);
            folds.push({
                orient: regexMatch[1],
                vector: Number(regexMatch[2]),
            });
        }
    });

    return {
        coords,
        folds,
    };
};

const addCoord = (coords, newCoord) => {
    if (coords.find((c) => c.x === newCoord.x && c.y === newCoord.y)) {
        return coords;
    }

    return [...coords, newCoord];
};

const foldGrid = (coords, fold) => {
    let newCoords = [];

    coords.forEach((coord) => {
        if (fold.orient === 'x') {
            // folding left to right
            // determine if the point is to the left or right of fold line
            const isLeftOfFold = coord.x < fold.vector;
            if (isLeftOfFold) {
                // set x to absolute distance from fold
                newCoords = addCoord(newCoords, {
                    x: Math.abs(fold.vector - coord.x) - 1,
                    y: coord.y,
                });
            } else {
                newCoords = addCoord(newCoords, {
                    x: coord.x - fold.vector - 1,
                    y: coord.y,
                });
            }
        } else {
            // folding bottom to top
            // determine if the point is to the bottom or top of fold line
            const isBelowFold = coord.y > fold.vector;
            if (isBelowFold) {
                // set x to absolute distance from fold
                newCoords = addCoord(newCoords, {
                    x: coord.x,
                    y: fold.vector - Math.abs(fold.vector - coord.y),
                });
            } else {
                newCoords = addCoord(newCoords, {
                    x: coord.x,
                    y: coord.y,
                });
            }
        }
    });

    return newCoords;
};

export const calc1 = (input) => {
    const folded = foldGrid(input.coords, input.folds[0]);

    return folded.length;
};

const printCoords = (coords) => {
    let output = '';
    let maxX = -1;
    let maxY = -1;
    const lookup = [];
    coords.forEach(c => {
        if (c.x > maxX) {
            maxX = c.x;
        }
        if (c.y > maxY) {
            maxY = c.y;
        }
        if (!lookup[c.y]) {
            lookup[c.y] = [];
        }
        lookup[c.y][c.x] = true;
    });

    for(let i = 0; i <= maxY; i++) {
        // Not sure why this needs to be reversed...
        for(let j = maxX; j >= 0; j--) {
            if (lookup[i][j]) {
                output += 'X';
            } else {
                output += ' ';
            }
        }
        output += '\n';
    }

    console.log(output);
};

export const calc2 = (input) => {
    let coords = input.coords;
    input.folds.forEach(f => {
        coords = foldGrid(coords, f);
    });

    printCoords(coords);
};
