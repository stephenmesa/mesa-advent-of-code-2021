import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput,
} from './day2.mjs';

const input = parseInput(fs.readFileSync('inputs/day2.txt').toString());

console.log('Day 2 - First answer', calc1(input));
console.log('Day 2 - Second answer', calc2(input));
