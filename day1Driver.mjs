import fs from 'fs';

const input = fs.readFileSync('inputs/day1.txt').toString().split('\n').map(Number);

import {
    calc1,
    calc2,
} from './day1.mjs';

console.log('Day 1 - First answer', calc1(input));
console.log('Day 1 - Second answer', calc2(input));
