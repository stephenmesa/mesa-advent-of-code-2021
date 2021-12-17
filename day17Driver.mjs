import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput
} from './day17.mjs';

const input = parseInput(fs.readFileSync('inputs/day17.txt').toString());

console.log('Day 17 - Part 1', calc1(input));
console.log('Day 17 - Part 2', calc2(input));
