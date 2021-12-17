import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput
} from './day15.mjs';

const input = parseInput(fs.readFileSync('inputs/day15.txt').toString());

console.log('Day 15 - Part 1', calc1(input));
console.log('Day 15 - Part 2', calc2(input));
