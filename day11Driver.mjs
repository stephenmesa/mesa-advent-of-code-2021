import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput
} from './day11.mjs';

const input = parseInput(fs.readFileSync('inputs/day11.txt').toString());

console.log('Day 11 - First answer', calc1(input, 100));
console.log('Day 11 - Second answer', calc2(input));
