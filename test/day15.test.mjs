import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../day15.mjs';

const testInput = parseInput(fs.readFileSync('inputs/day15-simple.txt').toString());

describe('Day 15', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 40);
    });
    it('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, 315);
    });
});
