import fs from 'fs';

const input = fs.readFileSync('./inputs/input.txt').toString().split('\n').map(Number);

import {
    calc1,
    calc2,
} from './lib.mjs';

console.log('First answer', calc1(input));
console.log('Second answer', calc2(input));
