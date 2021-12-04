import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput,
} from './day4.mjs';

const input = parseInput(fs.readFileSync('inputs/day4.txt').toString());

console.log('Day 4 - First answer', calc1(input));
console.log('Day 4 - Second answer', calc2(input));
