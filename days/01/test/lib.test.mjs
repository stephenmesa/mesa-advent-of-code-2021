import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('./inputs/testinput.txt').toString().split('\n').map(Number);

import {
    calc1,
    calc2,
    getWindows,
} from '../lib.mjs';

it('Main test', () => {
    const target = calc1(testInput);
    assert.equal(target, 7);
});

it('Second test', () => {
    const target = calc2(testInput);
    assert.equal(target, 5);
});

it('getWindows()', () => {
    const target = getWindows(testInput, 3);
    assert.equal(target.length, 8)
    assert.equal(target[0], 607);
    assert.equal(target[7], 792);
});
