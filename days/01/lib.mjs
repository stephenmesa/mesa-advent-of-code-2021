export const calc1 = (input) => {
    return input.reduce((acc, val, index) => {
        if (index === 0){
            return 0;
        }
        
        return input[index - 1] < val ? acc + 1 : acc;
    }, 0)
};

export const calc2 = (input) => {
    const windows = [];
    for (let i = 0; i < input.length - 2; i++) {
        windows.push(input[i] + input[i+1] + input[i+2]);
    }

    return windows.reduce((acc, val, index) => {
        if (index === 0){
            return 0;
        }
        
        return windows[index - 1] < val ? acc + 1 : acc;
    }, 0)
};
