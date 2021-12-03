import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput,
} from './day3.mjs';

const input = parseInput(fs.readFileSync('inputs/day3.txt').toString());

console.log('Day 3 - First answer', calc1(input));
console.log('Day 3 - Second answer', calc2(input));
