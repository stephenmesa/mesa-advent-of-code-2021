import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../day13.mjs';

const testInput = parseInput(fs.readFileSync('inputs/day13-simple.txt').toString());

describe('Day 12', () => {
    it('First problem', () => {
        const target = calc1(testInput);
        assert.equal(target, -1);
    });

    it.skip('Second problem', () => {
        const target = calc2(testInput);
        assert.equal(target, -1);
    });
});
