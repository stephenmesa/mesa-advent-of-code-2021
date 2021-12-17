export const parseInput = (input) => {
    const match = input.match(/target area: x=([^,]+), y=(.+)/i);
    const x = match[1].split('..');
    const y = match[2].split('..');
    const minX = Math.min(...x);
    const maxX = Math.max(...x);
    const minY = Math.min(...y);
    const maxY = Math.max(...y);
    return {
        x: {
            min: minX,
            max: maxX,
        },
        y: {
            min: minY,
            max: maxY,
        },
    };
};

const probeIsInGoal = (probeLocation, goal) => {
    return probeLocation.x >= goal.x.min && probeLocation.x <= goal.x.max && probeLocation.y >= goal.y.min && probeLocation.y <= goal.y.max;
};

const detectGoal = (xVelocity, yVelocity, goal) => {
    let currentXVelocity = xVelocity;
    let currentYVelocity = yVelocity;
    let maxYPosition = Number.MIN_SAFE_INTEGER;
    let probeLocation = {
        x: 0,
        y: 0,
    };
    // How do I exit earlier?
    while (currentYVelocity > -1000) {
        probeLocation.x += currentXVelocity;
        probeLocation.y += currentYVelocity;
        if (probeLocation.y > maxYPosition) {
            maxYPosition = probeLocation.y;
        }
        if (probeIsInGoal(probeLocation, goal)) {
            return maxYPosition;
        }
        if (currentXVelocity > 0) {
            currentXVelocity -= 1;
        } else if (currentXVelocity < 0) {
            currentXVelocity += 1;
        } else {
            // X velocity is 0
        }
        currentYVelocity -= 1;
    }

    return null;
};

export const calc1 = (input) => {
    const maxXVelocity = input.x.max + 1;

    let maxYPosition = Number.MIN_SAFE_INTEGER;

    for (let x = -10; x < maxXVelocity; x++) {
        for (let y = -400; y < 400; y++) {
            const detectedMaxYPosition = detectGoal(x, y, input);
            if (detectedMaxYPosition > maxYPosition) {
                maxYPosition = detectedMaxYPosition;
            }
        }
    }

    return maxYPosition;
}

export const calc2 = (input) => {
    const velocities = [];
    const maxXVelocity = input.x.max + 1;

    for (let x = -100; x < maxXVelocity; x++) {
        for (let y = -400; y < 400; y++) {
            const detectedMaxYPosition = detectGoal(x, y, input);
            if (detectedMaxYPosition !== null) {
                velocities.push({ x, y });
            }
        }
    }

    return velocities.length;
}