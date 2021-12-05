import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput,
} from './day02.mjs';

const input = parseInput(fs.readFileSync('inputs/day02.txt').toString());

console.log('Day 02 - First answer', calc1(input));
console.log('Day 02 - Second answer', calc2(input));
