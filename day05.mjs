export const parseInput = (input) => input.split('\n').map(line => {
    const pieces = line.split(' -> ');
    const start = pieces[0].split(',');
    const end = pieces[1].split(',');
    return [
        {
            x: Number(start[0]),
            y: Number(start[1]),
        },
        {
            x: Number(end[0]),
            y: Number(end[1]),
        }
    ];
});

const filterLines = (lines) => {
    return lines.filter(line => 
        line[0].x === line[1].x ||
        line[0].y === line[1].y
    );
};

const getSpacesToMarkForLine = (line) => {
    const start = line[0];
    const end = line[1];
    const isHorizontal = start.y === end.y;
    const isVertical = start.x === end.x;
    const spaces = [];
    if (isHorizontal) {
        for (let index = Math.min(start.x, end.x); index <= Math.max(start.x, end.x); index++) {
            spaces.push({
                x: index,
                y: start.y,
            });
        }
    } else if(isVertical) {
        for (let index = Math.min(start.y, end.y); index <= Math.max(start.y, end.y); index++) {
            spaces.push({
                x: start.x,
                y: index,
            });
        }
    } else {
        // We assume it's 45 degree diagonal
        // TODO: There's probably a much better way to get all the points in a diagonal line...
        let x = start.x;
        let y = start.y;
        const shouldIncrementX = end.x > start.x;
        const shouldIncrementY = end.y > start.y;
        while(x !== end.x) {
            spaces.push({
                x,
                y,
            });
            if (shouldIncrementX) {
                x += 1;
            } else {
                x -= 1;
            }
            if (shouldIncrementY) {
                y += 1;
            } else {
                y -= 1;
            }
        }
        spaces.push({
            x,
            y,
        });
    }

    return spaces;
};

const markSpaceOnLookup = (lookup, space) => {
    const key = `${space.x},${space.y}`;
    if (!lookup[key]) {
        lookup[key] = 1;
    } else {
        lookup[key] += 1;
    }

    return lookup;
}

const mapLinesOntoLookup = (lines) => {
    let lookup = {};
    lines.forEach(line => {
        const spacesToMark = getSpacesToMarkForLine(line);
        spacesToMark.forEach(space => {
            lookup = markSpaceOnLookup(lookup, space);
        });
    });

    return lookup;
};

const getOverlappingPointsFromLookup = (lookup) => {
    const overlappingPoints = [];
    Object.keys(lookup).forEach(key => {
        if (lookup[key] > 1) {
            overlappingPoints.push(key);
        }
    });

    return overlappingPoints;
};


export const calc1 = (input) => {
    // Filter out only horizontal or vertical lines
    const filteredLines = filterLines(input);

    // map lines onto lookup
    const lookup = mapLinesOntoLookup(filteredLines);

    const overlappingPoints = getOverlappingPointsFromLookup(lookup);

    return overlappingPoints.length;
};

export const calc2 = (input) => {
    // map lines onto lookup
    const lookup = mapLinesOntoLookup(input);

    const overlappingPoints = getOverlappingPointsFromLookup(lookup);
    return overlappingPoints.length;
};
