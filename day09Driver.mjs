import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput
} from './day09.mjs';

const input = parseInput(fs.readFileSync('inputs/day09.txt').toString());

console.log('Day 09 - First answer', calc1(input));
console.log('Day 09 - Second answer', calc2(input));
