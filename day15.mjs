export const parseInput = (input) => input.split('\n').map(l => l.split('').map(Number));

const getNeighbors = (grid, x, y) => {
    const neighbors = [];
    if (grid[y] && grid[y][x + 1]) {
        neighbors.push({ x: x+1, y });
    }
    if (x > 0 && grid[y] && grid[y][x - 1]) {
        neighbors.push({ x: x-1, y });
    }
    if (grid[y+1] && grid[y+1][x]) {
        neighbors.push({ x, y: y+1 });
    }
    if (y > 0 && grid[y-1] && grid[y-1][x]) {
        neighbors.push({ x, y: y-1 });
    }
    return neighbors;
}

const getRiskLevel = (point, grid) => {
    if (point.x === 0 && point.y === 0) {
        return 0;
    } else {
        return grid[point.y][point.x];
    }
};

const getLowestNode = (openSet, fScore) => {
    let minNode;
    let minValue = Number.MAX_SAFE_INTEGER;
    openSet.forEach(n => {
        const k = serializeCoord(n);
        if (fScore[k] <= minValue) {
            minNode = n;
            minValue = fScore[k];
        }
    })

    return minNode;
};

const serializeCoord = (coord) => `${coord.x},${coord.y}`;

const reconstructPath = (cameFrom, current) => {
    let cursor = current;
    let serializedCursor = serializeCoord(cursor);
    let totalPath = [cursor];
    while (cameFrom[serializedCursor]) {
        cursor = cameFrom[serializedCursor];
        serializedCursor = serializeCoord(cursor);
        totalPath = [cursor, ...totalPath];
    }

    return totalPath;
};

const aStar = (grid, start, goal, h) => {
    let openSet = [start];

    const cameFrom = {};
    const gScore = {};
    gScore[serializeCoord(start)] = 0;

    const fScore = {};
    fScore[serializeCoord(start)] = Number.MAX_SAFE_INTEGER;

    while (openSet.length > 0) {
        const current = getLowestNode(openSet, fScore);

        if (current.x === goal.x && current.y === goal.y) {
            return reconstructPath(cameFrom, current);
        }

        const nodeToRemove = openSet.find(s => s.x === current.x && s.y === current.y);
        const indexToRemove = openSet.indexOf(nodeToRemove);
        openSet.splice(indexToRemove, 1);

        const neighbors = getNeighbors(grid, current.x, current.y);

        neighbors.forEach(neighbor => {
            const tentative_gScore = gScore[serializeCoord(current)] + grid[neighbor.y][neighbor.x];
            if (typeof gScore[serializeCoord(neighbor)] === 'undefined' || tentative_gScore < gScore[serializeCoord(neighbor)]) {
                cameFrom[serializeCoord(neighbor)] = current;
                gScore[serializeCoord(neighbor)] = tentative_gScore;
                fScore[serializeCoord(neighbor)] = tentative_gScore + h(neighbor);
                if (!openSet.find(s => s.x === neighbor.x && s.y === neighbor.y)) {
                    openSet.push(neighbor);
                }
            }
        });
    }

    return null;
};

const distance = (goal) => (n) => {
    const a = goal.x - n.x;
    const b = goal.y - n.y;
    const c = Math.sqrt((Math.pow(a, 2) + Math.pow(b, 2)));
    return c;
};

export const calc1 = (input) => {
    const goal = {
        x: input[input.length-1].length - 1,
        y: input.length - 1,
    };
    const path = aStar(input, { x: 0, y: 0 }, goal, distance(goal));

    return path.map((n) => getRiskLevel(n, input)).reduce((acc, val) => acc+val, 0);
}

const getFullGrid = (input) => {
    const newGrid = [];
    for (let j = 0; j < 5; j++) {
        newGrid.push(...input.map(row => {
            const newRow = [];
            for (let i = 0; i < 5; i++) {
                newRow.push(...row.map(c => {
                    let newVal = c + i + j;
                    while (newVal > 9) {
                        newVal -= 9;
                    }
                    return newVal;
                }));
            }
            return newRow;
        }));
    }
    
    return newGrid;
};

export const calc2 = (input) => {
    const grid = getFullGrid(input);

    const goal = {
        x: grid[grid.length-1].length - 1,
        y: grid.length - 1,
    };
    const path = aStar(grid, { x: 0, y: 0 }, goal, distance(goal));

    return path.map((n) => getRiskLevel(n, grid)).reduce((acc, val) => acc+val, 0);
}
