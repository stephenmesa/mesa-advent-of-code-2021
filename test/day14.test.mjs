import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../day14.mjs';

const testInput = parseInput(fs.readFileSync('inputs/day14-simple.txt').toString());

describe('Day 14', () => {
    it('Part 1', () => {
        const target = calc1(testInput, 10);
        assert.equal(target, 1588);
    });
    it('Part 2', () => {
        const target = calc2(testInput, 10);
        assert.equal(target, 1588);
        // const target = calc2(testInput, 40);
        // assert.equal(target, 2188189693529);
    });
});
