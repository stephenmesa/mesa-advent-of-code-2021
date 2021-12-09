export const parseInput = (input) => input.split('\n');

const isLowestCell = (floorMap, rowIndex, colIndex) => {
    let isLowest = true;
    const cellValue = floorMap[rowIndex][colIndex];
    if (rowIndex > 0) {
        // there is an upper neighbor
        if (floorMap[rowIndex - 1][colIndex] <= cellValue) {
            isLowest = false;
        }
    }

    if (rowIndex < floorMap.length-1) {
        // there is a lower neighbor
        if (floorMap[rowIndex + 1][colIndex] <= cellValue) {
            isLowest = false;
        }
    }

    if (colIndex > 0) {
        // there is a left neighbor
        if (floorMap[rowIndex][colIndex - 1] <= cellValue) {
            isLowest = false;
        }
    }

    if (colIndex < floorMap[0].length-1) {
        // there is a right neighbor
        if (floorMap[rowIndex][colIndex + 1] <= cellValue) {
            isLowest = false;
        }
    }

    return isLowest;
};

const calculateRiskLevel = (point) => point.val + 1;

export const calc1 = (input) => {
    const lowPoints = [];
    const floorMap = input.map(line => line.split('').map(Number));

    floorMap.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if(isLowestCell(floorMap, rowIndex, colIndex)) {
                lowPoints.push({
                    val: cell,
                    rowIndex,
                    colIndex,
                });
            }
        });
    });

    return lowPoints.map(calculateRiskLevel).reduce((sum, v) => sum+v, 0);
};

const haveVisited = (visited, rowIndex, colIndex) => {
    return !!visited.find(c => c.rowIndex === rowIndex && c.colIndex === colIndex);
};

const getBasin = (floorMap, rowIndex, colIndex, visited) => {
    const basinCells = [{ rowIndex, colIndex }];
    visited.push({ rowIndex, colIndex });
    if (rowIndex > 0) {
        // there is an upper neighbor
        if (!haveVisited(visited, rowIndex - 1, colIndex)) {
            // We haven't seen it
            visited.push({ rowIndex: rowIndex - 1, colIndex });
            if (floorMap[rowIndex - 1][colIndex] !== 9) {
                basinCells.push(...getBasin(floorMap, rowIndex - 1, colIndex, visited));
            }
        }
    }

    if (rowIndex < floorMap.length-1) {
        // there is a lower neighbor
        if (!haveVisited(visited, rowIndex + 1, colIndex)) {
            // We haven't seen it
            visited.push({ rowIndex: rowIndex + 1, colIndex });
            if (floorMap[rowIndex + 1][colIndex] !== 9) {
                basinCells.push(...getBasin(floorMap, rowIndex + 1, colIndex, visited));
            }
        }
    }

    if (colIndex > 0) {
        // there is a left neighbor
        if (!haveVisited(visited, rowIndex, colIndex - 1)) {
            // We haven't seen it
            visited.push({ rowIndex, colIndex: colIndex - 1 });
            if (floorMap[rowIndex][colIndex - 1] !== 9) {
                basinCells.push(...getBasin(floorMap, rowIndex, colIndex - 1, visited));
            }
        }
    }

    if (colIndex < floorMap[0].length-1) {
        // there is a right neighbor
        if (!haveVisited(visited, rowIndex, colIndex + 1)) {
            // We haven't seen it
            visited.push({ rowIndex, colIndex: colIndex + 1 });
            if (floorMap[rowIndex][colIndex + 1] !== 9) {
                basinCells.push(...getBasin(floorMap, rowIndex, colIndex + 1, visited));
            }
        }
    }

    return basinCells;
};

export const calc2 = (input) => {
    const basins = [];
    const visited = [];
    const floorMap = input.map(line => line.split('').map(Number));

    floorMap.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (haveVisited(visited, rowIndex, colIndex)) {
                // Already processed this cell, move along...
            } else if (cell === 9) {
                // 9s can't be basins. Move along....
                visited.push({ rowIndex, colIndex });
            } else {
                // Find our basin
                const basin = getBasin(floorMap, rowIndex, colIndex, visited);
                basins.push(basin);
                visited.push(...basin);
            }
        });
    });

    const basinSizes = basins.map(b => b.length);
    basinSizes.sort((a, b) => b-a);

    return basinSizes.slice(0, 3).reduce((sum, val) => sum*val, 1);
};
