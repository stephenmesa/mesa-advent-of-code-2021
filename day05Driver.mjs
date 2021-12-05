import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput
} from './day05.mjs';

const input = parseInput(fs.readFileSync('inputs/day05.txt').toString());

console.log('Day 05 - First answer', calc1(input));
console.log('Day 05 - Second answer', calc2(input));
