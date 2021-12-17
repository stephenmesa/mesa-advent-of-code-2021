import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput
} from './day16.mjs';

const input = parseInput(fs.readFileSync('inputs/day16.txt').toString());

console.log('Day 16 - Part 1', calc1(input));
console.log('Day 16 - Part 2', calc2(input));
