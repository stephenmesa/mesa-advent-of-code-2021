import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput
} from './day5.mjs';

const input = parseInput(fs.readFileSync('inputs/day5.txt').toString());

console.log('Day 5 - First answer', calc1(input));
console.log('Day 5 - Second answer', calc2(input));
