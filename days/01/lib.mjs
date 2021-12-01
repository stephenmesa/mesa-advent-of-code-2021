export const calc1 = (input) => {
    return input.reduce((acc, val, index) => {
        // Don't calculate the first index
        if (index === 0){
            return acc;
        }
        
        // Add 1 if the previous value is lower than this value
        return input[index - 1] < val ? acc + 1 : acc;
    }, 0)
};

export const getWindows = (input, windowSize = 3) => input.slice(0, (windowSize-1) * -1).map((val, index) => input.slice(index, index+windowSize).reduce((p, c) => p + c), 0);

export const calc2 = (input) => {
     const windows = getWindows(input, 3);

    return calc1(windows);
};
