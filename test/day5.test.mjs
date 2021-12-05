import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../day5.mjs';

const testInput = parseInput(fs.readFileSync('inputs/day5-simple.txt').toString());

describe('Day 5', () => {
    it('First problem', () => {
        const target = calc1(testInput);
        assert.equal(target, -1);
    });

    it('Second problem', () => {
        const target = calc2(testInput);
        assert.equal(target, -1);
    });
});
