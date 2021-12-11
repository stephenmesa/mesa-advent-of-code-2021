export const parseInput = (input) => input.split('\n').map(r => r.split('').map(Number));

const incrementAll = (octopuses) => {
    return octopuses.map(row => row.map(o => o + 1));
};

const getFlashingOctopuses = (octopuses, octopusesToExclude) => {
    const flashing = [];
    octopuses.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell > 9 && !octopusesToExclude.find(o => o.rowIndex === rowIndex && o.colIndex === colIndex)) {
                flashing.push({
                    rowIndex,
                    colIndex,
                });
            }
        })
    });
    return flashing;
    // return octopuses.reduce((res, row, rowIndex) =>
    //     [...res, ...row.filter((c, colIndex) =>
    //         c > 9 && !octopusesToExclude.find(o => o.rowIndex === rowIndex && o.colIndex === colIndex)
    //     ).map((c, colIndex) => ({ rowIndex, colIndex }))], []);
};

const incrementNeighbors = (octopuses, rowIndex, colIndex) => {
    const mutatingOctopuses = octopuses.map(r => [...r]);
    const maxRowIndex = octopuses.length - 1;
    const maxColIndex = octopuses[0].length - 1;
    if (rowIndex > 0) {
        if (colIndex > 0) { 
            mutatingOctopuses[rowIndex - 1][colIndex - 1] += 1;
        }
        mutatingOctopuses[rowIndex - 1][colIndex] += 1;
        if (colIndex < maxColIndex) { 
            mutatingOctopuses[rowIndex - 1][colIndex + 1] += 1;
        }
    }
    if (colIndex > 0) { 
        mutatingOctopuses[rowIndex][colIndex - 1] += 1;
    }
    if (colIndex < maxColIndex) { 
        mutatingOctopuses[rowIndex][colIndex + 1] += 1;
    }
    if (rowIndex < maxRowIndex) {
        if (colIndex > 0) { 
            mutatingOctopuses[rowIndex + 1][colIndex - 1] += 1;
        }
        mutatingOctopuses[rowIndex + 1][colIndex] += 1;
        if (colIndex < maxColIndex) { 
            mutatingOctopuses[rowIndex + 1][colIndex + 1] += 1;
        }
    }

    return mutatingOctopuses;
};

const resetOctopuses = (octopuses, octopusesToReset) => {
    const mutatingOctopuses = octopuses.map(r => [...r]);
    octopusesToReset.forEach(o => {
        mutatingOctopuses[o.rowIndex][o.colIndex] = 0;
    });

    return mutatingOctopuses;
}

export const calc1 = (input, days) => {
    let octopuses = input;
    let flashCount = 0;
    for (let day = 1; day <= days; day++) {
        const flashesForThisDay = [];
        // Step 1: Increment energy level of all octopuses
        octopuses = incrementAll(octopuses);

        // Check for all octopuses with energy level greater than 9
        let flashingOctopuses = getFlashingOctopuses(octopuses, flashesForThisDay);
        while(flashingOctopuses.length > 0) {
            flashesForThisDay.push(...flashingOctopuses);
            flashingOctopuses.forEach(o => {
                octopuses = incrementNeighbors(octopuses, o.rowIndex, o.colIndex);
            });
            flashingOctopuses = getFlashingOctopuses(octopuses, flashesForThisDay);
        }

        octopuses = resetOctopuses(octopuses, flashesForThisDay);
        flashCount += flashesForThisDay.length;
    }

    return flashCount;
};

export const calc2 = (input) => {
    let octopuses = input;
    let firstDayForAllFlashing;
    const totalOctopuses = octopuses.map(row => row.length).reduce((sum, v) => sum+v, 0);
    for (let day = 1; day <= 100000; day++) {
        const flashesForThisDay = [];
        // Step 1: Increment energy level of all octopuses
        octopuses = incrementAll(octopuses);

        // Check for all octopuses with energy level greater than 9
        let flashingOctopuses = getFlashingOctopuses(octopuses, flashesForThisDay);
        while(flashingOctopuses.length > 0) {
            flashesForThisDay.push(...flashingOctopuses);
            flashingOctopuses.forEach(o => {
                octopuses = incrementNeighbors(octopuses, o.rowIndex, o.colIndex);
            });
            flashingOctopuses = getFlashingOctopuses(octopuses, flashesForThisDay);
        }

        octopuses = resetOctopuses(octopuses, flashesForThisDay);

        // Check if every octopus flashed
        if (flashesForThisDay.length === totalOctopuses) {
            firstDayForAllFlashing = day;
            break;
        }
    }

    return firstDayForAllFlashing;
};
