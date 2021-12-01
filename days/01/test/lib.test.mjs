import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('./inputs/testinput.txt').toString().split('\n').map(Number);

import {
    calc1,
    calc2
} from '../lib.mjs';

it('Main test', () => {
    const target = calc1(testInput);
    assert.equal(target, 7);
});

it('Second test', () => {
    const target = calc2(testInput);
    assert.equal(target, 5);
});
