import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput,
} from './day03.mjs';

const input = parseInput(fs.readFileSync('inputs/day03.txt').toString());

console.log('Day 03 - First answer', calc1(input));
console.log('Day 03 - Second answer', calc2(input));
