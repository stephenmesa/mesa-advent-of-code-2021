import fs from 'fs';

import {
    calc1,
    calc2,
    parseInput
} from './dayX.mjs';

const input = parseInput(fs.readFileSync('inputs/dayX.txt').toString());

console.log('Day X - Part 1', calc1(input));
console.log('Day X - Part 2', calc2(input));
