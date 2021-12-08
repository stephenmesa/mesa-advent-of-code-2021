import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput
} from './day08.mjs';

const input = parseInput(fs.readFileSync('inputs/day08.txt').toString());

console.log('Day 08 - First answer', calc1(input));
console.log('Day 08 - Second answer', calc2(input));
