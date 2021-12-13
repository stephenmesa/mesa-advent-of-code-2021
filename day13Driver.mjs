import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput
} from './day13.mjs';

const input = parseInput(fs.readFileSync('inputs/day13.txt').toString());

console.log('Day 13 - First answer', calc1(input));
console.log('Day 13 - Second answer', calc2(input));
