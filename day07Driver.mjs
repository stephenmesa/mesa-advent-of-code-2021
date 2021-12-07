import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput
} from './day07.mjs';

const input = parseInput(fs.readFileSync('inputs/day07.txt').toString());

console.log('Day 07 - First answer', calc1(input));
console.log('Day 07 - Second answer', calc2(input));
