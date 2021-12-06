import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput
} from './day06.mjs';

const input = parseInput(fs.readFileSync('inputs/day06.txt').toString());

console.log('Day 06 - First answer', calc1(input, 80));
console.log('Day 06 - Second answer', calc2(input, 256));
