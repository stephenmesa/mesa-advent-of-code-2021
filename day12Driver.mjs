import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput
} from './day12.mjs';

const input = parseInput(fs.readFileSync('inputs/day12.txt').toString());

console.log('Day 12 - First answer', calc1(input));
console.log('Day 12 - Second answer', calc2(input));
