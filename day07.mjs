export const parseInput = (input) => input.split(',').map(Number);

const calculateFuelToAlign = (crabPositions, position) => crabPositions.map(p => Math.abs(p - position)).reduce((sum, val) => sum + val, 0);

export const calc1 = (input) => {
    let lowestFuelCost = null;
    const crabPositions = input;
    const minPosition = Math.min(...crabPositions);
    const maxPosition = Math.max(...crabPositions);
    for (let position = minPosition; position <= maxPosition; position++) {
        const fuelToAlign = calculateFuelToAlign(crabPositions, position);
        if (lowestFuelCost === null) {
            lowestFuelCost = fuelToAlign;
        } else if (fuelToAlign < lowestFuelCost) {
            lowestFuelCost = fuelToAlign;
        }
    }

    return lowestFuelCost;
};

const calculateFuelToAlignPart2 = (crabPositions, position) => crabPositions.map(p => {
    const arr = [...Array(Math.abs(p - position)).keys()].slice(1);
    arr.push(Math.abs(p - position))
    return arr.reduce((sum, val) => sum + val, 0);
}).reduce((sum, val) => sum + val, 0);

export const calc2 = (input) => {
    let lowestFuelCost = null;
    const crabPositions = input;
    const minPosition = Math.min(...crabPositions);
    const maxPosition = Math.max(...crabPositions);
    for (let position = minPosition; position <= maxPosition; position++) {
        const fuelToAlign = calculateFuelToAlignPart2(crabPositions, position);
        if (lowestFuelCost === null) {
            lowestFuelCost = fuelToAlign;
        } else if (fuelToAlign < lowestFuelCost) {
            lowestFuelCost = fuelToAlign;
        }
    }

    return lowestFuelCost;
};
