import fs from 'fs';

const input = fs.readFileSync('inputs/day01.txt').toString().split('\n').map(Number);

import {
    calc1,
    calc2,
} from './day01.mjs';

console.log('Day 01 - First answer', calc1(input));
console.log('Day 01 - Second answer', calc2(input));
