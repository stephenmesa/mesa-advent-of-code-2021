export const parseInput = (input) => input.split(',').map(Number);

export const calc1 = (input, days) => {
    let fish = input;
    for (let index = 0; index < days; index++) {
        const createdFish = [];
        // Decrement every fish
        fish = fish.map(f => {
            if (f === 0) {
                // spawn a new fish and reset timer
                createdFish.push(8);
                return 6;
            } else {
                return f - 1;
            }
        });
        createdFish.forEach(f => { fish.push(f); });
    }

    return fish.length;
};

export const calc2 = (input, days) => {
    let fish = input.map(f => ({ timer: f, quantity: 1 }));
    for (let index = 0; index < days; index++) {
        let numberOfFishToCreate = 0;
        // Decrement every fish
        fish = fish.map(f => {
            if (f.timer === 0) {
                // spawn a new fish and reset timer
                numberOfFishToCreate += f.quantity;
                return {
                    timer: 6,
                    quantity: f.quantity,
                };
            } else {
                return {
                    timer: f.timer - 1,
                    quantity: f.quantity,
                };
            }
        });

        if (numberOfFishToCreate > 0) {
            fish.push({
                timer: 8,
                quantity: numberOfFishToCreate,
            });
        }
    }

    return fish.reduce((sum, fish) => sum + fish.quantity, 0);
};
