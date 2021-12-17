import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../day17.mjs';

const testInput = parseInput(fs.readFileSync('inputs/day17-simple.txt').toString());

describe('Day 17', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 45);
    });
    it.skip('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, -1);
    });
});
