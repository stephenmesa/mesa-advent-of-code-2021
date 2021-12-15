import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput
} from './day14.mjs';

const input = parseInput(fs.readFileSync('inputs/day14.txt').toString());

console.log('Day 14 - Part 1', calc1(input, 10));
console.log('Day 14 - Part 2', calc2(input, 40));
