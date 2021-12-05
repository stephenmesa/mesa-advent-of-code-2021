import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput,
} from './day04.mjs';

const input = parseInput(fs.readFileSync('inputs/day04.txt').toString());

console.log('Day 04 - First answer', calc1(input));
console.log('Day 04 - Second answer', calc2(input));
