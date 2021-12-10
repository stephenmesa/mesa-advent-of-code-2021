import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput
} from './day10.mjs';

const input = parseInput(fs.readFileSync('inputs/day10.txt').toString());

console.log('Day 10 - First answer', calc1(input));
console.log('Day 10 - Second answer', calc2(input));
