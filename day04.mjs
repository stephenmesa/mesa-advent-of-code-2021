export const parseInput = (input) => {
    const parsedInput = input.split('\n');
    const drawnNumbers = parsedInput[0].split(',').map(Number);
    const boards = [];
    let currentBoard = [];
    for (let index = 2; index < parsedInput.length; index++) {
        const element = parsedInput[index];
        if (element === '') {
            // Reached the end of a board, move on
            boards.push(currentBoard);
            currentBoard = [];
            continue;
        } else {
            currentBoard.push(element.split(' ').filter(n => n !== '').map(n => ({ val: Number(n), marked: false })));
        }
    }
    if (currentBoard.length > 0) {
        boards.push(currentBoard);
    }

    return {
        drawnNumbers,
        boards,
    };
}

const markBoard = (board, num) => {
    return board.map(row => row.map(cell => cell.val === num ? ({ val: cell.val, marked: true }) : cell))
};

const isWinningBoard = (board) => {
    let isWinner = false;
    // check for winning row
    for (let index = 0; index < board.length; index++) {
        const row = board[index];
        if (row.reduce((unmarked, cell) => !cell.marked ? true : unmarked, false) === false) {
            return true;
        }
    }
    
    // check for winning column
    for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
        if (board.map(row => row[colIndex]).reduce((unmarked, cell) => !cell.marked ? true : unmarked, false) === false) {
            return true;
        }
    }

    return false;
};

const sumUnmarkedNumbersOnBoard = (board) => {
    const unmarkedNums = [];
    board.forEach(row => unmarkedNums.push(...row.filter(cell => cell.marked === false).map(cell => cell.val)));
    return unmarkedNums.reduce((sum, num) => sum + num, 0);
};

export const calc1 = (input) => {
    let boards = input.boards;
    let winningBoard, winningNumber;
    let i = 0;
    while (!winningBoard && i < input.drawnNumbers.length) {
        const n = input.drawnNumbers[i];
        // Mark boards
        boards = boards.map(b => markBoard(b, n));
        // Check for winner
        for (let index = 0; index < boards.length; index++) {
            const board = boards[index];
            if (isWinningBoard(board)) {
                winningBoard = board;
                winningNumber = n;
                break;
            }
        }
        i++;
    }

    if (winningBoard) {
        return sumUnmarkedNumbersOnBoard(winningBoard) * winningNumber;
    }
};

export const calc2 = (input) => {
    let boards = input.boards;
    let losingBoardIndex, losingBoard, losingNumber;
    let i = 0;
    while (!losingNumber && i < input.drawnNumbers.length) {
        const n = input.drawnNumbers[i];
        // Mark boards
        boards = boards.map(b => markBoard(b, n));
        // Get winner count
        const losingBoards = boards.filter(b => !isWinningBoard(b));
        if (losingBoards.length === 1) {
            // last board identified
            losingBoardIndex = boards.indexOf(losingBoards[0]);
            // losingBoard = losingBoards[0];
        } else if (losingBoards.length === 0) {
            losingBoard = boards[losingBoardIndex];
            losingNumber = n;
            break;
        }

        i++;
    }

    if (losingBoard) {
        return sumUnmarkedNumbersOnBoard(losingBoard) * losingNumber;
    }
};
