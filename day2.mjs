export const parseInput = (input) => input.split('\n').map(x => { const s = x.split(' '); return { direction: s[0], amount: Number(s[1]) }; });

export const calc1 = (input) => {
    const vehicle = {
        depth: 0,
        horizontal: 0,
    };

    input.forEach((move) => {
        switch (move.direction) {
            case 'forward':
                vehicle.horizontal += move.amount;
                break;
            case 'down':
                vehicle.depth += move.amount;
                break;
            case 'up':
                vehicle.depth -= move.amount;
                break;
        }
    });

    return vehicle.depth * vehicle.horizontal;
};

export const calc2 = (input) => {
    const vehicle = {
        depth: 0,
        horizontal: 0,
        aim: 0,
    };

    input.forEach((move) => {
        switch (move.direction) {
            case 'forward':
                vehicle.horizontal += move.amount;
                vehicle.depth += vehicle.aim * move.amount;
                break;
            case 'down':
                vehicle.aim += move.amount;
                break;
            case 'up':
                vehicle.aim -= move.amount;
                break;
        }
    });

    return vehicle.depth * vehicle.horizontal;
};
